const sections = [
  {
    key: "motivation",
    title: "創業の動機",
    labels: ["事業概要", "きっかけ", "検討時期・働き方", "今始める理由"],
    questions: [
      "まずは、どんな事業の創業計画書を作りたいか教えてください。まだ言語化が曖昧でも大丈夫です。",
      "なぜこの事業を始めたいと思いましたか？きっかけや問題意識を教えてください。",
      "いつ頃から考えていましたか？また、会社員継続か独立専業かも分かる範囲で教えてください。",
      "なぜ今始める必要があるのか、今のタイミングの理由を教えてください。未定なら未定で大丈夫です。"
    ]
  },
  {
    key: "career",
    title: "経営者の経歴",
    labels: ["職歴", "活かせる経験", "資格・実績"],
    questions: [
      "これまでの職歴や実務経験を教えてください。年数や担当業務があると強くなります。",
      "今回の事業に直接活かせる経験、知識、営業経験、運営経験はありますか？",
      "資格、許認可、副業経験、販売実績などがあれば教えてください。なければ『なし』で大丈夫です。"
    ]
  },
  {
    key: "service",
    title: "取扱商品・サービス",
    labels: ["内容", "単価・売上構造", "強み", "販売方法"],
    questions: [
      "主な商品・サービスを教えてください。何を、誰に、どのように提供しますか？",
      "単価帯、継続課金か単発売上か、売上の中心になりそうな商品を教えてください。",
      "他社との違いや、お客様にとってのメリットを教えてください。",
      "販売方法を教えてください。対面、オンライン、紹介、SNSなど、分かる範囲で大丈夫です。"
    ]
  },
  {
    key: "target",
    title: "取引先・ターゲット顧客",
    labels: ["想定顧客", "見込み客・取引先", "集客方法"],
    questions: [
      "想定顧客は誰ですか？個人向けか法人向けか、年齢層、属性、地域などを教えてください。",
      "既に見込み客、相談相手、取引先候補はいますか？未定でも構いません。",
      "集客方法や、最初のお客様をどう獲得するかを教えてください。"
    ]
  },
  {
    key: "borrowing",
    title: "借入の状況",
    labels: ["借入の有無", "残高・返済額"],
    questions: [
      "現在の借入はありますか？住宅ローン、車ローン、カードローン、事業用借入など、おおよそで大丈夫です。",
      "返済額や残高が大きいものがあれば教えてください。分からない場合は『要確認』で進めます。"
    ]
  },
  {
    key: "funding",
    title: "必要資金と調達方法",
    labels: ["設備資金", "運転資金", "調達方法", "根拠"],
    questions: [
      "設備資金は何にいくら必要ですか？店舗、機械、車両、備品など、万円単位で教えてください。",
      "運転資金は何にいくら必要ですか？仕入、人件費、家賃、広告費などを教えてください。",
      "自己資金、家族からの支援、日本政策金融公庫への希望借入額、他金融機関からの借入予定を教えてください。",
      "見積書や金額の根拠はありますか？なければ『これから確認』で大丈夫です。"
    ]
  },
  {
    key: "forecast",
    title: "事業の見通し",
    labels: ["1年目売上", "1年目経費", "2年目・3年目", "不安・相談"],
    questions: [
      "1年目の売上は、どのように立てますか？客単価、件数、稼働日数などで教えてください。",
      "1年目の原価や経費を教えてください。家賃、人件費、仕入、広告費など、おおよそで大丈夫です。",
      "2年目、3年目は何が伸びる想定ですか？売上や利益の見通しを教えてください。",
      "この見通しで不安な点や、相談したい点があれば教えてください。"
    ]
  }
];

const improvePrompts = {
  motivation: { index: 3, text: "創業動機を強くするために追加で確認します。なぜ『今』始めるべきなのか、経験・市場・顧客ニーズのどれかと結びつけて補足できますか？" },
  career: { index: 1, text: "経歴との一貫性を強くするために、事業に活かせる経験を年数・担当業務・実績の形で補足できますか？" },
  service: { index: 2, text: "商品・サービスの説得力を上げるために、競合との違いや顧客メリットをもう少し具体的に教えてください。" },
  target: { index: 0, text: "ターゲットを明確にするために、顧客の属性、地域、年齢層、法人/個人、最初に狙う層を補足できますか？" },
  borrowing: { index: 1, text: "借入状況を確認します。残高や月返済額で大きいものがあれば、おおよそで教えてください。なければ『なし』で大丈夫です。" },
  funding: { index: 3, text: "資金計画を強くするために、金額の根拠を補足してください。見積書、相場、内訳、確認予定でも大丈夫です。" },
  forecast: { index: 0, text: "売上計画を強くするために、客単価、件数、稼働日数、受注数などの計算式に近い形で補足できますか？" }
};

