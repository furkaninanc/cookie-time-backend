import isIn from 'validator/lib/isIn';

const playerSpeedListener = (socket, io) => {
  socket.on('player:speed', async data => {
    try {
      let { speed } = data;
      const validSpeed =
        typeof speed === 'number' &&
        isIn(speed + '', [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 4]);

      if (!validSpeed) return;

      io.rooms[socket.room].speed = speed;

      socket
        .to(socket.room)
        .emit('player:speed', { speed, username: socket.username });
    } catch (error) {
      console.error(error);
    }
  });
};

export default playerSpeedListener;
