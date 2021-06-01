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
        <Button type="button" color="info" onclick="window.location.href='#/hostelries/integrations/I_API_07'"> Integraciones API 07</Button>
        <Button type="button" color="info" onclick="window.location.href='#/hostelries/integrations/I_API_30'"> Integraciones API 30</Button>
    </div>

    <div id="divButtonsExterna">
        <Button type="button" color="danger" onclick="window.location.href='#/hostelries/integrations/I_API_Ext_01'"> Integracion API Externa 1</Button>
        <Button type="button" color="danger" onclick="window.location.href='#/hostelries/integrations/I_API_Ext_02'"> Integracion API Externa 2</Button>
    </div>

</main>