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
        iconPath: "assets/icons/home.png",
        selectedIconPath: "assets/icons/home_fill.png"
      },
      {
        pagePath: "pages/month/index",
        text: "月度帐单",
        iconPath: "assets/icons/calendar.png",
        selectedIconPath: "assets/icons/calendar_fill.png"
      },
      {
        pagePath: "pages/category/index",
        text: "分类帐单",
        iconPath: "assets/icons/category.png",
        selectedIconPath: "assets/icons/category_fill.png"
      },
      {
        pagePath: "pages/user/index",
        text: "我的",
        iconPath: "assets/icons/person.png",
        selectedIconPath: "assets/icons/person_fill.png"
      }
    ],
    selectedColor: "#FF9C00",
    backgroundColor: "#ffffff",
    borderStyle: "black"
  }
})
