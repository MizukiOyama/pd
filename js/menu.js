console.log('Menu cursor');

document.addEventListener("DOMContentLoaded", function() {
    // カーソルとストーカーの作成と追加
    var cursor = document.createElement("div");
    cursor.id = "cursor";
    document.body.appendChild(cursor);

    var stalker = document.createElement("div");
    stalker.id = "stalker";
    document.body.appendChild(stalker);

    // リンクのホバーエフェクト
    document.querySelectorAll("a").forEach(function(link) {
        link.addEventListener("mouseenter", function() {
            cursor.classList.add("cursor--hover");
            stalker.classList.add("stalker--hover");
        });
        link.addEventListener("mouseleave", function() {
            cursor.classList.remove("cursor--hover");
            stalker.classList.remove("stalker--hover");
        });
    });

    // マウスムーブイベント
    document.addEventListener("mousemove", function(e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.opacity = "1";
        cursor.style.top = y + "px";
        cursor.style.left = x + "px";

        setTimeout(function() {
            stalker.style.opacity = "1";
            stalker.style.top = y + "px";
            stalker.style.left = x + "px";
        }, 150);
    });

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

            // SVGの初期化
            var svgElement = document.getElementById('svgElement');
            if (svgElement) {
                svgElement.classList.add('active');
            } else {
                console.error('SVG element not found');
            }
        });

    fetch("footer.html")
        .then(response => response.text())
        .then(footerData => {
            document.getElementById("footer-container").innerHTML = footerData;
        });
});
