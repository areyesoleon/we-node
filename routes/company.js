const express = require('express');
const app = express();
const Company = require('../models/company');
const lang = require('lodash/lang');

app.get('/', (req, res) => {
  const desde = Number(req.query.desde) || 0;
  Company.find()
    .exec((err, company) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error cargando lugares',
          errors: err
        });
      }
      Company.count({}, (err, conteo) => {
        res.status(200).json({
          ok: true,
          company: company,
          total: conteo
        })
      });
    })
});

app.get('/:id', (req, res) => {
  let id = req.params.id;
  Company.findById(id)
    .exec((err, company) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          message: 'Error al buscar el lugar',
          errors: err
        });
      }
      console.log(lang.isNil(company));
      if (lang.isNil(company)) {
        return res.status(400).json({
          ok: false,
          mensaje: 'El lugar con el id ' + id + ' no existe',
          errors: {
            message: 'No existe un lugar con ese ID'
          }
        });
      }
      res.status(200).json({
        ok: true,
        company: company
      });
    })
});

app.post('/', (req, res) => {
  const body = req.body;
  const company = new Company({
    name: body.name,
    state: body.state
  });

  company.save((err, companySaved) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Error al crear lugar',
        errors: err
      });
    }
    res.status(201).json({
      ok: true,
      company: companySaved,
      message: 'Lugar creado'
    })
  });
});

app.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Company.findById(id, (err, company) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al buscar company',
        errors: err
      });
    }
    if (lang.isNil(company)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El lugar con el id ' + id + ' no existe',
        errors: {
          message: 'No existe un lugar con ese ID'
        }
      });
    }
    company.name = body.name;
    company.state = body.state;
    company.save((err, companySaved) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error al actualizar el lugar',
          errors: err
        });
      }
      res.status(200).json({
        ok: true,
        company: companySaved
      });
    });
  })
})

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  Company.findByIdAndRemove(id, (err, companyDeleted) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: 'Error al borrar el lugar',
        errors: err
      });
    }
    if (lang.isNil(companyDeleted)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'No existe el lugar con ese ID',
        errors: { message: 'Lugar no existe' }
      });
    }
    res.status(200).json({
      ok: true,
      company: companyDeleted
    });
  })
})

module.exports = app;