const { encrypt, compare } = require("../helpers/handleBcrypt");
const userSchema = require("../models/user");

const userController = {
    save: async(req, res) => {

        const { email, password, username } = req.body;
        const passwordHash = await encrypt(password)

        try {
            let user = await userSchema.findOne({ email })

            if(user){
                return res.status(400).json({
                    ok: false,
                    msg: "Este usuario ya existe"
                })
            }

            user = new userSchema({
                email,
                username,
                password: passwordHash,
            })

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
            let user = await userSchema.findOne({ username })

            if(!user){
                return res.status(400).json({
                    ok: false,
                    msg: "No se ha encontrado ninguna coincidencia con el nombre de usuario ingresado"
                })
            }

            const checkPassword = await compare(password, user.password)

            if(!checkPassword){
                return res.status(400).json({
                    ok: false,
                    msg: "La contraseña ingresada es incorrecta"
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