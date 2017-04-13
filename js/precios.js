var ctx = document.getElementById("myChart");
var total =0;
var limit =0;
var datos={};
var precios = [];
var sturges=0;
var intervalo={};
var pregunta="";
var url_call1 = "https://api.mercadolibre.com/sites/MLA/search?q="+ $("#q").val() +"&limit=1"
var url_call = "https://api.mercadolibre.com/sites/MLA/search?q="+ $("#q").val() +"&limit=200&offset="

$(document).ready(function () {
    $('#publicidad').addClass('hide');
     });

$("#q").keypress(function(e) {
	$("#logo").hide(200);
	$("#advertencia").hide(200);
	$("#espacio").hide(200);
    $('#row').removeClass('col-md-offset-2');
    if(e.which == 13) {
        $("#boton1").click();
    }
});


	$("#boton1").click(function(){

    $('#publicidad').removeClass('hide');
    $('#publicidad').addClass('show');

	precios =[];
  var URLactual = window.location;
	console.log(URLactual.href);
//		if (URLactual.href!="https://brakdag.github.io/mercadolibreapitest/index.html"){$("#q").val("");}
		pregunta = $("#q").val();
		url_call1 = "https://api.mercadolibre.com/sites/MLA/search?q="+ $("#q").val() +"&limit=1";
		url_call = "https://api.mercadolibre.com/sites/MLA/search?q="+ $("#q").val() +"&limit=200&offset=";
	  $("#q").val("");
  	datos = "";
		$.get( url_call1, function( data ) {
    		limit = 200;
    		total = parseInt(data.paging.total);
            sturges = Math.trunc(1+Math.log(total));
    		$("#tabla").html( "<span class='label label-success' >A partir de " + total +" datos</span>" ); 


    		for(var j=0;j<(Math.trunc(total/limit));j++)
    		{

  
    			console.log(url_call +j*limit);

	    		$.get( url_call+(j*limit), function( data2 ) {
			    		for (var i=0 ; i<limit; i++) 
			    		{
			    			try{
			    			datos = datos + data2.results[i].id + "\t" + data2.results[i].title + "\t" + data2.results[i].price + "\r\n"; 
			    			precios.push( parseFloat(data2.results[i].price));
							}
							catch(err){
						    datos = datos + "error:" + err +  "\r\n"; 	
							}
			    						    	}
				});
	    	}

	$.get( url_call+(total-total % limit), function( data2 ) {
				limit = parseInt(data2.paging.limit);
			    for (var i=0 ; i<(total % limit); i++) 
			    		{
			    			try{
			    			datos = datos + data2.results[i].id + "\t" + data2.results[i].title + "\t" + data2.results[i].price + "\r\n"; 
			    			precios.push( parseFloat(data2.results[i].price));
							}
							catch(err){
						    datos = datos + "error:" + err +  "\r\n"; 
							}
			    		}
	
  var suma=0;
  var suma_cuad=0;
  // calcula la media
       for(var i=0;i<precios.length;i++)
       {
       		suma += precios[i];
       }
var media = suma/precios.length;
// calcula la varianza
	for(var i=0;i<precios.length;i++)
       {
       		suma_cuad += Math.pow(precios[i]-media,2);
       }
        
       var varianza = suma_cuad/precios.length;
       var desviacion = Math.round(Math.sqrt(varianza)*100)/100;
      // $("#media").text('Media: '+ Math.round(media*100)/100 + '$ desviacion: ' + desviacion +'$');
	  
     intervalo = new Array(sturges);
    var marcadeclase = new Array(sturges);
     for(var i=0;i<sturges;i++) intervalo[i]=0;
       var c = media*2/sturges;
	for(var i=0;i<sturges;i++) marcadeclase[i]= Math.round( c*(i+1)) + "$";
     
       for(var i=0 ; i < precios.length; i++){
       		for(var j=0 ;j<sturges;j++)
       		{
       			if ((precios[i]>(c*j)) && ( precios[i] < ( c * (j+1) ))){
       				intervalo[j]++;
       			}
       		}
       }

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: marcadeclase,
        datasets: [{
            label: pregunta,
            data: intervalo,
            borderWidth: 2,
            backgroundColor: 'rgba(55, 99, 255, 0.2)'
        }]
    }
    
});


			 });  
	
	});
});

