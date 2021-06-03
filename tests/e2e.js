const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sos2021-26.herokuapp.com/');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+ '_Principal_SOS202126.png' });

  //Vamos a culturaBASE
  await page.click("body > main > main > ul > li:nth-child(3) > ul > li:nth-child(1) > a");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+'_CB.png' });
  //Cargamos los datos
  await page.click("body > main > main > main > button");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+'_CargadoDatos.png' });
  //Enseñamos la grafica con barras de highchart
  await page.click("body > main > main > main > div > button:nth-child(3)");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+'_GraficaBarrasCB.png' });
  //Enseñamos la grafica de amchart de cb
  await page.click("body > main > main > button");
  await page.click("body > main > main > main > div > button:nth-child(4)");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+'_GraficaAmChartCB.png' });

  //Grafica Conjunta de sos2021-26
  await page.goto('https://sos2021-26.herokuapp.com/#/analytics');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+ 'GraficaConjunta.png' });

  await page.goto('https://sos2021-26.herokuapp.com/#/integrations');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './tests/'+ 'MenuIntegraciones.png' });


  

  

  await browser.close();
})();