<script>
    import {
            pop
	} from "svelte-spa-router";

    //Referencia: https://github.com/gti-sos/SOS1920-05/blob/master/src/frontend/APIS_Diego/GrupoExt2.svelte
    
    import Button from "sveltestrap/src/Button.svelte";
	async function loadGraph() {
		 
		let externalApi = [];
            let DataGraph2 = [];
            const url = "https://api.openbrewerydb.org/breweries";

            const res = await fetch(url);
            if (res.ok){
                console.log("Cargada cevecerias correctamente");
                const json = await res.json();
                externalApi = json;
            }else{
                console.log("No se ha cargado correctamente la API1");
            }

            externalApi.forEach((x) => {
                DataGraph2.push({name: x.city,value: parseInt(x.phone), pointPlacement: 'on'})
            });

        am4core.ready(function() {

            var chart = am4core.create("chartdiv", am4charts.TreeMap);
            chart.data = DataGraph2;

            chart.colors.step = 2;

            
            chart.dataFields.value = "value";
            chart.dataFields.name = "name";
            
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
    
    <h2 style="text-align: center;"> Número de cervecerías en EEUU</h2>
	<div id="chartdiv"></div>

	<Button type="button" color = "danger" class="btn btn-secondary" onclick="window.location.href='#/integrations/culturaBASE'" style="margin-left: 35%; 
  margin-bottom: 5%; align-self: center; width: 25%; "> Vuelta al menú de integraciones de CB</Button>

</main>