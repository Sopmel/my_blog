const app = require('./app/app');

const { connect } = require('./config/mongoose');

const PORT = process.env.PORT || 3000

const MONGODB_LIVE_URI = process.env.MONGODB_LIVE_URI

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

async function run() {
    await connect(MONGODB_LIVE_URI)
};

run();

