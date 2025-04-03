import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;

// import mongoose from "mongoose";
// import colors from 'colors'

// const connectDb = async () => {
//   try {
//       console.log('MongoDB Connection String:', process.env.MONGO_URI); // Log the connection string
//       const conn = await mongoose.connect(process.env.MONGO_URI);
//       console.log(`Connected to database ${conn.connection.host}`.bgMagenta.white);
//   } catch (err) {
//       console.log(`Error in mongoDb ${err}`.bgRed.white);
//   }
// };

// export default connectDb