const chatLog = document.querySelector("#chatLog");
const replyForm = document.querySelector("#replyForm");
const replyInput = document.querySelector("#replyInput");
const skipButton = document.querySelector("#skipButton");
const backButton = document.querySelector("#backButton");
const sectionList = document.querySelector("#sectionList");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");
const questionText = document.querySelector("#questionText");
const headerMascot = document.querySelector(".mascot");
const summaryPreview = document.querySelector("#summaryPreview");
const finalActions = document.querySelector("#finalActions");
const finalActionText = document.querySelector("#finalActionText");
const returnChatButton = document.querySelector("#returnChatButton");
const createDraftButton = document.querySelector("#createDraftButton");
const draftSection = document.querySelector("#draftSection");
const draftOutput = document.querySelector("#draftOutput");
const reviewSection = document.querySelector("#reviewSection");
const reviewOutput = document.querySelector("#reviewOutput");
const printButton = document.querySelector("#printButton");
const sampleButton = document.querySelector("#sampleButton");
const clearButton = document.querySelector("#clearButton");
const restoreButton = document.querySelector("#restoreButton");
const saveState = document.querySelector("#saveState");
const miniScore = document.querySelector("#miniScore");
const completionToast = document.querySelector("#completionToast");
const completionTitle = document.querySelector("#completionTitle");
const completionText = document.querySelector("#completionText");

const STORAGE_KEY = "startup-plan-chat-v2";
const BACKUP_KEY = "startup-plan-chat-backup-v1";
document.title = "創業計画書作成アシスタント";
let state = freshState();
let saveTimer = null;
let completionTimer = null;

function freshState() {
  return {
    sectionIndex: 0,
    questionIndex: 0,
    answers: Object.fromEntries(sections.map((section) => [section.key, Array(section.questions.length).fill("")])),
    messages: [],
    history: [],
    draftCreated: false,
    improving: false,
    improveQueue: [],
    improveIndex: 0,
    improvedKeys: []
  };
}

function currentSection() {
  return sections[state.sectionIndex];
}

function currentQuestion() {
  return currentSection()?.questions[state.questionIndex] || "";
}

function addAssistant(text) {
  state.messages.push({ role: "assistant", text });
}

function addUser(text) {
  state.messages.push({ role: "user", text });
}

function submitAnswer(rawAnswer) {
  const answer = rawAnswer.trim() || "未定";
  if (state.improving) {
    submitImprovement(answer);
    return;
  }
  if (isDone()) return;

  state.history.push({ sectionIndex: state.sectionIndex, questionIndex: state.questionIndex, messagesLength: state.messages.length });
  addUser(answer);
  const section = currentSection();
  state.answers[section.key][state.questionIndex] = answer;

  if (shouldDeepen(answer)) {
    addAssistant("ありがとうございます。今の内容は少し短めなので、後で数字・年数・具体的な顧客像を足すと説得力が増します。未定のままでも次へ進めます。");
  }

  state.questionIndex += 1;
  if (state.questionIndex >= section.questions.length) {
    addAssistant(`「${section.title}」はここまで整理できました。次の項目に進みます。`);
    showCompletion(section.title);
    state.sectionIndex += 1;
    state.questionIndex = 0;
  }

  if (isDone()) {
    addAssistant("7項目の聞き取りが完了しました。右側の整理内容を確認してください。");
  } else {
    addAssistant(currentQuestion());
  }

  replyInput.value = "";
  state.draftCreated = false;
  draftSection.hidden = true;
  reviewSection.hidden = true;
  save();
  render();
}

function submitImprovement(answerText) {
  const item = state.improveQueue[state.improveIndex];
  if (!item) return;
  const answerIndex = item.index ?? improvePrompts[item.key].index;
  addUser(answerText);
  setImprovedAnswer(item.key, answerIndex, answerText);
  if (!state.improvedKeys.includes(item.key)) state.improvedKeys.push(item.key);
  addAssistant(`反映しました。「${sectionByKey(item.key).title}」の内容を補強しました。`);

  state.improveIndex += 1;
  const next = state.improveQueue[state.improveIndex];
  if (next) {
    addAssistant(getImprovementPrompt(next));
    fillImprovementInput(next);
  } else {
    state.improving = false;
    state.draftCreated = false;
    addAssistant("追加聞き取りが完了しました。右側の整理内容を確認し、下書きを再作成してください。");
  }
  replyInput.value = "";
  if (next) fillImprovementInput(next);
  save();
  render();
}

function setImprovedAnswer(sectionKey, index, text) {
  state.answers[sectionKey][index] = text.trim();
}

