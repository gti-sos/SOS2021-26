<script type="text/javascript">
import { children } from "svelte/internal";



        /*async function loadGraph3() {
            let CBData = [];
            let DataGraph = [];
            const resData = await fetch("/api/v2/culturaBASE");
            CBData = await resData.json();
            CBData.forEach((x) => {
                DataGraph.push({name: x.district + " " + x.year, data: [parseInt(x.fundraising), parseInt(x.spectator), parseInt(x.spending_per_view)], pointPlacement: 'on'})
            });

            Highcharts.chart('container', {
                chart: {
                    type: 'line'
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

        }*/


    async function loadGraph2() {
        let CBData = [];
        let HData = [];
        let DataGraph = [];
        const resData = await fetch("/api/v2/culturaBASE");
        const resData2 = await fetch("/api/v2/hostelries");
        CBData = await resData.json();
        HData = await resData2.json();
        CBData.forEach((x) => {
            HData.forEach((y) =>{

                if(x.district == y.district && x.year == y.year){
                    DataGraph.push({name: x.district, data: [
                        {name: "CulturaBase", data: [
                            {name: "Beneficio", value: parseInt(x.fundraising)},
                            {name: "Espectadores", value: parseInt(x.spectator)},
                            {name: "Gasto por espectador", value: parseInt(x.spending_per_view)}
                        ]}, 

                        {name: "Hostelries", data: [
                            {name: "Empleados", value: parseInt(y.employee_staff)},
                            {name: "Establecimientos", value: parseInt(y.establishment_open)},
                            {name: "Viajeros", value: parseInt(y.traveler_numer)}
                        ]}
                        
                    ]});
                }
                /*DataGraph.push({name: x.district + " " + x.year, data: [parseInt(x.fundraising), parseInt(x.spectator), parseInt(x.spending_per_view),
                parseInt(y.employee_staff), parseInt(y.establishment_open), parseInt(y.traveler_numer)], pointPlacement: 'on'})*/
            })
            
        });

        /*CBData.forEach((x) => {
            DataGraph.push({name: x.district + " " + x.year, data: [parseInt(x.fundraising), parseInt(x.spectator), parseInt(x.spending_per_view)], pointPlacement: 'on'})
        });*/

        console.log(JSON.stringify(DataGraph));

        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Cultura Base y Hostelries'
            },
            
            xAxis: {
                categories: ['Beneficio', 'Espectadores', 'Gasto por espectador', 'Empleados', 'Establecimientos', 'Viajeros']
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
  

  /*async function loadGraph(){  

        Highcharts.chart('container', {

            title: {
                text: 'Estadísticas del sector cinematográfico por comunidad autónoma de 2018 a 2019'
            },

            subtitle: {
                text: 'Fuente: culturaBASE & INE' 
            },

            yAxis: {
                title: {
                    text: 'Escalado por millones, exceptuando gasto por espectador'
                }
            },

            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 2010 to 2017'
                },
                categories: ['Andalucia 2018','Andalucia 2019',  'Aragon 2018', 'Aragon 2019', 'Canarias 2018', 'Canarias 2019', 'Ceuta y Melilla 2018','Canarias 2019', 'Galicia 2018', 'Galicia 2019', 
                'Madrid 2018', 'Madrid 2019', 'Navarra 2018', 'Navarra 2019']
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            series: [{
                name: 'Recaudación total',
                data: [88.3, 82, 15.1, 14.5, 26.1, 25, 0.6, 0.7, 24.1, 22.9, 134.3, 127.8,8.5, 8.5]
            }, {
                name: 'Espectadores',
                data: [16.4, 15.1, 2.8,2.8,4.7,4.5,0.1,0.1, 4.2, 3.9, 20.7, 19.3, 1.6, 1.6]
            }, {
                name: 'Gasto por espectador',
                data: [5.4,5.4,5.3,5.3,5.6,5.6,5.1,5.1, 5.7, 5.9, 6.5, 6.6, 5.4, 5.5]
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 250
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    }*/
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph2}" ></script>

</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
           Este gráfico representa la evolución del sector cinematográfico  y del sector hostelero
           dividido por comunidad autónoma
        </p>
    </figure>
    
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#/info'" style="width: 25%; margin-bottom: 5%;"> Volver a database</button><br>
</main>