import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMessages([]);

      const userRequest = api.get('/users');
      const postRequest = api.get('/posts');
      const commentRequest = api.get('/comments');

      try {
        const [userRes, postRes, commentRes] = await Promise.allSettled([
          userRequest,
          postRequest,
          commentRequest
        ]);

        if (userRes.status === 'fulfilled') {
          setUsers(userRes.value.data);
        } else {
          setErrorMessages(prev => [...prev, 'Failed to fetch users']);
        }

        if (postRes.status === 'fulfilled') {
          setPosts(postRes.value.data.slice(0, 5));
        } else {
          setErrorMessages(prev => [...prev, 'Failed to fetch posts']);
        }

        if (commentRes.status === 'fulfilled') {
          setComments(commentRes.value.data.slice(0, 5));
        } else {
          setErrorMessages(prev => [...prev, 'Failed to fetch comments']);
        }
      } catch (error) {
        setErrorMessages(['Unexpected error occurred.']);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard data...</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      {errorMessages.length > 0 && (
        <div style={{ color: 'red' }}>
          {errorMessages.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '2rem' }}>
        <section>
          <h3>Users</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Posts</h3>
          <ul>
            {posts.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>Comments</h3>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>{comment.body.slice(0, 50)}...</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
