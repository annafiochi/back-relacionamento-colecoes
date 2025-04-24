import prisma from "../../prisma/prisma.js";

class CardModel {
  // Obter todas as coleções
  async findAll() {
    const cartas = await prisma.card.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(cartas);

    return cartas;
  }

  // Obter uma coleção pelo ID
  async findById(id) {
    const carta = await prisma.card.findUnique({
      where: {
        id: Number(id),
      },
      include: {

      collection: true,
    
      },
      
    },
  );

    return carta;
  }

  // Criar uma carta
  async create(
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
    collectionId

    
  ) {
    const novaCarta = await prisma.card.create({
      data: {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,

      },
    });

    return novaCarta;
  }

  // Atualizar uma carta
  async update(
    id,
    name,
    rarity,
    attackPoints,
    defensePoints,
    imageUrl,
    collectionId
  ) {
    const carta = await this.findById(id);

    if (!carta) {
      return null;
    }

    // Atualize a carta existente com os novos dados
   
    const cartaAtualizada = await prisma.card.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        rarity,
        attackPoints,
        defensePoints,
        imageUrl,
        collectionId,
      },
    });

    return cartaAtualizada;
  }

  // Remover uma coleção
  async delete(id) {
    const carta = await this.findById(id);

    if (!carta) {
      return null;
    }

    await prisma.card.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new CardModel();
