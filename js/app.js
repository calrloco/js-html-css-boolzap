$(document).ready(function () {
  //****Richiamo fuzioni inzio app ****/
  $("input.chat-input").keydown(chatBot);
  $("#send").click(chatBot);
  //*********chatbot************//
  function chatBot() {
    var time = orario();
    var messaggioUser = $("input.chat-input").val();
    var lastSeen = $(".contanct-item-timing");
    // faccio il trim della stringa e la uso come controllo per vedere se e vuota
    var controllo = messaggioUser.trim();
    if (event.which === 13 || event.keyCode === 13 || event.type === "click") {
       //   se la stringa non e vuota invia il messaggio **/
      if (controllo.length != 0) {
        var messageContent = $(".template .message-box").clone();
        $(".time time-message").addClass("text");
        messageContent.addClass("user-message");
        messageContent.find(".time-message").text(time);
        messageContent.find(".time-message").addClass("text-right");
        messageContent.find(".contact-message-text-content").append(messaggioUser);
        $(".container-chat__main-right-chat").append(messageContent);
        // mentre il messaggio viene scritto appare la scritta typing dove c'e l'accesso...
        $(".container-chat__header-right-info-text").text('typing...');
         // richiamo funzione di risposta con un tempo fra 1 secondo e 4 secondi
        setTimeout(randomAnswere, numeroRandom(2000, 4000));
        lastSeen.text(time);
        $("input.chat-input").val("");
        scrollBottom();
      }
    }
  };
  //*****funzione rispostarandom*********/
  function randomAnswere() {
    /// array risposterandom///
    var risposterandom = [
      "Fra non posso rispondere ora",
      "Non ho il tuo numero ci conosciamo?",
      "Aspetta un minuto sono impegnato",
      "Riunione!!!",
      "Ho una riunione sentiamoci dopo",
      "Hai visto Carol Baskin ha sottratto lo zoo a Joe exotic Lol &#128517;, poi ti dico ora non posso parlare",
      "Sono mega triste fra :(, ma ora non posso parlare sono in riunione",
      "non hai capito Giulia mi ha lasciato &#128557;, poi ti dico ora sto impicciato",
    ];
    var time = orario();
    // la risposta random presa con indice di nRandom ///
    var risposta = risposterandom[numeroRandom(0, risposterandom.length - 1)];
    var messageContent = $(".template .message-box").clone();
    messageContent.addClass("contact-message");
    messageContent.find(".time-message").text(time);
    messageContent.find(".contact-message-text-content").append(risposta);
    messageContent.find(".time-message").addClass("text-left");
    $(".container-chat__main-right-chat").append(messageContent);
    $(".container-chat__header-right-info-text").text(
      "Ultimo Accesso oggi " + time
    );
    scrollBottom();
  }
  //*** funzione scroll automantico all'invio o ricezione di un messaggio **/////////
  function scrollBottom (){
    var container = $('.container-chat__main-right-chat');
    container.animate({scrollTop:container.get(0).scrollHeight},200);
  }
  ///*** funzione per aprire menu emojy **///////
  $('.smile').click(function(){
       $('.emojy-menu-list').toggleClass('emojy-active');
       $(this).toggleClass('emojy-menu-clicked');
  });
  ////**** funzione per inserire emojy nel messaggio */////////
  $('.emojy').click(function(){
    var messaggioUser = $("input.chat-input");
    emojy = $(this).text();
    messaggioUser.val(messaggioUser.val()+emojy);
  });
  ////**input ricerca degli contatti animazione quando focus **/////////////
  $('.search').focus(function(){
    $(this).addClass('search-focus');
    $('.cerca').removeClass('fa-search');
    $('.cerca').addClass('fa-arrow-left  search-focus-icon');
    $('.container-chat__main-left-search').addClass('container-chat__main-right-chat-input-focus');
  });
  ////** input ricerca degli utenti animazione quando esce dal focus **////////
  $('.search').blur(function(){
    $(this).removeClass('search-focus');
    $('.cerca').addClass('fa-search');
    $('.cerca').removeClass('fa-arrow-left  search-focus-icon');
    $('.container-chat__main-left-search').removeClass('container-chat__main-right-chat-input-focus');
  });
});
/*******Vanilla Js function ********/
/// numero random
function numeroRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//****funzione per avere l'ora *****/////
function orario (){
  var dt = new Date();
  var time = dt.getHours() + ":" + dt.getMinutes();
  /// se i minuti sono minori di 10 oggiungo uno zero per non avere orari tipo 12.9///
  if (dt.getMinutes() < 10) {
    var time = dt.getHours() + ":" + 0 + dt.getMinutes();
  }
  return time;
}
