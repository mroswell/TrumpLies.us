(function Upgrade($, document){
    const
		$document = $(document),
		$root       = $document.find('header .container .row'),
		$list 		= $root.find('ul');
	function normalizeDOM(){
        var entries = $list
			.find('li')
            .map((n, li) => ((fields) => ({ model: { date: fields.get(0), lie: fields.get(1), truth: fields.get(2) }, view: li }))($(li).contents().map((m, field) => $(field).text().trim()) ))
			.get();
		
		var newContent = 
			_(entries)
			.chain()
			.sortBy(entry => { 
				var 
					dateParts = entry.model.date.split(' '),
					dayPart = parseInt(dateParts[1]);
				if(dayPart < 10) dayPart = '0' + dayPart;
				var order = '0000';
				switch(dateParts[0]){
					case 'Sep': order = '09' + dayPart; break;
					case 'Oct': order ='10' + dayPart; break;
					case 'Nov': order ='11' + dayPart; break;
					default: order = '9999' + dateParts[0]; break;
				}			
				return parseInt('1' + order);
			})
			.map((entry) => 
					//entry.view.style = "";
					//entry.view.innerHTML =
					[   '<li>',
						'	<div class="trumpism">',
						'  		<span class="date">' + entry.model.date + '</span>',
						'  		<span class="lie">' + entry.model.lie + '</span>',
						'  		<span class="truth">' + entry.model.truth + '</span>',
						'	</div>',
						'</li>'
					].join('')
				)
			.value()
			.join('');
		//console.log('new content', newContent);
		$list.html(newContent);
    }
    function prettifyPage() {		
		const 
			$trumpisms  = $list.find('.trumpism'),
			$dates      = $list.find('.date'),
			$lies       = $list.find('.lie'),
			$truths     = $list.find('.truth');

			$root
				.width(700);
			$list
				.find('li')
				.css('list-style-type', 'none');
            $trumpisms
              .addClass('panel');
			$dates
				.addClass('label')
				.addClass('label-info');
            $lies
              .css('display', 'block')
              .addClass('alert')
              .addClass('alert-danger');
            $truths
              .css('display', 'block')
              .addClass('alert')
              .addClass('alert-info');
            $trumpisms.width(300);
            $root.masonry({
                columnWidth: 100,
                percentPosition: true,
                layoutMode: 'fitRows',
                fitWidth: true,
                gutter: 1,
                itemSelector: '.trumpism'
            });
    }
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js',() => {
	$.getScript('https://cdnjs.cloudflare.com/ajax/libs/masonry/4.1.1/masonry.pkgd.js'  , () => {
    $.getScript('https://cdn.jsdelivr.net/jquery.nested/1.01/jquery.nested.js'          , () => { normalizeDOM(); prettifyPage(); }); }); });
})($,document);
