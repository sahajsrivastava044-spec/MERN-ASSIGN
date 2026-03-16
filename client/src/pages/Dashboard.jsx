import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import api from '../services/api';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const { user, logout, loading } = useAuth();


  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }


 useEffect(()=>{
  // const token = localStorage.getItem('token');
  // fetch('http://localhost:5000/api/users', {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }})
  api.get('/api/users')
  // .then((res)=>{
  //   // console.log(res)  
  //   return res.json()
  // })
  .then((res)=>{
    console.log(res)
  }).catch(err=>{
    console.log(err.message,"ad")
  })
 },[])

   const handleDelete = async (postId) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to delete this post? This action cannot be undone.'
    );

    if (!confirmed) {
      return; // User cancelled
    }

    try {
      const response = await api.delete(`/api/posts/${postId}`);

      if (response.data.success) {
        // Remove post from UI immediately (optimistic update)
        setPosts(posts.filter(post => post._id !== postId));
        
        // Update pagination count
        setPagination(prev => ({
          ...prev,
          total: prev.total - 1
        }));

        // Optional: Show success message
        alert('Post deleted successfully');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert(error.response?.data?.message || 'Failed to delete post');
    }
  };
    useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);
 const fetchPosts = async (page) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.get(`/api/posts?page=${page}&limit=10`);
      console.log(response.data.data,"adc")
      setPosts(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) {
    return <div >Loading posts...</div>;
  }


  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Welcome, {user.name}!</h1>
        <button onClick={logout} style={logoutButtonStyle}>
          Logout
        </button>
      </div>

      <div style={contentStyle}>
        <div style={cardStyle}>
          <h2>Your Account</h2>
          <div style={infoStyle}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

            <div style={containerStyle}>
      {/* Header with Create Button */}
      <div style={headerStyle}>
        <h1>Welcome, {user.name}!</h1>
        <Link to="/create">
          <button style={createButtonStyle}>
            + Create New Post
          </button>
        </Link>
      </div>

      {/* Error Message */}
      {error && <div style={errorStyle}>{error}</div>}

      {/* Posts List */}
      <div style={postsContainerStyles}>
        {posts.length === 0 ? (
          <div style={emptyStateStyle}>
            <p>You haven't created any posts yet.</p>
            <Link to="/create">Create your first post</Link>
          </div>
        ) : (
          <>
            {posts.map((post) => (
              <div key={post._id} style={postCardStyle}>
                <h3>{post.title}</h3>
                <p style={contentPreviewStyle}>
                  {post.content.substring(0, 150)}...
                </p>
                <div style={metaStyle}>
                  <span>{post.category}</span>
                  <span>{post.status}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            <div style={paginationStyle}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                style={paginationButtonStyle}
              >
                Previous
              </button>

              <span style={pageInfoStyle}>
                Page {pagination.page} of {pagination.totalPages} 
                ({pagination.total} total posts)
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                style={paginationButtonStyle}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
          <div style={postsContainerStyles}>
        {posts.map((post) => (
          <div key={post._id} style={postCardStyle}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 150)}...</p>
            
            {/* Action Buttons */}
            <div style={actionsStyle}>
              <button 
                onClick={() => handleDelete(post._id)}
                style={deleteButtonStyle}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: '80vh',
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2rem',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const logoutButtonStyle = {
  padding: '0.5rem 1.5rem',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '500',
};

const contentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
};

const cardStyle = {
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const infoStyle = {
  marginTop: '1rem',
  lineHeight: '2',
};
const actionsStyle = {
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
};

const deleteButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};


// const editButtonStyle = {
//   padding: '0.5rem 1rem',
//   backgroundColor: '#007bff',
//   color: 'white',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
//   textDecoration: 'none',
// };

const paginationStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2rem',
  padding: '1rem',
  backgroundColor: 'white',
  borderRadius: '8px',
};

const paginationButtonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const pageInfoStyle = {
  color: '#666',
  fontSize: '0.9rem',
};

const postCardStyle = {
  padding: '1.5rem',
  backgroundColor: 'white',
  borderRadius: '8px',
  marginBottom: '1rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const contentPreviewStyle = {
  color: '#666',
  margin: '1rem 0',
};

const metaStyle = {
  display: 'flex',
  gap: '1rem',
  fontSize: '0.85rem',
  color: '#999',
};

const createButtonStyle = {
  padding: '0.5rem 1.5rem',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: '500',
  textDecoration: 'none',
};

const errorStyle = {
  padding: '1rem',
  backgroundColor: '#f8d7da',
  color: '#721c24',
  border: '1px solid #f5c6cb',
  borderRadius: '5px',
  marginBottom: '1rem',
};

const postsContainerStyles = {
  marginTop: '2rem',
};

const emptyStateStyle = {
  textAlign: 'center',
  padding: '3rem',
  color: '#666',
};

export default Dashboard;