const translate = require('google-translate-api-x');
const fs = require("fs");
const data = require("./src/data.json");

(async () => {

  for (let i = 0; i < data.tr.length; i++) {
    const trText = data.tr[i];
    console.log(i, "/", data.tr.length, ":", trText);
    await translate(trText, { to: 'en', from: 'tr' }).then(res => {
      data.default[i] = res.text;
    }).catch(err => {
      console.error(err);
    });
  }



  fs.writeFileSync("./src/data.json", JSON.stringify(data, null, 2));

})();