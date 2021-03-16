const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const path = require("path");
const port = 80;
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const { name } = require('ejs');
const API_KEY = '95579f697fbf4d3a8cd431deb7ea7952';
const Quandl_API='zV53Axzsfs5NHcRscQzu'

//CHEERIOJS
fetch('https://www.moneycontrol.com/stocksmarketsindia/')
  .then(response => response.text())
  .then(data => {
    const $ = cheerio.load(data);
    nifty_index = $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(1) > td:nth-child(2)').text();
    nifty_change = $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(1) > td:nth-child(3)').text();
    sensex_index = $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(2) > td:nth-child(2)').text();
    sensex_change = $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(2) > td:nth-child(3)').text();
  })
  .catch(error => console.error(error))

fetch('https://www.fresherslive.com/gold-rate-today/mumbai')
  .then(response => response.text())
  .then(data => {
    const $ = cheerio.load(data);
    gold = $('#tdleft > div.outerdiv > div > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(3)').text();
    gl = $('#tdleft > div.outerdiv > div > table:nth-child(6) > tbody > tr:nth-child(2) > td:nth-child(3) > b > span').text();
  })
  .catch(error => console.error(error))

fetch('https://www.x-rates.com/table/?from=INR&amount=1')
  .then(response => response.text())
  .then(data => {
    const $ = cheerio.load(data);
    usd = $('#content > div:nth-child(1) > div > div.col2.pull-right.module.bottomMargin > div.moduleContent > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(3) > a').text()
    eur = $('#content > div:nth-child(1) > div > div.col2.pull-right.module.bottomMargin > div.moduleContent > table:nth-child(4) > tbody > tr:nth-child(2) > td:nth-child(3) > a').text()
    gbp = $('#content > div:nth-child(1) > div > div.col2.pull-right.module.bottomMargin > div.moduleContent > table:nth-child(4) > tbody > tr:nth-child(3) > td:nth-child(3) > a').text()
  })
  .catch(error => console.error(error))

//NEWS API
var country = 'in';
var api_key = '95579f697fbf4d3a8cd431deb7ea7952';
var url = `http://newsapi.org/v2/top-headlines?country=${country}&apiKey=${api_key}`; //url='http://newsapi.org/v2/top-headlines?country=in&apiKey=95579f697fbf4d3a8cd431deb7ea7952'
//url='http://newsapi.org/v2/top-headlines?sources=bbc-news%20&apiKey=95579f697fbf4d3a8cd431deb7ea7952'
fetch(url)
  .then(response => response.json())
  .then(response => {
    news=response.articles;
    console.log(news[1].content)
  })
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files

// ejs SPECIFIC STUFF
app.set('view engine', 'ejs') // Set the template engine as ejs
app.set('views', path.join(__dirname, '/views'))

// ENDPOINTS
app.get('/', (req, res) => {
  const params = {
    name: ['NIFTY 50', 'SENSEX', 'GOLD', 'USD', 'EUR', 'GBP'],
    type: ['INDEX', 'INDEX', 'COMMODITY', 'CURRENCY', 'CURRENCY', 'CURRENCY'],
    prc: [(nifty_index + ' (' + nifty_change + ')'), (sensex_index + ' (' + sensex_change + ')'), (gold.slice(2) + ' (' + gl + ')'), usd, eur, gbp]
  };
  res.status(200).render('index.ejs', { pars: params, new: news });
})

app.get('/notes', (req, res) => {
  res.status(200).render('notes.ejs');
})

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})