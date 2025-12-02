// Sistema de Carrito de Compras
document.addEventListener('DOMContentLoaded', function() {
    let cart = [];
    
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    const cartClose = document.getElementById('cartClose');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.querySelector('.cart-count');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const continuarComprando = document.getElementById('continuarComprando');
    const cartIcon = document.querySelector('.cart-icon');


    function openCart() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Función para cerrar el carrito
    function closeCart() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Eventos para cerrar el carrito
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    continuarComprando.addEventListener('click', closeCart);

    // Abrir carrito al hacer clic en el ícono
    cartIcon.addEventListener('click', openCart);

    // Función para actualizar el carrito
    function updateCart() {
        // Actualizar contador
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Calcular subtotal
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTotal.textContent = `$${subtotal.toFixed(2)}`;

        // Renderizar items del carrito
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <button class="cart-item-btn" onclick="decreaseQuantity(${index})">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="cart-item-btn" onclick="increaseQuantity(${index})">+</button>
                            <button class="cart-item-delete" onclick="removeFromCart(${index})">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Animar contador
        cartCount.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            cartCount.style.animation = '';
        }, 300);
    }

    // Función para agregar al carrito
    window.addToCart = function(productElement) {
        const name = productElement.querySelector('.producto-titulo').textContent;
        const priceText = productElement.querySelector('.producto-precio').textContent;
        const price = parseFloat(priceText.replace('$', ''));
        const image = productElement.querySelector('.producto-image').src;

        // Verificar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        updateCart();
        openCart();
    };

    
    window.increaseQuantity = function(index) {
        cart[index].quantity++;
        updateCart();
    };

  
    window.decreaseQuantity = function(index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1);
        }
        updateCart();
    };

   
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCart();
    };


    const botonesComprar = document.querySelectorAll('.btn-comprar');
    
    botonesComprar.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.producto-card');
            addToCart(productCard);
        });
    });


    updateCart();
});


const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);