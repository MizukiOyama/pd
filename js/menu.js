document.addEventListener("DOMContentLoaded", function() {
    // メニューの初期化関数
    function initializeMenu() {
        var $nav = document.getElementById('navArea');
        var $btn = document.querySelector('.toggle_btn');
        var $mask = document.getElementById('mask');
        var open = 'open';

        if ($btn && $mask) {
            $btn.addEventListener('click', function() {
                if (!$nav.classList.contains(open)) {
                    $nav.classList.add(open);
                } else {
                    $nav.classList.remove(open);
                }
            });

            $mask.addEventListener('click', function() {
                $nav.classList.remove(open);
            });
        } else {
            console.error('Menu button or mask not found');
        }
    }

    // 画像の遅延読み込み
    var lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(function(img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() {
            img.removeAttribute('data-src');
        };
    });

    // ヘッダーとフッターの読み込みと初期化
    fetch("header.html")
        .then(response => response.text())
        .then(headerData => {
            document.getElementById("header-container").innerHTML = headerData;
            // メニューの初期化を再度呼び出し
            initializeMenu();
        });

    fetch("footer.html")
        .then(response => response.text())
        .then(footerData => {
            document.getElementById("footer-container").innerHTML = footerData;
        });

    // ドラッグ機能
    const img = document.getElementById("menu-img");
    if (img) {
        // 画像のスタイルを絶対位置に設定（必要に応じて）
        img.style.position = "absolute";
        img.style.cursor = "grab"; // 初期状態でgrabカーソルに設定

        let isDragging = false;
        let offsetX, offsetY;

        // マウスダウンでドラッグ開始
        img.addEventListener("mousedown", (e) => {
            e.preventDefault(); // 画像保護が影響しないようにデフォルトの動作を防ぐ
            isDragging = true;
            img.style.cursor = "grabbing";
            offsetX = e.clientX - img.getBoundingClientRect().left;
            offsetY = e.clientY - img.getBoundingClientRect().top;
        });

        // マウスムーブで画像を移動
        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                img.style.left = `${e.clientX - offsetX}px`;
                img.style.top = `${e.clientY - offsetY}px`;
            }
        });

        // マウスアップでドラッグ終了
        document.addEventListener("mouseup", () => {
            isDragging = false;
            img.style.cursor = "grab";
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // 要素の取得
    const toggleSwitch = document.getElementById('soundToggle');
    const toggleIcon = document.getElementById('toggleIcon');
    const backgroundAudio = document.getElementById('backgroundAudio');

    // 要素が正常に取得されているか確認
    if (toggleSwitch && toggleIcon && backgroundAudio) {
        // チェックボックスの状態に応じてアイコンとサウンドを制御
        toggleSwitch.addEventListener('change', function () {
            if (toggleSwitch.checked) {
                // ON状態: アイコンを変更してサウンドを再生
                toggleIcon.classList.remove('fa-power-off');
                toggleIcon.classList.add('fa-volume-up');
                backgroundAudio.play();
            } else {
                // OFF状態: アイコンを変更してサウンドを停止
                toggleIcon.classList.remove('fa-volume-up');
                toggleIcon.classList.add('fa-power-off');
                backgroundAudio.pause();
                backgroundAudio.currentTime = 0; // 再生位置をリセット
            }
        });
    } else {
        console.error('要素が見つかりません');
    }
});