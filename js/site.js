var accordions, carousel, map, matchHeight, smallScreenMenu, stickyTableColumn, styledTabs, tabPromos, toggler;

accordions = {
	init: function() {
		$('.accordion').collapse();
		
		this.bindEvents();
	},
	
	bindEvents: function() {
		$('.accordion')
			.on('show.bs.collapse', function() {
				$(window).resize();
			});
	}
};

carousel = {
	options: {
		item: 2,
		loop: false,
		slideMove: 2,
		easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
		speed: 400,
		controls: false,
		adaptiveHeight: true,
		galleryMargin: 10,
		responsive: [
			{
				breakpoint: 767,
				settings: {
					item: 1,
					slideMove: 1
				}
			}
		]
	},

	init: function() {
		$('.carousel')
			.each(function() {
				if ($(this).hasClass('single')) {
					// just one
					$(this).lightSlider($.extend({}, carousel.options, { item: 1, slideMove: 1, addClass: $(this).data('ref') }));
				} else {
					$(this).lightSlider($.extend({}, carousel.options, { addClass: $(this).data('ref') }));
				}
			});
	}
};

map = {
	element: $('#map'),
	map: null,
	options: {
		center: {lat: 42.1298244, lng: -71.7082589},
		zoom: 9
	},
	
	init: function() {
		if (!this.element.length) {
			return;
		}
		
		this.map = new google.maps.Map(document.getElementById('map'), this.options);
	}	
};

matchHeight = {
	init: function() {
		var elements = $('.match-height');

		if (!elements.length) {
			return;
		}

		elements.matchHeight();
	}
};

smallScreenMenu = {
	init: function() {
		this.bindEvents();
	},
	
	bindEvents: function() {
		$('header.small-screen a.menu')
			.on('click', function(e) {
				e.stopPropagation();
				e.preventDefault();
				
				$(this).closest('header').find('.menu-panel').stop().slideToggle(240);
			});
	}
};

stickyTableColumn = {
	tables: $('table.sticky-first-column'),
	
	init: function() {		
		if (!this.tables.length) {
			return;
		}
		
		this.setup();
	},
	
	setup: function() {
		this.tables.tablesorter({
			widgets: [ 'scroller' ],
			widgetOptions: {
				scroller_upAfterSort: true,
				scroller_jumpToHeader: true,
				scroller_height: 800,
				scroller_fixedColumns: 1,
				scroller_addFixedOverlay: true,
				scroller_rowHighlight: false,
				scroller_barWidth: null
			}
		});
	}
};

styledTabs = {
	init: function() {
		if (!$('.styled-tabs').length) {
			return;
		}

		$('.styled-tabs ul.nav-tabs li:first').tab('show');

		// bind events
		this.bindEvents();
	},

	bindEvents: function() {
		$('a[data-toggle="tab"]')
			.on('show.bs.tab', function() {
				$(window).resize();
			});
	}
};

tabPromos = {
	init: function() {
		if (!$('.tab-promos').length) {
			return;
		}
		
		$('.tab-promos ul.nav-tabs li:first').tab('show');
	},
};

toggler = {
	init: function() {
		if (!$('.toggler').length) {
			return;
		}

		$('.toggler ul.nav-tabs li:first').tab('show');
		
		this.bindEvents();
	},
	
	bindEvents: function() {
		$('.toggler a[data-toggle="tab"]')
			.on('show.bs.tab', function(e) {
				$('#' + $(e.target).closest('ul').data('update')).val($(e.target).text());
			});
	}
};

// make things work
$(document).ready(function() {
	accordions.init();
	carousel.init();
	map.init();
	matchHeight.init();
	smallScreenMenu.init();
	stickyTableColumn.init();
	styledTabs.init();
	tabPromos.init();
	toggler.init();
});