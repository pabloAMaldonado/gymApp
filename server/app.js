const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const flash = require('connect-flash');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { swaggerDocs } = require('./configuration/api');

dotenv.config();

mongoose.set('strictQuery', false);

const { mongoUrl, SESSION_SECRET } = process.env;

const database = 'gymApp';

const mongoDb = `${mongoUrl + database}?retryWrites=true&w=majority`;

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error.message, error);
    process.exit(1);
  }
}

connectToDatabase();

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const store = new MongoDBStore({
  uri: mongoUrl,
  collection: 'sessions'
});

app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(flash());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`app listening! ${PORT}`);
  swaggerDocs(app);
});
