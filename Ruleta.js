//SCRIPT DEL JUEGO
//DECLARAMOS LAS FUNCIONES DEL JUEGO
const GAMES_FINAL = document.getElementById('GAMES_FINAL')
const Cian = document.getElementById('Cian')
const Green = document.getElementById('Green')
const Oranje = document.getElementById('Oranje')
const Red = document.getElementById('Red')
const overlight = document.getElementById('overlight')
const BtnComenzar = document.getElementById('BtnComenzar')
//DECLARAMOS EL ULTIMO NIVEL
const ULTIMO_NIVEL = 10

//DECLARAMOS LA CLASE DEL JUEGO
class Juego{
    constructor(){
        //INICIO DEL JUEGO CON BIND
        this.inicializar = this.inicializar.bind(this)
        //INICIO DEL JUEGO
        this.inicializar()
        //SECUENCIA DEL JUEGO
        this.generarSecuencia()
        //SIGUIENTE NIVEL DEL JUEGO
        setTimeout(() => this.siguienteNivel(), 500)
    }

    //DECLARAMOS LA OPCION DE INICIALIZAR
    inicializar(){
        //DECLARAMOS EL SIGUIENTE NIVEL
        this.siguienteNivel = this.siguienteNivel.bind(this)
        //DECLARAMOS LOS COLORES DEL JUEGO
        this.elegirColor = this.elegirColor.bind(this)
        //DECLARAMOS UN TOGGLE PARA EL BOTON EMPEZAR
        //"TOGGLE" ES COMO UN INTERRUPTOR DE ENCENDIDO Y APAGADO
        //PARA UN BOTON
        this.toggleBtnComenzar()
        this.nivel = 1
        this.colores = {
            Cian,
            Green,
            Oranje,
            Red
        }
    }

    //DECLARAMOS LA CLASE TOGGLEBTNEMPEZAR
    toggleBtnComenzar(){
        //PRIMER METODO
        //if (BtnComenzar.classList.contains('hidden')) {
            //BtnComenzar.classList.remove('hidden')
        //} else {
            //BtnComenzar.classList.add('hidden')
        //}
        //SEGUNDO METODO
        if ( document.getElementById('overlight') == null )  {
            GAMES_FINAL.appendChild(overlight)
        } else {
            GAMES_FINAL.removeChild(overlight)
        }
    }

    //DECLARAMOS LA OPCION DE GENERAR SECUENCIA
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
    }

    //DECLARAMOS LA OPCION DEL SIGUIENTE NIVEL
    siguienteNivel(){
        //ILUMINAR SECUENCIA
        this.iluminarSecuencia()
        //AGREGAR EVENTOS CLICK
        this.agregarEventosClick()
        //AGREGAR SUBNIVEL
        this.subnivel = 0
    }

    //DECLARAMOS LA OPCION DE TRANSFORMAR NUMEROS A COLORES
    transformarNumeroAColor(numero){
        switch(numero){
            case 0:
                return 'Cian'
            case 1:
                return 'Green'
            case 2:
                return 'Oranje'
            case 3:
                return 'Red'
        }
    }

    //DECLARAMOS LA OPCION DE TRANSFORMAR COLORES A NUMEROS
    transformarColorANumero(color){
        switch(color){
            case 'Cian':
                return 0
            case 'Green':
                return 1
            case 'Oranje':
                return 2
            case 'Red':
                return 3
        }
    }

    //DECLARAMOS LA OPCION DE ILUMINAR SECUENCIA
    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++){     
            let color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    //DECLARAMOS LA OPCION DE ILUMINAR COLOR
    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350);
    }

    //DECLARAMOS LA OPCION DE APAGAR COLOR
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    //DECLARAMOS LA OPCION DE AGREGAR EVENTOS EN UN CLICK
    agregarEventosClick(){
        this.colores.Cian.addEventListener('click', this.elegirColor)
        this.colores.Green.addEventListener('click', this.elegirColor)
        this.colores.Oranje.addEventListener('click', this.elegirColor)
        this.colores.Red.addEventListener('click', this.elegirColor)
    }

    //DECLARAMOS LA OPCION DE ELIMINAR EVENTOS EN UN CLICK
    eliminarEventosClick(){
        this.colores.Cian.removeEventListener('click', this.elegirColor)
        this.colores.Green.removeEventListener('click', this.elegirColor)
        this.colores.Oranje.removeEventListener('click', this.elegirColor)
        this.colores.Red.removeEventListener('click', this.elegirColor)
    }

    //DECLARAMOS LA OPCION DE ELEGIR UN COLOR
    elegirColor(ev){
        //DECLARAMOS EL NOMBRE DEL COLOR
        const nombreColor = ev.target.dataset.color
        //DECLARAMOS EL NUMERO DEL COLOR
        const numeroColor = this.transformarColorANumero(nombreColor)
        //DECLARAMOS LA ILUMINACION DEL COLOR
        this.iluminarColor(nombreColor)

        //DECLARAMOS EL SUBNIVEL DEL JUEGO
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++

            //DECLARAMOS EL NIVEL DEL JUEGO
            if (this.subnivel === this.nivel) {
                this.nivel++
                this.eliminarEventosClick()

                //DECLARAMOS EL ULTIMO NIVEL
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    //GANO EL JUEGO
                    this.ganoElJuego()
                } 
                else {
                    setTimeout(() => this.siguienteNivel(), 500)
                }
            }
        } 
        else {
            //PERDIO EL JUEGO
            this.perdioElJuego()
        }
    }

    //DECLARAMOS LA OPCION DE GANO EL JUEGO
    ganoElJuego(){
        swal('Platzi', 'Felicidades ganaste el juego', 'success')
            .then(this.inicializar)
    }

    //DECLARAMOS LA OPCION DE PERDIO EL JUEGO
    perdioElJuego(){
        swal('Platzi', 'Mala suerte, Perdiste XD', 'error')
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
            })
    }
}

//DECLARAMOS LA FUNCION DEL JUEGO
function ComenzarJuego(){
    window.Jugar = new Juego()
}