// const fs = require('fs');
// const _ = require('lodash');
// const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const authRouter = require('./router/authRouter');
const listRouter = require('./router/listRouter');
const menuRouter = require('./router/menuRouter');
const filesRouter = require('./router/filesRouter');
const sListRouter = require('./router/sListRouter');
const financeRouter = require('./router/financeRouter');
const errorMiddleware = require('./middleware/errorMiddleware');
const diagramRouter = require('./router/diagramRouter');

// const ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(fileUpload({}));
app.use(express.static('public')); // статические файлы будут в папке public
app.use(express.json()); // подключаем автоматический парсинг json
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use('/menu', menuRouter);
app.use('/auth', authRouter);
app.use('/list', listRouter);
app.use('/files', filesRouter);
app.use('/s_list', sListRouter);
app.use('/finance', financeRouter);
app.use('/diagram', diagramRouter);
app.use('/storage/images', express.static('storage/images'));
app.use(errorMiddleware);

const mongoClient = new MongoClient(process.env.DB_URL);

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    return console.log(err);
  }
})();

// calendar
// app.get('/day_notes', async (req, res) => {
//   const date = req?.query?.date;
//   if (!date) return res.sendStatus(400);
//   const collection = req.app.locals.collection;
//   try {
//     const data = await collection.findOne({ date: +date });
//     const notes = data ? data.notes : [];
//     res.send(notes);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

// app.get('/month_notes', async (req, res) => {
//   const date = req?.query?.date;
//   if (!date) return res.sendStatus(400);
//   const collection = req.app.locals.collection;

//   const newDate = new Date(+date);
//   newDate.setDate(1);
//   const startDate = +newDate;

//   const newDate2 = new Date(+date);
//   newDate2.setDate(32);
//   const difference = newDate2.getDate();

//   newDate.setDate(32 - difference);
//   const finishDate = +newDate;

//   try {
//     const notes = await collection
//       .find({ date: { $gte: startDate, $lte: finishDate } })
//       .toArray();
//     res.send(notes);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });

// app.post('/day_notes', async (req, res) => {
//   const body = req.body;
//   if (!body) return res.sendStatus(400);
//   const date = body.date;
//   const notes = body.notes;
//   const collection = req.app.locals.collection;
//   try {
//     const data = await collection.findOne({ date: +date });
//     if (data) {
//       if (!notes.length) {
//         await collection.deleteOne({ date: +date });
//       }
//       await collection.updateOne({ date: +date }, { $set: { notes: notes } });
//     } else {
//       if (notes.length) {
//         await collection.insertOne({ notes, date });
//       }
//     }
//     res.sendStatus(200);
//   } catch (err) {
//     console.log(err);
//     res.sendStatus(500);
//   }
// });
//

// прослушиваем прерывание работы программы (ctrl-c)
process.on('SIGINT', async () => {
  await mongoClient.close();
  console.log('Приложение завершило работу');
  process.exit();
});
