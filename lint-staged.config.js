module.exports = {
  '*.{js,ts,tsx}': ['eslint --fix', 'git add'],
  '*.scss': ['stylelint --fix', 'git add'],
  '*.json': ['prettier --write', 'git add'],
  'package.json': ['sort-package-json', 'git add'],
};
