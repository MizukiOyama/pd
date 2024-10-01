// ShuffleText クラスの定義
class ShuffleText {
    constructor(element) {
        this.element = element;
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.originalText = element.innerHTML;
    }

    setText(text) {
        this.originalText = text;
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }

    shuffle() {
        let shuffledText = '';
        for (let i = 0; i < this.originalText.length; i++) {
            shuffledText += this.randomChar();
        }
        this.element.innerHTML = shuffledText;
    }

    start() {
        const shuffleInterval = setInterval(() => {
            this.shuffle();
        }, 100);

        setTimeout(() => {
            clearInterval(shuffleInterval);
            this.element.innerHTML = this.originalText;
        }, 2000);
    }
}

jQuery(document).ready(function($) {
    // ローディング終了後にサウンドボタンの選択を促す
    $('#sound-toggle').show();

    // ページの読み込み後にローディング背景を非表示にする
    $(window).on('load', function() {
        setTimeout(function() {
            $(".js_typing").each(function() {
                var shuffleText = new ShuffleText(this);
                shuffleText.start();
            });
        }, 500);  // テキストアニメーション開始
    });
});
