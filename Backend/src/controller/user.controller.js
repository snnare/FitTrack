import User from '../models/User.js'
import { checkIfEmailExists, hashPassword, comparePassword, generateToken } from '../utils/user.utils.js';
import moment from 'moment';



// Registro rapido
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

    const token = generateToken(user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

// Registrar
export const createUser = async (req, res) => {
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
    } = req.body;

    //Verificar si el correo ya está registrado
    const emailExists = await checkIfEmailExists(correo);
    if (emailExists) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Convertir la fecha de nacimiento a formato 'YYYY-MM-DD'
    const formattedFechaNacimiento = moment(fechaNacimiento, 'YYYY-DD-MM').format('YYYY-MM-DD');
    if (!moment(formattedFechaNacimiento, 'YYYY-MM-DD', true).isValid()) {
      return res.status(400).json({ message: 'Fecha de nacimiento inválida, debe estar en el formato YYYY-DD-MM' });
    }


    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      nombre,
      apellidos,
      correo,
      password: hashedPassword,
      fechaNacimiento: formattedFechaNacimiento,
      genero,
      peso,
      estatura,
      objetivo,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario Registrado', user: newUser });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
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