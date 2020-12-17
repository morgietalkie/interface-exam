const express = require("express");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3030, (err) => {
      console.log("Server ready! ");
    });
  })
  .catch((ex) => {
    console.error(ex.sdtack);
    process.exit(1);
  });
