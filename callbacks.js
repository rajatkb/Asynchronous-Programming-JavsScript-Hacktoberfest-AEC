console.log(`We start with callbacks !!`)

/*
    Every statment here will be called except the ones which are in callbacks
    Because callbacks are subjective to when their callee calls them
*/

// This is synchronous -> creates a linear call stack
function doSomething(value , callback){
    callback(value)
}



// This will now print at some time after because the internal mechanism does this so

function doSomethingWithDelay(value ,time ,  callback){
    setTimeout(() =>{   // setTimeOut is something provided by the co-environment where JavaScript is running
            callback(value) // chrome has it's own providence , so as node.js runtime.
        } ,time
    )
}

// Syn test
doSomething( 3 , (value) => console.log(`Sync : ${value}`))


// async test
doSomethingWithDelay(42 , 3000 ,  (value) => console.log(`ASync : ${value}`))
doSomethingWithDelay("not 42" , 3000 ,  (value) => console.log(`ASync : ${value}`))


// This wont work but will be used to show something important
const meassureTimeASync = (time) => {
    console.log("So whats the time taken for Asynchrnous operations to finish up Is  ???")
    const now = Date.now()
    let calls = (() => {
        let call_ = 0
        return () => {
            call_++
            if(call_ == 2)
                console.log(`time taken for both of the 3 second function to run :` , Date.now() - now)
        }
    })()
    

    doSomethingWithDelay(42 , time ,  (value) => {
        console.log(`ASync 1: ${value}`)
        calls()
    })

    doSomethingWithDelay("not 42" , time ,  (value) => {
        console.log(`ASync 2: ${value}`)
        calls()
    })

    // while(calls != 2){}
    // console.log(`time taken for both of the 3 second function to run :` , Date.now() - now)
}

// meassureTimeASync(3000)

