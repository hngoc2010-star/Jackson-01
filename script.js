const input = document.getElementById("input");
const result = document.getElementById("result");

let currentList = [];

/* =========================
   1. NORMALIZE TEXT
========================= */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

/* =========================
   2. FUZZY MATCH (GẦN ĐÚNG)
========================= */
function isMatch(word, keyword) {
  return (
    keyword.startsWith(word) ||   // "pri" → "price"
    word.startsWith(keyword) ||   // "pricee" → "price"
    keyword.includes(word) ||     // "freight" chứa "fre"
    word.includes(keyword)        // fallback
  );
}

/* =========================
   3. TÍNH ĐIỂM MATCH
========================= */
function scoreItem(words, item) {
  let score = 0;

  item.keywords.forEach(k => {
    k = normalize(k);

    words.forEach(w => {
      if (isMatch(w, k)) {
        score += 1;
      }
    });
  });

  return score;
}

/* =========================
   4. TÌM TOP 3 KẾT QUẢ
========================= */
function findBestMatches(inputText) {
  const text = normalize(inputText);
  const words = text.split(" ");

  let scored = [];

  fullData.forEach(item => {
    const score = scoreItem(words, item);

    if (score > 0) {
      scored.push({ item, score });
    }
  });

  // sort theo điểm cao nhất
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 3); // lấy top 3
}

/* =========================
   5. RENDER UI
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
   6. COPY
========================= */
function copyText(text) {
  navigator.clipboard.writeText(text);
}

function copyAll() {
  if (!currentList.length) return;

  let all = "";

  currentList.forEach(res => {
    const r = res.item.responses;

    all += `
Soft: ${r.soft}
Firm: ${r.firm}
Strategic: ${r.strategic}

---------------------
`;
  });

  navigator.clipboard.writeText(all);
}

/* =========================
   7. REALTIME INPUT
========================= */
input.addEventListener("input", () => {
  const matches = findBestMatches(input.value);
  renderList(matches);
});
