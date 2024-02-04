const savedMessages = localStorage.getItem('chatMessages');
const messages = savedMessages ? JSON.parse(savedMessages) : [];

// Function to render the messages on the page
function renderMessages() {
  const chatContainer = document.getElementById('msger-chat');
  chatContainer.innerHTML = '';

  messages.forEach((msg) => {
    const messageClass = msg.person === 'bot' ? 'left-msg' : 'right-msg';
    const messageBubble = `
      <div class="msg ${messageClass}">
        <div class="msg-bubble" oncontextmenu="showContextMenu(event, this)">
          <div class="msg-text">${msg.msg}</div>
        </div>
      </div>
    `;
    chatContainer.innerHTML += messageBubble;
  });

  // Scroll to the bottom of the chat container
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Load previously saved messages when the page is loaded
window.addEventListener('load', function () {
  if(localStorage.getItem('chatMessages') != null) {
    renderMessages()
  }
});

// Function to save messages to local storage
function saveMessages() {
  localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Function to erase the saved messages
function eraseMessages() {
  localStorage.removeItem('chatMessages');
  messages.length = 0; // Clear the messages array
  renderMessages(); // Render an empty message list on the page
}

// Submit message event listener

// Socket.io code
$(function () {
  const socket = io();

  socket.on('chat message', function (msg) {
    messages.push(msg);
    renderMessages();
    saveMessages();
  });
});
window.getCount = function (parent, getChildrensChildren) {
	var relevantChildren = 0;
	var children = parent.childNodes.length;
	for (var i = 0; i < children; i++) {
		if (parent.childNodes[i].nodeType != 3) {
			if (getChildrensChildren)
				relevantChildren += getCount(parent.childNodes[i], true);
			relevantChildren++;
		}
	}
	return relevantChildren;
}
document.onkeydown = function(e) {
  // if(event.keyCode == 123) {
  //    return false;
  // }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}

function urlify(text) {
      var urlRegex = /(https?:\/\/[^\s]+)/g;
      return text.replace(urlRegex, '<a href="$1">$1</a>')
}

document.addEventListener('keydown', function() {
    if (event.keyCode == 123) {
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
      return false;
    } else if (event.ctrlKey && event.keyCode == 85) {
      return false;
    }
  }, false);
  
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      window.event.returnValue = false;
    });
  }


$(function () {
  var socket = io();

  $('#form').submit(function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const input = $('#m');
    const message = input.val().trim();
    if (message !== '') {
      const newMessage = { person: 'person', msg: message };
      messages.push(newMessage);
      socket.emit('chat message', newMessage);
      saveMessages();
      input.val('');
    }
  });
	socket.on('chat message', function (msg) {
		const out = document.getElementById("msger-chat")
		x = getCount(document.getElementById('msger-chat'))
		var n;
		if (msg.person == "bot") {
			n = `<div class="msg-bubble" oncontextmenu="showContextMenu(event, this)"><div class="msg-text">${msg.msg}</div> </div> </div>`
      const newMessage = { person: 'bot', msg: msg.msg };
      messages.push(newMessage);
      saveMessages();
    } else {
			n = `<div class="msg right-msg"> <div class="msg-bubble" oncontextmenu="showContextMenu(event, this)"> <div class="msg-text">${msg.msg}</div> </div> </div>`
		}
    $("#form")[0].reset();
    var btn = $('#submitter');
    btn.prop('disabled', true);
    setTimeout(function(){
        btn.prop('disabled', false);
    }, 1500);
		const isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1
		$('#msger-chat').append($(n));
		if (isScrolledToBottom) {
			out.scrollTop = out.scrollHeight - out.clientHeight
		}
	});
});

function openPopup() {
    $('#popup').modal('show');
  }
$('.remover').click(function () {
  eraseMessages();
});