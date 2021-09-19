import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';
import { Faculty, HostelsToFaculties } from '../..';

const { DataTypes, Model } = Sequelize;

export interface HostelAttributes {
  id: number;
  name: string;
}

export interface HostelAttributesInput extends Optional<HostelAttributes, 'id'> {}
export interface HostelAttributesOutput extends Required<HostelAttributes> {}

export class Hostel
  extends Model<HostelAttributes, HostelAttributesInput>
  implements HostelAttributes {
  public id: number;
  public name: string;
}

Hostel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  schema: 'university',
  modelName: 'hostels',
  timestamps: false
});

Hostel.belongsToMany(Faculty, {
  through: HostelsToFaculties
});

Faculty.belongsToMany(Hostel, {
  through: HostelsToFaculties
});
