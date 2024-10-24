import app from "./src/create-app.js";

const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
