let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let flavor = require('./app/models/ice-cream');
let mongoose = require('mongoose');

mongoose.connect('mongodb://dbuser:dbpassword@ds123770.mlab.com:23770/ice-cream-api');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let PORT = process.env.PORT || 8080;

// API ROUTES
let router = express.Router();

router.use(function(req, res, next) {
	console.log('why do we need routers???');
	next();
});

router.get('/', function(req, res) {
	res.json({message: 'hooray!'});
});

router.route('/flavors')
	.post(function(req, res) {
		flavor.create({
			name: req.body.name,
			tried: req.body.tried,
			good: req.body.good
		}, function(err) {
			if(err) {
				console.log(err);
			}
			res.json({message: 'flavor added!'});
		});
	})

	.get(function(req, res) {
		flavor.find(function(err, flavors) {
			if(err) {
				res.send(err);
			}
			res.json(flavors)
		});
	});

router.route('/flavors/:id')
	.get(function(req, res) {
		flavor.findById(req.params.id, function(err, flavor) {
			if(err) {
				res.send(err);
			}
			res.json(flavor);
		});
	})

	.put(function(req, res) {
		flavor.findById(req.params.id, function(err, flavor){
			if(err) {
				res.send(err);
			}
			flavor.name = req.body.name;
			flavor.save(function(err){
				if(err) {
					res.send(err);
				}
				res.json({message:"flavor updated!"});
			});
		});
	})

	.delete(function(req, res) {
		flavor.remove({
			_id: req.params.id
		}, function(err, flavor) {
			if(err) {
				res.send(err);
			}
			res.json({message: "successfully deleted!"});
		});
	});




// REGISTER ROUTES
app.use('/api', router);

app.listen(PORT, function() {
	console.log(`App listening on ${PORT}!`);
});
