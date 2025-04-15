import React, { useEffect, useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const PostManager = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch(API_URL + '?_limit=5')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      // Update
      fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((updated) => {
          setPosts((prev) =>
            prev.map((post) => (post.id === editingId ? updated : post))
          );
          setEditingId(null);
          setFormData({ title: '', body: '' });
        });
    } else {
      // Create
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((newPost) => {
          setPosts([newPost, ...posts]);
          setFormData({ title: '', body: '' });
        });
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({ title: post.title, body: post.body });
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => setPosts(posts.filter((post) => post.id !== id)));
  };

  return (
    <div className="post-manager">
      <h2>{editingId ? 'Edit Post' : 'Add Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <h3>Posts</h3>
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <div className="actions">
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)} className="delete">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostManager;
