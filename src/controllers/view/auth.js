"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller

const User = require('../../models/user')
const Token = require('../../models/token')
const passwordEncrypt = require('../../helpers/passwordEncrypt')
const jwt = require('jsonwebtoken')

module.exports = {

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

    refresh: async (req, res) => {
        

        const refreshToken = req.body?.bearer?.refresh

        if (refreshToken) {

            const jwtData = await jwt.verify(refreshToken, process.env.REFRESH_KEY)

            if (jwtData) {

                const { id, password } = jwtData

                if (id && password) {

                    const user = await User.findOne({ _id: id })

                    if (user && user.password == password) {

                        if (user.isActive) {

                            // JWT AccessToken:
                            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_KEY, { expiresIn: '30m' })

                            res.status(200).send({
                                error: false,
                                bearer: {
                                    access: accessToken
                                }
                            })

                        } else {

                            res.errorStatusCode = 401
                            throw new Error('This account is not active.')
                        }
                    } else {

                        res.errorStatusCode = 401
                        throw new Error('Wrong id or password.')
                    }
                } else {

                    res.errorStatusCode = 401
                    throw new Error('There is not id and password in refreshToken.')
                }
            } else {

                res.errorStatusCode = 401
                throw new Error('sa')
            }

        } else {
            
            res.errorStatusCode = 401
            throw new Error('Please enter token.refresh')
        }

    },

    logout: async (req, res) => {
        // Set session to null:
        req.session = null;
        res.redirect('/blog/post')
        
      },
}