import isFloat from 'validator/lib/isFloat';

const playerSeekListener = (socket, io) => {
  socket.on('player:seek', async data => {
    try {
      let { time } = data;
      const validTime =
        typeof time === 'number' && isFloat(time + '', { min: 0, max: 86400 });

      if (!validTime) return;
      time = parseFloat(time + '');

      io.rooms[socket.room].members = io.rooms[socket.room].members.map(
        member => {
          if (member.socket === socket.id) {
            member.time = time;
          }

          return member;
        }
      );

      socket
        .to(socket.room)
        .emit('player:seek', { time, username: socket.username });
    } catch (error) {
      console.error(error);
    }
  });
};

export default playerSeekListener;
