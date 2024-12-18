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

    setupCarousel();

    // Initialize cart when DOM is loaded
    window.cart = new Cart();
});

function createHoneyDrips() {
    const drips = document.querySelectorAll('.honey-drip');
    if (!drips.length) return; // Exit if no drips found
    
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

function setupCarousel() {
    const carousel = document.querySelector('.carousel');
    const productCard = carousel.closest('.product-card');
    const images = carousel.querySelectorAll('.carousel-image');
    let currentIndex = 0;
    let autoRotateInterval = null;  // Initialize as null

    // Drag functionality variables
    let isDragging = false;
    let lastX;

    // Auto-rotate function
    function startAutoRotate() {
        // Clear any existing interval first
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
        
        // Start new interval
        autoRotateInterval = setInterval(() => {
            images.forEach(img => img.style.opacity = '0');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].style.opacity = '1';
        }, 400);
    }

    function stopAutoRotate() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
    }

    function resetToFirstImage() {
        images.forEach(img => img.style.opacity = '0');
        currentIndex = 0;
        images[currentIndex].style.opacity = '1';
    }

    // Product card hover events
    productCard.addEventListener('mouseenter', () => {
        stopAutoRotate();
        resetToFirstImage();
    });

    productCard.addEventListener('mouseleave', () => {
        if (!isDragging) {
            startAutoRotate();
        }
    });

    // Carousel drag events
    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        lastX = e.clientX;
        carousel.style.cursor = 'grabbing';
        stopAutoRotate();  // Ensure auto-rotate is stopped
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        carousel.style.cursor = 'grab';
        startAutoRotate();  // Start a single new interval
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - lastX;
            
            if (Math.abs(deltaX) > 5) { // Minimum movement threshold
                if (deltaX > 0) {
                    // Dragging right
                    images.forEach(img => img.style.opacity = '0');
                    currentIndex = (currentIndex - 1 + images.length) % images.length;
                    images[currentIndex].style.opacity = '1';
                } else {
                    // Dragging left
                    images.forEach(img => img.style.opacity = '0');
                    currentIndex = (currentIndex + 1) % images.length;
                    images[currentIndex].style.opacity = '1';
                }
                lastX = e.clientX;
            }
        }
    });

    // Start initial auto-rotation
    startAutoRotate();
}

// Ensure we only set up the carousel once
document.addEventListener('DOMContentLoaded', () => {
    setupCarousel();
});

// Add this near the top of your file
class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        // Load cart from localStorage if it exists
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart);
                this.updateTotal();
                // Immediately render the cart items after loading
                this.renderCartItems();
            } catch (e) {
                console.error('Error loading cart from localStorage:', e);
                localStorage.removeItem('cart'); // Clear invalid cart data
            }
        }

        // Setup cart UI and add to cart buttons
        this.setupCartUI();
        this.setupAddToCartButtons();
    }

    setupCartUI() {
        const cartOverlay = document.querySelector('.cart-overlay');
        const openCartBtn = document.getElementById('open-cart');
        const closeCartBtn = document.getElementById('close-cart');

        openCartBtn?.addEventListener('click', () => {
            cartOverlay.classList.add('open');
            // Re-render items when cart is opened
            this.renderCartItems();
        });

        closeCartBtn?.addEventListener('click', () => {
            cartOverlay.classList.remove('open');
        });

        // Update initial cart count
        this.updateCartCount();
    }

    setupAddToCartButtons() {
        document.querySelectorAll('.add-to-cart-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                const productInfo = productCard.querySelector('.product-info');
                
                const product = {
                    title: productInfo.querySelector('h3').textContent,
                    price: parseFloat(productInfo.querySelector('.price-tag').textContent.replace('$', '')),
                    image: productCard.querySelector('.carousel-image')?.src || 'default-image.jpg'
                };

                this.addItem(product);
            });
        });
    }

    addItem(product) {
        const existingItem = this.items.find(item => 
            item.title === product.title
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.title,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.updateCart();
    }

    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            // Decrease quantity by 1
            this.items[itemIndex].quantity -= 1;
            
            // Only remove the item if quantity reaches 0
            if (this.items[itemIndex].quantity <= 0) {
                this.items.splice(itemIndex, 1);
            }
            
            this.updateCart();
        }
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.updateCart();
            }
        }
    }

    updateCart() {
        // Update total
        this.updateTotal();

        // Update cart count
        this.updateCartCount();

        // Update cart UI
        this.renderCartItems();

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => 
            sum + (item.price * item.quantity), 0
        );
        
        const totalElement = document.getElementById('cart-total-amount');
        if (totalElement) {
            totalElement.textContent = `$${this.total.toFixed(2)}`;
        }
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = count;
        }
    }

    renderCartItems() {
        const cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '';

        this.items.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-quantity">
                    <wired-button class="quantity-btn minus-btn" data-id="${item.id}">-</wired-button>
                    <span>${item.quantity}</span>
                    <wired-button class="quantity-btn plus-btn" data-id="${item.id}">+</wired-button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);

            // Add event listeners for quantity buttons
            cartItem.querySelector('.minus-btn').addEventListener('click', () => {
                this.removeItem(item.id);
            });
            cartItem.querySelector('.plus-btn').addEventListener('click', () => {
                this.addItem({ title: item.title, price: item.price, image: item.image });
            });
        });
    }
    async checkout() {
        try {
            const response = await fetch('http://localhost:5000/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    line_items: this.items.map(item => ({
                        variant_id: item.variantId || '123456789',
                        quantity: item.quantity,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { checkoutUrl } = await response.json();
            window.location.href = checkoutUrl;
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('There was an issue with checkout. Please try again.');
        }
    }

    // Add this to bind the checkout button
    setupCheckoutButton() {
        const checkoutButton = document.querySelector('.checkout-button');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                this.checkout();
            });
        }
    }

    init() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                this.items = JSON.parse(savedCart);
                this.updateTotal();
                this.renderCartItems();
            } catch (e) {
                console.error('Error loading cart from localStorage:', e);
                localStorage.removeItem('cart');
            }
        }

        this.setupCartUI();
        this.setupAddToCartButtons();
        this.setupCheckoutButton(); // Bind checkout button
    }
}
