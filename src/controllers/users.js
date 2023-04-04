const knex = require("../connection");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { nome, email, senha, data_nascimento } = req.body;

  try {
    if (!nome) {
      return res.status(400).json({ mensagem: "O campo nome é obrigatório!" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ mensagem: "O campo e-mail é obrigatório!" });
    }

    if (!senha) {
      return res.status(400).json({ mensagem: "O campo senha é obrigatório!" });
    }

    if (!data_nascimento) {
      return res
        .status(400)
        .json({ mensagem: "O campo data de nascimento é obrigatório!" });
    }

    const findUser = await knex("usuarios").where({ email }).first();

    if (findUser) {
      return res.status(404).json({ mensagem: "E-mail já cadastrado!" });
    }

    const encryptedPassword = await bcrypt.hash(senha, 10);

    await knex("usuarios")
      .insert({
        nome,
        email,
        senha: encryptedPassword,
        data_nascimento,
      })
      .returning("*");

    return res.status(201).json({
      nome,
      email,
      data_nascimento,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const updateUser = async (req, res) => {
  const { nome, email, senha, data_nascimento } = req.body;
  const { id } = req.usuario;

  try {
    if (!nome && !email && !senha && !data_nascimento) {
      return res.status(400).json({
        mensagem:
          "É obrigatório informa ao menos um campo para atualização de dados.",
      });
    }

    const findUser = await knex("usuarios").where({ id }).first();

    if (!findUser) {
      return res.status(404).json({ mensagem: "Usuário não existe!" });
    }

    if (senha) {
      senha = await bcrypt.hash(senha, 10);
    }

    if (email !== req.usuario.email) {
      const emailUser = await knex("usuarios").where({ email }).first();

      if (emailUser) {
        return res.status(404).json("O Email já existe.");
      }
    }

    const user = await knex("usuarios").where({ id }).update({
      nome,
      email,
      senha,
      data_nascimento,
    });

    if (!user) {
      return res.status(400).json({ mensagem: "Usuário não atualizado." });
    }

    return res
      .status(200)
      .json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ mensagem: "Informe o ID do usuário." });
    }

    const user = await knex("usuarios").where({ id }).first();

    if (!user) {
      return res.status(404).json({ mensagem: "ID não existe!" });
    }

    return res.status(200).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      data_nascimento: user.data_nascimento,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
  return res.status(200).json({
    id: req.usuario.id,
    nome: req.usuario.nome,
    email: req.usuario.email,
    data_nascimento: req.usuario.data_nascimento,
  });
};

const listUsers = async (req, res) => {
  const users = await knex("usuarios");

  const listUsers = [];

  for (const user of users) {
    listUsers.push({
      id: user.id,
      nome: user.nome,
      email: user.email,
      data_nascimento: user.data_nascimento,
    });
  }

  return res.status(200).json(listUsers);
};

module.exports = {
  createUser,
  updateUser,
  listUser,
  listUsers,
};
