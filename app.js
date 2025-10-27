window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error || event.message, event);
});
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof particlesJS === 'function') {
            try {
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
            } catch (err) {
                console.error('particlesJS initialization failed:', err);
            }
        } else {
            console.warn('particlesJS not available — skipping particle background.');
        }

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
        if (!techIconsContainer) {
            throw new Error('Missing .tech-icons container in DOM');
        }

        const placeholderUrl = 'https://www.freeiconspng.com/uploads/orange-error-icon-0.png';

        technologies.forEach(tech => {
            const icon = document.createElement('img');
            icon.src = tech.icon;
            icon.alt = tech.name;
            icon.className = 'tech-icon';
            icon.title = tech.name;

            icon.onerror = () => {
                console.warn(`Failed to load icon for ${tech.name}, using placeholder.`);
                icon.src = placeholderUrl;
                icon.alt = `${tech.name} icon (placeholder)`;
            };

            techIconsContainer.appendChild(icon);
        });

        const typedText = document.querySelector('.typed-text');
        const cursor = document.querySelector('.cursor');
        const techIcons = document.querySelectorAll('.tech-icon');

        if (!typedText || !cursor) {
            console.warn('Typed text or cursor elements are missing; skipping typing animation.');
        }

        const safeGsap = (typeof gsap !== 'undefined') ? gsap : {
            to: (target, opts) => {
                try {
                    const elements = (NodeList.prototype.isPrototypeOf(target) || Array.isArray(target)) ? Array.from(target) : [target];
                    elements.forEach(el => {
                        if (!el || !el.style) return;
                        if (opts.opacity !== undefined) el.style.opacity = opts.opacity;
                        if (opts.scale !== undefined) el.style.transform = `scale(${opts.scale})`;
                    });
                } catch (e) {
                }
                return { then: () => {} };
            },
            set: () => {}
        };

        try {
            safeGsap.set(techIcons, { opacity: 0.3 });
        } catch (err) {
            console.error('gsap.set failed or gsap not available:', err);
        }

        let currentIndex = 0;
        let isTyping = false;
        let currentTimeout = null;

        function clearTyping() {
            if (currentTimeout) {
                clearTimeout(currentTimeout);
                currentTimeout = null;
            }
            isTyping = false;
            if (typedText) typedText.textContent = '';
        }

        function typeWriter(index) {
            try {
                clearTyping();

                isTyping = true;
                const tech = technologies[index];
                const text = tech.name;
                const icon = techIcons[index];

                safeGsap.to(techIcons, {
                    opacity: 0.3,
                    scale: 1,
                    duration: 0.3
                });

                safeGsap.to(icon, {
                    opacity: 1,
                    scale: 1.2,
                    duration: 0.5,
                    ease: "power2.out"
                });

                let charIndex = 0;

                function type() {
                    try {
                        if (!typedText) return;
                        if (charIndex < text.length) {
                            typedText.textContent += text.charAt(charIndex);
                            charIndex++;
                            currentTimeout = setTimeout(type, 100 + Math.random() * 50);
                        } else {
                            currentTimeout = setTimeout(() => {
                                erase();
                            }, 1500);
                        }
                    } catch (err) {
                        console.error('Error in typing step:', err);
                    }
                }

                function erase() {
                    try {
                        if (!typedText) return;
                        if (typedText.textContent.length > 0) {
                            typedText.textContent = typedText.textContent.substring(0, typedText.textContent.length - 1);
                            currentTimeout = setTimeout(erase, 50);
                        } else {
                            safeGsap.to(icon, {
                                opacity: 0.3,
                                scale: 1,
                                duration: 0.3,
                            });

                            currentIndex = (currentIndex + 1) % technologies.length;
                            currentTimeout = setTimeout(() => {
                                typeWriter(currentIndex);
                            }, 500);
                        }
                    } catch (err) {
                        console.error('Error in erase step:', err);
                    }
                }

                type();
            } catch (err) {
                console.error('typeWriter failed:', err);
                clearTyping();
            }
        }

        techIcons.forEach((icon, index) => {
            icon.addEventListener('click', () => {
                try {
                    currentIndex = index;
                    typeWriter(currentIndex);
                } catch (err) {
                    console.error('Click handler failed:', err);
                }
            });
        });

        setTimeout(() => {
            try {
                typeWriter(currentIndex);
            } catch (err) {
                console.error('Initial typeWriter call failed:', err);
            }
        }, 1000);

        try {
            safeGsap.to(cursor, {
                opacity: 0,
                duration: 0.7,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        } catch (err) {
            console.warn('Cursor animation skipped (gsap issue):', err);
        }

        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                try {
                    if (!isTyping) {
                        safeGsap.to(icon, {
                            scale: 1.3,
                            duration: 0.3
                        });
                    }
                } catch (err) {
                    console.error('mouseenter handler failed:', err);
                }
            });
            icon.addEventListener('mouseleave', () => {
                try {
                    safeGsap.to(icon, {
                        scale: 1,
                        duration: 0.3
                    });
                } catch (err) {
                    console.error('mouseleave handler failed:', err);
                }
            });
        });
    } catch (err) {
        console.error('Error during DOMContentLoaded initialization:', err);

        // graceful fallback: show minimal static content if possible
        try {
            const staticEl = document.querySelector('.static-text');
            if (staticEl) staticEl.textContent = 'Welcome — view my technologies below.';
            const techIconsContainer = document.querySelector('.tech-icons');
            if (techIconsContainer && techIconsContainer.children.length === 0) {
                const p = document.createElement('p');
                p.textContent = 'Technologies unavailable right now.';
                p.style.color = '#999';
                techIconsContainer.appendChild(p);
            }
        } catch (innerErr) {
            console.error('Fallback rendering failed:', innerErr);
        }
    }
});