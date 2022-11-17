// reloj tiempo real
// var timerId = setInterval(() => {
//     getTime()
// }, 1000);

// timeInterval(100);

var msg = "Adivina los nombres de los personajes de Starwars, escribe el nombre en la caja de texto y presiona la tecla \"Enter\" o el boton \"GO\". Cada vez que falles te dare una pista con las dos primeras letras de algun personaje de mi lista, buena suerte 🐱";

var userName = new String;
var matchCounter = 0;
var userGuess;

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
const listaStarwarsCounter = listaStarwars.length;

var listaAlmacen = new Array;
var listaSugerencias = [...listaStarwars];

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
    userGuess = document.getElementById("textbox").value;
    document.getElementById("textbox").value = '';

    var isGuessInList = false;
    if (matchCounter == listaStarwarsCounter) {
        alert("Felicitaciones " + userName + "! GANASTE THE STARWARS TRIVIA!");
    } else {
        if (userGuess == null) {
            alert("Te diste por vencido!");
        } else {
            if (userGuess == "") {
                //alert("No recuerdas ninguno? intenta nuevamente");
            } else {
                listaAlmacen.forEach(inFunction);
                function inFunction(item, index) {
                    if (userGuess == item) {
                        $("body").append("<div class=\"responseDuplicate\">" + "🐵 Ya dijiste ese personaje, trata de nuevo! 🐵" + "</div>");
                        isGuessInList = true;
                    }
                }

                if (!isGuessInList) {
                    for (i = 0; i < listaStarwarsCounter; i++) {
                        if (userGuess == listaStarwars[i]) {
                            matchCounter++;
                            listaAlmacen.push(listaStarwars[i]);
                            isGuessInList = true;

                            $("body").append("<div class=\"response\">" + "👉" + userGuess.toUpperCase() + "👈  " + "🐱 Muy bien! has acertado a " + matchCounter + " de " + listaStarwarsCounter + " personajes de mi lista" + "</div>");

                            if (matchCounter == listaStarwarsCounter) {
                                alert("Felicitaciones " + userName + "! GANASTE THE STARWARS TRIVIA!");
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

                        $("body").append("<div class=\"responseError\">" + "💩 " + userGuess.toUpperCase() + " 💩  " + "Ese es tu favorito? el mio comienza con las letras 👉" + "\"" + theOne.charAt(0).toUpperCase() + theOne.charAt(1).toUpperCase() + "\"" + " y termina con la letra: " + "\"" + theOne.charAt(theOne.length - 1).toUpperCase() + "\"" + "</div>");
                    }
                }
            }
        }
    }
}

function returnListaAlmacen() {
    if (listaAlmacen.length > 0) {
        for (i = 0; i < listaAlmacen.length; i++) {
            document.writeln(listaAlmacen[i].toString());
        }
    }
}

// funcion que elige una de las musicas al azar, luego es ocupada en el al final del head del Gulator_Software.html
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

function testJquery() {
    $(document).ready(function () {
        $("#respError").toggle();
        $(window).resize(function () {
            $("body").prepend("<div>" + $(window).width() + "</div>");
        });
    });
}

function fadeHtmlText() {
    $(document).ready(function () {
        $(".response").fadeOut("slow", function () {
            // Animation complete
        });
        $(".responseError").fadeOut("slow", function () {
            // Animation complete
        });
        $(".responseDuplicate").fadeOut("slow", function () {
            // Animation complete
        });
    });
}

function getTime() {
    var currentDate = new Date();
    var currentTime = currentDate.toLocaleTimeString();
    document.getElementById("timer").innerHTML = currentTime;
}

var timeCounter = 10;
var progressBarId;
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
        $("#textbox").fadeOut("fast", function () {
        });
        $("#sendbutton").fadeOut("fast", function () {
        });
        document.getElementById("timer").innerHTML = "FIN";
        clearInterval(progressBarId);
        timeCounter = 0;
    }
}

