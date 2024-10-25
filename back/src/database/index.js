import sequelize from '../config/database.js';
import User from '../models/User.js';
import Client from '../models/Client.js';

// Inicializa os modelos
User.init(sequelize);
Client.init(sequelize);

export { sequelize, User, Client };
