const cardModalContents = [
    {
        left: "Web Design<p>HP、LPの制作を行います。</p>",
        right: "<p>責任を持って最後まで提供するものにこだわり制作いたします。※制作を検討中の方でも問合せを受け付けているので、お気軽にお問い合わせください。</p>"
    },
    {
        left: "Art Order<p>Art作品の制作を行います。</p>",
        right: "<p>Abstract Art、Digital Art、などの制作が可能です。新築、新居にも合うArt作品を提供いたします。</p>"
    },
    {
        left: "Consulting",
        right: "<p>新規事業の立ち上げへのアドバイスや事業の土台固めを行います。</p>"
    },
    {
        left: "Illustration<p>様々な用途で使用できるイラストの制作を行います。</p>",
        right: "<p>ウェブ、印刷物、イメージキャラクター、などのイラストを制作します。</p>"
    },
    {
        left: "Writing<p></p>",
        right: "<p>ウェブ、印刷物、などのライティングを行います。</p>"
    },
    {
        left: "Photo<p></p>",
        right: "<p>ウェブ、ポートレート、商品、などの写真撮影を行います。</p>"
    },
    {
        left: "Video<p></p>",
        right: "<p>ウェブ、などで使用する映像を撮影・制作を行います。</p>"
    },
    {
        left: "DTP<p></p>",
        right: "<p>印刷物の制作を行います。「メニュー表、名刺、チラシ、ポスター」etc...</p>"
    },
    {
        left: "Banner<p></p>",
        right: "<p>広告用のバナー制作を行います。</p>"
    },
    {
        left: "Logo<p></p>",
        right: "<p>会社や組織団体のオリジナルのロゴを制作します。</p>"
    },
    {
        left: "etc...<p></p>",
        right: "<p>表記のないものを依頼したい場合は、Contactページからお問合せください。</p>"
    }
];

let clickedCard; // グローバル変数

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

    // カードを画面中央に移動
    card.style.transform = `translateX(${centerX - cardRect.left}px) scale(1.2)`;

    // カードの移動アニメーションが終了した後にモーダルを開く
    card.addEventListener("transitionend", function () {
        openModal(cardIndex);
    }, { once: true });

    // クリックされたカード以外のカードを下にスライドアウトさせる
    const otherCards = document.querySelectorAll(".card:not(.card-clicked)");
    otherCards.forEach((otherCard) => {
        otherCard.style.transform = "translateY(50%)";
        otherCard.style.opacity = "1";
    });
}

function openModal(cardIndex) {
    const modal = document.getElementById("modal");
    modal.classList.remove('close');
    modal.classList.add('open');

    modal.style.display = "flex";

    // カードごとのモーダルウィンドウのコンテンツを更新
    const modalLeftContent = document.getElementById("modal-left-content");
    const modalRightContent = document.getElementById("modal-right-content");
    modalLeftContent.innerHTML = cardModalContents[cardIndex - 1].left;
    modalRightContent.innerHTML = cardModalContents[cardIndex - 1].right;
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