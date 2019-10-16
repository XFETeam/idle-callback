# @xfe-team/idle-callback

[window.requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) 兼容整合, 提供基本降级函数进行使用, 支持主流浏览器涵盖 IE

## 须知

为了更好的了解当前工具, 请阅读:

* [window.requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)
* [window.cancelIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback)

## 安装

```bash
npm install @xfe-team/idle-callback --save
```

```bash
yarn add @xfe-team/idle-callback
```

## 开始

#### 基本

```javascript
import { requestIdleCallback } from "@xfe-team/idle-callback";

const callback = () => {
  console.log('requestIdleCallback invoked');
};

requestIdleCallback(callback);
```

#### react 场景

请确保在任何调用 requestIdleCallback 后一定要 cancel 进行回收避免潜在的内存泄漏

```jsx harmony
import { requestIdleCallback, cancelIdleCallback } from "@xfe-team/idle-callback";

export default class RouteAnimate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isIdle: false
    };
  }
  
  componentDidMount() {
    this.requestIdleCallbackHook = requestIdleCallback(() => this.setState({ isIdle: true }), { timeout: 200 /* 给一个超时时间 */ });
  }
  
  componentWillUnmount() {
    cancelIdleCallback(this.requestIdleCallbackHook);
  }

  render() {
    return (
      ...
    );
  }
}
```

#### 以 promise 的形式进行调用

```jsx harmony
import { requestIdlePromise } from "@xfe-team/idle-callback";

export default class RouteAnimate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isIdle: false
    };
    this.recycleQueue = [];
  }
  
  async componentDidMount() {
    const { promise, cancel } = requestIdlePromise({ timeout: 200 /* 给一个超时时间 */ });
    this.recycleQueue.push(cancel);
    await promise;
    this.setState({ isIdle: true })
  }
  
  componentWillUnmount() {
    this.recycleQueue.forEach(recycle => recycle());
  }

  render() {
    return (
      ...
    );
  }
}
```

## ChangeLog
## 0.0.3

* feat: 新增 requestIdlePromise 用于支持 promise 调用

## ChangeLog
## 0.0.1

* init commit

## Author
She Ailun

