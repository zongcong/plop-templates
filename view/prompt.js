const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate a view',
  prompts: [
    {
      type: 'input',
      name: 'moduleName',
      message: 'moduleName default views'
    },
    {
      type: 'input',
      name: 'name',
      message: 'view name please',
      validate: notEmpty('name')
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: 'Blocks:',
      choices: [
        {
          name: '<template>',
          value: 'template',
          checked: true
        },
        {
          name: '<script>',
          value: 'script',
          checked: true
        },
        {
          name: 'style',
          value: 'style',
          checked: true
        },
        {
          name: '<select-down>',
          value: 'selectDownComponent',
          checked: false
        },
        {
          name: '<search>',
          value: 'searchComponent',
          checked: false
        },
        {
          name: '<tips>',
          value: 'tipsComponent',
          checked: false
        },
        {
          name: '<new-button>',
          value: 'elButton',
          checked: false
        }
      ],
      validate(value) {
        if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
          return 'View require at least a <script> or <template> tag.'
        }
        return true
      }
    }
  ],
  actions: data => {
    const moduleName = '{{moduleName}}'
    const name = '{{name}}'
    const actions = [{
      type: 'add',
      path: `src/views/${moduleName ? moduleName + '/' : '/'}${name}/index.vue`,
      templateFile: 'plop-templates/view/index.hbs',
      data: {
        name: name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style'),
        selectDownComponent: data.blocks.includes('selectDownComponent'),
        searchComponent: data.blocks.includes('searchComponent'),
        tipsComponent: data.blocks.includes('tipsComponent'),
        elButton: data.blocks.includes('elButton')
      }
    }]

    return actions
  }
}
