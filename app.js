document.addEventListener('DOMContentLoaded', () => {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00ff9d" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#00ff9d", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        }
    });

    const technologies = [
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
        { name: "Socket.io", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
        { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
        { name: "Tailwind CSS", icon: "https://raw.githubusercontent.com/devicons/devicon/v2.16.0/icons/tailwindcss/tailwindcss-original.svg" }
    ];

    const techIconsContainer = document.querySelector('.tech-icons');
    technologies.forEach(tech => {
        const icon = document.createElement('img');
        icon.src = tech.icon;
        icon.alt = tech.name;
        icon.className = 'tech-icon';
        icon.title = tech.name;
        techIconsContainer.appendChild(icon);
    });

    const typedText = document.querySelector('.typed-text');
    const cursor = document.querySelector('.cursor');
    const techIcons = document.querySelectorAll('.tech-icon');

    gsap.set(techIcons, { opacity: 0.3 });

    let currentIndex = 0;
    let isTyping = false;
    let currentTimeout = null;

    function clearTyping() {
        if (currentTimeout) {
            clearTimeout(currentTimeout);
            currentTimeout = null;
        }
        isTyping = false;
        typedText.textContent = '';
    }

    function typeWriter(index) {
        clearTyping();
        
        isTyping = true;
        const tech = technologies[index];
        const text = tech.name;
        const icon = techIcons[index];
        
        gsap.to(techIcons, {
            opacity: 0.3,
            scale: 1,
            duration: 0.3
        });

        gsap.to(icon, {
            opacity: 1,
            scale: 1.2,
            duration: 0.5,
            ease: "power2.out"
        });

        let charIndex = 0;
        
        function type() {
            if (charIndex < text.length) {
                typedText.textContent += text.charAt(charIndex);
                charIndex++;
                currentTimeout = setTimeout(type, 100 + Math.random() * 50);
            } else {
                currentTimeout = setTimeout(() => {
                    erase();
                }, 1500);
            }
        }

        function erase() {
            if (typedText.textContent.length > 0) {
                typedText.textContent = typedText.textContent.substring(0, typedText.textContent.length - 1);
                currentTimeout = setTimeout(erase, 50);
            } else {
                gsap.to(icon, {
                    opacity: 0.3,
                    scale: 1,
                    duration: 0.3,
                });
                
                currentIndex = (currentIndex + 1) % technologies.length;
                currentTimeout = setTimeout(() => {
                    typeWriter(currentIndex);
                }, 500);
            }
        }

        type();
    }

    techIcons.forEach((icon, index) => {
        icon.addEventListener('click', () => {
            currentIndex = index; 
            typeWriter(currentIndex);
        });
    });

    setTimeout(() => {
        typeWriter(currentIndex);
    }, 1000);

    gsap.to(cursor, {
        opacity: 0,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    techIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            if (!isTyping) {
                gsap.to(icon, {
                    scale: 1.3,
                    duration: 0.3
                });
            }
        });
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                duration: 0.3
            });
        });
    });
});