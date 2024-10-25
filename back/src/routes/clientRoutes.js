import { Router } from "express";
import ClientController from "../controllers/clientController.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const clientRoutes = Router();
  
clientRoutes.get('/client', isAuth, ClientController.getClients);
clientRoutes.post('/client/create', isAuth, isAdmin, ClientController.createClient);
clientRoutes.put('/client/update/:id', isAuth, isAdmin, ClientController.updateClient);
clientRoutes.delete('/client/delete/:id', isAuth, isAdmin, ClientController.deleteClient);

export default clientRoutes;
