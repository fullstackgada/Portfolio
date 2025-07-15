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

### 2. Configure API Keys
In `main.js`, replace the test key with your actual Razorpay key:

```javascript
const RAZORPAY_CONFIG = {
  key: 'rzp_live_YOUR_ACTUAL_KEY_HERE', // Replace with your live key
  currency: 'INR',
  name: 'Fullstackgada',
  description: 'Support Fullstackgada Content Creation',
  image: 'image/jetha.png',
  theme: {
    color: '#356c67'
  }
};
```

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