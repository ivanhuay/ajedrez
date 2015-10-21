/*Module Dependencies*/
var Tablero = require('./sec/Tablero');

$(document).on("ready",function (e){
	Tablero.init('#contenedor');
	Tablero.crear_divs();
	Tablero.graficarFichas();
	Tablero.getpgn("http://localhost/ajedrez/pgn.php");
});

//this is a test