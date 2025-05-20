import { checkIfEmailExists, hashPassword, comparePassword, generateToken } from '../utils/user.utils.js';
import User from '../models/user.model.js'

export const loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

