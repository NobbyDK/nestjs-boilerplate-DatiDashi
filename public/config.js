// Frontend Environment Configuration
// This file is loaded at runtime to configure the backend API URL

window.ENV = {
  // Backend API URL - will be different for each environment
  // Development: http://localhost:3000
  // Production: https://your-backend.onrender.com (set this after deploying backend)
  BACKEND_URL: 'http://localhost:3000',
  
  // You can add more configuration here
  APP_NAME: 'DatiDashi Company',
  VERSION: '1.0.0'
};

// Auto-detect environment based on hostname
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  // Production mode - update this URL after deploying backend to Render
  // Example: window.ENV.BACKEND_URL = 'https://nestjs-datidashi.onrender.com';
  console.log('🌍 Running in PRODUCTION mode');
  console.log('⚠️ Remember to update BACKEND_URL in config.js after deploying backend!');
} else {
  console.log('💻 Running in DEVELOPMENT mode');
}

console.log('🔗 Backend URL:', window.ENV.BACKEND_URL);
