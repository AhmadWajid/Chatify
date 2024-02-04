const go = require('./cogs/fun.js');
const validUrl = require('valid-url');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ai = require('./cogs/ai.js');

app.use(express.static('public'));

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

// Create an object to store the active AI status for each socket ID
const activeAI = {};

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/chat', function(req, res) {
  res.sendFile(__dirname + '/views/chat.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', async function(msg) {
    if (isEmptyOrSpaces(msg.msg)) {
      return;
    } else {
      // Send the chat message only to the sender's room
      io.to(socket.id).emit('chat message', { person: 'person', msg: msg.msg });
    }

    if (msg.msg.toLowerCase() === 'ai start') {
      activeAI[socket.id] = true;
      io.to(socket.id).emit('chat message', { person: 'bot', msg: 'AI activated. Enter your commands. Start with `pls help`' });
      return;
    }

    if (msg.msg.toLowerCase() === 'ai stop') {
      activeAI[socket.id] = false;
      io.to(socket.id).emit('chat message', { person: 'bot', msg: 'AI deactivated.' });
      return;
    }

    if (activeAI[socket.id] == true) {
      const aiResponse = await ai.ai(msg.msg);
      io.to(socket.id).emit('chat message', { person: 'bot', msg: aiResponse });
    } else {
      if (msg.msg.toLowerCase() === 'pls cat') {
        setTimeout(async function() {
          const x = await go.cat();
          const htmlResponse = `<img src="${x}"/>`;
          io.to(socket.id).emit('chat message', { person: 'bot', msg: htmlResponse });
        }, 500);
      }

      if (msg.msg.toLowerCase() === 'pls quote') {
        const quote = await go.go();
        io.to(socket.id).emit('chat message', { person: 'bot', msg: quote });
      }
      if (msg.msg.toLowerCase() === 'pls help') {
        io.to(socket.id).emit('chat message', { person: 'bot', msg: `
        This web chat comes with many commands:
        AI:
          Activate using the command "ai start"
          Deactivate using "ai stop"
          * Anything that you send while the activation command is sent will be processed through the ai.
        Fun Commands:
          pls cat : Generates random cat image.
          pls quote: Geerates random quote.
          *Commands only work when AI is deactivated.` });
      }
    }
  });

  socket.on('disconnect', function() {
    // Leave the room when the user disconnects
    socket.leave(socket.id);

    // Remove the AI activation status for the disconnected socket
    delete activeAI[socket.id];
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
