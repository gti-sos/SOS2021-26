<script>
    import {
            pop
	} from "svelte-spa-router";

    //Referencia: https://github.com/gti-sos/SOS1920-05/blob/master/src/frontend/APIS_Diego/GrupoExt2.svelte
    
    import Button from "sveltestrap/src/Button.svelte";
	async function loadGraph() {
		
		let externalData = []
		const url = "https://api.covid19api.com/country/spain";
		//const CBData = await fetch("/api/v2/culturaBASE");
		
        const resExternalData = await fetch(url);
        if (resExternalData.ok){
            console.log("Datos covid recibidos");
            externalData = await resExternalData.json();
        }else{
            console.log("Error al cargar la página del covid");
        }

        let externalDataGraph = externalData.filter((c) => {
			return (c.Deaths >=1000 && c.Deaths <=10000);
			}).map((x) => {
				let res = {name: x.Date, value: x.Deaths};
			return res;
		});

        console.log(externalDataGraph);

        am4core.ready(function() {

            var chart = am4core.create("chartdiv", am4charts.TreeMap);
            chart.data = externalDataGraph;

            /* Set color step */
            chart.colors.step = 2;

            /* Define data fields */
            chart.dataFields.value = "value";
            chart.dataFields.name = "name";
            
            // Themes begin
            /*am4core.useTheme(am4themes_dataviz);
            am4core.useTheme(am4themes_animated);
            // Themes end
            // Create chart instance
            var chart = am4core.create("chartdiv", am4charts.PieChart);
            console.log(chart);
            // Add data
            chart.data = externalDataGraph;
            // Set inner radius
            chart.innerRadius = am4core.percent(50);
            //chart.innerHeight = am4core.percent(50);
            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "name";
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
            pieSeries.slices.template.states.getKey("hover").properties.scale = 1.1;*/
        });

        /*let datosUsados = []
        externalData.forEach((c) => {
            if(c.Deaths>1000){
                    valor ={
                        name: [c.Date],
                        data: [c.Deaths]
                    }
                    datosUsados.push(valor);
            }
        });*/

        
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
    
    <h2 style="text-align: center;"> Representacion del número de las fechas de muertes por covid con más de 1000 fallecidos</h2>
	<div id="chartdiv"></div>
	<Button type="button" color = "danger" class="btn btn-secondary" onclick="window.location.href='#/integrations/culturaBASE'" style="margin-left: 35%; 
  margin-bottom: 5%; align-self: center; width: 25%; "> Patrás</Button>

</main>