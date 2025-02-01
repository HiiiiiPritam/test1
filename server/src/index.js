import express from "express"
import dotenv from "dotenv"
import connectDB from "../db/dbConn.js";
import cors from 'cors'
import { app, server } from "./socket/initsocket.js";
import userRoutes from './routes/userRoutes.js'
import workspaceRouters from './routes/workspaceRoutes.js'

dotenv.config()
app.use(express.json())
app.use(cors({
  credentials:true
}))

const PORT =process.env.PORT  || 8000 ;

app.use('/api/user',userRoutes);
app.use('/api/workspace',workspaceRouters)

connectDB();

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
