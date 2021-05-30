<script>
    import Button from "sveltestrap/src/Button.svelte";
</script>


<style>
    #divButtons{
        text-align: center;
    }
</style>

<main>
    <div id="divButtons">
        <Button type="button" color="info" onclick="window.location.href='#/culturaBASE/integrations'"> Integraciones API CulturaBASE</Button>
        <Button type="button" color="info" onclick="window.location.href='#/hostelries/integrations'"> Integraciones API Hostelería</Button>
    </div>

</main>