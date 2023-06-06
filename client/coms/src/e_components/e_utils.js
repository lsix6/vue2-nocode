
export const get_e_children = (eCom, propName) => {
    let children = null
    //
    function check_e_children(arr) {
        if (arr.length > 0) {
            const first = arr[0]
            if (first[propName]) {
                children = arr
            } else {
                check_e_children(first.$children)
            }
        }
    }
    check_e_children(eCom.$children)
    //
    return children
}