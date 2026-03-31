document.addEventListener('DOMContentLoaded', () => {
    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        function applyFilter(filterValue) {
            portfolioItems.forEach(item => {
                let shouldShow = false;
                
                if (filterValue === 'all') {
                    shouldShow = item.classList.contains('featured');
                } else {
                    shouldShow = item.classList.contains(filterValue);
                }

                if (shouldShow) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 300);
                }
            });
        }

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                applyFilter(btn.getAttribute('data-filter'));
            });
        });

        // Initial Filter (Show only featured on load)
        applyFilter('all');
    }

    // Enhanced Scroll Animation (Intersection Observer with Stagger)
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // If it's a staggered container, animate children
                    if (entry.target.classList.contains('reveal-stagger')) {
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('active');
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // EmailJS Contact Form Integration
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... <i class="ph ph-spinner-gap ph-spin"></i>';
            btn.style.opacity = '0.8';

            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Dynamic Check for EmailJS (Simple optimization)
            if (typeof emailjs !== 'undefined') {
                emailjs.send(env.SERVICE_KEY, env.TEMPLATE_KEY, templateParams)
                    .then(() => {
                        btn.innerHTML = 'Message Sent! <i class="ph ph-check-circle"></i>';
                        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                        contactForm.reset();
                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.background = '';
                            btn.style.opacity = '1';
                        }, 3000);
                    })
                    .catch((error) => {
                        console.error('FAILED...', error);
                        btn.innerHTML = 'Error! Try Again <i class="ph ph-x-circle"></i>';
                        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.style.background = '';
                            btn.style.opacity = '1';
                        }, 3000);
                    });
            }
        });
    }

    // Video Modal Logic
    const videoModal = document.getElementById('videoModal');
    const modalIframe = document.getElementById('modalIframe');
    const modalClose = document.querySelector('.modal-close');
    const videoItems = document.querySelectorAll('.video-item');

    if (videoModal && modalIframe && modalClose) {
        videoItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.getAttribute('data-video-id');
                const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                modalIframe.setAttribute('src', videoUrl);
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            videoModal.classList.remove('active');
            modalIframe.setAttribute('src', '');
            document.body.style.overflow = 'auto';
        };

        modalClose.addEventListener('click', closeModal);
        videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && videoModal.classList.contains('active')) closeModal(); });
    }
});
