// J&L Representaciones - Funcionalidades JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // Animaciones de entrada para las tarjetas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.feature, .contact-card, .benefit-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efecto de parallax desactivado para evitar problemas de superposición
    // El hero permanece estático para mejor experiencia de usuario

    // Smooth scrolling para enlaces internos
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

    // Efecto de hover mejorado para las tarjetas
    const cards = document.querySelectorAll('.benefit-card, .contact-card, .feature');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animación de escritura para el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Texto del tagline sin animación de escritura
    // const tagline = document.querySelector('.tagline');
    // El texto se muestra directamente sin efectos de escritura

    // Contador animado para el monto del decreto
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Formatear el número con puntos para miles
            const formatted = Math.floor(current).toLocaleString('es-AR');
            element.textContent = `$${formatted}`;
        }, 16);
    }

    // Iniciar contador cuando sea visible
    const decreeAmount = document.querySelector('.decree-amount');
    if (decreeAmount) {
        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetNumber = 25000000;
                    animateCounter(entry.target, targetNumber);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(decreeAmount);
    }

    // Efectos de partículas en el fondo (opcional)
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`;
            particle.style.animationDelay = Math.random() * 10 + 's';

            hero.appendChild(particle);
        }
    }

    // Crear partículas después de un delay
    setTimeout(createParticles, 2000);

    // Funcionalidad de WhatsApp mejorada
    const whatsappButtons = document.querySelectorAll('.cta-button');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Agregar efecto de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Analytics tracking (opcional)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'WhatsApp',
                    event_label: 'CTA Button'
                });
            }
        });
    });

    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preloader (opcional)
    window.addEventListener('load', function () {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // Validación de formularios (si se agregan en el futuro)
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }

    // Funciones de utilidad
    window.JLUtils = {
        scrollToTop: function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },

        showNotification: function (message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
                color: white;
                padding: 1rem 2rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                z-index: 1000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);

            setTimeout(() => {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }
    };

    console.log('🚀 J&L Representaciones - Sitio web cargado correctamente');
});

