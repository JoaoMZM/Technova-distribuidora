const routes = Router();
import { Router } from "express";
import categoriaRoutes from "./categorias.routes.js";
import produtoRoutes from "./produto.routes.js";

routes.use('/produtos', produtoRoutes)
routes.use('/categorias', categoriaRoutes)

export default routes;
