const mysql=require("mysql");


const db=mysql.createConnection({
  host: 'trolley.proxy.rlwy.net',  // Railway MySQL host
  user: 'root',                    // Username from Railway (typically root)
  password: 'gFLLlCQVHsqnHJNLBMoggHohVnUJzbiC',  // Password from Railway
  database: 'railway',             // Database name from Railway
  port: 27708                      // Railway MySQL port
});


// Connecting to the database
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the Railway MySQL database');
});

module.exports=db;
