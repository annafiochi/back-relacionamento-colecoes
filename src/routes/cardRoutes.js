import express from "express";
import CardController from "../controllers/cardController.js";

const cardRouter = express.Router();

// Rotas de card
// GET /card - Listar todos os card
cardRouter.get("/", CardController.getAllCards);

// GET /card/:id - Obter um card pelo ID
cardRouter.get("/:id", CardController.getCardById);

// POST /card - Criar um novo card
cardRouter.post("/", CardController.createCard);

// PUT /card/:id - Atualizar um card
cardRouter.put("/:id", CardController.updatedCard);

// DELETE /card/:id - Remover um card
cardRouter.delete("/:id", CardController.deleteCard);

export default cardRouter;
