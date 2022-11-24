const { Router } = require('express');

const database = require('./database');

const routes = Router();

routes.get('/produtos', (req, res) => {
  const descricao = req.query.descricao ? req.query.descricao.toUpperCase() : '';

  database.query(`
    SELECT * FROM produto
    WHERE descricao LIKE ?
  `, [`%${descricao}%`], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});

routes.post('/produtos', (req, res) => {
  const { descricao, preco } = req.body;

  database.query(`
    INSERT INTO produto(descricao, preco)
    VALUES(?, ?)
    RETURNING id, descricao, preco
  `, [descricao, preco], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json(result);
  });
});

routes.put('/produtos/:id', (req, res) => {
  const { descricao, preco } = req.body;
  const { id } = req.params;

  database.query(`
    UPDATE produto
    SET descricao = ?, preco = ?
    WHERE id = ?
    RETURNING id, descricao, preco
  `, [descricao, preco, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json(result);
  });
});

routes.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;

  database.query(`
    DELETE FROM produto
    WHERE id = ?
  `, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.sendStatus(204);
  })
})

module.exports = routes;
