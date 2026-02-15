
// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1500);
});

// Custom Cursor (Desktop only)
if (window.matchMedia("(min-width: 1024px)").matches) {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX - 20 + 'px';
            follower.style.top = e.clientY - 20 + 'px';
        }, 100);
    });

    document.querySelectorAll('a, button, .portfolio-item, .service-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            follower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
        });
    });
} else {
    document.getElementById('cursor').style.display = 'none';
    document.getElementById('cursorFollower').style.display = 'none';
}

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            setTimeout(() => {
                element.classList.add('active');
            }, element.getAttribute('data-delay') || 0);
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Animate skill bars
const skillCategories = document.querySelectorAll('.skill-category');

const animateSkills = () => {
    skillCategories.forEach(category => {
        const rect = category.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const progressBars = category.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }
    });
};

window.addEventListener('scroll', animateSkills);

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    });
});

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');

let currentIndex = 0;
let visibleItems = [];

// Portfolio data
const portfolioData = [
    {
        src: 'img/wordpress 3.jpg',
        category: 'Web Design',
        title: 'Luxury E-Commerce Platform'
    },
    {
        src: 'img/bloomro-04.jpg',
        category: 'Graphic Design',
        title: 'Tech Startup Branding'
    },
    {
        src: 'img/logo1.png',
        category: 'Logo Design',
        title: 'Tech Startup Branding'
    },
    {
        src: 'img/Triple Drink Can Mockup 04.png',
        category: 'Branding',
        title: 'Brand Design'
    },
    {
        src: 'img/wordpress 3-01.jpg',
        category: 'Web Design',
        title: 'Corporate Website Redesign'
    },
    {
        src: 'img/Ecogrow img file.png',
        category: 'Graphic Design',
        title: 'Global Marketing Campaign'
    },
    {
        src: 'img/Vellora for 99 design.png',
        category: 'Branding',
        title: 'Premium Packaging Design'
    },
  
];

// Update visible items based on current filter
function updateVisibleItems() {
    visibleItems = [];
    portfolioItems.forEach((item, index) => {
        if (!item.classList.contains('hidden')) {
            visibleItems.push(index);
        }
    });
    totalSlidesEl.textContent = visibleItems.length;
}

// Open lightbox
function openLightbox(index) {
    currentIndex = visibleItems.indexOf(index);
    if (currentIndex === -1) currentIndex = 0;
    
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Update lightbox content
function updateLightboxContent() {
    const dataIndex = visibleItems[currentIndex];
    const data = portfolioData[dataIndex];
    
    lightboxImage.src = data.src;
    lightboxCategory.textContent = data.category;
    lightboxTitle.textContent = data.title;
    currentSlideEl.textContent = currentIndex + 1;
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Next slide
function nextSlide() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateLightboxContent();
}

// Previous slide
function prevSlide() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightboxContent();
}

// Event listeners for portfolio items
portfolioItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        updateVisibleItems();
        openLightbox(index);
    });
});

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    nextSlide();
});
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    prevSlide();
});

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
});

// Update visible items when filter changes
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(updateVisibleItems, 350);
    });
});

// Initialize
updateVisibleItems();

// ============================================

// Contact Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btn = contactForm.querySelector('.submit-btn');
    const originalText = btn.textContent;
    
    btn.textContent = 'Sending...';
    btn.style.background = '#333';
    
    setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#00ff00';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// Back to Top
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.2);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});
