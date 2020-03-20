## 开篇

#### 三大特性

1. 声明式
2. 组件化
3. 一次学习，随处编写

#### 简单组件

> react组件接收传入到render()方法的数据并呈现内容。传入的数据在组件中可以通过`this.props`访问。这种组件写在js中的方式被称为JSX。

#### 有状态的组件

> 组件的数据来源可以来自外部数据（this.props）和内部状态（this.state）。当数据发生变化的时候，render()方法就会被调用一次。（可以通过在render中添加console.log的方式看控制台在数据变化时，是不是重新执行了console.log）


#### 通过CDN连接获得React需要注意

> script上需要添加`crossorigin`标志，并同时建议你验证使用的 CDN 是否设置了 Access-Control-Allow-Origin: * HTTP 请求头。

```
<script crossorigin src="..."></script>
```