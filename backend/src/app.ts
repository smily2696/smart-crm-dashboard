import express  from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes"
import leadRoutes from "./routes/leadRoutes"
import settingsRoutes from "./routes/settingsRoutes"
import dashboardRoutes
from "./routes/dashboardRoutes";
import errorMiddleware from "./middleware/errorMiddleware";
const app=express()

app.use(cors())
app.use(express.json());
app.use(errorMiddleware)
app.use("/api/auth",authRoutes);
app.use("/api/leads",leadRoutes);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/settings",
  settingsRoutes
);
app.get("/",(req,res)=>{
    res.send("API is running....")
})
export default app;