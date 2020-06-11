module.exports = (sequelize,DataType)=>{
    let studentUser = sequelize.define("StudentUser",{
        username: {
            type: DataType.STRING,
            required: true
        },
        password: {
            type: DataType.STRING,
            required: true
        }
    })
    return studentUser;
}