import { Publishment } from '../models/publishment';
import { User } from '../models/user';
import { Comment } from '../models/comment';

export async function createComment(req, res) {
    try {
      const { userId, publishment, comment} = req.body;

      const user = await User.findById({_id: userId });

      if (!user) {
        return res.status(500).json({
          ok: false,
          mensaje: 'Error - User not found',
        });
      }

      let newComment = new Comment({
        user_name: user.user_name,
        publishment: publishment,
        comment: comment,
        user: user._id,
      });
  
      newComment.save(async (err, commentSave) => {
  
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Error al crear usuario',
                errors: err
            });
        }
        const publishmentStatus = await Publishment.findOneAndUpdate({_id: publishment}, {$push: {comments: commentSave._id}})
        res.status(201).json({
            ok: true,
            comment: commentSave,
        });
    });
    } catch(e){
      console.log("TCL: createComment -> e", e)
      return res.status(500).json({error: 'There is a problem in the server'});
    }
}
