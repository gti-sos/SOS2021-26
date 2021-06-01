<script>
    import {
            pop
	} from "svelte-spa-router";

    //Referencia: https://github.com/gti-sos/SOS1920-05/blob/master/src/frontend/APIS_Diego/GrupoExt2.svelte
    
    import Button from "sveltestrap/src/Button.svelte";
	async function loadGraph() {
		let datosConjuntos = [];   
		let cb = [];
		let cerve = [];
		
		const url = "https://api.openbrewerydb.org/breweries";
		const CBData = await fetch("/api/v2/culturaBASE");
		cb = await CBData.json()
		
		const cerveceria = await fetch(url);
		cerve = await cerveceria.json();
		
		let datos_cb = cb.map((x) => {
            //Recordamos que los datos por espectadores y beneficio eran contados por millones
				let res = {name: x.district + " " + x.year,value: x["spectator"]*1000000};
				return res;
		});
		let cervecerias = cerve.map((x) => {
				let res = {name: x.city,value: parseInt(x.phone)};
				console.log(res);
				return res;
		});
			
		datosConjuntos = [{name: "Beneficio en cine",data: datos_cb},{name: "Numero cerveceria EEUU",data: cervecerias}];
		Highcharts.chart('container', {
				chart: {
					type: 'packedbubble',
					height: '43%'
				},
                /*title: {
                    text: "Comparativa con burbujiñas"
                },*/
				tooltip: {
					useHTML: true,
					pointFormat: '<b>{point.name}:</b> {point.value}'
				},
				plotOptions: {
					packedbubble: {
						minSize: '10%',
						maxSize: '100%',
						zMin: 0,
						zMax: 1000,
						layoutAlgorithm: {
							gravitationalConstant: 0.05,
							splitSeries: true,
							seriesInteraction: false,
							dragBetweenSeries: false,
							parentNodeLimit: true
						},
						dataLabels: {
							enabled: true,
							format: '{point.name}',
							filter: {
								property: 'y',
								operator: '>',
								value: 250
							},
							style: {
								color: 'black',
								textOutline: 'none',
								fontWeight: 'normal'
							}
						}
					}
				},
				series: datosConjuntos
		});
	}
	
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph}></script>>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph}></script>>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph}></script>>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
    
</svelte:head>

<main>
    <h2 style="text-align: center;"> Representacion de los beneficios en el cine y el numero de cervecerias en EEUU</h2>
	<figure class="highcharts-figure">
		<div id="container"></div>
	</figure>
	
	<Button type="button" color = "danger" class="btn btn-secondary" onclick="window.location.href='#/culturaBASE/integrations'" style="margin-left: 35%; 
  margin-bottom: 5%; align-self: center; width: 25%; "> Patrás</Button>

</main>