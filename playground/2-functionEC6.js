const evento = {
    name:'birthdat',
    guestList:['facu','mari','sophie'],
    //si bien no podemos usar arrow function en metodos porque no tienen su this , podemos usar esta sintaxis abreviada sin necesidad de poner la palabra reservada function
    printGuest(){
        console.log(`guest : ${this.name}`)
        // las arrow function obtienen el this del contexto donde fueron creadas
        this.guestList.forEach(guest=>console.log(`${guest}`))

    }

}

evento.printGuest()