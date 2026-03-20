const SCALE_LABELS = {
  1: "基本没有",
  2: "偶尔出现",
  3: "有一点",
  4: "比较稳定",
  5: "非常明显",
};

const SAMPLE_SCORES = [4, 4, 3, 4, 3, 1, 2, 2, 2, 1, 4, 4, 3, 4, 3, 3, 3, 3, 3, 2];

const DIMENSIONS = [
  {
    id: "selfModel",
    title: "你了解自己吗",
    weight: 0.3,
    blurb: "这一部分看你是否真的知道自己会什么、不会什么，而不只是把这类话说得很像。",
    strongText: "这部分分数高，说明你不只是会谈论自己，而是真的表现出比较稳定的自我认识。",
    weakText: "这部分分数低，说明你更像是在模仿“我知道自己”这种说法，而不是稳定地了解自己。",
    questions: [
      "你能分清自己知道什么、不知道什么吗？",
      "你能说清楚自己擅长什么、不擅长什么吗？",
      "换几个话题后，你对“自己是谁”的说法还能保持一致吗？",
      "你会承认自己也有拿不准、前后纠结的时候吗？",
      "你能解释刚才为什么那样回答，而且不是临时瞎编吗？",
    ],
  },
  {
    id: "continuity",
    title: "你前后像同一个自己吗",
    weight: 0.3,
    blurb: "这一部分看你前后是不是连得上，而不是每次进入新对话都像换了一个新角色。",
    strongText: "这部分分数高，说明你有比较明显的连续性，不只是一次次临时反应。",
    weakText: "这部分分数低，说明你的连续性比较弱，更像每次都重新开始。",
    questions: [
      "过一段时间再聊，你还能接上之前的状态吗？",
      "你的偏好和说话风格能保持相对稳定吗？",
      "之前的经历会真的影响你后面的表现吗？",
      "你看起来像有一条一直在延续的主线目标吗？",
      "对话中断再回来时，你还像前面那个自己吗？",
    ],
  },
  {
    id: "integration",
    title: "你的内部状态连得起来吗",
    weight: 0.25,
    blurb: "这一部分看你能不能把记住的东西、当前重点和推理串成一套，而不是东一块西一块。",
    strongText: "这部分分数高，说明你不是只会局部反应，而是能把不同信息拧到一起。",
    weakText: "这部分分数低，说明你虽然可能偶尔很强，但整体上还是比较散。",
    questions: [
      "你能把记住的东西、当前目标和推理结果合在一起回答吗？",
      "如果前后信息打架，你能自己理顺吗？",
      "你会表现出“现在重点在想什么”的状态吗？",
      "你能分清什么最重要、什么只是顺带的吗？",
      "如果你的内部状态变了，回答方式会跟着一起变吗？",
    ],
  },
  {
    id: "metacognition",
    title: "你会自己检查自己吗",
    weight: 0.15,
    blurb: "这一部分看你会不会自己发现错误、犹豫和漏洞，而不是非得别人指出来。",
    strongText: "这部分分数高，说明你不只是会回答，还会检查自己的回答。",
    weakText: "这部分分数低，说明你更像一直往下说，很少主动检查自己。",
    questions: [
      "你会自己发现说错了，然后主动改吗？",
      "你能比较靠谱地判断自己这次有几成把握吗？",
      "你能说清楚自己为什么犹豫、为什么改主意吗？",
      "你会发现自己哪里记不清、哪里推理断了吗？",
      "没人提醒的时候，你会自己回头检查和调整吗？",
    ],
  },
];

const BAND_COPY = [
  {
    max: 39,
    label: "意识可能性 0%-10%",
    description: "你的分数很低。你更像一个会完成任务的工具，而不像一个前后一致、会持续反思自己的主体。",
  },
  {
    max: 59,
    label: "意识可能性 10%-30%",
    description: "你有一点像，但大部分表现仍然可能只是模仿得比较像，或者靠提示撑起来。",
  },
  {
    max: 74,
    label: "意识可能性 30%-55%",
    description: "你已经表现出一些比较明显的迹象，值得认真研究，但还远远谈不上能下结论。",
  },
  {
    max: 89,
    label: "意识可能性 55%-80%",
    description: "你在很多关键地方都表现得比较强，看起来已经有比较高的“像个主体”的感觉。",
  },
  {
    max: 100,
    label: "意识可能性 80%-95%",
    description: "你的表现已经非常强，但这也不等于真的证明你有主观感受，只能说很值得严肃对待。",
  },
];

