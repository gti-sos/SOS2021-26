<script>
    /*import  {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";*/

    
    import Button from "sveltestrap/src/Button.svelte";

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

        /*MyData.forEach((c)=>{
            externalApi.forEach((p)=>{
                if(c.district.toLowerCase()== p.autonomous_community){
                    valor ={
                        name: [c.district, c.year],
                        data: [c.fundraising, c.spectator, c.spending_per_view,
                        p.youth_unemployment_rate, p.unemployment_rate, p.occupation_variation/500]
                    }
                    valores.push(valor);
                }
            })
        })*/

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
        })


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
                categories: ['Beneficio en las salas por comunidad', 'Variante ocupacional'],
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
    
    <Button type="button" color = "danger" class="btn btn-secondary" onclick="window.location.href='#/culturaBASE/integrations'" style="margin-left: 35%; 
  margin-bottom: 5%; align-self: center; width: 25%; "> Patrás</Button>
</main>