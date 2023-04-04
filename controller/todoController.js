const { pool } = require("../utils/connectDB");

// create new
const create = async (req, res, next) => {
  const data = {
    content: req.body.content,
  };

  pool.connect((err, client, done) => {
    const query = "INSERT INTO todos(content) VALUES($1) RETURNING *";
    const values = [data.content];

    client.query(query, values, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      res.status(202).send({
        status: "Successful",
        result: result.rows[0],
      });
    });
  });
};

// find all
const findAll = (req, res, next) => {
  pool.connect((err, client, done) => {
    const query = "SELECT * FROM todos";
    client.query(query, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      if (result.rows < "1") {
        res.status(200).send({
          status: "Successful",
          message: "No todos found",
          todos: [],
        });
      } else {
        res.status(200).send({
          status: "Successful",
          message: "Todos Information retrieved",
          todos: result.rows,
        });
      }
    });
  });
};

// find by id
const findById = async (req, res, next) => {
  pool.connect((err, client, done) => {
    const query = "SELECT * FROM todos WHERE id = " + req.params.id;
    client.query(query, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      }
      if (result.rows < "1") {
        res.status(404).send({
          status: "Failed",
          message: "No todo information found",
        });
      } else {
        res.status(200).send({
          status: "Successful",
          message: "Todos Information retrieved",
          students: result.rows,
        });
      }
    });
  });
};

// update by id
const updateById = async (req, res, next) => {
  return null;
};

// delete by id
const deleteById = async (req, res, next) => {
  pool.connect((err, client, done) => {
    const query = "DELETE FROM todos WHERE id = " + req.params.id;
    client.query(query, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error });
      } else {
        res.status(200).send({
          status: "Successful",
          message: "Todo deleted",
        });
      }
    });
  });
};

module.exports = { findAll, findById, updateById, deleteById, create };