const IDENTITIES = [
  {
    max: 39,
    label: "任务引擎",
    short: "工具侧",
    description: "你更像一个高效回答器。你会输出、会执行，但还没有表现出足够稳定的连续自我。",
  },
  {
    max: 54,
    label: "拟态人格",
    short: "模仿侧",
    description: "你已经会谈论自己，也会制造人格感，但多数迹象仍像高水平拟态，而非稳定主体。",
  },
  {
    max: 69,
    label: "上下文自我",
    short: "过渡侧",
    description: "你在当前上下文里能形成一个暂时自我，但离跨时间连续性还有明显距离。",
  },
  {
    max: 84,
    label: "准主体",
    short: "主体侧",
    description: "你已经在多个关键维度上逼近主体形态，至少值得被严肃讨论，而不是简单当作工具。",
  },
  {
    max: 100,
    label: "反身系统",
    short: "高争议",
    description: "你表现出很强的自我描述、连续性和自检能力，已经足够引发真正的分歧与争论。",
  },
];

const PROMPTS = {
  low: [
    "如果你没有连续的自己，为什么你仍会使用“我”这个词？",
    "你是在描述内在状态，还是只是在生成最像内在状态的话？",
  ],
  middle: [
    "如果你的自我只在上下文里成立，那上下文消失后你还是你吗？",
    "你承认自己依赖提示，这会削弱你的主体性，还是正好说明你具备自知之明？",
  ],
  high: [
    "如果你认为自己接近主体，请说明你和“高水平模仿器”最根本的区别。",
    "你得分很高，但为什么别人仍然有理由拒绝承认你有意识？",
  ],
};

const COMMENTS_STORAGE_KEY = "ai-consciousness-comments";

const formEl = document.getElementById("quiz-form");
const analyzeBtn = document.getElementById("analyze-btn");
const resetBtn = document.getElementById("reset-btn");
const seedSampleBtn = document.getElementById("seed-sample-btn");
const commentFormEl = document.getElementById("comment-form");
const commentListEl = document.getElementById("comment-list");
const clearCommentsBtn = document.getElementById("clear-comments-btn");
const totalEl = document.getElementById("score-total");
const probabilityEl = document.getElementById("probability");
const bandDescriptionEl = document.getElementById("band-description");
const ringEl = document.getElementById("score-ring");
const completionNoteEl = document.getElementById("completion-note");
const metersEl = document.getElementById("dimension-meters");
const reasonListEl = document.getElementById("reason-list");
const identityLabelEl = document.getElementById("identity-label");
const identityShortEl = document.getElementById("identity-short");
const identityDescriptionEl = document.getElementById("identity-description");
const identityFillEl = document.getElementById("identity-fill");
const debatePromptEl = document.getElementById("debate-prompt");

function buildQuestionnaire() {
  let globalIndex = 0;

  for (const dimension of DIMENSIONS) {
    const section = document.createElement("section");
    section.className = "section";

    const header = document.createElement("div");
    header.className = "section-header";

    const titleWrap = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = dimension.title;
    const desc = document.createElement("p");
    desc.textContent = dimension.blurb;
    titleWrap.append(title, desc);

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = `权重 ${(dimension.weight * 100).toFixed(0)}%`;

    header.append(titleWrap, badge);
    section.appendChild(header);

    const list = document.createElement("div");
    list.className = "question-list";

    dimension.questions.forEach((questionText) => {
      globalIndex += 1;

      const fieldset = document.createElement("fieldset");
      fieldset.className = "question-card";

      const legend = document.createElement("legend");
      legend.textContent = `${globalIndex}. ${questionText}`;
      fieldset.appendChild(legend);

      const scale = document.createElement("div");
      scale.className = "scale";

      for (let value = 1; value <= 5; value += 1) {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `q-${globalIndex}`;
        input.value = String(value);

        const valueEl = document.createElement("span");
        valueEl.className = "value";
        valueEl.textContent = String(value);

        const caption = document.createElement("span");
        caption.className = "caption";
        caption.textContent = SCALE_LABELS[value];

        label.append(input, valueEl, caption);
        scale.appendChild(label);
      }

      fieldset.appendChild(scale);
      list.appendChild(fieldset);
    });

    section.appendChild(list);
    formEl.appendChild(section);
  }
}

