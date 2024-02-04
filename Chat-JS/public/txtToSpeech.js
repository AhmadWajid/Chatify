  let isSpeaking = false; // Variable to track the current speech state
  let utterance = null; // Variable to hold the SpeechSynthesisUtterance instance

  function showContextMenu(event, bubble) {
    event.preventDefault(); // Prevent the default browser context menu
    $('#contextMenu').css({
      'left': event.pageX,
      'top': event.pageY
    }).show(); // Show the context menu at the clicked position
    $(bubble).addClass('active'); // Add 'active' class to the clicked bubble
  }

  function toggleSpeech() {
  const menuItem = $('#ttsMenuItem');
  const activeBubble = $('.msg-bubble.active');
  if (!isSpeaking) {
    const text = activeBubble.find('.msg-text').text(); // Get the text content of the active bubble
    const synth = window.speechSynthesis;
    utterance = new SpeechSynthesisUtterance(text);
    
    // Find an American English voice
    const voice = speechSynthesis.getVoices().find(voice =>
      voice.lang === 'en-US' && voice.name.includes('en-US')
    );
    
    if (voice) {
      utterance.voice = voice;
    } else {
      console.warn('No American English voice found.');
    }

    utterance.pitch = 1.0; // Adjust the pitch (0.1 - 2.0)
    utterance.rate = 1.0; // Adjust the rate (0.1 - 10.0)
    utterance.volume = 1.0; // Adjust the volume (0.0 - 1.0)

    synth.speak(utterance);
    isSpeaking = true;
    menuItem.text('Stop Speech'); // Update the context menu item label

    // Add an event listener to stop speech when the utterance finishes
    utterance.addEventListener('end', () => {
      isSpeaking = false;
      menuItem.text('Text to Speech'); // Update the context menu item label
      activeBubble.removeClass('active'); // Remove 'active' class from the bubble
    });
  } else {
    window.speechSynthesis.cancel(); // Stop the speech
    isSpeaking = false;
    menuItem.text('Text to Speech'); // Update the context menu item label
  }
  activeBubble.removeClass('active'); // Remove 'active' class from the bubble
  $('#contextMenu').hide(); // Hide the context menu
}
