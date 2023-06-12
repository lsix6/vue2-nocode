const C_COMS_LIST = 'coms_list'

export const loadComsList = () => {
    let comsList = []
    const s = localStorage.getItem(C_COMS_LIST)
    if (s) {
        comsList = JSON.parse(s)
    }
    console.log('[ComsList] loadComsList', comsList)
    //
    return comsList
}

export const saveComsList = (comsList) => {
    console.log('[ComsList] saveComsList', comsList)
    if (comsList) {
        localStorage.setItem(C_COMS_LIST, JSON.stringify(comsList))
    }
}

const getComSaveName = (comName) => {
    return 'com_' + comName
}

export const loadComData = (comName) => {
    let comData = []
    //
    const s = localStorage.getItem(getComSaveName(comName))
    if (s) {
        comData = JSON.parse(s)
    }
    //
    return comData
}

export const saveComData = (comName, comData) => {
    if (comName && comData) {
        localStorage.setItem(getComSaveName(comName), JSON.stringify(comData))
    }
}

export const removeComData = (comName) => {
    if (comName) {
        localStorage.removeItem(getComSaveName(comName))
    }
}