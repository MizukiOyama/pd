// Service モーダルのDOM要素取得と動作
document.addEventListener("DOMContentLoaded", function() {
    var serviceModal = document.getElementById("serviceModal");
    var serviceOpenBtn = document.getElementById("openModalBtn");
    var serviceCloseBtn = document.querySelector(".op-close");

    // Serviceボタンクリックでモーダルを表示
    serviceOpenBtn.addEventListener("click", function() {
        serviceModal.style.display = "block";
        document.body.style.overflow = 'hidden'; // ページスクロールを無効化
    });

    // Serviceモーダルの閉じるボタンで非表示
    serviceCloseBtn.addEventListener("click", function() {
        serviceModal.style.display = "none";
        document.body.style.overflow = 'auto'; // スクロール再有効化
    });

    // Serviceモーダル外をクリックした場合に非表示
    window.addEventListener("click", function(event) {
        if (event.target === serviceModal) {
            serviceModal.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
});

// Card モーダルのDOM要素取得と動作
document.addEventListener("DOMContentLoaded", function() {
    const cardModalContents = [
        {
            left: "Web Design",
            right: "<p>HP、LPの制作を行います。</p><br><p>責任を持って...</p>"
        },
        // 他のコンテンツをここに追加...
    ];

    let clickedCard;

    function cardClicked(cardIndex) {
        const cards = document.querySelectorAll(".card");
        clickedCard = cards[cardIndex - 1];
        clickedCard.classList.add("card-clicked");
        moveCardToCenter(clickedCard, cardIndex);
    }

    function moveCardToCenter(card, cardIndex) {
        const cardRect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const cardWidth = cardRect.width;
        const centerX = (windowWidth / 2) - (cardWidth / 2);

        card.style.transform = `translateX(${centerX - cardRect.left}px) scale(1.2)`;

        card.addEventListener("transitionend", function () {
            openCardModal(cardIndex);
        }, { once: true });

        const otherCards = document.querySelectorAll(".card:not(.card-clicked)");
        otherCards.forEach((otherCard) => {
            otherCard.style.transform = "translateY(50%)";
            otherCard.style.opacity = "1";
        });
    }

    function openCardModal(cardIndex) {
        const cardModal = document.getElementById("modal");
        cardModal.classList.remove('close');
        cardModal.classList.add('open');

        cardModal.style.display = "flex";

        const modalLeftContent = document.getElementById("modal-left-content");
        const modalRightContent = document.getElementById("modal-right-content");
        modalLeftContent.innerHTML = cardModalContents[cardIndex - 1].left;
        modalRightContent.innerHTML = cardModalContents[cardIndex - 1].right;
    }

    function closeCardModal() {
        const cardModal = document.getElementById("modal");
        cardModal.classList.remove('open');
        cardModal.classList.add('close');

        setTimeout(() => {
            cardModal.style.display = "none";
        }, 500);

        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            card.style.transform = "none";
            card.classList.remove("card-clicked");
        });
    }

    window.addEventListener("click", function (event) {
        const cardModal = document.getElementById("modal");
        if (cardModal.style.display === "flex" && !cardModal.contains(event.target)) {
            closeCardModal();
        }
    });
});
