// watcher.js
import * as fs from 'node:fs';
import { fork } from 'child_process';

let appProcess;

function startApp() {
  appProcess = fork('index.js'); // Remplacez 'app.js' par le nom de votre fichier principal.
  console.log('Application démarrée...');
}

startApp();

// Surveillez les changements dans le dossier courant
fs.watch('.', { recursive: true }, (event, filename) => {
  if (filename.endsWith('.js') || filename.endsWith('.ts')) {
    console.log(`${filename} a changé. Redémarrage de l'application...`);
    appProcess.kill();
    startApp();
  }
});
