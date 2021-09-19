import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';

const { DataTypes, Model } = Sequelize;

export interface AdminRoleAttributes {
  id: number;
  name: string;
}

export interface AdminRoleAttributesInput extends Optional<AdminRoleAttributes, 'id'> {}
export interface AdminRoleAttributesOutput extends Required<AdminRoleAttributes> {}

export class AdminRole
  extends Model<AdminRoleAttributes, AdminRoleAttributesInput>
  implements AdminRoleAttributes {
    public id: number;
    public name: string;
}

AdminRole.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: DataTypes.STRING(16),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  schema: 'objects',
  modelName: 'admin_roles',
  timestamps: false
});
