<script>


    // API EXTERNA 03: Prediccion edad según nombre
    // https://agify.io/
    // https://api.agify.io/?name=mateo

    async function loadAPI() {

        const resData01 = await fetch("https://api.agify.io/?name=mateo");
        const resData02 = await fetch("https://api.agify.io/?name=jose");
        const resData03 = await fetch("https://api.agify.io/?name=dario");

        if(resData01.ok && resData02.ok && resData02.ok){
            let APIExt03Data = [];
            let json = await resData01.json();

            APIExt03Data.push({name: json.name, data: [json.age]});

            json = await resData02.json();

            APIExt03Data.push({name: json.name, data: [json.age]});

            json = await resData03.json();

            APIExt03Data.push({name: json.name, data: [json.age]});


            console.log(APIExt03Data);
            console.log(APIExt03Data[0].name, "-", APIExt03Data[0].data[0]);
            console.log(APIExt03Data[1].name, "-", APIExt03Data[1].data[0]);
            var chart = bb.generate({
                data: {
                    columns:   
                        [
                            [APIExt03Data[0].name, APIExt03Data[0].data[0]],
                            [APIExt03Data[1].name, APIExt03Data[1].data[0]],
                            [APIExt03Data[2].name, APIExt03Data[2].data[0]]
                        ]
                    ,
                    type: "bar", // for ESM specify as: bar()
                },
                axis: {
                    x: {
                        label : "Nombres"
                    },
                    y: {
                        label : "Edad promedio"
                    }
                },
                bar: {
                    width: {
                    ratio: 0.5
                    }
                },
                bindto: "#barChart"
            });

        }

    }

    loadAPI();
    
</script>

<svelte:head>

</svelte:head>

<main>
    <h3 style="text-align:center;">Integración externa de la API:agify</h3>
    <p style="text-align:center;">
        Predicción de la edad según el nombre.
    </p>
    <div id="barChart"></div>
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#/hostelries/integrations'" style="width: 100%; margin-bottom: 5%;"> Volver</button><br>
</main>