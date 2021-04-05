import isLength from 'validator/lib/isLength';
import { v4 as uuidv4 } from 'uuid';

const messageSendListener = (socket, io) => {
  socket.on('message:send', data => {
    try {
      let { content } = data;
      const validContent =
        typeof content === 'string' &&
        isLength(content.trim(), { min: 1, max: 500 });

      if (!validContent) return;
      content = content.trim();

      io.of('/')
        .to(socket.room)
        .emit('message:receive', {
          id: uuidv4(),
          owner: socket.username,
          content,
        });
    } catch (error) {
      console.error(error);
    }
  });
};

export default messageSendListener;
