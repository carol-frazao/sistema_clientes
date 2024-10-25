import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { createAccessToken } from '../helpers/createAccessToken.js';
import sendEmail from '../helpers/sendMail.js';

class UserService {

  // Função de login do usuário
  async login (data) {
    try {
      // Busca o usuário pelo email no banco de dados
      const user = await User.findOne({ where: { email: data.email } });
      if (!user) {
        return { success: false, message: 'Usuário não cadastrado.' };
      }

      // Verifica se a senha fornecida está correta
      const isPasswordValid = await user.checkPassword(data.password);

      if (!isPasswordValid) {
        return { success: false, message: 'Credenciais incorretas.' };
      }

      // Gera um token JWT
      const token = createAccessToken(user, "4h");

      return { 
        success: true, 
        userData: {
          id: user.dataValues.id,
          name: user.dataValues.name,
          email: user.dataValues.email,
          token
        } 
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro no processo de login.' };
    }
  }

  // Função de registro de novo usuário
  async register (data) {
    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ where: { email: data.email } });
        if (existingUser) {
            return { success: false, message: 'Usuário já cadastrado.' };
        }

        // Cria um novo usuário e salva no banco de dados
        await User.create(data);

        return { success: true, message: 'Usuário registrado com sucesso' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro ao registrar usuário' };
    }
  }

  // Função para o recurso de "esqueci a senha"
  async forgotPassword (email) {
    try {
        // Verifica se o usuário existe no banco de dados
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return { success: false, message: 'Usuário não encontrado.' };
        }

        // Gera um token de recuperação de senha
        const token = createAccessToken(user, '1h');

        // Enviar o e-mail de recuperação de senha
        const resetLink = `${process.env.FRONTEND_URL}/redefinir-senha?token=${token}`;
        const msg = {
            from: `"Teste" <${process.env.EMAIL_USER}>`,
            to: 'anacf1598@gmail.com',
            subject: 'Redefinir Senha',
            text: 'aqui vc irá refinir sua senha',
            html: `<p>Olá,</p><p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p><a href="${resetLink}">Redefinir senha</a>`
        };

        const mail = sendEmail(msg)

        console.log("🚀 ~ UserService ~ forgotPassword ~ mail:", mail)

        return { success: false, message: 'Erro ao solicitar recuperação de senha.' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Erro ao solicitar recuperação de senha.' };
    }
  }

  async resetPassword (data) {
    try {
      // Verifica o token JWT
      const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
      
      // Busca o usuário pelo ID decodificado
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      // Atualiza a senha do usuário
      user.password = data.password; // A senha será hashada pelo hook `beforeSave`
      await user.save();

      return { success: true, message: 'Senha alterada com sucesso.' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Token inválido ou expirado.' };
    }
  }
}

export default new UserService();