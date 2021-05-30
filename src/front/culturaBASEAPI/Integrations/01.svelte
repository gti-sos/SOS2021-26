<script>
    import  {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    const url = "https://sos2021-01-life-stats.herokuapp.com/api/v2/life-stats/";

    let externalApi = []
    let MyData = []

    async function loadGraph(){
        const res = await fetch(url);
        if (res.ok){
            console.log("Cargada API1 correctamente");
            /*Cargamos los datos y los guardamos en la variable anteriormente definida convertida en json para manipularla luego*/
            const json = await res.json();
            externalApi = json;
        }else{
            console.log("No se ha cargado correctamente la API1");
        }


    }



</script>

<svelte:head>

</svelte:head>