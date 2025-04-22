export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/add/index',
    'pages/category/index',
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
        pagePath: "pages/add/index",
        text: "记一笔",
        iconPath: "../assets/icons/placeholder.png",
        selectedIconPath: "../assets/icons/placeholder.png"
      },
      {
        pagePath: "pages/stats/index",
        text: "stats",
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
