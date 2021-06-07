<script type="text/javascript">
    
    async function loadGraph3(){

        let CBData = [];
        let HostelryData =[];
        let datosConjuntos = [];

        //Petición API:CulturaBase
        const res_CB_Data = await fetch("/api/v2/culturaBASE");
        CBData = await res_CB_Data.json();

        //Petición API:Hostelries
        const res_HostelryData = await fetch("/api/v2/hostelries");
        HostelryData = await res_HostelryData.json();

        //===========================================  Estructura Datos
        //Cada campo de la api dispondra de ún unico map

        //Spectator
        let datos_cb1 = CBData.map((x) => {
            //Recordamos que los datos por espectadores y beneficio eran contados por millones
				let res = {name: x.district + " " + x.year,value: x["spectator"]*1000000};
				return res;
		});
        //Fundraising
        let datos_cb2 = CBData.map((x) => {
            //Recordamos que los datos por espectadores y beneficio eran contados por millones
				let res = {name: x.district + " " + x.year,value: x["fundraising"]*1000000};
				return res;
		});
        //Spending per view
        let datos_cb3 = CBData.map((x) => {
            //Recordamos que los datos por espectadores y beneficio eran contados por millones
				let res = {name: x.district + " " + x.year,value: x["spending_per_view"]};
				return res;
		});
        //travelers
		let datos_hostelry = HostelryData.map((x) => {
				let res = {name: x.district + " " + x.year,value: x.traveler_numer};
				//console.log(res);
				return res;
		});
        //Employee staff
        let datos_hostelry2 = HostelryData.map((x) => {
				let res = {name: x.district+" "+x.year,value: x.employee_staff};
				//console.log(res);
				return res;
		});
        //establishments open
        let datos_hostelry3 = HostelryData.map((x) => {
				let res = {name: x.district+ " " + x.year,value: x.establishment_open};
				//console.log(res);
				return res;
		});

        //ALL-in-one  ---> Graph
        datosConjuntos =  [{name: "Beneficio en cine",data: datos_cb1},{name: "Espectadores",data: datos_cb2}, {name: "Gastos por espectador",data: datos_cb3},
        {name: "Numero de viajeros",data: datos_hostelry},{name: "Empleados de los locales",data: datos_hostelry2}, {name: "Establecimientos abiertos",data: datos_hostelry3}];

        Highcharts.chart('container', {
				chart: {
					type: 'packedbubble',
					height: '43%'
				},
                title: {
                    text: 'Grafica sobre los gastos, gasto por espectador y beneficio en la industria cinematográfica, además de todo los datos sobre hostelería: establecimientos abiertos, staff contratado y viajeros hospeados'
                },   
				tooltip: {
                    // Use HTML to render the contents of the tooltip instead of SVG.
                    // Using HTML allows advanced formatting like tables and images in the tooltip
					useHTML: true,

                    //Formato mostrar dato al hacer click sobre comunidad Auton.
					pointFormat: '<b>{point.name}:</b> {point.value}'
				},
				plotOptions: {
					packedbubble: {
                        //litimar tam bubles
						minSize: '10%',
						maxSize: '100%',
                        //Dinstancia de rebote/impacto
						zMin: 0,
						zMax: 1000,
						layoutAlgorithm: {
							gravitationalConstant: 0.05,
							splitSeries: true,
							seriesInteraction: false,
							dragBetweenSeries: false,
							parentNodeLimit: true
						},
						dataLabels: {
                            //Label bubble mayor
							enabled: true,
							format: '{point.name}',
                            
							filter: {
                                //A declarative filter to control of which data labels to display
								property: 'y',
								operator: '>',
								value: 250
							},
							style: {
								color: 'black',
								textOutline: 'none',
								fontWeight: 'normal'
							}
						}
					}
				},
				series: datosConjuntos
		});

    }

</script>


<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js" on:load={loadGraph3}></script>
    <!--<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}" ></script>-->
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph3}" ></script>

</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container"></div>

    </figure>
    
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#'" style="width: 100%; margin-bottom: 5%;"> Volvemos al menú principal</button><br>
</main>