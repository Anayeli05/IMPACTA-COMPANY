// Smooth scrolling para los enlaces de navegación
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

// Funcionalidad del carrito de compras
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const cartIcon = document.querySelector('.cart-icon');

cartIcon.addEventListener('click', () => {
    cartCount++;
    cartCountElement.textContent = cartCount;
    

    cartCountElement.style.animation = 'none';
    setTimeout(() => {
        cartCountElement.style.animation = 'pulse 0.3s ease';
    }, 10);
    

    console.log(`Productos en carrito: ${cartCount}`);
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


document.querySelectorAll('.category-card, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});


const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});


document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.category-title').textContent;
        console.log(`Categoría seleccionada: ${title}`);
        
    });
});


let productos = {
    nuevo: 15,
    promociones: 8,
    ofertas: 12,
    tutoriales: 5,
    catalogo: 50
};


function updateCartCount(newCount) {
    cartCount = newCount;
    cartCountElement.textContent = cartCount;
    cartCountElement.style.animation = 'pulse 0.3s ease';
}


document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = '#ff0000';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = 'rgba(255, 0, 0, 0.3)';
    });
});


function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim() === '') {
        errors.push('El nombre es requerido');
    }
    
    if (!formData.email || !formData.email.includes('@')) {
        errors.push('Email inválido');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errors;
}


function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#00ff00' : '#ff0000'};
        color: #000;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


function preloadImages(imageArray) {
    imageArray.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}


const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    console.log('Dispositivo móvil detectado');
  
}


console.log('%c🏍️ MotoGear - Accesorios de Elite', 'color: #ff0000; font-size: 20px; font-weight: bold;');
console.log('%cSitio web desarrollado con HTML, CSS y JavaScript', 'color: #fff; font-size: 14px;');


document.addEventListener('DOMContentLoaded', () => {
    console.log('MotoGear cargado correctamente');
    

});

document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});
