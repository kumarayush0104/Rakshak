import mongoose from 'mongoose';
import colors from 'colors';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }).then(mongoose => {
      console.log(`Connected To MongoDB Database ${mongoose.connection.host}`.bgMagenta.white);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.log(`Error in MongoDB ${error}`.bgRed.white);
    throw error;
  }

  return cached.conn;
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