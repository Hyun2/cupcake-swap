module.exports = (sequelize, DataTypes) => {

    const Proposals = sequelize.define("Proposals", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        netWork: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        proposedAddress: {  
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        offeredAddress: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        proposedAmount: {
            type: DataTypes.INTEGER(255),
            allowNull: true,
        },
        offeredAmount: {
            type: DataTypes.INTEGER(255),
            allowNull: true,
        },
        swapId : {
            type: DataTypes.INTEGER(100),
        },
        status : {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Proposals", // 테이블 이름 정의
        timestamps: true, // createAt, updateAt 활성화
        //paranoid: true, // deleteAt 옵션
    });
    return Proposals;
};