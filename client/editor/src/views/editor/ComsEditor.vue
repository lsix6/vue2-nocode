<template>
  <el-tabs class="com-editor-tabs" v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
    <el-tab-pane class="tabs-content" :key="item.name" v-for="(item) in editableTabs" :label="item.title"
      :name="item.name">
      {{ item.content }}
      <Editor />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Editor from './Editor.vue'

export default {
  name: 'ComsEditor',
  components: {
    Editor
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
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
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
.com-editor-tabs {
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
</style>
