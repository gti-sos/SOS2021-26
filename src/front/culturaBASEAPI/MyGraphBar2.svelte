<script type="text/javascript">

    async function loadGraph2() {
        let CBData = [];
        let DataGraph = [];
        const resData = await fetch("/api/v2/culturaBASE");
        CBData = await resData.json();
        CBData.forEach((x) => {
            DataGraph.push({name: x.district + " " + x.year, data: [parseInt(x.fundraising), parseInt(x.spectator), parseInt(x.spending_per_view)], pointPlacement: 'on'})
        });

        Highcharts.chart('container', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Cultura Base'
            },
            
            xAxis: {
                categories: ['Beneficio', 'Espectadores', 'Gasto por espectador']
            },
            yAxis: {
                title: {
                    text: 'Escalado por millones, exceptuando gasto por espectador'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            series: DataGraph
        });

    }
  
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph2}" ></script>

    <script src="https://code.highcharts.com/highcharts.js" on:load={loadGraph2}></script>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph2}></script>
    <script src="https://code.highcharts.com/modules/exporting.js" on:load={loadGraph2}></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph2}></script>

</svelte:head>

<style>
    #container {
    height: 800px;
    }
</style>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
           Este gráfico representa la evolución del sector cinematográfico desde 2018 hasta 2019
           dividido por comunidad autónoma
        </p>
    </figure>
    
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#/culturaBASE'" style="width: 25%; margin-bottom: 5%;margin-left: 35%;"> Volver a database</button><br>
</main>