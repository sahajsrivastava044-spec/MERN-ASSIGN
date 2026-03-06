const Button = ({ children, variant = 'primary', onClick, type = 'button' }) => {
  const styles = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    secondary: { backgroundColor: 'white', color: '#007bff', border: '2px solid #007bff' },
    danger: { backgroundColor: '#dc3545', color: 'white' },
  };

  const baseStyle = {
    padding: '0.75rem 2rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    ...styles[variant]
  };

  return (
    <button style={baseStyle} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;