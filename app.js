const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const parseurl = require('parseurl');
const Comics = require('./models/comics');
const comicController = require('./controllers/comicController');

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/comics');

app.use(express.static('public'));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

console.log(comicController.list)

app.get('/', comicController.list);

app.get('/:_id', comicController.oneComic);

app.post('/create', comicController.create);

app.post('/delete', comicController.delete);

app.listen(3000, () => {
  console.log('listening');
});
