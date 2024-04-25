const config = require('../config/config');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(config.googleAuth.clientId);

const verifyGoogleAuthToken = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: config.googleAuth.clientId
            })
            return resolve(ticket)
        } catch (e) {
            return reject(e)
        }
    })
}

module.exports = verifyGoogleAuthToken;