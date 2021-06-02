<script>
    import Button from "sveltestrap/src/Button.svelte";

    //Ejemplo de uso: https://codepen.io/team/amcharts/embed/GdQZRV?default-tab=result&editable=true&theme-id=dark

    async function loadGraph2() {

            /*const url = "https://sos2021-07.herokuapp.com/api/integration/unemployment";

            let externalApi = []
            let MyData = []

            const res = await fetch(url);
            if (res.ok){
                console.log("Cargada API07 correctamente");
                const json = await res.json();
                externalApi = json;
            }else{
                console.log("No se ha cargado correctamente la API1");
            }

            const CBData = await fetch("/api/v2/culturaBASE");
            MyData = await CBData.json();
            let valores = [];
            let valor = {};

            MyData.forEach((c)=>{
                externalApi.forEach((p)=>{
                    if(c.district.toLowerCase()== p.autonomous_community){
                        valor ={
                            name: [c.district + " " + p.province],
                            data: [c.fundraising,   p.occupation_variation/500]
                        }
                        valores.push(valor);
                    }
                })
            })*/

            let CBData = [];
            let DataGraph = [];
            const resData = await fetch("/api/v2/culturaBASE");
            CBData = await resData.json();
            CBData.forEach((x) => {
                    DataGraph.push({name: x.district + " " + x.year, data: [parseInt(x.fundraising), parseInt(x.spectator), parseInt(x.spending_per_view)], pointPlacement: 'on'})
            });

            let externalApi = [];
            let DataGraph2 = [];
            const url = "https://sos2021-07.herokuapp.com/api/integration/unemployment";

            const res = await fetch(url);
            if (res.ok){
                console.log("Cargada API07 correctamente");
                const json = await res.json();
                externalApi = json;
            }else{
                console.log("No se ha cargado correctamente la API1");
            }

            externalApi.forEach((x) => {
                DataGraph2.push({name: x.province + " " + x.year, data: [parseInt(x.youth_unemployment_rate), parseInt(x.occupation_variation), parseInt(x.unemployment_rate)], pointPlacement: 'on'})
            });

            let valores = [];
            let valor = {};

            CBData.forEach((c)=>{
                externalApi.forEach((p)=>{
                        if(c.district.toLowerCase()== p.autonomous_community){
                            valor ={
                                name: [c.district + " " + p.province],
                                data: [c.fundraising, p.youth_unemployment_rate, p.unemployment_rate,   p.occupation_variation/500]
                            }
                            valores.push(valor);
                        }
                    })
            })
            
            console.log(valores);
                

            am4core.ready(function(){
                var chart = am4core.create("chartdiv", am4charts.RadarChart);
                chart.marginRight = 400;
                chart.data = externalApi;


                /* Create axes */
                var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "province";

                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.axisFills.template.fill = chart.colors.getIndex(2);
                valueAxis.renderer.axisFills.template.fillOpacity = 0.05;

                /* Create and configure series */
                var series = chart.series.push(new am4charts.RadarSeries());
                series.dataFields.valueY = "unemployment_rate";
                series.dataFields.categoryX = "province";
                series.name = "Índice de Desempleo";
                series.strokeWidth = 3;

                var series2 = chart.series.push(new am4charts.RadarSeries());
                series2.dataFields.valueY = "youth_unemployment_rate";
                series2.dataFields.categoryX = "province";
                series2.name = "Índice de desempleo joven";
                series2.strokeWidth = 3;

                //Variante ocupacional
                
                var series3 = chart.series.push(new am4charts.RadarSeries());
                series3.dataFields.valueY = "occupation_variation";
                series3.dataFields.categoryX = "province";
                series3.name = "Variante ocupacional";
                series3.strokeWidth = 3;

                chart.legend = new am4charts.Legend();

                // Create axes
                /*var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "province";
                categoryAxis.title.text = "Provincias";
                categoryAxis.renderer.grid.template.location = 0;
                categoryAxis.renderer.minGridDistance = 20;


                var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.title.text = "Índice de desempleo";

                // Create series
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = "unemployment_rate";
                series.dataFields.categoryX = "province";
                series.name = "desempleo";
                series.tooltipText = "{name}: [bold]{valueY}[/]";
                series.stacked = true;

                var series2 = chart.series.push(new am4charts.ColumnSeries());
                series2.dataFields.valueY = "youth_unemployment_rate";
                series2.dataFields.categoryX = "province";
                series2.name = "desempleo joven";
                series2.tooltipText = "{name}: [bold]{valueY}[/]";
                series2.stacked = true;

                var series3 = chart.series.push(new am4charts.ColumnSeries());
                series3.dataFields.valueY = "sales";
                series3.dataFields.categoryX = "country";
                series3.name = "Sales";
                series3.tooltipText = "{name}: [bold]{valueY}[/]";
                series3.stacked = true;

                // Add cursor
                chart.cursor = new am4charts.XYCursor();*/


            });




    }
    loadGraph2();



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
    <Button type="button" color = "danger" class="btn btn-secondary" onclick="window.location.href='#/integrations/culturaBASE'" style="margin-left: 35%; 
  margin-bottom: 5%; align-self: center; width: 25%; "> Patrás</Button>

    
</main>