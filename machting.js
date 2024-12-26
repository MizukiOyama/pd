// ページ読み込み時に最初の質問を表示
document.addEventListener("DOMContentLoaded", () => {
   displayQuestion();
});

// 状態管理用変数
let currentQuestion = 1; // 現在の質問番号
let selectedAnswers = {}; // 選択された回答を格納するオブジェクト

const questions = {
   1: {
      text: "あなたが現在直面している課題を選んでください。",
      options: {
         1: "ブランドの認知度向上",
         2: "商品の販売促進",
         3: "新規顧客の獲得",
         4: "リピーター獲得"
      },
      next: (answer) => [11, 21, 31, 41][answer - 1] || null
   },
   11: {
      text: "現在のブランド認知度向上のための取り組みを選んでください。",
      options: {
         1: "SNS活用",
         2: "オフライン広告",
         3: "他には何もしていない"
      },
      next: (answer) => 20 + answer
   },
   21: {
      text: "現在の販売促進における課題を選んでください。",
      options: {
         1: "オンライン広告の活用不足",
         2: "商品ページの訪問者数が少ない",
         3: "販促キャンペーンの効果が低い"
      },
      next: () => 99
   },
   //質問22
   22: {
      text: "オンライン広告の課題を選んでください。",
      options: {
         1: "広告予算が足りない",
         2: "広告ターゲットの精度が低い",
         3: "広告運用の知識不足"
      },
      next: (answer) => 22 + answer
   },
   //質問23
   23: {
      text: "広告運用を改善するために取り組みたい方法を選んでください。",
      options: {
         1: "外部の専門家に依頼",
         2: "オンライン広告のトレーニングを受講",
         3: "広告運用ツールの導入"
      },
      next: () => 99 // 診断結果へ
   },
   //質問31
   31: {
      text: "新規顧客獲得における現状の課題を選んでください。",
      options: {
         1: "ウェブサイトの訪問者数が少ない",
         2: "ターゲット層の不明確さ",
         3: "顧客体験（UX）の質が低い"
      },
      next: (answer) => 31 + answer
   },
   //質問32
   32: {
      text: "訪問者数が少ない原因を選んでください。",
      options: {
         1: "SEO対策が不十分",
         2: "広告出稿を行っていない",
         3: "ソーシャルメディアでの露出が少ない"
      },
      next: (answer) => 32 + answer
   },
   //質問33
   33: {
      text: "SEO対策を強化するための施策を選んでください。",
      options: {
         1: "キーワード調査の実施",
         2: "高品質なコンテンツの作成",
         3: "外部リンク戦略の見直し"
      },
      next: () => 99 // 診断結果へ
   },
   //質問41
   41: {
      text: "リピート率向上における課題を選んでください。",
      options: {
         1: "リピーター向けの施策がない",
         2: "商品やサービスの満足度が低い",
         3: "メールマーケティングの効果が薄い"
      },
      next: (answer) => 41 + answer
   },
   //質問42
   42: {
      text: "リピーター施策として取り組みたい内容を選んでください。",
      options: {
         1: "ポイント制度の導入",
         2: "パーソナライズされたメールの送付",
         3: "ロイヤリティプログラムの導入"
      },
      next: (answer) => 42 + answer
   },
   //質問43
   43: {
      text: "ポイント制度を成功させるために取り組むべきことを選んでください。",
      options: {
         1: "シンプルで分かりやすいルールの設定",
         2: "ポイント付与条件の見直し",
         3: "キャンペーンの告知強化"
      },
      next: () => 99 // 診断結果へ
   },
   // 最後の質問（結果表示、ID: 99）
   99: {
      text: "診断結果: あなたの課題に対する最適な解決策が見つかりました！",
      options: {} // 結果画面には選択肢がない
   }
};

// ページ読み込み時に最初の質問を表示
window.onload = displayQuestion;

