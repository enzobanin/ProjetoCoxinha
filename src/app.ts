import express from "express";
//import { setupSwagger } from "./config/Swagger";
import { CoxinhaDAO } from "./DAO/CoxinhaDAO";

const app = express();

const PORT = 3090;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensagem: "API funcionando"
    });
});



CoxinhaDAO.getInstance();


//setupSwagger(app);

app.listen(PORT, ()=> console.log("API online na porta: "+ PORT));
