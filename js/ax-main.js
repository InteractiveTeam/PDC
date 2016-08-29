epmModule.init();
var settings = epmModule.setting;
var tl = settings.tl;
var subTitle = settings.imageTitle;

$(document).ready(function(){    
    
     $('body').css('height', $(window).height())
    
    $(".btn-login").on('click',function(){
        tl.to('.content-login', 0.5, {opacity:0,display:'none'})
        .to('.ax-iniciar-sesion', 0.5, {opacity:1,display:'block'},'-=0.20')
        .staggerFrom('.ax-iniciar-sesion .form-group,.ax-iniciar-sesion hgroup', 0.7, {y:-20,opacity:0,},0.10)
        .staggerFrom('.content-btn .button', 0.5, {y:15,opacity:0,},0.10,'-=0.85');
        tl.from(subTitle, 1, {scale:0, opacity:0},'-=1');

        //var mySVG = $('.svg_login').drawsvg();
        //var myAnimation = new DrawFillSVG({elementId: "Layer_1"});
    });
    $(".btn-cancel-login").on('click',function(){
        tl.to('.ax-iniciar-sesion,.ax-registro,.ax-recuperar', 0.5, {opacity:0,display:'none'})
        .to('.content-login', 0.5, {opacity:1,display:'block'})
        .staggerFrom('.content-login .button', 0.7, {y:20,opacity:0,},0.10,'-=0.85');
        tl.from(subTitle, 1, {scale:0, opacity:0},'-=1');
    });

    $(".btn-sign-up").on('click',function(){
        tl.to('.content-login,.ax-iniciar-sesion', 0.5, {opacity:0,display:'none'})
        .to('.ax-registro', 0.5, {opacity:1,display:'block'},'-=0.20')
        .staggerFrom('.ax-registro .form-group,.ax-registro hgroup', 0.7, {y:-20,opacity:0,},0.10)
        .staggerFrom('.content-btn .button', 0.5, {y:15,opacity:0,},0.10,'-=0.85');
        tl.from(subTitle, 1, {scale:0, opacity:0},'-=1');
    });
    
    $(".btn-forgot-pass").on('click',function(){
        tl.to('.ax-iniciar-sesion', 0.5, {opacity:0,display:'none'})
        .to('.ax-recuperar', 0.5, {opacity:1,display:'block'})
        .staggerFrom('.ax-recuperar .form-group', 0.7, {y:-20,opacity:0,},0.10)
        .staggerFrom('.content-btn .button', 0.7, {y:20,opacity:0,},0.10,'-=0.85');
        tl.from(subTitle, 1, {scale:0, opacity:0},'-=1');
    });

    $(".btn-log-out").on('click',function(){
    	sessionStorage.clear();
    	location.reload();
    });
    $("body").on('blur','#pensemos_marca1,#pensemos_marca2,#pensemos_marca3,#pensemos_marca4,#pensemos_marca5,#describe_personaje1,#describe_personaje2,#facebook,#google,#instagram,#twitter,#youtube,#pinterest,#flickr,#dale_orden,#manos_obra,#sitios_web1,#sitios_web2,#boletines_electronicos1,#boletines_electronicos2,#redes_sociales1,#redes_sociales2,#aplicaciones_moviles1,#aplicaciones_moviles2,#visitas1,#visitas2,#visitantes_unicos1,#visitantes_unicos2,#porcentaje_de_rebote1,#porcentaje_de_rebote2,#tiempo_promedio_por_visita1,#tiempo_promedio_por_visita2,#numero_de_contactos1,#numero_de_contactos2,#boletines_abiertos1,#boletines_abiertos2,#me_gusta1,#me_gusta2,#compartidos1,#compartidos2,#seguidores1,#seguidores2,#comentarios1,#comentarios2,#descargas1,#descargas2,#comentarios_en_tiendas1,#comentarios_en_tiendas2,#punto_contacto1,#punto_contacto2,#punto_contacto3,#punto_contacto4,#punto_contacto5,#punto_contacto6,#punto_contacto7,#punto_contacto8,#punto_contacto9,#punto_contacto10,#punto_contacto11',function(){
        var text = $(this).val();
        epmModule.saveDataPage(text,$(this).attr('id'),false,'saveData');
    });
    
    $("body").on('blur','#answer_question1,#answer_question2,#answer_question3,#answer_question4',function(){
        var id = $(this).attr('id'),val='',info = {};
        var question = id.substr(id.length - 9);
        val = $('input[name='+question+']:checked','#questions_manos_obra').val();
        if(val){
            info[id] = $(this).val();
            //le añadimos el R al id para que quede igual nombre de la base de datos
            var output = [id.slice(0, 15), 'R', id.slice(15)].join('');            
            info[output] = val;
            
            epmModule.saveDataPage(info,'',true,'saveData');
        }
    });

    $("body").on('click','#svg_dots',function(){
    	$('.flipbook-viewport').attr('class', 'flipbook-viewport');
		//$(".flipbook-viewport").removeClass('ax-lapiz-select-green ax-lapiz-select');
	});
});


