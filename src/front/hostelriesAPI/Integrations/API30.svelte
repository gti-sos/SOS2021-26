<script type="text/javascript">

    
    async function loadGraph() {

        let HostelryData = [];
        const resData = await fetch("/api/v2/hostelries");
        HostelryData = await resData.json(); 

        let API30Data = [];
        const resData30 = await fetch('https://sos2021-30.herokuapp.com/api/v2/smokers-stats');
        API30Data = await resData30.json();

        let valores = [];
        let valor = {};
        let campos = ["Establecimientos abiertos","Turistas","Fumadores diarios"];


        API30Data.forEach((x) => {
            HostelryData.forEach((h) => {
                if(h.year == 2017){
                    if(h.district == "Andalucia" && x.province == "Andalucía"){
                        valor = {
                            name:   h.district,
                            data:   [h.establishment_open,h.traveler_numer,x.dailySmoker]
                        }
                        valores.push(valor);

                    }else if(h.district == "Madrid" && x.province == "Comunidad de Madrid"){
                        valor = {
                            name:   h.district,
                            data:   [h.establishment_open,h.traveler_numer,x.dailySmoker]
                        }
                        valores.push(valor);

                    }else if(h.district == "Aragon" && x.province == "Aragón"){
                        valor = {
                            name:   h.district,
                            data:   [h.establishment_open,h.traveler_numer,x.dailySmoker]
                        }
                        valores.push(valor);

                    }else if(h.district == x.province){
                        valor = {
                            name:   h.district,
                            data:   [h.establishment_open,h.traveler_numer,x.dailySmoker]
                        }
                        valores.push(valor);
                    }
                }
            });
        });

        console.log(valores);
    }

    loadGraph();
</script>