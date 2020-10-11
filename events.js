const events = require('events')

const somethingHappensAsync = new events.EventEmitter()

somethingHappensAsync.addListener('happen' , async () => {
    console.log('We will start printing')
    setInterval(() => {
        console.log(`Arrey !! ho gaya , event ho gaya !!`)
    } , 1000)
})


somethingHappensAsync.emit('happen')
