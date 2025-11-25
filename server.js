const express = require("express");
const app = express();

// Serve the built Vite files
app.use(express.static("dist"));

// Listen on the port Render provides
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
