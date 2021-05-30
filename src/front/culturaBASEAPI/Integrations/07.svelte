<script>
    /*import  {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";*/

    const url = "https://sos2021-07.herokuapp.com/api/integration/unemployment";

    let externalApi = []
    let MyData = []

    async function loadGraph(){
        const res = await fetch(url);
        if (res.ok){
            console.log("Cargada API07 correctamente");
            /*Cargamos los datos y los guardamos en la variable anteriormente definida convertida en json para manipularla luego*/
            const json = await res.json();
            externalApi = json;
        }else{
            console.log("No se ha cargado correctamente la API1");
        }

        const CBData = await fetch("/api/v2/culturaBASE");
        MyData = await CBData.json();
        let campos = ["Beneficio", "Espectador", "Gasto por espectador", "Desempleo joven", "Desempleo general", "Variante ocupacional"];
        let valores = [];
        let valor = {};

        MyData.forEach((c)=>{
            valor = {
                name: c.district,
                data: [c.fundraising, c.spectator, c.spending_per_view, 0, 0, 0]
            }
            console.log(valor);
            
            valores.push(valor);
        });

        externalApi.forEach( (p)=>{
            valor = {
                name: p.autonomous_community,
                data: [0,0,0,p.youth_unemployment_rate, p.unemployment_rate, p.occupation_variation/500]
            }
            valores.push(valor);
        });

        console.log(MyData);
        

       

        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Integración API 07'
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


    };



</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <!--<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}" ></script>-->
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}" ></script>

</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>

    </figure>
    
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#'" style="width: 100%; margin-bottom: 5%;"> Volver a database</button><br>
</main>