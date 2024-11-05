import { Sequelize } from 'sequelize';
import Client from '../models/Client.js';

class ClientService {
  async getClients() {
    try {
      const clients = await Client.findAll({
        order: [['name', 'ASC']],
      });
      return { success: true, data: clients };
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return { success: false, error: 'Erro ao buscar clientes.' };
    }
  }

  async createClient(clientData) {
    try {
      // Verifica se todos os dados obrigatórios estão presentes
      const requiredFields = [
        'name', 'documentNumber', 'email', 'phone', 'personType', 
        'addressZipCode', 'addressStreet', 'addressDistrict', 'addressCity', 'addressState'
      ];

      for (const field of requiredFields) {
        if (!clientData[field]) {
          console.error(`Campos obrigatórios não preenchidos.`)
          return { success: false, error: `Campos obrigatórios não preenchidos.` };
        }
      }

      // Verifica se já existe um cliente com o mesmo CPF/CNPJ ou email
      const existingClient = await Client.findOne({
        where: {
          [Sequelize.Op.or]: [
            { documentNumber: clientData.documentNumber },
            { email: clientData.email }
          ]
        }
      });

      if (existingClient) {
        if (existingClient.documentNumber === clientData.documentNumber) {
          console.error('CPF/CNPJ já cadastrado.');
          return { success: false, error: 'CPF/CNPJ já cadastrado.' };
        } 
        
        if (existingClient.email === clientData.email) {
          console.error('Já existe um cliente com este endereço de e-mail.');
          return { success: false, error: 'Já existe um cliente com este endereço de e-mail.' };
        }
      }

      // Cria o novo cliente no banco de dados
      const newClient = await Client.create(clientData);

      return { success: true, data: newClient };
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      return { success: false, error: 'Erro ao criar cliente.' };
    }
  }

  async updateClient(id, updateData) {
    try {
      const client = await Client.findByPk(id);

      if (!client) {
        return { success: false, error: 'Cliente não encontrado.' };
      }

      // Atualiza os dados do cliente (somente os dados que forem enviados)
      await client.update(updateData);

      return { success: true, data: client };
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      return { success: false, error: 'Erro ao atualizar cliente.' };
    }
  }

  async deleteClient(id) {
    try {
      const client = await Client.findByPk(id);
  
      if (!client) {
        return { success: false, error: 'Cliente não encontrado.' };
      }
  
      await client.destroy(); // Deleta o cliente do banco
      return { success: true, message: 'Cliente deletado com sucesso.' };
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      return { success: false, error: 'Erro ao deletar cliente.' };
    }
  }
}

export default new ClientService();
