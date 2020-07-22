const spawn = require('await-spawn')
const { spawn: sp } = require('child_process')
const nodeJS = async value => {
    try{
        const bl = await spawn('node', ['-e', value])

        return bl.toString()
    }catch(err){
        throw err.stderr.toString()
    }
}

const python = async value => {
    try{
        const bl = await spawn('python', ['-c', value])

        return bl.toString()
    }catch(err){
        throw err.stderr.toString()
    }
}

module.exports = {
    nodeJS,
    python
}