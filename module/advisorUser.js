module.exports = (sequelize,DataType)=>{
    let AdvUser = sequelize.define("AdvUser",{
        username: {
            type: DataType.STRING,
            required: true
        },
        password: {
            type: DataType.STRING,
            required: true
        }
    })
    return AdvUser;
}