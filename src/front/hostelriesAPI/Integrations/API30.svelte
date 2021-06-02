<script type="text/javascript">

    
    async function loadGraph() {

        let HostelryData = [];
        const resData = await fetch("/api/v2/hostelries");
        HostelryData = await resData.json(); 

        /*
        let API30Data = [];
        let url_API30 = '/smokers-stats';
        const resData30 = await fetch('https://sos2021-30.herokuapp.com/api/v2/smokers-stats');
        let test = await resData30;
        console.log(resData30);
        console.log(test);
        
        API30Data = await resData30.json();
        
        JSON.stringify(API30Data[0],null,2);

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
        */
    }

    loadGraph();
</script>