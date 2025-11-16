// Frontend Environment Configuration
// This file is loaded at runtime to configure the backend API URL

window.ENV = {
  // Backend API URL - Railway production
  BACKEND_URL: 'https://backend-webdev-datidashi.up.railway.app',
  
  // You can add more configuration here
  APP_NAME: 'DatiDashi Company',
  VERSION: '1.0.0'
};

// Auto-detect environment based on hostname
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  // Production mode
  console.log('🌍 Running in PRODUCTION mode');
  console.log('🔗 Backend URL:', window.ENV.BACKEND_URL);
} else {
  // Development mode - use local backend
  window.ENV.BACKEND_URL = 'http://localhost:3000';
  console.log('💻 Running in DEVELOPMENT mode');
  console.log('🔗 Backend URL:', window.ENV.BACKEND_URL);
}
