# elastic-react-ssr

`
create repository elastic-react-ssr [https://github.com/dcwmark]
`

```
> ~/Projects/workspace/javascript/elasticsearch/
> take elastic-react-ssr
> echo "# elastic-react-ssr" >> README.md
> git init
> git add README.md
> git commit -m "first commit"
> git remote add origin https://github.com/dcwmark/elastic-react-ssr.git
> git push -u origin master
```

```
> npm init
> npm install elasticsearch --save

> npm i webpack webpack-cli webpack-node-externals html-webpack-plugin html-loader -D
> npm i @babel/core @babel/runtime babel-loader @babel/preset-env @babel/preset-react @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-runtime -D
> npm i react react-dom react-router-dom prop-types
> npm i nodemon -D
> npm i core-js cors express body-parser isomorphic-fetch serialize-javascript
```

> Was getting
> ```
> module.exports = {
>                ^
> TypeError: Cannot assign to read only property 'exports' of object '#<Object>'
> ```
> Basically, all `module.exports` was getting this error.
> 
> Turned out in .balelrc had `target > node > 10` that seemed to be the cause
> ```
>     "presets": [[
>         "@babel/preset-env", {
>             "targets": {
>                 "node": "10"
>             }
>         }
>     ],
> ```
> Removing the `target` seemed to have alleviated the problem.
> 
> But then, that seems to create another problem:
> ```
> webpack:///./fileParsers/index.js?:17
>    var _fileToJSON = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fileName) {
>                                                      ^
> ReferenceError: regeneratorRuntime is not defined
>    at eval (webpack:///./fileParsers/index.js?:17:
> ```
>
> Adding `@babel/plugin-transform-runtime` corrected the regeneratorRuntime issue but `module.export` issue resurfaced.
>
> With this circular problem, it is decided to stop using `module.export`, as numerous soltuion sites warn against mixing of `import` and `modular.export1
>
