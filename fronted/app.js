// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // ✅ Initialize payment loader
    PaymentLoader.init();

    // Get references to the form and button
    const bookingForm = document.getElementById('bookingForm');

    // Add a submit event listener to the form
    bookingForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // ✅ Show loader right after form submission
        PaymentLoader.show();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('Email').value;
        const phone = document.getElementById('phone').value;

        // Validate form data (basic validation)
        if (!name || !email || !phone) {
            alert('Please fill all the required fields');
            PaymentLoader.hide(); // Hide loader if validation fails
            return;
        }

        try {
            // Create Order by calling your backend
            const response = await fetch('https://server-ftjw.onrender.com/create-order', {
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

            // Razorpay Options
            var options = {
                "key": "rzp_live_ZKvmU3WN20hbme",
                "amount": orderData.amount,
                "currency": "INR",
                "name": "ProCareerLab",
                "description": "Payment for workshop",
                "image": "images/logo_new.jpg",
                "order_id": orderData.id,
                "handler": async function (response) {
                    // After payment, verify it
                    const verifyResponse = await fetch('https://server-ftjw.onrender.com/verify-payment', {
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
                        window.location.href = "payment.html";
                    } else {
                        alert("Payment verification failed ❌");
                    }

                    // ✅ Always hide the loader
                    PaymentLoader.hide();
                },
                "modal": {
                    ondismiss: function () {
                        PaymentLoader.hide(); // ✅ Hide loader if popup is closed
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

            const rzp = new Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
            PaymentLoader.hide(); // ✅ Hide loader on error
        }
    });
});
