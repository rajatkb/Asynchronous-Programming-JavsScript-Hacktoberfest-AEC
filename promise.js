// lets test out something Js inherently supports Promises

const doSomething = (value ) => {
    if(value == 42)
        return Promise.resolve("You found secret")
    else
        return Promise.reject("Universe is vast :(")
} 

// So lets call up the above functions
const value = doSomething(42)
value.then( v => {
    console.log(`Succefull it was message : ${v}`)
}).catch(err => {
    console.log(`We failed :( : ${err})`)
})


// But we aint perfect cant get to 42 to at once , so lets chain things up
console.log("\n\nLets try a sequence of Promises")
doSomething(43).catch(err => {
    console.log(`We shall try again with 44`)
    return doSomething(44)
}).catch(err => {
    console.log(`We have to get it right !!`)
    return doSomething(42)
}).then( v => {
    console.log(`Yes we got it right !! , lets test it again !!`)
    return doSomething(42)
}).then( v => {
    console.log("We know 42 is the answer")
})

// this is what we call Promise Chaining ... nothing fancy just one after the other that's it
// The returned value tricles down like rain drop and each new then or catch is used to hold it and process it
// But where is the asynchronosity 

console.log("/n/n ****** HERE STARTS ASYNC **************") // not reliable ?????? WHY ???????

const doSomethingAsync = (time , value) => new Promise((resolve , reject) => {
    setTimeout(() => {
        if(value == 42)
            resolve("You found secret")
        else
            reject("Universe is vast :(")
    } , time)  
})

doSomethingAsync(3000 , 42).then(v => {  // 3 seconds
    console.log(`\n\nWe have the universal async answer => ${v}\n\n`)
})

const sequentially = () => {
    console.log(`Trying to find the answer sequentially !!`)
    const now = Date.now()

    doSomethingAsync(3000 , 43).catch(err => {
        console.log(`We shall try again with 44`)
        return doSomethingAsync(3000 , 44)
    }).catch(err => {
        console.log(`We have to get it right !!`)
        return doSomethingAsync(3000 , 42)
    })
    .then( v => {
        console.log(`Yes we got it right !! , lets test it again !!`)
        return doSomethingAsync(3000 , 42)
    }).then( v => {
        console.log("We know 42 is the answer")
        console.log(`Damn it took : ` , (Date.now() - now)/1000 , `seconds to find the answer\n\n`)
    })

}

// sequentially()

/**
 * Aint nobody got time to do trial and error on one hundred differen things 
 * Aahhhhh haa Nope nada
 * We GONNA LAUNCH THE BIGGEST SEARCH IN THE HISTORY OF MANKIND FOR THE ANSWER WE ARE LOOKING FOR
 * 
 * 
 */

 const parallely = () => {

    const now = Date.now()
    doSomethingAsync(3000 , 44).catch(err => {
        console.log(`It's the last resort`)
        let allPromises = []
        for(let i = 0 ; i < 43 ; i++){ // 42 functions actually launched , all done in how many seconds????
            allPromises.push(doSomethingAsync(3000 , i ).then(v => {
                return {
                    state: true,
                    answer: v,
                    number: i
                }
            }).catch( err => {
                return {
                    state: false,
                    answer: err,
                    number: i
                }
            }))
        }
        return Promise.all(allPromises) // OUR SAVIOUR FOR PSEUDO PARALLELISM ....
    }).then( values => {
        values.forEach(v => {
            if(v.state == true){
                console.log(`\n\nWe found the secrets to UNIVERSE its :` , v )
                console.log(`It took about : ${(Date.now() - now)/1000}seconds`)
            }
        })
    })
 }

// parallely()

