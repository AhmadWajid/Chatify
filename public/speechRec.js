if ("webkitSpeechRecognition" in window) {
  // Initialize webkitSpeechRecognition
  let speechRecognition = new webkitSpeechRecognition();

  // String for the Final Transcript
  let final_transcript = "";

  // Set the properties for the Speech Recognition object
  speechRecognition.continuous = true;
  speechRecognition.interimResults = true;
  speechRecognition.lang ='en-US'

  // Callback Function for the onStart Event
  speechRecognition.onstart = () => {
    // Show the Status Element
    document.querySelector("#status").style.display = "block";
  };
  speechRecognition.onerror = () => {
    // Hide the Status Element
    document.querySelector("#status").style.display = "none";
  };
  speechRecognition.onend = () => {
    // Hide the Status Element
    document.querySelector("#status").style.display = "none";
  };

let interim_transcript = ""; // Store interim transcript

speechRecognition.onresult = (event) => {
  interim_transcript = ""; // Clear previous interim transcript

  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript += event.results[i][0].transcript;
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }

  // Display the combined transcript (interim and final)
  $('#m').val(final_transcript + interim_transcript);
};

speechRecognition.onend = () => {
  // Update the final transcript when speech recognition is stopped
  final_transcript += interim_transcript;
  interim_transcript = "";

  // Display the final transcript
  $('#m').val(final_transcript);
};


  // Set the onClick property of the start button
  document.querySelector("#start").onclick = () => {
    $("#start").css('background', 'gray')
    $("#stop").css('background', '#dc3545')
    final_transcript = ""
    speechRecognition.start();
  };
  // Set the onClick property of the stop button
  document.querySelector("#stop").onclick = () => {
     $("#start").css('background', '#198754')
    $("#stop").css('background', 'gray')
    // Stop the Speech Recognition
    speechRecognition.stop();
  };
} else {
  console.log("Speech Recognition Not Available");
}