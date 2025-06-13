document.querySelectorAll('.delete-product').forEach(btn => {
  btn.addEventListener('click', async () => {
    const cartId = btn.dataset.cart;
    const productId = btn.dataset.product;
    try {
      const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.message) {
        Toastify({
          text: "Producto eliminado",
          duration: 1000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#f44336",
        }).showToast();
        setTimeout(() => location.reload(), 2000);
      } else {
        Toastify({
          text: "No se pudo eliminar",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#f44336",
        }).showToast();
      }
    } catch (error) {
      console.error(error);
      Toastify({
        text: "Error inesperado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#f44336",
      }).showToast();
    }
  });
});
