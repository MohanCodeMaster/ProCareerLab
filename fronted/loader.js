// Loader module for payment processing
const PaymentLoader = {
    // Create and initialize the loader
    init: function() {
        // Create the style element
        const style = document.createElement('style');
        style.textContent = `
            /* Loader Styles */
            .payment-loader {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(255, 255, 255, 0.9);
                z-index: 9999;
                align-items: center;
                justify-content: center;
            }
            
            .loader-container {
                text-align: center;
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .loader-text {
                color: #0062cc;
                font-size: 24px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            
            .spinner {
                width: 70px;
                height: 70px;
                margin: 0 auto 15px;
                position: relative;
            }
            
            .spinner:before {
                content: "";
                box-sizing: border-box;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 4px solid transparent;
                border-top-color: #0062cc;
                border-bottom-color: #0062cc;
                animation: spin 1.5s linear infinite;
            }
            
            .loader-progress {
                width: 200px;
                height: 8px;
                background-color: #e9ecef;
                border-radius: 10px;
                overflow: hidden;
                margin: 15px auto;
            }
            
            .progress-bar {
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, #0062cc, #007bff);
                border-radius: 10px;
                animation: progressAnimation 2s ease-in-out infinite;
            }
            
            .loader-info {
                color: #6c757d;
                font-size: 14px;
                margin-top: 10px;
            }
            
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
            
            @keyframes progressAnimation {
                0% {
                    width: 0%;
                }
                50% {
                    width: 70%;
                }
                100% {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Create the loader HTML
        const loaderDiv = document.createElement('div');
        loaderDiv.className = 'payment-loader';
        loaderDiv.id = 'paymentLoader';
        loaderDiv.innerHTML = `
            <div class="loader-container">
                <div class="spinner"></div>
                <div class="loader-text">Verifying</div>
                <div class="loader-progress">
                    <div class="progress-bar"></div>
                </div>
                <div class="loader-info">Please wait while we process your request...</div>
            </div>
        `;
        document.body.appendChild(loaderDiv);
        
        return loaderDiv;
    },
    
    // Show the loader
    show: function() {
        const loader = document.getElementById('paymentLoader');
        if (loader) {
            loader.style.display = 'flex';
        }
    },
    
    // Hide the loader
    hide: function() {
        const loader = document.getElementById('paymentLoader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
};