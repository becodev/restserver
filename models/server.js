const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //middlewares
    this.middlewares();

    //routes
    this.routes();
  }

  middlewares() {
    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.json({
        ok: true,
        msg: "get API",
      });
    });
    this.app.put("/api", (req, res) => {
      res.json({
        ok: true,
        msg: "put API",
      });
    });
    this.app.post("/api", (req, res) => {
      res.json({
        ok: true,
        msg: "post API",
      });
    });
    this.app.delete("/api", (req, res) => {
      res.json({
        ok: true,
        msg: "delete API",
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo");
    });
  }
}

module.exports = Server;
