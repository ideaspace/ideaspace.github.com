---
layout: post
categories: js
title: $.Deferred 对象
date: 2013-12-11
class: page
tags: jQuery Deferred Promise
---

## Promise 对象

学习`$.Deferred`对象之前，我们得先聊聊**Promises**对象。

**Promises**对象是**JS**异步编程的解决方案。它的核心是返回一个异步对象，之后的所有操作，都是围绕这个对象展开。**Promises**对象通过一组特定的**api**来管理回调函数。

根据约定，一个**Promises**对象通常包含三个状态

    pending     // 表示操作还没有完成。
    fulfilled： // 表示操作成功。
    rejected：  // 表示操作失败。

当我们初始化一个**Promises**对象的时候，需要传递两个函数参数，分别为`resolve()`和`reject()`。所有的异步代码都在两个回调函数里面完成。

    if (window.Promise) { // Check if the browser supports Promises
       var promise = new Promise(function(resolve, reject) {
         // do a thing, possibly async, then…

         if (/* everything turned out fine */) {
           resolve("Stuff worked!");
         }
         else {
           reject(Error("It broke"));
         }
       });
    }

可以说，这两个回调函数代表的是两个信道。当数据成功返回时，调用`resolve()`；失败调用`reject()`。

## $.Deferred 对象

`$.Deferred`对象是**jQuery**对**Promises**接口的实现。**jQuery**的所有**Ajax**操作函数，默认返回的就是一个**Deferred**对象。此外，**Animation**类操作也可以使用**Deferred**对象。

以`$.ajax`请求为例，一个**Promises**对象有以下几种调用方式。

    // 堆栈式

    var req = $.ajax(url);

    req.done(function () {
        console.log('Request completed');
    });

    // Somewhere else in the application
    req.done(function (retrievedData) {
        $(document.body).html(retrievedData);
    });

    // 平行式

    $.when(taskOne, taskTwo).done(function () {
        console.log('taskOne and taskTwo are finished');
    });

    // 序列式

    var step1, step2, url;

    url = 'http://fiddle.jshell.net';

      step1 = $.ajax(url);

      step2 = step1.then(
        function (data) {
            var def = new $.Deferred();

            setTimeout(function () {
                console.log('Request completed');
                def.resolve();
            },2000);
          return def.promise();
      },
        function (err) {
            console.log('Step1 failed: Ajax request');
        }
      );
      step2.done(function () {
          console.log('Sequence completed')
          setTimeout("console.log('end')",1000);
      });

### 设计一个等待延迟的函数

    $.wait = function(ms) {
        var dfd = new $.Deferred();
        setTimeout(dfd.resolve,ms);
        return dfd.promise();
    }

    // 调用
    $.wait(500).then(function(){
        // Do something brilliant here!
    })

### 动画

    var fadeIn = function (el) {

          var promise = $(el).animate({
              opacity: 1
          }, 1500);

          // Dynamically create and return an observable promise object which will be resolved when the animation completes.
         return promise.promise();
      };

    var fadeOut = function(el) {

        var promise = $(el).animate({
            opacity: 0
        }, 1500);

        // Dynamically create and return an observable promise object
          return promise.promise();
    };

    // Parallel
    $.when(
        fadeOut('div'),
        fadeIn('div')
    ).done(function () {
        console.log('Animation finished');
        $('p').css('color', 'red');
    });

    // Chained
    fadeOut('div').then(function (el) {
        fadeIn(el); // returns a promise
    }).then(function (el) {
        fadeOut(el); // returns a promise
    });

#### 参考

*   [JavaScript Promises](http://www.html5rocks.com/en/tutorials/es6/promises/ "JavaScript Promises")
*   [Promise & Deferred Objects in JavaScript Pt.1: Theory and Semantics.](http://blog.mediumequalsmessage.com/promise-deferred-objects-in-javascript-pt1-theory-and-semantics,"Promise & Deferred Objects")
*   [Promise & Deferred Objects in JavaScript Pt.2: in Practice](http://blog.mediumequalsmessage.com/promise-deferred-objects-in-javascript-pt2-practical-use,"Promise & Deferred Objects")

