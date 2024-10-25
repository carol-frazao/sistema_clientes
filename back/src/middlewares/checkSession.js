import jwt from 'jsonwebtoken';

export const checkSession = (req, res) => {
    const token = req.headers.token?.split(' ')[1]; // Pega o token do header
  
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }
  
    // Verifica e decodifica o token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido ou expirado' });
      }
  
      // Se o token for válido, retorna 200
      res.status(200).json({ message: 'Sessão válida' });
    });
}
  