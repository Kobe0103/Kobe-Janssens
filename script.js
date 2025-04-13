document.addEventListener('DOMContentLoaded', () => {
    // Toggle mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    const scrollThreshold = 50;
    
    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Check on initial load
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create modal popup
    const createModal = () => {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = 'contactModal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-modal';
        closeBtn.innerHTML = '&times;';
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = 'Sending Message...';
        
        const modalMessage = document.createElement('p');
        modalMessage.id = 'modalMessage';
        modalMessage.textContent = 'Please wait while your message is being sent.';
        
        // Append elements
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(modalMessage);
        modal.appendChild(modalContent);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .modal {
                display: none;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                overflow: auto;
                background-color: rgba(0,0,0,0.7);
                backdrop-filter: blur(5px);
            }
            .modal-content {
                position: relative;
                background-color: #222;
                margin: 15% auto;
                padding: 2rem;
                border: 1px solid var(--primary-color);
                width: 80%;
                max-width: 500px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(166, 51, 255, 0.3);
                animation: modalFade 0.3s ease-in-out;
            }
            @keyframes modalFade {
                from {opacity: 0; transform: translateY(-20px);}
                to {opacity: 1; transform: translateY(0);}
            }
            .close-modal {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            .close-modal:hover {
                color: var(--primary-color);
            }
            .modal h3 {
                margin-top: 0;
                color: var(--white);
            }
            .modal p {
                color: var(--white);
            }
            .modal-spinner {
                display: inline-block;
                width: 30px;
                height: 30px;
                border: 3px solid rgba(166, 51, 255, 0.3);
                border-radius: 50%;
                border-top-color: var(--primary-color);
                animation: spin 1s ease-in-out infinite;
                margin-right: 10px;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Add modal to document
        document.body.appendChild(modal);
        
        return modal;
    };
    
    // Create modal on page load
    const modal = createModal();
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Add EmailJS script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        document.head.appendChild(script);
        
        // Initialize EmailJS
        script.onload = () => {
            emailjs.init("QmYuwTc4YP7J2Zosz");
        };
        
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            
            // Get form values
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const subject = contactForm.querySelector('#subject').value;
            const message = contactForm.querySelector('#message').value;
            
            // Show modal
            const modal = document.getElementById('contactModal');
            const modalMessage = document.getElementById('modalMessage');
            
            // Add loading spinner
            modalMessage.innerHTML = '<div class="modal-spinner"></div> Sending your message...';
            modal.style.display = 'block';
            
            // Prepare email data
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'kobejanssens31@gmail.com'
            };
            
            // Send email using EmailJS with your actual IDs
            emailjs.send('service_36ykr6b', 'template_x1u9fpm', templateParams)
                .then(function(response) {
                    // Update modal on success
                    modalMessage.innerHTML = 'Your message has been sent successfully! I\'ll get back to you soon.';
                    contactForm.reset();
                    
                    // Auto-close modal after 5 seconds
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 5000);
                })
                .catch(function(error) {
                    // Update modal on error
                    modalMessage.innerHTML = 'Sorry, there was an error sending your message. Please try again or contact me directly at kobejanssens31@gmail.com';
                    console.error('EmailJS error:', error);
                });
        });
    }
});