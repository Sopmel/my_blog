const app = require('./app/app');
const { connect } = require('./config/mongoose');

const PORT = process.env.PORT || 3000;
const databaseUrl = process.env.databaseUrl;
const isProduction = process.env.NODE_ENV === 'production';

// Ange backendens URL beroende på om applikationen körs lokalt eller på produktion
const backendURL = isProduction ? 'https://my-blog-h7wn.onrender.com' : `http://localhost:${PORT}`;

// Anslut till databasen
async function run() {
    await connect(databaseUrl);
}

run();

// Starta servern
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

// Skicka med backendens URL till appen
app.set('backendURL', backendURL);


