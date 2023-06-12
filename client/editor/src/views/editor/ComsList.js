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