<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>


<style>
    #divButtons{
        text-align: center;
    }
    #divButtonsExterna{
        text-align: center;
        margin-top: 2%;
    }
</style>

<main>
    <div id="divButtons">
        <Button type="button" color="info" onclick="window.location.href='#/culturaBASE/integrations01'"> Integraciones API 01</Button>
        <Button type="button" color="info" onclick="window.location.href='#/culturaBASE/integrations07'"> Integraciones API 07</Button>
    </div>

    <div id="divButtonsExterna">
        <Button type="button" color="danger" onclick="window.location.href='#/culturaBASE/Externa1'"> Integracion API Externa 1</Button>
        <Button type="button" color="danger" onclick="window.location.href='#/culturaBASE/Externa2'"> Integracion API Externa 2</Button>
    </div>

</main>