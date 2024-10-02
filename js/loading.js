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

        // シャッフルを1秒後に停止
        setTimeout(() => {
            clearInterval(shuffleInterval);
            this.element.innerHTML = this.originalText; // 元のテキストを設定
            $(this.element).addClass('endAnime'); // アニメーションが終了したことを示すクラスを追加
            setTimeout(() => {
                $('#loading-bg').fadeOut(); // ローディング画面をフェードアウト
            }, 500); // テキスト表示後0.5秒後にローディング画面をフェードアウト
        }, 1000); // シャッフルを1秒後に停止
    }
}

jQuery(document).ready(function($) {
    // ローディング画面を表示する
    $('#loading-bg').css({ visibility: 'visible', opacity: 1 });

    // テキストのシャッフルアニメーションを開始
    const shuffleText = new ShuffleText($('.js_typing')[0]);
    shuffleText.start();
});
