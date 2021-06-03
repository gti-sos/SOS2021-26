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
    #divButtonsMid{
        text-align: center;
        margin-top: 2%;
        margin-bottom: 2%;
    }
</style>

<main>
    <div id="divButtons">
        <Button type="button" color="info" onclick="window.location.href='#/integrations/integrationsCB01'"> Uso API 01</Button>
        <Button type="button" color="info" onclick="window.location.href='#/integrations/integrationsCB07'"> Uso API 07</Button>
    </div>

    <div id="divButtonsMid">
        <Button type="button" color="info" onclick="window.location.href='#/integrations/integrationsCB0102'"> Integraciones con API 01 Buena vida y CulturaBASE</Button>
        <Button type="button" color="info" onclick="window.location.href='#/integrations/integrationsCB0702'"> Integraciones con API 07 Desempleo y CulturaBASE</Button>
        
    </div>

    <div id="divButtonsMid">
        <!--<Button type="button" color="success" onclick="window.location.href='#/integrations/CBExterna1'"> Uso API Externa 1 (Frases)</Button>-->
        <Button type="button" color="success" onclick="window.location.href='#/integrations/CBExterna2-2'"> Uso API Externa cervecerías</Button>
        <!--<Button type="button" color="success" onclick="window.location.href='#/integrations/CBExterna2'"> Integración con API Externa 2</Button>-->
    </div>

    <div id="divButtonsMid">
        <Button type="button" color="success" onclick="window.location.href='#/integrations/CBExterna3'"> Uso API Externa covid</Button>
        
    </div>

    <div id="divButtonsExterna">

        <Button type="button" color="danger" onclick="window.location.href='#/integrations'"> Menú de integraciones del equipo </Button>

    </div>

</main>