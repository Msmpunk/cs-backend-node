
'use strict';

export async function getHome(req, res, next) {
  try {
    return res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });

  } catch(e){
    return res.status(500).json({error: 'There is a problem in the server'});
  }
}