function fillImprovementInput(item) {
  const answerIndex = item.index ?? improvePrompts[item.key].index;
  replyInput.value = state.answers[item.key][answerIndex] || "";
  window.setTimeout(() => {
    replyInput.focus();
    replyInput.selectionStart = replyInput.value.length;
    replyInput.selectionEnd = replyInput.value.length;
  }, 0);
}

function startImprovement() {
  const score = scorePlan();
  state.improveQueue = buildImprovementQueue(score);
  if (!state.improveQueue.length) {
    addAssistant("前回までに主要な弱点は一通り補強済みです。さらに改善する場合は、右側の整理内容を直接見直すか、下書きを再作成して点数の低い項目を確認してください。");
    save();
    render();
    return;
  }
  state.improving = true;
  state.improveIndex = 0;
  state.draftCreated = false;
  draftSection.hidden = true;
  reviewSection.hidden = true;
  const hasUnknown = state.improveQueue.some((item) => item.reasonType === "unknown");
  addAssistant(hasUnknown
    ? "まずは「未定」「分からない」「要確認」になっている箇所から追加で確認します。入力欄には現在の回答を入れておくので、分かる範囲で編集・追記してください。"
    : "90点以上に近づけるため、弱い項目から追加で確認します。入力欄には現在の回答を入れておくので、必要な部分を編集・追記してください。");
  addAssistant(getImprovementPrompt(state.improveQueue[0]));
  fillImprovementInput(state.improveQueue[0]);
  save();
  render();
}

function buildImprovementQueue(score) {
  const unknownItems = sections
    .map((section) => {
      const index = findUnknownAnswerIndex(section.key);
      if (index < 0) return null;
      const scoredItem = score.items.find((item) => item.key === section.key);
      return {
        ...scoredItem,
        key: section.key,
        index,
        label: section.labels[index],
        reasonType: "unknown"
      };
    })
    .filter(Boolean);

  const freshWeakItems = score.items
    .filter((item) => item.point < item.max && !state.improvedKeys.includes(item.key) && findUnknownAnswerIndex(item.key) < 0)
    .sort((a, b) => (a.point / a.max) - (b.point / b.max));

  const queue = [...unknownItems, ...freshWeakItems].slice(0, 3);
  if (queue.length) return queue;

  return score.items
    .filter((item) => item.point < item.max)
    .sort((a, b) => (a.point / a.max) - (b.point / b.max))
    .slice(0, 3);
}

function findUnknownAnswerIndex(sectionKey) {
  return state.answers[sectionKey].findIndex((text) => isUnknownAnswer(sectionKey, text));
}

function getImprovementPrompt(item) {
  if (item.reasonType === "unknown") {
    const section = sectionByKey(item.key);
    const originalQuestion = section.questions[item.index];
    return `「${section.title} - ${item.label}」が未定になっています。\n\n${originalQuestion}\n\nまだ未定なら、今の候補・不安・これから確認することだけでも大丈夫です。`;
  }
  return improvePrompts[item.key].text;
}

function goBack() {
  if (state.improving) {
    state.improving = false;
    state.improveQueue = [];
    state.improveIndex = 0;
    addAssistant("改善ヒアリングを中断しました。整理内容は右側で直接修正できます。");
    save();
    render();
    return;
  }
  const previous = state.history.pop();
  if (!previous) return;
  state.sectionIndex = previous.sectionIndex;
  state.questionIndex = previous.questionIndex;
  const section = currentSection();
  const previousAnswer = state.answers[section.key][state.questionIndex] || "";
  state.messages = state.messages.slice(0, previous.messagesLength);
  state.draftCreated = false;
  draftSection.hidden = true;
  reviewSection.hidden = true;
  replyInput.value = previousAnswer;
  addAssistant(`戻りました。前回の回答を入力欄に戻しています。修正して回答してください。\n\n${currentQuestion()}`);
  save();
  render();
  replyInput.value = previousAnswer;
  replyInput.focus();
}

function returnToInterview() {
  const target = findLastAnsweredPosition();
  state.sectionIndex = target.sectionIndex;
  state.questionIndex = target.questionIndex;
  state.draftCreated = false;
  state.improving = false;
  draftSection.hidden = true;
  reviewSection.hidden = true;
  addAssistant(`問答に戻りました。修正したい回答は右側の整理欄でも直接直せます。\n\n${currentQuestion()}`);
  save();
  render();
}

function findLastAnsweredPosition() {
  for (let sectionIndex = sections.length - 1; sectionIndex >= 0; sectionIndex -= 1) {
    const section = sections[sectionIndex];
    for (let questionIndex = section.questions.length - 1; questionIndex >= 0; questionIndex -= 1) {
      if (state.answers[section.key][questionIndex]) return { sectionIndex, questionIndex };
    }
  }
  return { sectionIndex: 0, questionIndex: 0 };
}

