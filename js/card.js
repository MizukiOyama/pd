document.addEventListener("DOMContentLoaded", function() {
    // potion modal
    var modal = document.getElementById("serviceModal");
    var openBtn = document.getElementById("openModalBtn");
    var closeBtn = document.querySelector(".op-close");

    // null チェック
    if (modal && openBtn && closeBtn) {
        openBtn.addEventListener("click", function() {
            modal.style.display = "block";
            document.body.style.overflow = 'hidden';
        });

        closeBtn.addEventListener("click", function() {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        });
    }

    // main service
    const cardModalContents = [
        // modal content...
    ];

    let clickedCard;

    function cardClicked(cardIndex) {
        // カードのインデックスから要素を取得
        const card = document.querySelector(`.c-${cardIndex}`);
        if (card) {
            clickedCard = card;
            clickedCard.classList.add("card-clicked");
            moveCardToCenter(clickedCard, cardIndex);
        } else {
            console.error(`Card with index ${cardIndex} not found.`);
        }
    }

    function moveCardToCenter(card, cardIndex) {
        const cardRect = card.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const cardWidth = cardRect.width;
        const centerX = (windowWidth / 2) - (cardWidth / 2);

        card.style.transform = `translateX(${centerX - cardRect.left}px) scale(1.2)`;

        card.addEventListener("transitionend", function () {
            openModal(cardIndex);
        }, { once: true });

        const otherCards = document.querySelectorAll(".card:not(.card-clicked)");
        otherCards.forEach((otherCard) => {
            otherCard.style.transform = "translateY(50%)";
            otherCard.style.opacity = "1";
        });
    }

    function openModal(cardIndex) {
        const modal = document.getElementById("modal");
        if (modal) {
            modal.classList.remove('close');
            modal.classList.add('open');
            modal.style.display = "flex";

            const modalLeftContent = document.getElementById("modal-left-content");
            const modalRightContent = document.getElementById("modal-right-content");

            if (modalLeftContent && modalRightContent) {
                modalLeftContent.innerHTML = cardModalContents[cardIndex - 1].left;
                modalRightContent.innerHTML = cardModalContents[cardIndex - 1].right;
            }
        }
    }

    function closeModal() {
        const modal = document.getElementById("modal");
        if (modal) {
            modal.classList.remove('open');
            modal.classList.add('close');

            setTimeout(() => {
                modal.style.display = "none";
            }, 500);

            const cards = document.querySelectorAll(".card");
            cards.forEach((card) => {
                card.style.transform = "none";
                card.classList.remove("card-clicked");
            });
        }
    }

    window.addEventListener("click", function (event) {
        const modal = document.getElementById("modal");
        if (modal && modal.style.display === "flex" && !modal.contains(event.target)) {
            closeModal();
        }
    });
});
