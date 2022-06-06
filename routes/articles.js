var express = require('express');
var articleRouter = express.Router();
const client = require('../prisma/client');

articleRouter.get("/", async (req, res) => {
    const articles = await client.Article.findMany();
    res.json({ articles });
});

articleRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const article = await client.Article.findFirst({ where: { id: +id } });
    res.json({ article });
});

articleRouter.post("/", async (req, res) => {
    const { titre, image, contenu, authorId } = req.body;
    const article = await client.Article.create({
        data: {
            titre,
            image,
            contenu,
            authorId,
        },
    });

    res.json({ article });
});

articleRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const article = await client.Article.findFirst({
        where: { id: parseInt(id) },
    });
    if (article) {
        await client.Article.delete({ where: { id: parseInt(id) } });
        res.json({ message: "article deleted" });
        return;
    }
    res.json({ message: "article not found" });
});

articleRouter.patch("/", async (req, res) => {
    const { id, titre, image, contenu, authorId } = req.body;

    const article = await client.Article.findFirst({
        where: { id: parseInt(id) },
    });

    if (article) {
        const article = await client.Article.update({
            where: { id: parseInt(id) }, data: { titre, image, contenu, authorId },
        });
        res.json({ article });
        return;
    }
    res.json({ message: "article not found" });
});

module.exports = articleRouter;