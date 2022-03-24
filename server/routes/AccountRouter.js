

const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
   res.send(' accountInfoList Router test중입니다 성공!');
})



module.exports = router;






