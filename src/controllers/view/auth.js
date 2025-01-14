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
        
        const auth = req.headers?.authorization || null // Token ...tokenKey...
        const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...']

        const tokenData = await Token.deleteOne({ token: tokenKey[1] })

        res.send({
            error: false,
            message: 'Logout was OK.',
            data: tokenData
        })
    },

}