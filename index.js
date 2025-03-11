import 'dotenv/config'
import "./database/connect.js"
import express from 'express';
import authRouter from './routes/auth.route.js'
const app = express();

app.use(express.json());
app.use('/api/v1', authRouter)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>console.log('listening on port 4000, http://localhost:4000 ' + PORT));