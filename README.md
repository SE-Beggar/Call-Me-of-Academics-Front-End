>本分支将不定时合并各开发分支的内容，并对整体样式进行修改

一些小寄巧：
- 快速删除node_modules文件夹
   1. 安装`rimraf`包，`npm i rimraf -g`
   2. 在node_modules上一级文件夹打开终端，执行`rimraf node_modules`（**类似于`rm -rf`命令，慎用！**）
- 将dev分支合并到你的分支
    1. **首先检查dev分支的相关内容是否与你的分支内容一致**
    2. 拉取远程代码 `git pull`
    3. 如果本地还没有dev分支，使用以下命令来切换到dev分支并且将本地dev分支和远程dev分支关联起来，`git checkout -b dev origin/dev`
    4. 进入你的个人分支(以pzp为例)`git checkout pzp`
    5. 进行将dev分支合并进你的分支`git merge dev`
    6. 如果有冲突需要手动解决冲突，可以使用以下命令查看当前目录下冲突文件`git diff --name-only --diff-filter=U`
    7. 将有冲突的部分全部解决后，执行`git add`和`git commit`指令后合并完成

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

2022-12-11
- 修改登录注册页面样式
- 修改tab标签
- 添加导航页面
- 添加上边栏
- 添加下边栏

2022-12-12
- 合并zy分支
  - 将Main.vue改为Main1.vue
- 合并zel分支
  - 添加Journal.vue
