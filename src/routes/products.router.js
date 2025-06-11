import { Router } from 'express';
import ProductManagerMongo from '../dao/ProductManagerMongo.js';


const router = Router();
const productManager = new ProductManagerMongo();

// GET
router.get('/', async (req, res) => {
  const { limit, page, sort, query } = req.query;
  try {
    const result = await productManager.getProductsPaginated({ limit, page, sort, query });
    res.json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al obtener productos' });
  }
});

// GET ID
router.get('/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al buscar el producto' });
  }
});

// POST
router.post('/', async (req, res) => {
  try {
    const newProduct = await productManager.createProduct(req.body);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al crear producto' });
  }
});

// PUT
router.put('/:pid', async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProduct(req.params.pid, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al actualizar producto' });
  }
});

// DELETE 
router.delete('/:pid', async (req, res) => {
  try {
    const deleted = await productManager.deleteProduct(req.params.pid);
    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error al eliminar producto' });
  }
});

export default router;
