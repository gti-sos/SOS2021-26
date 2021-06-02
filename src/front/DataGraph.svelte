<script type="text/javascript">
    
    async function loadGraph2() {
        let CBData = [];
        let HostelryData =[];

        let CB_Res_Data = [];
        let Hostelry_Res_Data = [];
        let xAxis_years = [];


        const res_CB_Data = await fetch("/api/v2/culturaBASE");
        CBData = await res_CB_Data.json();

        const res_HostelryData = await fetch("/api/v2/hostelries");
        HostelryData = await res_HostelryData.json();

        /*let valores = []
        let valor = {}
        CBData.forEach((c)=>{
            HostelryData.forEach((h)=>{
                if(c.district || h.district){
                    valor ={
                        name: [c.district + c.year],
                        data: [c.fundraising*100000,  c.spectator*10000, c.spending_per_view, h.employee_staff, h.establishment_open/1000, h.traveler_numer/1000]
                    }
                    valores.push(valor);
                }
            })
        })*/


        for(var i = 2018; i <= 2019; i++){
            let espectadores = 0.0;
            let turistas = 0;

            let beneficio = 0.0


            CBData.forEach((x) => {
                if(x.year == i){
                    espectadores += parseInt(x.spectator*1000000);
                    beneficio += parseInt(x.fundraising*1000000);
                }
            })

            HostelryData.forEach((x) => {
                if(x.year == i){
                    turistas += parseInt(x.traveler_numer);
                }
            })

            xAxis_years.push(i);
            CB_Res_Data.push(espectadores);
            CB_Res_Data.push(beneficio);
            Hostelry_Res_Data.push(turistas);
        }


       
        
        /*
        HostelryData.forEach((x) => {
            DataGraph_H.push({name: x.district + " " + x.year, data: [parseInt(x.employee_staff),  parseInt(x.traveler_numer),parseInt(x.establishment_open)], pointPlacement: 'on'})
        });
        */

        /*
        //Estructura: [ {"name" : "Andalucia 2019", "data" : [CB.capos,.., Hostelry.campos ],...}]
        CBData.forEach( (x) => {
            HostelryData.forEach( (y) => {
                if(x.district == y.district && x.year == y.year){
                    DataGraph.push({name: x.district + " " + x.year, 
                                    data: [parseInt(x.fundraising), parseInt(x.spectator), parseInt(x.spending_per_view),
                                        ,parseInt(y.employee_staff),  parseInt(y.traveler_numer),parseInt(y.establishment_open)]
                                    , pointPlacement: 'on'})

                }else if(x.district == y.district && x.year != y.year){

                }else{

                }

            })
        })
        */

        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Cultura Base'
            },

            subtitle: {
            text: 'Representación del número de espectadores,en el sector de la Industria Cinematica, y turistas, en el sector de la Hostelería, de España desde 2017 hasta 2020 según las comunidades autónomas.'
            },
            
            xAxis: {
                categories: Array.from(xAxis_years).sort()+ Array.from(xAxis_years).sort() + Array.from(xAxis_years).sort()
                /*categories: ['Beneficio en las salas por comunidad', 'Espectadores', 'Gasto por espectador',
                'Staff del establecimiento','Numero de viajeros', '']*/
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' units'
            },
            credits: {
                enabled: false
            },
            //series: valores
            series: [
                {
                    name: 'Espectadores (CulturaBase)',
                    data: CB_Res_Data
                },
                {
                    name: 'Turistas (Hostelería)',
                    data: Hostelry_Res_Data
                }
            ]
        });
    }

    async function loadGraph3(){

        let CBData = [];
        let HostelryData =[];
        let datosConjuntos = [];

        const res_CB_Data = await fetch("/api/v2/culturaBASE");
        CBData = await res_CB_Data.json();

        const res_HostelryData = await fetch("/api/v2/hostelries");
        HostelryData = await res_HostelryData.json();

        let datos_cb1 = CBData.map((x) => {
            //Recordamos que los datos por espectadores y beneficio eran contados por millones
				let res = {name: x.district + " " + x.year,value: x["spectator"]*1000000};
				return res;
		});

        let datos_cb2 = CBData.map((x) => {
            //Recordamos que los datos por espectadores y beneficio eran contados por millones
				let res = {name: x.district + " " + x.year,value: x["fundraising"]*1000000};
				return res;
		});

        let datos_cb3 = CBData.map((x) => {
            //Recordamos que los datos por espectadores y beneficio eran contados por millones
				let res = {name: x.district + " " + x.year,value: x["spending_per_view"]};
				return res;
		});
		let datos_hostelry = HostelryData.map((x) => {
				let res = {name: x.district + " " + x.year,value: x.traveler_numer};
				console.log(res);
				return res;
		});

        let datos_hostelry2 = HostelryData.map((x) => {
				let res = {name: x.district+" "+x.year,value: x.employee_staff};
				console.log(res);
				return res;
		});
        let datos_hostelry3 = HostelryData.map((x) => {
				let res = {name: x.district+ " " + x.year,value: x.establishment_open};
				console.log(res);
				return res;
		});

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
					useHTML: true,
					pointFormat: '<b>{point.name}:</b> {point.value}'
				},
				plotOptions: {
					packedbubble: {
						minSize: '10%',
						maxSize: '100%',
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
							enabled: true,
							format: '{point.name}',
							filter: {
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
    
    <button type="button" class="btn btn-secondary" onclick="window.location.href='#'" style="width: 100%; margin-bottom: 5%;"> Volver a database</button><br>
</main>