function shouldDeepen(answer) {
  const normalized = answer.replace(/\s/g, "");
  return normalized.length > 0 && normalized.length < 12 && !["未定", "なし", "分からない", "わからない", "要確認"].includes(normalized);
}

function isDone() {
  return state.sectionIndex >= sections.length;
}

function render() {
  renderSections();
  renderChat();
  renderSummary();
  renderProgress();
  updateMascot();
  updateRestoreButton();
  finalActions.hidden = !isDone() || state.improving;
  updateDraftActionText(false);
  replyForm.hidden = isDone() && !state.improving;
}

function updateDraftActionText(isRevision) {
  if (isRevision) {
    finalActionText.textContent = "整理内容を修正しました。修正後の内容で、創業計画書の下書きを再作成しますか？";
    createDraftButton.textContent = "下書きを再作成する";
    createDraftButton.hidden = false;
    returnChatButton.hidden = false;
    return;
  }
  if (state.draftCreated) {
    finalActionText.textContent = "下書きを作成しました。問答に戻って回答を修正することもできます。";
    createDraftButton.hidden = true;
    returnChatButton.hidden = false;
    return;
  }
  finalActionText.textContent = "聞き取りが完了しました。ここまでの内容で、日本政策金融公庫フォーマットに沿った創業計画書の下書きを作成してよいですか？";
  createDraftButton.textContent = "下書きを作成する";
  createDraftButton.hidden = false;
  returnChatButton.hidden = true;
}

function renderSections() {
  sectionList.innerHTML = sections.map((section, index) => {
    const answered = state.answers[section.key].filter(Boolean).length;
    const total = section.questions.length;
    const className = index < state.sectionIndex ? "done" : index === state.sectionIndex ? "active" : "";
    return `<li class="${className}"><span>${index + 1}</span><div><strong>${section.title}</strong><small>${answered}/${total}</small></div></li>`;
  }).join("");
}

function renderChat() {
  const latestAssistantIndex = findLatestAssistantMessageIndex();
  const mascotSrc = getMascotImage();
  chatLog.innerHTML = state.messages.map((message, index) => {
    const activeClass = index === latestAssistantIndex && !isDoneOrDraftOnly() ? " active-question" : "";
    const avatar = message.role === "assistant" ? `<img class="chat-avatar" src="${mascotSrc}" alt="">` : "";
    return `<div class="message-row ${message.role}">${avatar}<div class="message ${message.role}${activeClass}"><p>${escapeHtml(message.text)}</p></div></div>`;
  }).join("");
  chatLog.scrollTop = chatLog.scrollHeight;
}

function findLatestAssistantMessageIndex() {
  for (let index = state.messages.length - 1; index >= 0; index -= 1) {
    if (state.messages[index].role === "assistant") return index;
  }
  return -1;
}

function isDoneOrDraftOnly() {
  return isDone() && !state.improving;
}

function renderSummary() {
  summaryPreview.innerHTML = sections.map((section) => {
    const rows = section.labels.map((label, index) => {
      const answerText = state.answers[section.key][index] || "";
      const active = isActiveAnswer(section.key, index) ? " class=\"active-answer\"" : "";
      return `<tr${active}><th>${escapeHtml(label)}</th><td><textarea class="summary-edit" data-section="${section.key}" data-answer-index="${index}" rows="2">${escapeHtml(answerText)}</textarea></td></tr>`;
    }).join("");
    const activeDetail = isActiveSection(section.key) ? " active-section" : "";
    return `<details class="${activeDetail}" open><summary>${escapeHtml(section.title)}</summary><table><tbody>${rows}</tbody></table></details>`;
  }).join("");
}

function isActiveSection(sectionKey) {
  if (state.improving) {
    const item = state.improveQueue[state.improveIndex];
    return item?.key === sectionKey;
  }
  return !isDone() && currentSection()?.key === sectionKey;
}

function isActiveAnswer(sectionKey, answerIndex) {
  if (state.improving) {
    const item = state.improveQueue[state.improveIndex];
    const targetIndex = item ? (item.index ?? improvePrompts[item.key].index) : null;
    return item?.key === sectionKey && targetIndex === answerIndex;
  }
  return !isDone() && currentSection()?.key === sectionKey && state.questionIndex === answerIndex;
}

function renderProgress() {
  const { total, answered } = getProgressStats();
  const remaining = Math.max(0, total - answered);
  progressBar.style.width = `${Math.max(4, (answered / total) * 100)}%`;
  progressText.textContent = `${answered} / ${total} 完了・残り${remaining}問`;
  questionText.textContent = getProgressLabel();
}

function getProgressStats() {
  const total = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answered = sections.reduce((sum, section) => sum + state.answers[section.key].filter(Boolean).length, 0);
  return { total, answered };
}

