$(document).on("ready", function() {

    //Bus on time?

    var timeData = [
        {
            value: 30,
            color:"#7C9992",
            highlight: "#FF5A5E",
            label: "YES"
        },
        {
            value: 70,
            color: "#997C7C",
            highlight: "#FFC870",
            label: "NO"
        }
    ]

    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;
    var ctx = $("#time-graph").get(0).getContext("2d");
    var timeChart = new Chart(ctx).Doughnut(timeData, {

    });

    //Bus clean?
    
    var cleanData = [
        {
            value: 40,
            color:"#7C9992",
            highlight: "#FF5A5E",
            label: "YES"
        },
        {
            value: 60,
            color: "#997C7C",
            highlight: "#FFC870",
            label: "NO"
        }
    ]

    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;
    var ctx = $("#clean-graph").get(0).getContext("2d");
    var cleanChart = new Chart(ctx).Doughnut(cleanData, {

    });

    //Improvements
    
    var improvementData = {
        labels: ["Cleanliness", "Anti-Social Behaviour", "Punctuality", "Price", "Space", "Time"],
        datasets: [
            {
                label: "What would you improve",
                fillColor: "rgba(124,153,146,0.2)",
                strokeColor: "rgba(124,153,146,1)",
                pointColor: "rgba(124,153,146,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(124,153,146,1)",
                data: [1, 2, 1, 4, 1, 0, 1]
            }
        ]
    };

    Chart.defaults.global.responsive = true;
    Chart.defaults.global.maintainAspectRatio = false;
    var ctx = $("#improvement-graph").get(0).getContext("2d");
    var improvementChart = new Chart(ctx).Radar(improvementData, {

    });

     //Demo for updating chart when feedback submitted

    Pusher.log = function(message) {
      if (window.console && window.console.log) {
        window.console.log(message);
      }
    };

    var pusher = new Pusher('1c6e0d39fa0205cfe767');
    var channel = pusher.subscribe('rateride');
    channel.bind('new_feedback', function(data) {

        var loc_lat = data.busNumAutoLat;
        var loc_long = data.busNumAutoLong;

        cleanChart.segments[1].value = 10;
        cleanChart.update();

        timeChart.segments[1].value = 30;
        timeChart.update();

        improvementChart.datasets[0].points[2].value = 3;
        improvementChart.datasets[0].points[3].value = 5;
        improvementChart.datasets[0].points[4].value = 2;
        improvementChart.update();

    });

});