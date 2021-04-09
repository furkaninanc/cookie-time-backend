import memberDisconnectListener from './member/disconnect';
import messageSendListener from './message/send';
import playerBufferListener from './player/buffer';
import playerSeekListener from './player/seek';
import playerSpeedListener from './player/speed';
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
    playerBufferListener(socket, io);
    playerSeekListener(socket, io);
    playerSpeedListener(socket, io);
    playerStateListener(socket, io);
    playerTimeListener(socket, io);
    playerVideoListener(socket, io);
  });
};

export default initListeners;
