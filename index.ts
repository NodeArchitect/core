// app.js
import * as http from 'node:http';
import Router from "./router.js";
const router = new Router();

// Définissez les routes
router.addRoute('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bienvenue sur la page d\'accueil !');
});

router.addRoute('/about', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('À propos de nous.');
});

// Créez le serveur HTTP
const server = http.createServer((req, res) => {
  router.routeRequest(req, res);
});

// Écoutez sur le port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
