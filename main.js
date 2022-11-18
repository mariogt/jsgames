//  main.js
//  Created by Mario Gajardo Tassara --> 17-11-2022 -- 17:43
//
//  Game of remember - html + css + javascript + jquery
//
//  Copyright (c) 2022 MarioGT Software.
//
//  GNU AFFERO GENERAL PUBLIC LICENSE
//  https://www.gnu.org/licenses/agpl-3.0.txt


// defines
var msg = "Adivina los nombres de los personajes de Starwars, escribe el nombre en la caja de texto y presiona la tecla \"Enter\" o el boton \"GO\". Cada vez que falles te dare una pista con las dos primeras letras de algun personaje de mi lista, buena suerte 🐱";

const namesArray = new Array(
    'PsychoCherry🍒',
    'Mintymint☘️',
    'lemonSquezee🍋',
    'MaybeKoala🐨',
    'CoolMarionette🧸',
    'LocoMantis🪳',
    'GoingShine🌞',
    'twicyland🐲',
    'Summer girl👙',
    'summerboy🏄',
    'summerperson🏊‍♂️',
    'snowinside⛄',
    'realisticbot🤖',
    'babypolice🚨',
    'tomatotea🍅',
    'mockingbird🐦',
    'fallingberrys🍒',
    'strawberryjuice🍹',
    'toxicpotion♨️',
    'latermaker🛠️',
    'snipperdog🐶',
    'slimyhands👏',
    'creativeworld💭',
    'Catman🐈‍⬛',
    'Bomblow💣',
    'Everstar⭐',
    'Mixlunch🥞',
    'Mrwolf🐺',
    'Juicypewpie🧁',
    'Loconacat🙀',
    'Kittencat🐈',
    'nachotaco🌮',
    'mindgatorade🧋',
    'sunshineglitter🫧',
    'starwash🚀',
    'happytaco🌯',
    'bluewhite💙',
    'darklight🕯️',
    'headphoneman🙅',
    'headphonewoman🙅‍♀️',
    'snakex 🐍',
    'lalafanfan👻',
    'beepbeep👾',
    'sakuratree🌳',
    'heartclip💖',
    'vman👨‍💼',
    'vwoman👩‍💼',
    'vperson🤹',
    'vloco🕺',
);

const listaMusica = new Array(
    '<midi-player src=\"midis/jazz.mid\" sound-font></midi-player>',
    '<midi-player src=\"midis/cool.mid\" sound-font></midi-player>',
    '<midi-player src=\"midis/bios.mid\" sound-font></midi-player>',
);

const listaStarwars = new Array(
    'darth vader',
    'yoda',
    'boba fett',
    'han solo',
    'jaba',
    'leia',
    'luke',
    'obiwan',
    'lando'
);

// user vars
var userName = new String;
var matchCounter = 0;
var userGuess;

// arrays
const listaStarwarsCounter = listaStarwars.length;
var listaAlmacen = new Array;
var listaSugerencias = [...listaStarwars];

// timers
var timeCounter = 30;
var progressBarId;


function getListaStarwarsLenght() {
    return listaStarwarsCounter;
}

function askName() {
    //userName = prompt("Cual es tu nombre?", "");
    if (userName.length == 0 || userName == null) {
        userName = randArrayItem(namesArray);
    }
    return userName;
}

