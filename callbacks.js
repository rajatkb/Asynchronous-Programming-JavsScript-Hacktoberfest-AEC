console.log(`We start with callbacks !!`)

/*
    Every statment here will be called except the ones which are in callbacks
    Because callbacks are subjective to when their callee calls them
*/

// This is synchronous -> creates a linear call stack
function doSomething(value , callback){
    callback(value)
}

doSomething( 3 , (value) => console.log(`Sync : ${value}`))

// This will now print at some time after because the internal mechanism does this so

function doSomethingWithDelay(value ,time ,  callback){
    setTimeout(() => callback(value) ,time)
}

doSomethingWithDelay(45 , 3000 ,  (value) => console.log(`Sync : ${value}`))