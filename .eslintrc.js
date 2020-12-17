module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
  },
  overrides: [
    {
      files: ['packages/**/*.js', 'packages/**/*.jsx'],
      rules: {
        'import/prefer-default-export': 'off',
        'no-param-reassign': 'off',
      },
    },
    {
      files: ['packages/web/**/*.js', 'packages/web/**/*.jsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-param-reassign': 'off',
      },
    },
  ],
};
