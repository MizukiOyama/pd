(function ($) {
    $(document).ready(function () {
        console.log("Document ready");

        $(".list-tab").click(function () {
            console.log("Tab clicked");
            var tabId = $(this).attr('id');
            console.log("Tab ID: " + tabId);

            $(".list-tab").removeClass('selected unselected');
            $(this).addClass('selected');
            $(this).siblings().addClass('unselected');

            $(".container").removeClass('show');
            $("#content" + tabId.replace('list-tab', '')).addClass('show');
        });

        // 初期状態でタブ1を選択
        $("#tab1").trigger("click");
    });
})(jQuery);
