import ClientService from '../services/clientService.js';

class ClientController {

  async getClients(req, res) {
    try {
      const result = await ClientService.getClients();

      if (result.success) {
        return res.status(200).json(result.data);
      } else {
        return res.status(500).json({ error: result.error });
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      return res.status(500).json({ error: 'Erro ao buscar clientes.' });
    }
  }

  async createClient(req, res) {
    try {
      const clientData = req.body;

      const result = await ClientService.createClient(clientData);

      if (result.success) {
        return res.status(201).json(result.data);
      } else {
        return res.status(400).json({ error: result.error }); 
      }
    } catch (error) {
      console.error('Erro no controller ao criar cliente:', error);
      return res.status(500).json({ error: 'Erro interno ao criar cliente.' });
    }
  }

  async updateClient(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const result = await ClientService.updateClient(id, updateData);

      if (result.success) {
        return res.status(200).json(result.data);
      } else {
        return res.status(404).json({ error: result.error });
      }
    } catch (error) {
      console.error('Erro no controller ao atualizar cliente:', error);
      return res.status(500).json({ error: 'Erro interno ao atualizar cliente.' });
    }
  }

  async deleteClient(req, res) {
    try {
      const { id } = req.params;
  
      const result = await ClientService.deleteClient(id);
  
      if (result.success) {
        return res.status(200).json({ message: result.message });
      } else {
        return res.status(404).json({ error: result.error });
      }
    } catch (error) {
      console.error('Erro no controller ao deletar cliente:', error);
      return res.status(500).json({ error: 'Erro interno ao deletar cliente.' });
    }
  }
}

export default new ClientController();
