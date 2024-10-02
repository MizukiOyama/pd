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

    // 初回訪問時のみローディング画面を表示
    if (!sessionStorage.getItem('visited')) {
        sessionStorage.setItem('visited', true);

        // ローディング画面を表示
        showLoadingScreen();

        // テキスト表示とアニメーション
        setTimeout(startTextAnimation, 500);

    } else {
        // 再訪問時はローディング画面をスキップ
        $loadingBg.css({ opacity: 0, visibility: 'hidden' });
    }
});
