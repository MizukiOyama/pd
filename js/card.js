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

let clickedCard; // グローバル変数

function cardClicked(cardNumber) {
    clickedCard = document.querySelector(".card:nth-child(" + cardNumber + ")");
    clickedCard.classList.add("card-clicked");
    moveCardToCenter(cardNumber);
}

function moveCardToCenter(cardNumber) {
    const card = document.querySelector(".card:nth-child(" + cardNumber + ")");
    const cardRect = card.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const cardWidth = cardRect.width;
    const centerX = (windowWidth / 2) - (cardWidth / 2);

    // カードを画面中央に移動
    card.style.transform = `translateX(${centerX - cardRect.left}px) scale(1.2)`;

    // カードの移動アニメーションが終了した後にモーダルを開く
    card.addEventListener("transitionend", function () {
        openModal(cardNumber);
    }, { once: true });

    // クリックされたカード以外のカードを下にスライドアウトさせる
    const cards = document.querySelectorAll(".card:not(.card-clicked)");
    cards.forEach((card) => {
        if (card !== clickedCard) {
            card.style.transform = "translateY(50%)";
            card.style.opacity = "1";
        }
    });
}

function openModal(cardNumber) {
    const modal = document.getElementById("modal");
    modal.classList.remove('close');
    modal.classList.add('open');

    modal.style.display = "flex";

    // カードごとのモーダルウィンドウのコンテンツを更新
    const modalLeftContent = document.getElementById("modal-left-content");
    const modalRightContent = document.getElementById("modal-right-content");
    modalLeftContent.innerHTML = cardModalContents[cardNumber - 1].left;
    modalRightContent.innerHTML = cardModalContents[cardNumber - 1].right;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove('open');
    modal.classList.add('close');

    // アニメーション終了後に非表示にする
    setTimeout(() => {
        modal.style.display = "none";
    }, 500);

    // カードを元の位置に戻す
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.style.transform = "none";
        card.classList.remove("card-clicked");
    });
}


// モーダルウィンドウ外のクリックでモーダルを閉じる
window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");

    // クリックした場所がモーダルの中か外かをチェック
    if (modal.style.display === "flex" && !modal.contains(event.target)) {
        closeModal();
    }
});