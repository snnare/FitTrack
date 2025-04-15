import User from '../models/User.js'
import { checkIfEmailExists, hashPassword, comparePassword, generateToken } from '../utils/user.utils.js';
import moment from 'moment';



// Registro
export const registerUser = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const emailExists = await checkIfEmailExists(correo);
    if (emailExists) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    const newUser = new User({
      correo,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: 'Usuario Registrado', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
}

export const loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    console.log("passIn", password);
    console.log("bdpass",user.password);
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

export const getUserProfile = async (req, res) => {
    try {
        const correo = req.user.correo; // Obtiene el correo del usuario del token

        const user = await User.findOne({ correo: correo }).select('-password'); // Busca por correo electrónico

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el perfil:', error);
        res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
    }
};

export const postRegisterUser = async (req, res) => {
  try {
      const correo = req.user.correo; // Ahora usamos el correo electrónico del token
      const { nombre, apellidos, fechaNacimiento, genero, peso, estatura, objetivo } = req.body;

      // Validar y formatear la fecha de nacimiento (si se proporciona)
      let formattedFechaNacimiento = null;
      if (fechaNacimiento) {
          formattedFechaNacimiento = moment(fechaNacimiento, 'YYYY-DD-MM').format('YYYY-MM-DD');
          if (!moment(formattedFechaNacimiento, 'YYYY-MM-DD', true).isValid()) {
              return res.status(400).json({ message: 'Fecha de nacimiento inválida, debe estar en el formato YYYY-DD-MM' });
          }
      }

      const updatedUser = await User.findOneAndUpdate(
          { correo: correo }, // Buscar por correo electrónico
          {
              nombre,
              apellidos,
              fechaNacimiento: formattedFechaNacimiento,
              genero,
              peso,
              estatura,
              objetivo,
          },
          { new: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json({
          message: 'Datos del usuario actualizados exitosamente',
          data: updatedUser,
      });
  } catch (error) {
      console.error('Error al actualizar datos del usuario:', error);
      res.status(500).json({
          message: 'Error al actualizar datos del usuario',
          error: error.message,
      });
  }
};

export const getIMC = async (req, res) => {
  try {
    const peso = req.user.peso; 
    const estatura = req.user.estatura;

    const IMC = peso / ((estatura / 100) ** 2); 

    res.status(200).json({ IMC });
  } catch (error) {
    console.error('Error al calcular el IMC:', error);
    res.status(500).json({ message: 'Error al calcular el IMC', error: error.message });
  }
};