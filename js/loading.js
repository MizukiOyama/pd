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
        }, 100); // 100ミリ秒ごとにシャッフル

        // 1秒後にシャッフルを停止
        setTimeout(() => {
            clearInterval(shuffleInterval);
            this.element.innerHTML = this.originalText; // 元のテキストに戻す
        }, 1000); // 1秒（1000ミリ秒）で終了
    }
}
