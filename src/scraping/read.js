const fs = require("fs");

const JSONRead = (filePath, encoding = "utf-8") => {
  const promiseCallback = (resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(err);
        // console.log("algums erro");
        return;
      }

      try {
        const object = JSON.parse(data);
        resolve(object);
      } catch (e) {
        reject(e);
      }
    });
  };
  return new Promise(promiseCallback);
};

// *****************
// escrevendo no arquivo json
// const JSONRead = () => {
//   fs.readFile(
//     "./db/dados.json",
//     // JSON.stringify(dados, null, 2),
//     // JSON.stringify(list, ["id", "price"], 2),
//     "utf-8",
//     (error, result) => {
//       if (error) {
//         console.error(error);
//         return;
//       } else {
//         if (result == undefined) {
//           console.log("Json ok!");
//         }
//       }
//     }
//   );
// };
// outro forma com writeFileSync
// try {
//   const dataString = JSON.stringify(list, null, 2);
//   fs.writeFileSync("./db/dados.json", dataString, "utf-8");
//   console.log("Json ok!");
// } catch (e) {
//   console.log(e);
// }

// JSONWrite("./db/teste.json", { name: "Fabio" })
//   .then(console.log)
//   .catch(console.error);

module.exports = JSONRead;

// JSONRead("./db/amazon.json").then(console.log).catch(console.error);
