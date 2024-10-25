import express from 'express';
import userRoutes from './userRoutes.js';
import { sequelize } from '../database/index.js';
import clientRoutes from './clientRoutes.js';

const router = express.Router();
  
router.use(userRoutes);
router.use(clientRoutes);

// Alter para atualizar o banco de dados
router.get("/alter", async (req, res) => {
    try {
      console.log("Inicio do sync do sequelize: " + new Date());
      await sequelize.sync({ alter: true });
      console.log("Banco de dados atualizado!", new Date());
      return res.status(200).json("Banco de dados atualizado.");
    } catch (error) {
      return res.status(400).json(error);
    }
});

export default router;
