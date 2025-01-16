"use strict";

/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// User Controller:

const User = require("../../models/user");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(User);
    res.render('index')
  },

  register: async (req, res) => {
    const data = await User.create(req.body);

    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },

  read: async (req, res) => {
    
    const data = await User.findOne({ _id: req.params.userId });

    res.status(200).send({
      error: false,
      result: data,
    });
  },

  update: async (req, res) => {
        const data = await User.updateOne({ _id: req.params.userId }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      body: req.body,
      result: data, // update infos
      newData: await User.findOne({ _id: req.params.userId }),
    });
  }, 
};

