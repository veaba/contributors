## Metrics

```js
200	
- w - Start of the week, given as a Unix timestamp.
- a - Number of additions
- d - Number of deletions
- c - Number of commits
```

##  how use 

1. pull request your repo 
2. we merge your PR
3. the repo will be generate some svg data
4. get `https://githubxx.com/veaba/contributors-list/contributors/{owner}/{repo}.svg`


## Features
### TODO Config: ignore some user


```diff
export default {
+  'veaba/veaba': {
+    ignore: [] // if you need ignore some users
+  }
}
```

### TODO Config: category

```diff
export default {
+  'veaba/veaba': {
+    category: [
+     {
+        label: 'Platinum Sponsors',
+        users: ['veaba']
+     },
+     {
+        label: 'Gold Sponsors',
+        users: ['veaba2']
+     },
+     {
+        label: 'Silver Sponsors',
+        users: ['veaba3']
+     },
+     {
+        label: 'Sponsors',
+        users: ['veaba4']
+     }
+  ]
  }
}
```


## Design 

- [] 自动裁剪圆角
- [x] 左右自动居中特性
  - 如果当前行没有溢出，则会被居中

  ![auto-center.svg](docs/default/auto-center.svg)

### size

### category

### circle

### margin

### text display

- [] 文字是否需要颜色？