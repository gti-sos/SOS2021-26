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
	import IntegrationsCB01 from './culturaBASEAPI/Integrations/01.svelte';
	import IntegrationsCB07 from './culturaBASEAPI/Integrations/07.svelte';
	import IntegrationsE1 from './culturaBASEAPI/Integrations/Externa1.svelte';
	import IntegrationsE2 from './culturaBASEAPI/Integrations/Externa2.svelte';
	

	//Imports of Hostelries
	import Hostelries from './hostelriesAPI/Hostelries.svelte';
	import EditHostelryResource from './hostelriesAPI/editHostelryR.svelte';
	import GraphHostelry from './hostelriesAPI/MyGraph.svelte';
	import GraphHostelryV2 from './hostelriesAPI/MyGraphV2.svelte';
	import IntegrationsHome from './hostelriesAPI/Integrations/Home.svelte';
	//--Integraciones
	import API07Integration from './hostelriesAPI/Integrations/API07.svelte';
	import API30Integration from './hostelriesAPI/Integrations/API30.svelte';


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
		'/hostelries/:district/:year': EditHostelryResource,

		//CulturaBAse API
		'/culturaBASE': CulturaBASE,
		'/culturaBASE/:district/:year': CulturaBASEDistrict,
		'/culturaBASE/graph': GraphCB,
		'/culturaBASE/graph2': GraphCBar,
		'/culturaBASE/graph3': GraphCBAmChart,
		'/culturaBASE/integrations': IntegrationsCB,
		'/culturaBASE/integrations01': IntegrationsCB01,
		'/culturaBASE/integrations07': IntegrationsCB07,
		'/culturaBASE/Externa1': IntegrationsE1,
		'/culturaBASE/Externa2': IntegrationsE2,

		
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