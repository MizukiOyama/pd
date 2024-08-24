jQuery.noConflict();

(function ($) {
    $(function () {
        var cursor = $("<div id='cursor'></div>");
        var stalker = $("<div id='stalker'></div>");
        $("body").addClass("custom-cursor").append(cursor).append(stalker);

        $(".head,a,nav").hover(
            function () {
                cursor.addClass('cursor--hover');
                stalker.addClass('stalker--hover');
            },
            function () {
                cursor.removeClass('cursor--hover');
                stalker.removeClass('stalker--hover');
            }
        );

        $(document).on("mousemove", function (e) {
            var x = e.clientX;
            var y = e.clientY;
            cursor.css({
                "opacity": "1",
                "top": y + "px",
                "left": x + "px"
            });
            setTimeout(function () {
                stalker.css({
                    "opacity": "1",
                    "top": y + "px",
                    "left": x + "px"
                });
            }, 150);
        });

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
            
            if (elementTop < windowHeight) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();  // ページが読み込まれたときに一度実行して、最初から画面に入っている要素もフェードインさせる
});
