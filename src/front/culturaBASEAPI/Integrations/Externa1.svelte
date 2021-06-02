<script>
    /*import {onMount} from "svelte";
	import {pop} from "svelte-spa-router";
	import Table from "sveltestrap/src/Table.svelte";*/
    import Button from "sveltestrap/src/Button.svelte";
    //El tema de las bromas se activa con la url de jokes/random, la parte random la hace randommize https://api.chucknorris.io/
    
    const url2 = "https://api.chucknorris.io/jokes/random";
    let apiExterna = [];
    //let MyData = [];
	async function loadGraph(){
        console.log("");	
		const res = await fetch(url2); 
		if (res.ok) {
			console.log("Ok, loaded successfully");
			const json = await res.json();
            apiExterna = json;
		} else {
			console.log("ERROR!");
        }
        let frase = apiExterna.value;
    
        var text = frase;
        //le quitamos los valores que se pueden cargar la frase y lo spliteamos diferenciando frase de valores del tipo json
        var lines = text.split(/[,\. ]+/g),
        data = Highcharts.reduce(lines, function (arr, word) {
            var obj = Highcharts.find(arr, function (obj) {
                return obj.name === word;
            });
            if (obj) {
            obj.weight += 1;
            } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
            }
            return arr;
        }, []);
        Highcharts.chart('container', {
        accessibility: {
            screenReaderSection: {
            beforeChartFormat: '<h5>{chartTitle}</h5>' +
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>' +
                '<div>{viewTableButton}</div>'
            }
            },
            series: [{
                type: 'wordcloud',
                data: data,
                name: 'Occurrences'
            }],
            title: {
                text: 'Frases de Chucknorris'
            }
        });
        
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/wordcloud.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description" style="text-align: center;">
          {apiExterna.value}
        </p>
    </figure>
    <Button type="button" class="btn btn-secondary" onclick="location.reload()" style="margin-left: 35%; width: 25%;"> Siguiente frase</Button>
    <Button type="button" color="danger" onclick="window.location.href='#/integrations/culturaBASE'"> Patrás </Button>
</main>

