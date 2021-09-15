import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';
import { Floor } from '../..';

const { DataTypes, Model } = Sequelize;

export interface RoomAttributes {
  id: number;
  floorId: number;
  number: string;
  placesCount: number;
}

export interface RoomAttributesInput extends Optional<RoomAttributes, 'id'> {}
export interface RoomAttributesOutput extends Required<RoomAttributes> {
  floor?: Floor;
}

export class Room
  extends Model<RoomAttributes, RoomAttributesInput>
  implements RoomAttributes {
  public id: number;
  public floorId: number;
  public number: string;
  public placesCount: number;
}

Room.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  floorId: {
    type: DataTypes.INTEGER,
    field: 'floor_id',
    allowNull: false
  },

  number: {
    type: DataTypes.STRING(8),
    allowNull: false
  },

  placesCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  schema: 'university',
  modelName: 'hostel_rooms',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['floor_id', 'number']
    }
  ]
});

Room.belongsTo(Floor, {
  foreignKey: {
    name: 'floorId',
    allowNull: false
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
});
