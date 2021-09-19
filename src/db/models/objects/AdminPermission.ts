import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';
import { AdminRole } from '../..';

const { DataTypes, Model } = Sequelize;

export interface AdminPermissionAttributes {
  id: number;
  roleId: number;
  name: string;
  read: boolean;
  write: boolean;
}

export interface AdminPermissionAttributesInput extends Optional<AdminPermissionAttributes, 'id'> {}
export interface AdminPermissionAttributesOutput extends Required<AdminPermissionAttributes> {
  role?: AdminRole;
}

export class AdminPermission
  extends Model<AdminPermissionAttributes, AdminPermissionAttributesInput>
  implements AdminPermissionAttributes {
    id: number;
    roleId: number;
    name: string;
    read: boolean;
    write: boolean;
}

AdminPermission.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  roleId: {
    type: DataTypes.INTEGER,
    field: 'role_id',
    allowNull: false
  },

  name: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true
  },

  read: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },

  write: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  schema: 'objects',
  modelName: 'admin_roles',
  timestamps: false
});

AdminPermission.belongsTo(AdminRole, {
  foreignKey: {
    name: 'roleId',
    allowNull: false
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
