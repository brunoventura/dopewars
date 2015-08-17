'use strict';

var express = require('express');

var router = express.Router();


router.get('/', all);
router.get('/:id', show);
/*router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);*/

module.exports = router;

var model = {
	apps: [
		{ 
			name: 'onsite-admin-2',
			lang: ['pt','es'],
		},{
			name: 'accounts',
			lang: ['pt','es']
		},{ 
			name: 'onsite-server',
			lang: ['pt','es']
		}
	]
}

function all(req, res) {
	res.status(200).json(model);
}

function show(req, res) {
	res.status(200).json(model.apps[req.params.id]);
}