$(document).ready(function () {
  $("input.chat-input").keydown(chatBot);
  $("#send").click(chatBot);
  // /// chatbot
  function chatBot() {
    if (event.which === 13 || event.keyCode === 13 || event.type === "click") {
      var messaggioUser = $("input.chat-input").val();
      var lastSeen = $(".contanct-item-timing");
      // faccio il trim della stringa e la uso come controllo per vedere se e vuota
      var controllo = messaggioUser.trim();
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes();
      if (dt.getMinutes() < 10) {
        var time = dt.getHours() + ":" + 0 + dt.getMinutes();
      }
      //   se la stringa non e vuota invia il messaggio
      if (controllo.length != 0) {
        var messageContent = $(".template .message-box").clone();
        $(".time time-message").addClass("text");
        messageContent.addClass("user-message");
        messageContent.find(".time-message").text(time);
        messageContent.find(".time-message").addClass("text-right");
        messageContent
          .find(".contact-message-text-content")
          .append(messaggioUser);
        console.log(messageContent);
        $(".container-chat__main-right-chat").append(messageContent);
        // mentre il messaggio viene scritto appare la scritta typing dove c'e l'accesso...
        $(".container-chat__header-right-info-text").text(
            'Typing...'
          );
         // richiamo funzione di risposta con un tempo fra 1 secondo e 4 secondi
        setTimeout(randomAnswere, numeroRandom(2000, 4000));
        lastSeen.text(time);
        $("input.chat-input").val("");
      }
    }
  }
  // funzione rispostarandom
  function randomAnswere() {
    var risposterandom = [
      "Fra non posso rispondere ora",
      "Non ho il tuo numero ci conosciamo?",
      "Aspetta un minuto sono impegnato",
      "Riunione!!!",
      "Ho una riunione sentiamoci dopo",
      "Hai visto Carol Baskin ha sottratto lo zoo a Joe exotic Lol, poi ti dico ora non posso parlare",
      "Sono mega triste fra :(, ma ora non posso parlare sono in riunione",
      "non hai capito Giulia mi ha lasciato, poi ti dico ora sto impicciato",
    ];
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes();
    if (dt.getMinutes() < 10) {
      var time = dt.getHours() + ":" + 0 + dt.getMinutes();
    }
    var risposta = risposterandom[numeroRandom(0, risposterandom.length - 1)];
    var messageContent = $(".template .message-box").clone();
    messageContent.addClass("contact-message");
    messageContent.find(".time-message").text(time);
    messageContent.find(".contact-message-text-content").append(risposta);
    messageContent.find(".time-message").addClass("text-left");
    $(".container-chat__main-right-chat").append(messageContent);
    $(".container-chat__header-right-info-text").text(
      "Ultimo Accesso oggi" + time
    );
  }
});
function numeroRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
