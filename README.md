Light Background Video
============

The simple implementation for run videos on your html background

There are some steps to run the class in your application.


1- Insert the javascript class in your html body:

```html
<script type="text/javascript" src="light-bg-video.js"></script>
```

2- Now, you need to declare the video tag, specifying all compatible sources for the browsers

```html
<video id="video-instance" poster="poster.jpg" preload="auto" loop>
   <source type="video/ogg" src="//video-js.zencoder.com/oceans-clip.ogv"/>
   <source type="video/mp4" src="//video-js.zencoder.com/oceans-clip.mp4"/>
   <source type="video/mov" src="//video-js.zencoder.com/oceans-clip.mov"/>
</video>
```

3- Set the html target

```html
<section id="video-section"></section>
```
Tip: you can customize width and height of your video target. All content inside the video target require z-index more than 1.

4- To complete, the class require some configuration parameters
```javascript
   var settings = { 
      target: 'video-section', 
      video: 'video-instance',
      autoplay: true,
      muted: true 
   };

   var backgroundVideo  = new LightBackgroundVideo(settings);
   backgroundVideo.init();
```

Tip: The Class have some methods, you can use for canvas video control. Don't forget to pass scope when you use html events.
```javascript
 document.getElementById('pause').onclick = function(){
    backgroundVideo.pause.apply(backgroundVideo); 
 };

 document.getElementById('play').onclick = function(){
   backgroundVideo.play.apply(backgroundVideo); 
 };
```
The Class require HTML 5 support to canvas and video Tag.
