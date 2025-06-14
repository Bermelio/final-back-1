(async () => {
let cartId = localStorage.getItem('cartId');

if (!cartId) {
    try {
    const response = await fetch('/api/carts', { method: 'POST' });
    const data = await response.json();
    if (data.status === 'success') {
        cartId = data.cart._id;
        localStorage.setItem('cartId', cartId);
        console.log('🛒 Nuevo carrito creado:', cartId);
    } else {
        console.error('❌ Error creando carrito:', data);
    }
    } catch (err) {
    console.error('❌ Error de red creando carrito:', err);
    }
} else {
    console.log('🛒 Carrito existente:', cartId);
}

async function updateCartCount() {
    if (!cartId) return;
    try {
    const response = await fetch(`/api/carts/${cartId}`);
    const data = await response.json();
    if (data.status === 'success') {
        const count = data.cart.products.reduce((sum, p) => sum + p.quantity, 0);
        const badge = document.getElementById('cart-count');
        if (badge) badge.textContent = count;
    }
    } catch (err) {
    console.error('❌ Error obteniendo carrito:', err);
    }
}

updateCartCount();

window.updateCartCount = updateCartCount;
})();