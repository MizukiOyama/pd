
document.addEventListener('DOMContentLoaded', function () {
    const toggleSwitch = document.getElementById('soundToggle');
    const backgroundAudio = document.getElementById('backgroundAudio');

    // 要素の確認
    console.log('Toggle Switch:', toggleSwitch);
    console.log('Background Audio:', backgroundAudio);

    if (toggleSwitch && backgroundAudio) {
        toggleSwitch.addEventListener('change', function () {
            if (toggleSwitch.checked) {
                backgroundAudio.play();
            } else {
                backgroundAudio.pause();
                backgroundAudio.currentTime = 0;
            }
        });
    } else {
        console.error('Toggle switch or background audio element not found');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const targetNode = document.body;  // 監視対象の親ノード

    const observer = new MutationObserver(function(mutationsList, observer) {
        const toggleSwitch = document.getElementById('soundToggle');
        const backgroundAudio = document.getElementById('backgroundAudio');

        if (toggleSwitch && backgroundAudio) {
            toggleSwitch.addEventListener('change', function () {
                if (toggleSwitch.checked) {
                    backgroundAudio.play();
                } else {
                    backgroundAudio.pause();
                    backgroundAudio.currentTime = 0;
                }
            });
            observer.disconnect();  // 要素が見つかったので監視を終了
        }
    });

    observer.observe(targetNode, { childList: true, subtree: true });
});
