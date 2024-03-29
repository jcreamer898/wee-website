Wee.routes.map({
	'$any:once': 'common',
	'$seg': {
		'$any:once': [
			'docs',
			'search'
		],
		'$any': [
			'code',
			'sidebar',
			'link'
		]
	},
	'start': {
		'structure': 'structure'
	},
	'build': {
		'modules': 'structure'
	},
	'blog': {
		'$slug': 'blog'
	},
	'style': {
		'customize': 'customize'
	}
});

Wee.ready('routes:run');