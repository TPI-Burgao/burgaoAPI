import express from 'express';
import { RegisterRoutes } from './routes/routes';
import { setupSwagger } from './config/swagger';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'https://burgaoo.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cors({
  origin: 'https://burgaoo-lmc7dcdy7-mizunoyudis-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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