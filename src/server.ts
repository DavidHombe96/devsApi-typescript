import express from 'express';
import http from 'node:http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dbconnect from "./config/db";
// import path from "node:path";
import morgan from "morgan";


import  authenticationRoutes from './router/authentication';
import  usersRoutes from './router/users';


const app = express();

app.use(cors({
    credentials:   true,
}))

// ================== Static Files =============
// app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));

// ================= routes ================
app.use('/', authenticationRoutes);
app.use('/', usersRoutes);

//  =========== database connection ============= 
dbconnect();



// ==============  server config  ===========
const port = 8080;
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});