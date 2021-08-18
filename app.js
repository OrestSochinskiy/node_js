const fs = require('fs');
const path = require('path');

const pathFile18 = path.join(__dirname, '1800');
const pathFile20 = path.join(__dirname, '2000');


fs.readdir(pathFile18, (err, files) => {
    if (err) {
        console.log(err);
        return
    }
    files.forEach(file => {
        const filePath18 = path.join(pathFile18, file);
        const filePath20 = path.join(pathFile20, file);

        fs.readFile(filePath18, (err1, data) => {
            if (err1) {
                console.log(err);
            }
            else if (data.toString().includes('female'))
                return true;

            else {
                (data.toString().includes('male'));
                fs.rename(filePath18, filePath20, err2 => {
                    if (err2) {
                        console.log(err2)
                    }
                    console.log('done')
                })
            }
        })
    })
})


fs.readdir(pathFile20, (err, files) => {
    if (err) {
        console.log(err);
        return
    }
    files.forEach(file => {
        const filePath18 = path.join(pathFile18, file);
        const filePath20 = path.join(pathFile20, file);

        fs.readFile(filePath20, (err1, data) => {
            if (err1) {
                console.log(err);
            } else if (data.toString().includes('female'))
                fs.rename(filePath20, filePath18, err2 => {
                    if (err2) {
                        console.log(err2)
                    }
                    console.log('done')
                })

            else {
                (data.toString().includes('male'))
                return true
            }
        })
    })
})
