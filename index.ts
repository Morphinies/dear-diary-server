const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || 'mongodb://127.0.0.1:27017/dear_diary';

import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as fileUpload from 'express-fileupload';

require('dotenv').config();
import * as express from 'express';
import * as mongoose from 'mongoose';
import listRouter from './routers/listRouter';
import menuRouter from './routers/menuRouter';
import graphRouter from './routers/graphRouter';
import filesRouter from './routers/filesRouter';
import sListRouter from './routers/sListRouter';
import authRouter from './routers/authRouter';
import diagramRouter from './routers/diagramRouter';
import calendarRouter from './routers/calendarRouter';
import errorMiddleware from './middleware/errorMiddleware';

import { MongoClient } from 'mongodb';

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
app.use('/graph', graphRouter);
app.use('/s_list', sListRouter);
app.use('/diagram', diagramRouter);
app.use('/calendar', calendarRouter);
app.use('/storage/images', express.static('storage/images'));
app.use(errorMiddleware);

const mongoClient = new MongoClient(DB_URL);

(async () => {
  try {
    await (mongoose.connect as any)(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (err) {
    return console.log(err);
  }
})();

// прослушиваем прерывание работы программы (ctrl-c)
process.on('SIGINT', async () => {
  await mongoClient.close();
  console.log('Приложение завершило работу');
  process.exit();
});
