jQuery.noConflict();

(function ($) {
    $(function () {
        var cursor = $("<div id='cursor'></div>");
        var stalker = $("<div id='stalker'></div>");
        $("body").addClass("custom-cursor").append(cursor).append(stalker);

        // ホバー時のクラスを追加
        $("nav a, a").hover(
            function () {
                cursor.addClass('cursor--hover');
                stalker.addClass('stalker--hover');
            },
            function () {
                cursor.removeClass('cursor--hover');
                stalker.removeClass('stalker--hover');
            }
        );

        // マウスの動きを追跡する
        let cursorPos = { x: 0, y: 0 };
        let stalkerPos = { x: 0, y: 0 };

        $(document).on("mousemove", function (e) {
            cursorPos.x = e.clientX;
            cursorPos.y = e.clientY;
        });

        function updateCursor() {
            cursor.css({
                "opacity": "1",
                "top": cursorPos.y + "px",
                "left": cursorPos.x + "px"
            });
            
            // 少し遅れてストーカーを追随させる
            stalkerPos.x += (cursorPos.x - stalkerPos.x) * 0.1;
            stalkerPos.y += (cursorPos.y - stalkerPos.y) * 0.1;

            stalker.css({
                "opacity": "1",
                "top": stalkerPos.y + "px",
                "left": stalkerPos.x + "px"
            });

            requestAnimationFrame(updateCursor);
        }

        requestAnimationFrame(updateCursor);

        cursor.css("opacity", "0");
        stalker.css("opacity", "0");
    });
})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
    function fadeInOnScroll() {
        var fadeElements = document.querySelectorAll('.fade_bottom');
        
        fadeElements.forEach(function (element) {
            var rect = element.getBoundingClientRect();
            var elementTop = rect.top;
            var windowHeight = window.innerHeight;

            // 要素が画面の50%に到達したらクラスを追加
            var triggerPosition = windowHeight * 0.5;
            
            if (elementTop < triggerPosition) {
                element.classList.add('visible');
            }
        });
    }
    
    // スクロール時とページロード時にフェードインを実行
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();  // ページ読み込み時に一度実行
});
