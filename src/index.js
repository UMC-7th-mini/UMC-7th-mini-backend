import express from "express";
import userRoutes from "./user/user.route.js";
import calendarRoutes from "./calendar/calendar.route.js";
import projectRoutes from "./project/project.route.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRoutes);
app.use("/calendar", calendarRoutes);
app.use("/projects", projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
