const spawn = require('await-spawn')


const nodeJS = async (res, file) => {
    const bl = await spawn('node', ['-e', file])

    res.send(bl.toString())
}

module.exports = {
    nodeJS
}