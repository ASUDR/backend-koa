import { Sequelize } from 'sequelize';
import { connectionString } from './config';

const sequelize: Sequelize = new Sequelize(connectionString, {
  logging: false
});

sequelize.sync();

export default sequelize;
