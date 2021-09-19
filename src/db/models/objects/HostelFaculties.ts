import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';

const { DataTypes, Model } = Sequelize;

export interface FacultyHostelsAttributes {
  id: number;
  hostelId: number;
  facultyId: number;
}

export interface FacultyHostelsAttributesInput extends Optional<FacultyHostelsAttributes, 'id'> {}
export interface FacultyHostelsAttributesOutput extends Required<FacultyHostelsAttributes> {}

export class FacultyHostels
  extends Model<FacultyHostelsAttributes, FacultyHostelsAttributesInput>
  implements FacultyHostelsAttributes {
    public id: number;
    public hostelId: number;
    public facultyId: number;
}

FacultyHostels.init({
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
  schema: 'objects',
  modelName: 'faculty_hostels',
  timestamps: false
});
