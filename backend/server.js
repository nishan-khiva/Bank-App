require('dotenv').config();
const express = require('express');
const cors = require('cors');          
require('./models/db'); 
// const registerRouter = require('./router/LoginRouter'); // Import the router
const employeeApi = require('./router/EmployeeRouter')
const custumerApi = require('./router/CustumerRouter'); 
const cusAccountApi = require('./router/CusAccountRouter');

const app = express();
app.use(cors());
app.use(express.json()); 
const PORT = process.env.PORT; 

// app.use('/api', registerRouter);
app.use('/api/emply', employeeApi)
app.use('/api/custumer', custumerApi); 
app.use('/api', cusAccountApi);
app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
    res.send('Welcome to SafeBank API');
});
app.listen(PORT, () => {
    console.log(`Server is Start ${PORT}`);
})
