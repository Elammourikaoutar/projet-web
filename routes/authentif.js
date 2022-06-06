const authRouter = require("express").Router();
const {
    AuthenticateUserUController,
} = require("../prisma/client");
const {
    RefreshTokenUserController,
} = require("../prisma/client");

const authenticateUserController = new AuthenticateUserUController();
const refreshTokenUserController = new RefreshTokenUserController();

authRouter.post("/login", authenticateUserController.handle);
authRouter.post("/refreshToken", refreshTokenUserController.handle);

module.exports = { authRouter };