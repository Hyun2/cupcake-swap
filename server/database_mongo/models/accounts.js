const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const accountsSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true
    },
    discordId: {
      type: String,
      default: ""
    },
  },  
  { timestamps: true } //만든 날짜와 update시 날짜가 표시가 된다.
);
const accounts = mongoose.model("accounts", accountsSchema); //1st모델의이름,2nd데이터

module.exports = {accounts}; //다른파일에서사용가능