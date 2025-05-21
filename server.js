const express = require('express');
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes')

app.use(express.json());
app.use('/usuarios', userRoutes);
app.use('/eventos', eventRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
