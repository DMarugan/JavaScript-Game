const ARRIBA = 38
const ABAJO = 40
const IZQUIERDA = 37
const DERECHA = 39

// Crear canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//Imagen Fondo
var fondoListo = false;
var fondoImage = new Image();
fondoImage.onload = function () {
    fondoListo = true;
};
fondoImage.src = "images/background.png";

// Imagen heroe
var heroeListo = false;
var heroeImage = new Image();
heroeImage.onload = function () {
    heroeListo = true;
};
heroeImage.src = "images/heroe.png";

//Imagen princesa
var princesaListo = false;
var princesaImage = new Image();
princesaImage.onload = function () {
    princesaListo = true;
};
princesaImage.src = "images/princesa.png";

//Pripiedades personajes
var heroe = {
    velocidad: 150 
};
var princesa = {};
var princesasAtrapadas = 0;

//Reconocer teclado
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Reiniciar juego
var reset = function () {
    heroe.x = canvas.width / 2;
    heroe.y = canvas.height / 2;

    //Poner princesas aleatorias
    princesa.x = (Math.random() * canvas.width ) - 49;
    princesa.y = (Math.random() * canvas.height ) - 49;
};

//Mover 
var Mover = function (tiempo) {
    
    if (ARRIBA in keysDown) { 
        heroe.y -= heroe.velocidad * tiempo;
    }
    if (ABAJO in keysDown) { 
        heroe.y += heroe.velocidad * tiempo;
    }
    if (IZQUIERDA in keysDown) { 
        heroe.x -= heroe.velocidad * tiempo;
    }
    if (DERECHA in keysDown) { 
        heroe.x += heroe.velocidad * tiempo;
    }

    //Saber si se tocan
    if (
        heroe.x <= (princesa.x + 32)
        && princesa.x <= (heroe.x + 32)
        && heroe.y <= (princesa.y + 32)
        && princesa.y <= (heroe.y + 32)
    ) {
        ++princesasAtrapadas;
        reset();
    }
};

//Dibujar todo
var dibujar = function () {
    if (fondoListo) {
        ctx.drawImage(fondoImage, 0,0);
    }

    if (heroeListo) {
        ctx.drawImage(heroeImage, heroe.x, heroe.y);
    }

    if (princesaListo) {
        ctx.drawImage(princesaImage, princesa.x, princesa.y);
    }

    // Score
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Princesas Rescatadas: " + princesasAtrapadas, 300, 390);
};

//Juego
var main = function () {
    var now = Date.now();
    var delta = now - then;
    
    Mover(delta / 1000);
    dibujar();

    then = now;

    //Refrescar pantalla
    requestAnimationFrame(main);
};


//Empezar juego
var then = Date.now();
reset();
main();