import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Make sure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  
  useEffect(() => {
    // Animate heading
    gsap.to(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    });
    
    // Animate description
    gsap.to(descriptionRef.current, {
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: "top 80%"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.2
    });
    
    // Animate testimonial cards with stagger
    gsap.to(".testimonial-card", {
      scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top 80%"
      },
      opacity: 1,
      y: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)"
    });
  }, []);
  
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      text: "Cafinder sangat membantu saya menemukan cafe yang tepat untuk meeting bisnis. Fitur filter berdasarkan kebutuhan benar-benar berguna!",
      author: {
        name: "Ahmad Ridwan",
        role: "Business Owner",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
      }
    },
    {
      id: 2,
      text: "Saya suka fitur rating dan review yang jujur. Membuat saya lebih percaya diri saat memilih cafe untuk nongkrong bersama teman-teman.",
      author: {
        name: "Siti Nuraini",
        role: "College Student",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
      }
    },
    {
      id: 3,
      text: "Sebagai content creator, menemukan spot foto aesthetic sangat penting. Cafinder membantu saya menemukan hidden gems yang belum banyak didatangi!",
      author: {
        name: "Rendi Pratama",
        role: "Content Creator",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&q=80"
      }
    },
  ];
  
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials-heading">
          <h2 ref={headingRef}>Apa Kata Mereka</h2>
          <p ref={descriptionRef}>
            Cerita pengalaman pengguna Cafinder yang telah menemukan tempat nongkrong favorit mereka melalui platform kami.
          </p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-text">
                {testimonial.text}
              </div>
              <div className="testimonial-author">
                <div className="author-img">
                  <img src={testimonial.author.image} alt={testimonial.author.name} />
                </div>
                <div className="author-info">
                  <h4>{testimonial.author.name}</h4>
                  <p>{testimonial.author.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;