$(document).on('ready', function() {

	//Stops links behaving like links on iOS app mode
	var a=document.getElementsByTagName("a");
	for(var i=0;i<a.length;i++) {
	    if(!a[i].onclick && a[i].getAttribute("target") != "_blank") {
	        a[i].onclick=function() {
	                window.location=this.getAttribute("href");
	                return false; 
	        }
	    }
	}
	
	//Center splash content
	function vertPos() {
		var parentHeight = $(document).outerHeight();
		var childHeight = $('.vertical-align').outerHeight();
		$('.vertical-align').css('margin-top', (parentHeight - childHeight) / 2);
	}

	//Do on load
	vertPos();

	//Handle URL params
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

		$('#findBus').submit();

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

		  //Update list of available bus numbers

		  //Delete static list
		  $('#autoBusNum .route-option').remove();

		  var routesUrl = "/routes/search?lat=" + latitude + "&long=" + longitude;
		  $.get(routesUrl, function(data) {
			  	data = $.parseJSON(data);
			  	console.log(data);
				$.each(data, function(i, item) {
				    console.log(item);
				    var routeListHtml = '<div class="route-option" data-route-id="' + item.route_id + '" data-direction="' + item.route_direction + '"><span>' + item.route_number + '</span> - Towards '+ item.route_direction + '</div>';
				    $('#autoBusNum').prepend(routeListHtml);
				    $('#busNumAutoTime').val(item.time);
				    $('#busNumAutoStopID').val(item.stop_id);
				});
		  });

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
	$('#routeId').val(getUrlParameter('busNumAutoID'));
	$('#direction').val(getUrlParameter('busNumAutoDirection'));
	$('#original_time').val(getUrlParameter('busNumAutoTime'));
	$('#stop_id').val(getUrlParameter('busNumAutoStopID'));
	$('#latitude').val(getUrlParameter('busNumAutoLat'));
	$('#longitude').val(getUrlParameter('busNumAutoLon'));

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
	    $('#qaForm').submit(function(e) {

	    	e.preventDefault();

	        var data = $(this).serialize();
	        var route_id = $("#routeId").val();
	        console.log(data);

	        $('.overlay').fadeIn(200);
	        $('#submitFeedback').html("Sending...");

	        //Send to pusher
	        $.post( "/send.php", data)
			.success(function(data) {
			    console.log( "Data Loaded: " + data );
			});

			//Send to DB
			var feedbackUrl = "/feedback/route/" + route_id;

			$.post(feedbackUrl, data)
			.success(function(data) {
			    console.log( "Data Loaded: " + data );
			});

			//Put this on callback rather than setTimeout when endpoint is plugged in
	        setTimeout(function(){swal({   title: "Sent!",   text: "Thank you for providing us with your feedback",   type: "success",   showCancelButton: false,   confirmButtonColor: "#7C9992",   confirmButtonText: "OK",   closeOnConfirm: false }, function(){window.location.href = '/';});}, 3000);

	        return false;
	    });
	});

	//Show contact form
	$('.qa-contact .question-wrap').on('click', function() {
		$('.qa-contact .answer-wrap').slideToggle(200);
		$(this).find('i').toggleClass('fa-caret-left');
		$(this).find('i').toggleClass('fa-caret-down');
	});

	$('.qa-details .question-wrap').on('click', function() {
		$('.qa-details .answer-wrap').slideToggle(200);
		$(this).find('i').toggleClass('fa-caret-left');
		$(this).find('i').toggleClass('fa-caret-down');
	});


});