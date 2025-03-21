import User from '../models/User.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const checkIfEmailExists = async (correo) => {
    const user = await User.findOne({ correo });
    return !!user; 
  };

export const hashPassword = async (password) => {
    const saltRounds = 10; // Nivel de encriptación
    return await bcrypt.hash(password, saltRounds);
};
  

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};


// Genera un token JWT
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d', // El token expira en 7 días
  });
};

// Verifica un token JWT
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

