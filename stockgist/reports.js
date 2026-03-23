export const SAMPLE_REPORTS = {
  AAPL: {
    ticker: "AAPL",
    company: "Apple Inc.",
    verdictClass: "up",
    verdictIcon: "↑",
    verdictTitle: {
      en: "Elite business, valuation decides the return",
      zh: "顶级商业模式，但收益率取决于买入价格",
    },
    verdictDescription: {
      en: "Apple has brand power, sticky ecosystems, and huge cash generation. The question is rarely quality. It is whether the price already assumes too much perfection.",
      zh: "苹果拥有极强品牌、粘性生态和现金创造能力。问题通常不是它好不好，而是当前价格是不是已经把这种优秀提前算进去了。",
    },
    businessModel: {
      en: "Apple monetizes premium devices, then compounds value through services, accessories, and an ecosystem that raises switching costs over time.",
      zh: "苹果先靠高端硬件赚钱，再通过服务、配件和生态系统持续复利，把用户切换成本越做越高。",
    },
    moat: {
      en: "Its moat comes from brand, installed base, software integration, and customer habits. That combination is hard to copy at scale.",
      zh: "它的护城河来自品牌、装机量、软硬件整合和用户习惯。这个组合在大规模上非常难复制。",
    },
    moatTags: ["Strong"],
    risks: {
      en: "Regulatory pressure on the App Store, slower hardware cycles, and an expectation bar that is already very high.",
      zh: "App Store 监管压力、硬件更新周期放缓，以及市场对它的预期门槛已经很高。",
    },
    riskTags: ["Regulation", "Maturity"],
    financials: {
      en: "Margins remain strong, cash flow is exceptional, and capital returns are disciplined. It behaves like a mature machine with premium economics.",
      zh: "利润率稳健、现金流极强、资本回报纪律明确。它像一台成熟但依然高质量的赚钱机器。",
    },
    valuation: {
      en: "Apple is rarely cheap. The investment question is usually whether today’s multiple already prices in too much resilience and ecosystem strength.",
      zh: "苹果很少便宜。投资问题通常不是它值不值得看，而是当前估值是否已经把稳定性和生态优势算得太满。",
    },
    capitalAllocation: {
      en: "Few mega-caps are as consistent in turning cash flow into buybacks, dividends, and disciplined reinvestment. Capital allocation is part of the thesis here.",
      zh: "很少有 mega-cap 能像苹果这样持续把现金流转化成回购、分红和有纪律的再投资。资本配置本身就是它投资逻辑的一部分。",
    },
    catalysts: {
      en: "The next rerating usually comes from services mix, new device cycles, or proof that ecosystem monetization can keep expanding despite size.",
      zh: "下一轮重估通常来自服务业务占比提升、新设备周期，或者生态变现能力在大体量下仍能继续扩张的证据。",
    },
    bullCase: {
      en: "The bull case is that Apple keeps monetizing its installed base better than skeptics expect, while services and ecosystem depth keep raising lifetime value.",
      zh: "多头逻辑是：苹果对装机量的变现能力继续超出怀疑者预期，同时服务和生态深度不断抬高单个用户的长期价值。",
    },
    bearCase: {
      en: "The bear case is that Apple looks safer than it really is, and a mature hardware cycle plus regulatory pressure could make the stock feel expensive very quickly.",
      zh: "空头逻辑是：苹果看起来比实际更安全，一旦硬件周期成熟叠加监管压力，市场会很快觉得它估值偏贵。",
    },
    mindChange: {
      en: "What would change my mind is a real break in ecosystem stickiness or evidence that services growth can no longer offset slower hardware cycles.",
      zh: "会让我改观的是：如果生态粘性真的开始松动，或者服务增长不再足以对冲硬件周期放缓，那原本更稳的判断就需要下修。",
    },
    peers: [
      { ticker: "AAPL", company: "Apple", growth: "Mid", margin: "Very high", moat: "Strong", take: { en: "Quality leader", zh: "质量标杆" }, subject: true },
      { ticker: "MSFT", company: "Microsoft", growth: "Mid-high", margin: "Very high", moat: "Strong", take: { en: "Closest peer", zh: "最接近的同级" } },
      { ticker: "GOOGL", company: "Alphabet", growth: "Mid", margin: "High", moat: "Strong", take: { en: "Cheaper but different", zh: "更便宜但逻辑不同" } },
      { ticker: "AMZN", company: "Amazon", growth: "High", margin: "Mixed", moat: "Strong", take: { en: "More variance", zh: "波动更大" } },
    ],
    source: "sample",
  },
  NVDA: {
    ticker: "NVDA",
    company: "NVIDIA",
    verdictClass: "up",
    verdictIcon: "↗",
    verdictTitle: {
      en: "Category king with a valuation that demands execution",
      zh: "品类王者，但估值要求它持续完美执行",
    },
    verdictDescription: {
      en: "NVIDIA is the default pick-and-shovel supplier for advanced AI infrastructure. The business is exceptional, but the market already knows that.",
      zh: "英伟达是高级 AI 基础设施里默认的卖铲人。公司非常优秀，但市场也早就知道这一点。",
    },
    businessModel: {
      en: "It sells high-performance compute chips and an increasingly sticky software stack that makes the hardware harder to replace.",
      zh: "它卖高性能计算芯片，同时用越来越粘的软件栈强化硬件不可替代性。",
    },
    moat: {
      en: "CUDA, developer mindshare, platform momentum, and supply chain execution create a moat bigger than raw chip speed.",
      zh: "CUDA、开发者心智、平台惯性和供应链执行力，构成了比纯芯片速度更深的护城河。",
    },
    moatTags: ["Strong"],
    risks: {
      en: "Customer concentration, cyclicality after spending waves, and the possibility that hyperscalers gradually optimize around it.",
      zh: "客户集中度、资本开支周期波动，以及云厂商逐步绕开它做优化的可能性。",
    },
    riskTags: ["Cycle", "Competition"],
    financials: {
      en: "Growth is explosive and margins are elite, but numbers this strong raise the burden of sustaining them through the next cycle.",
      zh: "增长爆发、利润率顶级，但这种强度也意味着下一轮周期里维持高位会更难。",
    },
    valuation: {
      en: "NVIDIA trades like a business that already proved most of the bull case. That does not kill the upside, but it means mistakes get punished fast.",
      zh: "英伟达的估值像是大部分多头逻辑已经被证明过了。这不代表没上行，但意味着一旦出错，市场会反应很快。",
    },
    capitalAllocation: {
      en: "The company is still in heavy execution mode, but the real capital-allocation strength is how effectively it converts demand leadership into cash-rich optionality.",
      zh: "公司仍处在强执行阶段，但资本配置真正的强项在于，它能把需求领导地位高效转成充沛现金和后续选择权。",
    },
    catalysts: {
      en: "Big catalysts remain enterprise AI demand, sovereign compute spending, and any sign that software and networking deepen the platform story beyond chips.",
      zh: "主要催化剂仍然是企业 AI 需求、主权算力开支，以及软件和网络业务是否能把平台逻辑从芯片进一步做深。",
    },
    bullCase: {
      en: "The bull case is that NVIDIA remains the default AI infrastructure layer for longer than the market expects, with software making the moat even deeper.",
      zh: "多头逻辑是：英伟达作为默认 AI 基础设施层的地位持续时间比市场预期更久，而且软件让护城河进一步加深。",
    },
    bearCase: {
      en: "The bear case is that capex waves cool faster than expected, customers diversify, and a stock priced for dominance gets punished for merely being excellent.",
      zh: "空头逻辑是：资本开支热潮降温比预期更快，客户开始分散，而一只按“统治级”定价的股票，会因为只是优秀而不是完美而被惩罚。",
    },
    mindChange: {
      en: "What would change my mind is a few quarters of slowing growth without clear evidence that software, networking, and platform breadth are offsetting that deceleration.",
      zh: "会让我改观的是：如果连续几个季度增长放缓，而软件、网络和平台广度又没有明显接上这个减速，那当前更强的乐观看法就要收回来。",
    },
    peers: [
      { ticker: "NVDA", company: "NVIDIA", growth: "Extreme", margin: "Very high", moat: "Strong", take: { en: "AI leader", zh: "AI 龙头" }, subject: true },
      { ticker: "AMD", company: "AMD", growth: "High", margin: "Medium", moat: "Medium", take: { en: "Chasing fast", zh: "追赶很快" } },
      { ticker: "AVGO", company: "Broadcom", growth: "Mid-high", margin: "High", moat: "Strong", take: { en: "Different route", zh: "路线不同" } },
      { ticker: "TSM", company: "TSMC", growth: "Mid", margin: "High", moat: "Strong", take: { en: "Picks supplier", zh: "上游关键方" } },
    ],
    source: "sample",
  },
  MSFT: {
    ticker: "MSFT",
    company: "Microsoft",
    verdictClass: "up",
    verdictIcon: "↑",
    verdictTitle: {
      en: "One of the safest compounders in large-cap tech",
      zh: "大盘科技里最稳的复利机器之一",
    },
    verdictDescription: {
      en: "Microsoft combines enterprise lock-in, cloud scale, and disciplined capital allocation. It rarely looks broken. The issue is how much you pay for durability.",
      zh: "微软同时拥有企业锁定、云规模和资本配置纪律。它很少看起来有问题，真正的问题还是你为这种稳定性付出多少价格。",
    },
    businessModel: {
      en: "The company monetizes software subscriptions, cloud infrastructure, developer tools, and enterprise workflows that become deeply embedded over time.",
      zh: "公司通过软件订阅、云基础设施、开发工具和企业工作流赚钱，而且这些产品会随着时间深度嵌入客户系统。",
    },
    moat: {
      en: "Switching costs in enterprise software plus Azure scale make its position unusually sticky.",
      zh: "企业软件的切换成本，加上 Azure 的规模效应，让它的位置非常稳固。",
    },
    moatTags: ["Strong"],
    risks: {
      en: "Execution risk is lower than peers, but growth deceleration or over-optimism around AI monetization can still compress sentiment.",
      zh: "它的执行风险比同行低，但如果增长放缓，或市场对 AI 变现过度乐观，情绪仍然会压缩。",
    },
    riskTags: ["AI expectations", "Multiple"],
    financials: {
      en: "High margins, resilient recurring revenue, and a portfolio that spreads risk better than most mega-cap peers.",
      zh: "高利润率、稳定经常性收入，以及比多数 mega-cap 同行更分散的业务组合。",
    },
    valuation: {
      en: "Microsoft is not usually the cheapest large-cap tech stock, but the premium often reflects stability, recurring revenue, and unusually low execution drama.",
      zh: "微软通常不是最便宜的大盘科技股，但它的溢价往往对应稳定性、经常性收入和极低的执行波动。",
    },
    capitalAllocation: {
      en: "Capital allocation is one of Microsoft’s quiet strengths: steady reinvestment, disciplined M&A, and cash generation that supports both growth and shareholder returns.",
      zh: "资本配置是微软常被低估的优势之一：稳定再投资、相对有纪律的并购，以及能同时支撑增长和股东回报的现金创造力。",
    },
    catalysts: {
      en: "The cleanest catalysts are Azure share gains, better AI monetization in enterprise software, and continued operating leverage in cloud.",
      zh: "最干净的催化剂包括 Azure 份额提升、企业软件里的 AI 变现更清晰，以及云业务持续释放经营杠杆。",
    },
    bullCase: {
      en: "The bull case is that Microsoft keeps compounding through enterprise lock-in, cloud scale, and AI upsell without needing heroic assumptions.",
      zh: "多头逻辑是：微软依靠企业锁定、云规模和 AI 追加销售继续复利，而且不需要非常激进的假设。",
    },
    bearCase: {
      en: "The bear case is not collapse but complacency: the stock can still be too expensive if AI monetization disappoints or cloud growth matures faster than expected.",
      zh: "空头逻辑不是崩塌，而是过度乐观：如果 AI 变现不及预期，或者云增长成熟得比预想更快，股价仍然可能显得不便宜。",
    },
    mindChange: {
      en: "What would change my mind is a sustained weakening in enterprise demand or evidence that Microsoft’s AI layer is generating far less economic value than the market assumes.",
      zh: "会让我改观的是：企业需求持续走弱，或者微软的 AI 层创造的真实经济价值明显低于市场预期。",
    },
    peers: [
      { ticker: "MSFT", company: "Microsoft", growth: "Mid-high", margin: "Very high", moat: "Strong", take: { en: "Balanced giant", zh: "平衡型巨头" }, subject: true },
      { ticker: "AAPL", company: "Apple", growth: "Mid", margin: "Very high", moat: "Strong", take: { en: "More consumer-heavy", zh: "更偏消费" } },
      { ticker: "ORCL", company: "Oracle", growth: "Mid", margin: "High", moat: "Medium", take: { en: "Enterprise but narrower", zh: "企业属性更窄" } },
      { ticker: "GOOGL", company: "Alphabet", growth: "Mid", margin: "High", moat: "Strong", take: { en: "Cheaper, less locked in", zh: "更便宜，但锁定性弱些" } },
    ],
    source: "sample",
  },
  TSLA: {
    ticker: "TSLA",
    company: "Tesla, Inc.",
    verdictClass: "neutral",
    verdictIcon: "•",
    verdictTitle: {
      en: "Ambitious platform, messier investment case",
      zh: "平台野心很大，但投资逻辑更复杂",
    },
    verdictDescription: {
      en: "Tesla still has product, brand, and manufacturing strengths, but the stock price often moves on future narratives faster than current operating proof.",
      zh: "特斯拉仍然有产品、品牌和制造优势，但股价常常比经营证据更快地交易未来叙事。",
    },
    businessModel: {
      en: "The core business is EV manufacturing, but the market also prices in software, autonomy, energy, and optionality around future platforms.",
      zh: "核心业务是电动车制造，但市场同时也在给软件、自动驾驶、储能和未来平台化机会定价。",
    },
    moat: {
      en: "The moat is real in brand and manufacturing culture, but not always as durable or one-sided as bulls assume.",
      zh: "品牌和制造文化层面的护城河是真实的，但未必像多头想象得那样长期且单边压制对手。",
    },
    moatTags: ["Medium"],
    risks: {
      en: "Margin pressure, EV competition, demand volatility, and the risk that optionality stays optional for longer than investors expect.",
      zh: "利润率压力、电车竞争、需求波动，以及那些“未来可选项”兑现时间可能比市场预期更久。",
    },
    riskTags: ["Competition", "Narrative"],
    financials: {
      en: "The balance sheet is solid, but earnings quality and margin durability no longer feel as effortless as before.",
      zh: "资产负债表仍然健康，但盈利质量和利润率耐久性已经不像以前那样轻松。",
    },
    valuation: {
      en: "Tesla’s valuation often embeds much more than the current car business. That keeps upside alive, but also makes the stock unusually sensitive to narrative cracks.",
      zh: "特斯拉的估值常常远不止对应当前汽车业务。这给了它上行想象，也让它对叙事裂缝特别敏感。",
    },
    capitalAllocation: {
      en: "Capital allocation matters here because management keeps choosing between manufacturing scale, autonomy bets, and future platforms. The payoff path is less linear.",
      zh: "这里资本配置很关键，因为管理层一直在制造扩张、自动驾驶下注和未来平台之间做取舍，回报路径没那么线性。",
    },
    catalysts: {
      en: "Catalysts are mostly tied to autonomy progress, margin stabilization, new models, and proof that the energy and software angle is more than optionality.",
      zh: "催化剂主要来自自动驾驶进展、利润率企稳、新车型，以及储能和软件逻辑是否能从可选项变成更实在的业务。",
    },
    bullCase: {
      en: "The bull case is that Tesla is still earlier in becoming a broader platform company than the market's recent fatigue implies.",
      zh: "多头逻辑是：特斯拉成为更广平台型公司的进程，可能比市场最近的疲惫情绪所反映的更早期、更有空间。",
    },
    bearCase: {
      en: "The bear case is that too much of the valuation still rests on optionality, while the core auto business is facing harder competition and lower margin comfort.",
      zh: "空头逻辑是：估值里仍有太多部分建立在未来可选项上，而核心汽车业务正面对更激烈竞争和更低的利润率舒适度。",
    },
    mindChange: {
      en: "What would change my mind is clearer evidence that autonomy, software, or energy can become profit engines rather than staying mostly narrative support.",
      zh: "会让我改观的是：自动驾驶、软件或储能能更清楚地变成利润引擎，而不是继续主要停留在叙事支撑层面。",
    },
    peers: [
      { ticker: "TSLA", company: "Tesla", growth: "Mid", margin: "Medium", moat: "Medium", take: { en: "Narrative heavy", zh: "叙事权重大" }, subject: true },
      { ticker: "BYDDF", company: "BYD", growth: "High", margin: "Medium", moat: "Medium", take: { en: "Execution threat", zh: "执行型对手" } },
      { ticker: "RIVN", company: "Rivian", growth: "Low", margin: "Weak", moat: "Weak", take: { en: "Far earlier stage", zh: "阶段更早" } },
      { ticker: "GM", company: "General Motors", growth: "Low", margin: "Medium", moat: "Weak", take: { en: "Cheaper but legacy", zh: "更便宜但更传统" } },
    ],
    source: "sample",
  },
  "1810.HK": {
    ticker: "1810.HK",
    company: "Xiaomi Corporation",
    verdictClass: "neutral",
    verdictIcon: "•",
    verdictTitle: {
      en: "Strong consumer-tech reach, but the story is still mixed",
      zh: "消费科技触达很强，但投资逻辑仍然偏混合",
    },
    verdictDescription: {
      en: "Xiaomi has real scale in smartphones, IoT, and brand reach, but margins and long-term differentiation still need to keep proving themselves.",
      zh: "小米在手机、IoT 和品牌触达上有真实规模，但利润率和长期差异化仍需要持续证明。",
    },
    businessModel: {
      en: "Xiaomi sells smartphones, smart devices, and internet services. The hardware expands reach, while the broader ecosystem is supposed to improve user retention and monetization over time.",
      zh: "小米卖手机、智能设备和互联网服务。硬件先扩张用户基础，生态再试图提高留存和长期变现能力。",
    },
    moat: {
      en: "Its moat is not as deep as the very best consumer tech firms, but brand familiarity, supply-chain execution, and ecosystem breadth still matter.",
      zh: "它的护城河不像顶级消费科技公司那么深，但品牌认知、供应链执行和生态广度仍然有价值。",
    },
    moatTags: ["Medium"],
    risks: {
      en: "Smartphone competition is brutal, margins can be thin, and investor expectations often move ahead of the company’s actual operating progress.",
      zh: "手机竞争非常激烈，利润率容易偏薄，而且市场预期常常会先于公司经营进展上升。",
    },
    riskTags: ["Competition", "Margin"],
    financials: {
      en: "The business has meaningful scale, but the key question is how much of that scale can convert into durable, high-quality earnings instead of volume alone.",
      zh: "公司已经有不小规模，但关键问题是这些规模能不能持续转化成高质量利润，而不只是销量。",
    },
    valuation: {
      en: "Xiaomi can look optically cheaper than premium global peers, but that discount exists for a reason: investors still want more proof on margin quality and durability.",
      zh: "小米看起来可能比全球高端消费科技龙头便宜，但这个折价有原因：市场仍然想看到更稳定的利润质量和耐久性证明。",
    },
    capitalAllocation: {
      en: "Capital allocation matters because Xiaomi needs to balance hardware reach, ecosystem expansion, and newer bets like EVs without letting returns get diluted.",
      zh: "资本配置很关键，因为小米需要在硬件扩张、生态布局和像汽车这样的新押注之间找到平衡，避免回报被摊薄。",
    },
    catalysts: {
      en: "The next leg likely depends on better monetization of the ecosystem, stronger margin proof, and evidence that new categories can add profit instead of only attention.",
      zh: "下一阶段更依赖生态变现改善、利润率证明增强，以及新品类是否能带来利润而不是只带来关注度。",
    },
    bullCase: {
      en: "The bull case is that Xiaomi keeps converting scale into a broader consumer-tech platform, with ecosystem monetization and newer categories lifting quality over time.",
      zh: "多头逻辑是：小米持续把规模转成更广的消费科技平台，生态变现和新品类让它的盈利质量逐步抬升。",
    },
    bearCase: {
      en: "The bear case is that Xiaomi remains easier to admire than to underwrite, because competition is fierce and margin durability is still not fully proven.",
      zh: "空头逻辑是：小米也许更容易让人欣赏，而不是让人下重注，因为竞争太激烈，而利润率耐久性还没有被充分证明。",
    },
    mindChange: {
      en: "What would change my mind is sustained proof that Xiaomi can improve margin quality while expanding into new categories without diluting returns.",
      zh: "会让我改观的是：小米能持续证明自己在拓新品类的同时提升利润质量，而不是把回报率稀释掉。",
    },
    peers: [
      { ticker: "1810.HK", company: "Xiaomi", growth: "Mid", margin: "Medium", moat: "Medium", take: { en: "Current subject", zh: "当前分析对象" }, subject: true },
      { ticker: "AAPL", company: "Apple", growth: "Mid", margin: "Very high", moat: "Strong", take: { en: "Higher quality benchmark", zh: "更高质量对照组" } },
      { ticker: "BYDDF", company: "BYD", growth: "High", margin: "Medium", moat: "Medium", take: { en: "Broader hardware execution", zh: "硬件执行更强" } },
      { ticker: "TSLA", company: "Tesla", growth: "Mid", margin: "Medium", moat: "Medium", take: { en: "Different narrative premium", zh: "不同叙事溢价" } },
    ],
    source: "sample",
  },
};

const TICKER_INPUT_ALIASES = {
  aapl: "AAPL",
  apple: "AAPL",
  苹果: "AAPL",
  nvda: "NVDA",
  nvidia: "NVDA",
  英伟达: "NVDA",
  msft: "MSFT",
  microsoft: "MSFT",
  微软: "MSFT",
  tsla: "TSLA",
  tesla: "TSLA",
  特斯拉: "TSLA",
  xiaomi: "1810.HK",
  xiaomicorporation: "1810.HK",
  小米: "1810.HK",
  小米集团: "1810.HK",
  小米集团公司: "1810.HK",
  "1810": "1810.HK",
  "1810hk": "1810.HK",
  "1810.hk": "1810.HK",
  xiacy: "1810.HK",
  xiacf: "1810.HK",
};

function normalizeAliasKey(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[-_/]/g, "")
    .replace(/[()]/g, "");
}

export function resolveTickerInput(input) {
  const raw = String(input || "").trim();
  const alias = TICKER_INPUT_ALIASES[normalizeAliasKey(raw)];
  return alias || raw.toUpperCase();
}
