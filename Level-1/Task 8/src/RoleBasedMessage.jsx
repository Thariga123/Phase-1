import './RoleBasedMessage.css'

const RoleBasedMessage = ({ role }) => {
  return (
    <div className="message-container">
      {role === 'Admin' ? (
        <p className="admin-message">Welcome, Admin! You have full access to the system.</p>
      ) : role === 'User' ? (
        <p className="user-message">Welcome, User! You have limited access to the system.</p>
      ) : (
        <p className="guest-message">Welcome, Guest! Please log in to access the system.</p>
      )}
    </div>
  );
};

export default RoleBasedMessage;
