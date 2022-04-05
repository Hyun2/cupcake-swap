const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const battingSchema = mongoose.Schema(
  {
    proposalId: {
     type : Number
    },
    user1: {
       type : Object
    },
    user2: {
      type: Object
    },
    status: {
      type: String,
      default : 'pending'
    }
      
  },  
  { timestamps: true } //만든 날짜와 update시 날짜가 표시가 된다.
);
const proposals = mongoose.model("proposals", battingSchema); //1st모델의이름,2nd데이터

module.exports = {proposals}; //다른파일에서사용가능