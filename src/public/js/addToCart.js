document.querySelector('.add-to-cart').addEventListener('click', async function () {
  const productId = this.getAttribute('data-id');
  const cartId = localStorage.getItem('cartId') || 'defaultCartId';

  try {
    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: 'POST'
    });

    const data = await response.json();

    if (data.status === 'success') {
      Toastify({
        text: "✅ Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#4caf50",
      }).showToast();

      setTimeout(() => location.reload(), 1000);
    } else {
      Toastify({
        text: "❌ Error al agregar al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#f44336",
      }).showToast();
    }
  } catch (err) {
    console.error(err);
    Toastify({
      text: "⚠️ Error inesperado",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336",
    }).showToast();
  }
});
