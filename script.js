'use strict'

//Promesas
/*Recibe un callback con dos parámetros. El primero en caso de resolución de la promesa,
el segundo en caso de que esta falle, aunque no son obligatorios. 

Sin embargo la promesa devuelve un objeto Promise, y si queremos conocer la información
retornada, deberemos emplear dichos parámetros

Si completamos la parte de la promesa que deseamos satisfactoriamente, retornaremos dicho
éxito usando el primer parámetro, y si hubo algún error en el proceso, se utilizará
el 2º parámetro. Estos parámetros pueden retornar a su vez la información necesaria
una vez resuelta esta promesa

Para trabajar con la información obtenida del objeto Promise, se utilizan métodos then() y catch()
en caso de éxito o de error respectivamente.
*/

//Ejemplo con Promise
//Función que compara dos valores (num1 y num2) en un período de tiempo (segundos) mediante una promesa y devuelve el resultado mediante esta
function comparacion_cronometrada(num1, num2, segundos) {

    if (typeof(segundos) != 'number') {
        return console.log(new Error('Por favor introduce una cifra para establecer el tiempo de resolución'))
    }

    //resolver: parámetro de resolucion de promesa
    //fallo: parámetro de error de promesa
    new Promise((resolver, fallo) => {
        setTimeout(() => {
            console.log('\n');
            //En este caso vamos a determinar si la condición se cumple para resolver satisfactoriamente la promesa o no
            if (typeof (num1 === 'number') && typeof (num2 === 'number')) {
                if (num1 == num2) {
                    console.log('Tiempo completado y condición cumplida');
                    //Resolverá la promesa y hará que esta retorne "5"
                    resolver(true)
                }
                else{
                    console.log('Tiempo completado y condición no cumplida');
                    //Resolverá la promesa y hará que esta retorne "5"
                    resolver(false)
                }
            }
            else {
                console.log('Tiempo completado y condición no evaluada');
                //Resuelve la promesa como fallida y devuleve un error
                fallo(new Error("debes introducir dos numeros"))
            }
        }, segundos * 1000);
    })  //then() recoge el valor retornado por resolución satisfactoria de la promesa y se ejecuta si se cumplió esta
        .then((resultado) => {
            console.log('Devolviendo resultado');
            console.log(resultado);
        })
        //then() recoge el valor retornado por resolución errónea de la promesa y se ejecuta si no se cumplió esta
        .catch(error => {
            console.log("Devolviendo error");
            console.log(error)
        })
}

//Las funciones pasadas a then() no se resuelven sincronicamente, sino se que pasan a una cola de microtareas
//Y se resuelven en orden de menor tardanza
const espera = ms => new Promise(resuelve => setTimeout(resuelve, ms));

comparacion_cronometrada(1, 1, 3)
espera().then(() => console.log(4));
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1);

