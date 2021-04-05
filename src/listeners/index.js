import memberDisconnectListener from './member/disconnect';
import messageSendListener from './message/send';
import playerSeekListener from './player/seek';
import playerStateListener from './player/state';
import playerTimeListener from './player/time';
import playerVideoListener from './player/video';

const initListeners = io => {
  io.on('connection', async socket => {
    console.log(
      `'${socket.username}' (${socket.id}) has joined the room ${socket.room}`
    );

    memberDisconnectListener(socket, io);
    messageSendListener(socket, io);
    playerSeekListener(socket, io);
    playerStateListener(socket, io);
    playerTimeListener(socket, io);
    playerVideoListener(socket, io);
  });
};

export default initListeners;
