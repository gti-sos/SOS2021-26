<script type="text/javascript">
    async function loadGraph() {
        let HostelryData = [];

        //let DataGraph = [];   Se usa diferentes contenedores en vez de uno global
        let comunidades = ["x"];
        let turistas_2020 = ["Turistas durante 2020"];
        let turistas_2019 = ["Turistas durante 2019"];        
        let turistas_2018 = ["Turistas durante 2018"];


        const resData = await fetch("/api/v2/hostelries");
        HostelryData = await resData.json(); 

        //Recorrer los recursos de hostelries
        HostelryData.forEach((x) => {
            //DataGraph.push({name: x.district + " " + x.year, data: [parseInt(x.employee_staff),  parseInt(x.traveler_numer),parseInt(x.establishment_open)], pointPlacement: 'on'});

            if(x.year == 2020){
                comunidades.push(x.district);           //Todos los años tienen las mismas comunidades autonomas
                turistas_2020.push(x.traveler_numer);
            }

            if(x.year == 2019){
                turistas_2019.push(x.traveler_numer);
            }

            if(x.year == 2018){
                turistas_2018.push(x.traveler_numer);
            }

        });
        //console.log(turistas_2019);
        //console.log(turistas_2020);

        //REFERENCIA:
        //  https://naver.github.io/billboard.js/demo/#Chart.RadarChart
        //DESCARGA -> IMPORTAR 
        //  https://naver.github.io/billboard.js/release/latest/doc/

        var chart = bb.generate({
            data: {
                //Data format-> https://naver.github.io/billboard.js/release/latest/doc/Options.html#.data%25E2%2580%25A4xFormat
                x: "x",
                columns: [
                comunidades,
                turistas_2020,
                turistas_2019,
                turistas_2018	
                ],
                type: "radar",
                labels: false       //desactiva los numeros en cada punto de la gráfica
            },
            radar: {
                axis: {
                max: 21000000
                },
                level: {
                depth: 3        //Profundidad de la gráfica -> núm de serctores
                },
                direction: {
                clockwise: true  //Set the direction to be drawn. -> en funcion de las agujas del reloj
                }
            },
            bindto: "#radarChart"
        });
    }
	
	loadGraph();

</script>

<svelte:head>

</svelte:head>

<main>
    <h3 style="text-align:center;">Estadística de turistas en España</h3>
    <p style="text-align:center;">
        En la gráfica podemos observar el número de turistas en España según las Comunidades Autonomas.
    </p>
    <div id="radarChart"></div>
    
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#/hostelries'" style="width: 100%; margin-bottom: 5%;"> Volver</button><br>
</main>