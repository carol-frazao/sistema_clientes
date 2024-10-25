import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.VIRTUAL, // Campo virtual, não será salvo no banco
          allowNull: false,
        },
        passwordHash: {
          type: DataTypes.STRING, // Senha hash será salva no banco
        },
        profile: {
          type: DataTypes.STRING,
          defaultValue: 'admin', // Status padrão como 'admin'
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW, // A data de criação é automaticamente a data atual
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW, // Atualiza sempre que o registro é modificado
        },
      },
      {
        sequelize,
        tableName: 'Users',
        hooks: {
          beforeSave: async (user) => {
            // Se uma senha foi fornecida, gera o hash
            if (user.password) {
              user.passwordHash = await hash(user.password, 8);
            }
          },
        },
      }
    );
  }

  // Método para comparar a senha fornecida com o hash armazenado
  async checkPassword(password) {
    return compare(password, this.passwordHash); // Compara usando bcrypt
  }
}

export default User;
