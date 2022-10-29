const fs = require("fs");

const JSONWrite = (filePath, data, encoding = "utf-8") => {
  const promisseCallback = (resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), encoding, (err) => {
      if (err) {
        reject(err);

        return;
      } else {
        console.log("json escrito ok");
        resolve(true);
      }
    });
  };

  return new Promise(promisseCallback);
};

// escrevendo no arquivo json
// fs.writeFile(
//   "./db/dados.json",
//   JSON.stringify(list, null, 2),
//   // JSON.stringify(list, ["id", "price"], 2),
//   "utf-8",
//   (error, result) => {
//     if (error) {
//       console.error(error);
//       return;
//     } else {
//       if (result == undefined) console.log("Json ok!");
//     }
//   }
// );
// outro forma com writeFileSync
// try {
//   const dataString = JSON.stringify(list, null, 2);
//   fs.writeFileSync("./db/dados.json", dataString, "utf-8");
//   console.log("Json ok!");
// } catch (e) {
//   console.log(e);
// }

// JSONWrite("./db/teste.json", { name: "FabioS" })
//   .then(console.log)
//   .catch(console.error);

module.exports = JSONWrite;
