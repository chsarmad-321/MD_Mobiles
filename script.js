// Main Website JavaScript
class DaudElectricStore {
    constructor() {
        this.products = [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.initializeEventListeners();
        this.renderProducts();
        this.updateCartCount();
    }

    async loadProducts() {
        try {
            // Try to load from local storage first
            const savedProducts = localStorage.getItem('storeProducts');
            if (savedProducts) {
                this.products = JSON.parse(savedProducts);
            } else {
                // Load default products
                this.products = this.getDefaultProducts();
                this.saveProducts();
            }
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = this.getDefaultProducts();
        }
    }

    getDefaultProducts() {
        return [
            // Mobile Accessories
            {
                id: 1,
                name: "Fast Charger 25W",
                category: "mobile-accessories",
                price: 1200,
                image: "assets/images/charger.jpg",
                description: "Original fast charger with Type-C cable",
                stock: 50,
                featured: true
            },
            {
                id: 2,
                name: "Wireless Earphones",
                category: "mobile-accessories",
                price: 2500,
                image: "assets/images/earphones.jpg",
                description: "Bluetooth 5.0 wireless earphones with case",
                stock: 30,
                featured: true
            },
            {
                id: 3,
                name: "Power Bank 10000mAh",
                category: "mobile-accessories",
                price: 1800,
                image: "assets/images/power-bank.jpg",
                description: "Fast charging power bank with dual ports",
                stock: 25,
                featured: true
            },
            {
                id: 4,
                name: "Phone Case",
                category: "mobile-accessories",
                price: 500,
                image: "images/mobile-accessories/case.jpg",
                description: "Shockproof phone case for all models",
                stock: 100,
                featured: false
            },
            {
                id: 5,
                name: "Screen Protector",
                category: "mobile-accessories",
                price: 300,
                image: "images/mobile-accessories/screen-protector.jpg",
                description: "Tempered glass screen protector",
                stock: 80,
                featured: false
            },
            {
                id: 6,
                name: "USB Cable",
                category: "mobile-accessories",
                price: 400,
                image: "images/mobile-accessories/cable.jpg",
                description: "Durable USB to Type-C charging cable",
                stock: 60,
                featured: false
            },

            // Electric Parts
            {
                id: 7,
                name: "Electrical Switch",
                category: "electric-parts",
                price: 150,
                image: "images/electric-parts/switch.jpg",
                description: "Single pole electrical switch",
                stock: 200,
                featured: true
            },
            {
                id: 8,
                name: "LED Bulb 15W",
                category: "electric-parts",
                price: 350,
                image: "images/electric-parts/led-bulb.jpg",
                description: "Energy efficient LED bulb",
                stock: 150,
                featured: true
            },
            {
                id: 9,
                name: "Circuit Breaker",
                category: "electric-parts",
                price: 800,
                image: "images/electric-parts/circuit-breaker.jpg",
                description: "16A circuit breaker for safety",
                stock: 40,
                featured: true
            },
            {
                id: 10,
                name: "Electrical Wire",
                category: "electric-parts",
                price: 1200,
                image: "images/electric-parts/wire.jpg",
                description: "Copper electrical wire 100m roll",
                stock: 30,
                featured: false
            },
            {
                id: 11,
                name: "Socket Outlet",
                category: "electric-parts",
                price: 250,
                image: "images/electric-parts/socket.jpg",
                description: "3-pin socket outlet",
                stock: 80,
                featured: false
            },
            {
                id: 12,
                name: "Extension Board",
                category: "electric-parts",
                price: 600,
                image: "images/electric-parts/extension.jpg",
                description: "4-port extension board with surge protection",
                stock: 45,
                featured: false
            },

            // Payment Services
            {
                id: 13,
                name: "Mobile Load",
                category: "payment-services",
                price: 0,
                image: "images/payment-services/mobile-load.jpg",
                description: "All networks mobile load service",
                stock: 999,
                featured: true,
                service: true
            },
            {
                id: 14,
                name: "Electricity Bill",
                category: "payment-services",
                price: 0,
                image: "images/payment-services/electricity-bill.jpg",
                description: "Electricity bill payment service",
                stock: 999,
                featured: true,
                service: true
            },
            {
                id: 15,
                name: "Gas Bill Payment",
                category: "payment-services",
                price: 0,
                image: "images/payment-services/gas-bill.jpg",
                description: "Gas utility bill payment",
                stock: 999,
                featured: true,
                service: true
            },
            {
                id: 16,
                name: "Money Transfer",
                category: "payment-services",
                price: 0,
                image: "images/payment-services/money-transfer.jpg",
                description: "Domestic money transfer service",
                stock: 999,
                featured: false,
                service: true
            }
        ];
    }

    saveProducts() {
        localStorage.setItem('storeProducts', JSON.stringify(this.products));
    }

    initializeEventListeners() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Search functionality
        const searchBtn = document.getElementById('search-btn');
        const closeSearch = document.querySelector('.close-search');
        const searchOverlay = document.querySelector('.search-overlay');
        const searchInput = document.getElementById('search-input');

        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchInput.focus();
        });

        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
        });

        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Cart functionality
        const cartBtn = document.getElementById('cart-btn');
        const closeCart = document.querySelector('.close-cart');
        const cartSidebar = document.querySelector('.cart-sidebar');

        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            this.renderCart();
        });

        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
        });

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterProducts(filter);
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterProducts(category);
                
                // Update active filter button
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.filter === category) {
                        btn.classList.add('active');
                    }
                });

                // Scroll to products
                document.getElementById('products').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Contact form
        const contactForm = document.getElementById('contact-form');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm(e.target);
        });

        // Close modal
        const closeModal = document.querySelector('.close-modal');
        const modal = document.getElementById('product-modal');
        
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    renderProducts(filter = 'all') {
        const container = document.getElementById('products-container');
        let filteredProducts = this.products;

        if (filter !== 'all') {
            filteredProducts = this.products.filter(product => product.category === filter);
        }

        const featuredProducts = filteredProducts.filter(product => product.featured);

        container.innerHTML = featuredProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                ${product.stock < 10 ? '<span class="product-badge">Low Stock</span>' : ''}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI4MCAyMDAiPjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZWNmMGYxIi8+PHRleHQgeD0iMTQwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZHVjdCBJbWFnZTwvdGV4dD48L3N2Zz4='">
                </div>
                <div class="product-content">
                    <div class="product-category">${this.getCategoryName(product.category)}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${product.service ? 'Service' : `Rs. ${product.price}`}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary view-details" data-id="${product.id}">
                            View Details
                        </button>
                        ${!product.service ? `
                        <button class="btn btn-secondary add-to-cart" data-id="${product.id}">
                            Add to Cart
                        </button>
                        ` : `
                        <button class="btn btn-secondary service-btn" data-id="${product.id}">
                            Use Service
                        </button>
                        `}
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to new buttons
        this.attachProductEventListeners();
    }

    attachProductEventListeners() {
        // View details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.showProductDetails(productId);
            });
        });

        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.addToCart(productId);
            });
        });

        // Service buttons
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.showServiceDetails(productId);
            });
        });
    }

    getCategoryName(category) {
        const categories = {
            'mobile-accessories': 'Mobile Accessories',
            'electric-parts': 'Electric Parts',
            'payment-services': 'Payment Services'
        };
        return categories[category] || category;
    }

    filterProducts(filter) {
        this.renderProducts(filter);
    }

    handleSearch(query) {
        const resultsContainer = document.querySelector('.search-results');
        
        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }

        const filteredProducts = this.products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        resultsContainer.innerHTML = filteredProducts.map(product => `
            <div class="search-result-item" data-id="${product.id}">
                <strong>${product.name}</strong> - Rs. ${product.price}
                <br>
                <small>${this.getCategoryName(product.category)}</small>
            </div>
        `).join('');

        // Add click event to search results
        document.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = parseInt(item.dataset.id);
                this.showProductDetails(productId);
                document.querySelector('.search-overlay').classList.remove('active');
                document.getElementById('search-input').value = '';
                resultsContainer.innerHTML = '';
            });
        });
    }

    showProductDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const modal = document.getElementById('product-modal');
        const modalBody = document.getElementById('modal-body');

        modalBody.innerHTML = `
            <div class="product-details">
                <div class="product-detail-image">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZWNmMGYxIi8+PHRleHQgeD0iMjAwIiB5PSIxNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZHVjdCBJbWFnZTwvdGV4dD48L3N2Zz4='">
                </div>
                <div class="product-detail-content">
                    <div class="product-category">${this.getCategoryName(product.category)}</div>
                    <h2>${product.name}</h2>
                    <p class="product-detail-description">${product.description}</p>
                    <div class="product-detail-price">${product.service ? 'Service Available' : `Rs. ${product.price}`}</div>
                    <div class="product-stock">Stock: ${product.stock} units</div>
                    ${!product.service ? `
                    <div class="product-detail-actions">
                        <button class="btn btn-primary add-to-cart-detail" data-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                    ` : `
                    <div class="product-detail-actions">
                        <button class="btn btn-primary service-detail-btn" data-id="${product.id}">
                            Use This Service
                        </button>
                    </div>
                    `}
                </div>
            </div>
        `;

        modal.classList.add('active');

        // Add event listeners
        const addToCartBtn = modal.querySelector('.add-to-cart-detail');
        const serviceBtn = modal.querySelector('.service-detail-btn');

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                this.addToCart(productId);
                modal.classList.remove('active');
            });
        }

        if (serviceBtn) {
            serviceBtn.addEventListener('click', () => {
                this.showServiceDetails(productId);
                modal.classList.remove('active');
            });
        }
    }

    showServiceDetails(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        alert(`Service: ${product.name}\n\nPlease visit our store to use this service or call us at:\n03196091663 / 03241161291\n\nWe provide:\n- Mobile load for all networks\n- Utility bill payments\n- Money transfer services\n- Other online transactions`);
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product || product.service) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock) {
                existingItem.quantity++;
            } else {
                alert('Not enough stock available!');
                return;
            }
        } else {
            if (product.stock > 0) {
                this.cart.push({
                    ...product,
                    quantity: 1
                });
            } else {
                alert('Product out of stock!');
                return;
            }
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`);

        // Update cart if it's open
        if (document.querySelector('.cart-sidebar').classList.contains('active')) {
            this.renderCart();
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
    }

    updateCartQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const newQuantity = item.quantity + change;

        if (newQuantity < 1) {
            this.removeFromCart(productId);
            return;
        }

        if (newQuantity > product.stock) {
            alert('Not enough stock available!');
            return;
        }

        item.quantity = newQuantity;
        this.saveCart();
        this.renderCart();
        this.updateCartCount();
    }

    renderCart() {
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.getElementById('cart-total');

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; padding: 20px;">Your cart is empty</p>';
            cartTotal.textContent = '0';
            return;
        }

        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCI+PHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZWNmMGYxIi8+PHRleHQgeD0iMzAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">Rs. ${item.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total;

        // Add event listeners
        document.querySelectorAll('.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.updateCartQuantity(productId, -1);
            });
        });

        document.querySelectorAll('.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.updateCartQuantity(productId, 1);
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.remove-item').dataset.id);
                this.removeFromCart(productId);
            });
        });

        // Checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        checkoutBtn.onclick = () => this.handleCheckout();
    }

    handleCheckout() {
        if (this.cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const confirmation = confirm(`Proceed to checkout?\n\nTotal: Rs. ${total}\n\nYou can:\n1. Visit our store for payment\n2. Call for delivery: 03196091663\n3. WhatsApp order: 03241161291`);
        
        if (confirmation) {
            // In a real application, you would process the order here
            alert('Order placed successfully! We will contact you soon for payment and delivery details.');
            this.cart = [];
            this.saveCart();
            this.updateCartCount();
            this.renderCart();
            document.querySelector('.cart-sidebar').classList.remove('active');
        }
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const name = formData.get('name') || form.querySelector('input[type="text"]').value;
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        const subject = formData.get('subject') || form.querySelectorAll('input[type="text"]')[1].value;
        const message = formData.get('message') || form.querySelector('textarea').value;

        // Simulate form submission
        alert(`Thank you for your message, ${name}! We will get back to you soon at ${email}.`);
        form.reset();
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: var(--shadow);
            z-index: 1004;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DaudElectricStore();
});

// Smooth scrolling for navigation links
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

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});







// admin side
 
// Admin Panel JavaScript
class DaudElectricAdmin {
    constructor() {
        this.products = [];
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.initializeEventListeners();
        this.renderProductsTable();
        this.updateStatistics();
    }

    async loadProducts() {
        try {
            const savedProducts = localStorage.getItem('storeProducts');
            if (savedProducts) {
                this.products = JSON.parse(savedProducts);
            } else {
                // Load default products from main script
                const mainScriptProducts = this.getDefaultProducts();
                this.products = mainScriptProducts;
                this.saveProducts();
            }
        } catch (error) {
            console.error('Error loading products:', error);
            this.products = this.getDefaultProducts();
        }
    }

    getDefaultProducts() {
        // Same default products as in main script
        return [
            // ... (same products array as in script.js)
            // Mobile Accessories
            {
                id: 1,
                name: "Fast Charger 25W",
                category: "mobile-accessories",
                price: 1200,
                image: "images/mobile-accessories/charger.jpg",
                description: "Original fast charger with Type-C cable",
                stock: 50,
                featured: true
            },
            {
                id: 2,
                name: "Wireless Earphones",
                category: "mobile-accessories",
                price: 2500,
                image: "images/mobile-accessories/earphones.jpg",
                description: "Bluetooth 5.0 wireless earphones with case",
                stock: 30,
                featured: true
            },
            // ... include all other default products
        ];
    }

    initializeEventListeners() {
        // Tab switching
        const tabs = document.querySelectorAll('.admin-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.dataset.tab;
                this.switchTab(tabId);
            });
        });

        // Add product form
        const addProductForm = document.getElementById('add-product-form');
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewProduct();
        });

        // Edit product form
        const editProductForm = document.getElementById('edit-product-form');
        editProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateProduct();
        });

        // Close modal
        const closeModal = document.querySelector('.close-modal');
        const modal = document.getElementById('edit-product-modal');
        
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    switchTab(tabId) {
        // Update active tab
        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

        // Show active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabId}-tab`).classList.add('active');
    }

    renderProductsTable() {
        const tbody = document.getElementById('products-table-body');
        
        if (this.products.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px;">No products found</td></tr>';
            return;
        }

        tbody.innerHTML = this.products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>
                    <img src="${product.image}" alt="${product.name}" 
                         style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCI+PHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjZWNmMGYxIi8+PHRleHQgeD0iMjUiIHk9IjI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                </td>
                <td>${product.name}</td>
                <td>${this.getCategoryName(product.category)}</td>
                <td>${product.service ? 'Service' : `Rs. ${product.price}`}</td>
                <td>${product.service ? 'N/A' : product.stock}</td>
                <td>
                    ${product.featured ? '<span class="featured-badge">Featured</span>' : ''}
                    ${product.service ? '<span class="service-badge">Service</span>' : ''}
                    ${!product.service && product.stock < 10 ? '<span style="color: var(--accent);">Low Stock</span>' : ''}
                </td>
                <td>
                    <button class="action-btn edit-btn" data-id="${product.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn delete-btn" data-id="${product.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');

        // Add event listeners to action buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.edit-btn').dataset.id);
                this.editProduct(productId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.closest('.delete-btn').dataset.id);
                this.deleteProduct(productId);
            });
        });
    }

    getCategoryName(category) {
        const categories = {
            'mobile-accessories': 'Mobile Accessories',
            'electric-parts': 'Electric Parts',
            'payment-services': 'Payment Services'
        };
        return categories[category] || category;
    }

    addNewProduct() {
        const form = document.getElementById('add-product-form');
        const formData = new FormData(form);
        
        const newProduct = {
            id: this.generateProductId(),
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            price: parseInt(document.getElementById('product-price').value) || 0,
            stock: parseInt(document.getElementById('product-stock').value) || 0,
            image: document.getElementById('product-image').value,
            description: document.getElementById('product-description').value,
            featured: document.getElementById('product-featured').checked,
            service: document.getElementById('product-service').checked
        };

        // Validate required fields
        if (!newProduct.name || !newProduct.category || !newProduct.image || !newProduct.description) {
            alert('Please fill in all required fields.');
            return;
        }

        this.products.push(newProduct);
        this.saveProducts();
        this.renderProductsTable();
        this.updateStatistics();
        
        // Reset form
        form.reset();
        
        // Show success message
        alert('Product added successfully!');
        
        // Switch to products tab
        this.switchTab('products');
    }

    generateProductId() {
        const maxId = this.products.reduce((max, product) => Math.max(max, product.id), 0);
        return maxId + 1;
    }

    editProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Fill the edit form
        document.getElementById('edit-product-id').value = product.id;
        document.getElementById('edit-product-name').value = product.name;
        document.getElementById('edit-product-category').value = product.category;
        document.getElementById('edit-product-price').value = product.price;
        document.getElementById('edit-product-stock').value = product.stock;
        document.getElementById('edit-product-image').value = product.image;
        document.getElementById('edit-product-description').value = product.description;
        document.getElementById('edit-product-featured').checked = product.featured;
        document.getElementById('edit-product-service').checked = product.service || false;

        // Show the modal
        document.getElementById('edit-product-modal').classList.add('active');
    }

    updateProduct() {
        const productId = parseInt(document.getElementById('edit-product-id').value);
        const productIndex = this.products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) return;

        this.products[productIndex] = {
            ...this.products[productIndex],
            name: document.getElementById('edit-product-name').value,
            category: document.getElementById('edit-product-category').value,
            price: parseInt(document.getElementById('edit-product-price').value) || 0,
            stock: parseInt(document.getElementById('edit-product-stock').value) || 0,
            image: document.getElementById('edit-product-image').value,
            description: document.getElementById('edit-product-description').value,
            featured: document.getElementById('edit-product-featured').checked,
            service: document.getElementById('edit-product-service').checked
        };

        this.saveProducts();
        this.renderProductsTable();
        this.updateStatistics();
        
        // Close modal
        document.getElementById('edit-product-modal').classList.remove('active');
        
        alert('Product updated successfully!');
    }

    deleteProduct(productId) {
        if (!confirm('Are you sure you want to delete this product?')) {
            return;
        }

        this.products = this.products.filter(p => p.id !== productId);
        this.saveProducts();
        this.renderProductsTable();
        this.updateStatistics();
        
        alert('Product deleted successfully!');
    }

    updateStatistics() {
        const totalProducts = this.products.length;
        const categories = new Set(this.products.map(p => p.category)).size;
        const lowStock = this.products.filter(p => !p.service && p.stock < 10).length;
        const featuredProducts = this.products.filter(p => p.featured).length;

        document.getElementById('total-products').textContent = totalProducts;
        document.getElementById('total-categories').textContent = categories;
        document.getElementById('low-stock').textContent = lowStock;
        document.getElementById('featured-products').textContent = featuredProducts;
    }

    saveProducts() {
        localStorage.setItem('storeProducts', JSON.stringify(this.products));
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DaudElectricAdmin();
});