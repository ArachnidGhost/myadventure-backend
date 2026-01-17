require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server started on port ${process.env.PORT}`);
});

const userRoutes = require('./routes/user');
const routesRoutes = require('./routes/routes');

app.use('/api/user', userRoutes);
app.use('/api/routes', routesRoutes);