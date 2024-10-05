document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('modal');
    var closeModal = document.getElementById('close-modal');

    // ページ読み込み時にモーダルを表示
    modal.style.display = 'flex';

    // モーダルを閉じる
    closeModal.onclick = function() {
        modal.style.display = 'none';
    };

    // 画面外をクリックしてもモーダルを閉じる
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
