///////////////////////////////////////////////
// server.js //////////////////////////////////
///////////////////////////////////////////////

// Contient le serveur ************************

//////////////////////////////////////////////////////////////////////////////////////////////
// Importe le package http de node:
const http = require("http");
/**
 * Si un nom de domaine est utilisé, la mise en place du HTTPS,
 * ce ferais en installant openssl et l'ajout du 's' à http,
 * ainsi que la création d'une clefs privé voir dans le dossier security, et l'ajout des lignes suivantes:
 *
 * var credentials = {
 * pfx: fs.readFileSync(__dirname + '/security/clefs_privee.pfx'),
 * passphrase:2101
 * }
 */

//////////////////////////////////////////////////////////////////////////////////////////////
// Importe l'application de app.js:
const app = require("./app");

//////////////////////////////////////////////////////////////////////////////////////////////
// La fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne:
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Par défaut en développement le port 3000 sera utiliser,
// dans le cas ou ce port n'est pas disponible, la variable environnement (.env) renvoie un port disponible:
const port = normalizePort(process.env.PORT || "3000");
// Dis à l'application sur quel port elle doit tourné:
app.set("port", port);

//////////////////////////////////////////////////////////////////////////////////////////////
// La fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée.
// Elle est ensuite enregistrée dans le serveur ;
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////
// Créer le serveur grâce à la méthode .createserver du package http
// en prenant comme argument la fonction de l'application qui sera appelée à chaque requête reçu par le serveur:
const server = http.createServer(app);

//////////////////////////////////////////////////////////////////////////////////////////////
// Gestions des événement serveur:
// Lance le serveur et gére les erreurs si elles existent:
server.on("error", errorHandler);

server.on("listening", () => {
  // L'écouteur d'évènements consigne le port ou le canal nommé sur lequel le serveur s'exécute dans la console:
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Ecoute le port définit en amont:
server.listen(port);
