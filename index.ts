// import socket from 'socket.io';
import { app } from "./src/app";

/**
 * Start Express server.
 */

const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env"),
  );
  console.log("  Press CTRL-C to stop\n");
});

// socket.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

process.on("SIGNIN", () => {
  server.close(() => console.log("Exit Server Express"));
});

export default server;
