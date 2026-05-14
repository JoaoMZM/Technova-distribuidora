import { Router } from "express";
import pedidoControllers from "../controllers/pedido.controllers.js";

const pedidoRoutes = Router();

pedidoRoutes.post('/', pedidoControllers.adicionarPedido);
pedidoRoutes.get('/', pedidoControllers.selecionarPedido);

export default pedidoRoutes;