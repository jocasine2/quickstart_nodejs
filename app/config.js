const config = {
    development: {
      username: "postgres",
      password: "password",
      database: "back_end_projeto_cainitech_development",
      host: "postgres",
      dialect: "postgres",
      port: 5432,
      logging: false
    },
    test: {
      username: "postgres",
      password: "password",
      database: "back_end_projeto_cainitech_test",
      host: "postgres",
      dialect: "postgres",
      port: 5432,
      logging: false
    },
    production: {
      username: "postgres",
      password: "password",
      database: "back_end_projeto_cainitech_production",
      host: "postgres",
      dialect: "postgres",
      port: 5432,
      logging: false
    }
  };
  
  module.exports = config;
  