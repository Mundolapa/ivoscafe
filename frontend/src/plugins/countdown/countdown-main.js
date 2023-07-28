$(document).ready(function() {

		/*
		var startTime = new Date( "December 25, 2019 10:00:00" );
		startTime = startTime.getTime();
		alert(startTime);
		
		var currentTime = new Date();
		currentTime = currentTime.getTime();
		alert(currentTime);
		
		var endTime = new Date( "December 25, 2019 10:00:00" );
		endTime.setDate(endTime.getDate() + 30);   // add total remaining days from starting
		endTime = endTime.getTime();
		
		alert(endTime);
		*/

		var ClockLaunchDate = new Date();
		ClockCurrentDateTime = ClockLaunchDate.getTime();
		ClockLaunchDate.setDate(ClockLaunchDate.getDate() + 10);
		
		var PreviousTime;
		PreviousTime = new Date();
		PreviousTime.setDate(PreviousTime.getDate() - 10);
		
		var PreviousDateTime;
		PreviousDateTime = PreviousTime.getTime();
		
		ClockLaunchDateTime = ClockLaunchDate.getTime();
	
	
    	$('.countdown-timer').final_countdown({
		    
			'start': (PreviousDateTime/1000),
            'end': (ClockLaunchDate/1000), //1388461320,
            'now': (ClockCurrentDateTime/1000), // 1387461319,
			selectors: {
				value_seconds:'.clock-seconds .val',
				canvas_seconds:'canvas-seconds',
				value_minutes:'.clock-minutes .val',
				canvas_minutes:'canvas-minutes',
				value_hours:'.clock-hours .val',
				canvas_hours:'canvas-hours',
				value_days:'.clock-days .val',
				canvas_days:'canvas-days'
			},
			seconds: {
				//borderColor:'#c90103',
				borderColor:$('.type-seconds').attr('data-border-color'),
				borderWidth:'5',
			},
			minutes: {
				//borderColor:'#c90103',
				borderColor:$('.type-minutes').attr('data-border-color'),
				borderWidth:'5'
			},
			hours: {
				//borderColor:'#c90103',
				borderColor:$('.type-hours').attr('data-border-color'),
				borderWidth:'5'
			},
			days: {
				//borderColor:'#c90103',
				borderColor:$('.type-days').attr('data-border-color'),
				borderWidth:'5'
			}
		});
	});