
import VBtn from './v-btn'
import VCard from './v-card'

export default (editor, options) => {
    var blockManager = editor.BlockManager
    var comps = editor.DomComponents
    var config = editor.getConfig();
    config.forceClass = 0;

    blockManager.add('v-btn', {
        label: 'Button',
        content: '<v-btn />'
    })

    comps.addType('v-btn', VBtn(editor))

    blockManager.add('v-card', {
        label: 'Card',
        content: '<v-card></v-card>'
    })

    comps.addType('v-card', VCard(editor))
}
