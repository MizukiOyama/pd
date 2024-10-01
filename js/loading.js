jQuery(document).ready(function($) {
    let firstVisit = !sessionStorage.getItem('visited');
    const $loadingBg = $('#loading-bg');
    const $typing = $('.js_typing');
    const $soundToggle = $('#sound-toggle');
    const $music = $('#background-music');
    
    // 1. 初回訪問時のみローディング画面を表示
    if (firstVisit) {
        sessionStorage.setItem('visited', true);

        // 2. ローディング画面フェードイン
        $loadingBg.addClass('show');

        // 3. テキスト表示とシャッフルアニメーション
        setTimeout(function() {
            $typing.addClass('endAnime');
            const shuffleText = new ShuffleText($typing[0]);
            shuffleText.setText($typing.text());
            shuffleText.start();
        }, 500); // ロード後にテキスト表示

        // 4. テキストフェードアウト
        setTimeout(function() {
            $typing.removeClass('endAnime').fadeOut(1000);
        }, 3000); // 3秒後にテキストをフェードアウト

        // 5. サウンドオン/オフボタンの表示
        setTimeout(function() {
            $soundToggle.fadeIn(1000);
        }, 4000); // テキストがフェードアウトした後にサウンドボタン表示

        // 6. サウンドのオン/オフ切り替え
        $('#sound-on').on('click', function() {
            $music[0].play();
            finishLoading();
        });

        $('#sound-off').on('click', function() {
            $music[0].pause();
            finishLoading();
        });

        // 7. ローディング画面フェードアウト
        function finishLoading() {
            $soundToggle.fadeOut(1000); // ボタンを非表示にする
            setTimeout(function() {
                $loadingBg.removeClass('show');
            }, 1000); // 画面をフェードアウト
        }
    } else {
        // 再読み込み時にはローディング画面を表示しない
        $loadingBg.removeClass('show');
    }
});
