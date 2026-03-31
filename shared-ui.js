/**
 * Shared UI Logic - Ashim Kumal Portfolio
 * This script handles Navbar and Footer injection and shared UI interactions.
 */

const NAVBAR_HTML = `
    <div class="nav-container">
        <a href="{HOME_LINK}" class="logo">ASHIM<span>.</span></a>
        <ul class="nav-links">
            <li><a href="{HOME_LINK_ABOUT}">About</a></li>
            <li><a href="{HOME_LINK_EXP}">Experience</a></li>
            <li><a href="{HOME_LINK_SERVICES}">Services</a></li>
            <li><a href="{HOME_LINK_PORTFOLIO}">Projects</a></li>
            <li><a href="{HOME_LINK_CONTACT}" class="btn-primary btn-small">Contact</a></li>
        </ul>
        <div class="mobile-menu-btn">
            <i class="ph ph-list"></i>
        </div>
    </div>
`;

const FOOTER_HTML = `
    <p>&copy; <span id="year"></span> Ashim Kumal. Crafted with passion.</p>
`;

document.addEventListener('DOMContentLoaded', () => {
    // 0. Auto-Inject Layout
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '';
    
    // Determine the base path for Home
    // If not home, we point back to index.html with anchors
    const homeBase = isHomePage ? '' : 'index.html';
    
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let navMarkup = NAVBAR_HTML
            .replace(/{HOME_LINK}/g, isHomePage ? '#home' : 'index.html')
            .replace(/{HOME_LINK_ABOUT}/g, isHomePage ? '#about' : 'index.html#about')
            .replace(/{HOME_LINK_EXP}/g, isHomePage ? '#experience' : 'index.html#experience')
            .replace(/{HOME_LINK_SERVICES}/g, isHomePage ? '#services' : 'index.html#services')
            .replace(/{HOME_LINK_PORTFOLIO}/g, isHomePage ? '#portfolio' : 'index.html#portfolio')
            .replace(/{HOME_LINK_CONTACT}/g, isHomePage ? '#contact' : 'index.html#contact');
            
        navbar.innerHTML = navMarkup;
        
        // Initialize interactive elements AFTER injection
        initNavbarInteractions(navbar);
    }

    const footer = document.querySelector('footer');
    if (footer) {
        footer.innerHTML = FOOTER_HTML;
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
        const cursor = document.querySelector('.custom-cursor');
        const cursorOutline = document.querySelector('.custom-cursor-outline');
        
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
