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

const randUserNames = new Array(
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

const starwarsChars = new Array(
    {
        name: 'darth vader',
        image: 'images/darth.png'
    },
    {
        name: 'boba fett',
        image: 'images/fett.png'
    },
    {
        name: 'yoda',
        image: 'images/yoda.png'
    },
    {
        name: 'luke',
        image: 'images/luke.png'
    },
    {
        name: 'lando',
        image: 'images/lando.png'
    },
    {
        name: 'leia',
        image: 'images/leia.png'
    },
    {
        name: 'obiwan',
        image: 'images/obiwan.png'
    },
    {
        name: 'jabba',
        image: 'images/jabba.png'
    },
    {
        name: 'baby yoda',
        image: 'images/babyyoda.png'
    },
    {
        name: 'ewok',
        image: 'images/ewok.png'
    }
);

// user vars
var userName = new String;
var matchCounter = 0;
var userGuess;

// arrays
const listaStarwarsCounter = starwarsChars.length;
var listaAlmacen = new Array;
var listaSugerencias = [...starwarsChars];

// timers
var progressBarId;
var timeCounter = 100;
const imagesHintTime = 10000;


function createImagesGrid() {
    for (let i = 0; i < starwarsChars.length; i++) {
        const swImage = document.createElement('img');
        swImage.setAttribute('src', starwarsChars[i].image);
        swImage.setAttribute('id', starwarsChars[i].name)
        grid.appendChild(swImage);
    }
    for (let i = 0; i < starwarsChars.length; i++) {
        $(document.getElementById(starwarsChars[i].name)).fadeToggle(imagesHintTime);
    }
}

function getListaStarwarsLenght() {
    return listaStarwarsCounter;
}

function askName() {
    //userName = prompt("Cual es tu nombre?", "");
    if (userName.length == 0 || userName == null) {
        userName = randUserNames[randArrayItem(randUserNames.length)]
    }
    return userName;
}

function initialSetup() {
    $(document).ready(function () {
        document.getElementById("textbox").focus();
        document.getElementById("sendbutton").hidden = true;

        const grid = document.getElementById("grid");
        createImagesGrid();
    });
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
            for (let i = 0; i < listaStarwarsCounter; i++) {
                if (userGuess == starwarsChars[i].name) {
                    matchCounter++;
                    listaAlmacen.push(starwarsChars[i].name);
                    isGuessInList = true;

                    $("body").append("<div class=\"response\">" + "👉" + userGuess.toUpperCase() + "👈  " + "🐱 Muy bien! has acertado a " + matchCounter + " personajes de " + listaStarwarsCounter + "</div>");

                    $(document.getElementById(starwarsChars[i].name)).fadeToggle(500);

                    if (matchCounter == listaStarwarsCounter) {
                        cajaTextoFadeOut();
                        setTimeout(winWinSetup, 2000);
                    }
                }
            }

            for (let i = 0; i < listaAlmacen.length; i++) {
                for (let j = 0; j < listaSugerencias.length; j++) {
                    if (listaSugerencias[j].name == listaAlmacen[i]) {
                        listaSugerencias.splice(j, 1);
                    }
                }
            }

            if (!isGuessInList) {
                var theOne = listaSugerencias[randArrayItem(listaSugerencias.length)].name;

                $("body").append("<div class=\"responseError\">" + "🧟‍♀️🙈 Te dare una pista! comienza con 👉 " + "\"" + theOne.charAt(0).toUpperCase() + theOne.charAt(1).toUpperCase() + "\"" + " y termina con 👉 " + "\"" + theOne.charAt(theOne.length - 1).toUpperCase() + "\"" + "</div>");
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
    $(".grid").fadeOut("slow", function () {
    });
    document.getElementById("timer").innerHTML = "FIN";
    clearInterval(progressBarId);
    timeCounter = 0;
}

function cajaTextoFadeOut() {
    $("#form").fadeOut("slow", function () {
        $("#textbox").fadeOut("slow", function () {
            document.getElementById("textbox").value = "";
        });
    });
}

function returnListaAlmacen() {
    if (listaAlmacen.length > 0) {
        for (let i = 0; i < listaAlmacen.length; i++) {
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

function randArrayItem(length) {
    var rand_num = Math.random() * length;
    var randomInt = parseInt(rand_num);
    return randomInt;
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

function testJquery() {
    $(document).ready(function () {
        $("#respError").toggle();
        $(window).resize(function () {
            $("body").prepend("<div>" + $(window).width() + "</div>");
        });
    });
}