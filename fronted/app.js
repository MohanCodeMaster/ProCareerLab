// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form and button
    const bookingForm = document.getElementById('bookingForm');
    const payButton = document.getElementById('rzp-button1');

    // Add a submit event listener to the form
    bookingForm.addEventListener('submit', async function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('Email').value;
        const phone = document.getElementById('phone').value;
        
        // Validate form data (basic validation)
        if (!name || !email || !phone) {
            alert('Please fill all the required fields');
            return;
        }
        
        try {
            // 1. Create Order by calling your backend
            const response = await fetch('http://localhost:3000/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    amount: 99,
                    name: name,
                    email: email,
                    phone: phone
                })
            });

            const orderData = await response.json();

            // 2. Now open Razorpay Checkout
            var options = {
                "key": "rzp_live_ZKvmU3WN20hbme", // Your Razorpay Key ID
                "amount": orderData.amount,       // From backend
                "currency": "INR",
                "name": "ProCareerLab",
                "description": "Payment for workshop",
                "image": "logo.jpg",
                "order_id": orderData.id,          // << VERY IMPORTANT
                "handler": async function (response) {
                    // 3. After payment, verify it
                    const verifyResponse = await fetch('http://localhost:3000/verify-payment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            ...response,
                            name: name,
                            email: email,
                            phone: phone
                        })
                    });

                    const verifyResult = await verifyResponse.json();

                    if (verifyResult.success) {
                        alert("Payment Successful and Verified ✅");
                        // Optionally redirect to a success page
                        // window.location.href = '/success.html';
                    } else {
                        alert("Payment verification failed ❌");
                    }
                },
                "prefill": {
                    "name": name,
                    "email": email,
                    "contact": phone
                },
                "theme": {
                    "color": "#4caf50"
                }
            };

            var rzp = new Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    });
});