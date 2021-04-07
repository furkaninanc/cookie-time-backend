import isFloat from 'validator/lib/isFloat';

const playerTimeListener = (socket, io) => {
  socket.on('player:time', async data => {
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

      io.of('/')
        .to(socket.room)
        .emit('member:time', { username: socket.username, time });
    } catch (error) {
      console.error(error);
    }
  });
};

export default playerTimeListener;
