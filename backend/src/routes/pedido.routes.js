import { Router } from "express";
import pedidoControllers from "../controllers/pedido.controllers.js";

const pedidoRoutes = Router();

pedidoRoutes.post('/', pedidoControllers.adicionarPedido);

export default pedidoRoutes;