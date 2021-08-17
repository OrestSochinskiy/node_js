const fs = require('fs')
const path = require('path')

const pathFile18 = path.join(__dirname, '1800')
const pathFile20 = path.join(__dirname, '2000')
const pathAll = path.join(__dirname, 'allUsers')


fs.readdir(pathAll, (err, files) => {
    if (err) {
        return console.log(err)
    }
    files.forEach(file => {
        const filePath18 = path.join(pathFile18, file)
        const filePath20 = path.join(pathFile20, file)
        const fileAllOfUsers = path.join(pathAll, file)

        fs.readFile(fileAllOfUsers, (err1, data) => {
            if (err1) {
                return console.log(err)
            } else if (data.toString().includes('female'))
                fs.rename(fileAllOfUsers, filePath18, err2 => {
                    if (err2) {
                        return  console.log(err2)
                    }
                    console.log('done')
                })
            else {
                (data.toString().includes('male'))
                fs.rename(fileAllOfUsers, filePath20, err2 => {
                    if (err2) {
                        return console.log(err2)
                    }
                    console.log('done')
                })
            }
        })
    })
})
