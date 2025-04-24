import CollectionModel from "../models/collectionModel.js";

class CollectionController {
  // GET /colecoes
  async getAllCollections(req, res) {
    try {
      const colecoes = await CollectionModel.findAll();
      res.json(colecoes);
    } catch (error) {
      console.error("Erro ao buscar as coleções:", error);
      res.status(500).json({ error: "Erro ao buscar as coleções" });
    }
  }

  // GET /api/colecoes/:id
  async getCollectionsById(req, res) {
    try {
      const { id } = req.params;

      const colecao = await CollectionModel.findById(id);

      if (!colecao) {
        return res.status(404).json({ error: "Coleção não encontrada" });
      }

      res.json(colecao);
    } catch (error) {
      console.error("Erro ao buscar coleção:", error);
      res.status(500).json({ error: "Erro ao buscar coleção" });
    }
  }

  // POST /api/colecoes
  async createCollection(req, res) {
    try {
      // Validação básica
      const {
        name,
        description,
        releaseYear
      } = req.body;

      // Verifica se todos os campos do coleção foram fornecidos
      if (
        !name ||
        !description ||
        !releaseYear 
      ) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar o novo coleção
      const newCollection = await CollectionModel.create(
        name,
        description,
        releaseYear
      );

      if (!newCollection) {
        return res.status(400).json({ error: "Erro ao criar coleção" });
      }

      res.status(201).json({
        message: "Coleção criada com sucesso",
        newCollection
      });
    } catch (error) {
      console.error("Erro ao criar coleção:", error);
      res.status(500).json({ error: "Erro ao criar coleção" });
    }
  }

  // PUT /api/colecoes/:id
  async updatedCollection(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        releaseYear
      } = req.body;

      // Atualizar o coleção
      const updatedCollection = await CollectionModel.update(
        id,
        name,
        description,
        releaseYear
      );

      if (!updatedCollection) {
        return res.status(404).json({ error: "colecao não encontrada" });
      }

      res.json(updatedCollection);
    } catch (error) {
      console.error("Erro ao atualizar coleção:", error);
      res.status(500).json({ error: "Erro ao atualizar coleção" });
    }
  }

  // DELETE /colecoes/:id
  async deleteCollection(req, res) {
    try {
      const { id } = req.params;

      // Remover o coleção
      const result = await CollectionModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "colecao não encontrada" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover coleção:", error);
      res.status(500).json({ error: "Erro ao remover coleção" });
    }
  }
}

export default new CollectionController();