var auxArray = [];
var auxCor = [
                {x:176,y:12},{x:211,y:27},{x:234,y:57},{x:239,y:88},
                {x:235,y:117},{x:217,y:155},{x:188,y:184},{x:152,y:202},
                {x:136,y:193},{x:144,y:172},{x:176,y:157},{x:196,y:137},
                {x:209,y:105},{x:208,y:72},{x:190,y:48},{x:165,y:46},
                {x:146,y:58},{x:140,y:72},{x:140,y:110},{x:126,y:125},
                {x:109,y:112},{x:110,y:77},{x:99,y:53},{x:75,y:45},            
                {x:52,y:56},{x:45,y:78},{x:45,y:108},{x:33,y:125},            
                {x:13,y:114},{x:15,y:69},{x:23,y:44},{x:48,y:20},
                {x:74,y:13},{x:104,y:19},{x:124,y:37},{x:145,y:18},
                {x:176,y:12}
             ];
function addPath(tag,attrs){
    var newpath = document.createElementNS("http://www.w3.org/2000/svg",tag);
    var svg = document.getElementById('svg_dots');
    for (var k in attrs)
        newpath.setAttributeNS(null,k, attrs[k]);

    svg.appendChild(newpath);
}


if( document.createElement('svg').getAttributeNS ) {
	var radiobxsFill = Array.prototype.slice.call( document.querySelectorAll('form input[type="radio"]')),
		checkbxsBoxfill = Array.prototype.slice.call( document.querySelectorAll('form input[type="checkbox"]')),

		pathDefs = {
			fill : ['M15.833,24.334c2.179-0.443,4.766-3.995,6.545-5.359 c1.76-1.35,4.144-3.732,6.256-4.339c-3.983,3.844-6.504,9.556-10.047,13.827c-2.325,2.802-5.387,6.153-6.068,9.866 c2.081-0.474,4.484-2.502,6.425-3.488c5.708-2.897,11.316-6.804,16.608-10.418c4.812-3.287,11.13-7.53,13.935-12.905 c-0.759,3.059-3.364,6.421-4.943,9.203c-2.728,4.806-6.064,8.417-9.781,12.446c-6.895,7.477-15.107,14.109-20.779,22.608 c3.515-0.784,7.103-2.996,10.263-4.628c6.455-3.335,12.235-8.381,17.684-13.15c5.495-4.81,10.848-9.68,15.866-14.988 c1.905-2.016,4.178-4.42,5.556-6.838c0.051,1.256-0.604,2.542-1.03,3.672c-1.424,3.767-3.011,7.432-4.723,11.076 c-2.772,5.904-6.312,11.342-9.921,16.763c-3.167,4.757-7.082,8.94-10.854,13.205c-2.456,2.777-4.876,5.977-7.627,8.448 c9.341-7.52,18.965-14.629,27.924-22.656c4.995-4.474,9.557-9.075,13.586-14.446c1.443-1.924,2.427-4.939,3.74-6.56 c-0.446,3.322-2.183,6.878-3.312,10.032c-2.261,6.309-5.352,12.53-8.418,18.482c-3.46,6.719-8.134,12.698-11.954,19.203 c-0.725,1.234-1.833,2.451-2.265,3.77c2.347-0.48,4.812-3.199,7.028-4.286c4.144-2.033,7.787-4.938,11.184-8.072 c3.142-2.9,5.344-6.758,7.925-10.141c1.483-1.944,3.306-4.056,4.341-6.283c0.041,1.102-0.507,2.345-0.876,3.388 c-1.456,4.114-3.369,8.184-5.059,12.212c-1.503,3.583-3.421,7.001-5.277,10.411c-0.967,1.775-2.471,3.528-3.287,5.298 c2.49-1.163,5.229-3.906,7.212-5.828c2.094-2.028,5.027-4.716,6.33-7.335c-0.256,1.47-2.07,3.577-3.02,4.809'],
			boxfill : ['M6.987,4.774c15.308,2.213,30.731,1.398,46.101,1.398 c9.74,0,19.484,0.084,29.225,0.001c2.152-0.018,4.358-0.626,6.229,1.201c-5.443,1.284-10.857,2.58-16.398,2.524 c-9.586-0.096-18.983,2.331-28.597,2.326c-7.43-0.003-14.988-0.423-22.364,1.041c-4.099,0.811-7.216,3.958-10.759,6.81 c8.981-0.104,17.952,1.972,26.97,1.94c8.365-0.029,16.557-1.168,24.872-1.847c2.436-0.2,24.209-4.854,24.632,2.223 c-14.265,5.396-29.483,0.959-43.871,0.525c-12.163-0.368-24.866,2.739-36.677,6.863c14.93,4.236,30.265,2.061,45.365,2.425 c7.82,0.187,15.486,1.928,23.337,1.903c2.602-0.008,6.644-0.984,9,0.468c-2.584,1.794-8.164,0.984-10.809,1.165 c-13.329,0.899-26.632,2.315-39.939,3.953c-6.761,0.834-13.413,0.95-20.204,0.938c-1.429-0.001-2.938-0.155-4.142,0.436 c5.065,4.68,15.128,2.853,20.742,2.904c11.342,0.104,22.689-0.081,34.035-0.081c9.067,0,20.104-2.412,29.014,0.643 c-4.061,4.239-12.383,3.389-17.056,4.292c-11.054,2.132-21.575,5.041-32.725,5.289c-5.591,0.124-11.278,1.001-16.824,2.088 c-4.515,0.885-9.461,0.823-13.881,2.301c2.302,3.186,7.315,2.59,10.13,2.694c15.753,0.588,31.413-0.231,47.097-2.172 c7.904-0.979,15.06,1.748,22.549,4.877c-12.278,4.992-25.996,4.737-38.58,5.989c-8.467,0.839-16.773,1.041-25.267,0.984 c-4.727-0.031-10.214-0.851-14.782,1.551c12.157,4.923,26.295,2.283,38.739,2.182c7.176-0.06,14.323,1.151,21.326,3.07 c-2.391,2.98-7.512,3.388-10.368,4.143c-8.208,2.165-16.487,3.686-24.71,5.709c-6.854,1.685-13.604,3.616-20.507,4.714 c-1.707,0.273-3.337,0.483-4.923,1.366c2.023,0.749,3.73,0.558,5.95,0.597c9.749,0.165,19.555,0.31,29.304-0.027 c15.334-0.528,30.422-4.721,45.782-4.653']
			
		},
		animDefs = {
			fill : { speed : .8, easing : 'ease-in-out' },
			boxfill : { speed : .8, easing : 'ease-in' }
		};

	function createSVGEl( def ) {
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		if( def ) {
			svg.setAttributeNS( null, 'viewBox', def.viewBox );
			svg.setAttributeNS( null, 'preserveAspectRatio', def.preserveAspectRatio );
		}
		else {
			svg.setAttributeNS( null, 'viewBox', '0 0 100 100' );
		}
		svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );
		return svg;
	}

	function controlCheckbox( el, type, svgDef ) {
		var svg = createSVGEl( svgDef );
		el.parentNode.appendChild( svg );
		
		el.addEventListener( 'change', function() {
			if( el.checked ) {
				draw( el, type );
			}
			else {
				reset( el );
			}
		} );
	}

	function controlRadiobox( el, type ) {
		var svg = createSVGEl();
		el.parentNode.appendChild( svg );
		el.addEventListener( 'change', function() {
			resetRadio( el );
			draw( el, type );
		} );
	}
	
	radiobxsFill.forEach( function( el, i ) { controlRadiobox( el, 'fill' ); } );	
	checkbxsBoxfill.forEach( function( el, i ) { controlCheckbox( el, 'boxfill' ); } );
	
	function draw( el, type ) {
		var paths = [], pathDef, 
			animDef,
			svg = el.parentNode.querySelector( 'svg' );

		switch( type ) {			
			case 'fill': pathDef = pathDefs.fill; animDef = animDefs.fill; break;			
			case 'boxfill': pathDef = pathDefs.boxfill; animDef = animDefs.boxfill; break;			
		};
		
		paths.push( document.createElementNS('http://www.w3.org/2000/svg', 'path' ) );

		if( type === 'cross' || type === 'list' ) {
			paths.push( document.createElementNS('http://www.w3.org/2000/svg', 'path' ) );
		}
		
		for( var i = 0, len = paths.length; i < len; ++i ) {
			var path = paths[i];
			svg.appendChild( path );

			path.setAttributeNS( null, 'd', pathDef[i] );

			var length = path.getTotalLength();
			// Clear any previous transition
			//path.style.transition = path.style.WebkitTransition = path.style.MozTransition = 'none';
			// Set up the starting positions
			path.style.strokeDasharray = length + ' ' + length;
			if( i === 0 ) {
				path.style.strokeDashoffset = Math.floor( length ) - 1;
			}
			else path.style.strokeDashoffset = length;
			// Trigger a layout so styles are calculated & the browser
			// picks up the starting position before animating
			path.getBoundingClientRect();
			// Define our transition
			path.style.transition = path.style.WebkitTransition = path.style.MozTransition  = 'stroke-dashoffset ' + animDef.speed + 's ' + animDef.easing + ' ' + i * animDef.speed + 's';
			// Go!
			path.style.strokeDashoffset = '0';
		}
	}

	function reset( el ) {
		Array.prototype.slice.call( el.parentNode.querySelectorAll( 'svg > path' ) ).forEach( function( el ) { el.parentNode.removeChild( el ); } );
	}

	function resetRadio( el ) {
		Array.prototype.slice.call( document.querySelectorAll( 'input[type="radio"][name="' + el.getAttribute( 'name' ) + '"]' ) ).forEach( function( el ) { 
			var path = el.parentNode.querySelector( 'svg > path' );
			if( path ) {
				path.parentNode.removeChild( path );
			}
		} );
	}
}


