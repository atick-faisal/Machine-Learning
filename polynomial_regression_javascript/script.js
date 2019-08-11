var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: linspace(1, num_iter, 6),
        datasets: [{
            label: 'Cost',
            data: yData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        responsiveAnimationDuration: 400,
        maintainAspectRatio: false,
        scales: {
            xAxes: [{ 
                gridLines: {
                    display: false,
                    color: "#666"
                },
                ticks: {
                    fontColor: "#999"
                },
            }],
            yAxes: [{
                gridLines: {
                    display: false,
                    color: "#666"
                },
                ticks: {
                    display: false,
                    fontColor: "#999"
                    },
            }],
        }
    }
});

var slider1 = document.getElementById("steps");
var slider2 = document.getElementById("iterations");
var slider3 = document.getElementById("order");

slider1.oninput = function() {
	alpha = map(this.value, 0, 100, 0.01, 0.1);
}

slider2.oninput = function() {
	num_iter = map(this.value, 0, 100, 1, 1000);
}

slider3.oninput = function() {
    order = map(this.value, 1, 10, 1, 10);
    theta = zeros(order + 1, 1);
}