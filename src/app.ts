import express from "express";
import { setupSwagger } from "./config/Swagger";
import { CoxinhaDAO } from "./DAO/CoxinhaDAO";
import { RegisterRoutes } from "./route/routes";

const app = express();

const PORT = 3090;

app.use(express.json());

const apiRouter = express.Router();
RegisterRoutes(apiRouter);
app.use('/api', apiRouter);


CoxinhaDAO.getInstance();


setupSwagger(app);

app.listen(PORT, ()=> console.log("API online na porta: "+ PORT));
