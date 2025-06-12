import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializar app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('handlebars', exphbs.engine({
  handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/products`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar a MongoDB:', err);
  });