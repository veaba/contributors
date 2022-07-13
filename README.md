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
