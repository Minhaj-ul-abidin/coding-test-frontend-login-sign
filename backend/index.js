const express = require("express");
const cors = require("cors");
const ethers = require("ethers");
const app = express();
const port = 8888;
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/token", (req, res) => {
  let nonce = Math.floor(Math.random() * 1000000).toString(); // in a real life scenario we would random this after each login and fetch it from the db as well
  return res.send(nonce);
});
app.post("/auth", async (req, res) => {
  const { address, signature, nonce } = req.body;
  console.log({ address, signature, nonce });
  const recoveredAddress = await ethers.utils.recoverAddress(
    ethers.utils.arrayify(ethers.utils.hashMessage(`${nonce}`)),
    signature
  );

  console.log({ recoveredAddress });
  if (recoveredAddress !== address) {
    return res.status(401).send();
  }

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
