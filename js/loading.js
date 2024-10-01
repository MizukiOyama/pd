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
    // サウンドコントロール変数
    let isSoundOn = false;

    // サウンドON/OFFボタンイベント
    $('#sound-on').on('click', function() {
        isSoundOn = true;
        playSound();
        fadeOutLoading();
    });

    $('#sound-off').on('click', function() {
        isSoundOn = false;
        stopSound();
        fadeOutLoading();
    });

    // ローディング画面のフェードアウト処理
    function fadeOutLoading() {
        $('#loading-bg').addClass('fade-out');
        setTimeout(function() {
            $('#loading-bg').remove(); // 完全にフェードアウト後、DOMから削除
        }, 1000); // フェードアウト時間と同じ1秒後に削除
    }

    // 音声再生関数
    function playSound() {
        // ここに音声再生処理を追加
        console.log('Sound is ON');
    }

    // 音声停止関数
    function stopSound() {
        // ここに音声停止処理を追加
        console.log('Sound is OFF');
    }

    // ページの読み込み後にローディング背景を非表示にする
    $(window).on('load', function() {
        setTimeout(function() {
            $(".js_typing").each(function() {
                var shuffleText = new ShuffleText(this);
                shuffleText.start();
            });
        }, 500); // テキストアニメーション開始

        // ローディング終了後にサウンドボタンの選択を促す
        $('#sound-toggle').show();
    });
});
