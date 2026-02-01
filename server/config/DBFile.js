const dotenv=require('dotenv')
dotenv.config()
const mongoose=require('mongoose');

const connection =async () => {
 try {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`DB is connected`);
  
 } catch (error) {
  console.log(`DB is Disconnected ${error}`);
  
  
 }
}
module.exports=connection