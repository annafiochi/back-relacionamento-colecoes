import CardModel from "../models/cardModel.js";

class CardController {
  // GET /cartas
  async getAllCards(req, res) {
    try {
      const cartas = await CardModel.findAll();
      res.json(cartas);
    } catch (error) {
      console.error("Erro ao buscar as cartas:", error);
      res.status(500).json({ error: "Erro ao buscar as cartas" });
    }
  }

  // GET /api/colecoes/:id
  async getCardById(req, res) {
    try {
      const { id } = req.params;

      const carta = await CardModel.findById(id);

      if (!carta) {
        return res.status(404).json({ error: "Carta não encontrada" });
      }

      res.json(carta);
    } catch (error) {
      console.error("Erro ao buscar carta:", error);
      res.status(500).json({ error: "Erro ao buscar carta" });
    }
  }

  // POST /api/colecoes
  async createCard(req, res) {
    try {
      // Validação básica
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,

      } = req.body;

      // Verifica se todos os campos do coleção foram fornecidos
      if (
        !name ||
        !rarity ||
        !attackPoints ||
        !defensePoints ||
        !collectionId
      ) {
        return res
          .status(400)
          .json({ error: "os campos nome, raridade, ataque, defesa e id da coleção são obrigatóris" });
      }

      // Criar o novo coleção
      const newCard = await CardModel.create(
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,

      );

      if (!newCard) {
        return res.status(400).json({ error: "Erro ao criar carta" });
      }

      res.status(201).json({
        message: "Carta criada com sucesso",
        newCard
      });
    } catch (error) {
      console.error("Erro ao criar carta:", error);
      res.status(500).json({ error: "Erro ao criar carta" });
    }
  }

  // PUT /api/colecoes/:id
  async updatedCard(req, res) {
    const { id } = req.params; 

    try {
      const {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,

      } = req.body;
;

      // Atualizar o coleção
      const updatedCard = await CardModel.update(
        id,
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      );

      if (!updatedCard) {
        return res.status(404).json({ error: "carta não encontrada" });
      }

      res.json(updatedCard);
    } catch (error) {
      console.error("Erro ao atualizar carta:", error);
      res.status(500).json({ error: "Erro ao atualizar carta" });
    }
  }

  // DELETE /colecoes/:id
  async deleteCard(req, res) {
    try {
      const { id } = req.params;

      // Remover o coleção
      const result = await CardModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "carta não encontrada" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover carta:", error);
      res.status(500).json({ error: "Erro ao remover cartao" });
    }
  }
}

export default new CardController();