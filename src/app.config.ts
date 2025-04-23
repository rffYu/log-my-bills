export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/add/index',
    'pages/category/index',
    'pages/month/index'
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
        iconPath: "../assets/icons/placeholder.png",
        selectedIconPath: "../assets/icons/placeholder.png"
      },
      {
        pagePath: "pages/month/index",
        text: "月度帐单",
        iconPath: "../assets/icons/placeholder.png",
        selectedIconPath: "../assets/icons/placeholder.png"
      },
      {
        pagePath: "pages/category/index",
        text: "分类帐单",
        iconPath: "../assets/icons/placeholder.png",
        selectedIconPath: "../assets/icons/placeholder.png"
      },
      {
        pagePath: "pages/category/index",
        text: "Maybe",
        iconPath: "../assets/icons/placeholder.png",
        selectedIconPath: "../assets/icons/placeholder.png"
      }
    ],
    selectedColor: "#FF9C00",
    backgroundColor: "#ffffff",
    borderStyle: "black"
  }
})
