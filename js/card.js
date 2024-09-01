const cardModalContents = [
    {
        left: "text",
        right: "当ページは過去作品のまとめページです.",
        button: "カード1のボタン"
    },
    {
        left: "左側のコンテンツ2",
        right: "右側のコンテンツ2",
        button: "カード2のボタン"
    },
    {
        left: "左側のコンテンツ3",
        right: "右側のコンテンツ3",
        button: "カード3のボタン"
    },
    {
        left: "左側のコンテンツ4",
        right: "右側のコンテンツ4",
        button: "カード4のボタン"
    },
    {
        left: "<img src='image3.jpg'>左側のコンテンツ3",
        right: "右側のコンテンツ3",
        button: "カード5のボタン"
    },
    {
        left: "<img src='image4.jpg'>左側のコンテンツ4",
        right: "右側のコンテンツ4",
        button: "カード6のボタン"
    },
    {
        left: "<img src='image3.jpg'>左側のコンテンツ3",
        right: "右側のコンテンツ3",
        button: "カード7のボタン"
    },
    {
        left: "<img src='image4.jpg'>左側のコンテンツ4",
        right: "右側のコンテンツ4",
        button: "カード8のボタン"
    },
    {
        left: "<img src='image3.jpg'>左側のコンテンツ3",
        right: "右側のコンテンツ3",
        button: "カード9のボタン"
    },
    {
        left: "<img src='image4.jpg'>左側のコンテンツ4",
        right: "右側のコンテンツ4",
        button: "カード10のボタン"
    },
    {
        left: "<img src='image4.jpg'>左側のコンテンツ4",
        right: "右側のコンテンツ4",
        button: "カード11のボタン"
    }
];

// Store the clicked card element
let clickedCard = null;

function cardClicked(cardElement, cardNumber) {
    clickedCard = cardElement;
    clickedCard.classList.add("card-clicked");
    moveCardToCenter(clickedCard, cardNumber);
}

function moveCardToCenter(card, cardNumber) {
    const cardRect = card.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const cardWidth = cardRect.width;
    const centerX = (windowWidth / 2) - (cardWidth / 2);

    // Move the clicked card to the center
    card.style.transform = `translateX(${centerX - cardRect.left}px) scale(1.2)`;

    // After the card's movement animation finishes, open the modal
    card.addEventListener("transitionend", function () {
        openModal(cardNumber);
    }, { once: true });

    // Slide out all other cards in the same container
    const siblingCards = card.parentElement.querySelectorAll(".card:not(.card-clicked)");
    siblingCards.forEach((siblingCard) => {
        siblingCard.style.transform = "translateY(50%)";
        siblingCard.style.opacity = "1";
    });
}

function openModal(cardNumber) {
    const modal = document.getElementById("modal");
    modal.classList.remove('close');
    modal.classList.add('open');

    modal.style.display = "flex";

    // Update the modal content based on the clicked card
    const modalLeftContent = document.getElementById("modal-left-content");
    const modalRightContent = document.getElementById("modal-right-content");
    modalLeftContent.innerHTML = cardModalContents[cardNumber - 1].left;
    modalRightContent.innerHTML = cardModalContents[cardNumber - 1].right;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove('open');
    modal.classList.add('close');

    // Hide the modal after the close animation finishes
    setTimeout(() => {
        modal.style.display = "none";
    }, 500);

    // Reset the position and style of all cards
    const allCards = document.querySelectorAll(".card");
    allCards.forEach((card) => {
        card.style.transform = "none";
        card.classList.remove("card-clicked");
    });
}

// Event listener for all card elements
document.querySelectorAll('.card-container .card').forEach((card, index) => {
    card.addEventListener('click', () => cardClicked(card, index + 1));
});

// Close modal when clicking outside of it
window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");

    // Check if the clicked area is outside the modal
    if (modal.style.display === "flex" && !modal.contains(event.target)) {
        closeModal();
    }
});
