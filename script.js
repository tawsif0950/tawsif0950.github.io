// Matrix rain effect setup
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-bg').appendChild(canvas);

// Set canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Matrix characters
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const charArray = chars.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;

// Initialize drops
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Drawing function
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Animation loop
setInterval(draw, 35);

// Typing effect for terminal outputs
function typeWriterEffect(output) {
    const text = output.textContent;
    output.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            output.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, Math.random() * 50 + 20);
        }
    }

    setTimeout(typeWriter, 500);
}

document.querySelectorAll('.output').forEach(typeWriterEffect);

// Add hover effect to terminal
const terminal = document.querySelector('.terminal');
if (terminal) {
    terminal.addEventListener('mousemove', (e) => {
        const rect = terminal.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        terminal.style.boxShadow = `0 0 20px rgba(0, 255, 0, 0.2),
                                   ${(x - rect.width / 2) / 30}px 
                                   ${(y - rect.height / 2) / 30}px 
                                   15px rgba(0, 255, 0, 0.1)`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Typing effect for tagline
    const tagline = document.querySelector('.tagline');
    const text = tagline.textContent;
    tagline.textContent = '';
    let index = 0;

    function typeText() {
        if (index < text.length) {
            tagline.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
        }
    }

    typeText();

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.skill-card, .about-content p');
    
    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize elements
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Add scroll event listener
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Initial check

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * 0.5;
                
                if (hero) {
                    hero.style.transform = `translateY(${rate}px)`;
                }
                
                ticking = false;
            });

            ticking = true;
        }
    });

    // Skill card hover effect
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.transform = `
                perspective(500px) 
                rotateX(${(y - rect.height / 2) / 10}deg) 
                rotateY(${-(x - rect.width / 2) / 10}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // Hide hero section when scrolling
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight * 0.5) {
            hero.classList.add('hidden');
            heroContent.style.display = 'none';
        } else {
            hero.classList.remove('hidden');
            heroContent.style.display = 'block';
        }
    });
});
