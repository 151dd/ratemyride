$(document).on('ready', function() {
	
	//Center splash content
	function vertPos() {
		var parentHeight = $(document).outerHeight();
		var childHeight = $('.vertical-align').outerHeight();
		$('.vertical-align').css('margin-top', (parentHeight - childHeight) / 2);
	}

	vertPos();

	//URL params
	function getUrlParameter(sParam)
	{
	    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++) 
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam) 
	        {
	            return sParameterName[1];
	        }
	    }
	}   

	//Change and set the route option
	$('body').on('click', '.route-option', function() {
		var routeID = $(this).data('route-id');
		var routeDirection = $(this).data('direction');

		$('#busNumAutoID').val(routeID);
		$('#busNumAutoDirection').val(routeDirection);

		$('.route-option').removeClass('selected');
		$(this).addClass('selected');

	})

	//On Bus Now
	if(getUrlParameter('type') == "auto") {

		function success(position) {
		  var s = $('#status');
		  
		  if (s.className == 'success') {
		    // not sure why we're hitting this twice in FF, I think it's to do with a cached result coming back    
		    return;
		  }
		  
		  $("#map i").remove();
		  s.html("Select Your Bus Route");
		  
		  var latitude = position.coords.latitude;
		  var longitude = position.coords.longitude;
		  
		  var latlng = new google.maps.LatLng(latitude,longitude);
		  var style_arr = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
		  var myOptions = {
		    zoom: 15,
		    center: latlng,
		    mapTypeControl: false,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    styles: style_arr,
		    disableDefaultUI: false,
		    streetViewControl: false,
		    draggable: false, 
		    zoomControl: false, 
		    scrollwheel: false, 
		    disableDoubleClickZoom: true
		  };

		  var map = new google.maps.Map($("#map").get(0), myOptions);
		  
		  var marker = new google.maps.Marker({
		      position: latlng, 
		      map: map, 
		      title: "You are here! (at least within a "+position.coords.accuracy+" meter radius)"
		  });


		  $('#busNumAutoLat').val(latitude);
		  $('#busNumAutoLon').val(longitude);

		  //Show the bus number dropdown
		  $('#autoBusNum, #findSubmit').show();
		  vertPos();

		}

		function error(msg) {
		  var s = $('#status');
		  s.text("Failed");
		  s.addClass('fail');
		  
		  // console.log(arguments);
		}

		if (navigator.geolocation) {
		  navigator.geolocation.getCurrentPosition(success, error);
		} else {
		  error('not supported');
		}
		
	}

	//Not On Bus
	if(getUrlParameter('type') == "manual") {
		
		var endpoint = '/feedback/blah';

		$('#manBusNum').show();
	}

	//Fill in hidden question data from find form
	$('#busNumAutoID').val(getUrlParameter('busNumAutoID'));
	$('#busNumAutoDirection').val(getUrlParameter('busNumAutoDirection'));
	$('#busNumAutoTime').val(getUrlParameter('busNumAutoTime'));
	$('#busNumAutoStopID').val(getUrlParameter('busNumAutoStopID'));
	$('#busNumAutoLat').val(getUrlParameter('busNumAutoLat'));
	$('#busNumAutoLon').val(getUrlParameter('busNumAutoLon'));

	//Handle questions
	$('.answer-option').on('click', function() {

		//Is it a boolean answer?
		if($(this).hasClass('answer-option-bool')) {
			$(this).parent().parent().find('.answer-option').removeClass('selected');
			$(this).addClass('selected');
			var input = $(this).parent().parent().find('.hidden-answer');
			var dataVal = $(this).data('answer');
			input.val(dataVal);
		} else {
			if($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				var dataVal = "0"
			} else {
				$(this).addClass('selected');
				var dataVal = "1"
			}
			var index = $(this).index();
			var input = $(this).parent().parent().find('.hidden-answer').eq(index);
			input.val(dataVal);
		}

	});

	//Handle question form submit

	$.fn.serializeObject = function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};

	$(function() {
	    $('#qaForm').submit(function() {
	        console.log(JSON.stringify($('#qaForm').serializeObject()));
	        return false;
	    });
	});




});