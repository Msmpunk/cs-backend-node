import { verify } from 'jsonwebtoken';

import { SEED } from '../config/config'


export async function authToken(req, res ,next) {
    try{
        let token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: 'Missing token'
            });
        }
        token = token.replace('Bearer ', '')
        
        verify(token, SEED, (err, decoded) => {

            if (err) {
                return res.status(401).json({
                    ok: false,
                    message: 'invalid token',
                    error: err
                });
            }
            req.user = decoded.user;
            return  next();
        });
    }catch(e){
        console.log(e)
        return res.status(500).json({error: 'There is a problem in the server'})
    }
}
