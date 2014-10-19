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
    // Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#time-graph").get(0).getContext("2d");
    //var ctx = document.getElementById("time-graph").getContext("2d");
    // This will get the first returned node in the jQuery collection.
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
    // Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#clean-graph").get(0).getContext("2d");
    //var ctx = document.getElementById("time-graph").getContext("2d");
    // This will get the first returned node in the jQuery collection.
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
    // Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#improvement-graph").get(0).getContext("2d");
    //var ctx = document.getElementById("time-graph").getContext("2d");
    // This will get the first returned node in the jQuery collection.
    var cleanChart = new Chart(ctx).Radar(improvementData, {

    });

});