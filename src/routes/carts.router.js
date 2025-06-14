import { Router } from 'express';
import CartManagerMongo from '../dao/CartManagerMongo.js';

const router = Router();
const cartManager = new CartManagerMongo();

// Crear un carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ status: "success", cart: newCart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET general
router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getAllCarts();
    res.json({ status: "success", carts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Carrito por ID
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });
    res.json({ status: "success", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 1. DELETE carrito y producto
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    await cartManager.deleteProductFromCart(req.params.cid, req.params.pid);
    res.json({ message: "Producto eliminado del carrito" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // POST carrito y producto (con session) ABANDONAMOS LA IDEA DE SESSION
// router.post('/session/product/:pid', async (req, res) => {
//   try {
//     const cartId = req.session.cartId;
//     const { pid } = req.params;

//     if (!cartId) return res.status(400).json({ error: 'Carrito no inicializado' });

//     const result = await cartManager.addProductToCart(cartId, pid);
//     res.json({ status: 'success', cart: result });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// POST carrito y producto
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const result = await cartManager.addProductToCart(
      req.params.cid,
      req.params.pid,
      req.body.quantity
    );
    res.json({ status: 'success', cart: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PUT carrito completo
router.put('/:cid', async (req, res) => {
  try {
    await cartManager.updateCart(req.params.cid, req.body.products);
    res.json({ message: "Carrito actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT cantidad de un producto
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    await cartManager.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
    res.json({ message: "Cantidad actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE carrito entero
router.delete('/:cid', async (req, res) => {
  try {
    await cartManager.clearCart(req.params.cid);
    res.json({ message: "Carrito vaciado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
