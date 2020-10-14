
## 目录结构

其中 `index.js` 从 `src/React.js` 文件导出功能，并导出部分 `unstable` 模块，作为 `React` 对象的属性，及一些类型。`React.js` 从其他文件导出类型和模块。两次导出，主要是做了一些命名更改，及结构整理。

```
├── README.md
├── index.classic.fb.js
├── index.experimental.js
├── index.js // 入口文件
├── index.modern.fb.js
├── index.stable.js
├── jsx-dev-runtime.js
├── jsx-runtime.js
├── node_modules
├── npm
├── package.json
├── src
│   ├── BadMapPolyfill.js
│   ├── IsSomeRendererActing.js
│   ├── React.js // 主文件
│   ├── ReactBaseClasses.js
│   ├── ReactBatchConfig.js
│   ├── ReactBlock.js
│   ├── ReactChildren.js
│   ├── ReactContext.js
│   ├── ReactCreateRef.js
│   ├── ReactCurrentBatchConfig.js
│   ├── ReactCurrentDispatcher.js
│   ├── ReactCurrentOwner.js
│   ├── ReactDebugCurrentFrame.js
│   ├── ReactElement.js
│   ├── ReactElementValidator.js
│   ├── ReactForwardRef.js
│   ├── ReactFundamental.js
│   ├── ReactHooks.js
│   ├── ReactLazy.js
│   ├── ReactMemo.js
│   ├── ReactMutableSource.js
│   ├── ReactNoopUpdateQueue.js
│   ├── ReactSharedInternals.js
│   ├── __tests__
│   ├── cache
│   ├── forks
│   └── jsx
└── unstable-cache.js
```

## 属性与源码的对应

先打印一下 `React` 的属性

![React 属性](/mdImgs/20200814152942.jpg)

下面是对应关系

| 属性 | 目录 | 备注 |
| -- | -- | -- |
| Children | src/ReactChildren | 仅导出了map, forEach, count, toArray, only |
| createRef | src/ReactCreateRef |  |
| Component | src/ReactBaseClasses |  |
| PureComponent | src/ReactBaseClasses |  |
| createContext | src/ReactContext |  |
| forwardRef | src/ReactForwardRef |  |
| lazy | src/ReactLazy |  |
| memo | src/ReactMemo |  |
| useCallback, ... | src/ReactHooks | 以及其他 hook |
| Fragment | shared/ReactSymbols-REACT_FRAGMENT_TYPE |  |
| Profiler | shared/ReactSymbols-REACT_PROFILER_TYPE |  |
| StrictMode | shared/ReactSymbols-REACT_STRICT_MODE_TYPE |  |
| unstable_DebugTracingMode | shared/ReactSymbols-REACT_DEBUG_TRACING_MODE_TYPE |  |
| Suspense | shared/ReactSymbols-REACT_SUSPENSE_TYPE |  |
| createElement | src/ReactElementValidator-createElementWithValidation | 开发模式  |
| createElement | src/ReactElement-createElement | 生产模式  |
| cloneElement | src/ReactElementValidator-cloneElementWithValidation | 开发模式  |
| cloneElement | src/ReactElement-cloneElement | 生产模式  |
| createFactory | src/ReactElementValidator-createFactoryWithValidation | 开发模式  |
| createFactory | src/ReactElement-createFactory | 生产模式  |
| isValidElement | src/ReactElement |  |
| version | src/ReactVersion |  |
| __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED | src/ReactSharedInternals |  |
| SuspenseList | shared/ReactSymbols-REACT_SUSPENSE_LIST_TYPE |  |
| unstable_LegacyHidden | shared/ReactSymbols-REACT_LEGACY_HIDDEN_TYPE |  |
| unstable_Scope | shared/ReactSymbols-REACT_SCOPE_TYPE |  |
| unstable_withSuspenseConfig | src/ReactBatchConfig-withSuspenseConfig |  |
| block | src/ReactBlock-block |  |
| unstable_createFundamental | src/ReactFundamental-createFundamental |  |
| unstable_useOpaqueIdentifier | src/ReactHooks-useOpaqueIdentifier |  |
| __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED | 全局属性 | |
| ... |  | 还有其他一些 unstable 属性 |


