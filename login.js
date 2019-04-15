const express = require('express');
const app = express();
const loginController = require('./controller/loginController.js');
app.set('view engine','ejs');
app.use(express.static('./public'));
loginController(app);
app.listen(1337);
console.log(`Server running on port 1337`);