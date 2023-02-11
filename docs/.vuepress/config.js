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
      {
        text: 'Github',
        items: [
          {
            text: 'agel-form',
            link: 'https://github.com/agrass-GitHub/agel-form',
          },
          {
            text: 'agel-table',
            link: 'https://github.com/agrass-GitHub/agel-table',
          },
          {
            text: 'agel-admin',
            link: 'https://github.com/agrass-GitHub/agel-admin',
          },
          {
            text: 'element-plus-crx',
            link: 'https://github.com/agrass-GitHub/element-plus-crx',
          }
        ]
      }
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
          '/example/edge-cases',
        ]
      },
      {
        title: '单组件',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/component/agel-form-layout',
          '/component/agel-checkbox-radio',
          '/component/agel-select',
          '/component/agel-tree-select',
          '/component/agel-upload',
          '/component/agel-map-input',
          '/component/agel-dynamic-tags',
        ]
      },
      {
        title: '其他组件',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/component/agel-search-panel',
          '/component/agel-form-dialog',
        ]
      },
    ],
  },
};
