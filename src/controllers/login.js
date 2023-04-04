const knex = require("../connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(404).json("É obrigatório email e senha");
  }

  try {
    const user = await knex("usuarios").where({ email }).first();

    if (!user) {
      return res.status(404).json("O usuario não foi encontrado");
    }

    const correctPassword = await bcrypt.compare(senha, user.senha);

    if (!correctPassword) {
      return res.status(400).json("Email e senha não confere");
    }

    const token = jwt.sign({ id: user.id }, process.env.PASSWORD_HASH, {
      expiresIn: "8h",
    });

    const { senha: _, ...dataUser } = user;

    return res.status(200).json({
      user: dataUser,
      token,
    });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  login,
};
