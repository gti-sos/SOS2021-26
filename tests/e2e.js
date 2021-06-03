const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sos2021-26.herokuapp.com/');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+ '_Principal_SOS202126.png' });

  //Vamos a culturaBASE
  await page.click("body > main > main > ul > li:nth-child(3) > ul > li:nth-child(1) > a");
  //await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+'_CB.png' });
  //Cargamos los datos
  await page.click("body > main > main > main > button");
  await page.waitForTimeout(800);
  await page.screenshot({ path: './tests/'+'_CargadoDatos.png' });
  //Enseñamos la grafica con barras de highchart
  await page.click("body > main > main > main > div > button:nth-child(3)");
  await page.waitForTimeout(500);
  await page.screenshot({ path: './tests/'+'_GraficaBarrasCB.png' });
  //Enseñamos la grafica de amchart de cb
  await page.click("body > main > main > button");
  await page.click("body > main > main > main > div > button:nth-child(4)");
  await page.waitForTimeout(500);
  await page.screenshot({ path: './tests/'+'_GraficaAmChartCB.png' });
  
  //Llegar a about sobre amchart
  await page.click("body > main > main > button");
  await page.click("body > main > main > main > div > button.btn.btn-danger");
  await page.click("body > main > main > ul > li:nth-child(5) > a");
  await page.screenshot({ path: './tests/'+ 'Nosotros.png' });
  
  //Vamos a la gráfica conjunta
  await page.click("body > main > main > button");
  await page.click("body > main > main > ul > li:nth-child(6) > a");
  await page.waitForTimeout(500);
  await page.screenshot({ path: './tests/'+ 'Conjunta.png' });

  //Vamos al menú de integraciones
  await page.click("body > main > main > button");
  await page.click("body > main > main > ul > li:nth-child(7) > a");
  await page.screenshot({ path: './tests/'+ 'MenuIntegraciones2.png' });

  //Menu de integraciones de CB
  await page.click("#divButtons > button:nth-child(1)");
  await page.screenshot({ path: './tests/'+ 'MenuIntegracionesCB.png' });

  /*await page.click("#divButtonsExterna > button");
  await page.click("body > main > main > button");
  await page.screenshot({ path: './tests/'+ 'VueltaACasa.png' });*/

  /*//Ir a una integracion externa
  await page.click("#divButtonsMid > button");
  //No da lugar a que cargue la grafica pero la comprobacion existe
  await page.waitForTimeout(5000);
  await page.screenshot({ path: './tests/'+ 'MenuIntegracionesCBExterna.png' });

  await page.click("body > main > main > button");
  await page.click("#divButtonsExterna > button");
  await page.click("body > main > main > button");
  await page.screenshot({ path: './tests/'+ 'VueltaACasa.png' });*/

  /*//Grafica Conjunta de sos2021-26
  await page.goto('https://sos2021-26.herokuapp.com/#/analytics');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+ 'GraficaConjunta.png' });

  await page.goto('https://sos2021-26.herokuapp.com/#/integrations');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+ 'MenuIntegraciones.png' });*/
  

  await browser.close();
})();