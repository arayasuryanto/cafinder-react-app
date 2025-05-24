document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial animations
    const initialTl = gsap.timeline();
    
    // Heading animation
    initialTl.to('.page-heading h1', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    })
    .to('.page-heading p', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.6")
    
    // Location buttons animation
    .to('.location-btn', {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)"
    }, "-=0.4")
    
    // Cafe cards animation with stagger and random directions
    .to('.cafe-card', {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: {
            amount: 1.2,
            from: "random"
        },
        ease: "power3.out"
    }, "-=0.2");
    
    // Location badge animation
    gsap.to('.location-badge', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 1,
        ease: "elastic.out(1, 0.5)"
    });
    
    // Smart Finder section animations
    gsap.to('.smart-finder-text h2', {
        scrollTrigger: {
            trigger: '.smart-finder',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
    
    gsap.to('.smart-finder-text p', {
        scrollTrigger: {
            trigger: '.smart-finder',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.7)"
    });
    
    // Smart Finder images animation
    gsap.to('.finder-image.main', {
        scrollTrigger: {
            trigger: '.smart-finder-images',
            start: "top 80%"
        },
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
    });
    
    // Secondary images with staggered appearance
    gsap.to('.finder-image.secondary', {
        scrollTrigger: {
            trigger: '.smart-finder-images',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)"
    });
    
    // Testimonials section animations
    gsap.to('.testimonials-heading h2', {
        scrollTrigger: {
            trigger: '.testimonials',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
    
    gsap.to('.testimonial-card', {
        scrollTrigger: {
            trigger: '.testimonials',
            start: "top 80%"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.7)"
    });
    
    gsap.to('.testimonial-user-item', {
        scrollTrigger: {
            trigger: '.testimonial-users',
            start: "top 90%"
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)"
    });
    
    // Scroll progress indicator
    gsap.to('.progress-bar', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });
    
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
    
    // Make cursor larger when hovering over cards
    const cards = document.querySelectorAll('.cafe-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                width: 80,
                height: 80,
                backgroundColor: 'rgba(240, 84, 56, 0.15)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                width: 40,
                height: 40,
                backgroundColor: 'rgba(240, 84, 56, 0.3)',
                duration: 0.3
            });
        });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.3
        });
    });
    
    // Hover animation for cafe cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                duration: 0.3
            });
        });
    });
    
    // Location buttons functionality with GSAP animations
    const locationBtns = document.querySelectorAll('.location-btn');
    const locationBadge = document.querySelector('.location-badge-text');
    
    locationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            locationBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Update location badge
            const newLocation = btn.textContent;
            
            // Animate the badge
            const badgeTl = gsap.timeline();
            
            badgeTl.to('.location-badge', {
                x: 50,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
            .call(() => {
                locationBadge.textContent = newLocation;
            })
            .to('.location-badge', {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.5)"
            });
            
            // Animate cafe cards based on location
            shuffleCafeCards();
        });
    });
    
    // Testimonial user selection
    const testimonialUsers = document.querySelectorAll('.testimonial-user-item');
    const testimonialCard = document.querySelector('.testimonial-card');
    
    // Sample testimonial data
    const testimonials = [
        {
            name: 'Rahma Larswati',
            role: 'University Student',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            text: '"Cafinder helped me find the perfect study spot during finals week. The cafe had everything I needed - quiet ambiance, strong WiFi, and enough outlets for my devices!"'
        },
        {
            name: 'Rinda Juana',
            role: 'Business Professional',
            avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
            text: '"The Smart Finder feature is a game-changer for business meetings. I found a quiet cafe with private spaces perfect for client presentations. Highly recommended!"'
        },
        {
            name: 'Don Permana',
            role: 'Coffee Enthusiast',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            text: '"As a coffee snob, I was impressed by how detailed the cafe profiles are. Found some hidden gems with specialty brews I would have never discovered otherwise."'
        },
        {
            name: 'Arya Wijaya',
            role: 'Digital Nomad',
            avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
            text: '"I rely on Cafinder every time I visit a new neighborhood in Surabaya. The filtering options for work-friendly cafes with reliable WiFi are exactly what I need."'
        },
        {
            name: 'Maya Hiquet',
            role: 'Web Designer',
            avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
            text: '"The ambiance filters helped me find the perfect inspiring cafe for my design work. Great for when you need a change of scenery to boost creativity!"'
        }
    ];
    
    testimonialUsers.forEach((user, index) => {
        user.addEventListener('click', () => {
            // Remove active class from all users
            testimonialUsers.forEach(u => u.classList.remove('active'));
            
            // Add active class to clicked user
            user.classList.add('active');
            
            // Get testimonial data
            const testimonial = testimonials[index];
            
            // Animate testimonial card update
            const testimonialTl = gsap.timeline();
            
            testimonialTl.to('.testimonial-card', {
                y: 20,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            })
            .call(() => {
                // Update testimonial content
                document.querySelector('.testimonial-user-info h4').textContent = testimonial.name;
                document.querySelector('.testimonial-user-info p').textContent = testimonial.role;
                document.querySelector('.testimonial-avatar img').src = testimonial.avatar;
                document.querySelector('.testimonial-text').textContent = testimonial.text;
            })
            .to('.testimonial-card', {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        });
    });
    
    // Function to shuffle cafe cards with GSAP animations
    function shuffleCafeCards() {
        const cards = document.querySelectorAll('.cafe-card');
        
        // Create a staggered animation for all cards
        const cardsTl = gsap.timeline();
        
        // First hide all cards
        cardsTl.to(cards, {
            y: 20,
            opacity: 0,
            stagger: {
                amount: 0.3,
                from: "random"
            },
            ease: "power2.in",
            duration: 0.4
        })
        .call(() => {
            // Here you would typically filter cards based on location
            // For demo, we'll just shuffle them randomly
            const grid = document.querySelector('.cafe-grid');
            
            Array.from(cards).sort(() => Math.random() - 0.5).forEach(card => {
                grid.appendChild(card);
            });
        })
        // Then show all cards again with a staggered animation
        .to(cards, {
            y: 0,
            opacity: 1,
            stagger: {
                amount: 0.8,
                from: "random"
            },
            scale: 1,
            ease: "back.out(1.7)",
            duration: 0.6
        });
    }
    
    // Interactive text particles for the heading
    const heading = document.querySelector('.page-heading h1');
    
    // Animation only on hover for better performance
    heading.addEventListener('mouseenter', () => {
        const text = heading.textContent;
        
        let html = '';
        
        // Wrap each character in a span for animation
        for (let i = 0; i < text.length; i++) {
            if (text[i] === ' ') {
                html += ' ';
            } else {
                html += `<span class="char">${text[i]}</span>`;
            }
        }
        
        heading.innerHTML = html;
        
        // Animate each character
        const chars = document.querySelectorAll('.char');
        
        chars.forEach(char => {
            char.addEventListener('mouseenter', () => {
                gsap.to(char, {
                    y: -10,
                    color: '#F05438',
                    scale: 1.2,
                    duration: 0.2,
                    onComplete: () => {
                        gsap.to(char, {
                            y: 0,
                            color: '#2A3541',
                            scale: 1,
                            duration: 0.3,
                            ease: "back.out(2)"
                        });
                    }
                });
            });
        });
    });
    
    // Creative hover effect for location buttons
    locationBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (!btn.classList.contains('active')) {
                gsap.to(btn, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (!btn.classList.contains('active')) {
                gsap.to(btn, {
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            }
        });
        
        btn.addEventListener('click', () => {
            gsap.fromTo(btn, 
                {
                    scale: 1.1
                },
                {
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                }
            );
        });
    });
    
    // Add parallax effect to cafe cards on scroll
    cards.forEach(card => {
        ScrollTrigger.create({
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
                const movement = self.progress * 20; // 20px max movement
                gsap.set(card, {
                    backgroundPosition: `center ${movement}px`
                });
            },
            scrub: true
        });
    });
});