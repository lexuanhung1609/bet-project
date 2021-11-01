import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

import { config } from 'dotenv';

config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'assets')));

app.use(authRoutes);

app.get('/', async (req, res) => {
  res.render('index');
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
