$(document).ready(function () {
  $("input.chat-input").keydown(chatBot);
  /// chatbot
  function chatBot() {
    if (event.which == 13 || event.keyCode == 13) {
      var messaggioUser = $("input.chat-input").val();
      // faccio il trim della stringa e la uso come controllo per vedere se e vuota 
      var controllo = messaggioUser.trim();
    //   se la stringa non e vuota invia il messaggio
      if (controllo.length != 0) {
        console.log(messaggioUser);
        var messageContent = $(".template .message-box").clone();
        $(".time time-message").addClass("text");
        messageContent.addClass("user-message");
        messageContent
          .find(".contact-message-text-content")
          .append(messaggioUser);
        console.log(messageContent);
        $(".container-chat__main-right-chat").append(messageContent);
        // richiamo funzione di risposta con un tempo fra 1 secondo e 4 secondi
        setTimeout(randomAnswere, numeroRandom(1000, 4000));
      }
    }
  }
  // funzione rispostarandom
  function randomAnswere() {
    var risposterandom = [
      "ciao",
      "Non ho il tuo numero ci conosciamo?",
      "Aspetta un minuto sono impegnato",
      "Bella come va?",
      "Ho una riunione sentiamoci dopo",
      "Hai visto Carol Baskin ha sottratto lo zoo a Joe exotic Lol",
      "Sono mega triste fra :(",
      "non hai capito Giulia mi ha lasciato",
    ];
    var risposta = risposterandom[numeroRandom(0, risposterandom.length - 1)];
    var messageContent = $(".template .message-box").clone();
    messageContent.addClass("contact-message");
    messageContent.find(".contact-message-text-content").append(risposta);
    $(".container-chat__main-right-chat").append(messageContent);
  }
});
function numeroRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
