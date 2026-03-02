let rules = [];

// Add Rule
function addRule() {
  const name = document.getElementById("ruleName").value;
  const trigger = document.getElementById("triggerType").value;
  const action = document.getElementById("actionType").value;

  const rule = {
    id: Date.now(),
    name: name,
    trigger: trigger,
    action: action,
    enabled: true
  };

  rules.push(rule);
  saveRules();
  displayRules();
}

// Save rules to local storage
function saveRules() {
  localStorage.setItem("rules", JSON.stringify(rules));
}

// Load rules
function loadRules() {
  const data = localStorage.getItem("rules");
  if (data) {
    rules = JSON.parse(data);
  }
  displayRules();
}

// Show rules on UI
function displayRules() {
  const list = document.getElementById("ruleList");
  list.innerHTML = "";

  rules.forEach(rule => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${rule.name} - Trigger: ${rule.trigger} - Action: ${rule.action}
      <button onclick="runRule(${rule.id})">Run</button>
      <button onclick="deleteRule(${rule.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

// Execute rule
function runRule(id) {
  const rule = rules.find(r => r.id === id);

  if (!rule.enabled) return;

  if (rule.action === "alert") {
    alert("Rule Executed: " + rule.name);
  }

  if (rule.action === "log") {
    console.log("Rule Executed: " + rule.name);
    alert("Check console log");
  }
}

// Delete rule
function deleteRule(id) {
  rules = rules.filter(r => r.id !== id);
  saveRules();
  displayRules();
}

// Load when app starts
loadRules();
