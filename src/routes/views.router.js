import { Router } from 'express';
import CartModel from '../models/cart.model.js';
import { ProductModel } from '../models/product.model.js';

const router = Router();

//render products with pagination

router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;

    const result = await ProductModel.paginate({}, {
      page,
      limit,
      lean: true
    });

    res.render('products', {
      products: result.docs,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/products?page=${result.nextPage}` : null
    });
  } catch (error) {
    console.error('Error al cargar productos paginados:', error.message);
    res.status(500).send('Error al cargar productos');
  }
});

// Render cart view
router.get('/carts', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;

    const result = await CartModel.paginate({}, {
      page,
      limit,
      populate: 'products.product',
      lean: true
    });

    res.render('carts', {
      carts: result.docs,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/carts?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/carts?page=${result.nextPage}` : null
    });
  } catch (error) {
    console.error('Error al cargar el carrito:', error.message);
    res.status(500).send('Error al cargar el carrito por: ' + error.message);
  }
});

export default router;
