import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';
import { Hostel } from '../..';

const { DataTypes, Model } = Sequelize;

export interface FloorAttributes {
  id: number;
  hostelId: number;
  number: string;
}

export interface FloorAttributesInput extends Optional<FloorAttributes, 'id'> {}
export interface FloorAttributesOutput extends Required<FloorAttributes> {
  hostel?: Hostel;
}

export class Floor
  extends Model<FloorAttributes, FloorAttributesInput>
  implements FloorAttributes {
  public id: number;
  public hostelId: number;
  public number: string;
}

Floor.init({
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

  number: {
    type: DataTypes.STRING(16),
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

Floor.belongsTo(Hostel, {
  foreignKey: {
    name: 'hostelId',
    allowNull: false
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
