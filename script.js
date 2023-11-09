// script.js
function saveMemo() {
  var memo = document.getElementById("memoTextarea").value;
  if (memo !== "") {
    fetch('/memo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ memo: memo })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      loadMemoList();
      document.getElementById("memoTextarea").value = "";
    })
    .catch(error => console.error(error));
  }
}

function loadMemoList() {
  fetch('/memo')
    .then(response => response.json())
    .then(data => {
      var memoListDiv = document.getElementById("memoList");
      memoListDiv.innerHTML = "";
      data.forEach(memo => {
        var memoDiv = document.createElement("div");
        memoDiv.textContent = memo;
        memoListDiv.appendChild(memoDiv);
      });
    })
    .catch(error => console.error(error));
}

loadMemoList();