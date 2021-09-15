import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';

const { DataTypes, Model } = Sequelize;

export interface FacultyAttributes {
  id: number;
  shortName: string;
  name: string;
}

export interface FacultyAttributesInput extends Optional<FacultyAttributes, 'id'> {}
export interface FacultyAttributesOutput extends Required<FacultyAttributes> {}

export class Faculty
  extends Model<FacultyAttributes, FacultyAttributesInput>
  implements FacultyAttributes {
  public id: number;
  public shortName: string;
  public name: string;
}

Faculty.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  shortName: {
    type: DataTypes.STRING(16),
    allowNull: false,
    unique: true
  },

  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  schema: 'university',
  modelName: 'faculties',
  timestamps: false
});
