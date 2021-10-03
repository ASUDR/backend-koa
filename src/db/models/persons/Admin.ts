import Sequelize, { Optional } from 'sequelize';
import cryptoRandomString from 'crypto-random-string';
import sequelize from '../../sequelize';
import {
  AdminRole, AdminHostels,
  Faculty, Hostel
} from '../..';

const { DataTypes, Model } = Sequelize;

export interface AdminAttributes {
  id: number;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  patronymic?: string;
  roleId: number;
  facultyId?: number;
}

export interface AdminAttributesInput extends Optional<AdminAttributes, 'id'> {}
export interface AdminAttributesOutput extends Required<AdminAttributes> {
  role?: AdminRole;
  faculty?: Faculty;
  hostels?: Array<Hostel>;
}

export class Admin
  extends Model<AdminAttributes, AdminAttributesInput>
  implements AdminAttributes {
    public id: number;
    public username: string;
    public passwordHash: string;
    public firstName: string;
    public lastName: string;
    public patronymic: string;
    public roleId: number;
    public facultyId: number;
}

Admin.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  username: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true
  },

  passwordHash: {
    type: DataTypes.STRING(60),
    field: 'password_hash',
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

  roleId: {
    type: DataTypes.INTEGER,
    field: 'role_id',
    allowNull: false
  },

  facultyId: {
    type: DataTypes.INTEGER,
    field: 'faculty_id',
    allowNull: false
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

Admin.belongsTo(AdminRole, {
  foreignKey: {
    name: 'roleId',
    allowNull: false
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Admin.belongsTo(Faculty, {
  foreignKey: {
    name: 'facultyId',
    allowNull: false
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Admin.belongsToMany(Hostel, {
  through: AdminHostels,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});

Hostel.belongsToMany(Admin, {
  through: AdminHostels,
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