// 質問を表示する関数
function displayQuestion() {
   const questionContainer = document.getElementById("question-container");
   const resultContainer = document.getElementById("result-container");

   if (!questionContainer || !resultContainer) {
      console.error("必要なHTML要素が見つかりません (質問または結果コンテナ)");
      return;
   }

   questionContainer.style.display = "block";
   resultContainer.style.display = "none";

   const question = questions[currentQuestion];
   if (!question) {
      console.error("質問データが存在しません");
      return;
   }

   const questionText = questionContainer.querySelector(".question");
   const optionsContainer = questionContainer.querySelector(".options");

   if (!questionText || !optionsContainer) {
      console.error("質問または選択肢コンテナが見つかりません");
      return;
   }

   questionText.innerHTML = question.text;
   optionsContainer.innerHTML = "";

   Object.entries(question.options).forEach(([key, value]) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.innerHTML = value;
      button.onclick = () => handleAnswer(parseInt(key, 10));
      li.appendChild(button);
      optionsContainer.appendChild(li);
   });
}

// 回答を処理する関数
function handleAnswer(answer) {
   selectedAnswers[currentQuestion] = answer;
   const next = questions[currentQuestion]?.next(answer);

   if (next === 99) {
      confirmAdditionalInfo();
   } else if (questions[next]) {
      currentQuestion = next;
      displayQuestion();
   } else {
      console.error("次の質問が存在しません");
   }
}

// 追加情報の確認
function confirmAdditionalInfo() {
   const additionalInfo = confirm("こちらからの連絡を希望しますか？");
   if (additionalInfo) {
      const address = prompt("連絡先（メールアドレス）を入力してください:");
      if (address) selectedAnswers.address = address;
   }
   displayResult();
}

// 結果を表示する関数
function displayResult() {
   const questionContainer = document.getElementById("question-container");
   const resultContainer = document.getElementById("result-container");
   const resultText = document.getElementById("result-text");
   const adviceContent = document.getElementById("advice-content");

   if (!questionContainer || !resultContainer || !resultText || !adviceContent) {
      console.error("必要なHTML要素が見つかりません (結果または質問コンテナ)");
      return;
   }

   questionContainer.style.display = "none";
   resultContainer.style.display = "block";

   const formattedAnswers = Object.entries(selectedAnswers)
      .filter(([key]) => key !== "address")
      .map(([index, answerIndex]) => {
         const question = questions[index];
         const answer = question.options[answerIndex];
         return `質問：${question.text}<br>選んだ答え：${answer}`;
      })
      .join("<br><br>");

   resultText.innerHTML = `あなたの回答<br>${formattedAnswers}`;
   adviceContent.innerHTML = generateAdvice();
   sendToSpreadsheet(selectedAnswers, adviceContent.innerHTML);

   // リロードボタンの設定
   const reloadButton = document.getElementById("reload-button");
   reloadButton.onclick = () => location.reload();
}

