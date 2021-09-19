import Sequelize, { Optional } from 'sequelize';
import cryptoRandomString from 'crypto-random-string';
import sequelize from '../../sequelize';
import { Group, Room, Country } from '../..';

const { DataTypes, Model } = Sequelize;

export interface LodgerAttributes {
  id: number;
  password: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  groupId: number;
  roomId: number;
  phoneNumber?: string;
  extraPhoneNumber?: string;
  uniContractNumber?: number;
  hostelContractNumber?: number;
  hostelContractDate?: Date;
  countryId?: number;
}

export interface LodgerAttributesInput extends Optional<LodgerAttributes, 'id'> {}
export interface LodgerAttributesOutput extends Required<LodgerAttributes> {
  group?: Group;
  room?: Room;
  country?: Country;
}

export class Lodger
  extends Model<LodgerAttributes, LodgerAttributesInput>
  implements LodgerAttributes {
    public id: number;
    public password: string;
    public firstName: string;
    public lastName: string;
    public patronymic: string;
    public groupId: number;
    public roomId: number;
    public phoneNumber: string;
    public extraPhoneNumber: string;
    public uniContractNumber: number;
    public hostelContractNumber: number;
    public hostelContractDate: Date;
    public countryId: number;
}

Lodger.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  password: {
    type: DataTypes.STRING(60),
    allowNull: false,
    defaultValue: cryptoRandomString(32)
  },

  firstName: {
    type: DataTypes.STRING(32),
    field: 'first_name',
    allowNull: false
  },

  lastName: {
    type: DataTypes.STRING(32),
    field: 'last_name',
    allowNull: false
  },

  patronymic: {
    type: DataTypes.STRING(32),
    field: 'last_name'
  },

  groupId: {
    type: DataTypes.INTEGER,
    field: 'group_id',
    allowNull: false
  },

  roomId: {
    type: DataTypes.INTEGER,
    field: 'room_id',
    allowNull: false
  },

  phoneNumber: {
    type: DataTypes.STRING(16),
    field: 'own_phone_number'
  },

  extraPhoneNumber: {
    type: DataTypes.STRING(16),
    field: 'extra_phone_number'
  },

  uniContractNumber: {
    type: DataTypes.INTEGER,
    field: 'uni_contract_number'
  },

  hostelContractNumber: {
    type: DataTypes.INTEGER,
    field: 'hostel_contract_number'
  },

  hostelContractDate: {
    type: DataTypes.INTEGER,
    field: 'hostel_contract_date'
  },

  countryId: {
    type: DataTypes.INTEGER,
    field: 'citizenship_country_id'
  }
}, {
  sequelize,
  schema: 'university',
  modelName: 'hostel_floors',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['hostel_id', 'number']
    }
  ]
});

Lodger.belongsTo(Group, {
  foreignKey: {
    name: 'groupId',
    allowNull: false
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Lodger.belongsTo(Room, {
  foreignKey: {
    name: 'roomId',
    allowNull: false
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Lodger.belongsTo(Country, {
  foreignKey: {
    name: 'countryId',
    allowNull: false
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
