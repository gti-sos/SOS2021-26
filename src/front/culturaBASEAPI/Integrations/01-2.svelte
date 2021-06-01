<script>

    /*Ejemplo: https://codepen.io/team/amcharts/embed/ajOJrg?default-tab=result&editable=true&theme-id=dark*/

    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph() {

        let CBData = [];
        let DataGraph = [];
        const resData = await fetch("/api/v2/culturaBASE");
        CBData = await resData.json();
        CBData.forEach((x) => {
                DataGraph.push({name: x.district + " " + x.year, data: [parseInt(x.fundraising), parseInt(x.spectator), parseInt(x.spending_per_view)], pointPlacement: 'on'})
        });

        let externalApi = [];
        let DataGraph2 = [];
        const url = "https://sos2021-01-life-stats.herokuapp.com/api/v2/life-stats/";

        const res = await fetch(url);
        if (res.ok){
            console.log("Cargada API01 correctamente");
            const json = await res.json();
            externalApi = json;
        }else{
            console.log("No se ha cargado correctamente la API1");
        }

        externalApi.forEach((x) => {
            DataGraph2.push({name: x.country + " " + x.year, data: [parseInt(x.quality_life_index), parseInt(x.purchasing_power_index), parseInt(x.safety_index)], pointPlacement: 'on'})
        });


            

        am4core.ready(function(){

            
            var chart = am4core.create("chartdiv", am4charts.XYChart);

            //var chart2 = am4core.create("chartdiv", am4charts.XYChart);

            chart.marginRight = 400;
            chart.data = externalApi;
            //chart2.data = CBData;

            // Create axes
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "country";
            categoryAxis.title.text = "Países";
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.renderer.minGridDistance = 20;


            var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.title.text = "Índice de seguridad";

            // Create series
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueY = "quality_life_index";
            series.dataFields.categoryX = "country";
            series.name = "calidad de vida";
            series.tooltipText = "{name}: [bold]{valueY}[/]";
            series.stacked = true;

            var series2 = chart.series.push(new am4charts.ColumnSeries());
            series2.dataFields.valueY = "purchasing_power_index";
            series2.dataFields.categoryX = "country";
            series2.name = "poder adquisitivo";
            series2.tooltipText = "{name}: [bold]{valueY}[/]";
            series2.stacked = true;

            var series3 = chart.series.push(new am4charts.ColumnSeries());
            series3.dataFields.valueY = "sales";
            series3.dataFields.categoryX = "country";
            series3.name = "Sales";
            series3.tooltipText = "{name}: [bold]{valueY}[/]";
            series3.stacked = true;

            // Add cursor
            chart.cursor = new am4charts.XYCursor();


        });
        

        

    }
    loadGraph();

</script>

<svelte:head>

</svelte:head>

<style>
    #chartdiv {
      width: 220%;
      height: 700px;
    }
    
</style>


<main>

    <div id="chartdiv"></div>
    <Button type="button" color = "danger" class="btn btn-secondary" onclick="window.location.href='#/culturaBASE/integrations'" style="margin-left: 35%; 
     margin-bottom: 5%; align-self: center; width: 25%; "> Patrás</Button>
    
</main>