function getMascotImage() {
  const { total, answered } = getProgressStats();
  const ratio = total ? answered / total : 0;
  if (ratio >= 0.8 || state.draftCreated) return "assets/tofu-helper-encourage-3.png";
  if (ratio >= 0.45) return "assets/tofu-helper-encourage-2.png";
  if (ratio > 0) return "assets/tofu-helper-encourage-1.png";
  return "assets/tofu-helper.png";
}

function updateMascot() {
  if (!headerMascot) return;
  headerMascot.src = getMascotImage();
}

function showCompletion(sectionTitle) {
  if (!completionToast) return;
  const doneCount = Math.min(state.sectionIndex + 1, sections.length);
  completionTitle.textContent = `${sectionTitle} 完了`;
  completionText.textContent = `${doneCount} / ${sections.length}項目クリア。いい調子です。`;
  completionToast.hidden = false;
  completionToast.classList.remove("show");
  window.clearTimeout(completionTimer);
  window.requestAnimationFrame(() => completionToast.classList.add("show"));
  completionTimer = window.setTimeout(() => {
    completionToast.classList.remove("show");
    window.setTimeout(() => {
      completionToast.hidden = true;
    }, 220);
  }, 2400);
}

function getProgressLabel() {
  if (state.improving) {
    return `改善ヒアリング ${Math.min(state.improveIndex + 1, state.improveQueue.length)} / ${state.improveQueue.length}`;
  }
  if (isDone()) {
    return state.draftCreated ? "下書き作成済み" : "聞き取り完了";
  }
  return `${currentSection().title} ${state.questionIndex + 1} / ${currentSection().questions.length}`;
}

function createDraft() {
  state.draftCreated = true;
  state.improving = false;
  const score = scorePlan();
  document.querySelector("#docDate").textContent = `${new Date().toLocaleDateString("ja-JP")} 作成`;
  document.querySelector("#docName").textContent = "";
  draftOutput.innerHTML = buildDraftHtml();
  reviewOutput.innerHTML = buildReviewHtml(score);
  miniScore.textContent = `厳しめ採点: ${score.total}点 / 100点`;
  draftSection.hidden = false;
  reviewSection.hidden = false;
  finalActions.hidden = false;
  save();
  render();
}

function answer(sectionKey, index, fallback = "要確認") {
  return state.answers[sectionKey]?.[index] || fallback;
}

function buildDraftHtml() {
  return [
    draftBlock("1. 創業の動機", [
      `本事業は、${answer("motivation", 0)}です。`,
      `創業のきっかけは、${answer("motivation", 1)}です。`,
      `検討時期・働き方については、${answer("motivation", 2)}です。`,
      `今創業する理由は、${answer("motivation", 3)}です。`
    ]),
    draftBlock("2. 経営者の略歴等", [
      `これまでの職歴・実務経験は、${answer("career", 0)}です。`,
      `事業に活かせる経験・知識は、${answer("career", 1)}です。`,
      `資格・許認可・販売実績等は、${answer("career", 2)}です。`
    ]),
    draftBlock("3. 取扱商品・サービス", [
      `主な商品・サービスは、${answer("service", 0)}です。`,
      `単価帯・売上構造は、${answer("service", 1)}です。`,
      `強み・顧客メリットは、${answer("service", 2)}です。`,
      `販売方法は、${answer("service", 3)}です。`
    ]),
    draftBlock("4. 取引先・ターゲット顧客", [
      `想定顧客は、${answer("target", 0)}です。`,
      `見込み客・取引先候補は、${answer("target", 1)}です。`,
      `集客方法は、${answer("target", 2)}です。`
    ]),
    draftBlock("5. 借入の状況", [
      `現在の借入状況は、${answer("borrowing", 0)}です。`,
      `残高・返済額については、${answer("borrowing", 1)}です。`
    ]),
    draftBlock("6. 必要な資金と調達方法", [
      `設備資金は、${answer("funding", 0)}です。`,
      `運転資金は、${answer("funding", 1)}です。`,
      `調達方法は、${answer("funding", 2)}です。`,
      `見積もり・根拠は、${answer("funding", 3)}です。`
    ]),
    draftBlock("7. 事業の見通し", [
      `1年目の売上計画は、${answer("forecast", 0)}です。`,
      `1年目の原価・経費は、${answer("forecast", 1)}です。`,
      `2年目・3年目の見通しは、${answer("forecast", 2)}です。`,
      `不安点・相談事項は、${answer("forecast", 3)}です。`
    ])
  ].join("");
}

function draftBlock(title, lines) {
  return `<section><h3>${escapeHtml(title)}</h3>${lines.map((line) => `<p>${escapeHtml(cleanLine(line))}</p>`).join("")}</section>`;
}

function cleanLine(line) {
  return line.replace(/です。です。/g, "です。").replace(/。。/g, "。");
}

