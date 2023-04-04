const knex = require("../connection");

const registerAddress = async (req, res) => {
  const { logradouro, cep, numero, cidade } = req.body;
  const { id } = req.usuario;

  try {
    if (!logradouro || !cep || !numero || !cidade) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    const address = await knex("enderecos")
      .insert({
        user_id: id,
        logradouro,
        cep,
        numero,
        cidade,
      })
      .returning("*");

    return res.status(201).json(address);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

const listAddressUser = async (req, res) => {
  const { id } = req.usuario;

  try {
    const address = await knex("enderecos").where({ user_id: id });

    return res.status(200).json(address);
  } catch (error) {
    return res.status(500).json({ mensagem: error.message });
  }
};

module.exports = {
  registerAddress,
  listAddressUser,
};
