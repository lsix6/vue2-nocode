
export const find_e_com_in_children = (eCom, propName, id) => {
    //
    function find_in_children(children) {
        let com = null
        if (children) {
            for (let child of children) {
                if (child[propName] && child.editorItem && child.editorItem.id === id) {
                    com = child
                } else {
                    com = find_in_children(child.$children)
                }
                //
                if (com) {
                    break
                }
            }
        }
        return com
    }
    //
    return find_in_children(eCom.$children)
}
