const { articleRouter } = require("./articles");
const { authRouter } = require("./authentif");
const { categorieRouter } = require("./categories");
const { commentaireRouter } = require("./commentaires");
const { userRouter } = require("./users");

module.exports = function (app) {
    app.use("/authentif", authRouter);
    app.use("/articles", articleRouter);
    app.use("/commentaires", commentaireRouter);
    app.use("/categories", categorieRouter);
    app.use("/users", userRouter);
};
