/* 
Author: Erick Belfort
*/

var LightBackgroundVideo = function(_settings){
	this.settings = _settings; 
	this.canvas = document.createElement('canvas');
	this.context =  this.canvas.getContext('2d');
	this.canvasWidth = null;
	this.canvasHeight = null;
	this.vdHandler = 0;

	this.renderTarget = document.getElementById(this.settings.target);
	this.video = document.getElementById(this.settings.video);
};

LightBackgroundVideo.prototype.play = function(){
	this.video.play();
};

LightBackgroundVideo.prototype.pause = function(){
	this.video.pause();
};

LightBackgroundVideo.prototype.autoPlay = function(autoPlay){
	if(autoPlay){
		this.play();
	}
};

LightBackgroundVideo.prototype.isMuted = function(muted){
	if(muted){
		this.video.muted = false;
		this.video.muted = true;
	}
};

LightBackgroundVideo.prototype.onContentLoaded = function(){
	var scope = this;
	this.video.addEventListener('play',function(){
			scope.onPlayVideo();
	},false);
};

LightBackgroundVideo.prototype.appendCanvas = function(){
	this.canvas.style.position = 'absolute';
	this.canvas.style.top = '0px';
	if(this.renderTarget.firstChild){
		this.renderTarget.insertBefore(this.canvas,this.renderTarget.firstChild);
	}else{
		this.renderTarget.appendChild(this.canvas);
	}
	this.setDimensions();
};

LightBackgroundVideo.prototype.setDimensions = function(){
	this.canvasWidth  = this.renderTarget.clientWidth;
	this.canvasHeight = this.renderTarget.clientHeight;
	this.canvas.style.width = '100%';
	this.canvas.style.height = '100%';
};

LightBackgroundVideo.prototype.draw = function(){
	var scope = this;
	if(this.video.paused || this.video.ended) return false;
	this.context.drawImage(this.video,0,0,this.canvasWidth,this.canvasHeight);
	clearTimeout(this.vdHandler);
	this.vdHandler = setTimeout(function(){scope.draw();},20);
};

LightBackgroundVideo.prototype.onPlayVideo = function(){
	this.appendCanvas();
	this.draw();
};

LightBackgroundVideo.prototype.addEventListeners = function(){
	document.addEventListener('DOMContentLoaded',this.onContentLoaded.apply(this),false);
};

LightBackgroundVideo.prototype.init = function(){
	this.addEventListeners();
	this.autoPlay(this.settings.autoplay);
	this.isMuted(this.settings.muted);
};
