'use strict';
var _ = require('lodash');
var express = require('express');

var router = express.Router({mergeParams: true});


router.get('/', all);
/*router.get('/:lang', show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);*/

module.exports = router;

var model = {
	apps: [
		{ 
			project_id: '0',
			tree: {
				'dashboard': {pt: 'painel de instrumentos', es: 'salpicadero'},
				'dashboard.label' :{pt: 'configuração', es: 'configuración'},
				'templates' :{pt: 'configuração', es: 'configuración'},
				'templates.data' :{pt: 'configuração', es: 'configuración'},
				'templates.delete' :{pt: 'configuração', es: 'configuración'},
				'templates.delete.confirm' :{pt: 'configuração', es: 'configuración'}
			}
		},{
			project_id: '1',
			tree: {
				'dashboard': {pt: 'painel de instrumentos', es: 'salpicadero'},
				'dashboard.config' :{pt: 'configuração', es: 'configuración'}
			}
		},{ 
			project_id: '2',
			tree: {
				'dashboard': {pt: 'painel de instrumentos', es: 'salpicadero'},
				'dashboard.config' :{pt: 'configuração', es: 'configuración'}
			}
		}
	]
}

function all(req, res) {
	res.status(200).json(_.findWhere(model.apps, {'project_id' : req.params.id}));
}

function show(req, res) {
	res.status(200).json('to implement');
}