import User from '../models/User.js'

import { checkIfEmailExists, hashPassword, comparePassword, generateToken } from '../utils/user.utils.js';

// Register
export const createUser = async (req, res) => {
  try {
    const { nombre, apellidos, correo, password, telefono, fechaNacimiento, genero } = req.body;

    //Verificar si el correo ya está registrado
    const emailExists = await checkIfEmailExists(correo);
    if (emailExists) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    //Encriptar la contraseña
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

export const loginUser = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Buscar el usuario y asegurarse de incluir el campo 'password'
    const user = await User.findOne({ correo }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña recibida con la hasheada en la base de datos
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Bienvenido',
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        correo: user.correo,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    // Actualizar el usuario
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado con éxito', updatedUser });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};


export const logoutUser = (req, res) => {
  try {
    // En JWT, la sesión es stateless, por lo que no se invalida el token en el servidor.
    // Se recomienda que el cliente elimine el token almacenado (por ejemplo, en localStorage o cookies).
    // Si usas cookies, aquí podrías limpiar la cookie, por ejemplo:
    // res.clearCookie('token');
    
    res.status(200).json({ message: 'Logout exitoso. Por favor, elimina el token en el cliente.' });
  } catch (error) {
    console.error('Error en logout:', error);
    res.status(500).json({ message: 'Error al hacer logout', error: error.message });
  }
};