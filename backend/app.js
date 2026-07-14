import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminRoutes from "./src/routes/admin.js"
import customerRoutes from "./src/routes/customer.js"
import loginAdminRoutes from "./src/routes/loginAdmin.js"
import loginCustomerRoutes from "./src/routes/loginCustomer.js"
import registerAdminRoutes from "./src/routes/registerAdmin.js"
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import boletosRoutes from "./src/routes/boletos.js"
import wompiRoutes from "./src/routes/wompi.js"
import logoutRoutes from "./src/routes/logout.js"
import { validateAuthCookie } from "./src/middlewares/authMiddleware.js"; 

const app = express();

app.use(
    cors({
        origin:["http://localhost5173", "hhtp://localhost:5174"],
            credentials: true,
    }),
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/admins", adminRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/adminsLogin", loginAdminRoutes);
app.use("/api/customersLogin", loginCustomerRoutes);
app.use("/api/adminsRegister", registerAdminRoutes);
app.use("/api/customersRegister", registerCustomerRoutes);
app.use("/api/logout", logoutRoutes);
app.use("/api/wompi", wompiRoutes);
app.use("/api/boletos",boletosRoutes);

export default app;