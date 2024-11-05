import { Model, DataTypes } from 'sequelize';

class Client extends Model {
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
          validate: {
            notEmpty: {
              msg: 'O nome não pode ser vazio.',
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        personType: {
          type: DataTypes.ENUM('Física', 'Jurídica'), // permite só um desses dois valores
          allowNull: false,
        },
        documentNumber: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true, // Cada documento deve ser único
          validate: {
            len: {
              args: [11, 14], // CPF com 11 caracteres, CNPJ com 14
              msg: 'O documento deve conter 11 ou 14 dígitos.',
            },
          },
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('ativo', 'inativo'),
          defaultValue: 'ativo',
        },
        addressStreet: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        addressNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'S/N',
        },
        addressComplement: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        addressCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressDistrict: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        addressState: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressZipCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW, // A data de criação será automaticamente a data atual
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'Clients'
      }
    );
  }

  // Definindo associações, se necessário (ex: com outros modelos como Orders, etc.)
  static associate(models) {
    // Associações (caso tenha outros modelos como Orders, etc.)
  }
}

export default Client;