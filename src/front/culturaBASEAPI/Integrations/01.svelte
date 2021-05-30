<script>
    /*import  {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";*/

    const url = "https://sos2021-01-life-stats.herokuapp.com/api/v2/life-stats/";

    let externalApi = []
    let MyData = []

    async function loadGraph(){
        const res = await fetch(url);
        if (res.ok){
            console.log("Cargada API01 correctamente");
            /*Cargamos los datos y los guardamos en la variable anteriormente definida convertida en json para manipularla luego*/
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

        /*MyData.forEach((c)=>{
            externalApi.forEach((l)=>{
                if(c.year== l.date){
                    valor ={
                        name: [c.year],
                        data: [c.fundraising, c.spectator, c.spending_per_view,
                        l.quality_life_index, l.purchasing_power_index, l.safety_index]
                    }
                    valores.push(valor);
                }
            })
        })*/

        /*for(var i = 2017; i<=2020; i++){
            MyData.forEach((c)=>{
                if(c.year==i){
                    valor = {
                        name: [c.year],
                        data: [c.fundraising, c.spectator, c.spending_per_view,0,0,0]
                    }
                }
                
                
                valores.push(valor);
            })

            externalApi.forEach( (l)=>{
            if(l.date == i){
                valor = {
                    name: [l.date],
                    data: [0,0,0,l.quality_life_index, l.purchasing_power_index, l.safety_index]
                }
            }
            

            valores.push(valor);
        })
        }*/
       

        

        Highcharts.chart('container', {
            chart: {
                type: 'column'
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
    
  <button type="button" class="btn btn-secondary" onclick="window.location.href='#/culturaBASE/integrations'" style="width: 100%; margin-bottom: 5%;"> Patrás</button><br>
</main>

<style>
    #container {
                height: 600px; 
    }
        
</style>