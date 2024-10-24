import express from 'express';
import viewWelcomeMessage from "./view-welcome-message.js";
import viewHydrateLitComponents from "./view-hydrate-lit-components.js";

const app = express();

app.use((req, res, next) => {
    console.log('Incoming request:', Date.now());
    next();
});

app.get('/', viewWelcomeMessage);

app.use(express.text({ type: ['text/plain', 'text/html'] }));
app.use(express.urlencoded({ extended: true }));


app.post('/', viewHydrateLitComponents);

export default app;