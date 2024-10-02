class ShuffleText {
    constructor(element) {
        if (!element) {
            throw new Error("Element is not defined.");
        }
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
            
            // ローディング画面をフェードアウト
            setTimeout(() => {
                $('#loading-bg').fadeOut(1000); // 1秒かけてフェードアウト
            }, 500); // 元のテキストが表示されてから0.5秒後にローディング画面をフェードアウト
        }, 1000); // シャッフルを1秒後に停止
    }
}

jQuery(document).ready(function($) {
    // ローディング画面を表示する
    $('#loading-bg').css({ visibility: 'visible', opacity: 1 });

    // 要素が存在する場合のみシャッフルアニメーションを開始
    const typingElement = $('.js_typing'); // 要素を検索
    if (typingElement.length > 0) { // 要素が存在するか確認
        const shuffleText = new ShuffleText(typingElement[0]);
        shuffleText.start();
    } else {
        console.error("Typing element not found."); // エラーメッセージ
    }
});
