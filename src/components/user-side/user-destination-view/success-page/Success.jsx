import { motion } from 'framer-motion';

const SuccessPage = () => {
  return (
    <div style={styles.container}>
      <motion.div
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={styles.content}
      >
        <motion.h1
          className="success-title"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={styles.title}
        >
          Success
        </motion.h1>

        <motion.div
          className="success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={styles.icon}
        >
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 7L9 19L3 13" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        <motion.p
          className="success-message"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={styles.message}
        >
          Your Payment was successful!
        </motion.p>

        <motion.a
          href="/destination"
          className="success-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={styles.button}
        >
          Back to Home
        </motion.a>
      </motion.div>
    </div>
  );
};

// Define styles for the component
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4', // Optional background color
  },
  content: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff', // Optional background color
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '20px',
  },
  icon: {
    marginBottom: '20px',
  },
  message: {
    marginBottom: '30px',
    fontSize: '18px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    textDecoration: 'none',
    borderRadius: '4px',
  },
};

export default SuccessPage;
