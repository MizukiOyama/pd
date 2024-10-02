jQuery(document).ready(function($) {
    const $loadingBg = $('#loading-bg');
    const $typing = $('.js_typing');
    const $soundToggle = $('#sound-toggle');
    const $music = $('#background-music');

    // ローディング画面のフェードイン
    function showLoadingScreen() {
        $loadingBg.css({ visibility: 'visible', opacity: 1 });
    }

    // ローディング画面のフェードアウト
    function hideLoadingScreen() {
        $loadingBg.css({ opacity: 0 });
        setTimeout(() => {
            $loadingBg.css({ visibility: 'hidden' });
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
        $soundToggle.css({ display: 'flex', visibility: 'visible', opacity: 1 });
    }

    // サウンドオプションをフェードアウトして非表示
    function hideSoundOptions() {
        $soundToggle.css({ opacity: 0 });
        setTimeout(() => {
            $soundToggle.css({ visibility: 'hidden' });
        }, 1000);
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
        hideSoundOptions(); 
        setTimeout(hideLoadingScreen, 1000); 
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
            $typing.removeClass('endAnime').fadeOut(1000);
            showSoundOptions();
        }, 3000);

    } else {
        // 再訪問時はローディング画面をスキップ
        $loadingBg.css({ opacity: 0, visibility: 'hidden' });
    }
});
