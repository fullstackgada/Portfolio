// Utility: Attach smooth scroll to all anchor links
function attachSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.length > 1 && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// Attach smooth scroll after DOM is loaded
document.addEventListener('DOMContentLoaded', attachSmoothScroll);

// Attach smooth scroll again after header is loaded (for dynamic links)
fetch('header.html').then(res => res.text()).then(data => {
  document.getElementById('header-include').innerHTML = data;
  
 
  
  attachSmoothScroll();

  // Hamburger menu logic
  const hamburger = document.querySelector('.hamburger');
  const hamburgerIcon = hamburger ? hamburger.querySelector('span') : null;
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && hamburgerIcon && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('animated');
      if (navMenu.classList.contains('active')) {
        hamburgerIcon.textContent = '✖';
      } else {
        hamburgerIcon.textContent = '☰';
      }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('animated');
        hamburgerIcon.textContent = '☰';
      });
    });
  }

  // Attach smooth scroll again after header is loaded
  attachSmoothScroll();

  // Prevent default for menu links on interactive.html if section doesn't exist
  const menuLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      // Only act if on interactive.html and target section does not exist
      if (window.location.pathname.endsWith('interactive.html')) {
        const target = document.querySelector(href);
        if (!target) {
          e.preventDefault();
          // Optionally scroll to top or show a message
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // Optionally, show a toast/message (customize as needed)
          // alert('Section coming soon!');
        }
      }
    });
  });
});

// Load footer
fetch('footer.html').then(res => res.text()).then(data => {
  document.getElementById('footer-include').innerHTML = data;
});

// Scroll-triggered animations
const sections = document.querySelectorAll('.fade-in-section');
const messages = document.querySelectorAll('.chat-message');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));
messages.forEach((message, index) => {
  observer.observe(message);
  message.style.transitionDelay = `${index * 0.2}s`;
});

// Form submission handler
function handleFormSubmit(event) {
  event.preventDefault();
  alert("Arre waah! Message bhej diya? Main jaldi reply karunga! 😄");
  event.target.reset();
  triggerConfetti();
}
window.handleFormSubmit = handleFormSubmit;

// Confetti effect
function triggerConfetti() {
  const confettiContainer = document.getElementById('confetti');
  if (!confettiContainer) return;
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDelay = `${Math.random() * 4}s`;
    confettiContainer.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}
window.triggerConfetti = triggerConfetti;

// Interactive feature cards
if (document.querySelectorAll('.feature-card').length > 0) {
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) rotate(2deg)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotate(0deg)';
    });
  });
}

// Random Gada quotes
const gadaQuotes1 = [
  "Arre yaar, technology seekhna hai toh Fullstackgada ke paas aa jao!",
  "Technology main bahut paisa hain esa Bpujitaji ne kaha hain!",
];

let lastQuoteIndices = [-1, -1];
function rotateDoubleQuotes(selector1, selector2, quotesArray) {
  if (quotesArray.length < 2) return;
  let idx1, idx2;
  do {
    idx1 = Math.floor(Math.random() * quotesArray.length);
    idx2 = Math.floor(Math.random() * quotesArray.length);
  } while (idx1 === idx2 || idx1 === lastQuoteIndices[0] && idx2 === lastQuoteIndices[1]);
  lastQuoteIndices = [idx1, idx2];
  document.querySelectorAll(selector1).forEach(el => el.textContent = '"' + quotesArray[idx1] + '"');
  document.querySelectorAll(selector2).forEach(el => el.textContent = '"' + quotesArray[idx2] + '"');
}

// Show two quotes immediately on load and rotate every 5 seconds after DOM is ready
if (!window.gadaQuoteIntervalSet) {
  window.gadaQuoteIntervalSet = true;
  document.addEventListener('DOMContentLoaded', function() {
    rotateDoubleQuotes('.gada-quote1', '.gada-quote2', gadaQuotes1);
    setInterval(() => {
      rotateDoubleQuotes('.gada-quote1', '.gada-quote2', gadaQuotes1);
    }, 5000);
  });
}

