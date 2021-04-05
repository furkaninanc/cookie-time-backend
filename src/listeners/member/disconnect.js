const memberDisconnectListener = (socket, io) => {
  socket.on('disconnect', async () => {
    socket.leave(socket.room);
    io.rooms[socket.room].members = io.rooms[socket.room].members.filter(
      member => member.socket !== socket.id
    );

    console.log(
      `'${socket.username}' (${socket.id}) has left the room ${socket.room}`
    );

    io.of('/')
      .to(socket.room)
      .emit('member:leave', { username: socket.username });
  });
};

export default memberDisconnectListener;
