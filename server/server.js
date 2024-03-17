const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;
const departmentRouter = require("./routes/department-controller");
app.use(express.static("../client/dist"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/departments", departmentRouter);

require("./routes/htmlRoutes")(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
