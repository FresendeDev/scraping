// https://forum.vuejs.org/t/puppeteer-vue-js-components/127882/4
const puppeteer = require("puppeteer");
const JSONWrite = require("./write");

require("dotenv").config();
// const JSONRead = require("./read");

// const fs = require("fs");
const readers = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
};

const url = "https://associados.amazon.com.br/";
const url2 =
  "https://www.amazon.com.br/gp/bestsellers/electronics/ref=zg-bs_electronics_dw_sml";
const user = process.env.USER;
// const user = "teste";
const pass = process.env.PASS;

const list = [];

const ScrapJ = (async () => {
  // headless: false mostra o processo se True executa em segundo plano
  const browser = await puppeteer.launch({ headless: true });
  // page = await browser.newPage();
  page = await browser.newPage();
  console.log("1. iniciado");

  await page.goto(url, readers);
  console.log("2. fui para url");

  await page.waitForSelector(".ac-header-item");
  console.log("3. aguardando seletor");

  await page.click(".ac-header-item > a");
  console.log("4. clicou");

  await page.waitForSelector("#ap_email");
  console.log("5. aguardando seletor");

  await page.type("#ap_email", user);
  console.log("6. escrevendo no usuario");

  await page.type("#ap_password", pass);
  console.log("7. o pass");

  await page.click(".a-checkbox > label > input");
  console.log("8. checkbox");

  await page.waitForTimeout(1000);

  await page.click("#signInSubmit");
  console.log("9. click login");

  await page.waitForSelector(".ac-page-wrapper");
  console.log("10. pagina carregada");

  page = await browser.newPage();
  await page.goto(url2);
  console.log("11. fui para url2");

  await page.waitForSelector("#p13n-asin-index-0");
  console.log("12. Aguardando");

  const links = await page.$$eval(
    "div.p13n-sc-uncoverable-faceout > a",
    (elem) => elem.map((link) => link.href)
  );

  let c = 1;

  for (let link of links) {
    if (c < 10) {
      console.log("Pagina", c);

      await page.goto(link);
      // await page.waitForSelector('a[title="Texto+Imagem"]');
      await page.click('a[title="Texto+Imagem"]');

      await page.waitForSelector("#amzn-ss-text-image-textarea");
      console.log("13. aguardando carregar o texto area");

      // const linkImage = [];
      // linkImage = await page.$eval("textarea");
      await page.waitForTimeout(5000);
      console.log("mais 5 segundos");

      const linkImage = await page.evaluate(() => {
        let el = document.querySelector("#amzn-ss-text-image-textarea").value;
        return el;
      });

      console.log("coletando textare");

      //     let title = await page.$eval(
      //       ".ui-pdp-title",
      //       (element) => element.innerText
      //     );
      const urlImagem = await page.$eval(
        "#landingImage",
        (element) => element.src
      );
      console.log(urlImagem);

      //     let price = await page.$eval(
      //       ".andes-money-amount__fraction",
      //       (element) => element.innerText
      //     );
      //     let saller = await page.evaluate(() => {
      //       let el = document.querySelector(".ui-pdp-seller__link-trigger");
      //       if (!el) return null;
      //       return el.innerText;
      //     });
      // let id = c;
      const obj = {};

      obj.id = c;
      obj.linkImag = linkImage;
      obj.urlImagem = urlImagem;

      //     obj.price = price;
      //     saller ? (obj.saller = saller) : "";
      //     obj.link = link;
      list.push(obj);

      c++;
    }
  }

  JSONWrite("../db/amazon.json", list).catch(console.error);

  await page.waitForTimeout(3000);

  await browser.close();
  console.log("fechado");

  // const leitura = await JSONRead("./db/teste.json")
  // .then(console.log)
  // .catch(console.error);
})();

module.exports = { ScrapJ };
// export default { ScrapJ };
