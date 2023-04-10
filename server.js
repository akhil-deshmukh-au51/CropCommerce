const express = require('express');
const session = require('express-session');
const hbs = require('hbs');
const path = require('path'); 


const db = require('./connection/db');
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const aboutRouter = require('./routes/about');
const productRouter = require('./routes/ProductRouter')
const cartRouter = require('./routes/cartRoutes');
const loginpRouter = require('./routes/loginpRoutes')
const dashboardRouter = require('./routes/dashboard');
const addRouter = require('./routes/add');
const checkoutRouter = require('./routes/checkout');
const paymentRouter = require('./routes/payment');
const contactRouter = require('./routes/contact');

const app = express();
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('public/uploads'));
app.use(express.static('images'));




app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/about', aboutRouter);
app.use('/products',productRouter)
app.use('/',cartRouter);
app.use('/loginp',loginpRouter);
app.use('/dashboard',dashboardRouter);
app.use('/add',addRouter);
app.use('/checkout',checkoutRouter);
app.use('/',paymentRouter);
app.use('/contact', contactRouter);

const PORT = process.env.PORT || 3000;

try {
  db.connect();
app.listen(PORT, () => {
    console.log('Server started on port 3000');
  });
} catch (error) {
  console.error('Failed to connect to database:', error);
}