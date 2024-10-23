const cardModalContents = [
    {
        left: "<h4>Web Design</h4><p>基本的なHTML/CSS/JavaScriptを使用してコーディングを行い制作いたします。「TOP、About、Service、Contact、Information」などの1～5ページ程度のシンプルなサイト制作を行います。 ビジュアルはもちろん、文章に乗せる言葉などの細部もこだわり制作いたします。<br>※制作を検討中の方でも問合せを受け付けているので、お気軽にお問い合わせください。アニメーション、表示速度の調整も可能です。</p>"
    },
    {
        left: "<h4>Art Order</h4><p>Art作品の制作を行います。<br>Abstract Art、Digital Art、などの制作が可能です。 新築、新居にも合うArt作品を提供いたします。<br>※サイズや使用する画材で価格が変動するので、Orderをご検討の方は問合せにてOrderの詳細をお伝えいたしますので、お気軽にお申し付けください。</p>"
    },
    {
        left: "<h4>Consulting</h4><p>個人事業や新規事業の立ち上げへのアドバイスや事業の土台固めを行います。<br>※無料相談「1時間」のお申込みもできますのでお気軽にお申し付けください。※個人事業や新規事業の土台固め、ブランディングの補助を行いますので、ビジョンやこだわり、想いなどの情報共有をお願いいたします。</p>"
    },
    {
        left: "<h4>Illustration</h4><p>Webやチラシなど様々な用途で使用できる雰囲気に合ったイラストを提供します。対応しているもの、「ウェブ、印刷、イメージキャラクター」などのイラストを制作します。</p>"
    },
    {
        left: "<h4>Writing</h4><p>ウェブ、印刷物、などで使用する文章のライティングを行います。「キャッチコピー、SEOを意識した文章」など。<br>※お申込み後の面談前日までに乗せたい「文章、キャッチコピー」などをご用意ください。</p>"
    },
    {
        left: "<h4>Photo</h4><p>Webで使用する写真や商品や個人のプロフィール写真撮影。シンプルなセットで、手軽な撮影を行います。<br>※遠方の撮影も可能ですが、別途交通費のご負担をお願いしています。</p>"
    },
    {
        left: "<h4>Video</h4><p>ウェブで使用する映像を撮影・制作を行います。<br>※簡単なアニメーションやスライドショーなど、シンプルな2D動画。商品紹介やサービス説明動画などが中心になります。※制作が困難な場合は、こちらで映像制作を外注が必須になることがあるので、あらかじめクオリティーやイメージをお知らせください。</p>"
    },
    {
        left: "<h4>DTP Design</h4><p>印刷物のデザイン制作を行います。<br>※印刷まで行うことも可能ですが、印刷業者、品質で価格が変動しますのでご了承ください。※対応可能な印刷物「メニュー表、名刺、チラシ、ポスター」</p>"
    },
    {
        left: "<h4>Banner</h4><p>SNSの投稿用や広告用のバナー制作を行います。<br>※キャンペーンやイベント告知に使用するバナーなども制作しております。※バナーとLP/HPのセットでお申込みいただけるので、LPやHPの制作をご検討中の方はご相談ください。</p>"
    },
    {
        left: "<h4>Logo</h4><p>会社や組織団体で使用できる、シンプルなロゴのデザインを行います。<br>※Web用、印刷用どちらも対応いたします。</p>"
    },
    {
        left: "<h4>etc...</h4><p>表記のないものを依頼したい場合は、Contactページからお問合せください。</p>"
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
      otherCard.style.opacity = "0.5";
    });
  }
  
  function openModal(cardIndex) {
    // 既にモーダルがある場合は削除する
    const existingModal = document.getElementById("dynamic-modal");
    if (existingModal) {
      existingModal.remove();
    }
  
    // モーダルウィンドウを作成
    const modal = document.createElement("div");
    modal.id = "dynamic-modal";
    modal.classList.add("modal");
  
    // モーダルコンテンツを作成
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
  
    const modalLeftContent = document.createElement("div");
    modalLeftContent.innerHTML = cardModalContents[cardIndex - 1].left;
    modalLeftContent.classList.add("modal-left-content");

    modalContent.appendChild(modalLeftContent);
    modal.appendChild(modalContent);
  
    // 閉じるボタンを作成
    const closeButton = document.createElement("button");
    closeButton.innerHTML = "Close";
    closeButton.onclick = closeModal;
    modalContent.appendChild(closeButton);
  
    // モーダルウィンドウをbodyに追加
    document.body.appendChild(modal);
  
    // モーダル表示
    modal.style.display = "flex";
  
    // CSSを追加 .modal
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.width = "85vmin";
    modal.style.height = "55%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.backgroundColor = "rgba(46, 46, 46, 0.5)";
    modal.style.zIndex = "1000";
    modal.style.padding = "30px";
    modal.style.boxShadow = "rgba(0, 0, 0, 0.6) 0px 2px 3px";
    modal.style.borderRadius = "10px";
  }
  
  function closeModal() {
    const modal = document.getElementById("dynamic-modal");
    if (modal) {
      modal.remove();
    }
  
    // カードを元の位置に戻す
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.style.transform = "none";
      card.classList.remove("card-clicked");
      card.style.opacity = "1";
    });
  }
  
  // モーダルウィンドウ外のクリックでモーダルを閉じる
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("dynamic-modal");
  
    // クリックした場所がモーダルの中か外かをチェック
    if (modal && !modal.contains(event.target)) {
      closeModal();
    }
  });
  