function buildReviewHtml(score) {
  const weakItems = score.items.filter((item) => item.point < item.max).map((item) => `<li>${escapeHtml(item.name)}: ${escapeHtml(item.reason)}</li>`).join("");
  const confirmItems = collectConfirmItems().map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>大きな未確認項目はありません。ただし金額根拠は資料で確認してください。</li>";
  const improveButton = score.total <= 90 ? `<div class="improve-box"><p><strong>この計画を90点以上に近づけるために、弱い項目から追加で聞き取りして改善できます。</strong></p><button class="primary-button" type="button" id="startImproveButton">追加質問でブラッシュアップする</button></div>` : "";
  const rank = getRank(score.total);
  return `
    <h4>記入時に要確認の項目</h4>
    <ul>${confirmItems}</ul>
    <h4>厳しめの採点</h4>
    <div class="rank-card ${rank.className}">
      <img class="rank-mascot" src="assets/tofu-helper-key.png" alt="">
      <div>
        <p class="rank-label">現在の称号</p>
        <p class="rank-title">${rank.title}</p>
        <p class="score-large">${score.total}点 / 100点</p>
        <p>${rank.message}</p>
        <p class="rank-cheer">${rank.cheer}</p>
      </div>
    </div>
    <p class="score-note">目安: 40点未満は材料不足、60点以上で下書きとして形になり始め、80点以上でかなり良好、90点以上は根拠資料までそろった提出前レベルです。</p>
    <h4>項目別の点数根拠</h4>
    ${buildScoreTable(score)}
    <h4>点数の理由</h4>
    <ul>${weakItems || "<li>各項目に一定の具体性があります。</li>"}</ul>
    <h4>改善すると加点できるポイント</h4>
    <ul>
      <li>売上根拠を「客単価 × 件数 × 稼働日数」の形で示す。</li>
      <li>資金計画に見積書、相場、内訳を添える。</li>
      <li>ターゲット顧客を年齢、地域、属性、獲得経路まで具体化する。</li>
      <li>経歴と事業内容のつながりを、年数や実績で補強する。</li>
    </ul>
    ${improveButton}
  `;
}

function buildScoreTable(score) {
  const rows = score.items.map((item) => {
    const percent = item.max ? Math.round((item.point / item.max) * 100) : 0;
    return `
      <tr>
        <th>${escapeHtml(item.name)}</th>
        <td>${item.point} / ${item.max}点</td>
        <td>
          <div class="score-meter"><span style="width: ${percent}%"></span></div>
          <small>${escapeHtml(item.reason)}</small>
        </td>
      </tr>
    `;
  }).join("");
  return `<table class="score-table"><tbody>${rows}</tbody></table>`;
}

function getRank(score) {
  const ranks = [
    { threshold: 90, title: "プラチナ事業主", className: "rank-platinum" },
    { threshold: 60, title: "ゴールド事業主", className: "rank-gold" },
    { threshold: 40, title: "シルバー事業主", className: "rank-silver" },
    { threshold: 20, title: "ブロンズ事業主", className: "rank-bronze" },
    { threshold: 0, title: "見習い事業主", className: "rank-starter" }
  ];
  const current = ranks.find((rank) => score >= rank.threshold);
  const next = [...ranks].reverse().find((rank) => rank.threshold > score);
  const message = next
    ? `次の称号「${next.title}」まであと${next.threshold - score}点です。`
    : "最高称号です。あとは根拠資料と表現の磨き込みで、より提出向けに近づけられます。";
  const cheer = score >= 90
    ? "すごいです。あとは資料の裏取りで、かなり頼れる計画になりそうです。"
    : score >= 60
      ? "いい土台です。数字の根拠を足すと、ぐっと強くなります。"
      : score >= 20
        ? "ここから育てていけます。まずは未定を一つずつ具体化しましょう。"
        : "まだ材料集めの段階です。未定でも大丈夫、順番に埋めていきましょう。";
  return { ...current, message, cheer };
}

