document.addEventListener('DOMContentLoaded', () => {
    // First, handle the product card shadows
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const canvas = document.createElement('canvas');
        canvas.classList.add('honey-shadow');
        card.appendChild(canvas);
        
        const rc = rough.canvas(canvas);
        
        function drawHoneyShadow() {
            const width = card.offsetWidth;
            const height = card.offsetHeight;
            
            canvas.width = width + 40;
            canvas.height = height + 40;
            
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create organic shadow shape
            const points = [];
            const numPoints = 24; // More points for smoother shape
            const baseRadius = Math.min(width, height) / 2;
            
            for (let i = 0; i < numPoints; i++) {
                const angle = (i / numPoints) * Math.PI * 2;
                // Create more natural variations
                const radiusNoise = Math.sin(angle * 3) * 5;
                const radius = baseRadius + radiusNoise;
                
                // Add slight horizontal stretch
                const x = width/2 + Math.cos(angle) * (radius * 1.1);
                // Add downward bias for natural shadow
                const y = height/2 + Math.sin(angle) * radius + 5;
                
                points.push([x, y]);
            }
            
            // Draw shadow with honey-inspired properties
            rc.polygon(points, {
                fill: '#F4E7C6',  // Use slightly darker pale yellow
                fillStyle: 'solid',
                stroke: 'none',
                fillWeight: 1,
                roughness: 0.8,
                opacity: 0.5  // Adjust opacity for subtlety
            });
        }

        let isHovering = false;
        let animationFrame;

        card.addEventListener('mouseenter', () => {
            isHovering = true;
            if (!animationFrame) {
                function animate() {
                    if (isHovering) {
                        drawHoneyShadow();
                        animationFrame = requestAnimationFrame(animate);
                    }
                }
                animate();
            }
        });

        card.addEventListener('mouseleave', () => {
            isHovering = false;
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    });

    // Initialize honey drips
    createHoneyDrips();

    // Create a custom ease for more natural honey movement
    gsap.registerEase("honeyDrip", function(progress) {
        return progress < 0.5 
            ? 4 * progress * progress * progress 
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    });

    // Animate specific points of the drip
    const drips = document.querySelectorAll('.honey-drip');
    
    drips.forEach(drip => {
        const path = drip.querySelector('.drip-path');
        
        gsap.to(path, {
            attr: {
                d: 'M40,0 C60,0 80,0 100,0 L90,30 C85,50 95,70 85,90 C80,110 90,130 80,150 C75,160 65,160 60,150 C50,130 60,110 55,90 C45,70 55,50 50,30 L40,0'
            },
            duration: 4,
            ease: "honeyDrip",
            repeat: -1,
            yoyo: true
        });
    });
});

function createHoneyDrips() {
    const drips = document.querySelectorAll('.honey-drip');
    
    // Use the website's color palette for honey
    const honeyGradient = {
        start: '#FDF6E4',  // --pale-yellow
        middle: '#F4E7C6', // --pale-yellow-dark
        end: '#B7A28F'     // --brown-light
    };
    
    drips.forEach(drip => {
        const canvas = document.createElement('canvas');
        drip.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        
        canvas.width = 40;    // Narrower width for more delicate drip
        canvas.height = 100;  // Shorter height
        
        let animationFrame = null;

        class HoneyStrand {
            constructor(x) {
                this.x = x;
                this.y = 0;
                this.targetY = 0;
                this.thickness = 12;  // Consistent thickness for smoother look
                this.alpha = 0;
                this.wobble = Math.random() * Math.PI;
                this.bulbSize = 1;    // For animated bulb size
            }
            
            draw() {
                // Create gradient for honey-like appearance
                const gradient = ctx.createLinearGradient(this.x, 0, this.x, this.y);
                gradient.addColorStop(0, `${honeyGradient.start}${Math.floor(this.alpha * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(0.5, `${honeyGradient.middle}${Math.floor(this.alpha * 255).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(1, `${honeyGradient.end}${Math.floor(this.alpha * 255).toString(16).padStart(2, '0')}`);

                // Very slow wobble for viscous appearance
                this.wobble += 0.01;
                const wobbleX = Math.sin(this.wobble) * 0.5;
                
                ctx.beginPath();
                ctx.fillStyle = gradient;
                
                // Top connection (slightly rounded)
                ctx.arc(this.x, 2, this.thickness/3, 0, Math.PI * 2);
                
                // Main drip body (smooth curve)
                const cp1x = this.x + wobbleX;
                const cp1y = this.y * 0.3;
                const cp2x = this.x + wobbleX;
                const cp2y = this.y * 0.6;
                
                ctx.moveTo(this.x - this.thickness/3, 2);
                ctx.bezierCurveTo(
                    this.x - this.thickness/2 + wobbleX, this.y * 0.3,
                    this.x - this.thickness/2 + wobbleX, this.y * 0.6,
                    this.x, this.y
                );
                
                // Bottom bulb (animated size)
                this.bulbSize = 1 + Math.sin(this.wobble) * 0.1;
                ctx.arc(this.x, this.y, (this.thickness/2) * this.bulbSize, 0, Math.PI * 2);
                
                // Complete the drip shape
                ctx.bezierCurveTo(
                    this.x + this.thickness/2 + wobbleX, this.y * 0.6,
                    this.x + this.thickness/2 + wobbleX, this.y * 0.3,
                    this.x + this.thickness/3, 2
                );
                
                ctx.fill();
            }
        }
        
        const strand = new HoneyStrand(canvas.width/2);
        
        const tl = gsap.timeline({ paused: true });
        
        // Slower, more viscous animation
        tl.to(strand, {
            targetY: 40,
            alpha: 0.7,
            duration: 2.5,
            ease: "power1.inOut"
        });
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Very slow movement for viscous appearance
            strand.y += (strand.targetY - strand.y) * 0.05;
            strand.draw();
            
            animationFrame = requestAnimationFrame(animate);
        }
        
        // Add hover listeners to the parent product card
        const productCard = drip.closest('.product-card');
        
        productCard.addEventListener('mouseenter', () => {
            tl.play();
            if (!animationFrame) {
                animate();
            }
        });
        
        productCard.addEventListener('mouseleave', () => {
            tl.reverse();
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    });
} 