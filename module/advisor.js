module.exports = (sequelize,DataType)=>{
    let Advisor = sequelize.define("Advisor",{
        FirstName: DataType.STRING,
        LastName: DataType.STRING,
        email: DataType.STRING,
        //this come from validation
        owner_id: DataType.INTEGER
    });
    return Advisor;
}