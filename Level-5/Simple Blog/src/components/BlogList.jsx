import { Link } from 'react-router-dom';
import blogPosts from '../data/blogPosts';

const BlogList = () => {
  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {blogPosts.map(post => (
          <li key={post.id}>
            <h3>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
            <p>{post.shortDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
