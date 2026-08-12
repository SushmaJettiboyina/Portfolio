// Intersection Observer for Scroll Reveals
const revealSections = document.querySelectorAll('.scroll-reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Only trigger once
        }
    });
}, {
    threshold: 0.12
});

revealSections.forEach(section => {
    revealObserver.observe(section);
});

// Lazy Counter Trigger
const counterElements = document.querySelectorAll('.stat-counter, .coding-number');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

counterElements.forEach(element => {
    counterObserver.observe(element);
});

function startCounter(counter) {
    const target = parseFloat(counter.getAttribute('data-target'));
    const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
    
    if (isNaN(target)) return;
    
    let count = 0;
    const duration = 1800; // Milliseconds
    const stepTime = 30; // Milliseconds per update
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            let suffix = '';
            if (counter.classList.contains('stat-counter') && decimals === 0) {
                suffix = '+';
            } else if (counter.classList.contains('coding-number')) {
                suffix = '+';
            }
            counter.innerText = target.toFixed(decimals) + suffix;
            clearInterval(interval);
        } else {
            counter.innerText = count.toFixed(decimals);
        }
    }, stepTime);
}

// Scroll Spy for Nav Active States
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 180; // offset

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Achievement Slides Slider with Auto-Play and manual dots control
const sliders = document.querySelectorAll('.achievement-slider');

sliders.forEach(slider => {
    const slides = slider.querySelectorAll('.slide');
    const dotsContainer = slider.querySelector('.slider-dots');
    
    if (slides.length <= 1) return;
    
    // Dynamically build dot navigations
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });

    let current = 0;
    let slideInterval = setInterval(nextSlide, 3500);

    function goToSlide(index) {
        slides[current].classList.remove('active');
        dotsContainer.children[current].classList.remove('active');
        current = index;
        slides[current].classList.add('active');
        dotsContainer.children[current].classList.add('active');
        
        // Reset timing interval on interaction
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3500);
    }

    function nextSlide() {
        const nextIndex = (current + 1) % slides.length;
        goToSlide(nextIndex);
    }
});

// Mobile Navbar Navigation Toggle
function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('mobile-active');
}

// Auto-close menu when nav links are clicked on mobile viewport
const navLinksItems = document.querySelectorAll('.nav-item');
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.remove('mobile-active');
    });
});

// Interactive AJAX Contact Form Submission
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const originalBtnContent = submitBtn.innerHTML;
        
        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        formStatus.className = 'form-status';
        formStatus.innerText = '';
        
        // Demo Mode Interceptor for Placeholder Formspree IDs
        if (contactForm.action.includes('xoqgpdne')) {
            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> <b>Demo Mode:</b> Message sent successfully! (Setup your own Formspree ID to receive real emails).';
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
            }, 1200);
            return;
        }
        
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data && data.errors) {
                    formStatus.className = 'form-status error';
                    formStatus.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${data.errors.map(err => err.message).join(', ')}`;
                } else {
                    throw new Error('Form submission failed');
                }
            }
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Oops! Something went wrong. Please check your connection and try again.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
        }
    });
}

// Interactive Resume Modal Viewer Trigger
const viewResumeBtn = document.getElementById('viewResumeBtn');
const resumeModal = document.getElementById('resumeModal');
const closeModalBtn = document.querySelector('.close-modal');

if (viewResumeBtn && resumeModal) {
    viewResumeBtn.addEventListener('click', () => {
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    });

    const closeModal = () => {
        resumeModal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock background scrolling
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Dismiss when clicking outside modal box
    resumeModal.addEventListener('click', (e) => {
        if (e.target === resumeModal) {
            closeModal();
        }
    });

    // Dismiss when pressing Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
            closeModal();
        }
    });
}