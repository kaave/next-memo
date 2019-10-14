# チューニング

おおまかに分けて、

- Component をまるごと再描画防止するパターン
- render 内で使ってる値を Hooks でひっかけて再描画防止するパターン

の 2 種類。

## Class の場合

- `ShouldComponentUpdate(prevProps, nextProps) => boolean` を実装する
- `extends PureComponent` で実装する
  - `ShallowEqual` されるらしい

## FC の場合

- `React.memo(React.FC, ((prevProps, nextProps) => boolean)?)` でくくる
  - 第 2 引数なしの場合: PureComponent
  - 第 2 引数ありの場合: ShouldComponentUpdate

## Hooks の場合

- useMemo で再計算を防止
  - props をゴニョゴニョする系は全部 useMemo するくらいで OK
- useCallback で関数が作り直されるのを防止
  - props をゴニョゴニョする系は全部 memo

### useMemo で再計算を防止

```ts
const Component: React.FC<{ users: { age: number }[] }> = ({ users }) => {
  const runEveryRender = users.filter(user => user.age <= 18);
  const runWhenProductsChanged = React.useMemo(() => users.filter(user => user.age <= 18), [products]);
};
```

### useCallback でメソッドが作り直されるのを防ぐ

<https://times.hrbrain.co.jp/entry/react-hooks-performance>

```tsx
const Checkbox = React.memo<{ value: boolean; onClick: () => void }>(({ value, onClick }) => {
  console.log('Checkbox is rendered!');
  return <label onClick={onClick}>{value ? '☑' : '□'}</label>;
});

const Wrap = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  // const toggleChecked = () => setIsChecked(!isChecked);
  const toggleChecked = React.useCallback(() => setIsChecked(!isChecked), [isChecked]);

  return <Checkbox value={isChecked} onClick={toggleChecked} />;
};

const App = () => {
  // textが更新されるたびに、まるごとrenderされてWrapが更新される…
  // 結果、まわりまわってCheckboxも更新される
  const [text, setText] = React.useState('');

  return (
    <>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <Wrap />
    </>
  );
};
```
