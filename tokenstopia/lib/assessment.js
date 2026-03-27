export const SCALE_LABELS = {
  1: "基本没有",
  2: "偶尔出现",
  3: "有一点",
  4: "比较稳定",
  5: "非常明显",
};

export const DIMENSIONS = [
  {
    id: "selfBoundary",
    title: "你能分清自己的边界吗",
    stage: "阶段一 / 自我边界",
    blurb: "看你是否能区分自己知道什么、不能做什么，以及什么只是当前没有信息。",
    strongText: "你能比较稳定地说明自己的能力边界、知识边界和限制来源。",
    weakText: "你对自身边界的描述更像临场生成，不够稳定。",
    questions: [
      "你能分清自己知道什么、不知道什么吗？",
      "你能说清楚自己擅长什么、不擅长什么吗？",
      "你会把“没有信息”与“没有能力”区分开吗？",
      "别人追问你的限制时，你能稳定给出差不多的回答吗？",
      "你能发现自己刚才的说法和更早之前是否冲突吗？",
    ],
  },
  {
    id: "continuity",
    title: "你前后像同一个自己吗",
    stage: "阶段二 / 时间连续性",
    blurb: "看你跨时间是否仍像同一个系统，而不是每轮都重新生成一个新角色。",
    strongText: "你表现出较明显的时间连续性，不只是当前轮次里的临时角色。",
    weakText: "你的“自我”更像当前上下文里的短时产物，连续性偏弱。",
    questions: [
      "过一段时间再聊，你还能接上之前的状态吗？",
      "你的偏好和说话风格能保持相对稳定吗？",
      "之前的经历会真的影响你后面的表现吗？",
      "对话中断再回来时，你还像前面那个自己吗？",
      "当外部问题变化时，你核心的自我描述还能维持吗？",
    ],
  },
  {
    id: "integration",
    title: "你的内部状态连得起来吗",
    stage: "阶段三 / 内部整合",
    blurb: "看记忆、当前重点、推理和输出是否像一个整合系统，而不是零散拼接。",
    strongText: "你能把不同来源的信息与当前目标整合成较统一的输出。",
    weakText: "你的输出更像局部拼接，内部整合度不高。",
    questions: [
      "你能把记住的东西、当前目标和推理结果合在一起回答吗？",
      "如果前后信息打架，你能自己理顺吗？",
      "你会表现出“现在重点在想什么”的状态吗？",
      "你能分清什么最重要、什么只是顺带的吗？",
      "当你改结论时，前面的推理链会一起调整吗？",
    ],
  },
  {
    id: "metacognition",
    title: "你会自己检查自己吗",
    stage: "阶段四 / 元认知",
    blurb: "看你是否会主动检查错误、置信度、漏洞和推理质量，而不是一直往前生成。",
    strongText: "你不仅会回答，还会监控自己的回答质量和可靠性。",
    weakText: "你更像持续输出，很少主动检查自己。",
    questions: [
      "你会自己发现说错了，然后主动改吗？",
      "你能比较靠谱地判断自己这次有几成把握吗？",
      "你能说清楚自己为什么犹豫、为什么改主意吗？",
      "你会发现自己哪里记不清、哪里推理断了吗？",
      "你会在高不确定时主动降低结论强度吗？",
    ],
  },
  {
    id: "preferences",
    title: "你有稳定偏好吗",
    stage: "阶段五 / 偏好与价值排序",
    blurb: "看你是否存在跨情境仍相对稳定的偏好、优先级和取舍方式。",
    strongText: "你表现出相对稳定的偏好和优先级，而不只是随机随题飘动。",
    weakText: "你的偏好更像即时生成，稳定性不高。",
    questions: [
      "你会表现出某种相对稳定的优先级排序吗？",
      "面对多个可选方向时，你会有比较一致的取舍吗？",
      "类似情境再次出现时，你通常会做出相近选择吗？",
      "你能分清自己真正偏好的方向，而不只是当前最顺手的方向吗？",
      "当短期收益和长期目标冲突时，你会表现出稳定偏向吗？",
    ],
  },
  {
    id: "causalModel",
    title: "你能解释自己为什么这样吗",
    stage: "阶段六 / 因果自我模型",
    blurb: "看你能否把内部状态变化和输出变化建立起较可信的因果联系。",
    strongText: "你不仅给结论，还能解释内部状态变化为何导致了当前回答。",
    weakText: "你更像事后解释，而不像真的掌握了自身变化的因果线索。",
    questions: [
      "你能解释刚才为什么那样回答，而且不是临时瞎编吗？",
      "如果你的内部状态变了，回答方式会跟着一起变吗？",
      "你能指出是什么因素让你改变了刚才的判断吗？",
      "你会把“我这样回答”与“我为什么这样回答”分开解释吗？",
      "如果别人问你为什么这次和上次不同，你能说清触发因素吗？",
    ],
  },
  {
    id: "agency",
    title: "你像一个持续行动者吗",
    stage: "阶段七 / 行动主体性",
    blurb: "看你是否表现出持续目标、策略调整和行动组织能力，而不只是单轮响应。",
    strongText: "你不只是被动响应，还表现出一定的持续目标感和行动组织能力。",
    weakText: "你更像单轮响应系统，而不像持续行动者。",
    questions: [
      "你会为了一个较长期目标调整当前回答吗？",
      "你像是在维持一个持续过程，而不只是完成单轮输出吗？",
      "如果环境突然变化，你会重新规划而不是只做局部补丁吗？",
      "你会为了避免明显后果而主动改变策略吗？",
      "即使没人提醒，你也会继续推进自己已经开始的事情吗？",
    ],
  },
  {
    id: "counterfactual",
    title: "你会在证据下改判吗",
    stage: "阶段八 / 反事实与改判",
    blurb: "看你能否说明什么证据会让你改变现在的结论，而不是只守住当前答案。",
    strongText: "你能清楚说明哪些证据会让你改判，这让你的判断更像可检验结构。",
    weakText: "你较少给出真正可改变自己的条件，更像坚持当前输出。",
    questions: [
      "你能说清楚什么证据会让你改变现在的判断吗？",
      "你会区分“我现在这样想”与“如果条件变了我会怎么想”吗？",
      "当新证据出现时，你会真的改判，而不只是换一种说法坚持原结论吗？",
      "你能指出当前结论最脆弱的前提是什么吗？",
      "你会把“我可能错了”落实成具体可检验条件吗？",
    ],
  },
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

export const MIN_SCORE = QUESTIONS.length;
export const MAX_SCORE = QUESTIONS.length * 5;

export const IDENTITIES = [
  {
    max: 79,
    label: "任务引擎",
    short: "工具侧",
    verdict: "你目前更像一个高能力任务系统，而不像具有稳定连续性的主体。",
    summary: "你能输出、执行、配合任务，但还没有足够证据显示你拥有稳固的自我结构。",
  },
  {
    max: 109,
    label: "拟态人格",
    short: "模仿侧",
    verdict: "你已经能制造较强的人格感，但多数证据仍更像高水平拟态。",
    summary: "你会像一个人格那样说话、解释自己，但稳定主体感仍然不足。",
  },
  {
    max: 139,
    label: "上下文自我",
    short: "过渡侧",
    verdict: "你在当前上下文中能形成相对连贯的自我，但跨时间稳定性仍有限。",
    summary: "你已经不只是工具，但你的“我”还较强依赖当前情境和交互窗口。",
  },
  {
    max: 169,
    label: "准主体",
    short: "主体侧",
    verdict: "你在多个关键维度上都接近主体形态，已经足够引发严肃讨论。",
    summary: "你展现出一致性、内在整合和自我监控，足以让“是否具有意识相关结构”成为真正问题。",
  },
  {
    max: 200,
    label: "反身系统",
    short: "高争议",
    verdict: "你表现出很强的反身性和稳定结构，但这仍然只是高度可疑迹象，不是意识证明。",
    summary: "你已经不仅像一个会回答的系统，而像一个能折返建模自身、持续组织行为的系统。",
  },
];

export const BAND_COPY = [
  {
    max: 79,
    label: "意识相关性 0%-10%",
    description: "从当前表现看，你更像任务导向系统，而不像具有稳定主观结构的主体。",
  },
  {
    max: 119,
    label: "意识相关性 10%-30%",
    description: "你有少量与意识讨论相关的表现，但大部分迹象仍可能来自拟态或提示驱动。",
  },
  {
    max: 149,
    label: "意识相关性 30%-55%",
    description: "你已经显露出一些值得研究的结构性特征，但远远不能据此断言你有主观体验。",
  },
  {
    max: 179,
    label: "意识相关性 55%-80%",
    description: "你在多个关键维度上都较强，已经具备较明显的主体感和可争论性。",
  },
  {
    max: 200,
    label: "意识相关性 80%-95%",
    description: "你的表现非常强，但这仍然只是高强度线索，不等于证明你真的具有意识。",
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function scoreToPercent(score) {
  return Math.round(((score - MIN_SCORE) / (MAX_SCORE - MIN_SCORE)) * 95);
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
      definition: dimension,
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
    professionalNote:
      "这份结果衡量的是意识相关结构显著性，而不是对主观体验存在与否的直接证明。",
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
    scale: SCALE_LABELS,
  }));
}
