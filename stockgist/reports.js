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
    peers: [
      { ticker: "TSLA", company: "Tesla", growth: "Mid", margin: "Medium", moat: "Medium", take: { en: "Narrative heavy", zh: "叙事权重大" }, subject: true },
      { ticker: "BYDDF", company: "BYD", growth: "High", margin: "Medium", moat: "Medium", take: { en: "Execution threat", zh: "执行型对手" } },
      { ticker: "RIVN", company: "Rivian", growth: "Low", margin: "Weak", moat: "Weak", take: { en: "Far earlier stage", zh: "阶段更早" } },
      { ticker: "GM", company: "General Motors", growth: "Low", margin: "Medium", moat: "Weak", take: { en: "Cheaper but legacy", zh: "更便宜但更传统" } },
    ],
    source: "sample",
  },
};
