jQuery(document).ready(function($) {
    let firstVisit = !sessionStorage.getItem('visited');
    const $loadingBg = $('#loading-bg');
    const $typing = $('.js_typing');
    const $soundToggle = $('#sound-toggle');
    const $music = $('#background-music');
    
    // 初回訪問時のみローディング画面を表示
    if (firstVisit) {
        sessionStorage.setItem('visited', true);

        // ローディング画面フェードイン
        $loadingBg.css({ opacity: 1, visibility: 'visible' });

        // テキスト表示とシャッフルアニメーション
        setTimeout(function() {
            $typing.addClass('endAnime');
            const shuffleText = new ShuffleText($typing[0]);
            shuffleText.setText($typing.text());
            shuffleText.start();
        }, 500);

        // テキストフェードアウト
        setTimeout(function() {
            $typing.removeClass('endAnime').fadeOut(1000);
        }, 3000);

        // サウンドオン/オフボタンの表示
        setTimeout(function() {
            $soundToggle.fadeIn(1000);
        }, 4000); 

        // サウンドのオン/オフ切り替え
        $('#sound-on').on('click', function() {
            $music[0].play();
            finishLoading();
        });

        $('#sound-off').on('click', function() {
            $music[0].pause();
            finishLoading();
        });

        // ローディング画面フェードアウト
        function finishLoading() {
            $soundToggle.fadeOut(1000); 
            setTimeout(function() {
                $loadingBg.css({ opacity: 0, visibility: 'hidden' });
            }, 1000); 
        }
    } else {
        // 再読み込み時にはローディング画面をスキップ
        $loadingBg.css({ opacity: 0, visibility: 'hidden' });
    }
});
