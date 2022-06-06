const express = require("express");
const categorieRouter = express.Router();

const client = require("../prisma/client");


categorieRouter.get("/", async (req, res) => {
  const categories = await client.Categorie.findMany();
  res.json({ categories });
});

categorieRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const categorie = await client.Categorie.findFirst({ where: { id: +id } });
  res.json({ categorie });
});

categorieRouter.post("/", async (req, res) => {
  const { nom } = req.body;
  const categorie = await client.Categorie.create({
    data: {
      nom,
    },
  });

  res.json({ categorie });
});

categorieRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const categorie = await client.Categorie.findFirst({
    where: { id: parseInt(id) },
  });
  if (categorie) {
    await client.Categorie.delete({ where: { id: parseInt(id) } });
    res.json({ message: "categorie deleted" });
    return;
  }
  res.json({ message: "categorie not found" });
});

categorieRouter.patch("/", async (req, res) => {
  const { id, nom } = req.body;

  const categorie = await client.Categorie.findFirst({
    where: { id: parseInt(id) },
  });

  if (categorie) {
    const categorie = await categorie.Categorie.update({
      where: { id: parseInt(id) }, data: { nom },
    });
    res.json({ categorie });
    return;
  }
  res.json({ message: "categorie not found" });
});

module.exports = categorieRouter;
