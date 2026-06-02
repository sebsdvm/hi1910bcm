// Set tahun saat ini untuk footer
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('current-year-nav').textContent = new Date().getFullYear(); 

// Inisialisasi AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
});

document.addEventListener('DOMContentLoaded', () => {
    // --- QUERY SELECTORS ---
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const menuBgContainer = document.getElementById('menu-bg-container'); 
    const closeBtn = document.getElementById('close-btn');
    
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // =========================================================
    // === 1. LOGIKA NAVIGASI (Sidebar Menu) ===
    // =========================================================
    const toggleSidebar = () => {
        sidebarNav.classList.toggle('active');
        menuBgContainer.classList.toggle('active'); 
        sidebarOverlay.classList.toggle('active');
        document.documentElement.classList.toggle('no-scroll');
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    navLinks.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            setTimeout(() => {
                if (sidebarNav.classList.contains('active')) {
                    toggleSidebar();
                }
            }, 300);
        });
    });

    // === ACTIVE LINK PADA NAVIGASI SAAT SCROLL ===
    const sections = document.querySelectorAll('section, header');
    const navOptions = {
        root: null,
        threshold: 0.3 
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                const correspondingLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, navOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // =========================================================
    // === 2. ANIMASI TYPEWRITER (Header) ===
    // =========================================================
    const textElement = document.getElementById('job-title');
    const textsToAnimate = [ "High School Student.", "Tech Enthusiast.", "Front-end Developer." ];
    let textIndex = 0;   
    let charIndex = 0;   
    let isDeleting = false;
    
    const type = () => {
        if (!textElement) return; 
        const currentText = textsToAnimate[textIndex]; 

        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {                isDeleting = false;
                textIndex = (textIndex + 1) % textsToAnimate.length;
                setTimeout(type, 500);
            } else {
                setTimeout(type, 80);
            }
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(type, 1000);
            } else {
                setTimeout(type, 150);
            }
        }
    }
    type();

    // =========================================================
    // === 3. ANIMASI TIMELINE LINE & ICONS ===
    // =========================================================
    const timeline = document.getElementById('timeline-animated');
    const timelineFill = document.getElementById('timeline-fill');
    const timelineDots = document.querySelectorAll('.timeline-dot-container');

    if (timeline && timelineFill) {
        const updateTimelineProgress = () => {
            const timelineRect = timeline.getBoundingClientRect();
            const timelineTop = timelineRect.top;
            const timelineHeight = timelineRect.height;
            
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.7;
            
            let scrollProgress = 0;
            
            if (timelineTop < triggerPoint) {
                const scrolledPast = triggerPoint - timelineTop;
                scrollProgress = Math.min(scrolledPast / timelineHeight, 1);
            }
            
            const fillHeight = scrollProgress * 100;
            timelineFill.style.height = fillHeight + '%';
            
            timelineDots.forEach((dot) => {
                const dotRect = dot.getBoundingClientRect();
                const dotCenterY = dotRect.top + (dotRect.height / 2);
                
                if (dotCenterY <= triggerPoint + 20) {                    if (!dot.classList.contains('icon-active')) {
                        dot.classList.add('icon-active');
                    }
                } else {
                    dot.classList.remove('icon-active');
                }
            });
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateTimelineProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', updateTimelineProgress);
        
        updateTimelineProgress();
    }
});
