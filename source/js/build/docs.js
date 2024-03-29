/* global ga */

Wee.fn.make('docs', {
	init: function() {
		Wee.screen.map([
			{
				min: 3,
				once: true,
				scope: this,
				callback: function() {
					Wee.sidebar.init();
					Wee.sidebar.initScrolling();
				}
			}
		]);

		Wee.history.init({
			partials: 'title, main, .sublinks',
			bind: {
				click: 'a'
			},
			begin: function(conf) {
				if (conf.path === '/') {
					Wee._win.location = '/';
					return false;
				}

				if (/^\/blog/.test(conf.path)) {
					$(Wee._body).removeClass('docs')
						.addClass('blog');

					$('ref:subnav').remove();
				} else if (! $('ref:subnav').length) {
					$(Wee._body).removeClass('blog')
						.addClass('docs');

					$('ref:topnav').after('<div class="sidebar subnav" data-ref="sidebar subnav"><div class="viewport"><div class="overview"><h3>Contents</h3><ul class="sublinks"></ul></div></div>');
				}
			},
			request: {
				success: function() {
					ga('send', 'pageview');
				}
			}
		});

		var $navLinks = $('a', 'ref:sidebar'),
			activeClass = '-is-active';

		$navLinks.on('click', function() {
			$navLinks.removeClass(activeClass);
			$(this).addClass(activeClass);
		});
	}
});