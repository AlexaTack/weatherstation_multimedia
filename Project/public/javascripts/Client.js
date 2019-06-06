google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
	   $.get("index.js", function(Temp) {
	   //$(".result").html(Temp);
	   alert(Temp);
	   //Temp.splice(['Temperatuur']);
	   var data = new google.visualization.DataTable(Temp);
           var options = {
          	title: 'Company Performance',
          	curveType: 'function',
          	legend: { position: 'bottom' }
	   };
	   var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

	   chart.draw(data, options);
        })
      }
