<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>


<style>
    #divButtons{
        text-align: center;
        margin-bottom: 2%;
        margin-right: 5%;
    }
</style>

<main>
    <div id="divButtons">
        <Button type="button" color="info" onclick="window.location.href='#/integrations/culturaBASE'"> Integraciones API CulturaBASE</Button>
        <Button type="button" color="info" onclick="window.location.href='#/hostelries/integrations'"> Integraciones API Hostelería</Button>
    </div>

    <Button type="button" color = "danger" class="btn btn-secondary" onclick="window.location.href='#/info'" style="margin-left: 35%; 
    margin-bottom: 5%; align-self: center; width: 25%; "> Volvemos al menú principal</Button>

</main>