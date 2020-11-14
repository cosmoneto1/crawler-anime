const got = require("got");
const cheerio = require("cheerio");
const jsonfile = require("jsonfile");
const file = "data.json";
const resultFile = "result.json";

function getAnimes() {
  return new Promise((resolve, reject) => {
    const list = jsonfile.readFileSync(file);
    let result = {};
    let count = 0;

    list.forEach(async (it) => {
      const resp = await got(it.url);
      if (resp && resp.body && resp.body.length > 0) {
        const $ = cheerio.load(resp.body);
        if (!!!result[`${it.site}`]) {
          result[`${it.site}`] = [];
        }
        $(`${it.load}`).map((i, el) => {
          let obj = {};
          it.Selectors.map((sel) => {
            obj[`${sel.key}`] = sel.value ? $(el).find(`${sel.value}`).attr(`${sel.attr}`) : $(el).attr(`${sel.attr}`);
          });
          result[`${it.site}`].push(obj);
        });
      }
      count++;

      if (count === list.length) {
        jsonfile.writeFileSync(resultFile, result, { spaces: 2, EOL: "\r\n" });
        resolve(result);
      }
    });
  });
}

module.exports = { getAnimes };
