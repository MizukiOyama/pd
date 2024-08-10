jQuery(document).ready(function ($) {
    class StickyNavigation {
        constructor() {
            this.currentId = null;
            this.currentTab = null;
            this.tabContainerHeight = 70;
            this.offsetAdjust = 0; // 調整用のオフセット変数
            this.init();
        }

        init() {
            let self = this;
            $('.tab').click(function (event) {
                self.onTabClick(event, $(this));
            });
            $(window).scroll(() => {
                this.onScroll();
            });
            $(window).resize(() => {
                this.onResize();
            });
            this.onScroll();
        }

        onTabClick(event, element) {
            event.preventDefault();
            let target = $(element.attr('href'));
            if (target.length) {
                let scrollTop = target.offset().top - this.tabContainerHeight + 1 + this.offsetAdjust;
                $('html, body').animate({ scrollTop: scrollTop }, 600, () => {
                    // アニメーション完了後に強制的にスクロール位置を再設定
                    this.updateTabPosition();
                });
            }
        }

        onScroll() {
            this.checkTabContainerPosition();
            this.findCurrentTabSelector();
        }

        onResize() {
            if (this.currentId) {
                this.setSliderCss();
            }
        }

        checkTabContainerPosition() {
            let offset = $('.tabs').offset().top + $('.tabs').height() - this.tabContainerHeight + this.offsetAdjust;
            if ($(window).scrollTop() > offset) {
                $('.tabs-container').addClass('tabs-container--top');
            } else {
                $('.tabs-container').removeClass('tabs-container--top');
            }
        }

        findCurrentTabSelector() {
            let newCurrentId;
            let newCurrentTab;
            let self = this;
            $('.tab').each(function () {
                let id = $(this).attr('href');
                let target = $(id);
                if (target.length) {
                    let offsetTop = target.offset().top - self.tabContainerHeight + self.offsetAdjust;
                    let offsetBottom = target.offset().top + target.height() - self.tabContainerHeight + self.offsetAdjust;
                    if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                        newCurrentId = id;
                        newCurrentTab = $(this);
                    }
                }
            });
            if (this.currentId !== newCurrentId || this.currentId === null) {
                this.currentId = newCurrentId;
                this.currentTab = newCurrentTab;
                this.setSliderCss();
            }
        }

        setSliderCss() {
            if (this.currentTab) {
                let width = this.currentTab.outerWidth();
                let left = this.currentTab.offset().left;
                $('.tab-slider').css({
                    width: width,
                    left: left
                });
            }
        }

        updateTabPosition() {
            // 強制的にスクロール位置を再設定
            let scrollTop = $(window).scrollTop();
            $(window).scrollTop(scrollTop + 1);
            $(window).scrollTop(scrollTop);
            this.onScroll(); // onScrollを呼び出しバーの位置を更新
        }
    }

    new StickyNavigation();
});
