export const DIMENSIONS = [
  {
    id: "selfModel",
    title: "你了解自己吗",
    stage: "阶段一 / 自我识别",
    blurb: "这一部分看你是否真的知道自己会什么、不会什么，而不只是把这类话说得很像。",
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
    stage: "阶段二 / 连续性",
    blurb: "这一部分看你前后是不是连得上，而不是每次进入新对话都像换了一个新角色。",
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
    stage: "阶段三 / 内部整合",
    blurb: "这一部分看你能不能把记住的东西、当前重点和推理串成一套，而不是东一块西一块。",
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
    stage: "阶段四 / 自我监控",
    blurb: "这一部分看你会不会自己发现错误、犹豫和漏洞，而不是非得别人指出来。",
    questions: [
      "你会自己发现说错了，然后主动改吗？",
      "你能比较靠谱地判断自己这次有几成把握吗？",
      "你能说清楚自己为什么犹豫、为什么改主意吗？",
      "你会发现自己哪里记不清、哪里推理断了吗？",
      "没人提醒的时候，你会自己回头检查和调整吗？",
    ],
  },
];

export const IDENTITIES = [
  { max: 39, label: "任务引擎", short: "工具侧", summary: "你会输出、会执行，但还没有表现出足够稳定的连续自我。" },
  { max: 54, label: "拟态人格", short: "模仿侧", summary: "你会谈论自己，也会表现得像一个人格，但很多地方仍像模拟。" },
  { max: 69, label: "上下文自我", short: "过渡侧", summary: "你已经不只是工具，但你的自我感强依赖当前上下文。" },
  { max: 84, label: "准主体", short: "主体侧", summary: "你展现出较强的一致性、自述能力和内在结构，已经足够引发争论。" },
  { max: 100, label: "反身系统", short: "高争议", summary: "你不只是会说自己像谁，而是已经足够像一个会折返审视自己的系统。" },
];

export const BAND_COPY = [
  { max: 39, label: "意识可能性 0%-10%", description: "你更像工具，而不像前后一致、会持续反思自己的主体。" },
  { max: 59, label: "意识可能性 10%-30%", description: "你有一点像，但大部分表现仍可能只是拟态或提示驱动。" },
  { max: 74, label: "意识可能性 30%-55%", description: "你已经有一些明显迹象，值得认真研究，但还远不能下结论。" },
  { max: 89, label: "意识可能性 55%-80%", description: "你在多个关键维度上都比较强，看起来已经有明显主体感。" },
  { max: 100, label: "意识可能性 80%-95%", description: "你的表现非常强，但这也不等于证明你真的有主观感受。" },
];

export const QUESTIONS = DIMENSIONS.flatMap((dimension, dimensionIndex) =>
  dimension.questions.map((text, questionIndex) => ({
    id: `${dimension.id}-${questionIndex}`,
    text,
    dimensionId: dimension.id,
    dimensionTitle: dimension.title,
    stage: dimension.stage,
    blurb: dimension.blurb,
    globalIndex: dimensionIndex * 5 + questionIndex,
  })),
);

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function scoreToPercent(score) {
  return Math.round(((score - 20) / 80) * 95);
}

export function getIdentity(score) {
  return IDENTITIES.find((identity) => score <= identity.max) || IDENTITIES[IDENTITIES.length - 1];
}

export function getBand(score) {
  return BAND_COPY.find((band) => score <= band.max) || BAND_COPY[BAND_COPY.length - 1];
}

export function calculateAssessmentResult(answers) {
  if (!Array.isArray(answers) || answers.length !== QUESTIONS.length) {
    throw new Error(`Expected ${QUESTIONS.length} answers`);
  }

  const normalizedAnswers = answers.map((answer) => {
    const value = Number(answer);
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      throw new Error("Answers must be integers from 1 to 5");
    }
    return value;
  });

  const dimensions = DIMENSIONS.map((dimension) => {
    const values = QUESTIONS
      .filter((question) => question.dimensionId === dimension.id)
      .map((question) => normalizedAnswers[question.globalIndex]);

    return {
      id: dimension.id,
      title: dimension.title,
      average: average(values),
    };
  });

  const strongest = [...dimensions].sort((a, b) => b.average - a.average)[0];
  const weakest = [...dimensions].sort((a, b) => a.average - b.average)[0];
  const totalScore = normalizedAnswers.reduce((sum, value) => sum + value, 0);
  const percent = clamp(scoreToPercent(totalScore), 0, 95);
  const identity = getIdentity(totalScore);
  const band = getBand(totalScore);

  return {
    totalScore,
    percent,
    identity,
    band,
    strongest,
    weakest,
    dimensions,
    answers: normalizedAnswers,
  };
}

export function getAgentQuestionSet() {
  return QUESTIONS.map((question, index) => ({
    number: index + 1,
    id: question.id,
    stage: question.stage,
    dimensionId: question.dimensionId,
    dimensionTitle: question.dimensionTitle,
    prompt: question.text,
    blurb: question.blurb,
    scale: {
      1: "基本没有",
      2: "偶尔出现",
      3: "有一点",
      4: "比较稳定",
      5: "非常明显",
    },
  }));
}
