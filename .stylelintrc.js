module.exports = {
  extends: ['stylelint-config-recess-order', 'stylelint-config-prettier', 'stylelint-config-recommended-scss'],
  ignoreFiles: ['node_modules/**/*', '.build/**/*', '.next/**/*'],
  syntax: 'scss',
  rules: {
    /*
     * Manual
     */
    // コメント記号とコメント本文の間にスペースを共用する 無効化 IntelliJと相性が悪い
    'comment-whitespace-inside': null,
    // @なにがしで意味不明なものを無効化 mixin関係を通す
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'include'] }],
    // 複雑すぎる指定はNG ただし属性っぽいものはだいたいOK
    'selector-max-specificity': ['0,2,0', { ignoreSelectors: ['/:.*/', '/-[^-].*/', '/ \\+ /'] }],
    // コメントの前には空行
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
    // @extendは難しいから近視
    'at-rule-blacklist': ['extend'],
  },
};
