<template>
    <div class="editor-frame">
        <div class="panel__top">
            <div class="panel__basic-actions"></div>
        </div>
        <div class="editor-row">
            <div class="editor-canvas">
                <div id="gjs">...</div>
            </div>
            <div class="panel__right">
                <div class="layers-container"></div>
            </div>
        </div>
        <div id="blocks"></div>
    </div>
</template>

<script>

import 'grapesjs/dist/css/grapes.min.css'
import grapesjs from 'grapesjs'

export default {
    data() {
        return {
        }
    },
    mounted() {
        this.initGrapesjs()
    },
    methods: {
        initGrapesjs() {
            const initCustomComTypes = editor => {
                editor.DomComponents.addType('my-type', {
                    isComponent: el => el.tagName === 'MYCOM',
                    model: {
                        defaults: {
                            tagName: 'div',
                        },
                    },
                    view: {
                        tagName: 'div',
                        onRender({ el }) {
                            const btn = document.createElement('button')
                            btn.innerText = 'XXX'
                            el.appendChild(btn)
                        },
                    },
                })
            }

            const editor = grapesjs.init({
                container: '#gjs',
                fromElement: true,
                height: 'auto',
                width: 'auto',
                storageManager: false,
                layerManager: {
                    appendTo: '.layers-container'
                },
                panels: {
                    defaults: [
                        {
                            id: 'layers',
                            el: '.panel__right',
                            // Make the panel resizable
                            resizable: {
                                maxDim: 350,
                                minDim: 200,
                                tc: 0, // Top handler
                                cl: 1, // Left handler
                                cr: 0, // Right handler
                                bc: 0, // Bottom handler
                                // Being a flex child we need to change `flex-basis` property
                                // instead of the `width` (default)
                                keyWidth: 'flex-basis',
                            },
                        }
                    ]
                },
                plugins: [
                    initCustomComTypes
                ],
                blockManager: {
                    appendTo: '#blocks',
                    blocks: [
                        {
                            id: 'section', // id is mandatory
                            label: '<b>Section</b>', // You can use HTML/SVG inside labels
                            attributes: { class: 'gjs-block-section' },
                            content: `<mycom>AAA</mycom>`,
                        }, {
                            id: 'text',
                            label: 'Text',
                            content: '<div data-gjs-type="text">Insert your text here</div>',
                        }, {
                            id: 'image',
                            label: 'Image',
                            // Select the component once it's dropped
                            select: true,
                            // You can pass components as a JSON instead of a simple HTML string,
                            // in this case we also use a defined component type `image`
                            content: { type: 'image' },
                            // This triggers `active` event on dropped components and the `image`
                            // reacts by opening the AssetManager
                            activate: true,
                        }
                    ]
                },
            })

            editor.Panels.addPanel({
                id: 'panel-top',
                el: '.panel__top',
            });
            editor.Panels.addPanel({
                id: 'basic-actions',
                el: '.panel__basic-actions',
                buttons: [
                    {
                        id: 'visibility',
                        active: true, // active by default
                        className: 'btn-toggle-borders',
                        label: '<u>B</u>',
                        command: 'sw-visibility', // Built-in command
                    },
                    {
                        id: 'export',
                        className: 'btn-open-export',
                        label: 'Exp',
                        command: 'export-template',
                        context: 'export-template', // For grouping context of buttons from the same panel
                    },
                    {
                        id: 'show-json',
                        className: 'btn-show-json',
                        label: 'JSON',
                        context: 'show-json',
                        command(editor) {
                            editor.Modal.setTitle('Components JSON')
                                .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
                                .open();
                        },
                    },
                    {
                        id: 'preview',
                        className: 'btn-show-json',
                        label: 'PREVIEW',
                        context: 'preview',
                        command(editor) {
                            editor.runCommand('preview')
                        },
                    },
                ],
            });
        },
    },
}
</script>

<style lang="scss">
.editor-frame {
    flex: 1;
    display: flex;
    flex-direction: column;

    .panel__top {
        padding: 0;
        width: 100%;
        display: flex;
        position: initial;
        justify-content: center;
        justify-content: space-between;

        .panel__basic-actions {
            position: initial;
        }
    }

    .editor-row {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex-wrap: nowrap;
        flex: 1;

        .editor-canvas {
            flex-grow: 1;
            display: flex;
        }

        .panel__right {
            flex-basis: 230px;
            position: relative;
            overflow-y: auto;
        }
    }
}

/* Let's highlight canvas boundaries */
#gjs {
    flex: 1;
    /* border: 3px solid blue; */
}

/* Reset some default styling */
.gjs-cv-canvas {
    top: 0;
    width: 100%;
    height: 100%;
}

.gjs-block {
    width: auto;
    height: auto;
    min-height: auto;
}
</style>