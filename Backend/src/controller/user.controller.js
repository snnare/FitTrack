import User from '../models/user.model.js'
import { checkIfEmailExists, hashPassword, comparePassword, generateToken } from '../utils/user.utils.js';
import moment from 'moment';


export const registerUser = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      correo,
      password,
      fechaNacimiento,
      genero,
      peso,
      estatura,
      objetivo,
      nivelExperiencia
    } = req.body;

    const emailExists = await checkIfEmailExists(correo);
    if (emailExists) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const hashedPassword = await hashPassword(password);
    let formattedFechaNacimiento = null;
    if (fechaNacimiento) {
      formattedFechaNacimiento = moment(fechaNacimiento, 'YYYY-MM-DD').format('YYYY-MM-DD');
      if (!moment(formattedFechaNacimiento, 'YYYY-MM-DD', true).isValid()) {
        return res.status(400).json({ message: 'Fecha de nacimiento inválida, debe estar en el formato YYYY-MM-DD' });
      }
    }

    const newUser = new User({
      correo,
      password: hashedPassword,
      nombre,
      apellidos,
      fechaNacimiento: formattedFechaNacimiento,
      genero,
      peso,
      estatura,
      objetivo,
      nivelExperiencia
    });


    await newUser.save();
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    res.status(500).json({
      message: 'Error al registrar el usuario',
      error: error.message,
    });
  }
}


export const getInfo = async (req, res) => {
  try {
    const correo = req.user.correo;

    const userInfo = await User.findOne({ correo: correo }).select('-password');
    if (!userInfo) {
      return res.status(404).json({ message: 'El usuario no existe' });
    }
    return res.status(200).json(userInfo);
  } catch (error) {

  }
}

export const updateUser = async (req, res) => {
  try {
    const correo = req.user.correo;
    const { nombre, apellidos, fechaNacimiento, genero, peso, estatura, objetivo, nivelExperiencia } = req.body;

    let formattedFechaNacimiento = null;
    if (fechaNacimiento) {
      formattedFechaNacimiento = moment(fechaNacimiento, 'YYYY-MM-DD').format('YYYY-MM-DD');
      if (!moment(formattedFechaNacimiento, 'YYYY-MM-DD', true).isValid()) {
        return res.status(400).json({ message: 'Fecha de nacimiento inválida, debe estar en el formato YYYY-MM-DD' });
      }
    }
    await User.findOneAndUpdate(
      { correo: correo },
      {
        nombre,
        apellidos,
        fechaNacimiento: formattedFechaNacimiento,
        genero,
        peso,
        estatura,
        objetivo,
        nivelExperiencia,
        profileComplete: true
      },
      { new: true }
    );
    res.status(200).json({ message: 'Perfil actualizado' });
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar datos del usuario',
      error: error.message,
    });
  }
}


export const deleteUser = async (req, res) => {
  try {
    const correo = req.user.correo;
    await User.findOneAndDelete({ correo: correo });

    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el usuario',
      error: error.message,
    });
  }
}


export const getIMC = async (req, res) => {
  try {
    const correo = req.user.correo;
    const userInfo = await User.findOne({ correo: correo }).select('-password');

    const peso = userInfo.peso;
    const estatura = userInfo.estatura;

    console.log(peso, estatura);

    const IMCP = peso / (estatura ** 2);
    const IMC = IMCP.toFixed(2);

    res.status(200).json({ IMC });
  } catch (error) {
    console.error('Error al calcular el IMC:', error);
    res.status(500).json({ message: 'Error al calcular el IMC', error: error.message });
  }
};


