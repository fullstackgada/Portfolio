// Configuration template file
// Copy this file to config.js and replace the placeholder values with your actual credentials
// DO NOT commit config.js to your repository - it should be in .gitignore

const CONFIG = {
  // Razorpay Configuration
  RAZORPAY: {
    // Replace with your actual Razorpay key ID
    // Get this from: https://dashboard.razorpay.com/app/keys
    KEY_ID: 'rzp_live_YOUR_ACTUAL_KEY_HERE', // Replace with your live key
    CURRENCY: 'INR',
    COMPANY_NAME: 'Fullstackgada',
    DESCRIPTION: 'Support Fullstackgada Content Creation',
    LOGO: 'image/jetha.png',
    THEME_COLOR: '#356c67'
  },
  
  // API Endpoints (if you have a backend)
  API: {
    BASE_URL: '', // Your backend URL
    CREATE_ORDER: '/api/create-order',
    VERIFY_PAYMENT: '/api/verify-payment'
  },
  
  // Contact Information
  CONTACT: {
    EMAIL: 'fullstackgada@gmail.com',
    UPI: 'fullstackgada@paytm'
  }
};

// Export configuration for use in other files
window.CONFIG = CONFIG;