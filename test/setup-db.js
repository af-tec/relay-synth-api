var mongoose = require('mongoose');
var MemoryServer = require('mongodb-memory-server');


let mongoServer;

const opts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

before(async () => {
    mongoServer = new MemoryServer.MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);
    console.log('connected to test db');
});
after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log('disconnected from test db');
})
