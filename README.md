>本分支将不定时合并各开发分支的内容，并对整体样式进行修改

# log
2022-12-01
- 以main分支(kxx)作为初始内容
- 合并pzp分支
  - 添加`/assets/image`文件夹，添加图片
  - 修改`HomeView.vue`，将vue默认主页面改为各页面导航
  - 添加 `Profile.vue,Scholar.vue,Testpage.vue` 页面（Testpge页面仅用于样式测试）
- 合并zy分支
  - 添加`Main.vue`主页面
  - 添加`SearchPaper.vue`搜索论文页面
  - 添加`SearchAuthor.vue`搜索学者页面
- 合并rzq分支
  - 添加`AdvancedSearchBox.vue`组件
  - 添加`AdvancedSearch.vue`页面
  - 修改`package-lock.json`，**注意：在此处修改后需要先执行`npm install`才能正常运行项目**
  - 添加`plugins/element.js`，但是`main.js`中的按需引入尚未使用
- 修改`App.vue`
- 修改`router/index.js`