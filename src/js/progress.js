(function (root) {
    function Progress () {
        this.proBackBar = document.querySelector('.back-bg');
        this.proFrontBar = document.querySelector('.front-bg');
        this.circle = document.querySelector('.circle');
        this.proBox = document.querySelector('.progress');
        this.playBtn = document.querySelector('.play');
        this.proTimer = null;
        this.currentTime = 0;
        this.proTotalWidth = this.proBackBar.offsetWidth; // 进度条总宽
        this.currentLeft = 0;
    }




    Progress.prototype.render = function (duration) {
        this.duration = duration;
        clearInterval(this.proTimer);
        var self = this;
        // 当前时间 / 总时间 === 当前进度条宽度 / 进度条总宽度
        if(root.audio.status === 'pause') {
                self.proFrontBar.style.width  = '0px';
                self.circle.style.marginLeft = '-0.35vw';
        } else {
            this.proTimer = setInterval(function () {
                self.currentTime++;
                self.currentLeft = self.currentTime * self.proTotalWidth / root.musicPlayer.dataList[root.musicPlayer.now].duration;
                self.proFrontBar.style.width  = self.currentLeft + 'px';
                self.circle.style.marginLeft = self.currentLeft + 'px';
            }, 1000)
        }
    }

    Progress.prototype.stopRender = function () {
        clearInterval(this.proTimer);
    }

    Progress.prototype.playTo = function () {
        var self = this;
        this.proBox.addEventListener('touchend', function (e) {
            var x = e.changedTouches[0].clientX - self.proBox.offsetLeft; // 手指点击的位置坐标
            self.currentLeft = Math.ceil(x / self.proTotalWidth * root.musicPlayer.dataList[root.musicPlayer.now].duration);
            self.proFrontBar.style.width  = x + 'px';
            self.circle.style.marginLeft = x + 'px';
            if(root.audio.status === 'pause') {
                root.audio.play();
                self.playBtn.className = "play pause";
            }
            self.currentTime = self.currentLeft;
            
            var minute = Math.floor(self.currentTime / 60);
            var second = self.currentTime % 60;
            root.render.minute = minute;
            root.render.second = second;
            root.audio.playTo(self.currentLeft);
        })
    }


    root.progress = new Progress();
})(window.player || (window.player = {}))