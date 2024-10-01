jQuery(document).ready(function($) {
    // サウンドコントロール変数
    let isSoundOn = false;
    const audioElement = document.getElementById('bg-music'); // 音声要素を取得

    // サウンドONボタンイベント
    $('#sound-on').on('click', function() {
        isSoundOn = true;
        playSound();  // サウンド再生
        fadeOutLoading();  // ローディング画面をフェードアウト
    });

    // サウンドOFFボタンイベント
    $('#sound-off').on('click', function() {
        isSoundOn = false;
        stopSound();  // サウンド停止
        fadeOutLoading();  // ローディング画面をフェードアウト
    });

    // ローディング画面のフェードアウト処理
    function fadeOutLoading() {
        $('#loading-bg').addClass('fade-out');
        setTimeout(function() {
            $('#loading-bg').remove();  // 完全にフェードアウト後、DOMから削除
        }, 1000);  // フェードアウトアニメーション後に削除
    }

    // 音声再生関数
    function playSound() {
        if (audioElement) {
            audioElement.play();  // 音声再生
            console.log('Sound is ON');
        }
    }

    // 音声停止関数
    function stopSound() {
        if (audioElement) {
            audioElement.pause();  // 音声停止
            audioElement.currentTime = 0;  // 再生位置をリセット
            console.log('Sound is OFF');
        }
    }

    // ページの読み込み後にローディング背景を非表示にする
    $(window).on('load', function() {
        setTimeout(function() {
            $(".js_typing").each(function() {
                var shuffleText = new ShuffleText(this);
                shuffleText.start();
            });
        }, 500);  // テキストアニメーション開始

        // ローディング終了後にサウンドボタンの選択を促す
        $('#sound-toggle').show();
    });
});
