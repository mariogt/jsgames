var msg = "Welcome to MarioGT Software, developer of useful Apps for macOS & iOS. My mission is straightforward and simple, programming lightweight software, not too resource-hungry, and above all, enrich your digital life 🤣🤣.";

var userName = "void";
var matchCounter = 0;
var lista_almacen = new Array;

var lista_starwars = new Array;
lista_starwars[0] = "darth vader";
lista_starwars[1] = "yoda";
lista_starwars[2] = "boba fett";
lista_starwars[3] = "han solo";
lista_starwars[4] = "jaba";
lista_starwars[5] = "leia";
lista_starwars[6] = "luke";
lista_starwars[7] = "obiwan";

var lista_sugerencias = [...lista_starwars];


function askName() {
    userName = prompt("Cual es tu nombre?", "");
    if (userName.length == 0 || userName == null) {
        userName = "monkey"
    } else {
        if (userName == "mariogore") {
            alert("hola jefe");
        }
    }
    return userName;
}

function starwars() {
    var userGuess = document.getElementById("textbox").value;

    var isGuessInList = false;
    if (matchCounter == lista_starwars.length) {
        alert("YOU ALREADY WON STARWARS TRIVIA!");
    } else {
        //var userGuess = prompt("StarWars Trivia, trata de adivinar mis " + lista_starwars.length + " personajes preferidos de la saga (escribe en minusculas) ?", "");
        if (userGuess == null) {
            alert("Te diste por vencido!");
        } else {
            if (userGuess == "") {
                alert("no recuerdas ninguno! intenta nuevamente");
                //starwars();
            } else {
                lista_almacen.forEach(inFunction);
                function inFunction(item, index) {
                    if (userGuess == item) {
                        alert("ya digiste ese personaje, trata de nuevo!");
                        isGuessInList = true;
                        //starwars();
                    }
                }

                if (!isGuessInList) {
                    for (i = 0; i < lista_starwars.length; i++) {
                        if (userGuess == lista_starwars[i]) {
                            matchCounter++;
                            lista_almacen[i] = lista_starwars[i];
                            isGuessInList = true;

                            alert(userGuess + " es uno de los de mi lista de " + lista_starwars.length + "  personajes, eres un genio " + userName + "!" + " has acertado a " + matchCounter + " de " + lista_starwars.length + " personajes");

                            if (matchCounter == lista_starwars.length) {
                                alert("!!!" + userName + " GANASTE THE STARWARS TRIVIA!");
                            } else {
                                //starwars();
                            }
                        }
                    }

                    for (i = 0; i < lista_almacen.length; i++) {
                        for (j = 0; j < lista_sugerencias.length; j++) {
                            if (lista_sugerencias[j] == lista_almacen[i]) {
                                lista_sugerencias.splice(j, 1);
                            }
                        }
                    }

                    if (!isGuessInList) {
                        var rand_num = Math.random() * lista_sugerencias.length;
                        var randomInt = parseInt(rand_num);
                        var theOne = lista_sugerencias[randomInt];

                        alert(userGuess + " Ese es tu favorito? bueno el mio comienza con: " + theOne.charAt(0) + theOne.charAt(1));
                        //starwars();
                    }
                }
            }
        }
    }
}

// funcion que elige una de las musicas al azar, luego es ocupada en el al final del head del Gulator_Software.html
function randMusica() {
    var lista_musica = new Array;

    lista_musica[0] = '<midi-player src="midis/jazz.mid" sound-font></midi-player>';
    lista_musica[1] = '<midi-player src="midis/cool.mid" sound-font></midi-player>';
    lista_musica[2] = '<midi-player src="midis/bios.mid" sound-font></midi-player>';

    var rand_num = Math.random() * lista_musica.length;
    var num_music = parseInt(rand_num);
    var the_music = lista_musica[num_music];

    return the_music;
}

// scroller
function startScroller() {
    document.scrollForm.scrolling_message.value = msg
    msg = msg.substring(1, msg.length) + msg.substring(0, 1)
    // This editable setting dictates how quickly
    // each character moves across the scroll box
    // (ex. 150=.15 seconds).
    setTimeout("startScroller()", 150)
}