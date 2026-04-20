// Using 'var' (function-scoped, older way)
var oldGreeting = "Hello from var!";
// Using 'let' (block-scoped, modern)
let userName = "JavaScript Learner";
// Using 'const' (block-scoped, cannot be reassigned)
const PI = 3.14159;

// ========== STEP 3: Work with Different Data Types ==========
// Subtask 3.1: number, string, boolean, array, object
let age = 25;                // number
let message = "I love coding"; // string
let isActive = true;         // boolean
let skills = ["HTML", "CSS", "JavaScript"]; // array
let person = {               // object
  firstName: "Alex",
  lastName: "River",
  level: "Beginner"
};

// ========== STEP 4.1: Arithmetic Operators ==========
let num1 = 42;
let num2 = 7;
let sum = num1 + num2;
let difference = num1 - num2;
let product = num1 * num2;
let quotient = num1 / num2;

// ========== STEP 4.2: Comparison and Logical Operators ==========
let a = 10;
let b = 20;
let isEqual = (a === b);          // false (strict equality)
let isGreater = (a > b);          // false
let isLessOrEqual = (a <= b);     // true
let logicalAnd = (a > 5 && b < 30);  // true (both conditions true)
let logicalOr = (a > 15 || b < 25);   // true (b < 25 is true)
let logicalNot = !(a === b);          // true (since a===b is false)

// Using conditions with operators (if statements)
let comparisonResultMsg = "";
if (a < b && b > 0) {
  comparisonResultMsg = `✅ Condition met: ${a} is less than ${b} AND both are positive.`;
} else {
  comparisonResultMsg = `❌ Condition not met.`;
}

// ========== HELPER FUNCTION to display output on webpage ==========
// This satisfies "Display variable values in console or webpage"
function displayOnPage() {
  // ---- Variables section ----
  let variablesHtml = `
    <p><span class="badge">var</span> <strong>oldGreeting:</strong> "${oldGreeting}"</p>
    <p><span class="badge">let</span> <strong>userName:</strong> ${userName}</p>
    <p><span class="badge">const</span> <strong>PI:</strong> ${PI}</p>
    <hr>
    <h3>📌 Different Data Types:</h3>
    <p><strong>Number:</strong> age = ${age} (type: ${typeof age})</p>
    <p><strong>String:</strong> message = "${message}" (type: ${typeof message})</p>
    <p><strong>Boolean:</strong> isActive = ${isActive} (type: ${typeof isActive})</p>
    <p><strong>Array:</strong> skills = [${skills}] (type: ${typeof skills}) → but array is object</p>
    <p><strong>Object:</strong> person = { firstName: "${person.firstName}", lastName: "${person.lastName}", level: "${person.level}" } (type: ${typeof person})</p>
  `;
  document.getElementById("variables-output").innerHTML = variablesHtml;

  // ---- Operators section (Arithmetic + Comparison/Logical) ----
  let operatorsHtml = `
    <h3>➕ Arithmetic Operators</h3>
    <p>${num1} + ${num2} = <strong>${sum}</strong></p>
    <p>${num1} - ${num2} = <strong>${difference}</strong></p>
    <p>${num1} × ${num2} = <strong>${product}</strong></p>
    <p>${num1} ÷ ${num2} = <strong>${quotient}</strong></p>
    
    <h3>⚖️ Comparison & Logical Operators (with conditions)</h3>
    <p><code>${a} === ${b}</code> → ${isEqual} (strict equality)</p>
    <p><code>${a} > ${b}</code> → ${isGreater}</p>
    <p><code>${a} <= ${b}</code> → ${isLessOrEqual}</p>
    <p><code>(${a} > 5 && ${b} < 30)</code> → ${logicalAnd} (AND)</p>
    <p><code>(${a} > 15 || ${b} < 25)</code> → ${logicalOr} (OR)</p>
    <p><code>!(${a} === ${b})</code> → ${logicalNot} (NOT)</p>
    <p><strong>🔁 If-statement result:</strong> ${comparisonResultMsg}</p>
  `;
  document.getElementById("operators-output").innerHTML = operatorsHtml;

  // ---- typeof section (Subtask 3.2) ----
  let typeofHtml = `
    <pre>
typeof oldGreeting  → ${typeof oldGreeting}
typeof userName     → ${typeof userName}
typeof PI           → ${typeof PI}
typeof age          → ${typeof age}
typeof message      → ${typeof message}
typeof isActive     → ${typeof isActive}
typeof skills       → ${typeof skills}  (Note: arrays are objects in JS)
typeof person       → ${typeof person}
typeof num1         → ${typeof num1}
typeof sum          → ${typeof sum}
typeof comparisonResultMsg → ${typeof comparisonResultMsg}
    </pre>
    <p>💡 <strong>Explanation:</strong> <code>typeof</code> returns a string indicating the type of the operand.</p>
  `;
  document.getElementById("typeof-output").innerHTML = typeofHtml;
}

// ========== ALSO DISPLAY EVERYTHING IN CONSOLE ==========
// This satisfies: "Display variable values in console or webpage"
function logToConsole() {
  console.log("===== JavaScript Basics Lab Output =====");
  console.log("--- Variables (var, let, const) ---");
  console.log("var oldGreeting:", oldGreeting);
  console.log("let userName:", userName);
  console.log("const PI:", PI);
  
  console.log("\n--- Data Types ---");
  console.log("age (number):", age, "-> type:", typeof age);
  console.log("message (string):", message, "-> type:", typeof message);
  console.log("isActive (boolean):", isActive, "-> type:", typeof isActive);
  console.log("skills (array):", skills, "-> type:", typeof skills);
  console.log("person (object):", person, "-> type:", typeof person);
  
  console.log("\n--- Arithmetic Operations ---");
  console.log(`${num1} + ${num2} =`, sum);
  console.log(`${num1} - ${num2} =`, difference);
  console.log(`${num1} * ${num2} =`, product);
  console.log(`${num1} / ${num2} =`, quotient);
  
  console.log("\n--- Comparison & Logical Operators ---");
  console.log(`${a} === ${b} :`, isEqual);
  console.log(`${a} > ${b} :`, isGreater);
  console.log(`${a} <= ${b} :`, isLessOrEqual);
  console.log(`(${a} > 5 && ${b} < 30) :`, logicalAnd);
  console.log(`(${a} > 15 || ${b} < 25) :`, logicalOr);
  console.log(`!(${a} === ${b}) :`, logicalNot);
  console.log("If-statement result:", comparisonResultMsg);
  
  console.log("\n--- typeof Operator Examples ---");
  console.log("typeof oldGreeting:", typeof oldGreeting);
  console.log("typeof age:", typeof age);
  console.log("typeof skills:", typeof skills);
  console.log("typeof person:", typeof person);
  console.log("===== End of Console Output =====\n");
}

// Call both functions when the page loads
displayOnPage();
logToConsole();