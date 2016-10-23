var ContactPage = function () {

    return {
        
    	//Basic Map
        initMap: function () {
			var map;
			$(document).ready(function(){
			  map = new GMaps({
				div: '#map',
				scrollwheel: false,				
				lat: -23.6132995,
				lng: -46.6785116
			  });
			  
			  var marker = map.addMarker({
				lat: -23.6132995,
				lng: -46.6785116,
	            title: 'Maschio Shin Construtora e Incorporadora'
		       });
			});
        },

        //Panorama Map
        initPanorama: function () {
		    var panorama;
		    $(document).ready(function(){
		      panorama = GMaps.createPanorama({
		        el: '#panorama',
		        lat : 40.748866,
		        lng : -73.988366
		      });
		    });
		},

        //Message Function
        initMessage: function(){
            $(document).ready(function(){
                if ($("div#message").text() == "Mensagem enviada com sucesso!") {
                    $("div#message").attr("class" , "alert alert-success fade in")
                }
                if ($("div#message").text() == "Ops, sua mensagem não pôde ser enviada") {
                    $("div#message").attr("class" , "alert alert-danger fade in")
                }
            })
        }

    };
}();



