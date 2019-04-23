const mongoose = require('mongoose');
const Quiz = require('./server/models/quiz');

const dbURI = 'mongodb+srv://emtutor:agch782@cluster0-mmx6z.azure.mongodb.net/test?retryWrites=true';

let questions = [];

questions.push({ title: 'Millainen P-aalto?', choices: [ {title: 'Positiivinen', feedback: 'Jees!', isCorrect: true}, {title: 'Bifaasinen', feedback: 'Väärin meni', isCorrect: false}, {title: 'Negatiivinen', feedback: 'Väärin meni', isCorrect: false}, {title: 'Ei P-aaltoja', feedback: 'Väärin meni', isCorrect: false}] });
questions.push({ title: 'Onko rytmi säännöllinen?', choices: [ {title: 'Kyllä', feedback: 'Oikein', isCorrect: true}, {title: 'Ei', feedback: 'Onpas!', isCorrect: false} ] });
questions.push({ title: 'Millainen QRS-kompleksi?', choices: [ {title: 'Kapea', feedback: 'Oikein', isCorrect: true}, {title: 'Leveä', feedback: 'Väärin', isCorrect: false} ] });
questions.push({ title: 'Mitä voit päätellä tämän QRS-kompleksin kestosta?', choices: [ {title: 'Aktivaatio kulkee normaalisti johtoratoja pitkin.', feedback: 'Oikein', isCorrect: true}, {title: 'Vasen kammio on laajentunut.', feedback: 'Väärin', isCorrect: false} ] });
questions.push({ title: 'Millainen on käyrän ST-väli?', choices: [ {title: 'ST-nousua', feedback: 'Väärin', isCorrect: false}, {title: 'Normaali', feedback: 'Oikein', isCorrect: true}, {title: 'ST-laskua', feedback: 'Väärin', isCorrect: false}, {title: 'Varhainen repolarisaatio', feedback: 'Väärin', isCorrect: false}] });
questions.push({ title: 'Millainen T-aalto?', choices: [ {title: 'Hyperakuutti', feedback: 'Väärin', isCorrect: false}, {title: 'Normaali', feedback: 'Oikein', isCorrect: true}, {title: 'Invertoitunut', feedback: 'Väärin', isCorrect: false}] });
questions.push({ title: 'Mikä rytmi?', choices: [ {title: 'Kammiotakykardia', feedback: 'Väärin', isCorrect: false}, {title: 'Sinusrytmi', feedback: 'Oikein', isCorrect: true}, {title: 'Eteisvärinä', feedback: 'Väärin', isCorrect: false}] });

const quizzes = [];

quizzes.push(new Quiz({ title: 'ECG quiz!', description: 'this is an ecg quiz.', questions}));

questions = [];

questions.push({ title: 'Test question 0', choices: [ {title: 'Test answer 0', feedback: 'Test feedback 0', isCorrect: false}, {title: 'Test answer 1', feedback: 'Test feedback 1', isCorrect: true}] });
questions.push({ title: 'Test question 1', choices: [ {title: 'Test answer 2', feedback: 'Test feedback 2', isCorrect: true}, {title: 'Test answer 3', feedback: 'Test feedback 3', isCorrect: false}] });

quizzes.push(new Quiz({ title: 'TEST quiz!', description: 'this is a test quiz.', questions}));

questions = [];

questions.push({ title: 'Test question 2', choices: [ {title: 'Test answer 4', feedback: 'Test feedback 4', isCorrect: true}, {title: 'Test answer 5', feedback: 'Test feedback 5', isCorrect: false}] });
questions.push({ title: 'Test question 3', choices: [ {title: 'Test answer 6', feedback: 'Test feedback 6', isCorrect: false}, {title: 'Test answer 7', feedback: 'Test feedback 7', isCorrect: true}] });

quizzes.push(new Quiz({ title: 'TEST quiz 2!!!', description: 'this is another test quiz.', questions}));

questions = [];
questions.push({ title: 'Milloin lääkkeen saa puolittaa ', choices: [ {title: 'Kun siinä on jakoviiva', feedback: 'oikein', isCorrect: true}, {title: 'Aina', feedback: 'väärin', isCorrect: false}] });
questions.push({ title: 'Potilaalle on määrätty lääkettä 360 mg vuorokaudessa. Lääke annetaan aamulla ja illalla. Yhdessä lääkkeessä on 120 mg. Kuinka monta tablettia annat kerralla?', choices: [ {title: '1', feedback: 'Väärin oikea vastaus 1,5', isCorrect: false}, {title: '1,5', feedback: 'oikein', isCorrect: true}] });

quizzes.push(new Quiz({ title: 'pharmaceutical quiz', description: 'this is another test quiz.', questions}));




async function buildDatabase() {
    await mongoose.connect(dbURI, { dbName: 'emtutor', useNewUrlParser: true });

    try {
        await Quiz.collection.drop()
    } catch (e) {
        if (e.code === 26) {
            console.log('namespace %s not found', Quiz.collection.name);
        } else {
            throw e;
        }
    }
    await Quiz.insertMany(quizzes)
    await mongoose.disconnect();
}

buildDatabase();