$(document).ready(function () {
  $("input.chat-input").keydown(chatBot);
  function chatBot() {
    if (event.which == 13 || event.keyCode == 13) {
      var messaggioUser = $("input.chat-input").val();
      console.log(messaggioUser);
      var messageContent = $(".template .message-box").clone();
      $('.time time-message').addClass('text');
      messageContent.addClass('user-message');
      messageContent.find(".contact-message-text-content").append(messaggioUser);
      console.log(messageContent);
      $(".container-chat__main-right-chat").append(messageContent);
      setTimeout(randomAnswere,numeroRandom(1000,4000));
    };
  };
  function randomAnswere () {
    var risposterandom = [
      "ciao",
      "Non ho il tuo numero ci conosciamo?",
      "Aspetta un minuto sono impegnato",
      "Bella come va?",
      "Ho una riunione sentiamoci dopo",
      "Hai visto Carol Baskin ha sottratto lo zoo a Joe exotic Lol",
      "Sono mega triste fra :(",
      "non hai capito Giulia mi ha lasciato"
    ];
    var risposta = risposterandom[numeroRandom(0,risposterandom.length-1)];
    var messageContent = $(".template .message-box").clone();
    messageContent.addClass('contact-message');
    messageContent.find(".contact-message-text-content").append(risposta);
    $(".container-chat__main-right-chat").append(messageContent);
  }
});
function numeroRandom (min,max){
    return Math.floor(Math.random()*(max - min + 1 )+ min);
}

