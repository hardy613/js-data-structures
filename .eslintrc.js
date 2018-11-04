module.exports = {
    env: {
        es6: true,
        node: true
    },
    extends: require.resolve('eslint-config-airbnb-base'),
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
				'no-tabs': 'off',
				'no-underscore-dangle': 'off',
				'space-before-blocks': 'off',
        'linebreak-style': [
            'error',
            'unix'
        ],
        indent: [
        	2,
          'tab',
					{ 
						SwitchCase: 1, 
					},
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'never'
        ],
    }
}