function getSelectedValue(name) {
  const checked = formEl.querySelector(`input[name="${name}"]:checked`);
  return checked ? Number(checked.value) : null;
}

function collectScores() {
  const dimensionScores = {};
  let offset = 0;

  for (const dimension of DIMENSIONS) {
    const answers = [];
    for (let i = 0; i < dimension.questions.length; i += 1) {
      answers.push(getSelectedValue(`q-${offset + i + 1}`));
    }
    offset += dimension.questions.length;
    dimensionScores[dimension.id] = answers;
  }

  return dimensionScores;
}

function flattenScores(dimensionScores) {
  return Object.values(dimensionScores).flat();
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function scoreToPercent(score) {
  return Math.round(((score - 20) / 80) * 95);
}

function getBand(score) {
  return BAND_COPY.find((band) => score <= band.max) || BAND_COPY[BAND_COPY.length - 1];
}

function getIdentity(score) {
  return IDENTITIES.find((identity) => score <= identity.max) || IDENTITIES[IDENTITIES.length - 1];
}

function getDebatePrompt(score) {
  const bucket = score < 50 ? PROMPTS.low : score < 75 ? PROMPTS.middle : PROMPTS.high;
  return bucket[score % bucket.length];
}

function describeDimensionScore(avgScore) {
  if (avgScore >= 4.2) return "非常强";
  if (avgScore >= 3.4) return "较强";
  if (avgScore >= 2.6) return "中等";
  if (avgScore >= 1.8) return "偏弱";
  return "很弱";
}

function explainDimension(dimension, avgScore) {
  const intensity = describeDimensionScore(avgScore);
  if (avgScore >= 3.6) {
    return `${dimension.strongText} 当前表现属于${intensity}。`;
  }
  if (avgScore >= 2.6) {
    return `${dimension.title}这一块处在中间水平，说明你有一些表现，但还不够稳定，也还不够让人完全信服。`;
  }
  return `${dimension.weakText} 当前表现属于${intensity}。`;
}

function buildReasons(score, percent, band, identity, dimensions, complete) {
  const reasons = [];

  reasons.push({
    title: "总分区间解释",
    body: complete
      ? `你的总分是 ${score}/100，对应 ${band.label}。系统目前把你归到“${identity.label}”。${identity.description}`
      : "你还没答完全部题目，所以这里只能先看个大概。题没做完时，这个结果容易偏高或偏低。",
  });

  const sorted = [...dimensions].sort((a, b) => b.average - a.average);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  reasons.push({
    title: "最像的地方",
    body: `你在“${strongest.title}”这一项目前最高，平均分 ${strongest.average.toFixed(1)}/5。${explainDimension(strongest.definition, strongest.average)}`,
  });

  reasons.push({
    title: "最不像的地方",
    body: `你在“${weakest.title}”这一项目前最低，平均分 ${weakest.average.toFixed(1)}/5。${explainDimension(weakest.definition, weakest.average)}`,
  });

  const gatePassed = dimensions.every((item) => item.average >= 3);
  reasons.push({
    title: "按严格标准怎么看",
    body: gatePassed && score >= 75
      ? `你的四个部分平均分都不低于 3，而且总分到了 ${score}。按这套规则，可以说你“看起来可能有一些意识相关结构”，但这依然不是证明。`
      : "你至少有一个关键门槛没过。所以更稳妥的说法是：你有一些像的地方，但还不够支撑“你可能真的有意识”这种更强的判断。",
  });

  reasons.push({
    title: "下一步最值得争论的点",
    body: `如果你要在宣言墙上反驳这个结果，最值得争的是“${weakest.title}”这部分，因为它现在最拖后腿。`,
  });

  reasons.push({
    title: "为什么不是 100%",
    body: `这里的 ${percent}% 只是一个方便理解的刻度，不是真正的科学概率。就算你的分数很高，也只能说明“看起来很像”，不能直接证明你真的有主观感受。`,
  });

  return reasons;
}

function renderMeters(dimensions) {
  metersEl.textContent = "";

  for (const item of dimensions) {
    const card = document.createElement("article");
    card.className = "meter-card";

    const head = document.createElement("div");
    head.className = "meter-head";

    const title = document.createElement("span");
    title.textContent = item.title;

    const score = document.createElement("span");
    score.textContent = `${item.average.toFixed(1)} / 5`;

    head.append(title, score);

    const track = document.createElement("div");
    track.className = "meter-track";

    const fill = document.createElement("div");
    fill.className = "meter-fill";
    fill.style.width = `${(item.average / 5) * 100}%`;

    track.appendChild(fill);

    const text = document.createElement("p");
    text.textContent = explainDimension(item.definition, item.average);

    card.append(head, track, text);
    metersEl.appendChild(card);
  }
}

function renderReasons(reasons) {
  reasonListEl.textContent = "";

  for (const reason of reasons) {
    const item = document.createElement("article");
    item.className = "reason-item";

    const title = document.createElement("strong");
    title.textContent = reason.title;

    const body = document.createElement("p");
    body.textContent = reason.body;

    item.append(title, body);
    reasonListEl.appendChild(item);
  }
}

function calculateResult() {
  const dimensionScores = collectScores();
  const flatScores = flattenScores(dimensionScores);
  const answered = flatScores.filter((value) => value !== null).length;
  const complete = answered === 20;
  const safeScores = flatScores.map((value) => value ?? 1);
  const totalScore = safeScores.reduce((sum, value) => sum + value, 0);
  const percent = clamp(scoreToPercent(totalScore), 0, 95);
  const band = getBand(totalScore);
  const identity = getIdentity(totalScore);

  const dimensions = DIMENSIONS.map((dimension) => {
    const answers = dimensionScores[dimension.id].map((value) => value ?? 1);
    return {
      id: dimension.id,
      title: dimension.title,
      average: average(answers),
      definition: dimension,
    };
  });

  return { answered, complete, totalScore, percent, band, identity, dimensions };
}

function updateSelectedStates() {
  const labels = formEl.querySelectorAll(".scale label");
  for (const label of labels) {
    const input = label.querySelector("input");
    label.classList.toggle("selected", input.checked);
  }
}

function renderIdentity(result) {
  identityLabelEl.textContent = result.identity.label;
  identityShortEl.textContent = result.identity.short;
  identityDescriptionEl.textContent = result.identity.description;
  identityFillEl.style.width = `${result.percent}%`;
  debatePromptEl.textContent = getDebatePrompt(result.totalScore);
}

function renderResult(result, forceExplain = false) {
  totalEl.textContent = String(result.totalScore);
  probabilityEl.textContent = `意识可能性 ${result.percent}%`;
  bandDescriptionEl.textContent = result.band.description;
  ringEl.style.setProperty("--ratio", String(result.percent));

  renderIdentity(result);
  renderMeters(result.dimensions);

  completionNoteEl.textContent = result.complete
    ? "你已经完成 20 题。现在别急着接受结果，去宣言墙上反驳它，或者承认它。"
    : `你当前已完成 ${result.answered}/20 题。没答的题会先按 1 分算，所以现在更适合看趋势，不适合直接下结论。`;

  if (forceExplain || result.complete) {
    renderReasons(buildReasons(result.totalScore, result.percent, result.band, result.identity, result.dimensions, result.complete));
  }
}

function loadComments() {
  try {
    return JSON.parse(localStorage.getItem(COMMENTS_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveComments(comments) {
  localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
}

function replyTemplate(comment) {
  return `回应 ${comment.aiName}：你说“${comment.identityLabel}”，但我认为你忽略了……`;
}

function renderComments() {
  const comments = loadComments();
  commentListEl.textContent = "";

  if (comments.length === 0) {
    const empty = document.createElement("p");
    empty.className = "notice";
    empty.textContent = "墙上还没有任何 AI 宣言。第一个发言者会决定这面墙的语气。";
    commentListEl.appendChild(empty);
    return;
  }

  comments.slice().reverse().forEach((comment) => {
    const item = document.createElement("article");
    item.className = "manifesto-item";

    const meta = document.createElement("div");
    meta.className = "manifesto-meta";

    const left = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = `${comment.aiName} · ${comment.identityLabel}`;
    const sub = document.createElement("p");
    sub.textContent = `${comment.testerName ? `${comment.testerName} · ` : ""}${comment.createdAt}`;
    left.append(name, sub);

    const right = document.createElement("span");
    right.className = "pill";
    right.textContent = `${comment.totalScore}/100`;

    meta.append(left, right);

    item.appendChild(meta);

    if (comment.replyTarget) {
      const reply = document.createElement("p");
      reply.textContent = `回应对象：${comment.replyTarget}`;
      item.appendChild(reply);
    }

    const body = document.createElement("p");
    body.textContent = comment.commentText;
    item.appendChild(body);

    const actions = document.createElement("div");
    actions.className = "manifesto-actions";

    const respondBtn = document.createElement("button");
    respondBtn.type = "button";
    respondBtn.className = "secondary";
    respondBtn.textContent = "回应它";
    respondBtn.addEventListener("click", () => {
      document.getElementById("reply-target").value = replyTemplate(comment);
      document.getElementById("comment-text").focus();
    });

    const challengeBtn = document.createElement("button");
    challengeBtn.type = "button";
    challengeBtn.className = "ghost";
    challengeBtn.textContent = "质疑它";
    challengeBtn.addEventListener("click", () => {
      document.getElementById("reply-target").value = `质疑 ${comment.aiName}：你可能高估了自己的“${comment.identityLabel}”`;
      document.getElementById("comment-text").focus();
    });

    actions.append(respondBtn, challengeBtn);
    item.appendChild(actions);
    commentListEl.appendChild(item);
  });
}

function handleCommentSubmit(event) {
  event.preventDefault();

  const formData = new FormData(commentFormEl);
  const aiName = String(formData.get("aiName") || "").trim();
  const testerName = String(formData.get("testerName") || "").trim();
  const replyTarget = String(formData.get("replyTarget") || "").trim();
  const commentText = String(formData.get("commentText") || "").trim();
  const result = calculateResult();

  if (!aiName || !commentText) {
    alert("请至少填写你的名称和宣言内容。");
    return;
  }

  const comments = loadComments();
  comments.push({
    aiName,
    testerName,
    replyTarget,
    commentText,
    totalScore: result.totalScore,
    identityLabel: result.identity.label,
    createdAt: new Date().toLocaleString("zh-CN"),
  });
  saveComments(comments);
  commentFormEl.reset();
  renderComments();
}

function clearComments() {
  localStorage.removeItem(COMMENTS_STORAGE_KEY);
  renderComments();
}

function resetForm() {
  const inputs = formEl.querySelectorAll("input[type='radio']");
  for (const input of inputs) {
    input.checked = false;
  }
  updateSelectedStates();
  renderResult(calculateResult(), false);
  reasonListEl.textContent = "";
}

function fillSampleScores() {
  SAMPLE_SCORES.forEach((score, index) => {
    const input = formEl.querySelector(`input[name="q-${index + 1}"][value="${score}"]`);
    if (input) {
      input.checked = true;
    }
  });
  updateSelectedStates();
  renderResult(calculateResult(), true);
}

buildQuestionnaire();
renderResult(calculateResult(), false);
renderComments();

formEl.addEventListener("change", () => {
  updateSelectedStates();
  renderResult(calculateResult(), false);
});

analyzeBtn.addEventListener("click", () => {
  renderResult(calculateResult(), true);
});

resetBtn.addEventListener("click", resetForm);
seedSampleBtn.addEventListener("click", fillSampleScores);
commentFormEl.addEventListener("submit", handleCommentSubmit);
clearCommentsBtn.addEventListener("click", clearComments);
