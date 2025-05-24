document.addEventListener('DOMContentLoaded', function() {
    // Cursor follower
    const cursor = document.querySelector('.cursor-follower');
    let mouseX = 0;
    let mouseY = 0;
    
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Fade in cursor when mouse moves
        gsap.to(cursor, {
            opacity: 0.5,
            duration: 0.3
        });
    });
    
    gsap.ticker.add(() => {
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.2
        });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.3
        });
    });
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero Animation
    const heroTl = gsap.timeline();
    
    heroTl.to('.hero h1', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    })
    .to('.hero p', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .to('.hero-btn', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.5");
    
    // Search Form Animation
    gsap.to('.search-form', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.5
    });
    
    // Popular Category Section
    gsap.to('.section-header h2', {
        scrollTrigger: {
            trigger: '.section-header',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.to('.category-description', {
        scrollTrigger: {
            trigger: '.category-description',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    // Cafe Cards Animation with stagger
    gsap.to('.cafe-card', {
        scrollTrigger: {
            trigger: '.cafe-cards',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
    
    // Perfect Experience Section
    gsap.to('.experience-text h2', {
        scrollTrigger: {
            trigger: '.experience-text',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.to('.experience-text p', {
        scrollTrigger: {
            trigger: '.experience-text p',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2
    });
    
    gsap.to('.feature-item', {
        scrollTrigger: {
            trigger: '.feature-list',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.to('.experience-btn', {
        scrollTrigger: {
            trigger: '.experience-btn',
            start: "top 90%"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
    
    // Cafinder Logo Animation
    gsap.to('.cafinder-logo', {
        scrollTrigger: {
            trigger: '.cafinder-logo',
            start: "top 80%"
        },
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    });
    
    // Stats Animation
    gsap.to('.stat-item', {
        scrollTrigger: {
            trigger: '.stats',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });
    
    // Special Text Animation for "spot" in the hero heading
    // First, wrap "Cafe" in a span
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading) {
        if (!document.querySelector('.highlight-word')) {
            let text = heroHeading.textContent;
            let newText = text.replace('spot', '<span class="highlight-word">spot</span>');
            heroHeading.innerHTML = newText;
        }
        
        // Animate the highlighted word
        gsap.from('.highlight-word', {
            color: '#F05438',
            fontWeight: 900,
            scale: 1.2,
            duration: 1.5,
            ease: "elastic.out(1.2, 0.4)",
            delay: 1
        });
    }
    
    // Arrows click functionality for cafe cards
    document.querySelector('.next-btn')?.addEventListener('click', function() {
        const cards = document.querySelector('.cafe-cards');
        cards.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
    
    document.querySelector('.prev-btn')?.addEventListener('click', function() {
        const cards = document.querySelector('.cafe-cards');
        cards.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    // Search tab functionality
    const searchTabs = document.querySelectorAll('.search-tab');
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            searchTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Scroll progress bar
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY;
        let docHeight = document.body.offsetHeight;
        let winHeight = window.innerHeight;
        let scrollPercent = scrollTop / (docHeight - winHeight);
        let scrollPercentRounded = Math.round(scrollPercent * 100);
        document.querySelector('.progress-bar').style.width = scrollPercentRounded + '%';
    });
});