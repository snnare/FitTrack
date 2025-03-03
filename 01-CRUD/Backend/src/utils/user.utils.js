import User from '../models/User.js'
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';



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


export const generateConfirmationToken = () => {
  return crypto.randomBytes(32).toString('hex');
}


export const sendConfirmationEmail = async (correo, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const confirmationLink = `${process.env.BASE_URL}/api/users/confirm/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: correo,
      subject: 'Confirma tu correo - FitTrack',
      html: `<p>Haz clic en el siguiente enlace para confirmar tu correo:</p>
             <a href="${confirmationLink}">${confirmationLink}</a>`
    });

    console.log('📧 Correo de confirmación enviado a:', correo);
  } catch (error) {
    console.error('🔴 Error al enviar el correo de confirmación:', error);
    throw new Error('Error al enviar el correo de confirmación');
  }
};
