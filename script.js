let rules = [];

window.onload = function() {
  loadRules();
  startEngine();
};

function addRule() {
  const name = document.getElementById("ruleName").value;
  const trigger = document.getElementById("triggerType").value;
  const condition = document.getElementById("conditionType").value;
  const action = document.getElementById("actionType").value;

  const rule = {
    id: Date.now(),
    name,
    trigger,
    condition,
    action,
    enabled: true
  };

  rules.push(rule);
  saveRules();
  displayRules();
}

function saveRules() {
  localStorage.setItem("rules", JSON.stringify(rules));
}

function loadRules() {
  const data = localStorage.getItem("rules");
  if (data) {
    rules = JSON.parse(data);
  }
  displayRules();
}

function displayRules() {
  const container = document.getElementById("rulesList");
  container.innerHTML = "";

  rules.forEach(rule => {
    const div = document.createElement("div");
    div.className = "rule-item";

    div.innerHTML = `
      <strong>${rule.name}</strong><br>
      Trigger: ${rule.trigger} |
      Condition: ${rule.condition} |
      Action: ${rule.action}
      <br>
      <button onclick="toggleRule(${rule.id})">
        ${rule.enabled ? "Disable" : "Enable"}
      </button>
      <button onclick="deleteRule(${rule.id})">Delete</button>
      <div class="log" id="log-${rule.id}"></div>
    `;

    container.appendChild(div);
  });
}

function toggleRule(id) {
  rules = rules.map(rule =>
    rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
  );
  saveRules();
  displayRules();
}

function deleteRule(id) {
  rules = rules.filter(rule => rule.id !== id);
  saveRules();
  displayRules();
}

function evaluateCondition(condition) {
  const hour = new Date().getHours();

  if (condition === "morning") return hour < 12;
  if (condition === "evening") return hour >= 17;
  return true;
}

function executeAction(rule) {
  if (rule.action === "alert") {
    alert(`Rule Triggered: ${rule.name}`);
  }

  if (rule.action === "console") {
    console.log(`Rule Triggered: ${rule.name}`);
  }

  if (rule.action === "background") {
    document.body.style.background =
      "#" + Math.floor(Math.random()*16777215).toString(16);
  }

  const logDiv = document.getElementById(`log-${rule.id}`);
  if (logDiv) {
    logDiv.innerText = "Executed at " + new Date().toLocaleTimeString();
  }
}

function startEngine() {
  setInterval(() => {
    rules.forEach(rule => {
      if (!rule.enabled) return;

      if (rule.trigger === "time") {
        if (evaluateCondition(rule.condition)) {
          executeAction(rule);
        }
      }
    });
  }, 5000);
}
