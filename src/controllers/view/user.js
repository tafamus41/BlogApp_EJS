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

  login: async (req, res) => {
  
          if (req.method == 'POST') {
            const { email, password } = req.body;
      
            if (email && password) {
             
              const user = await User.findOne({ email: email, password: password });
      
              if (user) {
                // Set Session:
                req.session = {
                  user: {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                  },
                };
                // Set Cookie:
                if (req.body?.rememberMe) {
                  // Set Cookie maxAge:
                  req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 Days
                }
      
                res.redirect('/blog')
              } else {
                res.errorStatusCode = 401;
                throw new Error("Login parameters are not true.");
              }
            } else {
              res.errorStatusCode = 401;
              throw new Error("Email and Password are required.");
            }
      
          } else {
            res.render('loginForm')
          }
        },

  logout: async (req, res) => {
    // Set session to null:
    req.session = null;
    res.redirect('/blog/post')
    
  },
};

