
document.addEventListener('DOMContentLoaded', function () {
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
    } else {
        console.error('Toggle switch or background audio element not found');
    }
});
