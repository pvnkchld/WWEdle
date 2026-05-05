// 1. DATABASE
const wrestlers = [
  { name: "Stone Cold", era: "Attitude", brand: "Legend", debut: 1989, height: 188, align: "Face", rr: "Yes", retired: "Yes" },
  { name: "The Rock", era: "Attitude", brand: "SmackDown", debut: 1996, height: 196, align: "Heel", rr: "Yes", retired: "No" },
  { name: "Triple H", era: "Attitude", brand: "Legend", debut: 1992, height: 193, align: "Heel", rr: "Yes", retired: "Yes" },
  { name: "Kane", era: "Attitude", brand: "Legend", debut: 1992, height: 213, align: "Heel", rr: "No", retired: "Yes" },
  { name: "Shawn Michaels", era: "Attitude", brand: "Legend", debut: 1984, height: 185, align: "Face", rr: "Yes", retired: "Yes" },
  { name: "The Undertaker", era: "Attitude", brand: "Legend", debut: 1987, height: 208, align: "Face", rr: "Yes", retired: "Yes" },
  { name: "John Cena", era: "RA Era", brand: "Free Agent", debut: 2002, height: 185, align: "Face", rr: "Yes", retired: "No" },
  { name: "Brock Lesnar", era: "RA Era", brand: "Free Agent", debut: 2002, height: 191, align: "Tweener", rr: "Yes", retired: "No" },
  { name: "Rey Mysterio", era: "RA Era", brand: "Raw", debut: 1989, height: 168, align: "Face", rr: "Yes", retired: "No" },
  { name: "Randy Orton", era: "RA Era", brand: "SmackDown", debut: 2000, height: 193, align: "Face", rr: "Yes", retired: "No" },
  { name: "Edge", era: "RA Era", brand: "AEW", debut: 1992, height: 196, align: "Face", rr: "Yes", retired: "No" },
  { name: "Batista", era: "RA Era", brand: "Legend", debut: 1999, height: 198, align: "Face", rr: "Yes", retired: "Yes" },
  { name: "Roman Reigns", era: "Modern", brand: "SmackDown", debut: 2010, height: 191, align: "Heel", rr: "Yes", retired: "No" },
  { name: "Seth Rollins", era: "Modern", brand: "Raw", debut: 2005, height: 185, align: "Face", rr: "Yes", retired: "No" },
  { name: "Cody Rhodes", era: "Modern", brand: "SmackDown", debut: 2006, height: 188, align: "Face", rr: "Yes", retired: "No" },
  { name: "Gunther", era: "Modern", brand: "Raw", debut: 2007, height: 193, align: "Heel", rr: "No", retired: "No" },
  { name: "Kevin Owens", era: "Modern", brand: "SmackDown", debut: 2000, height: 183, align: "Face", rr: "No", retired: "No" },
  { name: "Sami Zayn", era: "Modern", brand: "Raw", debut: 2002, height: 185, align: "Face", rr: "No", retired: "No" },
  { name: "LA Knight", era: "Modern", brand: "SmackDown", debut: 2003, height: 185, align: "Face", rr: "No", retired: "No" },
  { name: "Logan Paul", era: "Modern", brand: "SmackDown", debut: 2021, height: 188, align: "Heel", rr: "No", retired: "No" },
  { name: "Hulk Hogan", era: "Golden", brand: "Legend", debut: 1977, height: 201, align: "Face", rr: "Yes", retired: "Yes" },
  { name: "Ric Flair", era: "Golden", brand: "Legend", debut: 1972, height: 185, align: "Heel", rr: "Yes", retired: "Yes" },
  { name: "Randy Savage", era: "Golden", brand: "Legend", debut: 1973, height: 188, align: "Face", rr: "No", retired: "Yes" },
  { name: "Ultimate Warrior", era: "Golden", brand: "Legend", debut: 1985, height: 188, align: "Face", rr: "No", retired: "Yes" },
  { name: "Andre the Giant", era: "Golden", brand: "Legend", debut: 1963, height: 224, align: "Face", rr: "No", retired: "Yes" },
  { name: "Bret Hart", era: "Golden", brand: "Legend", debut: 1978, height: 183, align: "Face", rr: "Yes", retired: "Yes" },
  { name: "Dusty Rhodes", era: "Golden", brand: "Legend", debut: 1967, height: 188, align: "Face", rr: "No", retired: "Yes" }
];

