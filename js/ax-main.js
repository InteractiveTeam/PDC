$(document).ready(function(){
    $('.btn-manual').on('click', function(){
        $('#manual').animate({top: 0}, 'slow')
    })
    
    $("#flipbook").turn({
		width: 400,
		height: 300,
		autoCenter: true
	})
    
})