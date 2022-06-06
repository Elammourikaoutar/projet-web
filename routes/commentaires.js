var express = require('express');
var commentaireRouter = express.Router();
const client = require('../prisma/client');

commentaireRouter.get("/", async (req, res) => {
  const commentaires = await client.Commentaire.findMany();
  res.json({ commentaires });
});

commentaireRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const commentaire = await client.Commentaire.findFirst({ where: { id: +id } });
  res.json({ commentaire });
});

commentaireRouter.post("/", async (req, res) => {
  const { email, contenu, articleId } = req.body;
  const commentaire = await client.Commentaire.create({
    data: {
      email, contenu, articleId
    },
  });

  res.json({ commentaire });
});

commentaireRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const commentaire = await client.Commentaire.findFirst({
    where: { id: parseInt(id) },
  });
  if (commentaire) {
    await client.Commentaire.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Commentaire deleted" });
    return;
  }
  res.json({ message: "Commentaire not found" });
});

commentaireRouter.patch("/", async (req, res) => {
  const { id, email, contenu, articleId } = req.body;

  const commentaire = await client.Commentaire.findFirst({
    where: { id: parseInt(id) },
  });

  if (Commentaire) {
    const commentaire = await client.Commentaire.update({
      where: { id: parseInt(id) }, data: { email, contenu, articleId },
    });
    res.json({ commentaire });
    return;
  }
  res.json({ message: "Commentaire not found" });
});

module.exports = commentaireRouter;