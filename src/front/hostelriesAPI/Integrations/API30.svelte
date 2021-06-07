<script type="text/javascript">

    let pantalla = "";

    async function loadGraph() {

        let HostelryData = [];
        const resData = await fetch("/api/v2/hostelries");
        HostelryData = await resData.json(); 

        
        let API30Data = [];
        let url_API30 = '/api/v3/smokers-stats';
        
        //const resData30 = await fetch('https://sos2021-30.herokuapp.com/api/v2/smokers-stats');
        //const resData30 = await fetch('https://sos2021-30.herokuapp.com/proxySmoker');

        const resData30 = await fetch('/smokers-stats'+url_API30);
        API30Data = await resData30.json();
  
        let valores = [];
        let valor = {};
        //let campos = ["Establecimientos abiertos","Turistas","Fumadores diarios"];
        let categorias = [];
 
        API30Data.forEach((x) => {
            HostelryData.forEach((h) => {
                if(h.year == 2017){
                    if(h.district == "Andalucia" && x.province == "Andalucía"){
                        valor = {
                            name:   h.district,
                            data:   [h.traveler_numer/1000000,x.dailySmoker/1000000]
                        }
                        categorias.push(x.province);
                        valores.push(valor);

                    }else if(h.district == "Madrid" && x.province == "Comunidad de Madrid"){
                        valor = {
                            name:   h.district,
                            data:   [h.traveler_numer/1000000,x.dailySmoker/1000000]
                        }
                        categorias.push(x.province);
                        valores.push(valor);

                    }else if(h.district == "Aragon" && x.province == "Aragón"){
                        valor = {
                            name:   h.district,
                            data:   [h.traveler_numer/1000000,x.dailySmoker/1000000]
                        }
                        categorias.push(x.province);
                        valores.push(valor);

                    }else if(h.district == x.province){
                        valor = {
                            name:   h.district,
                            data:   [h.traveler_numer/1000000,x.dailySmoker/1000000]
                        }
                        categorias.push(x.province);
                        valores.push(valor);
                    }
                }
            });
        });

        console.log(valores);
        var chart = bb.generate({
            data: {
                
                columns: [
                    ["Andalucía", valores[0].data[0],valores[0].data[1]],
                    ["Cataluña", valores[1].data[0],valores[1].data[1]],
                    ["Madrid", valores[2].data[0],valores[2].data[1]]
                ],
                types: {
                Andalucía: "area", // for ESM specify as: area()
                Cataluña: "area", // for ESM specify as: areaSpline()
                Madrid: "area"
                }
            },
            axis: {
                x: {
                    label: {
                    text: "0: Número de turistas    |---------------------------------------------------------|   1: Número de fumadores",
                    position: "inner-center"
                    }
                },
                y: {
                    label: {
                    text: "Millones",
                    position: "outer-middle"
                    }
                }
            },
            bindto: "#areaChart"
        });

        //pantalla = JSON.stringify(valores,null,2);
        //console.log(valores[0].data);
    }

    loadGraph();
</script>

<svelte:head>

</svelte:head>

<main>
    <h3 style="text-align:center;">Integración con API:30-Smokers SOS2021</h3>
    <p style="text-align:center;">
        En la gráfica podemos observar el número de turistas y de fumadores en algunas Comunidades Autonomas de España.
    </p>
    <div id="areaChart"></div>
    <p style="text-align: center;">
        En caso de que la gráfica no se cargue ir al enlace : <a href="https://sos2021-30.herokuapp.com/api/v3/smokers-stats/loadInitialData">API:30</a>
   </p>
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#/hostelries/integrations'" style="width: 100%; margin-bottom: 5%;"> Volver</button><br>
</main>