function scorePlan() {
  const rules = [
    ["創業動機の納得感", "motivation", 20],
    ["経歴との一貫性", "career", 15],
    ["商品・サービスの具体性", "service", 15],
    ["ターゲット設定の明確さ", "target", 15],
    ["資金計画の妥当性", "funding", 15],
    ["売上計画の現実性", "forecast", 15],
    ["借入状況の確認", "borrowing", 5]
  ];
  const items = rules.map(([name, key, max]) => {
    const text = state.answers[key].join(" ");
    if (key === "borrowing" && isNoBorrowing(text)) {
      return { name, key, max, point: max, reason: "借入がないことを確認できています。" };
    }
    const meaningfulText = getMeaningfulText(key, text);
    if (!meaningfulText) {
      return { name, key, max, point: 0, reason: "具体的な情報が未入力です。" };
    }
    const unknownRatio = countUnknownAnswers(key) / state.answers[key].length;
    const unknownPenalty = Math.max(0.15, 1 - unknownRatio);
    const lengthScore = Math.min(1, meaningfulText.length / 90);
    const numberBonus = /\d|[0-9０-９]|年|月|円|万円|件|名|社|日/.test(text) ? 1 : 0.86;
    const evidencePenalty = getEvidencePenalty(key, text);
    const ratio = Math.min(1, lengthScore * unknownPenalty * numberBonus * evidencePenalty);
    const point = Math.round(max * ratio);
    const reason = point >= max ? "具体性と根拠が比較的そろっています。" : "具体的な数字、根拠、対象顧客、実績の補足余地があります。";
    return { name, key, max, point, reason };
  });
  return { total: items.reduce((sum, item) => sum + item.point, 0), items };
}

function getEvidencePenalty(sectionKey, text) {
  let penalty = 1;
  if (/予定|見込み|想定|確認中|取得予定|相談予定|これから|おおよそ|約|未取得/.test(text)) {
    penalty -= 0.12;
  }
  if (sectionKey === "funding" && /見積取得予定|確認中|これから確認|予定/.test(text)) {
    penalty -= 0.12;
  }
  if (sectionKey === "forecast" && !/×|x|掛ける|客単価.*(件|名|日)|件数|稼働日数|営業日数/.test(text)) {
    penalty -= 0.10;
  }
  if (sectionKey === "target" && !/既に|見込み客|候補|相談|契約|取引先|紹介/.test(text)) {
    penalty -= 0.08;
  }
  return Math.max(0.68, penalty);
}

function isNoBorrowing(text) {
  const value = String(text || "").replace(/\s/g, "");
  return /なし|無し|ない|ありません|残高なし|借入なし/.test(value) && !/未定|分からない|わからない|要確認/.test(value);
}

function countUnknownAnswers(sectionKey) {
  return state.answers[sectionKey].filter((text) => isUnknownAnswer(sectionKey, text)).length;
}

function isUnknownAnswer(sectionKey, text) {
  const value = String(text || "").trim();
  if (!value) return true;
  if (/未定|分からない|わからない|要確認/u.test(value)) return true;
  return sectionKey !== "borrowing" && /^(なし|特になし)$/u.test(value);
}

function getMeaningfulText(sectionKey, text) {
  const value = String(text || "").replace(/未定|分からない|わからない|要確認|\s/g, "");
  if (sectionKey === "borrowing") return value;
  return value.replace(/なし|特になし/g, "");
}

function collectConfirmItems() {
  const items = [];
  sections.forEach((section) => {
    state.answers[section.key].forEach((text, index) => {
      if (!text || /未定|分からない|わからない|要確認/.test(text)) {
        items.push(`${section.title} - ${section.labels[index]}`);
      }
    });
  });
  return items;
}

function sectionByKey(key) {
  return sections.find((section) => section.key === key);
}

function save() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  saveState.textContent = "保存済み";
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    saveState.textContent = "入力すると自動保存";
  }, 1200);
}

function backupCurrentState(reason) {
  if (!hasUserContent()) return;
  window.localStorage.setItem(BACKUP_KEY, JSON.stringify({
    savedAt: new Date().toISOString(),
    reason,
    state
  }));
}

function hasUserContent() {
  return state.messages.length > 1 || sections.some((section) => state.answers[section.key].some(Boolean));
}

function loadBackup() {
  const stored = window.localStorage.getItem(BACKUP_KEY);
  if (!stored) return null;
  try {
    const backup = JSON.parse(stored);
    if (!backup?.state) return null;
    return backup;
  } catch {
    return null;
  }
}

function updateRestoreButton() {
  if (!restoreButton) return;
  const backup = loadBackup();
  restoreButton.hidden = !backup;
  restoreButton.title = backup ? `保存日時: ${new Date(backup.savedAt).toLocaleString("ja-JP")}` : "";
}

function restoreBackup() {
  const backup = loadBackup();
  if (!backup) return;
  if (!window.confirm("サンプル/初期化の前の入力内容を復元しますか？現在の入力内容は上書きされます。")) return;
  state = backup.state;
  state.history ||= [];
  state.improveQueue ||= [];
  state.improveIndex ||= 0;
  state.improving ||= false;
  state.improvedKeys ||= [];
  cleanupUnknownPrefixes();
  save();
  render();
  addAssistant("直前の入力内容を復元しました。続きを編集できます。");
  save();
  render();
}

function load() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return;
  try {
    state = JSON.parse(stored);
    state.history ||= [];
    state.improveQueue ||= [];
    state.improveIndex ||= 0;
    state.improving ||= false;
    state.improvedKeys ||= [];
    cleanupUnknownPrefixes();
  } catch {
    state = freshState();
  }
}

