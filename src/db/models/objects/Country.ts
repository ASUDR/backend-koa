import Sequelize, { Optional } from 'sequelize';
import sequelize from '../../sequelize';

const { DataTypes, Model } = Sequelize;

export interface CountryAttributes {
  id: number;
  code: string;
  name: string;
}

export interface CountryAttributesInput extends Optional<CountryAttributes, 'id'> {}
export interface CountryAttributesOutput extends Required<CountryAttributes> {}

export class Country
  extends Model<CountryAttributes, CountryAttributesInput>
  implements CountryAttributes {
  public id: number;
  public code: string;
  public name: string;
}

Country.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  code: {
    type: DataTypes.STRING(3),
    allowNull: false,
    unique: true
  },

  name: {
    type: DataTypes.STRING(32),
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  schema: 'objects',
  modelName: 'countries',
  timestamps: false
});
