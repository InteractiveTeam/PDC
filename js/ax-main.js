$(document).ready(function(){
    $('.btn-manual').on('click', function(){
        $('#manual').animate({top: 0}, 'slow')
    })
    
    var responsive=(window.innerWidth > 768)?'double':'single';
    
    $(".flipbook").turn({
		width: 1240,
		height: 840,
		autoCenter: true,
        display: responsive
	})
    
    $(".flipbook").bind("turning", function(event, page, view) {

        switch (page) {
            case 2:
                $('.cont-title').delay(700).fadeIn(1000);
            break;
            
            case 6:
            break;
        }
    });
})