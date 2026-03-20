let currentResponses = null;
let isPro = false; // 👉 đổi true = mở full

function findBestMatch(input) {
  input = input.toLowerCase();

  let best = null;
  let maxScore = 0;

  fullData.forEach(item => {
    let score = 0;

    item.keywords.forEach(k => {
      if (input.includes(k)) score++;
    });

    if (score > maxScore) {
      maxScore = score;
      best = item;
    }
  });

  return best;
}

function render(item) {
  if (!item) {
    result.innerHTML = "<p>No suggestion found</p>";
    return;
  }

  currentResponses = item.responses;

  result.innerHTML = `
    ${createCard("Soft", item.responses.soft)}
    ${createCard("Firm", item.responses.firm)}
    ${createCard("Strategic", item.responses.strategic)}
  `;

  // lock PRO
  if (!isPro) {
    document.getElementById("lock").style.display = "block";
  } else {
    document.getElementById("lock").style.display = "none";
  }
}

function createCard(title, text) {
  return `
    <div class="card">
      <h3>${title}</h3>
      <p>${text}</p>
      <button onclick="copyText('${text}')">Copy</button>
    </div>
  `;
}

function copyText(text) {
  navigator.clipboard.writeText(text);
}

function copyAll() {
  if (!currentResponses) return;

  const all = `
Soft: ${currentResponses.soft}

Firm: ${currentResponses.firm}

Strategic: ${currentResponses.strategic}
  `;

  navigator.clipboard.writeText(all);
}

input.addEventListener("input", () => {
  const match = findBestMatch(input.value);
  render(match);
});
