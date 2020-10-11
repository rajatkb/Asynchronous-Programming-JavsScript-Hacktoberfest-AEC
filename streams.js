const fs = require('fs')

const codefile = fs.createReadStream('callbacks.js')
const outfile = fs.createWriteStream('copy.js')
console.log("transfer started !!")
codefile.pipe(outfile).on('finish' , () => {
    console.log("transfer complete")
})