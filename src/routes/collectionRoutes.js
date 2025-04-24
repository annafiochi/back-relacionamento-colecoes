import express from "express";
import CollectionController from "../controllers/collectionController.js";

const collectionRouter = express.Router();

// Rotas de Coleções
// GET /colecoes - Listar todas as Coleções
collectionRouter.get("/", CollectionController.getAllCollections);
// GET /api/Collection/:id - Obter um colecao pelo ID
collectionRouter.get("/:id", CollectionController.getCollectionsById);

// POST /api/Collection - Criar um novo colecao
collectionRouter.post("/", CollectionController.createCollection);

// PUT /personagens/:id - Atualizar um Personagem
collectionRouter.put("/:id", CollectionController.updatedCollection);

// DELETE /personagens/:id - Remover um Personagem
collectionRouter.delete("/:id", CollectionController.deleteCollection);

export default collectionRouter;
