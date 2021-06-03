<script>


    // API EXTERNA 04: Prediccion del sexo según nombre
    // https://genderize.io/
    // https://api.genderize.io/?name=peter

    async function loadAPI() {
        
        const res = await fetch("https://api.genderize.io/?name=mateo");

        if(res.ok){

            let resData = await res.json();
            let genero = "";
            console.log(resData);

            if(resData.gender == "male"){
                genero = "Hombre";
            }
            if(resData.gender == "female"){
                genero = "Mujer";
            }

            var chart = bb.generate({
                data: {
                    columns: [[genero, resData.probability*100]],
                    type: 'gauge' // for ESM specify as: gauge()
                },
                title: {
                    text: 'Predicción del género según el nombre: MATEO.'
                },
                gauge: {},
                color: {
                    pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'],
                    threshold: {
                    values: [30, 60, 90, 100]
                    }
                },
                size: {
                    height: 180
                },
                bindto: '#gaugeChart'
            });

        }
        else{
            console.log("Error fetching data.");
        }
    }

    loadAPI();
    
</script>

<svelte:head>

</svelte:head>

<main>
    <div id="gaugeChart"></div>
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#/hostelries/integrations'" style="width: 100%; margin-bottom: 5%;"> Volver</button><br>
</main>