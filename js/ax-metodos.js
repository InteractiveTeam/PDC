var epmModule = (function($){
    var actions = '',pageCat = '',infoPages='',banderaEpm = true;
    var dataUser = JSON.parse(sessionStorage.getItem('user'));
    return {
        setting:{
            tl:new TimelineLite(),
            formRecord:$("#form-record"),
            loginUser:$("#loginUser"),
            forgotPass:$("#form-forgot-pass"),
            btnManual:$('.btn-manual'),
            manual:$('#manual'),
            flipbook:$(".flipbook"),
            imageTitle:$('.ax-container svg'),
            svg_stroke:"#000",
            stroke_width:3,
            flipbook_viewport:$('.flipbook-viewport')
        },
        init:function(){
            actions = this.setting;
            this.validateUser();
            $(document).ready(function(){                
                $('.ax-page-5').load('page.html .page-5');
                $('.ax-page-6').load('page.html .page-6');
                $('.ax-page-7').load('page.html .page-7');
                $('.ax-page-8').load('page.html .page-8');
                $('.ax-page-9').load('page.html .page-9');
                $('.ax-page-10').load('page.html .page-10');
                $('.ax-page-11').load('page.html .page-11');
                $('.ax-page-12').load('page.html .page-12');
                $('.ax-page-13').load('page.html .page-13');
                $('.ax-page-14').load('page.html .page-14');
                $('.ax-page-15').load('page.html .page-15');
                $('.ax-page-16').load('page.html .page-16');
                $('.ax-page-17').load('page.html .page-17');
                $('.ax-page-18').load('page.html .page-18'); 
                $('.ax-page-20').load('page.html .page-20');
                $('.ax-page-22').load('page.html .page-22');
                $('.ax-page-23').load('page.html .page-23');
                $('.ax-page-24').load('page.html .page-24');
                $('.ax-page-25').load('page.html .page-25');
                $('.ax-page-26').load('page.html .page-26');
                $('.ax-page-27').load('page.html .page-27');
                $('.ax-page-28').load('page.html .page-28');
                
                epmModule.bindActions();
                actions.btnManual.on('click', function(){
                    actions.manual.animate({top: 0}, 'slow',function(){
                        $(this).css({position:'absolute'});
                    })
                })
                
                $('.ax-close').on('click', function(){
                    actions.manual.animate({top: 120+'%'}, 'slow',function(){
                        $(this).css({position:'fixed'});
                    })
                })

                actions.flipbook.turn({
                    width: (window.innerWidth > 768)?1044:320,
                    height: (window.innerWidth > 768)?750:500,
                    autoCenter: true,
                    display: (window.innerWidth > 768)?'double':'single',
                })

                $("#prev").click(function(e){
                    e.preventDefault();
                    actions.flipbook.turn("previous");
                });

                $("#next").click(function(e){
                    e.preventDefault();
                    actions.flipbook.turn("next");
                });


                actions.flipbook.bind("turning", function(event, page, view) {
                    pageCat = page;
                    switch (page) {
                        case 2:
                            $('.cont-title').delay(500).fadeIn();
                        break;
                        case 4:
                        case 5:
                            actions.tl.staggerFrom('.ax-page-3 .ax-cont-info li', 0.8, {y:20,opacity:0,clearProps:"all"},0.10)
                                .staggerFrom('.ax-page-4 .ax-cont-info p', 0.6, {y:20,opacity:0,clearProps:"all"},0.10,'-=1.2');
                            break;
                        case 6:
                        case 7:
                            actions.flipbook_viewport.attr('class', 'flipbook-viewport');
                            
                            $('.ax-image-svg').delay(500).animate({opacity: 1}, 1000);
                            $('.ax-page-6 .ax-image-svg').delay(4000).animate({opacity: 1}, 1000);
                            //LLenamos los datos del usuario
                            
                            for(var i=1;i<=5;i++){
                                $("#pensemos_marca"+i).val(infoPages.data['pensemos_marca'+i]);                                
                            }                             
                        break;
                        case 8:
                        case 9:
                            
                            actions.tl.staggerFrom('.ax-imagen-tols .ax-tols', 0.8, {y:20,opacity:0,clearProps:"all"},0.10)
                            .staggerFrom('.ax-page-7 .ax-cont-first p', 0.8, {y:20,opacity:0,clearProps:"all"},0.10,'-=0.85');
                            
                            if(!parseInt(infoPages.data.drawEpm)){//validamo que se encuentre dibujado el SVG
                                $("#ax-lapiz").on('click',function(){                                
                                    actions.flipbook_viewport.attr('class', 'flipbook-viewport');
                                    actions.flipbook_viewport.addClass('ax-lapiz-select');
                                    epmModule.svg_stroke = '#000';
                                    epmModule.stroke_width = 3;
                                    $("#svg_dots path:last").attr('stroke',epmModule.svg_stroke);
                                    $("#svg_dots path:last").attr('stroke-width',epmModule.stroke_width);
                                    epmModule.dragEMP();
                                });
                                $("#ax-lapiz-green").on('click',function(){
                                    actions.flipbook_viewport.attr('class', 'flipbook-viewport');
                                    actions.flipbook_viewport.addClass('ax-lapiz-select-green');
                                    epmModule.svg_stroke = '#91c848';
                                    epmModule.stroke_width = 3;
                                    $("#svg_dots path:last").attr('stroke',epmModule.svg_stroke);
                                    $("#svg_dots path:last").attr('stroke-width',epmModule.stroke_width);
                                    epmModule.dragEMP();
                                });
                                $("#ax-crayola").on('click',function(){
                                    actions.flipbook_viewport.attr('class', 'flipbook-viewport');
                                    actions.flipbook_viewport.addClass('ax-crayola');
                                    epmModule.svg_stroke = '#000';
                                    epmModule.stroke_width = 6;
                                    $("#svg_dots path:last").attr('stroke',epmModule.svg_stroke);
                                    $("#svg_dots path:last").attr('stroke-width',epmModule.stroke_width);
                                    epmModule.dragEMP();
                                });
                            }else{
                                $(".drag").addClass('drag-epm-full');
                            }                            
                            break;
                        case 10:
                        case 11:                            
                            actions.flipbook_viewport.attr('class', 'flipbook-viewport');
                            //LLenamos los datos del usuario
                            $("#describe_personaje1").val(infoPages.data.describe_personaje1);
                            $("#describe_personaje2").val(infoPages.data.describe_personaje2);
                            actions.tl.staggerFrom('.ax-page-9 .ax-cont-first p,.ax-page-10 .ax-cont-first p', 0.8, {y:20,opacity:0,clearProps:"all"},0.10);
                        case 12:
                        case 13:
                            actions.tl.staggerFrom('.ax-conment-social .ax-coment', 0.8, {y:20,opacity:0,clearProps:"all"},0.10)
                            .from('.ax-page-12 .ax-cont-first p,.ax-page-13 .ax-cont-first p', 0.8, {y:20,opacity:0,clearProps:"all"},0.10,'-=0.85');
                            //LLenamos los datos del usuario
                            $("#facebook").val(infoPages.data.facebook);
                            $("#google").val(infoPages.data.google);
                            $("#instagram").val(infoPages.data.instagram);
                            $("#twitter").val(infoPages.data.twitter);
                            $("#youtube").val(infoPages.data.youtube);
                            $("#pinterest").val(infoPages.data.pinterest);
                            $("#flickr").val(infoPages.data.flickr);
                        break;
                        case 14:
                        case 15:
                            //.ax-page-14 .ax-image
                            actions.tl.from('.ax-page-14 .ax-image', 1, {right:-30,top:-100,clearProps:"all"})
                            .staggerFrom('.ax-page-13 .ax-cont-first p,.ax-page-14 .ax-cont-first p', 0.6, {y:20,opacity:0,clearProps:"all"},0.10,'-=0.85')
                            .staggerFrom('.ax-pasos-avion img', 0.8, {y:20,opacity:0,clearProps:"all"},0.10,'-=0.65');
                                                        
                            break;
                        case 16:
                        case 17:
                            //LLenamos los datos del usuario
                            $("#dale_orden").val(infoPages.data.dale_orden);
                            
                            /*$( ".ax-piezas" ).sortable({
                                tolerance: 'pointer',
                                revert: 'invalid'
                            });*/
                            break;
                        case 18:
                        case 19:
                                for(var i=1;i<=24;i++){
                                    $("#punto_contacto"+i).val(infoPages.data['punto_contacto'+i]);
                                }
                            break;
                        case 20:
                        case 21:
                            //LLenamos los datos del usuario
                            $("#manos_obra").val(infoPages.data.manos_obra);
                            
                            for(var i=1;i<=4;i++){
                                $("#answer_question"+i).val(infoPages.data['answer_question'+i]);
                            }
                            
                            if(infoPages.data.answer_questionR1 == 'Si'){
                                $("#questions_manos_obra #r1").trigger('click');
                            }else if(infoPages.data.answer_questionR1 == 'No'){
                                $("#questions_manos_obra #r2").trigger('click');
                            }
                            
                            if(infoPages.data.answer_questionR2 == 'Si'){
                                $("#questions_manos_obra #r3").trigger('click');
                            }else if(infoPages.data.answer_questionR2 == 'No'){
                                $("#questions_manos_obra #r4").trigger('click');
                            }
                            
                            if(infoPages.data.answer_questionR3 == 'Si'){
                                $("#questions_manos_obra #r5").trigger('click');
                            }else if(infoPages.data.answer_questionR3 == 'No'){
                                $("#questions_manos_obra #r6").trigger('click');
                            }
                            
                            if(infoPages.data.answer_questionR4 == 'Si'){
                                $("#questions_manos_obra #r7").trigger('click');
                            }else if(infoPages.data.answer_questionR4 == 'No'){
                                $("#questions_manos_obra #r8").trigger('click');
                            }
                            break;
                        case 22:
                        case 23:
                            for(var i=1;i<=4;i++){
                                $("#sitios_web"+i).val(infoPages.data['sitios_web'+i]);
                                $("#boletines_electronicos"+i).val(infoPages.data['boletines_electronicos'+i]);
                                $("#redes_sociales"+i).val(infoPages.data['redes_sociales'+i]);
                                $("#aplicaciones_moviles"+i).val(infoPages.data['aplicaciones_moviles'+i]);
                            }                            
                            for(var i=1;i<=13;i++){
                                $("#visitas"+i).val(infoPages.data['visitas'+i]);
                                $("#visitantes_unicos"+i).val(infoPages.data['visitantes_unicos'+i]);
                                $("#porcentaje_de_rebote"+i).val(infoPages.data['porcentaje_de_rebote'+i]);
                                $("#tiempo_promedio_por_visita"+i).val(infoPages.data['tiempo_promedio_por_visita'+i]);
                                $("#numero_de_contactos"+i).val(infoPages.data['numero_de_contactos'+i]);
                                $("#boletines_abiertos"+i).val(infoPages.data['boletines_abiertos'+i]);
                                $("#me_gusta"+i).val(infoPages.data['me_gusta'+i]);
                                $("#compartidos"+i).val(infoPages.data['compartidos'+i]);                                
                                $("#seguidores"+i).val(infoPages.data['seguidores'+i]);
                                $("#comentarios"+i).val(infoPages.data['comentarios'+i]);
                                $("#me_gusta"+i).val(infoPages.data['me_gusta'+i]);
                                $("#descargas"+i).val(infoPages.data['descargas'+i]);
                                $("#comentarios_en_tiendas"+i).val(infoPages.data['comentarios_en_tiendas'+i]);                                
                            }
                            for(var i=14;i<=26;i++){
                                $("#visitas"+i).val(infoPages.data['visitas'+i]);
                                $("#visitantes_unicos"+i).val(infoPages.data['visitantes_unicos'+i]);
                                $("#porcentaje_de_rebote"+i).val(infoPages.data['porcentaje_de_rebote'+i]);
                                $("#tiempo_promedio_por_visita"+i).val(infoPages.data['tiempo_promedio_por_visita'+i]);
                                $("#numero_de_contactos"+i).val(infoPages.data['numero_de_contactos'+i]);
                                $("#boletines_abiertos"+i).val(infoPages.data['boletines_abiertos'+i]);
                                $("#me_gusta"+i).val(infoPages.data['me_gusta'+i]);
                                $("#compartidos"+i).val(infoPages.data['compartidos'+i]);                                
                                $("#seguidores"+i).val(infoPages.data['seguidores'+i]);
                                $("#comentarios"+i).val(infoPages.data['comentarios'+i]);
                                $("#me_gusta"+i).val(infoPages.data['me_gusta'+i]);
                                $("#descargas"+i).val(infoPages.data['descargas'+i]);
                                $("#comentarios_en_tiendas"+i).val(infoPages.data['comentarios_en_tiendas'+i]);
                            }
                            break;
                            case 24:
                            case 25:                                
                                $("img.flickr").attr('src',infoPages.data.img_flickr);
                                $("img.facebook").attr('src',infoPages.data.img_facebook);
                                $("img.twitter").attr('src',infoPages.data.img_twitter);
                                $("img.youtube").attr('src',infoPages.data.img_youtube);
                                $("img.instagram").attr('src',infoPages.data.img_instagram);
                                $("img.pinterest").attr('src',infoPages.data.img_pinterest);
                                $("img.gplus").attr('src',infoPages.data.img_gplus);
                                
                                $("#name_flickr").val(infoPages.data.name_flickr);
                                $("#name_flickr_person").val(infoPages.data.name_flickr_person);
                                $("#name_facebook").val(infoPages.data.name_facebook);
                                $("#name_facebook_person").val(infoPages.data.name_facebook_person);
                                $("#name_twitter").val(infoPages.data.name_twitter);
                                $("#name_twitter_person").val(infoPages.data.name_twitter_person);
                                $("#name_youtube").val(infoPages.data.name_youtube);
                                $("#name_youtube_person").val(infoPages.data.name_youtube_person);
                                $("#name_instagram").val(infoPages.data.name_instagram);
                                $("#name_instagram_person").val(infoPages.data.name_instagram_person);
                                $("#name_pinterest").val(infoPages.data.name_pinterest);
                                $("#name_pinterest_person").val(infoPages.data.name_pinterest_person);
                                $("#name_gplus").val(infoPages.data.name_gplus);
                                $("#name_gplus_person").val(infoPages.data.name_gplus_person);
                                break;
                    }
                });
            });
        },
        dragEMP:function(){
            var svg = document.getElementById('svg_dots');
            $('.drag').on('mousemove',function(e){
                length = auxArray.length;
                var x2 = (e.clientX - parseInt($(this).offset().left)),
                    y2 = (e.clientY - parseInt($(this).offset().top));

                if(length <= 35){
                    svg.children[length].setAttribute('d','M'+ auxCor[length].x+','+auxCor[length].y+'L'+x2+','+y2);
                    if((x2 >= (auxCor[(length+1)].x)  && x2 <= (auxCor[(length+1)].x+4)) &&
                        (y2 >= (auxCor[(length+1)].y) && y2 <= (auxCor[(length+1)].y+4))) {
                        svg.children[length].setAttribute('d','M'+ (auxCor[length].x+3)+','+auxCor[length].y+'L'+x2+','+(y2+1));
                        auxArray.push(length);
                        addPath('path',{d:'M'+(auxCor[(length+1)].x+3)+','+auxCor[(length+1)].y+'L'+x2+','+(y2+1), stroke:epmModule.svg_stroke,fill:'none','stroke-width':epmModule.stroke_width});
                    }
                }
                
                if(length === 36 && banderaEpm==true){
                    banderaEpm = false;
                    actions.flipbook_viewport.attr('class', 'flipbook-viewport');
                    data = {
                        info:{drawEpm:1},
                        action:'saveData',
                        data:dataUser
                    }
                    var result = epmModule.requestAjax(data);
                }
            });
            
            $('.drag,.dot').on('mouseup',function(e){            
                $('.drag').off('mousemove');
            });
        },
        bindActions:function(){
            actions.formRecord.submit(function(e){
                e.preventDefault();
                
                var status = true;
				if(!(epmModule.validateForm('text',$(this).find('[name="name"]').val()))){
					epmModule.setMessage('El campo nombre no es válido.');status = false;
				}else if(!(epmModule.validateForm('text',$(this).find('[name="lastName"]').val()))){
					epmModule.setMessage('El campo apellido es incorrecto.');status = false;
				}else if(!(epmModule.validateForm('email',$(this).find('[name="email"]').val()))){
					epmModule.setMessage('El campo correo electrónico no es válido.');status = false;
				}else if(!$(this).find('[name="term_cond"]').prop('checked')){
					epmModule.setMessage('Debes aceptar los términos y condiciones.');status = false;
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
                        epmModule.setMessage('El usuario ya se encuentra registrado');
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
        saveDataPage:function(data,field,bandera,action){
            if(!bandera){
                var info = {};
                info[field] = data;
            }else{
                var info = data;
            }
            
            data = {
                data:dataUser,
                info:info,
                action:action
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
        requestAjaxFormdata:function(data){
            var result = '';
            $.ajax({
                type:'POST',
                url:'../funciones/control/user.php',
                data:data,
                async:false,
                dataType:'json',
                processData: false,
                contentType: false,
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
        previewFile:function(file,type){            
            var preview = document.getElementById('profile_mesa'); //selects the query named img            
            var file    = file.files[0]; //sames as here
            var reader  = new FileReader();

            reader.onloadend = function(){
                preview.style.display = 'block';
                preview.src = reader.result;
                epmModule.effectPreviewFile(type,reader.result);
            }
            
            var data = new FormData();
            data.append("file", file);
            data.append("action", "saveImg");
            data.append("field", type);
            data.append("data", JSON.stringify(dataUser));
            
            infoPages = epmModule.requestAjaxFormdata(data);
            console.log(infoPages);            
            
            if(file){
                reader.readAsDataURL(file); //reads the data as a URL
            } else {
                preview.src = "";
            }
        },
        effectPreviewFile:function(type,img){
            switch(type){
                case'flickr':
                    actions.tl.to('.caballeros_mesa',1,{scale:1.5}).
                        to('.caballeros_mesa',1,{rotation:-30},'-=0.50').
                        to('.caballeros_mesa',1,{top:76,left:322,scale:1,clearProps:"transform,top,left,display",onComplete:this.setImgMesa,onCompleteParams:[type,img]},'-=0.60');
                break;
                case'gplus':
                    actions.tl.to('.caballeros_mesa',1,{scale:1.5}).
                        to('.caballeros_mesa',1,{rotation:-150},'-=0.50').
                        to('.caballeros_mesa',1,{top:549,left:322,scale:1,clearProps:"transform,top,left,display",onComplete:this.setImgMesa,onCompleteParams:[type,img]},'-=0.60');
                break;
                case'facebook':
                    actions.tl.to('.caballeros_mesa',1,{scale:1.5}).
                        to('.caballeros_mesa',1,{rotation:10},'-=0.50').
                        to('.caballeros_mesa',1,{top:18,left:624,scale:1,clearProps:"transform,top,left,display",onComplete:this.setImgMesa,onCompleteParams:[type,img]},'-=0.60');
                break;
                case'twitter':
                    actions.tl.to('.caballeros_mesa',1,{scale:1.5}).
                        to('.caballeros_mesa',1,{rotation:40},'-=0.50').
                        to('.caballeros_mesa',1,{top:97,left:825,scale:1,clearProps:"transform,top,left,display",onComplete:this.setImgMesa,onCompleteParams:[type,img]},'-=0.60');
                break;
                case'youtube':
                    actions.tl.to('.caballeros_mesa',1,{scale:1.5}).
                        to('.caballeros_mesa',1,{rotation:90},'-=0.50').
                        to('.caballeros_mesa',1,{top:302,left:920,scale:1,clearProps:"transform,top,left,display",onComplete:this.setImgMesa,onCompleteParams:[type,img]},'-=0.60');
                break;
                case'instagram':
                    actions.tl.to('.caballeros_mesa',1,{scale:1.5}).
                        to('.caballeros_mesa',1,{rotation:138},'-=0.50').
                        to('.caballeros_mesa',1,{top:514,left:824,scale:1,clearProps:"transform,top,left,display",onComplete:this.setImgMesa,onCompleteParams:[type,img]},'-=0.60');
                break;
                case'pinterest':
                    actions.tl.to('.caballeros_mesa',1,{scale:1.5}).
                        to('.caballeros_mesa',1,{rotation:166},'-=0.50').
                        to('.caballeros_mesa',1,{top:596,left:637,scale:1,clearProps:"transform,top,left,display",onComplete:this.setImgMesa,onCompleteParams:[type,img]},'-=0.60');
                break;
            }
        },
        setImgMesa:function(id,img){
            $("."+id).attr('src',img);            
            $(".caballeros_mesa").attr('src','');
        },        
        validateForm:function(type,value){
			var regex = '',status;
			switch(type){
				case 'email':
					regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					status = regex.test(value);
				break;
				case 'text':
					regex = /^[A-Za-z\d\s]+$/;
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
            $('.msg-box').html(msg).stop().animate({'top': '2%',opacity:1}, 1000, function(){
				setTimeout(function(){$('.msg-box').stop().animate({'top': '-15%',opacity:0}, 1000);}, 4000);
			});
		}
    }
}(jQuery));