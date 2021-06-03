<script>

    // API EXTERNA 02: Predecir nacionalidad respecto el nombre
    //  https://nationalize.io/

    async function loadAPI() {
        const res = await fetch("https://api.nationalize.io/?name=Mateo");

        if(res.ok){
            let resData = await res.json();
            let APIExt02Data = [];

            for(let i = 0; i < resData.country.length; i++){

                //https://traduciresdescubrir.wordpress.com/2012/07/26/paises-y-abreviaturas/
                if(resData.country[i].country_id == "HR"){
                    APIExt02Data.push({name: "Croacia", y: resData.country[i].probability});
                }
                else if(resData.country[i].country_id == "CO"){
                    APIExt02Data.push({name: "Colombia", y: resData.country[i].probability});
                }
                else if(resData.country[i].country_id == "AL"){
                    APIExt02Data.push({name: "Albania", y: resData.country[i].probability});
                }else{
                    APIExt02Data.push({name: resData.country[i].country_id, y: resData.country[i].probability});
                }
            }

            //https://www.highcharts.com/demo/pie-basic

            Highcharts.chart('apiEXT02', {
                chart: {
                    backgroundColor: '#E0E0E0',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Probabilidad de nacionalidad según el nombre: Mateo.'
                },
                //The plotOptions is a wrapper object for config objects for each series type.
                // The config objects for each series can also be overridden for each series item as given in the series array.
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer'
                    }
                },
                series: [{
                    colorByPoint: true,         //this option determines whether the chart should receive one color per series or one color per point.
                    data: APIExt02Data
                }]
            });
        }
        else{
            console.log("Error fetching data.");
        }
    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadAPI}"></script>
</svelte:head>

<main>
    <div id="apiEXT02"></div>
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#/hostelries/integrations'" style="width: 100%; margin-bottom: 5%;"> Volver</button><br>
</main>