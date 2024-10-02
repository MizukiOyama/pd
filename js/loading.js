jQuery(document).ready(function($) {
    const $loadingBg = $('#loading-bg');
    const $typing = $('.js_typing');

    console.log('Loading started'); // ログで動作確認

    function showLoadingScreen() {
        console.log('Showing loading screen'); // ログで動作確認
        $loadingBg.css({ visibility: 'visible', opacity: 1 });
    }

    // 初回訪問時のみローディング画面を表示
    if (!sessionStorage.getItem('visited')) {
        sessionStorage.setItem('visited', true);

        // ローディング画面を表示
        showLoadingScreen();

        // テキスト表示とアニメーション
        setTimeout(startTextAnimation, 500);
    } else {
        $loadingBg.css({ opacity: 0, visibility: 'hidden' });
    }
});
