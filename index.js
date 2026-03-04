const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};

const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);

  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");

      displayLevelWord(data.data);
    });
};

const lodeWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((wordDetails) => displayWordDetails(wordDetails.data));
};

displayWordDetails = (word) => {
  console.log(word);

  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
      <div class="">
        <h3 class="text-4xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>    :${word.pronunciation})</h3>
        </div>
        <div class="">
          <h3 class="text-2xl font-bold">Meaning</h3>
          <p>${word.meaning}</p>
        </div>
        <div class="">
          <h3 class="text-2xl font-bold">Example</h3>
          <p>${word.sentence}</p>
        </div>
        <div class="">
          <h3 class="text-2xl font-semibold">সমার্থক শব্দ গুলো</h3>
          <div class="">${createElements(word.synonyms)}</div>
        </div>
  `;
  document.getElementById("word_modal").showModal();
};

// display level word
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="text-center col-span-full py-10 space-y-3">
        <img class="mx-auto" src="english-janala-resources/assets/alert-error.png" alt="">
        <p class="font-serif text-xl font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h3 class="font-bold text-5xl font-bangla">নেক্সট Lesson এ যান</h3>
      </div>
    `;
  }

  words.forEach((word) => {
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
    
     <div class="bg-white py-16 px-32 text-center rounded-xl shadow-xl space-y-6 hover:shadow-2xl h-full">
        <h2 class="font-bold text-2xl" >${word.word ? word.word : " word not found"}</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="font-bangla font-bold text-2xl">"${word.meaning ? word.meaning : "meanig not found"} / ${word.pronunciation ? word.pronunciation : "pronunciation not found"}"</div>
        <div class="flex justify-between items-center">
          <button onclick ="lodeWordDetail(${word.id})" class="bg-[#1A91FF10] hover:bg-[#1A91FF80] p-2 rounded-full"><i class="fa-solid fa-circle-info"></i></button>
          <button class="bg-[#1A91FF10] hover:bg-[#1A91FF80] p-2 rounded-full"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
    wordContainer.appendChild(wordDiv);
  });
  manageSpinner(false);
};

// level btns
const displayLesson = (lessons) => {
  const laverContainer = document.getElementById("level-container");
  laverContainer.innerHTML = "";

  for (let lesson of lessons) {
    // console.log(lesson);
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
    <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i>lesson-${lesson.level_no}
    </button>
    `;
    laverContainer.appendChild(btnDiv);
  }
};

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();

  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWord = data.data;
      const filterWord = allWord.filter(word => word.word.toLowerCase().includes(searchValue));
      displayLevelWord(filterWord);
    });
    
});
