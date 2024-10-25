import jwt from 'jsonwebtoken';

export const isAuth = (req, res, next) => {
  const token = req.headers.token?.split(' ')[1]; // Extrai o token do header

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Anexa as informações do usuário decodificado à requisição
    next(); // Passa para o próximo middleware ou rota
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};