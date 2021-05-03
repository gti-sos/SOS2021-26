<!--Los nombres de los ficheros svelte SIEMPRE empiezan en mayúscula porque sino no te los lee el desgraciado de svelte-->
<script>
    import{
        onMount
    }from "svelte";

    //import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    let r_culturaBASE = []
    let newCB = {district: "",
    year: "",
    fundraising: "",
    spectator: "",
    spending_per_view: ""
    }
    let exitoMsg = "";


    async function getCulturaBASEResource(){
        console.log("--CulturaBASEAPI: \n Estamos buscando los recursos pertinentes");
        const res = await fetch("api/v1/culturaBASE");

        if(res.ok){
            console.log("--CulturaBASEAPI: \n Éxito");
            const json = await res.json();
            r_culturaBASE = json;
            console.log(`--CulturaBASEAPI: \n Hemos recibido ${r_culturaBASE} `);
        }else{
            console.log("--CulturaBASEAPI: \n Error buscando los recursos");
        }
    }

    async function insertCulturaBASE() {
	  
        console.log("Inserting new data..." + JSON.stringify(newCB));
 
        const res = await fetch("/api/v1/culturaBASE", {
            method: "POST",
            body: JSON.stringify(newCB),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getCulturaBASEResource();
        });
    }

    async function deleteCultura(district, year) {
        const res = await fetch("api/v1/culturaBASE/" + district +"/" + year, {
            method: "DELETE"
        }).then(function (res)  {
            getCulturaBASEResource();
			exitoMsg = res.status + ": " + res.statusText + ". Dato eliminado con éxito";
        });
    }   
    
	async function deleteAllCultura() {
        const res = await fetch("api/v1/culturaBASE", {
            method: "DELETE"
        }).then(function (res) {
            getCulturaBASEResource();
			exitoMsg = res.status + ": " + res.statusText + ". Datos eliminados con éxito";
        });
    }
	async function loadInitialData() {
        const res = await fetch("api/v1/culturaBASE/loadInitialData", {
            method: "GET"
        }).then(function (res) {
            getCulturaBASEResource();
			exitoMsg = res.status + ": " + res.statusText + ". Datos reiniciados con éxito";
        });
    }


    onMount(getCulturaBASEResource);
</script>

<svelte:head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</svelte:head>

<main>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Comunidad</th>
                <th>Año</th>
                <th>Recaudación total (contada por millones)</th>
                <th>Espectadores (contados por millones)</th>
                <th>Gasto por espectador(contado por millones)</th>
                <td><Button outline color = "danger" on:click="{deleteAllCultura}">Eliminarlo todo</Button></td>
            </tr>
        </thead>
        <tbody>
            {#each r_culturaBASE as r_cb}
                <tr>
                    <!--Estamos haciendo la llamada a los atributos de cultura base y los estamos ordenando por filas-->
                    <td><a href="#/culturaBASE/{r_cb.district}/{r_cb.year}">{r_cb.district}</a></td>
                    <!--<td>{r_cb.district}</td>-->
                    <td>{r_cb.year}</td>
                    <td>{r_cb.fundraising}</td>
                    <td>{r_cb.spectator}</td>
                    <td>{r_cb.spending_per_view}</td>
                   <td><Button outline color = "danger" on:click="{deleteCultura(r_cb.district, r_cb.year)}">Eliminar</Button></td>
                </tr>
            {/each}
        </tbody>
    </table>
    <h3 style="text-align: center;">Añadimos nuevo dato</h3>
    <table class="table table-striped">
        <tr>
                    
            <td>Provincia: <input bind:value="{newCB.district}"></td>
            <td>Año: <input bind:value="{newCB.year}"></td>
            <td>Recaudacion: <input bind:value="{newCB.fundraising}"></td>
            <td>Espectadores: <input bind:value="{newCB.spectator}"></td>
            <td>Gasto medio por espectador: <input bind:value="{newCB.spending_per_view}"></td>
            <td> <Button outline color = "success" on:click={insertCulturaBASE}>Añadir la cosa</Button></td>
            <!--<td><button type="button" class="btn btn-outline-primary" function = "onclick:{insertCulturaBASE}"></button></td>-->
        </tr>
    </table>
    {#if exitoMsg}
        <p style="color: green">{exitoMsg}</p>
    {/if}
    <Button on:click={loadInitialData}>Añadir los casos base</Button>
</main>

