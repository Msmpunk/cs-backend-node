import { Publishment } from '../models/publishment';
import { User } from '../models/user';

export async function createPublishment(req, res) {
    try {
      const { userId, description, photo } = req.body;

      const user = await User.findById({_id: userId });

      if (!user) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error - User not found',
        });
      }

      let publishment = new Publishment({
        user_name: user.user_name,
        description: description,
        photo: photo,
        user: user._id,
      });
  
      publishment.save((err, publishmentSave) => {
  
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear usuario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            publishment: publishmentSave,
        });
    });
    } catch(e){
      return res.status(500).json({error: 'There is a problem in the server'});
    }
}

export async function getPublishments(req, res) {
    try {
        const publishments = await Publishment.find({}).populate('comments');

        if (!publishments) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error',
            });
        }

        res.status(200).json({
            ok: true,
            publishments: publishments,
        });
    } catch(e){
        return res.status(500).json({error: 'There is a problem in the server'});
    }
}
export async function getAllPublishmentsByUser(req, res) {
    try {
        const { userId } = req.params;

        const publishments = await Publishment.find({ user: userId }).populate('comments');


        if (!publishments) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error',
            });
        }

        res.status(200).json({
            ok: true,
            publishments: publishments,
        });
    } catch(e){
        return res.status(500).json({error: 'There is a problem in the server'});
    }
}