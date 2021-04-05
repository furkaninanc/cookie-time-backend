import { createServer } from 'http';
import socketio from 'socket.io';

import initListeners from './listeners';
import { authMiddleware } from './utils/auth';

const app = createServer();
const io = socketio(app, {
  cors: '*',
  upgrade: false,
  transports: ['websocket'],
});

app.listen(process.env.PORT || 80);

export const start = () => {
  io.rooms = {};
  io.use(authMiddleware);
  initListeners(io);
};
