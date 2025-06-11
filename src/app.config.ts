export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/category/index',
    'pages/category/manage',
    'pages/month/index',
    'pages/user/index',
    'pages/user/login',
    'pages/user/export',
    'pages/admin/addUser',
    'pages/admin/deleteUser',
    'pages/admin/report',
    'pages/budget/manage'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '记账本',
    navigationBarTextStyle: 'black'
  },
    tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "账单",
        iconPath: "assets/icons/placeholder.png",
        selectedIconPath: "assets/icons/placeholder.png"
      },
      {
        pagePath: "pages/month/index",
        text: "月度帐单",
        iconPath: "assets/icons/placeholder.png",
        selectedIconPath: "assets/icons/placeholder.png"
      },
      {
        pagePath: "pages/category/index",
        text: "分类帐单",
        iconPath: "assets/icons/placeholder.png",
        selectedIconPath: "assets/icons/placeholder.png"
      },
      {
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "assets/icons/placeholder.png",
        selectedIconPath: "assets/icons/placeholder.png"
      }
    ],
    selectedColor: "#FF9C00",
    backgroundColor: "#ffffff",
    borderStyle: "black"
  }
})
