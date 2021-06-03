<script type="text/javascript">

    
    async function loadGraph() {

        let HostelryData = [];
        const resData = await fetch("/api/v2/hostelries");
        HostelryData = await resData.json(); 

        let API07Data = [];
        const resData07 = await fetch('https://sos2021-07.herokuapp.com/api/v1/integration/rentals');
        API07Data = await resData07.json();

        let valores = [];
        let valor = {};
        let campos = ["Establecimientos abiertos","Turistas(miles)","Renta"];

        API07Data.forEach((x) => {
            HostelryData.forEach((h) => {
                if(h.year == 2018){
                    if(h.district == "Andalucia" && x.autonomous_community== "andalucia"){
                        valor = {
                            name:   h.district,
                            data:   [h.establishment_open,(h.traveler_numer)/1000,x.rent]
                        }
                        valores.push(valor);
                    }

                    if(h.district == "Madrid" && x.autonomous_community== "comunidad_de_madrid"){
                        valor = {
                            name:   h.district,
                            data:   [h.establishment_open,(h.traveler_numer)/1000,x.rent]
                        }
                        valores.push(valor);
                    }

                    if(h.district == "Cataluña" && x.autonomous_community== "cataluna"){
                        valor = {
                            name:   h.district,
                            data:   [h.establishment_open,(h.traveler_numer)/1000,x.rent]
                        }
                        valores.push(valor);
                    }
                }
            });
        });
        
        //console.log(valores);
        
        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: 'Comparativa entre la hostelría y la renta de alquileres de algunas comunidades autónomas de España.'
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
        
    }

</script>

<svelte:head>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
	<h3 style="text-align: center;"> Integración con API 07 SOS2021</h3>

	<figure class="highcharts-figure">
		<div id="container"></div>
	</figure>

</main>
