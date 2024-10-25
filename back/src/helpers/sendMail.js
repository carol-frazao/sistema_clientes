import formData from 'form-data';
import mailgun from 'mailgun-js';

const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
});

// Função para enviar e-mails usando Mailgun
const sendEmail = async (mailData) => {
  try { 
    const response = await mg.messages().send(mailData, (error, body) => {
        if (error) {
            console.log(error)
            return { success: false, message: 'Erro ao solicitar recuperação de senha.' };
        } else {
            console.warn('E-mail enviado com sucesso:', response);
            return { success: true, message: 'E-mail de recuperação enviado.' };
        }
    });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return { success: false, message: 'Erro ao solicitar recuperação de senha.' };
  }
};

export default sendEmail;
