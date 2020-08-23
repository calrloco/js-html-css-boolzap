$(document).ready(function () {
  //****Richiamo fuzioni inzio app ****/
  $("input.chat-input").keydown(chatBot);
  $("#send").click(chatBot);
  // barra ricerca 
  $("#search-contacts").keyup(function () {
    searchValue($(this).val().toLowerCase().trim());
  });
  setRandomtime();
  RandomPreview();
  conversazioneDefault();
  //*********chatbot************//
  function chatBot() {
    var time = orario();
    var messaggioUser = $("input.chat-input").val();
    var lastSeen = $(".container-chat__main-left-contacts__item.active").find(
      ".contanct-item-timing"
    );
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
        $(".container-chat__main-right-chat.active").append(messageContent);
        // mentre il messaggio viene scritto appare la scritta typing dove c'e l'accesso...
        $(".container-chat__header-right-info-text").text("typing...");
        // richiamo funzione di risposta con un tempo fra 1 secondo e 4 secondi
        setTimeout(randomAnswere, numeroRandom(1000, 2000));
        lastSeen.text(time);
        $("input.chat-input").val("");
        scrollBottom();
        // prima parola chat come preview 
        $('.container-chat__main-left-contacts__item.active').find('.contanct-item-preview').text(messaggioUser.split(' ').shift()+'...');
        // l'ordine della chat cambia a seconda della chat in cui e stato inviato l'ultimo messaggio
        changeOrder();
      }
    }
  };
  // bonus ////
  // cambiare l'ordine dei contatti a seconda di quale e stata l'ultima conversazione attiva
  function changeOrder (){
    contattoAttivo = $('.container-chat__main-left-contacts__item.active');
    $('.container-chat__main-left-contacts').prepend(contattoAttivo);
  };
  //*****funzione rispostarandom*********/
  function randomAnswere() {
    var lastSeen = $(".container-chat__main-left-contacts__item.active").find(
      ".contanct-item-timing"
    );
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
    $(".container-chat__main-right-chat.active").append(messageContent);
    $(".container-chat__header-right-info-text").text(
      "Ultimo Accesso oggi " + time
    );
    lastSeen.text(time);
    scrollBottom();
    //aggiornamentto del chat preview con l'ultimo messassaggio rivevuto chat attiva
    $('.container-chat__main-left-contacts__item.active').find('.contanct-item-preview').text(risposta.split(' ').shift()+'...');
    changeOrder();
  };
  // CONVERSAZIONE AUTOMATICA ALL'APERTURA DELLA CHAT ATTIVA
  function conversazioneDefault(){
    var containerPrev =  $('.container-chat__main-left-contacts__item');
  for(var i=0;i<containerPrev.length;i++){
    var messagePrev = containerPrev.find('.contanct-item-preview').eq(i).text();
    var messageContent = $('.template .message-box').clone();
    messageContent.addClass('contact-message');
    messageContent.find('.time').text('today');
    messageContent.find(".contact-message-text-content").prepend(messagePrev);
    messageContent.find(".time-message").addClass("text-left");
    $(".container-chat__main-right-chat").eq(i).prepend(messageContent);
  }
};
  //*** funzione scroll automantico all'invio o ricezione di un messaggio **/////////
  function scrollBottom() {
    var container = $(".container-chat__main-right-chat.active");
    container.animate({ scrollTop: container.get(0).scrollHeight }, 200);
  };
  ///*** funzione per aprire menu emojy **///////
  $(".smile").click(function () {
    $(".emojy-menu-list").toggleClass("emojy-active");
    $(this).toggleClass("emojy-menu-clicked");
  });
  ////**** funzione per inserire emojy nel messaggio */////////
  $(".emojy").click(function () {
    var messaggioUser = $("input.chat-input");
    emojy = $(this).text();
    messaggioUser.val(messaggioUser.val() + emojy);
  });
  ////**input ricerca degli contatti animazione quando focus **/////////////
  $(".search").focus(function () {
    $(this).addClass("search-focus");
    $(".cerca").removeClass("fa-search");
    $(".cerca").addClass("fa-arrow-left  search-focus-icon");
    $(".container-chat__main-left-search").addClass(
      "container-chat__main-right-chat-input-focus"
    );
  });
  ////** input ricerca degli utenti animazione quando esce dal focus **////////
  $(".search").blur(function () {
    $(this).removeClass("search-focus");
    $(".cerca").addClass("fa-search");
    $(".cerca").removeClass("fa-arrow-left  search-focus-icon");
    $(".container-chat__main-left-search").removeClass(
      "container-chat__main-right-chat-input-focus"
    );
  });
  // function search bar
  function searchValue(val){
    var contact = $(".container-chat__main-left-contacts__item");
    var nome = contact.find(".contanct-item-name");
    $(nome).each(function () {
      var nomeUser = $(this).text().toLowerCase();
      // se la stringa non include la partola nascondi caso contrario mostra
      if (!nomeUser.includes(val)) {
        $(this).closest(contact).hide();
      }else{
        $(this).closest(contact).show();
      }
    });
  };
  //funzione per Contatto e chat attiva ////
  $(".container-chat__main-left-contacts__item").click(function () {
    var headername = $(".contanct-item-name-header");
    var headerInfo = $(".container-chat__header-right-info-text");
    var contactNameSide = $(this).find(".contanct-item-name").text();
    var chatContainer = $(".container-chat__main-right-chat");
    var randmTimeToHeader = $(".contanct-item-timing").eq($(this).index()).text();
    headerInfo.text("Ultimo Accesso oggi " + randmTimeToHeader)
    $(".active").removeClass("active");
    $(this).addClass("active");
    chatContainer.eq($(this).index()).addClass("active");
    var changeImg = $(this).find(".contanct-item-pic").attr("src");
    $("img.contact-img").attr("src", changeImg);
    headername.text(contactNameSide);
    headerInfo.addClass("active-head-Info");
  });

  //set random Time
  function setRandomtime() {
    contenitori = $(".contanct-item-timing");
    var orerandom = [];
    for (var i = 0; i < contenitori.length; i++) {
      var orarioRandom = oraRandom();
      if (!orerandom.includes(orarioRandom)) {
        orerandom.push(orarioRandom);
        $(contenitori[i]).text(orerandom[i]);
      } else {
        i--;
      }
    }
  };
  // set RandomMessage
  function RandomPreview(){
    var containerPrev =  $('.contanct-item-preview');
    var randomPrev = [
      'tutto ok',
      'bene','a dopo',
      'sicuro','non so',
      'si','apposto',
    ];
    for(var i=0;i<containerPrev.length;i++){
    $(containerPrev[i]).text(randomPrev[numeroRandom(0,randomPrev.length-1)]);
  }
  }
});
///********fine jquery*************/
/*******Inizio Vanilla Js functions ********/
/// numero random
function numeroRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
//****funzione per avere l'ora *****/////
function orario() {
  var date = new Date();
  var time =
    aggiungiZero(date.getHours()) + ":" + aggiungiZero(date.getMinutes());
  return time;
};
// funzione ora casuale
function oraRandom() {
  var oraRandom =
    aggiungiZero(numeroRandom(0, 23)) + ":" + aggiungiZero(numeroRandom(0, 60));
  return oraRandom;
};
function aggiungiZero(oraMinuti) {
  if (oraMinuti < 10) {
    return "0" + oraMinuti;
  }
  return oraMinuti;
};
