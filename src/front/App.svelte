<script>
	//export let name;
	
	import Router from 'svelte-spa-router';

	import Home from './Home.svelte';

	//Imports of CulturaBASE
	import CulturaBASE from './culturaBASEAPI/CulturaBASE.svelte';
	import CulturaBASEDistrict from './culturaBASEAPI/EditCulturaBase.svelte';
	import GraphCB from './culturaBASEAPI/MyGraph.svelte';
	import GraphCBar from  './culturaBASEAPI/MyGraphBar2.svelte';
	import GraphCBAmChart from './culturaBASEAPI/MyGraph2AmChart.svelte';
	import IntegrationsCB from './culturaBASEAPI/Integrations/IntegrationsCB.svelte';
	import IntegrationsCB07 from './culturaBASEAPI/Integrations/07-2.svelte';
	import IntegrationsCB07Fuse from './culturaBASEAPI/Integrations/07.svelte';
	import IntegrationsCB01 from './culturaBASEAPI/Integrations/01-2.svelte';
	import IntegrationsE1 from './culturaBASEAPI/Integrations/Externa1.svelte';
	import IntegrationsE2 from './culturaBASEAPI/Integrations/Externa2.svelte';
	import IntegrationsE3 from './culturaBASEAPI/Integrations/Externa3.svelte';
	

	//Imports of Hostelries
	import Hostelries from './hostelriesAPI/Hostelries.svelte';
	import EditHostelryResource from './hostelriesAPI/editHostelryR.svelte';
	import GraphHostelry from './hostelriesAPI/MyGraph.svelte';
	import GraphHostelryV2 from './hostelriesAPI/MyGraphV2.svelte';
	import IntegrationsHome from './hostelriesAPI/Integrations/Home.svelte';
	//--Integraciones
	import API07Integration from './hostelriesAPI/Integrations/API07.svelte';
	import API30Integration from './hostelriesAPI/Integrations/API30.svelte';
	import APIExt01Integration from './hostelriesAPI/Integrations/APIExt01.svelte';
	import APIExt02Integration from './hostelriesAPI/Integrations/APIExt02.svelte';
	


	import DataGraph from './DataGraph.svelte';
	import About from './About.svelte';
	import Integrations from './Integrations.svelte';
	import AirRoutes from './airRoutesAPI/AirRoutes.svelte';
	import NotFound from './NotFound.svelte';


	/*	The route definition is just a JavaScript dictionary (object)
		where the key is a string with the path (including parameters, etc),
		and the value is the route object.
	*/
	const routes = {
		'/info': Home,
		'/': Home,
		'/analytics': DataGraph,
		'/integrations': Integrations,
		'/about': About,
		
		//Hostelries API
		'/hostelries': Hostelries,
		'/hostelries/graph' : GraphHostelry,
		'/hostelries/graphV2' : GraphHostelryV2,
		'/hostelries/integrations' : IntegrationsHome,
		'/hostelries/integrations/I_API_07' : API07Integration,
		'/hostelries/integrations/I_API_30' : API30Integration,
		'/hostelries/integrations/I_API_Ext_01' : APIExt01Integration,
		'/hostelries/integrations/I_API_Ext_02' : APIExt02Integration,
		'/hostelries/:district/:year': EditHostelryResource,

		//CulturaBAse API
		'/culturaBASE': CulturaBASE,
		'/culturaBASE/:district/:year': CulturaBASEDistrict,
		'/culturaBASE/graph': GraphCB,
		'/culturaBASE/graph2': GraphCBar,
		'/culturaBASE/graph3': GraphCBAmChart,
		'/integrations/culturaBASE': IntegrationsCB,
		'/integrations/integrationsCB01': IntegrationsCB01,
		'/integrations/integrationsCB07': IntegrationsCB07,
		'/integrations/integrationsCB0702': IntegrationsCB07Fuse,
		'/integrations/CBExterna1': IntegrationsE1,
		'/integrations/CBExterna2': IntegrationsE2,
		'/integrations/CBExterna3': IntegrationsE3,

		
		//AirRoutes API
		'/airRoutes': AirRoutes,
		
		'*': NotFound
	};
</script>

<main>
	<Router {routes}/>
</main>

<!--
<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
-->