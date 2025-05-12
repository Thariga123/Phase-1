import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const Journal = mongoose.model('Journal', journalSchema);
export default Journal;
