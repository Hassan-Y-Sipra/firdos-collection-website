const mysql=require("mysql");


const db=mysql.createConnection({
     host: "trolley.proxy.rlwy.net",
    user: "root",
    password: "gFLLlCQVHsqnHJNLBMoggHohVnUJzbiC",
    database: "valudas",
    port: 27708
});

module.exports=db;
