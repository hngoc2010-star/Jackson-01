const input = document.getElementById("input");
const result = document.getElementById("result");

let current = null;

function findMatch(text) {
  text = text.toLowerCase();

  let best = null;
  let max = 0;

  fullData.forEach(item => {
    let score = 0;

    item.keywords.forEach(k => {
      if (text.includes(k)) score++;
    });

    if (score > max) {
      max = score;
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

  current = item.responses;

  result.innerHTML = `
    ${card("Soft", item.responses.soft)}
    ${card("Firm", item.responses.firm)}
    ${card("Strategic", item.responses.strategic)}
  `;
}

function card(title, text) {
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
  if (!current) return;

  const all = `
Soft: ${current.soft}

Firm: ${current.firm}

Strategic: ${current.strategic}
  `;

  navigator.clipboard.writeText(all);
}

input.addEventListener("input", () => {
  const match = findMatch(input.value);
  render(match);
});
