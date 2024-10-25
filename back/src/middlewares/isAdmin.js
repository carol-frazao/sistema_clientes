import jwt from 'jsonwebtoken';

export const isAdmin = (req, res, next) => {
  const token = req.headers.token?.split(' ')[1]; // Extrai o token do header

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (decoded.profile !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};