// アドバイスを生成する関数
function generateAdvice() {
   let advice = "最終診断結果<br><br>";
   for (const questionNumber in selectedAnswers) {
      if (questionNumber !== "address") {
         const answer = selectedAnswers[questionNumber];
         advice += `Q${questionNumber}: ${questions[questionNumber].options[answer]}<br>`;
      }
   }

   if (selectedAnswers[1] === 1) { // 最初の質問で「ブランドの認知度向上」を選択した場合
      if (selectedAnswers[11] === 1) { // SNS活用を選択
         advice += "SNS活用のアドバイス：SNSの投稿頻度、ターゲット層へのリーチ、コンテンツの質を見直しましょう。<wbr>データ分析ツールを活用して効果測定を行い、改善を繰り返すことが重要です。";
         if (selectedAnswers[12] === 1) { // 投稿頻度が少ない
            advice += "SNS投稿頻度向上のためのアドバイス：投稿スケジュールの作成、コンテンツカレンダーの活用、ツールを使った予約投稿などを検討しましょう。<wbr>無理のない頻度で継続することが大切です。";
            if (selectedAnswers[13] === 1) {
               advice += "投稿スケジュールを作成することで、計画的に投稿を行うことができます。<wbr>コンテンツカレンダーやタスク管理ツールを活用しましょう。";
            } else if (selectedAnswers[13] === 2) {
               advice += "チーム内で役割分担を明確にすることで、効率的に作業を進めることができます。<wbr>各メンバーの得意分野を生かした役割分担を行いましょう。";
            } else if (selectedAnswers[13] === 3) {
               advice += "外部リソース（ライター、デザイナーなど）を活用することで、コンテンツ作成の負担を軽減できます。<wbr>予算に合わせて適切なリソースを選びましょう。";
            }
         } else if (selectedAnswers[12] === 2) { // ターゲット層にリーチできていない
            advice += "SNSターゲット層へのリーチ不足のアドバイス：ターゲット層の分析、ハッシュタグの見直し、インフルエンサーとの連携などを検討しましょう。<wbr>データ分析ツールを使って効果測定を行い、改善を繰り返しましょう。";
         } else if (selectedAnswers[12] === 3) { // コンテンツの質が低い
            advice += "SNSコンテンツの質向上のためのアドバイス：ユーザーのニーズに応える質の高いコンテンツを作成しましょう。<wbr>競合分析やトレンド調査を行い、魅力的なコンテンツを発信することが重要です。";
         }
      } else if (selectedAnswers[11] === 2) { // オフライン広告を選択
         advice += "オフライン広告のアドバイス：オフライン広告は、地域密着型のビジネスや特定のターゲット層に有効です。<wbr>費用対効果を考慮し、適切な媒体を選びましょう。<wbr>オンライン広告と組み合わせることで、より効果的なマーケティング戦略を構築できます。";
      } else if (selectedAnswers[11] === 3) { // 他には何もしていないを選択
         advice += "ブランド認知度向上のための最初の一歩：まずは、自社の状況に合った施策を検討することから始めましょう。<wbr>SNS活用、ウェブサイト改善、PR活動など、できることから取り組みましょう。";
      }
   }

   else if (selectedAnswers[1] === 2) { // 最初の質問で「商品の販売促進」を選択した場合
      if (selectedAnswers[21] === 1) { // オンライン広告の活用不足
         advice += "オンライン広告活用のアドバイス：オンライン広告の効果を高めるためには、ターゲット設定の見直し、クリエイティブの改善、ランディングページの最適化などが重要です。";
      } //21-1
      else if (selectedAnswers[21] === 2) { // 商品ページの訪問者数が少ない
         advice += "商品ページ訪問者数増加のアドバイス：商品ページのコンバージョン率を高めるためには、キャッチコピーの見直し、商品の魅力が伝わる写真や動画の追加、レビューの掲載などが効果的です。";
      } //21-2
      else if (selectedAnswers[21] === 3) { // 販促キャンペーンの効果が低い
         advice += "販促キャンペーン効果改善のアドバイス：過去のキャンペーンデータを分析することで、成功要因と改善点を把握することができます。<wbr>データ分析ツールを活用し、次回のキャンペーンに活かしましょう。";
      } //21-3
      if (selectedAnswers[22] === 1) {
         advice += "広告予算の配分を見直す際には、各広告媒体の費用対効果を分析し、最適な配分を検討しましょう。<wbr>A/Bテストなどを活用して効果測定を行うことが重要です。";
      } //22-1
      else if (selectedAnswers[22] === 2) {
         advice += "ターゲット層を絞り込むことで、広告の費用対効果を高めることができます。<wbr>顧客データや市場調査などを活用し、ターゲット層を明確にしましょう。";
      } //22-2
      else if (selectedAnswers[22] === 3) {
         advice += "オンライン広告に関する知識を深めることで、より効果的な広告戦略を立てることができます。<wbr>セミナーへの参加や書籍を読むなど、学習機会を設けましょう。";
      } //22-3
      if (selectedAnswers[23] === 1) {
         advice += "外部の専門家に依頼することで、高度な知識やノウハウを活用することができます。<wbr>複数の業者から見積もりを取り、比較検討しましょう。";
      } //23-1
      else if (selectedAnswers[23] === 2) {
         advice += "体系的なトレーニングを受けることで、広告運用に必要な知識やスキルを習得することができます。<wbr>オンラインコースやセミナーなどを活用しましょう。";
      } //23-2
      else if (selectedAnswers[23] === 3) {
         advice += "効果測定ツールを導入することで、広告の効果を可視化し、改善点を明確にすることができます。<wbr>Google Analyticsなどのツールを活用しましょう。";
      } //23-3
   }

   else if (selectedAnswers[1] === 3) { // 最初の質問で「新規顧客の獲得」を選択した場合
      if (selectedAnswers[31] === 1) { // ウェブサイトの訪問者数が少ない
         advice += "ウェブサイト訪問者数増加のアドバイス：ウェブサイトへの集客を増やすためには、SEO対策、コンテンツマーケティング、SNS活用などが有効です。<wbr>ターゲット層に合わせた施策を選びましょう。";
      } else if (selectedAnswers[31] === 2) { // ターゲット層の不明確さ
         advice += "ターゲット層明確化のアドバイス：ターゲット顧客を明確にすることで、効果的なマーケティング施策を展開することができます。<wbr>顧客データや市場調査などを活用し、ターゲット像を明確にしましょう。";
      } else if (selectedAnswers[31] === 3) { // 顧客体験（UX）の質が低い
         advice += "顧客体験（UX）改善のアドバイス：ウェブサイトのUI/UXを改善することで、ユーザーの利便性を高め、コンバージョン率を向上させることができます。<wbr>ユーザーテストなどを実施し、課題点を洗い出しましょう。";
      }
      if (selectedAnswers[32] === 1) {
         advice += "SEO対策を強化することで、検索エンジンからの流入を増やすことができます。<wbr>キーワードの見直し、コンテンツの最適化、被リンク獲得などを行いましょう。";
      } else if (selectedAnswers[32] === 2) {
         advice += "広告出稿を増やすことで、ウェブサイトへのアクセス数を増やすことができます。<wbr>ターゲット層に合わせた広告媒体を選び、効果測定を行いながら運用しましょう。";
      } else if (selectedAnswers[32] === 3) {
         advice += "ソーシャルメディアでの露出を増やすことで、ブランド認知度向上やウェブサイトへの集客効果が期待できます。<wbr>ターゲット層に合わせたプラットフォームを選び、積極的に情報発信を行いましょう。";
      }
      if (selectedAnswers[33] === 1) {
         advice += "キーワード調査の実施は、SEO対策の基本です。<wbr>適切なキーワードを選定することで、検索エンジンからの流入を効果的に増やすことができます。";
      } else if (selectedAnswers[33] === 2) {
         advice += "高品質なコンテンツを作成することで、ユーザーの満足度を高め、ウェブサイトの評価を向上させることができます。<wbr>ユーザーにとって有益な情報を提供することを心がけましょう。";
      } else if (selectedAnswers[33] === 3) {
         advice += "外部リンク戦略の見直しは、ウェブサイトの信頼性を高める上で重要です。<wbr>質の高いウェブサイトからの被リンクを獲得することで、検索順位の向上に繋げることができます。";
      }
   } else if (selectedAnswers[1] === 4) { // 最初の質問で「リピーター獲得」を選択した場合
      if (selectedAnswers[41] === 1) { // リピーター向けの施策がない
         advice += "リピーター施策導入のアドバイス：リピーター向けの施策を充実させることで、顧客ロイヤルティを高め、継続的な売上につなげることができます。<wbr>ポイント制度、メールマガジン、会員限定サービスなどを検討しましょう。";
      } else if (selectedAnswers[41] === 2) { // 商品やサービスの満足度が低い
         advice += "商品・サービス品質改善のアドバイス：商品・サービスの品質を向上させることは、リピーター獲得の基本です。<wbr>顧客からのフィードバックを収集し、改善に努めましょう。<wbr>顧客アンケートの実施、レビューの分析、競合製品との比較などを行い、具体的な改善点を見つけ出すことが重要です。";
         if (selectedAnswers[42] === 1) {
            advice += "ポイント制度の導入を検討されているとのことですので、顧客にとって魅力的な特典を設定し、リピート購入を促進する仕組みを構築しましょう。<wbr>ポイントの付与率、交換できる商品やサービス、有効期限などを明確にすることが重要です。";
         } else if (selectedAnswers[42] === 2) {
            advice += "パーソナライズされたメールの送付は、顧客エンゲージメントを高める効果的な手段です。<wbr>顧客の属性や購買履歴に基づいて、個別に最適化された情報やオファーを配信することで、顧客との関係性を深め、リピート購入を促進しましょう。顧客データの分析とセグメント配信が重要です。";
         } else if (selectedAnswers[42] === 3) {
            advice += "ロイヤリティプログラムの導入は、顧客の囲い込みに効果的です。<wbr>会員ランク制度、限定イベントへの招待、特別割引などを提供することで、顧客のロイヤルティを高め、長期的な関係を構築しましょう。<wbr>プログラムの設計と特典内容が重要です。";
         }
         if (selectedAnswers[43] === 1) {
            advice += "シンプルで分かりやすいルールを設定することで、顧客はポイント制度を容易に理解し、積極的に利用するようになります。<wbr>複雑なルールは顧客の混乱を招き、利用意欲を低下させる可能性があるため、注意が必要です。";
         } else if (selectedAnswers[43] === 2) {
            advice += "ポイント付与条件の見直しは、顧客の行動を適切に誘導し、リピート購入を促進するために重要です。<wbr>購買金額、購入頻度、特定商品の購入など、顧客にとって魅力的な条件を設定しましょう。";
         } else if (selectedAnswers[43] === 3) {
            advice += "キャンペーンの告知強化は、ポイント制度の利用促進に不可欠です。<wbr>ウェブサイト、メールマガジン、SNSなどを活用し、キャンペーン情報を効果的に伝え、顧客の参加を促しましょう。";
         }

      } else if (selectedAnswers[41] === 3) { // メールマーケティングの効果が薄い
         advice += "メールマーケティング改善のアドバイス：メールマーケティングを効果的に活用することで、顧客との関係性を維持し、リピート購入を促進することができます。<wbr>セグメント配信、パーソナライズされたコンテンツ、キャンペーン情報などを配信しましょう。<wbr>配信頻度、コンテンツ内容、配信タイミング、件名、デザインなどを見直すことで、開封率やクリック率の改善を図りましょう。";
      }
   }

   // アドバイス内容を HTML に適用
   const adviceContent = document.getElementById("advice-content");
   adviceContent.innerHTML = ""; // 既存内容をクリア
   adviceContent.innerHTML = advice; // 改行を含めたアドバイスを設定

   // スプレッドシートにデータを送信
   sendToSpreadsheet(selectedAnswers, advice);

   return advice; // 必要に応じて戻り値として返却
}

