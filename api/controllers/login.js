import { User } from '../models/user';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { SEED } from '../config/config'

// ==========================================
//  Refresh Token
// ==========================================

export async function refreshToken(req, res) {

    const token = jwt.sign({ user: req.user }, SEED, { expiresIn: 14400 }); // 4 horas
  
    res.status(200).json({
        ok: true,
        token: token
    });
  
  };
  
export async function login(req, res) {
    try{
      const { email, password } = req.body;
  
      const user = await User.findOne({ email: email })

      if(!user){
        return res.status(400).json({
          ok: false,
          message: 'Invalid credentials - email'
        });
      }
  
      if (!compareSync(password, user.password)) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Invalid credentials - password'
        });
      }
  
      user.password = ':)';
  
      const token = sign({ user: user} , SEED , {expiresIn:14400});
  
      res.status(200).json({
        ok: true,
        user: user,
        token: token,
        id: user._id,
      });
    }catch(e){
      console.log("TCL: login -> e", e)
      return res.status(500).json({error: 'There is a problem in the server'})
    }
  }
  