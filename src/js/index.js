(function ($, root) {
  function MusicPlayer() {
    this.dataList = [];
    this.now = 0;
    this.startY = 0;
  }

  MusicPlayer.prototype.init = function () {
    var self = this;
    this.getDom();
    this.getData();
    root.progress.playTo();
    root.audio.end(function () {
      root.render.stopRenderCurTime();
      root.progress.stopRender();
      self.btns[2].className = 'play';
      root.progress.currentTime = 0;
      root.progress.currentLeft = 0;
      root.render.minute = 0;
      root.render.second = 0;
      root.audio.status = 'pause';
    })
  };

  MusicPlayer.prototype.getDom = function () {
    this.oWrap = document.querySelector(".wrapper");
    this.btns = document.querySelectorAll(".controls span");
    this.menu = document.querySelector('.play-list-area');
    this.closeBtn = document.querySelector('.play-list-area .close');
    this.songList = document.querySelector('.play-list');
  };

  MusicPlayer.prototype.getData = function () {
    var self = this;
    $.ajax({
      url: "../mock/data.json",
      methods: "get",
      success: function (res) {
        self.dataList = res;
        self.loadMusic(self.now);
        self.MusicControls();
      },
    });
  };

  MusicPlayer.prototype.loadMusic = function (index) {
    root.render.init(this.dataList[index], this.dataList); //调用渲染模块
    root.audio.load(this.dataList[index].audioSrc);
  };

  MusicPlayer.prototype.MusicControls = function () {
    var self = this;
    this.btns[1].addEventListener("touchend", function () {
      if (self.now === 0) {
        alert("没有上一曲了呢");
      } else {
        self.now--;
        self.loadMusic(self.now);
        root.render.minute = 0;
        root.render.second = 0;
        root.progress.currentTime = 0;
        root.render.stopRenderCurTime();
        root.progress.render();
        if (root.audio.status === "play") {
          root.audio.play(self.dataList[self.now].duration);
        } else {
          root.render.renderCurTime();
          
        }
      }
    });

    this.btns[2].addEventListener("touchend", function () {
        if (root.audio.status === "pause") {
            root.audio.play(self.dataList[self.now].duration);
            this.className = "play pause";
          } else if (root.audio.status === "play") {
            root.audio.pause();
            this.className = "play";
            root.render.stopRenderCurTime();
            root.progress.stopRender();
          }
    });

    this.btns[3].addEventListener("touchend", function () {
      if (self.now === self.dataList.length - 1) {
        alert("没有下一曲了呢");
      } else {
        self.now++;
        self.loadMusic(self.now);
        root.render.minute = 0;
        root.render.second = 0;
        root.progress.currentTime = 0;
        root.render.stopRenderCurTime();
        root.progress.render();
        if (root.audio.status === "play") {
          root.audio.play(self.dataList[self.now].duration);
        } else {
          root.render.renderCurTime();
          
        }
      }
    });

    this.btns[4].addEventListener("touchend", function () {
      self.menu.style.display = 'block';
    });

    this.closeBtn.addEventListener('touchend', function () {
        self.menu.style.display = 'none';
    })

    this.songList.addEventListener('touchend', function (e) {
        var endY = e.changedTouches[0].clientY;
        if(Math.abs(endY - self.startY) > 5) {
            return;
        }
        if(e.target.tagName === 'LI') {
            var index = e.target.getAttribute('data-index');
            self.now = +index;
            self.loadMusic(index);
            root.render.minute = 0;
            root.render.second = 0;
            root.render.stopRenderCurTime();
            root.audio.play(self.dataList[self.now].duration);
            self.btns[2].className = 'play pause';
        }
    })
    this.songList.addEventListener('touchstart', function (e) {
        self.startY = e.touches[0].clientY;
    })
  }

  
  
  var musicPlayer = new MusicPlayer();
  root.musicPlayer = musicPlayer;
  musicPlayer.init();
})(window.Zepto, window.player);