function starwars() {
    timeInterval()

    var tempString1 = document.getElementById("textbox").value;
    var tempString2 = tempString1.trimStart();
    var tempString3 = tempString2.trimEnd();
    userGuess = tempString3.toLowerCase();

    document.getElementById("textbox").value = '';

    var isGuessInList = false;

    if (userGuess == "") {
        // void
    } else {
        listaAlmacen.forEach(inFunction);
        function inFunction(item, index) {
            if (userGuess == item) {
                $("body").append("<div class=\"responseDuplicate\">" + "🐵 Ya dijiste ese personaje!" + "</div>");
                isGuessInList = true;
            }
        }

        if (!isGuessInList) {
            for (i = 0; i < listaStarwarsCounter; i++) {
                if (userGuess == listaStarwars[i]) {
                    matchCounter++;
                    listaAlmacen.push(listaStarwars[i]);
                    isGuessInList = true;

                    $("body").append("<div class=\"response\">" + "👉" + userGuess.toUpperCase() + "👈  " + "🐱 Muy bien! has acertado a " + matchCounter + " personajes de " + listaStarwarsCounter + "</div>");

                    if (matchCounter == listaStarwarsCounter) {
                        cajaTextoFadeOut();
                        setTimeout(winWinSetup, 2000);
                    }
                }
            }

            for (i = 0; i < listaAlmacen.length; i++) {
                for (j = 0; j < listaSugerencias.length; j++) {
                    if (listaSugerencias[j] == listaAlmacen[i]) {
                        listaSugerencias.splice(j, 1);
                    }
                }
            }

            if (!isGuessInList) {
                var theOne = randArrayItem(listaSugerencias);

                $("body").append("<div class=\"responseError\">" + "❌ Error! te dare una pista, comienza con 👉 " + "\"" + theOne.charAt(0).toUpperCase() + theOne.charAt(1).toUpperCase() + "\"" + " y termina con 👉 " + "\"" + theOne.charAt(theOne.length - 1).toUpperCase() + "\"" + "</div>");
            }
        }
    }
}

function winWinSetup() {
    document.getElementById("timer").innerHTML = "FIN";
    document.getElementById("textbox").value = "";
    clearInterval(progressBarId);
    timeCounter = 0;

    $("body").append("<div class=\"winWin\">" + "Felicitaciones " + userName.toUpperCase() + "! GANASTE! 🐱😹🍻" + "</div>");

    $(".winWin").fadeToggle(1000, "linear", function () {
        $(".winWin").fadeToggle(1000, "linear", function () {
            $(".winWin").fadeToggle(1000, "linear", function () {
                $(".winWin").fadeToggle(1000, "linear", function () {
                    $(".winWin").fadeIn(1000);
                });
            });
        });
    });
}

function loseLose() {
    cajaTextoFadeOut();
    document.getElementById("textbox").value = "";
    document.getElementById("timer").innerHTML = "FIN";
    clearInterval(progressBarId);
    timeCounter = 0;
}

function cajaTextoFadeOut() {
    $("#form").fadeOut("slow", function () {
        $("#textbox").fadeOut("slow", function () {
            $("#sendbutton").fadeOut("fast", function () {
            });
        });
    });
}

function returnListaAlmacen() {
    if (listaAlmacen.length > 0) {
        for (i = 0; i < listaAlmacen.length; i++) {
            document.writeln(listaAlmacen[i].toString());
        }
    }
}

function randMusica() {
    var the_music = randArrayItem(listaMusica);
    return the_music;
}

// scroller
function startScroller() {
    document.scrollForm.scrolling_message.value = msg
    msg = msg.substring(1, msg.length) + msg.substring(0, 1)
    // (scroll velocity 150=.15 seconds).
    setTimeout("startScroller()", 200)
}

function randArrayItem(array) {
    var rand_num = Math.random() * array.length;
    var randomInt = parseInt(rand_num);
    return array[randomInt];
}

function fadeHtmlText() {
    $(document).ready(function () {
        $(".response").fadeOut(3000, function () {
            // Animation complete
        });
        $(".responseError").fadeOut(3000, function () {
            // Animation complete
        });
        $(".responseDuplicate").fadeOut(3000, function () {
            // Animation complete
        });
    });
}

function getTime() {
    var currentDate = new Date();
    var currentTime = currentDate.toLocaleTimeString();
    document.getElementById("timer").innerHTML = currentTime;
}

function timeInterval() {
    if (progressBarId == null) {
        $(document).ready(function () {
            progressBarId = setInterval(displayTimeProgress, 1000);
        });
    }
}

function displayTimeProgress() {
    document.getElementById("timer").innerHTML = timeCounter;
    timeCounter -= 1;
    if (timeCounter == 0) {
        loseLose();
    }
}

function setFocusOnTextbox() {
    $(document).ready(function () {
        document.getElementById("textbox").focus();
    });
}

function testJquery() {
    $(document).ready(function () {
        $("#respError").toggle();
        $(window).resize(function () {
            $("body").prepend("<div>" + $(window).width() + "</div>");
        });
    });
}