document.addEventListener('DOMContentLoaded', function () {
    // 要素の取得
    const toggleSwitch = document.getElementById('soundToggle');
    const backgroundAudio = document.getElementById('backgroundAudio');

    // 要素が正しく取得できたか確認
    if (toggleSwitch && backgroundAudio) {
        // チェックボックスの状態に応じてサウンドを制御
        toggleSwitch.addEventListener('change', function () {
            if (toggleSwitch.checked) {
                console.log('Audio playing...');
                backgroundAudio.play();
            } else {
                console.log('Audio stopped...');
                backgroundAudio.pause();
                backgroundAudio.currentTime = 0; // 再生位置をリセット
            }
        });
    } else {
        // 要素が取得できなかった場合のエラーメッセージ
        console.error('Toggle switch or background audio element not found');
    }
});

