// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(process.env.DATABASE,"postgres",process.env.PASS,{
//     host: "localhost",
//     dialect: "postgres"
// });
// const sequelize = new Sequelize(
//     process.env.DATABASE_URL || 
//     `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/<DATABASE NAME>`, 
// {
// dialect: 'postgres',
// })
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: "postgres"
});


//checking if the server is connected to the databse.
sequelize.authenticate()
    .then(()=>{
        console.log(`You're connecting to the ${process.env.DATABASE} database`)
    })
    .catch(console.log)

module.exports = sequelize;