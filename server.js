const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const { default: puppeteer } = require('puppeteer');
const path = require('path');
const app = express();

app.set("view engine", 'ejs');
// app.set()

app.get('/', async (req, res, next) => {
  // res.json({success: 'hi'})
  const datas = new Array(100000).fill().map((value, id) => (({
    id: id,
    name: 'Mehedi Hasan Sumit',
    description: "A Software Engineer",
    more: "click here to learn more",
  })))

  let htmlData = ''
  const filePath = path.join(__dirname, "views", "index.ejs");
  ejs.renderFile(filePath, { datas: datas }, (err, html) => {
    if (err) {
      return res.send({ err })
    }
    // enviar para o navegador
    // return res.send(html);
    htmlData = html
  });
  
  console.log('done render ejs');
  
  const browser = await puppeteer.launch({
    headless: true,
    pipe: true,
    args: [
      '--headless', '--disable-gpu', '--full-memory-crash-report', '--unlimited-storage',
      '--no-sandbox', '--disable-setuid-sendbox', '--disable-dev-shm-usage'
    ]
  });
  console.log('done puppet lunch');
  const page = await browser.newPage();
  
  console.log('done create page');
  // const html = fs.readFileSync('views/index.ejs', 'utf8');
  
  await page.setContent(htmlData, {timeout:0, waitUntil: ['load','domcontentloaded','networkidle0','networkidle2'] });
  
  console.log('done html data');
  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');
  
  // Downlaod the PDF
  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: false,
    format: 'A4',
    timeout:0
  });
  
  console.log('done pdf');
  // Close the browser instance
  await browser.close();
  console.log('done close puppet');
  res.contentType('application/pdf');
  res.send(pdf);
  // res.json("success")
})

app.post('/', async (req, res, next) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = fs.readFileSync('views/index.ejs', 'utf8');

  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();
})


app.listen(5000, () => { console.log('listening on ' + 5000) })