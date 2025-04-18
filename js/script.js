// PayPal Clone - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Toggle animation for hamburger menu
            const bars = mobileToggle.querySelectorAll('.bar');
            if (mobileToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-toggle')) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Reset hamburger menu
            const bars = mobileToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Sticky header
    let header = document.querySelector('header');
    let scrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset;
        
        if (currentScroll > 150) {
            header.style.boxShadow = 'var(--shadow)';
            
            // Hide header when scrolling down, show when scrolling up
            if (currentScroll > scrollPosition) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            scrollPosition = currentScroll;
        } else {
            header.style.boxShadow = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    
                    const bars = mobileToggle.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            }
        });
    });
    
    // Form validation (if exists)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    
                    // Add error styling
                    field.classList.add('error');
                    
                    // Create error message if doesn't exist
                    let errorMessage = field.nextElementSibling;
                    if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                        errorMessage = document.createElement('div');
                        errorMessage.classList.add('error-message');
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMessage, field.nextSibling);
                    }
                } else {
                    // Remove error styling
                    field.classList.remove('error');
                    
                    // Remove error message if exists
                    const errorMessage = field.nextElementSibling;
                    if (errorMessage && errorMessage.classList.contains('error-message')) {
                        errorMessage.remove();
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    });
    
    // Mock crypto price ticker (for Crypto Trading section)
    const cryptoPrices = document.querySelector('.crypto-prices');
    if (cryptoPrices) {
        const currencies = [
            { name: 'Bitcoin', symbol: 'BTC', price: 38421.50 },
            { name: 'Ethereum', symbol: 'ETH', price: 2245.75 },
            { name: 'Litecoin', symbol: 'LTC', price: 86.33 },
            { name: 'Ripple', symbol: 'XRP', price: 0.58 }
        ];
        
        // Create initial price elements
        currencies.forEach(currency => {
            const priceElement = document.createElement('div');
            priceElement.classList.add('crypto-price-item');
            priceElement.innerHTML = `
                <span class="crypto-name">${currency.symbol}</span>
                <span class="crypto-value">$${currency.price.toFixed(2)}</span>
                <span class="crypto-change up">+1.2%</span>
            `;
            cryptoPrices.appendChild(priceElement);
        });
        
        // Update prices randomly every 5 seconds
        setInterval(() => {
            const priceItems = document.querySelectorAll('.crypto-price-item');
            
            priceItems.forEach((item, index) => {
                const priceElement = item.querySelector('.crypto-value');
                const changeElement = item.querySelector('.crypto-change');
                
                // Generate random price change (-2% to +2%)
                const change = (Math.random() * 4 - 2) / 100;
                const currentPrice = parseFloat(priceElement.textContent.replace('$', ''));
                const newPrice = currentPrice * (1 + change);
                
                // Update price
                priceElement.textContent = `$${newPrice.toFixed(2)}`;
                
                // Update change indicator
                if (change >= 0) {
                    changeElement.textContent = `+${(change * 100).toFixed(1)}%`;
                    changeElement.classList.remove('down');
                    changeElement.classList.add('up');
                } else {
                    changeElement.textContent = `${(change * 100).toFixed(1)}%`;
                    changeElement.classList.remove('up');
                    changeElement.classList.add('down');
                }
            });
        }, 5000);
    }
}); 