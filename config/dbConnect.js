const {default :mongoose} = require("mongoose");
const dbConnect = () => {
        try {
                const conn = mongoose.connect(process.env.MONGODB_URL);
                console.log("Database connection successful");
        }
        catch(error){
                console.log("Database connection failed. Error: " + error.message);
        }
}

module.exports=dbConnect;