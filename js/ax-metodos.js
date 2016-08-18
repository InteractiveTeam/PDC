var epmModule = (function($){
    var actions = '';
    return {
        setting:{
            formRecord:$("#form-record"),
            loginUser:$("#loginUser"),
            btnManual:$('.btn-manual'),
            manual:$('#manual'),
            flipbook:$(".flipbook")
        },
        init:function(){
            actions = this.setting;
            $(document).ready(function(){
               
                $('.ax-page-5').load('page.html .page-6');
                $('.ax-page-6').load('page.html .page-7');
                $('.ax-page-7').load('page.html .page-8');
                $('.ax-page-8').load('page.html .page-9');
                
                epmModule.bindActions();
                actions.btnManual.on('click', function(){
                    actions.manual.animate({top: 0}, 'slow')
                })

                actions.flipbook.turn({
                    width: 1240,
                    height: 840,
                    autoCenter: true,
                    display: (window.innerWidth > 768)?'double':'single'
                })

                actions.flipbook.bind("turning", function(event, page, view) {
                    switch (page) {
                        case 2:
                            $('.cont-title').delay(700).fadeIn(1000);
                        break;

                        case 6:
                            $('.ax-image-svg').delay(500).animate({opacity: 1}, 1000);
                            $('.ax-page-6 .ax-image-svg').delay(4000).animate({opacity: 1}, 1000);
                        break;
                    }
                });
            });
        },
        bindActions:function(){            
            actions.formRecord.submit(function(e){
                e.preventDefault();
                data = {
                    data:epmModule.getFormData(actions.formRecord),
                    action:'recordUser'
                }
                var result = epmModule.requestAjax(data);
                alert('registro exitoso');
            });
            
            actions.loginUser.submit(function(e){
                e.preventDefault();
                data = {
                    data:epmModule.getFormData(actions.loginUser),
                    action:'login'
                }
                var result = epmModule.requestAjax(data);
                console.log(result);
            });
        },
        requestAjax:function(data){
            var result = '';
            $.ajax({
                type:'POST',
                url:'../funciones/control/user.php',
                data:data,
                async:false,
                dataType:'json',
                success:function(data){
                    result = data;
                }
            });
            return result;
        },
        getFormData:function($form){
		    var unindexed_array = $form.serializeArray();
		    var indexed_array = {};

		    $.map(unindexed_array, function(n, i){
		        indexed_array[n['name']] = n['value'];
		    });

		    return indexed_array;
		},
        validateForm:function(type,value){
			var regex = '',status;
			switch(type){
				case 'email':
					regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					status = regex.test(value);
				break;
				case 'text':
					regex = /^[A-Za-z]+$/;
					status = regex.test(value);
				break;
				case 'number':
					regex = /^[0-9]+$/;
					status = regex.test(value);
				break;
				case 'name':
					regex = /^[^0-9!<>,;?=+()@#"°{}_$%:]*$/;
					status = regex.test(value);
				break;
			}
			return status;
		}
    }
}(jQuery));