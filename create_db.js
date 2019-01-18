var mongoose = require('mongoose');

const db_uri = 'mongodb+srv://emtutor:agch782@cluster0-mmx6z.azure.mongodb.net/test?retryWrites=true';

var questionSchema = new mongoose.Schema({
    id: String,
    title: String,
    choices: [{ title: String, feedback: String }]
}, { collection: 'questions' });

var Question = mongoose.model('question', questionSchema);

var questions = [];

questions.push(new Question({ id: 'pwave', title: 'Millainen P-aalto?', choices: [ {title: 'Positiivinen', feedback: 'Jees!'}, {title: 'Bifaasinen', feedback: 'V&auml;&auml;rin meni.'}, {title: 'Negatiivinen', feedback: 'V&auml;&auml;rin meni.'}, {title: 'Ei P-aaltoja', feedback: 'V&auml;&auml;rin meni.'}] }));
questions.push(new Question({ id: 'regular', title: 'Onko rytmi s&auml;&auml;nn&ouml;llinen?', choices: [ {title: 'Kyllä', feedback: 'Oikein'}, {title: 'Ei', feedback: 'Onpas!'} ] }));
questions.push(new Question({ id: 'qrs', title: 'Millainen QRS-kompleksi?', choices: [ {title: 'Kapea', feedback: 'Oikein'}, {title: 'Leve&auml;', feedback: 'V&auml;&auml;rin.'} ] }));
questions.push(new Question({ id: 'qrsconclusion', title: 'Mit&auml; voit p&auml;&auml;tell&auml; t&auml;m&auml;n QRS-kompleksin kestosta?', choices: [ {title: 'Aktivaatio kulkee normaalisti johtoratoja pitkin.', feedback: 'Oikein'}, {title: 'Vasen kammio on laajentunut.', feedback: 'V&auml;&auml;rin.'} ] }));
questions.push(new Question({ id: 'st', title: 'Millainen on k&auml;yr&auml;n ST-v&auml;li?', choices: [ {title: 'ST-nousua', feedback: 'V&auml;&auml;rin.'}, {title: 'Normaali', feedback: 'Oikein'}, {title: 'ST-laskua', feedback: 'V&auml;&auml;rin.'}, {title: 'Varhainen repolarisaatio', feedback: 'V&auml;&auml;rin.'}] }));
questions.push(new Question({ id: 'twave', title: 'Millainen T-aalto?', choices: [ {title: 'Hyperakuutti', feedback: 'V&auml;&auml;rin.'}, {title: 'Normaali', feedback: 'Oikein'}, {title: 'Invertoitunut', feedback: 'V&auml;&auml;rin.'}] }));
questions.push(new Question({ id: 'rhythm', title: 'Mikä rytmi?', choices: [ {title: 'Kammiotakykardia', feedback: 'V&auml;&auml;rin.'}, {title: 'Sinusrytmi', feedback: 'Oikein'}, {title: 'Eteisvärinä', feedback: 'V&auml;&auml;rin.'}] }));

async function buildDatabase() {
    await mongoose.connect(db_uri, {dbName: 'emtutor', useNewUrlParser: true})

    try {
        await Question.collection.drop()
    } catch (e) {
        if (e.code === 26) {
            console.log('namespace %s not found', Question.collection.name)
        } else {
            throw e;
        }
    }
    await Question.insertMany(questions)
    await mongoose.disconnect();
}

buildDatabase();