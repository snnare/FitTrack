import User from '../models/User.js'

import { checkIfEmailExists, hashPassword, comparePassword } from '../utils/user.utils.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'nombre apellidos correo');
    res.status(200).json(users);
  } catch (error) {
    console.error('🔴 Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};


export const getUserByEmail = async (req, res) => {
  try {
    const { correo } = req.params;

    // Verificar si el correo existe
    const emailExists = await checkIfEmailExists(correo);
    if (!emailExists) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = await User.findOne({ correo });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};


export const createUser = async (req, res) => {
  try {
    const { nombre, apellidos, correo, password, telefono, fechaNacimiento, genero } = req.body;

    // 1. Verificar si el correo ya está registrado
    const emailExists = await checkIfEmailExists(correo);
    if (emailExists) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // 2. Encriptar la contraseña
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      nombre,
      apellidos,
      correo,
      password: hashedPassword,
      telefono,
      fechaNacimiento,
      genero,
    });

    await newUser.save();
    res.status(201).json({ message: 'Usuario creado con éxito', user: newUser });

  } catch (error) {
    console.error('🔴 Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

export const validateUserCredentials = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ success: false, message: 'Correo y password son obligatorios' });
    }

    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      success: true,
      user: {
        nombre: user.nombre,
        apellidos: user.apellidos,
        correo: user.correo
      }
    });
  } catch (error) {
    console.error('Error en loginUser:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { correo } = req.params; // Obtener el correo de los parámetros

    // Validar si el usuario existe
    const userExists = await checkIfEmailExists(correo);
    if (!userExists) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener los campos a actualizar
    const { telefono, fechaNacimiento, genero, peso, estatura, objetivo } = req.body;

    // Crear un objeto con los campos proporcionados
    const updateFields = {};

    if (telefono) updateFields.telefono = telefono;
    if (fechaNacimiento) updateFields.fechaNacimiento = fechaNacimiento;
    if (genero) updateFields.genero = genero;
    if (peso) updateFields.peso = peso;
    if (estatura) updateFields.estatura = estatura;
    if (objetivo) updateFields.objetivo = objetivo;

    // Actualizar el usuario con validaciones
    const updatedUser = await User.findOneAndUpdate(
      { correo },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Usuario actualizado con éxito', user: updatedUser });
  } catch (error) {
    console.error('🔴 Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};
