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
        }, 2000); // テキストが元に戻るまでの時間
    }
}

jQuery(document).ready(function($) {
    const $loadingBg = $('#loading-bg');
    const $typing = $('.js_typing');
    const $soundToggle = $('#sound-toggle');
    const $music = $('#background-music');

    // ローディング画面のフェードイン
    function showLoadingScreen() {
        $loadingBg.css({ visibility: 'visible', opacity: 1 }); // フェードイン
    }

    // ローディング画面のフェードアウト
    function hideLoadingScreen() {
        $loadingBg.css({ opacity: 0 }); // フェードアウト
        setTimeout(() => {
            $loadingBg.css({ visibility: 'hidden' }); // フェードアウト後に完全非表示
        }, 1000);
    }

    // テキストを表示しシャッフルアニメーションを実行
    function startTextAnimation() {
        $typing.addClass('endAnime');
        const shuffleText = new ShuffleText($typing[0]);
        shuffleText.setText($typing.text());
        shuffleText.start();
    }

    // サウンドオプションを表示
    function showSoundOptions() {
        $soundToggle.css({ display: 'flex', visibility: 'visible', opacity: 1 }); // フェードイン
    }

    // サウンドのオン・オフ切り替え
    $('#sound-on').on('click', function() {
        $music[0].play();
        finishLoading();
    });

    $('#sound-off').on('click', function() {
        $music[0].pause();
        finishLoading();
    });

    // ローディング画面終了処理
    function finishLoading() {
        hideSoundOptions(); // サウンドオプションをフェードアウト
        setTimeout(hideLoadingScreen, 1000); // サウンドオプションが消えた後にローディング画面をフェードアウト
    }

    // 初回訪問時のみローディング画面を表示
    if (!sessionStorage.getItem('visited')) {
        sessionStorage.setItem('visited', true);

        // ローディング画面表示
        showLoadingScreen();

        // テキスト表示とアニメーション
        setTimeout(startTextAnimation, 500);

        // テキストフェードアウトとサウンドオプション表示
        setTimeout(() => {
            $typing.removeClass('endAnime').fadeOut(1000, () => {
                showSoundOptions(); // サウンドオプションを表示
            });
        }, 3000);

    } else {
        // 再訪問時はローディング画面をスキップ
        $loadingBg.css({ opacity: 0, visibility: 'hidden' });
    }
});
