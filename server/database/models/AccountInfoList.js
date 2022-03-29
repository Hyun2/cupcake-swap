module.exports = (sequelize, DataTypes) => {

    const AccountInfoList = sequelize.define("accountInfoList", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
          },
        address: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
        },
        discordId : {
            type: DataTypes.STRING(100),
            allowNull: true
        },
    }, {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "accountInfoList", // 테이블 이름 정의
        timestamps: true, // createAt, updateAt 활성화
        //paranoid: true, // deleteAt 옵션
    });
    return AccountInfoList;
};