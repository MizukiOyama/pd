class ShuffleText {
    constructor(element) {
        this.element = element;
        this.chars = '想いとこだわりを引き出す。自分の人生を豊かにするのは、自分自身のこだわり。';
        this.originalText = element.innerHTML;
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
        // テキストを表示
        jQuery(this.element).css('opacity', 1);

        // シャッフルを開始
        const shuffleInterval = setInterval(() => {
            this.shuffle();
        }, 50);

        // 1秒後にシャッフルを停止して元のテキストを表示
        setTimeout(() => {
            clearInterval(shuffleInterval);
            this.element.innerHTML = this.originalText;
        }, 700);
    }
}

jQuery(document).ready(function($) {
    // ページの読み込み後にテキストシャッフルを開始
    $(window).on('load', function() {
        const typingElement = $('.js_typing');
        if (typingElement.length > 0) {
            const shuffleText = new ShuffleText(typingElement[0]);
            shuffleText.start();
        }

        // ローディングとコンテンツのフェードを同時に行う
        setTimeout(function() {
            // 同時にアニメーションを開始
            $('#loading-bg').fadeOut(1000); // 1.5秒かけてフェードアウト
            $('#content').css('visibility', 'visible').animate({ opacity: 1 }, 1000); // 同時に1.5秒かけてフェードイン
        }, 2000); // 3.5秒後にフェード開始
    });
});
