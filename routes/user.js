const express = require('express');
const app = express();
const User = require('../models/user');
const lang = require('lodash/lang');

app.get('/', (req, res) => {
  const desde = Number(req.query.desde) || 0;
  User.find({})
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error cargando Usuarios',
          errors: err
        });
      }
      User.count({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          user: user,
          total: conteo
        })
      });
    })
});

app.get('/:id', (req, res) => {
  let id = req.params.id;
  User.findById(id)
    .populate('companyDefault', 'name')
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al buscar el usuario',
          errors: err
        });
      }
      if (lang.isNil(user)) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El usuario con el id ' + id + ' no existe',
          errors: {
            message: 'No existe un usuario con ese ID'
          }
        });
      }
      res.status(200).json({
        ok: true,
        user: user
      });
    })
});

app.post('/', (req, res) => {
  const body = req.body;
  const user = new User({
    name: body.name,
    email: body.email,
    password: body.password,
    companyDefault: body.companyDefault,
    state: body.state
  });

  user.save((err, userSaved) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear usuario',
        errors: err
      });
    }
    res.status(201).json({
      ok: true,
      user: userSaved,
      message: 'Usuario creado'
    })
  });
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar usuario',
        errors: err
      });
    }
    if (lang.isNil(user)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El usuario con el id ' + id + ' no existe',
        errors: {
          message: 'No existe un usuario con ese ID'
        }
      });
    }
    user.name = body.name;
    user.email = body.email;
    user.password = body.password;
    user.companyDefault = body.companyDefault;
    user.state = body.state;
    user.save((err, userSaved) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al actualizar el usuario',
          errors: err
        });
      }
      res.status(200).json({
        ok: true,
        user: userSaved
      });
    });
  })
})

module.exports = app;