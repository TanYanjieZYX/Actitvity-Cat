module.exports = {
  parser: 'typescript-eslint-parser',
  extends: 'react-app',
  plugins: ['typescript', 'prettier'],
  rules: {
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    eqeqeq: [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
    'typescript/class-name-casing': 'error',
    'prettier/prettier': 'error',
    "no-restricted-globals": ["error", "event", "fdescribe"]
  }
}
