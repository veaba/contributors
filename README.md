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

### if you need ignore some use

```diff
+ {owner}/{repo}:['userLoginId']

# like

+ 'veaba/veaba': ['veaba']
```
## file md5

```js
const readMD5 = () => {
  const buffer1 = fs.readFileSync(path.join(__dirname, '../src/avatars/8652596.jpg'),'utf-8');
  const hash = crypto.createHash('md5');
  hash.update(buffer1, 'utf8');
  const md5 = hash.digest('hex');
  console.log('md51=>', md5);
  const buffer2 = fs.readFileSync(path.join(__dirname, '../src/avatars/8652596-1.jpg'),'utf-8');
  const hash1 = crypto.createHash('md5');
  hash1.update(buffer2, 'utf8');
  const md51 = hash1.digest('hex');
  console.log('md52=>', md51);
}

readMD5()
```