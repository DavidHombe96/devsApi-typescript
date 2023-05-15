import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'express';
import compression from 'compression';
import cors from 'cors';
import dbconnect from "./config/db";
// import path from "node:path";
// import routes from "./router";
import morgan from "morgan";
const app = express();

app.use(cors({
    credentials:   true,
}))


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(routes);
app.use(morgan("dev"));


//  =========== database connection ============= 
dbconnect();

// ==============  server config  ===========
const port: number = 8080;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});