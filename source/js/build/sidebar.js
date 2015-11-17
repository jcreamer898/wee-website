/* global tinyscrollbar */

Wee.fn.make('sidebar', {
	init: function() {
		this.$subnavLinks = $('a', 'ref:subnav');
		this.active = false;

		if (this.scroller) {
			this.scroller.update();
		}

		$(Wee._win).on({
			resize: function() {
				this.setOffsets();
			},
			scroll: this.setActive
		}, {
			init: true,
			scope: this
		});
	},

	/**
	 * Initialize scollbar markup and instance
	 */
	initScrolling: function() {
		var wrapper = '<div class="scrollbar"><div class="track"><div class="thumb"></div></div></div>',
			$topnav = $('ref:topnav'),
			$subnav = $('ref:subnav');

		$topnav.append(wrapper);
		tinyscrollbar($topnav[0]);

		$subnav.append(wrapper);
		this.scroller = tinyscrollbar($subnav[0]);
	},

	/**
	 * Set proper offset on page load and anchor click
	 */
	setOffsets: function() {
		var $body = $(Wee._body),
			offset = 98;

		// Position initial anchor
		if (location.hash) {
			$body.scrollTop($body.scrollTop() - offset);
		}

		// Bind subnav anchor position
		this.offsets = [];

		this.$subnavLinks.each(function(el) {
			var $el = $(el),
				$targ = $($el.attr('href')),
				top = $targ.offset().top;

			$el.add($targ).on('click', function(e, el) {
				location.hash = el.hash;

				$body.scrollTop(top - offset);

				e.preventDefault();
			});

			this.offsets.push(top);
		}, {
			scope: this
		});
	},

	/**
	 * Handle active navigation selection
	 */
	setActive: function() {
		var min = $(Wee._win).scrollTop() + 98,
			activeClass = '-is-active',
			i = 0;

		for (; i < this.offsets.length; i++) {
			var val = false;

			if (this.offsets[i + 1] > min) {
				val = i;
			} else if (min > this.offsets[this.offsets.length - 1]) {
				val = this.offsets.length - 1;
			}

			if (val !== false) {
				if (this.active !== val) {
					this.$subnavLinks.removeClass(activeClass)
						.eq(val).addClass(activeClass);

					this.active = val;
				}

				return;
			}
		}
	}
});