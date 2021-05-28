<script>
    /*Pagina principal de amchart con piechart: https://www.amcharts.com/docs/v4/chart-types/pie-chart/*/
    /*Ejemplo para pie chart de varios atributos: https://codepen.io/team/amcharts/pen/PQrvJr*/
    
    async function loadGraph() {
        let CBData = [];
        let DataGraph = [];
        const resData = await fetch("/api/v2/culturaBASE");
        CBData = await resData.json();
        CBData.forEach((x) => {
            DataGraph.push({name: x.district + " " + x.year, data: [parseInt(x.fundraising), parseInt(x.spectator), parseInt(x.spending_per_view)], pointPlacement: 'on'})
        });

       /* am4core.ready(function(){
            am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);

            var chart = am4core.create("chartdiv", am4charts.PieChart);

            chart.data = CBData;

            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "fundraising";
            pieSeries.dataFields.category = "district";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;

            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;

        });*/

        am4core.ready(function() {
            
            // Themes begin
           am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            // Themes end
            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.PieChart);
            console.log(chart);
            // Add data
            chart.data = CBData;
            // Set inner radius
            chart.innerRadius = am4core.percent(50);
            //chart.innerHeight = am4core.percent(50);
            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "fundraising";
            pieSeries.dataFields.category = "district";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries.slices.template.states.getKey("hover").properties.scale = 1.1;

            pieSeries.labels.template.disabled = true;
            pieSeries.ticks.template.disabled = true;
            //
            var pieSeries2 = chart.series.push(new am4charts.PieSeries());
            pieSeries2.dataFields.value = "spectator";
            pieSeries2.dataFields.category = "district";
            pieSeries2.slices.template.stroke = am4core.color("#fff");
            pieSeries2.slices.template.strokeWidth = 2;
            pieSeries2.slices.template.strokeOpacity = 1;
            pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries2.slices.template.states.getKey("hover").properties.scale = 1.1;

            var pieSeries3 = chart.series.push(new am4charts.PieSeries());
            pieSeries3.dataFields.value = "spending_per_view";
            pieSeries3.dataFields.category = "district";
            pieSeries3.slices.template.stroke = am4core.color("#fff");
            pieSeries3.slices.template.strokeWidth = 2;
            pieSeries3.slices.template.strokeOpacity = 1;
            // This creates initial animation
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;
        });

    }
    loadGraph();

</script>

<svelte:head>
    
</svelte:head>

<style>
    #chartdiv {
      width: 100%;
      height: 700px;
    }
    
</style>


<main>

    <div id="chartdiv"></div>
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#/culturaBASE'" style="width: 25%; margin-bottom: 5%;"> Volver a database</button><br>

    
</main>