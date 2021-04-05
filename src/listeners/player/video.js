import isURL from 'validator/lib/isURL';

const playerVideoListener = (socket, io) => {
  socket.on('player:video', async data => {
    try {
      let { video } = data;
      const validUrl = typeof video === 'string' && isURL(video);

      if (!validUrl) return;

      io.rooms[socket.room].video = video;

      io.of('/')
        .to(socket.room)
        .emit('player:video', { video, username: socket.username });
    } catch (error) {
      console.error(error);
    }
  });
};

export default playerVideoListener;