// 2. CONFIG BAN ĐẦU
const secretWrestler = wrestlers[Math.floor(Math.random() * wrestlers.length)];
let guessedWrestlers = [];
let guessCount = 0;

// 3. CẬP NHẬT AUTOCOMPLETE (Loại bỏ người đã đoán)
function updateDatalist() {
  const datalist = document.getElementById('wrestler-list');
  datalist.innerHTML = "";
  const available = wrestlers.filter(w => !guessedWrestlers.includes(w.name));
  available.sort((a, b) => a.name.localeCompare(b.name)).forEach(w => {
    let opt = document.createElement('option');
    opt.value = w.name;
    datalist.appendChild(opt);
  });
}

// 4. HÀM TẠO Ô KẾT QUẢ
function createBox(guessVal, secretVal, isNumber = false) {
  const box = document.createElement("div");
  box.className = "result-box";
  if (guessVal === secretVal) {
    box.classList.add("correct");
    box.innerHTML = `<span>${guessVal}</span>`;
  } else {
    box.classList.add("wrong");
    let arrow = "";
    if (isNumber) arrow = guessVal < secretVal ? " ↑" : " ↓";
    box.innerHTML = `<span>${guessVal}${arrow}</span>`;
  }
  return box;
}

// 5. HÀM KIỂM TRA CHÍNH
function checkGuess() {
  const input = document.getElementById("guessInput");
  const guessName = input.value.trim();
  const found = wrestlers.find(w => w.name.toLowerCase() === guessName.toLowerCase());

  if (!found) {
    alert("Không tìm thấy đô vật này!");
    input.value = "";
    return;
  }

  if (guessedWrestlers.includes(found.name)) {
    alert("Bạn đã đoán người này rồi!");
    input.value = "";
    return;
  }

  // Cập nhật số lần thử
  guessCount++;
  const countDisplay = document.getElementById("countDisplay");
  if (countDisplay) countDisplay.innerText = guessCount;

  guessedWrestlers.push(found.name);
  updateDatalist();

  const resultTable = document.getElementById("resultTable");
  const rowContainer = document.createElement("div"); 
  rowContainer.className = "row-container";

  // Thêm 8 cột dữ liệu
  rowContainer.appendChild(createBox(found.name, secretWrestler.name));
  rowContainer.appendChild(createBox(found.era, secretWrestler.era));
  rowContainer.appendChild(createBox(found.brand, secretWrestler.brand));
  rowContainer.appendChild(createBox(found.debut, secretWrestler.debut, true));
  
  const hBox = createBox(found.height, secretWrestler.height, true);
  hBox.querySelector('span').innerText += "cm";
  rowContainer.appendChild(hBox);

  rowContainer.appendChild(createBox(found.align, secretWrestler.align));
  rowContainer.appendChild(createBox(found.rr, secretWrestler.rr));
  rowContainer.appendChild(createBox(found.retired, secretWrestler.retired));

  // Hiệu ứng lật ô
  const boxes = rowContainer.querySelectorAll('.result-box');
  boxes.forEach(box => { box.style.visibility = 'hidden'; });
  resultTable.prepend(rowContainer);

  boxes.forEach((box, index) => {
    setTimeout(() => {
      box.style.visibility = 'visible';
      box.classList.add('flip-box');
    }, index * 200);
  });

  // LOGIC THẮNG (Sử dụng Modal)
  if (found.name === secretWrestler.name) {
    setTimeout(() => {
      const modal = document.getElementById("winModal");
      const msg = document.getElementById("winMessage");
      if (modal && msg) {
        modal.style.display = "block";
        msg.innerHTML = `
          <div style="font-size: 1.2rem; margin: 15px 0;">
            Bạn đã đoán đúng <strong>${secretWrestler.name}</strong><br>
            sau <strong>${guessCount}</strong> lần thử!
          </div>
        `;
      }
    }, boxes.length * 200 + 300);
  }

  input.value = "";
  input.focus();
}

// 6. KHỞI TẠO & LẮNG NGHE SỰ KIỆN
updateDatalist();

document.getElementById("guessInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkGuess();
  }
});