//!function(a){"use strict";function b(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}function c(a){this.options=b({},this.options),b(this.options,a),this._init()}var d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},e=d['WebkitTransition'];c.prototype.options={elementId:"svg"},c.prototype._init=function(){this.svg=document.getElementById(this.options.elementId),this.paths=this.svg.querySelectorAll("path"),this._initAnimation()},c.prototype._initAnimation=function(){for(var a=0;a<this.paths.length;a++){var b=this.paths[a],c=b.getTotalLength();b.style.fillOpacity=0,b.style.strokeOpacity=1,b.style.transition=b.style.WebkitTransition="none",b.style.strokeDasharray=c+" "+c,b.style.strokeDashoffset=c,b.getBoundingClientRect(),b.style.transition=b.style.WebkitTransition="stroke-dashoffset 4s ease-in-out",b.style.strokeDashoffset=0,this._fillPath(b)}},c.prototype._fillPath=function(a){a.addEventListener(e,function(){a.style.transition=a.style.WebkitTransition="none",a.style.transition=a.style.WebkitTransition="fill-opacity 1s ease-in-out, stroke-opacity 1s ease-in-out",a.style.fillOpacity=1,a.style.strokeOpacity=0})},c.prototype.replay=function(){this._initAnimation()},a.DrawFillSVG=c}(window); var _gsScope="undefined"!=typeof module&&module.exports&&"undefined"!=typeof global?global:this||window;(_gsScope._gsQueue||(_gsScope._gsQueue=[])).push(function(){"use strict";var a=document.documentElement,b=window,c=function(c,d){var e="x"===d?"Width":"Height",f="scroll"+e,g="client"+e,h=document.body;return c===b||c===a||c===h?Math.max(a[f],h[f])-(b["inner"+e]||a[g]||h[g]):c[f]-c["offset"+e]},d=_gsScope._gsDefine.plugin({propName:"scrollTo",API:2,version:"1.7.6",init:function(a,d,e){return this._wdw=a===b,this._target=a,this._tween=e,"object"!=typeof d&&(d={y:d}),this.vars=d,this._autoKill=d.autoKill!==!1,this.x=this.xPrev=this.getX(),this.y=this.yPrev=this.getY(),null!=d.x?(this._addTween(this,"x",this.x,"max"===d.x?c(a,"x"):d.x,"scrollTo_x",!0),this._overwriteProps.push("scrollTo_x")):this.skipX=!0,null!=d.y?(this._addTween(this,"y",this.y,"max"===d.y?c(a,"y"):d.y,"scrollTo_y",!0),this._overwriteProps.push("scrollTo_y")):this.skipY=!0,!0},set:function(a){this._super.setRatio.call(this,a);var d=this._wdw||!this.skipX?this.getX():this.xPrev,e=this._wdw||!this.skipY?this.getY():this.yPrev,f=e-this.yPrev,g=d-this.xPrev;this.x<0&&(this.x=0),this.y<0&&(this.y=0),this._autoKill&&(!this.skipX&&(g>7||-7>g)&&d<c(this._target,"x")&&(this.skipX=!0),!this.skipY&&(f>7||-7>f)&&e<c(this._target,"y")&&(this.skipY=!0),this.skipX&&this.skipY&&(this._tween.kill(),this.vars.onAutoKill&&this.vars.onAutoKill.apply(this.vars.onAutoKillScope||this._tween,this.vars.onAutoKillParams||[]))),this._wdw?b.scrollTo(this.skipX?d:this.x,this.skipY?e:this.y):(this.skipY||(this._target.scrollTop=this.y),this.skipX||(this._target.scrollLeft=this.x)),this.xPrev=this.x,this.yPrev=this.y}}),e=d.prototype;d.max=c,e.getX=function(){return this._wdw?null!=b.pageXOffset?b.pageXOffset:null!=a.scrollLeft?a.scrollLeft:document.body.scrollLeft:this._target.scrollLeft},e.getY=function(){return this._wdw?null!=b.pageYOffset?b.pageYOffset:null!=a.scrollTop?a.scrollTop:document.body.scrollTop:this._target.scrollTop},e._kill=function(a){return a.scrollTo_x&&(this.skipX=!0),a.scrollTo_y&&(this.skipY=!0),this._super._kill.call(this,a)}}),_gsScope._gsDefine&&_gsScope._gsQueue.pop()();