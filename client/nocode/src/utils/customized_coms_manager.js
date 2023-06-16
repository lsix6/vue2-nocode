
const getComSaveName = (comName) => {
    return 'com_' + comName
}

export class CustomizedComsManager {

    loadComData(comName) {
        let comData = null
        //
        const s = localStorage.getItem(getComSaveName(comName))
        if (s) {
            comData = JSON.parse(s)
        }
        //
        console.log('loadComData', comName, comData)
        return comData
    }

    saveComData(comName, comData) {
        console.log('saveComData', comName, comData)
        if (comName && comData) {
            localStorage.setItem(getComSaveName(comName), JSON.stringify(comData))
        }
    }

    removeComData(comName) {
        console.log('removeComData', comName)
        if (comName) {
            localStorage.removeItem(getComSaveName(comName))
        }
    }
}