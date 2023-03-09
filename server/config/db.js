const mongoose = require('mongoose')

const connectDB = async () => {
    const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
  try {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(process.env.MONGO_URI, connectionParams)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB