// Animações e interatividade da landing page

document.addEventListener('DOMContentLoaded', function() {
    
    // Animação de entrada dos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animação aos cards de jogos
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Aplicar animação aos depoimentos
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Aplicar animação à seção motivacional
    const motivationalContent = document.querySelector('.motivational-content');
    if (motivationalContent) {
        motivationalContent.style.opacity = '0';
        motivationalContent.style.transform = 'translateY(30px)';
        motivationalContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(motivationalContent);
    }

    // Efeito de parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Efeito de hover nos botões CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efeito de brilho nos cards de jogos
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(220, 20, 60, 0.6), 0 0 20px rgba(255, 215, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 20px rgba(220, 20, 60, 0.3)';
        });
    });

    // Scroll suave para links internos
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

    // Contador de preços animado
    const prices = document.querySelectorAll('.game-price');
    prices.forEach(price => {
        const priceText = price.textContent.replace('R$ ', '').replace(',', '.');
        const finalPrice = parseFloat(priceText);
        let currentPrice = 0;
        const increment = finalPrice / 30;
        
        const priceObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animatePrice = () => {
                        currentPrice += increment;
                        if (currentPrice < finalPrice) {
                            if (finalPrice >= 100) {
                                price.textContent = `R$ ${Math.floor(currentPrice)},00`;
                            } else {
                                price.textContent = `R$ ${Math.floor(currentPrice)},00`;
                            }
                            requestAnimationFrame(animatePrice);
                        } else {
                            if (finalPrice >= 100) {
                                price.textContent = `R$ ${Math.floor(finalPrice)},00`;
                            } else {
                                price.textContent = `R$ ${finalPrice.toFixed(2).replace('.', ',')}`;
                            }
                        }
                    };
                    animatePrice();
                    priceObserver.unobserve(entry.target);
                }
            });
        });
        
        priceObserver.observe(price);
    });

    // Efeito de partículas místicas
    function createMysticParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'mystic-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #FFD700, transparent);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0;
                animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Adicionar CSS para as partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                opacity: 0;
                transform: translateY(0px) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-20px) scale(1);
            }
        }
        
        .mystic-particle {
            z-index: 1;
        }
    `;
    document.head.appendChild(style);

    // Criar partículas
    createMysticParticles();

    // Efeito de loading suave
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Tracking de cliques nos CTAs (para analytics)
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const gameTitle = this.closest('.game-card')?.querySelector('.game-title')?.textContent || 'CTA Principal';
            console.log(`CTA clicado: ${gameTitle}`);
            
            // Aqui você pode adicionar código para Google Analytics, Facebook Pixel, etc.
            // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': gameTitle });
        });
    });
});

