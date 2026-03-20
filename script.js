const input = document.getElementById("input");
const result = document.getElementById("result");
const suggestionsBox = document.getElementById("suggestions");

let currentList = [];

/* =========================
   NORMALIZE
========================= */
function normalize(text) {
  return text.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();
}

/* =========================
   FUZZY MATCH
========================= */
function isMatch(word, keyword) {
  return (
    keyword.startsWith(word) ||
    word.startsWith(keyword) ||
    keyword.includes(word)
  );
}

/* =========================
   AUTOCOMPLETE (GỢI Ý)
========================= */
function getSuggestions(text) {
  const t = normalize(text);

  if (t.length < 2) return [];

  return fullData
    .filter(item =>
      item.situation.toLowerCase().includes(t)
    )
    .slice(0, 5);
}

function renderSuggestions(list) {
  suggestionsBox.innerHTML = "";

  list.forEach(item => {
    suggestionsBox.innerHTML += `
      <div class="suggestion-item" onclick="selectSuggestion('${item.situation}')">
        ${item.situation}
      </div>
    `;
  });
}

function selectSuggestion(text) {
  input.value = text;
  suggestionsBox.innerHTML = "";
  runSearch();
}

/* =========================
   MATCH TOP 3
========================= */
function findBestMatches(inputText) {
  const text = normalize(inputText);
  const words = text.split(" ");

  let scored = [];

  fullData.forEach(item => {
    let score = 0;

    item.keywords.forEach(k => {
      k = normalize(k);

      words.forEach(w => {
        if (isMatch(w, k)) score++;
      });
    });

    if (score > 0) {
      scored.push({ item, score });
    }
  });

  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3);
}

/* =========================
   RENDER RESULT
========================= */
function renderList(list) {
  result.innerHTML = "";

  if (list.length === 0) {
    result.innerHTML = "<p>No suggestion found</p>";
    return;
  }

  currentList = list;

  list.forEach(res => {
    const item = res.item;

    result.innerHTML += `
      <div class="card">
        <h3>${item.situation}</h3>

        <p><b>Soft:</b> ${item.responses.soft}</p>
        <button onclick="copyText('${item.responses.soft}')">Copy</button>

        <p><b>Firm:</b> ${item.responses.firm}</p>
        <button onclick="copyText('${item.responses.firm}')">Copy</button>

        <p><b>Strategic:</b> ${item.responses.strategic}</p>
        <button onclick="copyText('${item.responses.strategic}')">Copy</button>
      </div>
    `;
  });
}

/* =========================
   COPY
========================= */
function copyText(text) {
  navigator.clipboard.writeText(text);
}

/* =========================
   MAIN LOGIC
========================= */
function runSearch() {
  const matches = findBestMatches(input.value);
  renderList(matches);
}

/* =========================
   REALTIME INPUT
========================= */
input.addEventListener("input", () => {
  const text = input.value;

  // gợi ý
  const sug = getSuggestions(text);
  renderSuggestions(sug);

  // kết quả
  runSearch();
});
