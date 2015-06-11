var express = require("express"),
app = express(),
db = require('./models'),
methodOverride = require('method-override'),
bodyParser = require('body-parser'),
morgan = require('morgan');

//set middleware
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//Routes

app.get('/', function(req, res){
	res.redirect('/animals');
});

app.get('/animals', function(req, res){
	db.Animal.find({}, function(err, animals){
		if(err){
			res.render('errors/404')
		}
		else res.render('animals/index', {animals:animals});
	})
});

//new
app.get('/animals/new', function(req, res){
	res.render('animals/new');
});

//create
app.post('/animals', function(req, res){
	db.Animal.create(req.body.animal, function(err){
		if(err){
			res.render('errors/404')
		}
		else {
			res.redirect('/animals')
		}
	})
})

//show
app.get('/animals/:id', function(req, res){
	db.Animal.findById(req.params.id, function(err, animal){
		if(err){
			res.render('errors/404')
		}
		else {
			res.render('animals/show', {animal:animal});
		}
	})
})

//edit
app.get('/animals/:id/edit', function(req, res){
	db.Animal.findById(req.params.id, function(err, animal){
		if(err){
			res.render('errors/404')
		}
		else res.render('animals/edit', {animal:animal})
	})
})

//update
app.put('/animals/:id', function(req, res){
	db.Animal.findByIdAndUpdate(req.params.id, req.body.animal, function(err, animals){
		if(err){
			res.render('errors/404')
		}
		else res.redirect('/animals')
	})
})

//destroy
app.delete('/animals/:id', function(req, res){
	db.Animal.findByIdAndRemove(req.params.id, function(err, animal){
		if(err){
			res.render('errors/404')
		}
		else res.redirect('/animals')
	})
})

//start server
app.listen(8080, function(){
	console.log("server started");
});
