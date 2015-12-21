/**
 * Created by FixError on 19.12.2015.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var models = require('./app/models');
var debug = require('debug');
var error = debug('app:error');
var log = debug('app:log');
var port = process.env.PORT || 8080;

models.sequelize.sync().then(function () {
/*    var server = app.listen(app.get('port'), function () {

    });*/
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.all('*', function(req, res,next) {

    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "X-Requested-With, content-type",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS"
    };

 
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : responseSettings.AccessControlAllowHeaders);
    res.header("Access-Control-Allow-Methods",  responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});



var router = express.Router();

router.use(function (req, res, next) {
    log('Something is happening.');
    next();
});

//ID BOOKS
router.get('/books/:books_id', function (req, res) {
    models.books.findOne({
        where: {
            id: req.params.books_id
        }
    }).then(function (books) {
        log('Books get id');
        res.json(books);
    });
});
//ALL BOOKS
router.get('/books', function (req, res) {
    models.books.findAll({})
        .then(function (books) {
            res.json(books);
        });
});
//CREATE BOOKS
router.post('/books', function (req, res) {
    var books = req.body;
	log(books);
    models.books.create(books)
        .then(function () {
            log('Books saved successfully');
            res.json({success: true});
        });
});

//UPDATE BOOKS
router.put('/books', function (req, res) {
    var books = req.body;
    models.books.update(books, {
            where: {id: books.id}
        })
        .then(function () {
            log('Product update successfully');
            res.json({success: true});
        });
});

//DELETE BOOKS
router.delete('/books/:books_id', function (req, res) {
    models.books.destroy({
        where: {
            id: req.param('books_id')
        }
    }).then(function () {
        log('Books delete successfully');
        res.json({success: true});
    });
});


app.use('/api', router);

app.listen(port);

log('Start http://localhost:' + port);