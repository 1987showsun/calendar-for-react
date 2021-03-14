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
      "start"  : 1614402000000, 開始時間（毫秒）
      "end"    : 1614407400000, 結束時間（毫秒）
      "title"  : "", 行程標題
      "address": "", 地址
      "content": "", 行程敘述
      "level"  : 1, 層級 0: 高, 1: 一般, 2: 低, 1為起始值
      "tags"   : [] Hash tag標籤
    }
  ]
```

## 使用方式
```js
  import Calendar from 'react-stroks-calendar';

  <Calendar
    mode     = {["date","time"]}
    stroks   = {strokslist}
    local    = "en"
    onChange = { stroks => console.log(stroks) }
  />
```

## Api
| Api                 | type              | default | method                                           |
| ------------------- | ----------------- | ------- | ------------------------------------------------ |
| mode                | Array             | date    | form datePicker status: date, time               | 
| stroks              | Array             | null    | 行程列表                                          |
| local               | string            | zh      | 語言：zh (華語) / en (英文)                        |
| onChange            | function          | null    | 回傳結果 { actionType: "", [actionType]: {}, stroks: [] }