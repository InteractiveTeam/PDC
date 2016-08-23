var epmModule = (function($){
    var actions = '',pageCat = '',infoPages='';
    var dataUser = JSON.parse(sessionStorage.getItem('user'));
    return {
        setting:{
            tl:new TimelineLite(),
            formRecord:$("#form-record"),
            loginUser:$("#loginUser"),
            forgotPass:$("#form-forgot-pass"),
            btnManual:$('.btn-manual'),
            manual:$('#manual'),
            flipbook:$(".flipbook")
        },
        init:function(){
            actions = this.setting;
            this.validateUser();
            $(document).ready(function(){                
                $('.ax-page-5').load('page.html .page-6');
                $('.ax-page-6').load('page.html .page-7');
                $('.ax-page-7').load('page.html .page-8');
                $('.ax-page-8').load('page.html .page-9');
                $('.ax-page-9').load('page.html .page-10');
                $('.ax-page-10').load('page.html .page-11');
                $('.ax-page-11').load('page.html .page-12');
                $('.ax-page-12').load('page.html .page-13');
                
                $('.ax-page-20').load('page.html .page-20');
//                $('.ax-page-21').load('page.html .page-21');
                
                epmModule.bindActions();
                actions.btnManual.on('click', function(){
                    actions.manual.animate({top: 0}, 'slow')
                })

                actions.flipbook.turn({
                    width: 1044,
                    height: 750,
                    autoCenter: true,
                    display: (window.innerWidth > 768)?'double':'single'
                })

                actions.flipbook.bind("turning", function(event, page, view) {
                    pageCat = page;
                    switch (page) {
                        case 2:
                            $('.cont-title').delay(700).fadeIn(1000);
                        break;

                        case 6:
                        case 7:
                            $('.ax-image-svg').delay(500).animate({opacity: 1}, 1000);
                            $('.ax-page-6 .ax-image-svg').delay(4000).animate({opacity: 1}, 1000);
                            //LLenamos los datos del usuario
                            // $("#pensemos_marca1").val(infoPages.data.pensemos_marca1);                            
                            // $("#pensemos_marca2").val(infoPages.data.pensemos_marca2);
                            // $("#pensemos_marca3").val(infoPages.data.pensemos_marca3);                            
                            // $("#pensemos_marca4").val(infoPages.data.pensemos_marca4);
                            // $("#pensemos_marca5").val(infoPages.data.pensemos_marca5);
                        break;
                        case 10:
                        case 11:                            
                            //LLenamos los datos del usuario
                            /*$("#describe_personaje1").val(infoPages.data.describe_personaje1);
                            $("#describe_personaje2").val(infoPages.data.describe_personaje2);*/
                        break;
                    }
                });
            });
        },
        bindActions:function(){
            actions.formRecord.submit(function(e){
                e.preventDefault();
                
                var status = true;
				if(!(epmModule.validateForm('text',$(this).find('[name="name"]').val()))){
					epmModule.setMessage('El campo nombre no es valido.');status = false;
				}else if(!(epmModule.validateForm('text',$(this).find('[name="lastName"]').val()))){
					epmModule.setMessage('El campo apellido es incorrecto.');status = false;
				}else if(!(epmModule.validateForm('email',$(this).find('[name="email"]').val()))){
					epmModule.setMessage('El campo correo electrónico no es valido.');status = false;
				}else if(!$(this).find('[name="term_cond"]').prop('checked')){
					epmModule.setMessage('Debe aceptar términos y condiciones.');status = false;
				}
                
                data = {
                    data:epmModule.getFormData(actions.formRecord),
                    action:'recordUser'
                }
                if(status){
                    var result = epmModule.requestAjax(data);                    
                    if(result.data){
                        sessionStorage.setItem('user', JSON.stringify(result.data));
                        location.reload();
                    }else{
                        epmModule.setMessage('usuario existe');
                    }
                }
            });
            
            actions.loginUser.submit(function(e){
                e.preventDefault();
                data = {
                    data:epmModule.getFormData(actions.loginUser),
                    action:'login'
                }
                var result = epmModule.requestAjax(data);                
                if(result.data){
                    sessionStorage.setItem('user', JSON.stringify(result.data));
                    location.reload();
                }else{
                    epmModule.setMessage('usuario incorrecto');
                }
            });
            
            actions.forgotPass.submit(function(e){
                e.preventDefault();
                data = {
                    data:epmModule.getFormData(actions.forgotPass),
                    action:'forgotpass'
                }
                var result = epmModule.requestAjax(data);
                if(result.data){
                    epmModule.setMessage('hemos enviado un correo con su nueva contraseña');
                }else{
                    epmModule.setMessage('usuario no existe');
                }
            });
        },
        validateUser:function(){
            if(sessionStorage.length){
                if(Object.keys(dataUser).length){
                    actions.tl.to('.content-login', 0, {opacity:0,display:'none'})
                    .to('.ax-profile', 0.5, {opacity:1,display:'block'})
                    .staggerFrom('.content-btn .button', 0.7, {y:20,opacity:0,},0.10,'-=0.85');
                    $(".ax-user-name").text(dataUser.name+' '+dataUser.last_name);
                    this.getData();
                }
            }else{
                actions.tl.to('.content-login', 0, {opacity:1,display:'block'})
                .staggerFrom('.content-login .button', 0.7, {y:20,opacity:0,},0.10,'-=0.85');
            }
        },
        saveDataPage:function(data,field){
            var info = {};
            info[field] = data;
          
            data = {
                data:dataUser,
                info:info,
                action:'saveData'
            }
            var result = epmModule.requestAjax(data);
        },
        getData:function(){
            data = {
                data:dataUser,
                action:'getDataPages'
            }
            infoPages = epmModule.requestAjax(data);
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
		},
        setMessage:function(msg){
            alert(msg);
			/*$('.msg-box').html(msg).stop().animate({'top': '2%',opacity:1}, 1000, function(){
				setTimeout(function(){$('.msg-box').stop().animate({'top': '-15%',opacity:0}, 1000);}, 4000);
			});*/
		}
    }
}(jQuery));