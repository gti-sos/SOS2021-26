<script>
    let titulo = "";
    let info_hoy = "";
    let info_manyana = "";
    let comunidad = "";
    let ciudad = "";
    let temp_min = 0;
    let temp_max = 0;

    // API EXTERNA 1
    async function loadAPI() {

        let APIExt01Data = [];
        const resData = await fetch("https://www.el-tiempo.net/api/json/v2/provincias/41");
        APIExt01Data = await resData.json();

        
        titulo = APIExt01Data.title;
        
        info_hoy = APIExt01Data["today"]["p"];
        
        info_manyana = APIExt01Data["tomorrow"]["p"];
        comunidad = APIExt01Data["comautonoma"]["NOMBRE"];
        
        APIExt01Data.ciudades.forEach((x) => {
            
            if(x.name == "Sevilla"){
              
                ciudad = x.name;
                temp_min = x.temperatures.min;
                temp_max = x.temperatures.max;
            }
        });
        
        //console.log("Datos\n"+titulo+"\n"+info_hoy+"\n"+info_manyana+"\n"+comunidad+"\n"+ciudad+"\n"+temp_min+"\n"+temp_max);
    }
    loadAPI();
</script>

<main>
    <h3>
        {titulo}<br>
    </h3>
    <p>
        {info_hoy}<br>
        {info_manyana}<br>
        <br>
        Comunidad Autónoma : {comunidad}<br>
        Provincia: {ciudad}<br>
        Temperatura mínima: {temp_min} ºC<br>
        Temperatura máxima: {temp_max} ºC
    </p>
</main>