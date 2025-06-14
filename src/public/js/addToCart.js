document.querySelector('.add-to-cart').addEventListener('click', async function (event) {
  event.preventDefault();

  const productId = this.getAttribute('data-id');
  const cartId = localStorage.getItem('cartId') || 'defaultCartId';

  const quantityInput = document.getElementById('quantity');
  let quantity = parseInt(quantityInput.value);
  const maxStock = parseInt(quantityInput.getAttribute('max'));

  if (quantity < 1) quantity = 1;
  if (quantity > maxStock) quantity = maxStock;
  quantityInput.value = quantity; 
  try {
    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    });

    const data = await response.json();

    if (data.status === 'success') {
      Toastify({
        text: `✅ ${quantity} producto(s) agregado(s) al carrito`,
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
