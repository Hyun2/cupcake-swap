const express = require('express');
const app = express();
const { sequelize } = require('./database/models');
//router import
const accountRouter = require('./routes/AccountRouter')
const swapRouter = require('./routes/swapRouter')



// '/'로 들어오는 요청은 기본적으로 indexRouter로 이동해서 된다.
app.use('/account', accountRouter)
app.use('/swap', swapRouter);


sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

  


app.listen(5000, () => {
    console.log('5___port started1');
})