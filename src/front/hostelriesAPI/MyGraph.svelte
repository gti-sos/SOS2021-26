<script type="text/javascript">
    import {
        onMount
    } from "svelte";
 
    let data = [];
    async function getData(){
        console.log("Fetching data...");
        const res = await fetch("/data");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            data = json;
            console.log(`We have received ${data.length} data points.`);
        }else{
            console.log("Error!");
        }
    }   
    
    onMount(getData);

    async function loadGraph() {
        let HostelryData = [];
        let DataGraph = [];
        const resData = await fetch("/api/v2/hostelries");
        HostelryData = await resData.json(); 

        //Recorrer los recursos de hostelries
        HostelryData.forEach((x) => {
            DataGraph.push({name: x.district + " " + x.year, data: [parseInt(x.employee_staff),  parseInt(x.traveler_numer),parseInt(x.establishment_open)], pointPlacement: 'on'})
        });

        Highcharts.chart('container', {
		chart: {
			//type: 'areaspline'
            type: 'line'
		},
		title: {
			text: 'Hostelería España'
		},

        subtitle: {
            text: 'Representación de la evolución del sector de la hostelería de España desde 2018 hasta 2020 en función de las comunidades autónoma.'
        },
		
		xAxis: {
			categories: [
				'Personal Contratado',
				'Turistas',
				'Establecimientos Abiertos'
			],
			plotBands: [{ // visualize the weekend
				from: 4.5,
				to: 6.5,
				color: 'rgba(68, 170, 213, .2)'
			}]
		},
		yAxis: {
			title: {
				text: null
			}
		},
		tooltip: {
			shared: true,
			valueSuffix: ' units'
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5
			}
		},
		series: DataGraph
	});
    }
  
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}" ></script>

</svelte:head>

<main>
    
    <figure class="highcharts-figure">
        <div id="container"></div>
        <!--
        <p class="highcharts-description">
           Este gráfico representa la evolución del sector de la hostelería de España desde 2018 hasta 2020
           en función de las comunidades autónoma.
        </p>
        -->
    </figure>
    
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#/hostelries'" style="width: 100%; margin-bottom: 5%;"> Volver</button><br>
</main>