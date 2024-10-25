import UserService from '../services/userService.js';

class UserController {
    
    // Login do usuário
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const result = await UserService.login({ email, password });

            if (result.success) {
                return res.status(200).json({ message: 'Login realizado com sucesso', userData: result.userData });
            } else {
                return res.status(401).json({ error: result.message });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao processar login', error });
        }
    }

    // Registro de novo usuário
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: "Campos obrigatórios não preenchidos." })
            }

            const result = await UserService.register({ name, email, password });

            if (result.success) {
                return res.status(201).json({ message: 'Usuário registrado com sucesso' });
            } else {
                return res.status(400).json({ error: result.message });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao registrar usuário', error });
        }
    }

    // Esqueci a senha
    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const result = await UserService.forgotPassword(email);

            if (result.success) {
                return res.status(200).json({ message: 'E-mail de recuperação enviado' });
            } else {
                return res.status(400).json({ error: result.message });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao processar recuperação de senha', error });
        }
    }

    // Método de redefinição de senha
    async resetPassword(req, res) {
        try {
            const { token, password } = req.body;

            const result = await UserService.resetPassword({ token, password });

            if (result.success) {
                return res.status(200).json({ message: 'Senha alterada com sucesso.' });
            } else {
                return res.status(400).json({ error: result.message });
            }
        } catch (error) {
            console.error('Erro ao processar a redefinição de senha:', error);
            return res.status(500).json({ message: 'Erro ao processar a redefinição de senha.', error });
        }
    }
}

export default new UserController();