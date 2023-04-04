const knex = require("../connection");
const jwt = require("jsonwebtoken");

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Não autorizado");
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, process.env.PASSWORD_HASH);

    const existingUser = await knex("usuarios").where({ id }).first();

    if (!existingUser) {
      return res.status(404).json("Usuario não encontrado");
    }

    const { senha, ...user } = existingUser;

    req.usuario = user;

    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = verifyLogin;
