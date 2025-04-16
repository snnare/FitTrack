import User from "../models/User";
import Trainer from "../models/Trainer";
import { checkIfEmailExists, hashPassword, comparePassword, generateToken } from '../utils/user.utils.js';

export const loginTrainer = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const trainer = await Trainer.findOne({ correo });

        if (!trainer) {
            return res.status(401).json({ message: "Credenciales invalidas" });
        }


        const isPasswordMatch = await comparePassword(password, trainer.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Credenciales invalidas" });
        }

        const token = generateToken(trainer);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
}


export const findUserbyId = async (req, res) => {
    try {
        const correo = req.query.correo;
        const user = await User.findById(correo);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
    }
}


