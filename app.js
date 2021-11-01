import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import { User } from './models/user.js';

import { config } from 'dotenv';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(__dirname + '/assests'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoutes);

app.get('/', async (req, res) => {
  const result = await User.find();
  console.log(result);
  res.render('index');
});

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
