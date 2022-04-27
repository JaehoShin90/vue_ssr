// express 초기화
const express = require("express");
const router = require('./router/main')
const app = express();

app.use(express.json())
// /server/public 폴더를 static으로 등록
app.use(express.static('./public'))
app.use(router)

app.listen(3000, () => {
    console.log('listen to http://localhost:3000')
})