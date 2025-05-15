import jwt from 'jsonwebtoken';

export const validateToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            }

            // Si el token es válido, puedes enviar una respuesta exitosa
            res.status(200).json({ message: 'Token válido', user: decoded });
        });
    } catch (error) {
        console.error('Error al validar token:', error);
        res.status(500).json({ message: 'Error al validar token', error: error.message });
    }
};