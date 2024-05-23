import { Sequelize } from 'sequelize';

const initDatabase = (): Sequelize => {
  const sequelize = new Sequelize('postgres', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false,
  });

  return sequelize;
};

export default initDatabase;
