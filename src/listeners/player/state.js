import isInt from 'validator/lib/isInt';

const playerStateListener = (socket, io) => {
  socket.on('player:state', async data => {
    try {
      let { state } = data;
      const validState =
        typeof state === 'number' && isInt(state + '', { min: 0, max: 2 });

      if (!validState) return;
      state = parseInt(state + '');

      io.rooms[socket.room].state = state;

      socket
        .to(socket.room)
        .emit('player:state', { state, username: socket.username });
    } catch (error) {
      console.error(error);
    }
  });
};

export default playerStateListener;
