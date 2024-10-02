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

        // シャッフルを2.5秒後に停止し、元のテキストを表示
        setTimeout(() => {
            clearInterval(shuffleInterval);
            this.element.innerHTML = this.originalText;
            
            // シャッフル終了後、オン・オフボタンを表示
            $('#sound-options').fadeIn(500); // 0.5秒かけてボタン表示
        }, 2500);
    }
}

jQuery(document).ready(function($) {
    // ページ読み込み後にテキストシャッフル開始
    $(window).on('load', function() {
        const typingElement = $('.js_typing'); // 要素を取得
        if (typingElement.length > 0) {
            const shuffleText = new ShuffleText(typingElement[0]);
            shuffleText.start();
        }
    });

    // オン・オフボタンのクリックイベント処理
    $('#sound-on').on('click', function() {
        console.log('Sound On selected');
        $('#loading-bg').fadeOut(1000); // 1秒かけてローディング画面をフェードアウト
    });

    $('#sound-off').on('click', function() {
        console.log('Sound Off selected');
        $('#loading-bg').fadeOut(1000); // 1秒かけてローディング画面をフェードアウト
    });
});
