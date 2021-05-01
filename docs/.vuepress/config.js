module.exports = {
  title: 'agel-form | 使用文档',
  description: '基于 element-ui form 的二次封装加强组件',
  dest: './distdocs',
  base: '/agel-form/',
  themeConfig: {
    updatePopup: true,
    displayAllHeaders: true,
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/example/' },
      { text: '更新日志', link: '/log' },
      { text: 'Github', link: 'https://github.com/agrass-GitHub/agel-form' }
    ],
    sidebar: [
      {
        title: '表单组件',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/example/',
          '/example/quick-start',
          '/example/agel-form',
        ]
      },
      {
        title: '单组件',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/component/',
          '/component/agel-select',
          '/component/agel-tree-select',
          '/component/agel-checkbox-radio',
          '/component/agel-upload',
        ]
      },
      {
        title: '自定义组件',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/custom',
        ]
      },
    ],
  },
};
