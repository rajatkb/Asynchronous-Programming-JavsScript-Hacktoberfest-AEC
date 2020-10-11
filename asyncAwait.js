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

const sequentially = async () => {
    console.log(`Trying to find the answer sequentially !!`)
    const now = Date.now()

    let value = await doSomethingAsync(3000 , 43).catch(err => {console.log(`We shall try again with 44`); return undefined})
    if(value == undefined)
        value = await doSomethingAsync(3000 , 44).catch(err => {console.log(`We have to get it right !!`); return undefined })
    if(value == undefined)
        value = await doSomethingAsync(3000 , 42)
    
    console.log("\n\nWE GOT IT RIGGHTTTT message : " , value)
    console.log(`Damn it took : ` , (Date.now() - now)/1000 , `seconds to find the answer\n\n`)

}

sequentially()


