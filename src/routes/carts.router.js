import { Router } from 'express';
import CartManagerMongo from '../dao/CartManagerMongo.js';

const router = Router();
const cartManager = new CartManagerMongo();

// 1. DELETE producto
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    await cartManager.deleteProductFromCart(req.params.cid, req.params.pid);
    res.json({ message: "Producto eliminado del carrito" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. PUT carrito completo
router.put('/:cid', async (req, res) => {
  try {
    await cartManager.updateCart(req.params.cid, req.body.products);
    res.json({ message: "Carrito actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. PUT cantidad de un producto
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    await cartManager.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
    res.json({ message: "Cantidad actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. DELETE carrito completo
router.delete('/:cid', async (req, res) => {
  try {
    await cartManager.clearCart(req.params.cid);
    res.json({ message: "Carrito vaciado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. GET carrito con populate
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartWithDetails(req.params.cid);
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
