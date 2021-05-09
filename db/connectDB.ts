import mongoose from 'mongoose';
const connectDB = async (): Promise<void> => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  await mongoose.connect(<string>process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  });

  mongoose.connection.on('connected', () => {
    console.log('connected to mongo');
  });
  mongoose.connection.on('error', (error) => {
    console.log('error connecting', error);
  });
};

export default connectDB;
