<script>
    import { text } from 'svelte/internal';
    import CulturaBASETable from './CulturaBASETable.svelte';

</script>

<!--Comando para ejecutar la database: npm run dev-->
<main>
    <h1> <i class="fas fa-film"></i> Estadísticas del sector del cine</h1>
    <CulturaBASETable></CulturaBASETable>
    
</main>

<style>
    h1{
        text-align: center;
        margin-bottom: 1%;
    }
</style>