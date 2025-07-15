# Razorpay Payment Integration Setup

## Overview
Your Fullstackgada website now includes Razorpay payment integration for accepting donations and course payments. The integration is currently in demo mode and needs to be configured with your actual Razorpay credentials.

## Current Payment Options
2. **Buy Me Jalebi Fafda** - ₹50  

## Setup Instructions

### 1. Get Razorpay Account
1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up for a new account or log in
3. Complete KYC verification
4. Get your API keys from the dashboard

### 2. Secure Configuration Setup
**IMPORTANT**: Your Razorpay keys are now stored securely in a separate configuration file.

1. **Copy the template**: Copy `config.template.js` to `config.js`
   ```bash
   cp config.template.js config.js
   ```

2. **Update your keys**: Edit `config.js` and replace `rzp_live_YOUR_ACTUAL_KEY_HERE` with your actual Razorpay key:
   ```javascript
   const CONFIG = {
     RAZORPAY: {
       KEY_ID: 'rzp_live_YOUR_ACTUAL_KEY_HERE', // Replace with your actual key
       // ... other config
     }
   };
   ```

3. **Verify .gitignore**: Ensure `config.js` is listed in `.gitignore` to prevent committing sensitive data:
   ```
   # Environment and Configuration Files
   config.js
   .env
   .env.local
   ```

### 3. Security Features Implemented
✅ **API Key Separation**: Sensitive keys moved to external config file  
✅ **Git Ignore Protection**: Config file automatically excluded from version control  
✅ **Template System**: Safe template file for sharing/deployment  
✅ **Runtime Validation**: Code checks if configuration is properly loaded  
✅ **Error Handling**: Graceful fallbacks when config is missing

### 3. Backend Integration (Recommended)
For production use, you should:

1. **Create Order API**: Set up a backend endpoint to create Razorpay orders
2. **Payment Verification**: Verify payment signatures on your server
3. **Webhook Handling**: Handle payment status updates

Example backend endpoint structure:
```javascript
// Create order endpoint
app.post('/api/create-order', async (req, res) => {
  const { amount, currency } = req.body;
  
  const options = {
    amount: amount * 100, // amount in paise
    currency: currency,
    receipt: `receipt_${Date.now()}`
  };
  
  const order = await razorpay.orders.create(options);
  res.json(order);
});

// Verify payment endpoint
app.post('/api/verify-payment', (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  
  // Verify signature
  const generated_signature = hmac_sha256(razorpay_order_id + "|" + razorpay_payment_id, key_secret);
  
  if (generated_signature === razorpay_signature) {
    // Payment is verified
    res.json({ status: 'success' });
  } else {
    res.json({ status: 'failure' });
  }
});
```

### 4. Testing
- Use test mode keys for development
- Test with Razorpay's test card numbers
- Verify all payment flows work correctly

### 5. Go Live
1. Complete Razorpay account activation
2. Replace test keys with live keys
3. Test with small amounts first
4. Monitor payments in Razorpay dashboard

## Current Features
- ✅ Razorpay checkout integration
- ✅ Multiple payment options
- ✅ Success/failure handling
- ✅ Loading states and animations
- ✅ Mobile responsive design
- ✅ Fallback demo mode
- ✅ Payment method icons
- ✅ Confetti celebration on success

## Security Notes
- Never expose your Razorpay secret key in frontend code
- Always verify payments on your backend
- Use HTTPS in production
- Implement proper error handling
- Log payment events for debugging

## Support
For Razorpay integration issues:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Support](https://razorpay.com/support/)

For website issues, contact the developer.

---

**Note**: The current implementation is in demo mode. Replace the test key with your actual Razorpay key and implement backend verification for production use.