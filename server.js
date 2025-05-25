const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const organizerRoutes = require('./src/routes/organizerRoutes');
const guestRoutes = require('./src/routes/guestRoutes');
const messageRoutes = require('./src/routes/messageRoutes');

app.use(express.json());

app.use('/usuarios', userRoutes);
app.use('/eventos', eventRoutes);
app.use('/organizadores', organizerRoutes);
app.use('/eventos', guestRoutes);
app.use('/eventos', messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
