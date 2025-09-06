import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { sequelize } from './utils/sequelize.js';
import priceRouter from './routes/price.route.js';

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT=process.env.PORT;

app.use('/api/prices', priceRouter)


async function serverstart() {
  try {
    await sequelize.authenticate();
    console.log('Connected to Supabase Postgres');

    await sequelize.sync(); 

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error(' Startup failed', err);
    process.exit(1);
  }
}

serverstart();