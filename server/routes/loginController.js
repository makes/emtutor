const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://root:Blockbuster@cluster0-e1c76.azure.mongodb.net/?retryWrites=true';


module.exports = ((app) => {
    app.get('/', (req, res) => {
        res.render('home');
    });
    app.get('/register', (req, res) => {
        res.render('register');
    });
    app.get('/login', (req, res) => {
        res.render('login');
    });

    // Login TO DB==================================================================
    app.post('/demo', urlencodedParser, (req, res) => {
        console.log('demo');
        MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
            console.log(`error? ${err}`);
            const db = client.db('UserSchema');
            console.log(db);
            db.collection('User').findOne({ name: req.body.name }, (error, user) => {
                if (user === null) {
                    res.end('Login invalid');
                } else if (user.name === req.body.name && user.pass === req.body.pass) {
                    res.render('completeprofile', { profileData: user });
                } else {
                    console.log('Credentials wrong');
                    res.end('Login invalid');
                }
            });
        });
    });


    // register to DB================================================================
    app.post('/regiterToDb', urlencodedParser, (req, res) => {
        console.log('register to db?');
        // const obj = JSON.stringify(req.body);
        // const jsonObj = JSON.parse(obj);
        res.render('profile', { loginData: req.body });
    });

    // register profile to MongoDB================================================================
    app.post('/completeprofile', urlencodedParser, (req, res) => {
        const obj = JSON.stringify(req.body);
        console.log(`Final reg Data: ${obj}`);
        const jsonObj = JSON.parse(obj);


        MongoClient.connect(url, (err, client) => {
            const db = client.db('UserSchema');
            console.log(db);
            db.collection('User').insertOne(jsonObj, (error) => {
                if (error) throw error;
                console.log('1 document inserted');
                client.close();
            });
            res.render('completeprofile', { profileData: req.body });
        });
    });
});
