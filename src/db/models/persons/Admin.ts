import Sequelize, { Optional } from 'sequelize';
import cryptoRandomString from 'crypto-random-string';
import sequelize from '../../sequelize';
import { AdminRole, Faculty, Hostel } from '../..';

const { DataTypes, Model } = Sequelize;

export interface AdminAttributes {
  id: number;
  password: string;
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
}

export class Admin
  extends Model<AdminAttributes, AdminAttributesInput>
  implements AdminAttributes {
    public id: number;
    public password: string;
    public firstName: string;
    public lastName: string;
    public patronymic?: string;
    public roleId: number;
    public facultyId?: number;
}

Admin.init({
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
  through: 'university.admin_hostels',
  sourceKey: 'admin_id',
  targetKey: 'hostel_id',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
