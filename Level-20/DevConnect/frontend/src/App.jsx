import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [token, setToken] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [authInfo, setAuthInfo] = useState({ email: '', password: '' });

  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [profile, setProfile] = useState(null);

  const [users, setUsers] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/api/posts');
    setPosts(res.data);
  };

  const getProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: token },
      });
      setProfile(res.data);
      setBio(res.data.bio || '');
      setSkills(res.data.skills?.join(', ') || '');
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const getAllUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', authInfo);
      setToken(res.data.token);
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const createPost = async () => {
    const form = new FormData();
    form.append('content', content);
    await axios.post('http://localhost:5000/api/posts', form, {
      headers: { Authorization: token }
    });
    setContent('');
    fetchPosts();
  };

  const likePost = async (id) => {
    await axios.post(`http://localhost:5000/api/posts/${id}/like`, {}, {
      headers: { Authorization: token }
    });
    fetchPosts();
  };

  const comment = async (id) => {
    await axios.post(`http://localhost:5000/api/posts/${id}/comment`, {
      text: commentText
    }, {
      headers: { Authorization: token }
    });
    setCommentText('');
    fetchPosts();
  };
  const updateProfile = async () => {
    await axios.put(
      'http://localhost:5000/api/profile',
      {
        bio,
        skills: skills.split(',').map((s) => s.trim()),
      },
      {
        headers: { Authorization: token },
      }
    );
    alert('Profile updated!');
    getProfile();
  };

  useEffect(() => {
    if (token) {
      fetchPosts();
      getProfile();
      getAllUsers();
    }
  }, [token]);

  return (
    <div className="app">
      <h1>DevConnect 👨‍💻</h1>

      {!token ? (
        <div className="login">
          <input
            placeholder="Email"
            onChange={e => setAuthInfo({ ...authInfo, email: e.target.value })}
          />
          <input
            placeholder="Password"
            type="password"
            onChange={e => setAuthInfo({ ...authInfo, password: e.target.value })}
          />
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div className="main-content">
          {/* Left side: Post creation + posts */}
          <div className="left-panel">
            <textarea
              placeholder="Share a project or question..."
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <button onClick={createPost}>Post</button>

            {/* Profile edit */}
            <div className="profile-section">
              <h2>🧑‍💻 My Profile</h2>
              <textarea
                placeholder="Your bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <input
                placeholder="Skills (comma-separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
              <button onClick={updateProfile}>Save Profile</button>
              <p><strong>Bio:</strong> {profile?.bio}</p>
              <p><strong>Skills:</strong> {profile?.skills?.join(', ')}</p>
            </div>

            {/* Posts */}
            {posts.map(post => (
              <div key={post._id} className="post">
                <p>{post.content}</p>
                <button onClick={() => likePost(post._id)}>
                  ❤️ {post.likes.length}
                </button>
                <div>
                  <input
                    placeholder="Add a comment"
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                  />
                  <button onClick={() => comment(post._id)}>Comment</button>
                </div>
                <div className="comments">
                  {post.comments.map((c, idx) => (
                    <p key={idx}>💬 {c.text}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right side: Developer Directory */}
          <div className="right-panel">
            <h3>👥 Other Developers</h3>
            {users.filter(u => u._id !== profile?._id).map(user => (
              <div key={user._id} className="user-card">
                <h4>{user.username}</h4>
                <p><strong>Bio:</strong> {user.bio || '—'}</p>
                <p><strong>Skills:</strong> {user.skills?.join(', ') || '—'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
