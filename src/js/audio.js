(function (root) {
  function AudioManage() {
    this.audio = new Audio();
    this.status = "pause";
  }

  AudioManage.prototype.load = function (src) {
    this.audio.src = src;
    this.audio.load(); // 加载音乐
  };

  AudioManage.prototype.play = function (duration) {
    this.status = "play";
    this.audio.play();
    root.render.renderCurTime();
    root.progress.render(duration);
  };

  AudioManage.prototype.pause = function () {
    this.status = "pause";
    this.audio.pause();
  };

  AudioManage.prototype.end = function (cb) {
    this.audio.onended = cb;
  };

  AudioManage.prototype.playTo = function (time) {
    this.audio.currentTime = time; // 单位：秒
  };

  root.audio = new AudioManage();
})(window.player || (window.player = {}));
