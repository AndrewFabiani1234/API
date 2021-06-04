const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).send({
        mensagem: "Usando o GET dentro da rota produto"
    })
});

router.post("/", (req, res, next) => {
    res.status(201).send({
        mensagem: "Usando o POST dentro da rota produto"
    })
});

module.exports = router;