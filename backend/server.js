const app = require('./app/app');

const { connect } = require('./config/mongoose');

const PORT = process.env.PORT || 3000

const databaseUrl = process.env.databaseUrl

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

async function run() {
    await connect(databaseUrl)
};

run();

