import express from 'express';
import { RegisterRoutes } from './routes/routes';
import { setupSwagger } from './config/swagger';

const app = express();
//const PORT = 3090;
const PORT = process.env.PORT || 3090;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API funcionando! Acesse /burgaoAPI/api-docs");
});

const apiRouter = express.Router();
RegisterRoutes(apiRouter);

app.use('/burgaoAPI', apiRouter);

setupSwagger(app);

app.listen(PORT, () =>{
    console.log("burgaoAPI rodando!");
    console.log("Rodando na porta: " + PORT);

    console.log("Swagger disponível em: /burgaoAPI/api-docs");
    console.log("Acesse via Railway: https://burgaoapi-production.up.railway.app/burgaoAPI/api-docs");
});