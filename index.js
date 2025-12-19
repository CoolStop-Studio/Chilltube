import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileFolder = join(__dirname, 'public');
const fileName = "main/main.html";

app.use(express.static(fileFolder, { redirect: false }));

const pages = {
  "/": "main/main.html",
  "/search": "search/search.html",
  "/video": "video/video.html",
};

// Serve the main application page
Object.entries(pages).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    res.sendFile(join(fileFolder, file));
  });
});

app.get('/{*any}', (req, res) => {
  res.status(404).send('Page not found (bruh type the url right)');
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});