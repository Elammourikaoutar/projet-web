var express = require('express');
var router = express.Router();
const articlesRepo = require('../repositories/articles');

router.get('/', async function (req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    res.send(await articlesRepo.getArticles(offset, limit))
});

router.get('/:id', async function (req, res, next) {
    res.send(await articlesRepo.getArticle(req.params.id))
})

router.get('/:id/comments', async function (req, res, next) {
    res.send(await articlesRepo.getArticleWithComments(req.params.id))
})

router.post('/', async function (req, res, next) {
    const article = req.body;

    const getedArticle = await articlesRepo.getArticle(user.id);
    if (!getedArticle) {
        res.send(await articlesRepo.addArticle(id))
    }
});

router.put('/', async function (req, res, next) {
    const article = req.body;
    const getedArticle = await articlesRepo.addArticle(article.id);
    if (!getedArticle) {
        res.send(await articlesRepo.updateArticle(article))
    }
});

router.delete('/:id', async function (req, res, next) {
    const article = req.body;
    const getedArticle = await articlesRepo.getArticle(article.id);
    if (!getedArticle) {
        res.send(await articlesRepo.deleteArticle(id))
    }
});

module.exports = router;