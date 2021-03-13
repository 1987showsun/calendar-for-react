# 行事曆 Calendar for React

## NPM
```js
  npm i react-stroks-calendar
```

## Demo
[Demo](https://1987showsun.github.io/calendar-for-react/index.html)

## 行程 Stroks json list
```json
  [
    {
      "start"  : 1614402000000,   // 開始時間（毫秒）
      "end"    : 1614407400000,   // 結束時間（毫秒）
      "title"  : "行程標題",        // 行程標題
      "address": "地址",           // 地址
      "content": "行程敘述",       // 行程敘述
      "level"  : 1,               // 層級 0: 高, 1: 一般, 2: 低, 1為起始值
      "tags"   : []               // Hash tag標籤
    }
  ]
```

## 使用方式
```js
  import Calendar from 'react-stroks-calendar';

  <Calendar
    stroks = {strokslist}
  />
```

## Api

| Api                 | type              | method                                           |
| ------------------- | ----------------- | ------------------------------------------------ |
| stroks              | Array             | 行程列表                                          |