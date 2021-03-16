const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;
const fetch = require('node-fetch');
const cheerio = require('cheerio');
//cheerio
fetch('https://www.moneycontrol.com/stocksmarketsindia/')
.then(response => response.text())
.then(data => {
  const $ = cheerio.load(data);
  nifty_name= $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(1) > td.tdgreen > a').text();
  nifty_index= $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
  nifty_change= $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(1) > td:nth-child(3)').text()
  nifty_per= $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(1) > td:nth-child(4)').text()
  console.log(nifty_name+nifty_index);
})
.catch(error => console.error(error))

filescon = fs.readFileSync('./index.html');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(filescon);
    });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});





/* 
nifty_name= $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(1) > td.tdgreen > a').text()
nifty_index= $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
nifty_change= $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(1) > td:nth-child(3)').text()
nifty_per= $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(1) > td:nth-child(4)').text()


sen= $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(2) > td.tdgreen > a').text()
sen_prc= $('#maindindi > div.marketatc_actcont > table > tbody > tr:nth-child(2) > td:nth-child(2)').text()
*/