jQuery(document).ready(function($) {
    let firstVisit = !sessionStorage.getItem('visited');
    const $loadingBg = $('#loading-bg');
    const $typing = $('.js_typing');
    const $soundToggle = $('#sound-toggle');
    const $music = $('#background-music');
    
    // ローディング画面をフェードインして表示
    function showLoadingScreen() {
        $loadingBg.css({ visibility: 'visible', opacity: 1 }); // フェードイン
    }

    // ローディング画面をフェードアウトして非表示
    function hideLoadingScreen() {
        $loadingBg.css({ opacity: 0 }); // フェードアウト
        setTimeout(() => {
            $loadingBg.css({ visibility: 'hidden' }); // 完全にフェードアウト後に非表示
        }, 1000); // フェードアウトに合わせて1秒後にvisibilityをhiddenに
    }

    // サウンドオン/オフボタンをフェードインして表示
    function showSoundOptions() {
        $soundToggle.css({ visibility: 'visible', opacity: 1 }); // フェードイン
    }

    // サウンドオン/オフボタンをフェードアウトして非表示
    function hideSoundOptions() {
        $soundToggle.css({ opacity: 0 }); // フェードアウト
        setTimeout(() => {
            $soundToggle.css({ visibility: 'hidden' }); // 完全にフェードアウト後に非表示
        }, 1000); // フェードアウトに合わせて1秒後にvisibilityをhiddenに
    }

    // 初回訪問時のみローディング画面を表示
    if (firstVisit) {
        sessionStorage.setItem('visited', true);

        // 1. ローディング画面フェードイン
        showLoadingScreen();

        // 2. テキスト表示とシャッフルアニメーション
        setTimeout(function() {
            $typing.addClass('endAnime');
            const shuffleText = new ShuffleText($typing[0]);
            shuffleText.setText($typing.text());
            shuffleText.start();
        }, 500);

        // 3. テキストフェードアウト
        setTimeout(function() {
            $typing.removeClass('endAnime').fadeOut(1000);
        }, 3000);

        // 4. サウンドオン/オフボタンの表示
        setTimeout(function() {
            showSoundOptions();
        }, 4000); 

        // 5. サウンドのオン/オフ切り替え
        $('#sound-on').on('click', function() {
            $music[0].play();
            finishLoading();
        });

        $('#sound-off').on('click', function() {
            $music[0].pause();
            finishLoading();
        });

        // 6. ローディング画面フェードアウト
        function finishLoading() {
            hideSoundOptions(); // サウンドオプションを非表示
            setTimeout(hideLoadingScreen, 1000); // サウンドオプションがフェードアウトした後にローディングをフェードアウト
        }
    } else {
        // 再読み込み時にはローディング画面をスキップ
        $loadingBg.css({ opacity: 0, visibility: 'hidden' });
    }
});
