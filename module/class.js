module.exports = (sequelize,DataType)=>{
    let Class = sequelize.define("Class",{
        Subject: DataType.STRING,
        RoomNum: DataType.STRING,
        Capacity: DataType.INTEGER
    })
    return Class;
}