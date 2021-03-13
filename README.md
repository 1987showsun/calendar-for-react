# Video Play component to React

## Description
The player supports responsive and mobile devices

## NPM
```js
npm i react-player-beta
```

## Demo
[Demo](https://1987showsun.github.io/video-component-by-React-dev/index.html)

![Demo1](https://s3-ap-northeast-1.amazonaws.com/showtest/Users/showsun/player+git+img/player.jpg)

## data
```json
  [
    {
      "id"      : "1",
      "title"   : "茄子蛋EggPlantEgg - 浪流連 Waves Wandering (Official Music Video)",
      "src"     : "./assets/file/videoplayback1.mp4",
      "poster"  : "https://i.ytimg.com/vi/3Y0Ut5ozaKs/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDlohyjxrPwOpwJU1i2ipVms3wYJQ"
    }
  ]
```
id       : render item key <br/>
title    : playing video title <br/>
src      : video file path/src <br/>
poster   : video player init main image <br/>

## Use
```js
  <Video
    date = {"video list Object"} 
    menu = {{
      "switch" : false / true,
      "title"  : "Menu head text"
    }}
  />
```

## Api

| Api                 | type              | method                                                               |
| ------------------- | ----------------- | -------------------------------------------------------------------- |
| data                | Object            | Object keys:id,title,src,poster                                      |
| menu                | Object            | Object keys: swtch: fslae/true(init:false),titile : "Menu head text" |
| initSelectedPlay    | number            | initSelectedPlay = {"1,2,3,...."}                                    |