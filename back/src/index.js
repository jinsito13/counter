import pgp from "./db.js";
import express from "express";
import {getCont, createCont, deleteCont, getContById, updateCont, IncCont, decrCont} from "./../controller/routes.js";
import bodyParser from 'body-parser';
import cors from "cors";
//db
const db = pgp("postgres://postgres:othinus13@localhost:5432/appcont");
//server
const app = express()
const port = 5000
app.use(express.json());
//middleware
app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
//cors enable
    app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

//endpoints
app.post('/create/contador', createCont);
app.get('/contadores', getCont);
app.get('/contadores/:id', getContById);
app.delete('/delete/contadores/:id', deleteCont);
app.put('/update/contadores/:id', updateCont);
app.put('/increment/contadores/:id', IncCont);
app.put('/decrease/contadores/:id', decrCont);