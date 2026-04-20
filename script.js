// ===== DOM Elements =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');
const portfolioCards = document.querySelectorAll('.portfolio-card');

// ===== Portfolio Card Hover Effects Enhancement =====
portfolioCards.forEach(card => {
    // Subtle 3D tilt effect for larger screens
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 40;
            const rotateX = (centerY - y) / 40;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        }
    });
});

// ===== Mobile Menu Toggle =====
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        
        if (nav.style.display === 'flex') {
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.width = '100%';
            nav.style.background = 'rgba(10, 10, 20, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.padding = '20px';
            nav.style.gap = '20px';
            nav.style.borderTop = '1px solid rgba(0, 247, 255, 0.1)';
            nav.style.zIndex = '100';
        }
    });
}

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && nav.style.display === 'flex') {
                nav.style.display = 'none';
            }
        }
    });
});

// ===== Animate Elements on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe portfolio cards for animation
portfolioCards.forEach(card => {
    observer.observe(card);
});

// ===== Ripple Effect for Buttons =====
document.querySelectorAll('.btn, .btn-visit-project').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ===== Initialize Page Animations =====
document.addEventListener('DOMContentLoaded', () => {
    // Add animation class to hero section
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    setTimeout(() => {
        if (heroContent) heroContent.classList.add('animated');
        if (heroVisual) heroVisual.classList.add('animated');
    }, 300);
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn, .btn-visit-project {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});

// ===== Parallax Effect for Background Elements =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const circle1 = document.querySelector('.circle-1');
    const circle2 = document.querySelector('.circle-2');
    const circle3 = document.querySelector('.circle-3');
    
    if (circle1) circle1.style.transform = `translateY(${rate * 0.3}px)`;
    if (circle2) circle2.style.transform = `translateY(${rate * 0.5}px)`;
    if (circle3) circle3.style.transform = `translateY(${rate * 0.7}px)`;
});

// ===== Ensure all external links open safely =====
document.querySelectorAll('.btn-visit-project').forEach(btn => {
    btn.setAttribute('rel', 'noopener noreferrer');
});