import express from 'express';
import mongoose from 'mongoose';
import Parser from 'rss-parser';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const parser = new Parser();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/rssReader', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected')).catch(err => console.error('❌ MongoDB error:', err));

const articleSchema = new mongoose.Schema({
  title: String,
  link: { type: String, unique: true },
  pubDate: Date,
  contentSnippet: String,
  source: String,
  read: { type: Boolean, default: false }
});

const Article = mongoose.model('Article', articleSchema);

app.post('/fetch', async (req, res) => {
  const { urls } = req.body;

  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).send('❌ Provide an array of RSS feed URLs');
  }

  let newCount = 0;
  for (const url of urls) {
    try {
      const feed = await parser.parseURL(url);
      for (const item of feed.items) {
        const exists = await Article.findOne({ link: item.link });
        if (!exists) {
          await Article.create({
            title: item.title,
            link: item.link,
            pubDate: new Date(item.pubDate),
            contentSnippet: item.contentSnippet,
            source: feed.title
          });
          newCount++;
        }
      }
    } catch (err) {
      console.error(`❌ Error fetching ${url}: ${err.message}`);
    }
  }

  res.send(`✅ Fetched and saved articles. New items: ${newCount}`);
});

app.get('/articles', async (req, res) => {
  const { source, keyword, startDate, endDate, read } = req.query;
  const query = {};

  if (source) query.source = source;
  if (read !== undefined) query.read = read === 'true';
  if (keyword) query.title = { $regex: keyword, $options: 'i' };
  if (startDate || endDate) {
    query.pubDate = {};
    if (startDate) query.pubDate.$gte = new Date(startDate);
    if (endDate) query.pubDate.$lte = new Date(endDate);
  }

  const articles = await Article.find(query).sort({ pubDate: -1 });
  res.json(articles);
});

app.put('/articles/:id/read', async (req, res) => {
  const { id } = req.params;
  const { read } = req.body;

  const article = await Article.findByIdAndUpdate(id, { read }, { new: true });
  if (!article) return res.status(404).send('❌ Article not found');
  res.send(`🔄 Marked as ${read ? 'read' : 'unread'}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
