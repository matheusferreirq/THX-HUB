const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const session = require('express-session');

const userRoutes = require('./src/routes/userRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const organizerRoutes = require('./src/routes/organizerRoutes');
const guestRoutes = require('./src/routes/guestRoutes');
const messageRoutes = require('./src/routes/messageRoutes');
const landingPageRoutes = require('./src/routes/landingPageRoutes');
const homeRoutes = require('./src/routes/homeRoutes')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(session({
    secret: 'seuSegredoSuperSecreto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));


app.use('/', landingPageRoutes);
app.use('/usuarios', userRoutes);
app.use('/eventos', eventRoutes);
app.use('/organizadores', organizerRoutes);
app.use('/eventos', guestRoutes);
app.use('/eventos', messageRoutes);
app.use('/home', homeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Aplicação rodando em http://localhost:${PORT}`));
