module.exports = {
  presets: [
    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
    ['@babel/typescript', { isTSX: true, allExtensions: true }],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          _common: './src/common',
          _deps: './src/deps',
          _util: './src/util',
          _src: './src',
        },
      },
    ],
  ],
  ignore: ['**/*.test.ts', '**/*.test.js'],
};
