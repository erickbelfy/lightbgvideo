/* 
Author: Erick Belfort
*/

var LightBackgroundVideo = function(settings){
	this.canvas = document.createElement('canvas');
	this.context =  this.canvas.getContext('2d');
	this.canvasWidth = null;
	this.canvasHeight = null;
	this.vdHandler = 0;

	this.renderTarget = document.getElementById(settings.target);
	this.video = document.getElementById(settings.video);
	this.isMuted(settings.muted);
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
	this.canvas.width = this.canvasWidth;
	this.canvas.height = this.canvasHeight;
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
	this.video.play();
};
