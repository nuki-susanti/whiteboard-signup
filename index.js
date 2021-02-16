require("dotenv").config();
const app = require('./app');
// console.log(app.get('env')); //express by default sets it as 'development'
// console.log(process.env);

const mongodbConnection = require('./src/config/database');



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App is running on ${port}`)
});