// スプレッドシートにデータを送信する関数
// データ送信関数
function sendData() {
   const name = document.getElementById("name").value.trim();
   const email = document.getElementById("email").value.trim();

   if (!name || !email) {
      alert("名前とメールアドレスを入力してください。");
      return;
   }

   // 回答結果をまとめる
   const data = {
      name,
      email,
      answers: JSON.stringify(selectedAnswers), // オブジェクトを文字列化
   };

   // Google Apps ScriptのURL
   const scriptURL = "https://script.google.com/macros/s/AKfycbyYu-AWibPhHPXpMjgFDg2xdInxxu0c4BWYdUYTIEFgKqnHmwA8dsyn20gK0nzJ-vI/exec";

   // データ送信
   fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((response) => {
         if (!response.ok) {
            throw new Error("サーバーエラーが発生しました");
         }
         return response.json();
      })
      .then((result) => {
         alert("データが正常に送信されました。ありがとうございます！");
         console.log("送信結果:", result);
      })
      .catch((error) => {
         alert("データ送信中にエラーが発生しました。");
         console.error("送信エラー:", error);
      });
}


document.addEventListener("DOMContentLoaded", () => {
   // 質問を表示する関数
   function displayQuestion() {
      const questionContainer = document.getElementById("question-container");
      const resultContainer = document.getElementById("result-container");
      const answersContainer = document.getElementById("advice-content");

      // 必須要素のチェック
      if (!questionContainer || !resultContainer) {
         console.error("必要なHTML要素が見つかりません (質問または結果コンテナ)");
         return;
      }

      // 初期表示の設定
      questionContainer.style.display = "block";
      resultContainer.style.display = "none";

      // ダミーの質問を表示 (ここに質問データを挿入)
      questionContainer.querySelector(".question").innerHTML = "これはサンプル質問です。";

      const optionsContainer = questionContainer.querySelector(".options");
      optionsContainer.innerHTML = "";

      // ダミーの選択肢 (実際のデータに置き換える)
      const options = { 1: "はい", 2: "いいえ" };
      Object.entries(options).forEach(([key, value]) => {
         const li = document.createElement("li");
         const button = document.createElement("button");
         button.innerHTML = value;
         button.onclick = () => handleAnswer(parseInt(key, 10));
         li.appendChild(button);
         optionsContainer.appendChild(li);
      });
   }

   // 回答処理のダミー関数
   function handleAnswer(answer) {
      alert(`回答: ${answer}`);
      displayResult();
   }

   // 結果を表示する関数
   function displayResult() {
      const questionContainer = document.getElementById("question-container");
      const resultContainer = document.getElementById("result-container");

      // 必須要素のチェック
      if (!questionContainer || !resultContainer) {
         console.error("必要なHTML要素が見つかりません (結果または質問コンテナ)");
         return;
      }

      // 結果画面の表示
      questionContainer.style.display = "none";
      resultContainer.style.display = "block";

      // 結果の表示
      const resultText = document.getElementById("result-text");
      resultText.innerHTML = "これはサンプル結果です。";

      const adviceContent = document.getElementById("advice-content");
      adviceContent.innerHTML = "これはサンプルアドバイスです。";
   }

   // 最初の質問を表示
   displayQuestion();
});

