<template>
  <div class="coms-editor-frame">
    <el-tabs class="coms-editor-tabs" v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
      <el-tab-pane class="tabs-content" :key="item.name" v-for="(item) in editableTabs" :label="item.title"
        :name="item.name">
        <Editor :com_id="item.id" @preview="onPreview" />
      </el-tab-pane>
    </el-tabs>
    <ComsListDlg ref="comsListDlg" @openCom="onOpenCom" />
  </div>
</template>

<script>
import ComsListDlg from './ComsListDlg.vue'
import Editor from './Editor.vue'

const custComsMgr = window.nocode.customizedComsManager

const PreviewWindowName = 'nocode-editor-preview'

export default {
  name: 'ComsEditor',
  components: {
    Editor,
    ComsListDlg,
  },
  data() {
    return {
      editableTabsValue: '',
      editableTabs: [],
      winPreview: null,
    }
  },
  provide() {
    return {
      notifyPreview: (data) => {
        if (this.winPreview) {
          const cmd = {
            name: 'update',
            data,
          }
          console.log('[ComsEditor] notifyPreview, cmd: ', cmd)
          this.winPreview.postMessage(JSON.stringify(cmd))
        }
      }
    }
  },
  mounted() {
    this.loadOpenedComs()
  },
  methods: {
    loadOpenedComs() {
      const list = custComsMgr.loadComsList()
      //
      list.forEach(com => {
        if (com.opened) {
          this.editableTabs.push({
            title: com.name,
            name: com.name,
            id: com.id,
          })
          //
          this.editableTabsValue = com.name
        }
      })
    },
    setComOpended(comName, opened) {
      const list = custComsMgr.loadComsList()
      //
      for (let com of list) {
        if (com.name === comName) {
          com.opened = opened
          break
        }
      }
      //
      custComsMgr.saveComsList(list)
    },
    onOpenCom(com) {
      console.log('[ComsEditor] onOpenCom', com.name)
      //
      this.editableTabs.push({
        title: com.name,
        name: com.name,
        id: com.id,
      })
      this.editableTabsValue = com.name
      //
      this.setComOpended(com.name, true)
    },
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        this.$refs.comsListDlg.open()
      }
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);

        //
        this.setComOpended(targetName, false)
      }
    },
    onPreview(url) {
      console.log('[ComsEditor] onPreview, url: ', url)
      //
      this.winPreview = window.open(url, PreviewWindowName)
    },

  }
}
</script>

<style lang="scss">
.coms-editor-frame {
  flex: 1;
  display: flex;
  overflow: hidden;

  .coms-editor-tabs {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .el-tabs__content {
      flex: 1;
      display: flex;

      .tabs-content {
        flex: 1;
        overflow: hidden;
      }
    }
  }

}
</style>
