(function (root) {

    function Render () {
        this.curTimer = null;
        this.minute = 0;
        this.second = 0;
    }

    Render.prototype.init = function (data, list) {
        this.getDom();
        this.renderImg(data.image);
        this.renderSongInfo(data);
        this.renderAllTime(data.duration);
        this.fillMenu(list);
        this.renderIsLike(data.isLike);
    }

    Render.prototype.getDom = function () {
        this.oWrap = document.querySelector('.wrapper');
        this.imgBox = document.querySelector('.img-box img');
        this.songName = document.querySelector('.song-name');
        this.singer = document.querySelector('.singer');
        this.album = document.querySelector('.album');
        this.isLike = document.querySelector('.controls .is-like');
        this.playListArea = document.querySelector(".play-list-area");
        this.allTime = document.querySelector('.all-time');
        this.curTime = document.querySelector('.cur-time');
        this.songList = document.querySelector('.play-list');
    }

    Render.prototype.renderCurTime = function () {
        var self = this;
        if(root.audio.status === 'play') {
            this.curTimer = setInterval(function () {
                self.second++;
                if(self.second === 60) {
                    self.second = 0;
                    self.minute++;
                }
                self.curTime.innerHTML = (self.minute < 10 ? '0' + self.minute : self.minute) + ':' + (self.second < 10 ? '0' + self.second : self.second);
            }, 1000)
        } else if (root.audio.status === 'pause'){
            self.curTime.innerHTML = (self.minute < 10 ? '0' + self.minute : self.minute) + ':' + (self.second < 10 ? '0' + self.second : self.second);
        }
        
    }

    Render.prototype.stopRenderCurTime = function () {
        clearInterval(this.curTimer);
    }

    Render.prototype.renderImg = function (src) {
        root.blurImg(src, this.oWrap);
        this.imgBox.src = src;
    }

    Render.prototype.renderSongInfo = function (data) {
        this.songName.innerHTML = data.name;
        this.singer.innerHTML = data.singer;
        this.album.innerHTML = data.album;
    }

    Render.prototype.renderAllTime = function (duration) {
        var minute = Math.floor(duration / 60);
        var second = Math.floor(duration % 60);
        this.allTime.innerHTML = (minute < 10 ? '0' + minute : minute) + ':' + (second < 10 ? '0' + second : second);
    }

    Render.prototype.renderIsLike = function (isLike) {
        isLike === true ? this.isLike.className = 'is-like liking' : this.isLike.className = 'is-like';
    }

    Render.prototype.fillMenu = function (list) {
        var len = list.length;
        var str = '';
        for(var i = 0; i < len; i++) {
            var li = document.createElement('li');
            str += '<li data-index="'+ i +'">'+ list[i].name +'</li>'
        }
        this.songList.innerHTML = str;
    }

    var render = new Render();

   root.render = render; 
})(window.player || (window.player = {}))