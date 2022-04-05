module.exports = (sequelize, DataTypes) => {

    const proposedNftInfo = sequelize.define("proposedNftInfo", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        swapId : {
            type: DataTypes.INTEGER(100),
        },
        address : {
            type: DataTypes.STRING(255),
        },
        contractAddress : {
            type: DataTypes.STRING(255),
        },
        tokenId : {
            type: DataTypes.STRING(255),
        },
        imgURL: {
            type: DataTypes.STRING(255),
        },
    }, {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "proposedNfts", // 테이블 이름 정의
        timestamps: true, // createAt, updateAt 활성화
        //paranoid: true, // deleteAt 옵션
    });
    return proposedNftInfo;
};