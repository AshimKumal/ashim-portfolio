/**
 * Shared UI Logic - Ashim Kumal Portfolio
 * This script handles Navbar and Footer injection and shared UI interactions.
 */

const NAVBAR_HTML = `
    <div class="nav-container">
        <a href="{HOME_LINK}" class="logo">ASHIM<span>.</span></a>
        <ul class="nav-links">
            <li><a href="{HOME_LINK}">Home</a></li>
            <li><a href="{HOME_LINK_ABOUT}">About</a></li>
            <li><a href="{HOME_LINK_PORTFOLIO}">Work</a></li>
            <li><a href="{HOME_LINK_SERVICES}">Services</a></li>
            <li><a href="{HOME_LINK_BLOG}">Blog</a></li>
            <li><a href="{HOME_LINK_CONTACT}" class="btn-primary btn-small">Contact</a></li>
        </ul>
        <div class="mobile-menu-btn">
            <i class="ph ph-list"></i>
        </div>
    </div>
`;

const FOOTER_HTML = `
    <div class="footer-container">
        <div class="footer-brand">
            <a href="{HOME_LINK}" class="logo">ASHIM<span>.</span></a>
            <p><strong>I help brands grow through design systems and visual storytelling.</strong> Available for freelance & collaborations worldwide.</p>
        </div>
        <div class="footer-links">
            <h4>Quick Links</h4>
            <ul>
                <li><a href="{HOME_LINK}">Home</a></li>
                <li><a href="{HOME_LINK_PORTFOLIO}">Selected Work</a></li>
                <li><a href="{HOME_LINK_SERVICES}">Services</a></li>
                <li><a href="{HOME_LINK_ABOUT}">About Me</a></li>
                <li><a href="{HOME_LINK_BLOG}">Insights</a></li>
            </ul>
        </div>
        <div class="footer-social">
            <h4>Let's Connect</h4>
            <div class="social-icons">
                <a href="https://www.linkedin.com/in/ashim-k-43a717194/" target="_blank"><i class="ph ph-linkedin-logo"></i></a>
                <a href="https://www.instagram.com/ashim_kum/" target="_blank"><i class="ph ph-instagram-logo"></i></a>
                <a href="https://wa.me/9779824133178" target="_blank"><i class="ph ph-whatsapp-logo"></i></a>
            </div>
            <p style="margin-top: 20px; font-size: 0.9rem;">ashimkumal061@gmail.com</p>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; <span id="year"></span> Ashim Kumal. Nepal's Creative Industry Level: Global.</p>
    </div>
`;

document.addEventListener('DOMContentLoaded', () => {
    // 0. Auto-Inject Layout
    const path = window.location.pathname;
    const isHomePage = path === '/' || path.endsWith('index.html') || path === '';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let navMarkup = NAVBAR_HTML
            .replace(/{HOME_LINK}/g, isHomePage ? '#home' : 'index.html')
            .replace(/{HOME_LINK_ABOUT}/g, isHomePage ? '#about' : 'index.html#about')
            .replace(/{HOME_LINK_SERVICES}/g, isHomePage ? '#services' : 'index.html#services')
            .replace(/{HOME_LINK_PORTFOLIO}/g, isHomePage ? '#portfolio' : 'index.html#portfolio')
            .replace(/{HOME_LINK_BLOG}/g, 'blog.html')
            .replace(/{HOME_LINK_CONTACT}/g, isHomePage ? '#contact' : 'index.html#contact');
            
        navbar.innerHTML = navMarkup;
        initNavbarInteractions(navbar);
    }

    const footer = document.querySelector('footer');
    if (footer) {
        let footerMarkup = FOOTER_HTML
            .replace(/{HOME_LINK}/g, isHomePage ? '#home' : 'index.html')
            .replace(/{HOME_LINK_ABOUT}/g, isHomePage ? '#about' : 'index.html#about')
            .replace(/{HOME_LINK_SERVICES}/g, isHomePage ? '#services' : 'index.html#services')
            .replace(/{HOME_LINK_PORTFOLIO}/g, isHomePage ? '#portfolio' : 'index.html#portfolio')
            .replace(/{HOME_LINK_BLOG}/g, 'blog.html');
            
        footer.innerHTML = footerMarkup;
        const yearSpan = footer.querySelector('#year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    function initNavbarInteractions(navElement) {
        // 1. Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navElement.classList.add('scrolled');
            } else {
                navElement.classList.remove('scrolled');
            }
        });

        // 2. Mobile Menu Toggle
        const menuBtn = navElement.querySelector('.mobile-menu-btn');
        const navLinks = navElement.querySelector('.nav-links');
        const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

        if (menuBtn && navLinks && menuIcon) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                if (navLinks.classList.contains('active')) {
                    menuIcon.classList.replace('ph-list', 'ph-x');
                } else {
                    menuIcon.classList.replace('ph-x', 'ph-list');
                }
            });

            // Close mobile menu when a link is clicked
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuIcon.classList.replace('ph-x', 'ph-list');
                });
            });
        }
    }

    // 4. Custom Cursor Logic (Existing)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) {
        let cursor = document.querySelector('.custom-cursor');
        let cursorOutline = document.querySelector('.custom-cursor-outline');
        
        // Auto-inject cursor if missing
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            document.body.prepend(cursor);
        }
        if (!cursorOutline) {
            cursorOutline = document.createElement('div');
            cursorOutline.className = 'custom-cursor-outline';
            document.body.prepend(cursorOutline);
        }
        
        
        if (cursor && cursorOutline) {
            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            let outlineX = 0, outlineY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.2;
                cursorY += (mouseY - cursorY) * 0.2;
                cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

                outlineX += (mouseX - outlineX) * 0.15;
                outlineY += (mouseY - outlineY) * 0.15;
                
                const rect = cursorOutline.getBoundingClientRect();
                const offsetX = rect.width / 2;
                const offsetY = rect.height / 2;
                cursorOutline.style.transform = `translate3d(${outlineX - offsetX}px, ${outlineY - offsetY}px, 0)`;

                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            // Hover effects
            const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .skill-card');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            });

            const textElements = document.querySelectorAll('h1, h2, h3, p, .hero-subtitle');
            textElements.forEach(el => {
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-text'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-text'));
            });
        }
    }
});
