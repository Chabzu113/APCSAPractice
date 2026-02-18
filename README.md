# AP CS A Practice Platform

A free, self-contained AP Computer Science A practice platform inspired by [oneprep.xyz](https://oneprep.xyz). No backend, no install — just open in a browser.

---

## Features

- **225+ MCQ questions** across all 4 official AP CS A units, sorted by Easy / Medium / Hard
- **20 FRQ prompts** including recreated College Board 2022, 2023, and 2024 free-response questions
- **5 full-length practice tests** — 42 MCQ (90 min) + 4 FRQ (90 min), exactly like the real AP exam
- **Detailed analytics** — accuracy by unit, difficulty, and topic; weakest areas highlighted
- **Progress tracking** via localStorage (no account needed)
- **Dark mode** support
- **4 Java problem set files** — standalone `.java` files you can fill in and run

---

## AP CS A Units Covered

| Unit | Title | Exam Weight |
|------|-------|-------------|
| 1 | Using Objects and Methods | 15–25% |
| 2 | Selection and Iteration | 25–35% |
| 3 | Class Creation | 10–18% |
| 4 | Data Collections | 30–40% |

---

## How to Use

### Option 1: Open Locally (Simplest)

Just open `index.html` in any modern browser:

```bash
open ~/Documents/Coding/APCSAPractice/index.html
# or on Windows:
# start index.html
```

> **Note:** Some browsers block local file `<script>` loading. If the question bank is empty, use Option 2.

### Option 2: Local HTTP Server (Recommended)

```bash
cd ~/Documents/Coding/APCSAPractice

# Python 3 (most systems have this)
python3 -m http.server 8080

# Then open:
# http://localhost:8080
```

### Option 3: GitHub Pages

1. Push this folder to a GitHub repository
2. Go to Settings → Pages → Source: main branch / root
3. Your site will be live at `https://yourusername.github.io/APCSAPractice`

---

## Java Problem Sets

Each file in `problems/` is standalone — compile and run with just `javac` and `java`.

```bash
cd ~/Documents/Coding/APCSAPractice/problems

# Compile and run any unit:
javac Unit1_UsingObjectsAndMethods.java && java Unit1_UsingObjectsAndMethods
javac Unit2_SelectionAndIteration.java  && java Unit2_SelectionAndIteration
javac Unit3_ClassCreation.java          && java Unit3_ClassCreation
javac Unit4_DataCollections.java        && java Unit4_DataCollections
```

Fill in the `// TODO` sections in each file, then re-run to check your output against the expected values.

**Requires:** Java 8 or higher (`java -version` to check)

---

## Practice Test Format

Each full-length test mirrors the real AP CS A exam:

| Section | Format | Time |
|---------|--------|------|
| Section I | 42 Multiple Choice | 90 minutes |
| (Break) | — | 10 minutes |
| Section II | 4 Free Response | 90 minutes |

**FRQ scoring:** FRQs are self-graded using the rubric shown in the review screen (same approach as the real AP exam).

**AP Score estimation:**
| Composite % | AP Score |
|-------------|----------|
| 70%+ | 5 |
| 55–69% | 4 |
| 40–54% | 3 |
| 25–39% | 2 |
| <25% | 1 |

---

## File Structure

```
APCSAPractice/
├── index.html              # Dashboard
├── question-bank.html      # Question bank with filters
├── practice-test.html      # Full-length test runner
├── review.html             # Post-test review + FRQ self-grading
├── results.html            # Analytics & progress
├── css/
│   ├── styles.css          # Global styles, dark mode
│   └── components.css      # Cards, badges, buttons, etc.
├── js/
│   ├── app.js              # State management, localStorage, utilities
│   ├── questionBank.js     # Question bank filter/render logic
│   ├── testRunner.js       # Test session logic
│   ├── review.js           # Review page logic
│   ├── results.js          # Analytics page logic
│   ├── scoring.js          # Score calculation
│   └── data/
│       ├── mcq_u1u2.js     # MCQ bank: Units 1 & 2 (115 questions)
│       ├── mcq_u3u4.js     # MCQ bank: Units 3 & 4 (110 questions)
│       ├── frq.js          # FRQ bank (20 prompts)
│       └── tests.js        # Practice test definitions (5 tests)
└── problems/
    ├── Unit1_UsingObjectsAndMethods.java
    ├── Unit2_SelectionAndIteration.java
    ├── Unit3_ClassCreation.java
    └── Unit4_DataCollections.java
```

---

## Resetting Progress

Click **"Reset All Progress"** on the Results page, or run in your browser console:

```js
localStorage.removeItem('apcsa_state');
location.reload();
```

---

## Disclaimer

AP® is a registered trademark of College Board. This platform is not affiliated with or endorsed by College Board. FRQ prompts recreated from publicly available College Board materials are used for educational, non-commercial purposes.
