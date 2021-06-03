<script>
    /*import  {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";*/
    import Button from "sveltestrap/src/Button.svelte";

    const url = "https://sos2021-01-life-stats.herokuapp.com/api/v2/life-stats/";

    let externalApi = []
    let MyData = []

    /*async function loadGraph(){
        const res = await fetch(url);
        if (res.ok){
            console.log("Cargada API01 correctamente");
    
            const json = await res.json();
            externalApi = json;
        }else{
            console.log("No se ha cargado correctamente la API01");
        }

        const CBData = await fetch("/api/v2/culturaBASE");
        MyData = await CBData.json();
        let campos = ["Beneficio", "Espectador", "Gasto por espectador", "Calidad de vida", "Poder económico", "Seguridad personal"];
        let valores = [];
        let valor = {};


        MyData.forEach((c)=>{
                if(c.year>2017 && c.year<2020){
                    valor = {
                        name: [c.year, c.district],
                        data: [c.fundraising, c.spectator, c.spending_per_view,0,0,0]
                    }
                }
            valores.push(valor);
        })
        externalApi.forEach( (l)=>{
            if(l.date <2020 && l.date>2017){
                valor = {
                    name: [l.date, l.country],
                    data: [0,0,0,l.quality_life_index, l.purchasing_power_index, l.safety_index]
                }      
            }
            valores.push(valor);
        })        

        Highcharts.chart('container', {
            chart: {
                type: 'columnpyramid'
            },
            title: {
                text: 'Integración API 01'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: campos,
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value ;
                    }
                }
            },
            tooltip: {
                split: true,
                valueSuffix: ''
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: valores
        });


    };*/

    async function loadGraph2() {
		let datosConjuntos = [];   
		let cb = [];
		let life = [];
		
		const url = "https://sos2021-01-life-stats.herokuapp.com/api/v2/life-stats/";
		const CBData = await fetch("/api/v2/culturaBASE");
		cb = await CBData.json()
		
		const lifestats = await fetch(url);
		life = await lifestats.json();
		
		let datos_cb = cb.map((x) => {
            //Recordamos que los datos por espectadores y beneficio eran contados por millones
				let res = {name: x.district + " " + x.year,value: x["fundraising"]*100000};
				return res;
		});
		let lifes = life.map((l) => {
				let res = {name: l.country, value: l.purchasing_power_index};
				console.log(res);
				return res;
		});
			
		datosConjuntos = [{name: "Beneficio en cine",data: datos_cb},{name: "Índice de seguridad",data: lifes}];
		Highcharts.chart('container', {
				chart: {
					type: 'packedbubble',
					height: '40%'
				},
                title: {
                    text: 'Grafica que enfrenta el ratio de seguridad en países contra el beneficio de la industria cinematografica dividido en comunidades autonomas'
                },
				tooltip: {
					useHTML: true,
					pointFormat: '<b>{point.name}:</b> {point.value}'
				},
				plotOptions: {
					packedbubble: {
						minSize: '30%',
						maxSize: '100%',
						zMin: 0,
						zMax: 500,
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
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph2}" ></script>

    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph2}></script>>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph2}></script>>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph2}></script>>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph2}></script>

</svelte:head>

<main>
    <figure class="highcharts-figure">
    {#await  externalApi}
    Loading renewable sources...
    {:then  apiExterna}
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p>   </p>
        <p class="highcharts-description">
           
        </p>
        

    </figure>	    

   
    {/await}      	

  </figure>
    
  <Button type="button" color = "danger" class="btn btn-secondary" onclick="window.location.href='#/integrations/culturaBASE'" style="margin-left: 35%; 
  margin-bottom: 5%; align-self: center; width: 25%; "> Vuelta al menú de integraciones de CB</Button>
</main>

<style>
    #container {
        height: 600px; 
    }

    /*#Button{
        margin-left: 25%; 
        margin-bottom: 5%;
        align-self: center;
    }*/
        
</style>