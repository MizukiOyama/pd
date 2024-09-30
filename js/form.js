document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".input-text");
  
  inputs.forEach(input => {
    // 初期チェック
    toggleLabel(input);

    // 入力イベントに応じてクラスを切り替え
    input.addEventListener("input", function () {
      toggleLabel(input);
    });

    function toggleLabel(input) {
      if (input.value !== "") {
        input.classList.add("not-empty");
      } else {
        input.classList.remove("not-empty");
      }
    }
  });

  var modal = document.getElementById('thanksModal');
  var span = document.getElementsByClassName('close')[0];

  document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;
    var formData = new FormData(form);
    
    fetch(form.action, {
      method: 'POST',
      body: formData
    }).then(response => {
      if (response.ok) {
        modal.style.display = "block";
        form.reset();
        document.querySelectorAll('.input-text').forEach(input => {
          input.classList.remove('not-empty');
        });
      } else {
        alert('There was a problem with the submission.');
      }
    }).catch(error => {
      alert('There was a problem with the submission.');
    });
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
