import { Router } from 'express';
import CartModel from '../models/cart.model.js';
import { ProductModel } from '../models/product.model.js';

const router = Router();

//render products
router.get('/products', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;

    const queryOptions = {
      page,
      limit,
      lean: true
    };

    if (req.query.sort === 'asc' || req.query.sort === 'desc') {
      const sortOrder = req.query.sort === 'desc' ? -1 : 1;
      queryOptions.sort = { price: sortOrder };
    }

    const result = await ProductModel.paginate({}, queryOptions);

    res.render('products', {
      products: result.docs,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}${req.query.sort ? `&sort=${req.query.sort}` : ''}` : null,
      nextLink: result.hasNextPage ? `/products?page=${result.nextPage}${req.query.sort ? `&sort=${req.query.sort}` : ''}` : null
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

    // Calcular subtotal para cada carrito
    const carts = result.docs.map(cart => {
      let subtotal = 0;
      cart.products.forEach(item => {
        subtotal += item.product.price * item.quantity;
      });
      return { ...cart, subtotal };
    });

    res.render('carts', {
      carts,
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


// Render individual product detail
router.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductModel.findById(pid).lean();

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    res.render('productDetail', {
      product
    });

  } catch (error) {
    console.error('Error al mostrar producto individual:', error.message);
    res.status(500).send('Error al cargar producto por: ' + error.message);
  }
});

export default router;
