<template>
  <div class="coms-editor-frame">
    <el-tabs class="coms-editor-tabs" v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
      <el-tab-pane class="tabs-content" :key="item.name" v-for="(item) in editableTabs" :label="item.title"
        :name="item.name">
        {{ item.content }}
        <Editor />
      </el-tab-pane>
    </el-tabs>
    <ComsListDlg ref="comsListDlg" />
  </div>
</template>

<script>
import ComsListDlg from './ComsListDlg.vue'
import Editor from './Editor.vue'

export default {
  name: 'ComsEditor',
  components: {
    Editor,
    ComsListDlg,
  },
  data() {
    return {
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
    }
  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        // let newTabName = ++this.tabIndex + '';
        // this.editableTabs.push({
        //   title: 'New Tab',
        //   name: newTabName,
        //   content: 'New Tab content'
        // });
        // this.editableTabsValue = newTabName;
        this.$refs.comsListDlg.show()
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
      }
    }
  }
}
</script>

<style lang="scss">
.coms-editor-frame {
  flex: 1;
  display: flex;

  .coms-editor-tabs {
    flex: 1;
    display: flex;
    flex-direction: column;

    .el-tabs__content {
      flex: 1;
      display: flex;

      .tabs-content {
        flex: 1;
      }
    }
  }

}
</style>
