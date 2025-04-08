const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,"../../client/public/uploads"))
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    },
});
const location=multer({storage:storage})

module.exports={
    location
}



// const multer = require("multer");
// const path = require("path");

// // Define storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads"); // Path to store files
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // Create unique filenames
//   },
// });

// // File filter to accept only images
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Unsupported file format"), false);
//   }
// };

// // Initialize multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1024 * 1024 * 5 }, // Max file size: 5MB
//   fileFilter: fileFilter,
// });

// // Export multer middleware
// module.exports = {
//   location: upload,
// };
