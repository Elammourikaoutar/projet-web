const express = require("express");
const userRouter = express.Router();

const client = require("../prisma/client");

userRouter.get("/", async (req, res) => {
  const users = await client.Utilisateur.findMany();
  res.json({ users });
});

userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await client.Utilisateur.findFirst({ where: { id: +id } });
  res.json({ user });
});

userRouter.post("/", async (req, res) => {
  const { email, nom, password } = req.body;
  const user = await client.Utilisateur.create({
    data: {
      email,
      nom,
      password,
    },
  });

  res.json({ user });
});

userRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await client.Utilisateur.findFirst({
    where: { id: parseInt(id) },
  });
  if (user) {
    await client.Utilisateur.delete({ where: { id: parseInt(id) } });
    res.json({ message: "user deleted" });
    return;
  }
  res.json({ message: "user not found" });
});

userRouter.patch("/", async (req, res) => {
  const { id, nom, email, password } = req.body;

  const user = await client.Utilisateur.findFirst({
    where: { id: parseInt(id) },
  });

  if (user) {
    const user = await client.Utilisateur.update({
      where: { id: parseInt(id) }, data: { nom, email, password },
    });
    res.json({ user });
    return;
  }
  res.json({ message: "user not found" });
});

module.exports = userRouter;
