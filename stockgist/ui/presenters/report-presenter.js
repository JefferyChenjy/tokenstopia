function makeTag(label, tone) {
  const span = document.createElement("span");
  span.className = `tag ${tone}`;
  span.textContent = label;
  return span;
}

function toneForTag(label) {
  const lowered = label.toLowerCase();
  if (lowered.includes("strong") || lowered.includes("quality")) return "green";
  if (
    lowered.includes("weak") ||
    lowered.includes("competition") ||
    lowered.includes("regulation") ||
    lowered.includes("growth") ||
    lowered.includes("leverage") ||
    lowered.includes("volatility")
  ) {
    return "red";
  }
  return "yellow";
}

function renderComparisonRows({ comparisonBodyEl, language, peers }) {
  comparisonBodyEl.textContent = "";
  peers.forEach((peer) => {
    const row = document.createElement("tr");
    if (peer.subject) row.classList.add("subject");
    row.innerHTML = `
      <td>
        <span class="company-main">${peer.ticker}</span>
        <span class="company-sub">${peer.company}</span>
      </td>
      <td>${peer.growth}</td>
      <td>${peer.margin}</td>
      <td>${peer.moat}</td>
      <td>${peer.take[language]}</td>
    `;
    comparisonBodyEl.appendChild(row);
  });
}

export function renderReportPresentation({ report, language, t, elements }) {
  const {
    analysisSectionEl,
    comparisonSectionEl,
    analysisTitleEl,
    analysisMetaEl,
    verdictCardEl,
    verdictIconEl,
    verdictTitleEl,
    verdictDescriptionEl,
    businessModelEl,
    competitiveMoatEl,
    moatTagsEl,
    keyRisksEl,
    riskTagsEl,
    financialHealthEl,
    comparisonBodyEl,
  } = elements;

  analysisSectionEl.classList.remove("hidden");
  comparisonSectionEl.classList.toggle("hidden", !report.peers?.length);

  analysisTitleEl.textContent = `${report.ticker} · ${report.company}`;
  analysisMetaEl.textContent = report.source === "live" ? t("liveMeta") : t("sampleMeta");

  verdictCardEl.className = `verdict-card ${report.verdictClass}`;
  verdictIconEl.textContent = report.verdictIcon;
  verdictTitleEl.textContent = report.verdictTitle[language];
  verdictDescriptionEl.textContent = report.verdictDescription[language];

  businessModelEl.textContent = report.businessModel[language];
  competitiveMoatEl.textContent = report.moat[language];
  keyRisksEl.textContent = report.risks[language];
  financialHealthEl.textContent = report.financials[language];

  moatTagsEl.textContent = "";
  (report.moatTags || []).forEach((tag) => moatTagsEl.appendChild(makeTag(tag, toneForTag(tag))));

  riskTagsEl.textContent = "";
  (report.riskTags || []).forEach((tag) => riskTagsEl.appendChild(makeTag(tag, toneForTag(tag))));

  if (report.peers?.length) {
    renderComparisonRows({ comparisonBodyEl, language, peers: report.peers });
  }
}
