import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';

const { DataTypes, Model } = Sequelize;

export interface HostelsToFacultiesAttributes {
  id: number;
  hostelId: number;
  facultyId: number;
}

export interface HostelsToFacultiesAttributesInput extends Optional<HostelsToFacultiesAttributes, 'id'> {}
export interface HostelsToFacultiesAttributesOutput extends Required<HostelsToFacultiesAttributes> {}

export class HostelsToFaculties
  extends Model<HostelsToFacultiesAttributes, HostelsToFacultiesAttributesInput>
  implements HostelsToFacultiesAttributes {
    public id: number;
    public hostelId: number;
    public facultyId: number;
}

HostelsToFaculties.init({
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

  facultyId: {
    type: DataTypes.INTEGER,
    field: 'faculty_id',
    allowNull: false
  }
}, {
  sequelize,
  schema: 'university',
  modelName: 'hostels_to_faculties',
  timestamps: false
});