function cleanupUnknownPrefixes() {
  Object.keys(state.answers).forEach((sectionKey) => {
    state.answers[sectionKey] = state.answers[sectionKey].map((text) => {
      const value = String(text || "");
      return value.replace(/^(未定|分からない|わからない|要確認)\s*\n追加補足:\s*/u, "");
    });
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
}

const sampleAnswers = {
  motivation: ["駅前の小規模店舗で、朝食と自家焙煎コーヒーを提供する地域密着型カフェ", "前職で接客と店舗運営を経験する中で、地域に朝から利用できる個人店が少ないと感じたこと", "2025年頃から検討。創業後は独立専業で運営する予定", "駅前の再開発で人通りが増えており、物件を確保できる見込みが出たため"],
  career: ["飲食チェーンで8年間勤務し、店舗運営、発注、スタッフ教育、売上管理を担当", "店長としてリピート顧客づくり、原価管理、シフト管理を経験している", "食品衛生責任者を取得予定。コーヒー豆の仕入先候補と相談を開始している"],
  service: ["モーニング、ランチ、ドリンク、コーヒー豆販売を提供する", "客単価は店内利用1,100円、ドリンク600円、豆販売1,200円を想定。単発売上が中心", "自家焙煎の品質、駅前立地、落ち着いた接客、朝食需要への対応が強み", "店頭販売を中心に、Googleマップ、SNS、近隣企業へのチラシで集客する"],
  target: ["駅周辺で働く会社員、近隣住民、休日の来街者。30代から50代を中心に想定", "近隣企業2社にチラシ配布の相談予定。仕入先候補は地元青果店と製菓材料卸", "開業前からSNSで発信し、Googleマップ登録、店頭看板、近隣企業への案内を行う"],
  borrowing: ["住宅ローンなし。車ローンなし。カードローンなし", "個人の借入残高は現時点ではなし"],
  funding: ["設備資金450万円。店舗改装、厨房機器、焙煎機、什器に使用", "運転資金180万円。初期仕入、人件費、家賃、広告費に使用", "自己資金180万円、親族借入50万円、日本政策金融公庫から350万円、他金融機関から50万円を想定", "厨房機器と改装費は見積取得予定。焙煎機はメーカー見積を確認中"],
  forecast: ["1年目は1日平均45名、客単価1,100円、月26日営業で月商約160万円を見込む", "月平均で仕入55万円、人件費45万円、家賃18万円、支払利息2万円、その他28万円を想定", "2年目は固定客増加で月商200万円、3年目は豆販売の伸長で月商230万円を目指す", "開業直後の認知獲得と、雨天時の来店数減少が不安。広告費の使い方を相談したい"]
};

replyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitAnswer(replyInput.value);
});
skipButton.addEventListener("click", () => submitAnswer("未定"));
backButton.addEventListener("click", goBack);
createDraftButton.addEventListener("click", createDraft);
returnChatButton.addEventListener("click", returnToInterview);
printButton.addEventListener("click", () => window.print());
reviewOutput.addEventListener("click", (event) => {
  if (event.target.id === "startImproveButton") startImprovement();
});
restoreButton.addEventListener("click", restoreBackup);
summaryPreview.addEventListener("input", (event) => {
  const target = event.target;
  if (!target.classList.contains("summary-edit")) return;
  state.answers[target.dataset.section][Number(target.dataset.answerIndex)] = target.value.trim();
  state.draftCreated = false;
  draftSection.hidden = true;
  reviewSection.hidden = true;
  if (isDone()) {
    finalActions.hidden = false;
    updateDraftActionText(true);
  }
  save();
  renderSections();
  renderProgress();
});
sampleButton.addEventListener("click", () => {
  backupCurrentState("sample");
  state = freshState();
  state.answers = JSON.parse(JSON.stringify(sampleAnswers));
  state.sectionIndex = sections.length;
  state.messages = [
    { role: "assistant", text: sections[0].questions[0] },
    { role: "user", text: "サンプル事業で入力" },
    { role: "assistant", text: "7項目の聞き取りが完了しました。右側の整理内容を確認してください。" }
  ];
  save();
  render();
});
clearButton.addEventListener("click", () => {
  if (!window.confirm("入力内容を初期化しますか？")) return;
  backupCurrentState("clear");
  state = freshState();
  window.localStorage.removeItem(STORAGE_KEY);
  addAssistant(currentQuestion());
  draftSection.hidden = true;
  reviewSection.hidden = true;
  miniScore.textContent = "採点は下書き作成後に表示";
  render();
});

load();
if (!state.messages.length) addAssistant(currentQuestion());
render();