// データをスプレッドシートに送信する関数
function sendToSpreadsheet(data, advice) {
   // Google Apps ScriptのURL
   const scriptURL = "https://script.google.com/macros/s/AKfycbyYu-AWibPhHPXpMjgFDg2xdInxxu0c4BWYdUYTIEFgKqnHmwA8dsyn20gK0nzJ-vI/exec";

   // データ送信関数
   function sendData() {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();

      if (!name || !email) {
         alert("名前とメールアドレスを入力してください。");
         return;
      }

      // 回答結果をまとめる
      const data = {
         name,
         email,
         answers: JSON.stringify(selectedAnswers),
         advice: "サンプルアドバイス", // 必要に応じて適切な値を設定
      };

      fetch(scriptURL, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error(`サーバーエラー: ${response.status} ${response.statusText}`);
            }
            return response.json();
         })
         .then((result) => {
            alert("データが正常に送信されました。ありがとうございます！");
            console.log("送信結果:", result);
         })
         .catch((error) => {
            alert("データ送信中にエラーが発生しました。");
            console.error("送信エラー: ", error.message || error);
         });
   }
}

//送信完了後＝送信完了しました
//99前にこちらからの連絡は希望しますか？
//はい＝Addressの入力＝99へ移動
//（回答結果、アドバイス、Address）の送信
//いいえ＝99へ移動
//（回答結果、アドバイス）の送信