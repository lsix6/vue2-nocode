import VCard from './VCard.vue'
import CoreModel from '../CoreModel'
import Vue from 'vue'
import CoreView from '../CoreView'

export default (editor) => {
  var comps = editor.DomComponents
  var defaultType = comps.getType('default')
  var defaultModel = defaultType.model
  var defaultView = defaultType.view;
  const type = 'v-card'

  let domc = editor.DomComponents;
  const ComponentsView = domc.ComponentsView;

  return {
    isComponent: function (el) {
      if (el.tagName === type.toUpperCase())
        return {
          type,
          content: el.innerHTML,
          components: [],
        }
    },
    model: {
      ...CoreModel,
      defaults: {
        ...defaultModel.prototype.defaults,
        droppable: true,
        stylable: [
          'height', 'width'
        ],
        resizable: true
      },

    },
    view: defaultType.view.extend({
      ...CoreView(editor),

      initialize(o) {
        defaultView.prototype.initialize.apply(this, arguments);
        this.classEmpty = this.ppfx + 'v-card';
      },

      tagName: 'div',

      getChildrenSelector() {
        return '#slot';
      },

      renderContent() {
        if (this.el.lastChild) {
          return
        }
        //
        console.log('appendCom')
        var div = document.createElement('div')
        this.el.appendChild(div)

        var vbtn = new VCard({
          el: div,
        })
        this.updateAttributes();
        this.updateClasses();

        var actCls = this.$el.attr('class') || '';
        this.$el.attr('class', (actCls + ' ' + this.classEmpty).trim());

      },

      renderChildren: function (appendChildren) {
        var container = this.getChildrenContainer()

        // This trick will help perfs by caching children
        if (!appendChildren) {
          this.componentsView = new ComponentsView({
            collection: this.model.get('components'),
            config: this.config,
            defaultTypes: this.opts.defaultTypes,
            componentTypes: this.opts.componentTypes,
          })
          this.childNodes = this.componentsView.render(container).el.childNodes
        } else {
          this.componentsView.parent = container
        }

        var childNodes = Array.prototype.slice.call(this.childNodes)

        for (var i = 0, len = childNodes.length; i < len; i++) {
          container.appendChild(childNodes.shift())
        }

      },

    })

  }
}