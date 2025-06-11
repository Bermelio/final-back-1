import { Router } from 'express';
import ProductManagerMongo from '../dao/ProductManagerMongo.js';

const router = Router();
const productManager = new ProductManagerMongo();

router.get('/products', async (req, res) => {
  const { limit, page, sort, query } = req.query;

  try {
    const result = await productManager.getProductsPaginated({ limit, page, sort, query });

    res.render('products', {
      products: result.payload,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.prevLink,
      nextLink: result.nextLink,
      page: result.page,
    });
  } catch (error) {
  console.error('Error en /products:', error.message);
  res.status(500).send(`Error en el servidor: ${error.message}`);
  }
});

export default router;
