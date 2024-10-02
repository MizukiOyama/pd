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
        // テキストを表示させる（透明状態からフェードイン）
        $(this.element).css('opacity', 1);

        const shuffleInterval = setInterval(() => {
            this.shuffle();
        }, 100);

        // 2.5秒後にシャッフルを停止して元のテキストに戻す
        setTimeout(() => {
            clearInterval(shuffleInterval);
            this.element.innerHTML = this.originalText;
        }, 2500);
    }
}

jQuery(document).ready(function($) {
    // ページの読み込み後にローディング背景を非表示にする
    $(window).on('load', function() {
        // ローディングアニメーション開始
        const typingElement = $('.js_typing')[0]; // js_typingクラスの最初の要素を取得
        if (typingElement) {
            const shuffleText = new ShuffleText(typingElement);
            shuffleText.start();
        }

        // 4秒後にローディング画面をフェードアウト
        setTimeout(function() {
            $('#loading-bg').fadeOut();
        }, 4000); // シャッフル終了後にフェードアウト
    });
});
