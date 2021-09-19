import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';

const { DataTypes, Model } = Sequelize;

export interface AdminHostelsAttributes {
  id: number;
  hostelId: number;
  adminId: number;
}

export interface AdminHostelsAttributesInput extends Optional<AdminHostelsAttributes, 'id'> {}
export interface AdminHostelsAttributesOutput extends Required<AdminHostelsAttributes> {}

export class AdminHostels
  extends Model<AdminHostelsAttributes, AdminHostelsAttributesInput>
  implements AdminHostelsAttributes {
    public id: number;
    public hostelId: number;
    public adminId: number;
}

AdminHostels.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  hostelId: {
    type: DataTypes.INTEGER,
    field: 'hostel_id',
    allowNull: false
  },

  adminId: {
    type: DataTypes.INTEGER,
    field: 'admin_id',
    allowNull: false
  }
}, {
  sequelize,
  schema: 'objects',
  modelName: 'admin_hostels',
  timestamps: false
});
