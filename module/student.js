module.exports = (sequelize,DataType)=>{
    let Student = sequelize.define("Student",{
        FirstName: DataType.STRING,
        LastName: DataType.STRING,
        Major: DataType.STRING,
        DOB: DataType.STRING,
        //this come from validation
        owner_id: DataType.INTEGER,
        //this come from user input but need to make sure the advID is the foreign key of advisor table. The user
        //can only input number that are already in the advisor table.
        advID: DataType.INTEGER,
        classId: DataType.INTEGER
    });
    return Student;
}