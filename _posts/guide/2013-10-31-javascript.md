---
layout: post
categories: guide
title: JavaScript书写规范
version: 1.0
date: 2013-10-31
class: page
tags: Js Guide
parts:
  - name: 目录结构
    id: sturcture
  - name: 类库版本
    id: version
  - name: 模板系统
    id: template
  - name: 模块文件
    id: cmd
---
<div id="{{ page.parts[0].id }}" class="section">
    <h2>{{ page.parts[0].name }}</h2>
    <p>使用 <a href="http://seajs.org" target="_blank">Seajs</a> 实现脚本的模块化加载。</p>
        <pre><code>JS/
├── apps/
│   ├── requset.js
│   ├── carousel.js
│   ├── ...
├── mod/
│   ├── art/
│   │   ├── template.js
│   ├── jquery/
│   │   ├── 1.9.1/
│   │   │   ├── jquery.js
│   │   │   ├── jquery.min.map
│   │   ├── plugin/
│   │   │   ├── jscrollpane.js
│   │   │   ├── mousewheel.js
│   │   │   ├── ...
│   ├── seajs/
│   │   ├── sea.js
│   │   ├── sea.min.map
└── index.js                      # 单一入口文件</code></pre>
</div>

## {{ page.parts[1].name }}

使用<code>jQuery 1.9.1</code>版本。 使用<code>Seajs</code>最新版本。


## {{ page.parts[2].name }}

<a href="https://github.com/aui/arttemplate/" target="_blank">artTemplate</a> 作为前端模板渲染引擎。

## {{ page.parts[3].name }}

<p><code>seajs</code>遵循 <a href="https://github.com/cmdjs/specification/blob/master/draft/module.md" target="_blank">CMD</a> 规范，在<code>CMD</code>规范中，一个模块就是一个文件。代码的书写格式如下:</p>

```javascript
/**
* @param {String} module id.
* @param {Array} module dependencies.
* @param {Function} module.
*/
define(id?, deps?, factory)
```