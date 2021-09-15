import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';
import { Faculty } from '../..';

const { DataTypes, Model } = Sequelize;

export interface GroupAttributes {
  id: number;
  facultyId: number;
  number: number;
}

export interface GroupAttributesInput extends Optional<GroupAttributes, 'id'> {}
export interface GroupAttributesOutput extends Required<GroupAttributes> {
  faculty?: Faculty;
}

export class Group
  extends Model<GroupAttributes, GroupAttributesInput>
  implements GroupAttributes {
  public id: number;
  public facultyId: number;
  public number: number;
}

Group.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  facultyId: {
    type: DataTypes.INTEGER,
    field: 'faculty_id',
    allowNull: false
  },

  number: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  schema: 'university',
  modelName: 'groups',
  timestamps: false
});

Group.belongsTo(Faculty, {
  foreignKey: {
    name: 'facultyId',
    allowNull: false
  }
});
