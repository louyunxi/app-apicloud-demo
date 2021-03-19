
const pageHeadFooterConfig = {
  default: {
    // 默认头部底部样式
    path: ['/'],
    headbg: '#f80707',
    footerbg: '#fff',
    statusFontColor: 'dark'
  },
  type_a: {
    // 彩头白底白字
    path: ['/home'],
    headbg:
			'-webkit-gradient(linear, right top, left top, from(#31D36E), to(#8FD713))',
    footerbg: '#000',
    statusFontColor: 'light'
  },
  type_b: {
    // 彩头白底
    path: ['/login'],
    headbg: () => require('@/assets/images/common/bg-head.jpg'),
    footerbg: '#f0f',
    statusFontColor: 'light'
  },
  type_c: {
    // 白头灰底
    path: ['/aboutme'],
    headbg:
			'-webkit-gradient(linear, right top, left top, from(#31D36E), to(#8FD713))',
    footerbg: '#fff',
    statusFontColor: 'light'
  },
  none_type: {
    // 白头灰底
    path: ['/login'],
    headbg: 'yellow',
    footerbg: '#fff',
    statusFontColor: 'light'
  }
}
export default pageHeadFooterConfig
