const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./model/Artigo")
const Artigo = mongoose.model("artigo"); 

const d = new Date();
const hora = d.getHours(); 
const min = d.getMinutes(); 

const app = express();
app.use(cors());

app.use(express.json());

mongoose.connect("mongodb://localhost/Blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("conexão realizada com sucesso!");
}).catch((erro)=>{
    console.log("Erro: Conexão não foi estabelecida "+erro);
})

app.post("/artigo", (req, res) => {
    const artigo = Artigo.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Artigo não foi cadastrado"
        });
        return res.status(200).json({
            error: false,
            message: "Artigo cadastrado com sucesso!"
        });
    });
});

app.get("/artigo/:id", (req, res) => {
    Artigo.findOne({_id:req.params.id}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) =>{
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado!"
        })
    });
});

app.put("/artigo/:id", (req, res) => {
    const artigo = Artigo.updateOne({_id: req.params.id},req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Erro: Artigo não editado"
        });
        
        return res.status(200).json({
            error: false,
            message: "Aritigo editado com sucesso!"
        })
    });
})

app.delete("/artigo/:id", (req, res) => {
    const artigo = Artigo.deleteOne({_id:req.params.id}, (err) => {
        if (err) return res.status(400).json({
            erro: true,
            message: "Erro: Artigo não deletado"
        });

        return res.status(200).json({
            error: false,
            message: "Artigo apagado com sucesso"
        });
    });
    
})

app.get("/", (req, res) => {
    Artigo.find({}).then((artigo) => {
        return res.json(artigo);
    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum artigo encontrado"
        })
    });
});

// app.get("/", (req, res) => {
//     return res.json({"CEP":"13332-496", "RUA": "Augusta Steffen", "BAIRRO": "Jd Morumbi", "CIDADE": "Indaiatuba"});
// });



app.listen(8081, () => {
    console.log("Servidor ativo "+(hora<10 ? "0"+hora : hora)+":"+(min<10 ? "0"+min : min)+" no endereço http://localhost:8081");
});
