const userSchema = require("../models/user");

const userController = {
    save: async(req, res) => {

        const { email } = req.body;

        try {
            let user = await userSchema.findOne({ email })

            if(user){
                return res.status(400).json({
                    ok: false,
                    msg: "Este usuario ya existe"
                })
            }

            user = new userSchema(req.body)

            user.save()

            res.status(201).json({
                ok: true,
                user
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Por favor hable con el administrador"
            })
        }
    },

    loginUser: async(req, res) => {
        const { username, password  } = req.body;

        try {
            let user = await userSchema.findOne({ username, password })

            if(!user){
                return res.status(400).json({
                    ok: false,
                    msg: "Sus credenciales no son correctas, por favor verifique"
                })
            }

            res.status(200).json({
                ok: true,
                user,
                msg: "Ha ingresado correctamente",
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Por favor hable con el administrador"
            })
        }
    }
}

module.exports = userController;