const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://goquezadag:Gilson.1995@cluster0.in07y.mongodb.net/my_app_node?retryWrites=true&w=majority&appName=Cluster0', {
           useNewUrlParser: true,
           useUnifiedTopology: true
        });
        console.log('MongoDB connected to my_app_node');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;