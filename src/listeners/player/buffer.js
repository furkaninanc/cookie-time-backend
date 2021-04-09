const playerBufferListener = (socket, io) => {
  socket.on('player:buffer', async () => {
    try {
      io.rooms[socket.room].state = 0;

      socket
        .to(socket.room)
        .emit('player:buffer', { username: socket.username });
    } catch (error) {
      console.error(error);
    }
  });
};

export default playerBufferListener;
