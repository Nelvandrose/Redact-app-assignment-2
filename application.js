const message = document.getElementById("message");
const patterns = document.getElementById("patterns");
const redactedWords = document.getElementById("redacted-words");
const wordCount = document.getElementById("word-count");
const redactCount = document.getElementById("redact-count");
const refresh = document.getElementById("refresh");
const redactnowBtn = document.getElementById("redactnow-btn");
const patternError = document.getElementById("pattern-error");
const proceedBtn = document.getElementById("proceedBtn");
const instrModal = document.getElementById("instrModal");
// result//
let newResult = [];

// refresh input//
refresh?.addEventListener("click", refreshFun);
redactnowBtn?.addEventListener("click", redactWordFunc);
proceedBtn?.addEventListener("click", proceedBtnFunc);
// redact//
function redactWordFunc(e) {
  e.preventDefault();

  //   message storing//
  let messageWordData = message.value.toLowerCase();
  localStorage.setItem("messageWordData", messageWordData);

  //   redact value storing//
  let redactedWordsData = redactedWords.value.toLowerCase();
  localStorage.setItem("redactedWordsData", redactedWordsData);

  // pattern value//
  let patternsData = patterns.value;
  // pattern value stored in locastorage
  localStorage.setItem("patternsData", patternsData);
  patternsValidation(patternsData);

  setTimeout(() => {
    patternError.innerText = "";
  }, 1500);

//puntuaction//
  let result = messageWordData.replace(/,/g, "").replace(/\./g, "");

  //   process to array//
  let messageData = result
    .trim()
    .split(" ")
    .filter((item) => item);

  /* Action arena */
  messageData.map((data) => {
    if (data === "" || redactedWordsData === "") {
      return;
    }
    redactFunc(data, redactedWordsData, patternsData);
  });

  // wordCount storage//
  let messageCount = messageData.length;
  localStorage.setItem("messageCount", messageCount);

  /*End */

  /*Redacted Word */
  let redactResult = redactedWordsData.replace(/,/g, "").replace(/\./g, "");

  let redactData = redactResult
    .trim()
    .split(" ")
    .filter((item) => item);

  // Redacted Count storage//
  let redactedCount = redactData.length;
  localStorage.setItem("redactedCount", redactedCount);
  /* End */
}

// Redact word function//
function redactFunc(data, redactedWordsData, patternsData) {
	if (patternsData === "none") {
		return;
	}

	let redactResult = redactedWordsData
		.replace(/,/g, "")
		.replace(/\./g, "")
		.toLowerCase();

	let redactData = redactResult
		.trim()
		.split(" ")
		.filter((item) => item);

	for (i = 0; i < redactData.length; i++) {
		if (data == redactData[i]) {
			data = patternsData;
		}
	}


	newResult.push(data);
	// array to string//
	let newData = newResult.join(" ");

	// storage//
	localStorage.setItem("redactResult", newData);

	// Spinner loader//
	loaderFunc();
	// re-route//
	window.location.assign("result.html");
}

function loaderFunc() {
  redactnowBtn.innerHTML = "<div class=loader></div>";
}

// validation of patterns//
function patternsValidation(patternsData) {
  if (patternsData === "none") {
    patternError.innerText = "Choose a pattern";
    return;
  }
}

function displayAllDataForMessageCountRedactWord() {
  messageWordDataValue = localStorage.getItem("messageWordData");
  redactedWordsDataValue = localStorage.getItem("redactedWordsData");
  messageCountValue = localStorage.getItem("messageCount");
  redactedCountValue = localStorage.getItem("redactedCount");
  message.value = messageWordDataValue;
  redactedWords.value = redactedWordsDataValue;
  wordCount.innerText = messageCountValue;
  redactCount.innerText = redactedCountValue;
}
displayAllDataForMessageCountRedactWord();

// Refresh for input//
function refreshFun(e) {
  e.preventDefault();
  message.value = "";
  redactedWords.value = "";
  patterns.value = "none";
  localStorage.setItem("messageCount", 0);
  localStorage.setItem("redactedCount", 0);
  localStorage.setItem("patternsData", 0);
  localStorage.removeItem("messageWordData");
  localStorage.removeItem("redactedWordsData");
  localStorage.removeItem("redactResult");
  window.location.reload();
}
	//live count msg//
	function liveCount() {
		const messagePure = message.value;
		const splitMessage = messagePure.split(" ").filter((item) => item);
		wordCount.innerText = splitMessage.length;

    const redactPure = redactedWords.value;
		const splitRedact = redactPure.split(" ").filter((item) => item);
		redactCount.innerText = splitRedact.length;
	}

  //live count listener//
	message.addEventListener("keyup", liveCount);
	redactedWords.addEventListener("keyup", liveCount);