// Back to Top Button functionality
function initBackToTopButton() {
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Initialize back to top button when DOM is loaded
document.addEventListener('DOMContentLoaded', initBackToTopButton);

// Razorpay configuration - loaded from external config file
function getRazorpayConfig() {
  // Check if CONFIG is loaded from config.js
  if (typeof window.CONFIG === 'undefined') {
    console.error('Configuration not loaded. Please ensure config.js is included before main.js');
    return null;
  }
  
  return {
    key: window.CONFIG.RAZORPAY.KEY_ID,
    currency: window.CONFIG.RAZORPAY.CURRENCY,
    name: window.CONFIG.RAZORPAY.COMPANY_NAME,
    description: window.CONFIG.RAZORPAY.DESCRIPTION,
    image: window.CONFIG.RAZORPAY.LOGO,
    theme: {
      color: window.CONFIG.RAZORPAY.THEME_COLOR
    }
  };
}

// Payment handling function with Razorpay integration
function handlePayment(type) {
  let paymentData = {};
  
  switch(type) {
    case 'jalebi':
      paymentData = {
        amount: 5000, // Amount in paise (₹50)
        description: 'Buy Me Jalebi Fafda - Support content creation',
        message: "Jalebi Fafda! Arre yaar, tum toh sach mein Gujarati dil wale ho! 🥨",
        displayAmount: '₹50'
      };
      break;
    default:
      alert("Invalid payment type selected!");
      return;
  }
  
  // Show confirmation dialog
  const confirmed = confirm(`${paymentData.message}\n\nAmount: ${paymentData.displayAmount}\n\nProceed to payment?`);
  
  if (confirmed) {
    initiateRazorpayPayment(paymentData);
  }
}

// Function to initiate Razorpay payment
function initiateRazorpayPayment(paymentData) {
  // Check if Razorpay is loaded
  if (typeof Razorpay === 'undefined') {
    alert("Payment gateway is loading. Please try again in a moment.");
    return;
  }

  // Get Razorpay configuration
  const razorpayConfig = getRazorpayConfig();
  if (!razorpayConfig) {
    alert("Payment configuration not loaded. Please refresh the page and try again.");
    return;
  }

  const options = {
    ...razorpayConfig,
    amount: paymentData.amount,
    description: paymentData.description,
    order_id: '', // You'll get this from your backend
    handler: function (response) {
      handlePaymentSuccess(response, paymentData);
    },
    prefill: {
      name: '',
      email: '',
      contact: ''
    },
    notes: {
      payment_type: paymentData.description,
      website: 'fullstackgada.com'
    },
    modal: {
      ondismiss: function() {
        console.log('Payment modal closed');
      }
    }
  };

  try {
    const rzp = new Razorpay(options);
    
    rzp.on('payment.failed', function (response) {
      handlePaymentFailure(response);
    });
    
    rzp.open();
  } catch (error) {
    console.error('Error initializing Razorpay:', error);
    // Fallback to demo mode
    showDemoPayment(paymentData);
  }
}

// Handle successful payment
function handlePaymentSuccess(response, paymentData) {
  console.log('Payment successful:', response);
  
  // Show success message
  alert(`🎉 Payment Successful! 🎉\n\nPayment ID: ${response.razorpay_payment_id}\nAmount: ${paymentData.displayAmount}\n\nThank you for supporting Fullstackgada! \nJethalal is very happy! 😊`);
  
  // Trigger confetti animation
  triggerConfetti();
  
  // You can send payment details to your backend here
  // sendPaymentDetailsToBackend(response, paymentData);
}

// Handle payment failure
function handlePaymentFailure(response) {
  console.error('Payment failed:', response);
  
  alert(`❌ Payment Failed!\n\nError: ${response.error.description}\nReason: ${response.error.reason}\n\nPlease try again or contact support.`);
}

// Demo payment function (fallback when Razorpay is not available)
function showDemoPayment(paymentData) {
  alert(`🚧 Demo Mode 🚧\n\nThis is a demo payment integration.\nAmount: ${paymentData.displayAmount}\n\nTo enable real payments:\n1. Get Razorpay API keys\n2. Replace 'rzp_test_1234567890' with your actual key\n3. Set up backend order creation\n\nFor now, you can contact us directly:\n📧 Email: fullstackgada@gmail.com\n📱 UPI: fullstackgada@paytm`);
  
  // Simulate successful payment for demo
  setTimeout(() => {
    alert(`✅ Demo Payment Successful!\n\nAmount: ${paymentData.displayAmount}\nThank you for testing! 🙏`);
    triggerConfetti();
  }, 1000);
}

// Function to send payment details to backend (implement as needed)
function sendPaymentDetailsToBackend(response, paymentData) {
  // Example implementation:
  /*
  fetch('/api/verify-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature,
      amount: paymentData.amount,
      description: paymentData.description
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Payment verification:', data);
  })
  .catch(error => {
    console.error('Error verifying payment:', error);
  });
  */
}

// Make function globally available
window.handlePayment = handlePayment;

// Trigger confetti on load
window.onload = () => {
  triggerConfetti();
};
