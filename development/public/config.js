const config = {
    apiUrl: process.env.NODE_ENV === 'production' 
        ? 'https://your-backend-url.com'  // Replace with your deployed backend URL
        : 'http://localhost:5000'
};

export default config; 