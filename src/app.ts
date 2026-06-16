import express from "express";
import { setupSwagger } from "./config/Swagger";
import { CoxinhaDAO } from "./DAO/CoxinhaDAO";
import { RegisterRoutes } from "./route/routes";
import { ClienteDAO } from "./DAO/ClienteDAO";
import { SlotNotasDAO } from "./DAO/SlotNotasDAO";

const app = express();

const PORT = 3090;

app.use(express.json());

const apiRouter = express.Router();
RegisterRoutes(apiRouter);
app.use('/api', apiRouter);


CoxinhaDAO.getInstance();
ClienteDAO.getInstance();
SlotNotasDAO.getInstance();


setupSwagger(app);

app.listen(PORT, ()=> console.log("API online na porta: "+ PORT));
