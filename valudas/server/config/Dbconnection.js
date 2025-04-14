const mysql=require("mysql");


const db=mysql.createConnection({
     host: 'trolley.proxy.rlwy.net',  // Railway MySQL host
  user: 'root',                    // Username from Railway (typically root)
  password: 'gFLLlCQVHsqnHJNLBMoggHohVnUJzbiC',  // Password from Railway
  database: 'railway',             // Database name from Railway
  port: 27708                      // Railway MySQL port
});

module.exports=db;
