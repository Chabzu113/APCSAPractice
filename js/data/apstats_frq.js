var APSTATS_FRQ = [
  {
    "id": "stats_u2_frq_001",
    "subject": "apstats",
    "units": [
      2
    ],
    "topic": "Correlation and Causation",
    "topicLabel": "Correlation and Causation",
    "title": "Correlation and Causation",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A study finds a strong positive correlation (r = 0.88) between the number of air conditioners per household and the number of cases of heatstroke in a city.",
    "parts": [
      {
        "label": "a",
        "question": "Does this mean that air conditioners cause heatstroke? Explain.",
        "rubric": "No, correlation does not imply causation. A lurking variable, such as high outdoor temperature, likely causes both an increase in AC usage and an increase in heatstroke cases.\n\nChecklist: States 'Correlation ≠ Causation' | Identifies a plausible lurking variable | Explains the logic"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "No, correlation does not imply causation. A lurking variable, such as high outdoor temperature, likely causes both an increase in AC usage and an increase in heatstroke cases.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "correlation ≠ causation",
          "a plausible lurking variable",
          "the logic",
          "correlation does not imply causation",
          "lurking variable",
          "correlation",
          "plausible",
          "causation"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u2_frq_002",
    "subject": "apstats",
    "units": [
      2
    ],
    "topic": "Interpreting LSRL",
    "topicLabel": "Interpreting LSRL",
    "title": "Interpreting LSRL",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "The regression equation for predicting the weight (y, in lbs) of a dog based on its age (x, in weeks) is y-hat = 5.2 + 1.4x.",
    "parts": [
      {
        "label": "a",
        "question": "Interpret the slope of the regression line in context.",
        "rubric": "For every 1 week increase in the dog's age, the weight is predicted to increase by 1.4 lbs.\n\nChecklist: Uses 'predicted' or 'estimated' | Correct slope value | Correct units (weeks/lbs)"
      },
      {
        "label": "b",
        "question": "Interpret the y-intercept. Does it have a meaningful interpretation here?",
        "rubric": "The y-intercept (5.2) represents the predicted weight of a dog that is 0 weeks old (birth weight). This is a meaningful interpretation in this context.\n\nChecklist: Predicted value at x=0 | Context of birth weight | Evaluation of meaningfulness"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "For every 1 week increase in the dog's age, the weight is predicted to increase by 1.4 lbs.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "predicted",
          "estimated",
          "slope value",
          "units (weeks/lbs)",
          "slope"
        ]
      },
      {
        "points": 1,
        "description": "The y-intercept (5.2) represents the predicted weight of a dog that is 0 weeks old (birth weight). This is a meaningful interpretation in this context.",
        "partLabel": "b",
        "skill": "describe",
        "keywords": [
          "predicted value at x=0",
          "context of birth weight",
          "evaluation of meaningfulness",
          "predicted value",
          "y-intercept",
          "predicted"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u2_frq_003",
    "subject": "apstats",
    "units": [
      2
    ],
    "topic": "Residual Plot and Linearity",
    "topicLabel": "Residual Plot and Linearity",
    "title": "Residual Plot and Linearity",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A researcher fits a linear model to data. The residual plot shows a clear U-shaped pattern.",
    "parts": [
      {
        "label": "a",
        "question": "Is a linear model appropriate for this data? Justify your answer.",
        "rubric": "No, a linear model is not appropriate. A residual plot should show a random scatter of points if a linear model is a good fit. The U-shaped pattern indicates that the relationship is actually non-linear.\n\nChecklist: States 'Not Appropriate' | Mentions random scatter requirement | Identifies pattern in plot"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "No, a linear model is not appropriate. A residual plot should show a random scatter of points if a linear model is a good fit. The U-shaped pattern indicates that the relationship is actually non-linear.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "not appropriate",
          "random scatter requirement",
          "pattern in plot",
          "random scatter",
          "residual plot",
          "residual",
          "linear",
          "random"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u2_frq_004",
    "subject": "apstats",
    "units": [
      2
    ],
    "topic": "Influential Points",
    "topicLabel": "Influential Points",
    "title": "Influential Points",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A scatterplot shows a cluster of points with a weak positive correlation. An outlier is added at (100, 100), far to the right of the other data points but exactly on the original regression line.",
    "parts": [
      {
        "label": "a",
        "question": "What effect will this outlier have on the correlation coefficient (r) and the slope of the regression line?",
        "rubric": "The correlation coefficient (r) will increase (become closer to 1) because the point follows the linear trend but is far away, strengthening the linear perception. The slope will remain roughly the same since the point falls on the existing line.\n\nChecklist: r increases | Slope remains same | Explanation of influential point"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The correlation coefficient (r) will increase (become closer to 1) because the point follows the linear trend but is far away, strengthening the linear perception. The slope will remain roughly the same since the point falls on the existing line.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "r increases",
          "slope remains same",
          "explanation of influential point",
          "correlation coefficient",
          "influential point",
          "correlation",
          "roughly",
          "linear",
          "slope"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u3_frq_001",
    "subject": "apstats",
    "units": [
      3
    ],
    "topic": "Sampling Methods",
    "topicLabel": "Sampling Methods",
    "title": "Sampling Methods",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A city council wants to know the residents' opinions on a new park. They divide the city into 10 geographic districts and randomly select 2 districts. They then interview every resident in those 2 districts.",
    "parts": [
      {
        "label": "a",
        "question": "Identify the sampling method used and explain why this might be more practical than a Simple Random Sample (SRS).",
        "rubric": "This is a cluster sample. It is more practical because it reduces travel time and costs for the researchers, as they only need to visit two specific areas rather than individuals scattered across the entire city.\n\nChecklist: Identify Cluster Sample | Practicality (Cost/Time) | Context of city districts"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "This is a cluster sample. It is more practical because it reduces travel time and costs for the researchers, as they only need to visit two specific areas rather than individuals scattered across the entire city.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "identify cluster sample",
          "practicality (cost/time)",
          "context of city districts",
          "cluster sample",
          "sample"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u3_frq_002",
    "subject": "apstats",
    "units": [
      3
    ],
    "topic": "Experimental Design (Blocking)",
    "topicLabel": "Experimental Design (Blocking)",
    "title": "Experimental Design (Blocking)",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A researcher wants to test a new blood pressure medication. They have 100 volunteers: 60 men and 40 women. They suspect that the medication might affect men and women differently.",
    "parts": [
      {
        "label": "a",
        "question": "Describe a randomized block design for this experiment.",
        "rubric": "First, group the volunteers into two blocks based on gender (60 men, 40 women). Within the block of men, randomly assign 30 to the new medication and 30 to a placebo. Within the block of women, randomly assign 20 to the medication and 20 to the placebo. Compare the change in blood pressure within each block.\n\nChecklist: Block by gender | Random assignment within blocks | Correct group sizes | Comparison mentioned"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "First, group the volunteers into two blocks based on gender (60 men, 40 women). Within the block of men, randomly assign 30 to the new medication and 30 to a placebo. Within the block of women, randomly assign 20 to the medication and 20 to the placebo. Compare the change in blood pressure within each block.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "block by gender",
          "random assignment within blocks",
          "group sizes",
          "comparison mentioned",
          "random assignment",
          "placebo",
          "random"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u3_frq_003",
    "subject": "apstats",
    "units": [
      3
    ],
    "topic": "Matched Pairs",
    "topicLabel": "Matched Pairs",
    "title": "Matched Pairs",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "An educator wants to test a new reading program. They select 20 students and give them a pre-test. After 4 weeks of the program, they give the same 20 students a post-test.",
    "parts": [
      {
        "label": "a",
        "question": "Explain why this matched pairs design is better than a completely randomized design using 40 students (20 in a control group, 20 in the program).",
        "rubric": "The matched pairs design reduces variability by controlling for individual differences in reading ability. Each student acts as their own control, so the researcher can see the specific improvement for each person rather than comparing different people with different starting levels.\n\nChecklist: Reduced variability | Individual control | Comparison of different students vs. self"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The matched pairs design reduces variability by controlling for individual differences in reading ability. Each student acts as their own control, so the researcher can see the specific improvement for each person rather than comparing different people with different starting levels.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "reduced variability",
          "individual control",
          "comparison of different students vs. self",
          "matched pairs",
          "variability",
          "control"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u3_frq_004",
    "subject": "apstats",
    "units": [
      3
    ],
    "topic": "Bias Identification",
    "topicLabel": "Bias Identification",
    "title": "Bias Identification",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A university sends a survey to all 5,000 alumni via email asking about their satisfaction with their education. 450 alumni respond.",
    "parts": [
      {
        "label": "a",
        "question": "Identify the type of bias present and explain how it might influence the results.",
        "rubric": "This is voluntary response bias. Alumni who had either extremely positive or extremely negative experiences are more likely to respond. This means the 450 respondents may not represent the true satisfaction level of the entire 5,000 alumni population.\n\nChecklist: Identify Voluntary Response Bias | Explain mechanism (strong opinions) | Direction of bias"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "This is voluntary response bias. Alumni who had either extremely positive or extremely negative experiences are more likely to respond. This means the 450 respondents may not represent the true satisfaction level of the entire 5,000 alumni population.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "identify voluntary response bias",
          "mechanism",
          "direction of bias",
          "voluntary response bias",
          "response bias",
          "population",
          "response",
          "bias"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u3_frq_005",
    "subject": "apstats",
    "units": [
      3
    ],
    "topic": "Principles of Design",
    "topicLabel": "Principles of Design",
    "title": "Principles of Design",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "List the four fundamental principles of experimental design and briefly explain the purpose of 'control'.",
    "parts": [
      {
        "label": "a",
        "question": "Identify the 4 principles and the purpose of control.",
        "rubric": "The four principles are Comparison, Randomization, Replication, and Control. The purpose of control is to keep other variables constant so they do not become confounding variables that interfere with the treatment effect.\n\nChecklist: Comparison/Random/Replication/Control | Confounding variable mention | Constant environment"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The four principles are Comparison, Randomization, Replication, and Control. The purpose of control is to keep other variables constant so they do not become confounding variables that interfere with the treatment effect.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "comparison/random/replication/control",
          "confounding variable mention",
          "constant environment",
          "confounding variable",
          "randomization",
          "confounding",
          "replication",
          "control",
          "random"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u3_frq_006",
    "subject": "apstats",
    "units": [
      3
    ],
    "topic": "Confounding vs. Blinding",
    "topicLabel": "Confounding vs. Blinding",
    "title": "Confounding vs. Blinding",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "In a study of a new study-aid pill, students were allowed to choose whether they took the pill or a placebo. Those who took the pill reported higher focus.",
    "parts": [
      {
        "label": "a",
        "question": "Explain why the results of this study are invalid.",
        "rubric": "Because students chose their treatment, there is no random assignment. A confounding variable, such as motivation, might exist: students who are already more motivated to succeed might be the ones choosing the pill, and their motivation (not the pill) caused the focus.\n\nChecklist: No random assignment | Confounding variable identification | Cause-and-effect link broken"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Because students chose their treatment, there is no random assignment. A confounding variable, such as motivation, might exist: students who are already more motivated to succeed might be the ones choosing the pill, and their motivation (not the pill) caused the focus.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "no random assignment",
          "confounding variable identification",
          "cause-and-effect link broken",
          "confounding variable",
          "random assignment",
          "confounding",
          "random"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u3_frq_007",
    "subject": "apstats",
    "units": [
      3
    ],
    "topic": "Observational Study",
    "topicLabel": "Observational Study",
    "title": "Observational Study",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "Identify the difference between an observational study and an experiment.",
    "parts": [
      {
        "label": "a",
        "question": "Define both and explain which can establish causation.",
        "rubric": "An observational study observes individuals without imposing a treatment, while an experiment deliberately imposes a treatment. Only an experiment with random assignment can establish a cause-and-effect relationship.\n\nChecklist: Observational definition | Experiment definition | Causation/Random assignment link"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "An observational study observes individuals without imposing a treatment, while an experiment deliberately imposes a treatment. Only an experiment with random assignment can establish a cause-and-effect relationship.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "observational definition",
          "experiment definition",
          "causation/random assignment link",
          "observational study",
          "random assignment",
          "experiment",
          "causation",
          "random"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u3_frq_008",
    "subject": "apstats",
    "units": [
      3
    ],
    "topic": "Scope of Inference",
    "topicLabel": "Scope of Inference",
    "title": "Scope of Inference",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A researcher uses 50 volunteers from a local gym to test a new muscle recovery drink. They use random assignment to give 25 the drink and 25 a placebo.",
    "parts": [
      {
        "label": "a",
        "question": "Describe the scope of inference for this study.",
        "rubric": "Because random assignment was used, the researcher can infer cause-and-effect for the participants. However, because the participants were volunteers from a specific gym (not a random sample of a population), the results can only be generalized to people similar to the volunteers (active gym-goers).\n\nChecklist: Causation established | Generalization limited | Volunteers vs. Population"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Because random assignment was used, the researcher can infer cause-and-effect for the participants. However, because the participants were volunteers from a specific gym (not a random sample of a population), the results can only be generalized to people similar to the volunteers (active gym-goers).",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "causation established",
          "generalization limited",
          "volunteers vs. population",
          "random assignment",
          "population",
          "causation",
          "sample",
          "random"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u4_frq_001",
    "subject": "apstats",
    "units": [
      4
    ],
    "topic": "Probability Rules",
    "topicLabel": "Probability Rules",
    "title": "Probability Rules",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "At a school, 60% of students take Math, 40% take Science, and 20% take both.",
    "parts": [
      {
        "label": "a",
        "question": "What is the probability that a randomly selected student takes Math or Science? Are the events independent?",
        "rubric": "P(M or S) = 0.6 + 0.4 - 0.2 = 0.8. They are NOT independent because P(M)*P(S) = 0.24, which does not equal P(M and S) = 0.20.\n\nChecklist: Addition Rule (0.8) | Independence Test formula | Correct Conclusion"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "P(M or S) = 0.6 + 0.4 - 0.2 = 0.8. They are NOT independent because P(M)*P(S) = 0.24, which does not equal P(M and S) = 0.20.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "addition rule (0.8)",
          "independence test formula",
          "conclusion",
          "addition rule",
          "independence"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u4_frq_002",
    "subject": "apstats",
    "units": [
      4
    ],
    "topic": "Conditional Probability",
    "topicLabel": "Conditional Probability",
    "title": "Conditional Probability",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "In a factory, Machine A produces 70% of parts (2% defective) and Machine B produces 30% (5% defective).",
    "parts": [
      {
        "label": "a",
        "question": "If a part is found to be defective, what is the probability it came from Machine B?",
        "rubric": "P(Def) = (0.7*0.02) + (0.3*0.05) = 0.014 + 0.015 = 0.029. P(B|Def) = 0.015 / 0.029 ≈ 0.517.\n\nChecklist: Total probability calculation | Bayes' Theorem/Conditional formula | Final probability"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "P(Def) = (0.7*0.02) + (0.3*0.05) = 0.014 + 0.015 = 0.029. P(B|Def) = 0.015 / 0.029 ≈ 0.517.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "total probability calculation",
          "bayes' theorem/conditional formula",
          "final probability",
          "probability"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u4_frq_003",
    "subject": "apstats",
    "units": [
      4
    ],
    "topic": "Combining Random Variables",
    "topicLabel": "Combining Random Variables",
    "title": "Combining Random Variables",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "The weight of a burger (X) has mean 0.5 lbs and SD 0.05. The weight of the bun (Y) has mean 0.2 lbs and SD 0.02. X and Y are independent.",
    "parts": [
      {
        "label": "a",
        "question": "Find the mean and standard deviation of the total weight of the burger and bun.",
        "rubric": "Mean(X+Y) = 0.5 + 0.2 = 0.7 lbs. SD(X+Y) = sqrt(0.05^2 + 0.02^2) = sqrt(0.0025 + 0.0004) ≈ 0.0539 lbs.\n\nChecklist: Add means | Add variances (not SDs) | Square root of sum | Units (lbs)"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Mean(X+Y) = 0.5 + 0.2 = 0.7 lbs. SD(X+Y) = sqrt(0.05^2 + 0.02^2) = sqrt(0.0025 + 0.0004) ≈ 0.0539 lbs.",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": [
          "add means",
          "add variances (not sds)",
          "square root of sum",
          "units (lbs)",
          "mean"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u4_frq_004",
    "subject": "apstats",
    "units": [
      4
    ],
    "topic": "Discrete Random Variables",
    "topicLabel": "Discrete Random Variables",
    "title": "Discrete Random Variables",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A game pays $10 with prob 0.1, $5 with prob 0.3, and $0 with prob 0.6.",
    "parts": [
      {
        "label": "a",
        "question": "Calculate the expected value and interpret it in the long run.",
        "rubric": "E(X) = (10*0.1) + (5*0.3) + (0*0.6) = 1 + 1.5 + 0 = $2.50. In the long run, if a player plays many times, they will average a gain of $2.50 per game.\n\nChecklist: E(X) Calculation | Long-run interpretation | Units ($)"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "E(X) = (10*0.1) + (5*0.3) + (0*0.6) = 1 + 1.5 + 0 = $2.50. In the long run, if a player plays many times, they will average a gain of $2.50 per game.",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": [
          "e(x) calculation",
          "long-run interpretation",
          "units ($)"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u4_frq_005",
    "subject": "apstats",
    "units": [
      4
    ],
    "topic": "Binomial Distribution",
    "topicLabel": "Binomial Distribution",
    "title": "Binomial Distribution",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "An archer hits the bullseye 80% of the time. They shoot 10 arrows.",
    "parts": [
      {
        "label": "a",
        "question": "What is the probability they hit the bullseye at least 8 times?",
        "rubric": "P(X >= 8) = P(8) + P(9) + P(10). Using binomial formula: 10C8(0.8^8)(0.2^2) + 10C9(0.8^9)(0.2^1) + 10C10(0.8^10)(0.2^0) ≈ 0.6778.\n\nChecklist: Binomial setting confirmed | At least logic (summing 8,9,10) | Calculation"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "P(X >= 8) = P(8) + P(9) + P(10). Using binomial formula: 10C8(0.8^8)(0.2^2) + 10C9(0.8^9)(0.2^1) + 10C10(0.8^10)(0.2^0) ≈ 0.6778.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "binomial setting confirmed",
          "at least logic (summing 8,9,10)",
          "calculation"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u4_frq_006",
    "subject": "apstats",
    "units": [
      4
    ],
    "topic": "Geometric Distribution",
    "topicLabel": "Geometric Distribution",
    "title": "Geometric Distribution",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A basketball player makes 75% of free throws. Let X be the number of shots until their first miss.",
    "parts": [
      {
        "label": "a",
        "question": "What is the probability their first miss occurs on the 4th shot?",
        "rubric": "P(Miss) = 0.25. P(Success) = 0.75. P(X=4) = (0.75)^3 * (0.25) ≈ 0.1055.\n\nChecklist: Geometric formula | Identify success/fail correctly | Calculation"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "P(Miss) = 0.25. P(Success) = 0.75. P(X=4) = (0.75)^3 * (0.25) ≈ 0.1055.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "geometric formula",
          "identify success/fail correctly",
          "calculation"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u4_frq_007",
    "subject": "apstats",
    "units": [
      4
    ],
    "topic": "Normal Approximation to Binomial",
    "topicLabel": "Normal Approximation to Binomial",
    "title": "Normal Approximation to Binomial",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "60% of people in a large city support a tax. In a sample of 400 people, find the probability that more than 250 support it.",
    "parts": [
      {
        "label": "a",
        "question": "Check conditions and use the Normal approximation.",
        "rubric": "np = 400(0.6) = 240, nq = 400(0.4) = 160. Both >= 10. mu = 240, sigma = sqrt(400*0.6*0.4) = 9.8. z = (250 - 240) / 9.8 = 1.02. P(Z > 1.02) ≈ 0.1539.\n\nChecklist: Condition check (np/nq) | Mean/SD of binomial | Z-score and area"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "np = 400(0.6) = 240, nq = 400(0.4) = 160. Both >= 10. mu = 240, sigma = sqrt(400*0.6*0.4) = 9.8. z = (250 - 240) / 9.8 = 1.02. P(Z > 1.02) ≈ 0.1539.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "condition check (np/nq)",
          "mean/sd of binomial",
          "z-score and area",
          "z-score",
          "sigma",
          "mean",
          "mu"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u4_frq_008",
    "subject": "apstats",
    "units": [
      4
    ],
    "topic": "Linear Transformations of Mean/SD",
    "topicLabel": "Linear Transformations of Mean/SD",
    "title": "Linear Transformations of Mean/SD",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A company sells boxes of cereal. X is the weight of the cereal (mean 500g, SD 10g). The empty box weighs 50g (SD 2g). The cost to ship is $0.05 per gram plus a $2 base fee.",
    "parts": [
      {
        "label": "a",
        "question": "Find the mean and SD of the shipping cost (C) for one full box.",
        "rubric": "Total Weight (W) = 550g, SD(W) = sqrt(10^2+2^2) = 10.2. Cost Mean = 0.05(550) + 2 = $29.50. Cost SD = 0.05 * 10.2 = $0.51.\n\nChecklist: Total weight mean/SD | Mean of linear transformation | SD of linear transformation (ignore +2)"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Total Weight (W) = 550g, SD(W) = sqrt(10^2+2^2) = 10.2. Cost Mean = 0.05(550) + 2 = $29.50. Cost SD = 0.05 * 10.2 = $0.51.",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": [
          "total weight mean/sd",
          "mean of linear transformation",
          "sd of linear transformation (ignore +2)",
          "linear",
          "mean"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u5_frq_001",
    "subject": "apstats",
    "units": [
      5
    ],
    "topic": "Parameter vs. Statistic",
    "topicLabel": "Parameter vs. Statistic",
    "title": "Parameter vs. Statistic",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A large high school has 3,000 students. The average SAT score for all students is 1150 with a standard deviation of 150. A counselor takes a random sample of 40 students and finds an average score of 1180.",
    "parts": [
      {
        "label": "a",
        "question": "Identify the population, the parameter of interest, and the statistic.",
        "rubric": "Population: All 3,000 students at the high school. Parameter: The true mean SAT score of all students ($mu = 1150$). Statistic: The mean SAT score of the sample of 40 students ($\bar{x} = 1180$).\n\nChecklist: Population identified | Parameter defined with $mu$ | Statistic defined with $\bar{x}$ | Context of SAT scores"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Population: All 3,000 students at the high school. Parameter: The true mean SAT score of all students ($mu = 1150$). Statistic: The mean SAT score of the sample of 40 students ($\bar{x} = 1180$).",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "population identified",
          "parameter defined with $mu$",
          "statistic defined with $\bar{x}$",
          "context of sat scores",
          "population",
          "statistic",
          "parameter",
          "sample",
          "mean",
          "mu"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u5_frq_002",
    "subject": "apstats",
    "units": [
      5
    ],
    "topic": "Sampling Distribution of x-bar",
    "topicLabel": "Sampling Distribution of x-bar",
    "title": "Sampling Distribution of x-bar",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "The time it takes for a specific chemical reaction to occur is normally distributed with a mean of 12 seconds and a standard deviation of 2 seconds. A scientist performs the reaction 9 times.",
    "parts": [
      {
        "label": "a",
        "question": "Describe the sampling distribution of the sample mean reaction time for samples of size n = 9.",
        "rubric": "The shape is approximately Normal because the population is Normal. The mean is $mu_{\bar{x}} = 12$ seconds. The standard deviation is $sigma_{\bar{x}} = sigma / sqrt{n} = 2 / sqrt{9} = 0.667$ seconds.\n\nChecklist: Shape (Normal) | Mean (12) | Standard Deviation (0.667) | Includes units"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The shape is approximately Normal because the population is Normal. The mean is $mu_{\bar{x}} = 12$ seconds. The standard deviation is $sigma_{\bar{x}} = sigma / sqrt{n} = 2 / sqrt{9} = 0.667$ seconds.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "shape (normal)",
          "mean (12)",
          "standard deviation (0.667)",
          "units",
          "approximately normal",
          "standard deviation",
          "approximately",
          "population",
          "sigma",
          "shape"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u5_frq_003",
    "subject": "apstats",
    "units": [
      5
    ],
    "topic": "Central Limit Theorem (CLT)",
    "topicLabel": "Central Limit Theorem (CLT)",
    "title": "Central Limit Theorem (CLT)",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "The amount of money people spend on groceries per week is highly skewed to the right with a mean of $150 and a standard deviation of $30. A random sample of 50 people is taken.",
    "parts": [
      {
        "label": "a",
        "question": "Explain why the sampling distribution of the sample mean is approximately Normal despite the population being skewed.",
        "rubric": "According to the Central Limit Theorem, since the sample size is large ($n = 50 ge 30$), the sampling distribution of the sample mean ($\bar{x}$) will be approximately Normal regardless of the shape of the population distribution.\n\nChecklist: States CLT | Cites $n ge 30$ condition | Mentions shape becomes Normal | Context of grocery spending"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "According to the Central Limit Theorem, since the sample size is large ($n = 50 ge 30$), the sampling distribution of the sample mean ($\bar{x}$) will be approximately Normal regardless of the shape of the population distribution.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "states clt",
          "cites $n ge 30$ condition",
          "shape becomes normal",
          "context of grocery spending",
          "sampling distribution of the sample mean",
          "central limit theorem",
          "sampling distribution",
          "approximately normal",
          "approximately",
          "sample mean"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u5_frq_004",
    "subject": "apstats",
    "units": [
      5
    ],
    "topic": "Sampling Distribution of p-hat",
    "topicLabel": "Sampling Distribution of p-hat",
    "title": "Sampling Distribution of p-hat",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A credit card company claims that 20% of its customers miss at least one payment per year. A random sample of 100 customers is selected.",
    "parts": [
      {
        "label": "a",
        "question": "Check the conditions for the sampling distribution of the sample proportion ($hat{p}$) to be approximately Normal.",
        "rubric": "The 'Large Counts' condition must be met: $np = 100(0.20) = 20$ and $n(1-p) = 100(0.80) = 80$. Since both $20 ge 10$ and $80 ge 10$, the distribution is approximately Normal.\n\nChecklist: Check $np ge 10$ | Check $n(1-p) ge 10$ | Conclude Normal shape"
      },
      {
        "label": "b",
        "question": "Calculate the probability that more than 25% of the customers in the sample missed a payment.",
        "rubric": "Mean = 0.20. $SD = sqrt{(0.2 cdot 0.8) / 100} = 0.04$. $z = (0.25 - 0.20) / 0.04 = 1.25$. $P(Z > 1.25) approx 0.1056$.\n\nChecklist: Calculate SD of $hat{p}$ | Calculate z-score | Final probability"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The 'Large Counts' condition must be met: $np = 100(0.20) = 20$ and $n(1-p) = 100(0.80) = 80$. Since both $20 ge 10$ and $80 ge 10$, the distribution is approximately Normal.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "$np ge 10$",
          "$n(1-p) ge 10$",
          "conclude normal shape",
          "approximately normal",
          "approximately",
          "conclude",
          "shape"
        ]
      },
      {
        "points": 1,
        "description": "Mean = 0.20. $SD = sqrt{(0.2 cdot 0.8) / 100} = 0.04$. $z = (0.25 - 0.20) / 0.04 = 1.25$. $P(Z > 1.25) approx 0.1056$.",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": [
          "sd of $hat{p}$",
          "z-score",
          "final probability",
          "probability",
          "mean"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u5_frq_005",
    "subject": "apstats",
    "units": [
      5
    ],
    "topic": "Sample Size and Variability",
    "topicLabel": "Sample Size and Variability",
    "title": "Sample Size and Variability",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A researcher wants to estimate the mean weight of apples in an orchard. They are currently using a sample size of $n = 25$.",
    "parts": [
      {
        "label": "a",
        "question": "If the researcher wants to reduce the standard deviation of the sampling distribution by 75% (to one-fourth of its current value), what should the new sample size be?",
        "rubric": "The standard deviation of the mean is proportional to $1/sqrt{n}$. To divide the standard deviation by 4, the sample size must be multiplied by $4^2 = 16$. New $n = 25 cdot 16 = 400$.\n\nChecklist: Mention $1/sqrt{n}$ relationship | Factor of 16 identified | Correct new sample size (400)"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The standard deviation of the mean is proportional to $1/sqrt{n}$. To divide the standard deviation by 4, the sample size must be multiplied by $4^2 = 16$. New $n = 25 cdot 16 = 400$.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "$1/sqrt{n}$ relationship",
          "factor of 16 identified",
          "new sample size (400)",
          "standard deviation",
          "sample",
          "mean"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u5_frq_006",
    "subject": "apstats",
    "units": [
      5
    ],
    "topic": "Difference in Sample Means",
    "topicLabel": "Difference in Sample Means",
    "title": "Difference in Sample Means",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "Two separate populations of light bulbs have means of 1000 hours and 1100 hours, with standard deviations of 50 and 60 hours respectively. Random samples of 30 bulbs are taken from each.",
    "parts": [
      {
        "label": "a",
        "question": "Describe the sampling distribution of the difference in sample means ($\bar{x}_2 - \bar{x}_1$).",
        "rubric": "The shape is approximately Normal (both $n ge 30$). Mean $= 1100 - 1000 = 100$ hours. $SD = sqrt{50^2/30 + 60^2/30} = sqrt{83.33 + 120} approx 14.26$ hours.\n\nChecklist: Shape (Normal) | Mean (100) | Add variances formula | Correct SD (14.26)"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The shape is approximately Normal (both $n ge 30$). Mean $= 1100 - 1000 = 100$ hours. $SD = sqrt{50^2/30 + 60^2/30} = sqrt{83.33 + 120} approx 14.26$ hours.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "shape (normal)",
          "mean (100)",
          "add variances formula",
          "sd (14.26)",
          "approximately normal",
          "approximately",
          "shape",
          "mean"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u5_frq_007",
    "subject": "apstats",
    "units": [
      5
    ],
    "topic": "Difference in Sample Proportions",
    "topicLabel": "Difference in Sample Proportions",
    "title": "Difference in Sample Proportions",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "60% of students at School A like school lunch, while 50% at School B like it. Random samples of 100 students are taken from each school.",
    "parts": [
      {
        "label": "a",
        "question": "What is the probability that the proportion of students who like lunch in the sample from School B is actually higher than the proportion from School A?",
        "rubric": "Mean $= 0.5 - 0.6 = -0.1$. $SD = sqrt{(0.6 cdot 0.4)/100 + (0.5 cdot 0.5)/100} = sqrt{0.0024 + 0.0025} approx 0.07$. We want $P(hat{p}_B - hat{p}_A > 0)$. $z = (0 - (-0.1)) / 0.07 = 1.43$. $P(Z > 1.43) approx 0.0764$.\n\nChecklist: Mean of difference (-0.1) | SD of difference calculation | z-score calculation | Probability result"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Mean $= 0.5 - 0.6 = -0.1$. $SD = sqrt{(0.6 cdot 0.4)/100 + (0.5 cdot 0.5)/100} = sqrt{0.0024 + 0.0025} approx 0.07$. We want $P(hat{p}_B - hat{p}_A > 0)$. $z = (0 - (-0.1)) / 0.07 = 1.43$. $P(Z > 1.43) approx 0.0764$.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "mean of difference (-0.1)",
          "sd of difference calculation",
          "z-score calculation",
          "probability result",
          "probability",
          "z-score",
          "mean"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u5_frq_008",
    "subject": "apstats",
    "units": [
      5
    ],
    "topic": "Sampling Variation (Bias vs. Variability)",
    "topicLabel": "Sampling Variation (Bias vs. Variability)",
    "title": "Sampling Variation (Bias vs. Variability)",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "An archer shoots 100 arrows at a target. In Scenario 1, the arrows are all clustered 5 inches to the left of the bullseye. In Scenario 2, the arrows are centered on the bullseye but scattered across the entire target.",
    "parts": [
      {
        "label": "a",
        "question": "Which scenario represents high bias and low variability? Which represents low bias and high variability?",
        "rubric": "Scenario 1 represents high bias (the 'average' shot is off-center) and low variability (the shots are clustered). Scenario 2 represents low bias (the 'average' shot is the center) and high variability (the shots are spread out).\n\nChecklist: Scenario 1: High Bias/Low Var | Scenario 2: Low Bias/High Var | Clear explanation of terms"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Scenario 1 represents high bias (the 'average' shot is off-center) and low variability (the shots are clustered). Scenario 2 represents low bias (the 'average' shot is the center) and high variability (the shots are spread out).",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "scenario 1: high bias/low var",
          "scenario 2: low bias/high var",
          "clear explanation of terms",
          "variability",
          "spread",
          "center",
          "bias"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u6_frq_003",
    "subject": "apstats",
    "units": [
      6
    ],
    "topic": "Confidence Interval Interpretation",
    "topicLabel": "Confidence Interval Interpretation",
    "title": "Confidence Interval Interpretation",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A poll of 400 randomly selected residents in a city found that 120 support a new property tax. A 95% confidence interval for the true proportion of all residents who support the tax was calculated to be (0.255, 0.345).",
    "parts": [
      {
        "label": "a",
        "question": "Interpret the confidence level of 95% in the context of the study.",
        "rubric": "If we were to take many random samples of the same size (n=400) and calculate a 95% confidence interval for each, about 95% of those intervals would capture the true population proportion of residents who support the tax.\n\nChecklist: Refers to the process (many samples) | Mentions 'about 95%' | Context of residents/tax"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "If we were to take many random samples of the same size (n=400) and calculate a 95% confidence interval for each, about 95% of those intervals would capture the true population proportion of residents who support the tax.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "refers to the process (many samples)",
          "'about 95%'",
          "context of residents/tax",
          "population proportion",
          "confidence interval",
          "population",
          "capture",
          "random",
          "about"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u6_frq_004",
    "subject": "apstats",
    "units": [
      6
    ],
    "topic": "One-Sample z-test for Proportions",
    "topicLabel": "One-Sample z-test for Proportions",
    "title": "One-Sample z-test for Proportions",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A gardener believes that more than 70% of her seeds will germinate. She plants a random sample of 100 seeds and finds that 78 germinate.",
    "parts": [
      {
        "label": "a",
        "question": "Perform a significance test at the alpha = 0.05 level to determine if there is convincing evidence for the gardener's claim.",
        "rubric": "State: H0: p = 0.70; Ha: p > 0.70. Plan: One-sample z-test for p. Random (given), 10% (100 is < 10% of all seeds), Large Counts (100*0.7=70, 100*0.3=30 both >=10). Do: z = (0.78 - 0.70) / sqrt(0.7*0.3/100) = 1.746. P-value = 0.0404. Conclude: Since 0.0404 < 0.05, we reject the null. There is convincing evidence that more than 70% of seeds germinate.\n\nChecklist: Hypotheses with p | Named test | Conditions checked with p_0 | Z-stat and P-value | Conclusion in context"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "State: H0: p = 0.70; Ha: p > 0.70. Plan: One-sample z-test for p. Random (given), 10% (100 is < 10% of all seeds), Large Counts (100*0.7=70, 100*0.3=30 both >=10). Do: z = (0.78 - 0.70) / sqrt(0.7*0.3/100) = 1.746. P-value = 0.0404. Conclude: Since 0.0404 < 0.05, we reject the null. There is convincing evidence that more than 70% of seeds germinate.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "hypotheses with p",
          "named test",
          "conditions checked with p_0",
          "z-stat and p-value",
          "conclusion in context",
          "convincing evidence",
          "in context",
          "conditions",
          "conclude",
          "evidence"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u6_frq_005",
    "subject": "apstats",
    "units": [
      6
    ],
    "topic": "Two-Sample z-interval for Proportions",
    "topicLabel": "Two-Sample z-interval for Proportions",
    "title": "Two-Sample z-interval for Proportions",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A researcher wants to compare the proportion of teenagers who own a smartphone in 2020 vs. 2024. In 2020, 160 out of 200 surveyed owned one. In 2024, 185 out of 200 surveyed owned one.",
    "parts": [
      {
        "label": "a",
        "question": "Construct a 90% confidence interval for the difference in proportions (p2024 - p2020).",
        "rubric": "p1-hat = 0.80, p2-hat = 0.925. SE = sqrt(0.8*0.2/200 + 0.925*0.075/200) = 0.0339. Interval: (0.925 - 0.80) ± 1.645(0.0339) = 0.125 ± 0.0558 = (0.0692, 0.1808).\n\nChecklist: Calculated p-hats | Correct SE (not pooled) | Critical value z* = 1.645 | Interval calculation"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "p1-hat = 0.80, p2-hat = 0.925. SE = sqrt(0.8*0.2/200 + 0.925*0.075/200) = 0.0339. Interval: (0.925 - 0.80) ± 1.645(0.0339) = 0.125 ± 0.0558 = (0.0692, 0.1808).",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": [
          "calculated p-hats",
          "se (not pooled)",
          "critical value z* = 1.645",
          "interval calculation",
          "critical value"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u6_frq_006",
    "subject": "apstats",
    "units": [
      6
    ],
    "topic": "Power and Error Relationship",
    "topicLabel": "Power and Error Relationship",
    "title": "Power and Error Relationship",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A test of H0: p = 0.5 vs Ha: p > 0.5 is conducted with alpha = 0.05. The power of the test against the alternative p = 0.6 is 0.82.",
    "parts": [
      {
        "label": "a",
        "question": "What is the probability of a Type II error? If alpha is changed to 0.01, what happens to the power?",
        "rubric": "P(Type II Error) = 1 - Power = 1 - 0.82 = 0.18. If alpha decreases to 0.01, the power will decrease because it becomes harder to reject the null hypothesis.\n\nChecklist: Beta = 0.18 | Power decreases | Explains relationship between alpha and power"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "P(Type II Error) = 1 - Power = 1 - 0.82 = 0.18. If alpha decreases to 0.01, the power will decrease because it becomes harder to reject the null hypothesis.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "beta = 0.18",
          "power decreases",
          "relationship between alpha and power",
          "reject the null hypothesis",
          "null hypothesis",
          "type ii error",
          "power",
          "alpha"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u6_frq_007",
    "subject": "apstats",
    "units": [
      6
    ],
    "topic": "Sample Size Determination",
    "topicLabel": "Sample Size Determination",
    "title": "Sample Size Determination",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A politician wants to estimate the proportion of voters who support him with a margin of error of no more than 3% at a 99% confidence level.",
    "parts": [
      {
        "label": "a",
        "question": "Calculate the minimum sample size required if no prior estimate of p is available.",
        "rubric": "Use p-hat = 0.5. z* = 2.576. 0.03 = 2.576 * sqrt(0.5*0.5/n). 0.03/2.576 = sqrt(0.25/n). 0.0001356 = 0.25/n. n = 1843.1. Round up to 1844.\n\nChecklist: Used p-hat = 0.5 | z* = 2.576 | Algebraic work shown | Rounded up to next whole number"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Use p-hat = 0.5. z* = 2.576. 0.03 = 2.576 * sqrt(0.5*0.5/n). 0.03/2.576 = sqrt(0.25/n). 0.0001356 = 0.25/n. n = 1843.1. Round up to 1844.",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": [
          "used p-hat = 0.5",
          "z* = 2.576",
          "algebraic work shown",
          "rounded up to next whole number",
          "p-hat"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u6_frq_008",
    "subject": "apstats",
    "units": [
      6
    ],
    "topic": "Two-Sample z-test (Pooling)",
    "topicLabel": "Two-Sample z-test (Pooling)",
    "title": "Two-Sample z-test (Pooling)",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "Does a new ad campaign work? Before the ad, 40 out of 100 people recognized the brand. After the ad, 55 out of 100 recognized it.",
    "parts": [
      {
        "label": "a",
        "question": "Calculate the pooled proportion (p-hat combined) and the test statistic for Ha: p_after > p_before.",
        "rubric": "p-pooled = (40+55)/(100+100) = 0.475. z = (0.55 - 0.40) / sqrt(0.475*0.525*(1/100 + 1/100)) = 0.15 / 0.0706 = 2.12.\n\nChecklist: Correct pooled p (0.475) | Used pooled SE in denominator | Correct z-score"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "p-pooled = (40+55)/(100+100) = 0.475. z = (0.55 - 0.40) / sqrt(0.475*0.525*(1/100 + 1/100)) = 0.15 / 0.0706 = 2.12.",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": [
          "pooled p (0.475)",
          "used pooled se in denominator",
          "z-score"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u6_frq_009",
    "subject": "apstats",
    "units": [
      6
    ],
    "topic": "Inference and Interval Relationship",
    "topicLabel": "Inference and Interval Relationship",
    "title": "Inference and Interval Relationship",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A 95% confidence interval for the difference in proportions (p1 - p2) is calculated as (-0.08, 0.02).",
    "parts": [
      {
        "label": "a",
        "question": "Based on this interval, what can you conclude about the null hypothesis H0: p1 = p2 at the alpha = 0.05 level for a two-sided test?",
        "rubric": "Since 0 is included in the 95% confidence interval, we fail to reject the null hypothesis at the alpha = 0.05 level. There is not convincing evidence of a difference between the two proportions.\n\nChecklist: Mention 0 is in the interval | Fail to reject H0 | Link alpha (0.05) to 95% interval"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Since 0 is included in the 95% confidence interval, we fail to reject the null hypothesis at the alpha = 0.05 level. There is not convincing evidence of a difference between the two proportions.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "0 is in the interval",
          "fail to reject h0",
          "link alpha (0.05) to 95% interval",
          "fail to reject the null hypothesis",
          "reject the null hypothesis",
          "confidence interval",
          "convincing evidence",
          "null hypothesis",
          "evidence",
          "alpha"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u6_frq_010",
    "subject": "apstats",
    "units": [
      6
    ],
    "topic": "Margin of Error Factors",
    "topicLabel": "Margin of Error Factors",
    "title": "Margin of Error Factors",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "List two ways to decrease the width of a confidence interval for a proportion.",
    "parts": [
      {
        "label": "a",
        "question": "Identify two methods and explain why they work.",
        "rubric": "1. Increase the sample size (n), which decreases the standard error. 2. Decrease the confidence level (e.g., from 95% to 90%), which decreases the critical value z*.\n\nChecklist: Increase sample size | Decrease confidence level | Explain effect on SE or z*"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "1. Increase the sample size (n), which decreases the standard error. 2. Decrease the confidence level (e.g., from 95% to 90%), which decreases the critical value z*.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "increase sample size",
          "decrease confidence level",
          "effect on se or z*",
          "confidence level",
          "standard error",
          "critical value",
          "sample"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u7_frq_003",
    "subject": "apstats",
    "units": [
      7
    ],
    "topic": "Confidence Interval for Mean",
    "topicLabel": "Confidence Interval for Mean",
    "title": "Confidence Interval for Mean",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A company that produces light bulbs wants to estimate the mean life of a new type of bulb. A random sample of 25 bulbs has a mean life of 1,200 hours and a standard deviation of 80 hours. The distribution of life spans for these bulbs is approximately Normal.",
    "parts": [
      {
        "label": "a",
        "question": "Construct and interpret a 95% confidence interval for the true mean life of this new type of bulb.",
        "rubric": "Plan: One-sample t-interval for $mu$. Conditions: Random (given), Normal (given). Do: $df = 24$, $t^* = 2.064$. Interval: $1200 pm 2.064(80/sqrt{25}) = 1200 pm 33.024 = (1166.98, 1233.02)$. Conclude: We are 95% confident that the true mean life of the bulbs is between 1,166.98 and 1,233.02 hours.\n\nChecklist: Named t-interval | Used df = 24 | Correct t* (2.064) | Interpretation includes units (hours)"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Plan: One-sample t-interval for $mu$. Conditions: Random (given), Normal (given). Do: $df = 24$, $t^* = 2.064$. Interval: $1200 pm 2.064(80/sqrt{25}) = 1200 pm 33.024 = (1166.98, 1233.02)$. Conclude: We are 95% confident that the true mean life of the bulbs is between 1,166.98 and 1,233.02 hours.",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": [
          "named t-interval",
          "used df = 24",
          "t* (2.064)",
          "interpretation includes units (hours)",
          "conditions",
          "conclude",
          "sample",
          "random",
          "mean",
          "mu"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u7_frq_004",
    "subject": "apstats",
    "units": [
      7
    ],
    "topic": "One-Sample t-test for Means",
    "topicLabel": "One-Sample t-test for Means",
    "title": "One-Sample t-test for Means",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A nutritionist claims that the average amount of sugar in a specific brand of energy bar is 20 grams. A suspicious consumer takes a random sample of 16 bars and finds a mean of 22.5 grams with a standard deviation of 4 grams.",
    "parts": [
      {
        "label": "a",
        "question": "Does the sample provide convincing evidence that the true mean sugar content is different from 20 grams? Use alpha = 0.05.",
        "rubric": "State: $H_0: mu = 20$; $H_a: mu \neq 20$. Plan: One-sample t-test. Random (given), Normal (n < 30, so assume no outliers/skew). Do: $t = (22.5 - 20) / (4/sqrt{16}) = 2.5 / 1 = 2.5$. $df = 15$. $P$-value $approx 0.024$. Conclude: Since $0.024 < 0.05$, reject $H_0$. There is convincing evidence the mean sugar content is not 20g.\n\nChecklist: Two-sided hypotheses | Used t-distribution | Correct t-statistic | P-value linked to alpha"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "State: $H_0: mu = 20$; $H_a: mu \neq 20$. Plan: One-sample t-test. Random (given), Normal (n < 30, so assume no outliers/skew). Do: $t = (22.5 - 20) / (4/sqrt{16}) = 2.5 / 1 = 2.5$. $df = 15$. $P$-value $approx 0.024$. Conclude: Since $0.024 < 0.05$, reject $H_0$. There is convincing evidence the mean sugar content is not 20g.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "two-sided hypotheses",
          "used t-distribution",
          "t-statistic",
          "p-value linked to alpha",
          "convincing evidence",
          "statistic",
          "conclude",
          "evidence",
          "p-value",
          "sample"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u7_frq_005",
    "subject": "apstats",
    "units": [
      7
    ],
    "topic": "Matched Pairs t-test",
    "topicLabel": "Matched Pairs t-test",
    "title": "Matched Pairs t-test",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "An auto insurance company wants to see if a new safety course reduces the number of traffic violations. They track 12 drivers for 6 months before the course and 6 months after. [Data: Difference (Before - After) Mean = 1.2, SD = 0.8].",
    "parts": [
      {
        "label": "a",
        "question": "Perform a significance test to see if the course is effective.",
        "rubric": "State: $H_0: mu_{diff} = 0$; $H_a: mu_{diff} > 0$. Plan: Matched pairs t-test. Random (assume representativeness), Normal (assume no outliers). Do: $t = 1.2 / (0.8/sqrt{12}) = 5.196$. $P$-value $< 0.001$. Conclude: Reject $H_0$. Convincing evidence the course reduces violations.\n\nChecklist: Used mu_diff | One-sided test | Correct denominator (SE of differences) | Context (violations)"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "State: $H_0: mu_{diff} = 0$; $H_a: mu_{diff} > 0$. Plan: Matched pairs t-test. Random (assume representativeness), Normal (assume no outliers). Do: $t = 1.2 / (0.8/sqrt{12}) = 5.196$. $P$-value $< 0.001$. Conclude: Reject $H_0$. Convincing evidence the course reduces violations.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "used mu_diff",
          "one-sided test",
          "denominator (se of differences)",
          "context (violations)",
          "convincing evidence",
          "matched pairs",
          "conclude",
          "evidence",
          "random"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u7_frq_006",
    "subject": "apstats",
    "units": [
      7
    ],
    "topic": "Two-Sample t-test (Independent)",
    "topicLabel": "Two-Sample t-test (Independent)",
    "title": "Two-Sample t-test (Independent)",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A study compares the GPA of students who play sports (Group 1, $n=30$) and students who do not (Group 2, $n=35$). Group 1: Mean = 3.2, SD = 0.4. Group 2: Mean = 3.0, SD = 0.5.",
    "parts": [
      {
        "label": "a",
        "question": "Is there a significant difference in GPA? Use alpha = 0.01.",
        "rubric": "State: $H_0: mu_1 = mu_2$; $H_a: mu_1 \neq mu_2$. Plan: Two-sample t-test. Random (given), Normal ($n ge 30$ for both, CLT applies). Do: $t = (3.2 - 3.0) / sqrt{0.4^2/30 + 0.5^2/35} approx 1.77$. $P$-value $approx 0.08$. Conclude: Since $0.08 > 0.01$, fail to reject $H_0$. No significant difference found.\n\nChecklist: Named 2-sample t-test | CLT cited ($n ge 30$) | Correct SE calculation | Fail to reject conclusion"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "State: $H_0: mu_1 = mu_2$; $H_a: mu_1 \neq mu_2$. Plan: Two-sample t-test. Random (given), Normal ($n ge 30$ for both, CLT applies). Do: $t = (3.2 - 3.0) / sqrt{0.4^2/30 + 0.5^2/35} approx 1.77$. $P$-value $approx 0.08$. Conclude: Since $0.08 > 0.01$, fail to reject $H_0$. No significant difference found.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "named 2-sample t-test",
          "clt cited ($n ge 30$)",
          "se calculation",
          "fail to reject conclusion",
          "conclude",
          "sample",
          "random"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u7_frq_007",
    "subject": "apstats",
    "units": [
      7
    ],
    "topic": "Degrees of Freedom (2-Sample)",
    "topicLabel": "Degrees of Freedom (2-Sample)",
    "title": "Degrees of Freedom (2-Sample)",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "In a two-sample t-test with $n_1=15$ and $n_2=18$, compare the 'conservative' degrees of freedom to the calculator's value.",
    "parts": [
      {
        "label": "a",
        "question": "Explain why the calculator result is preferred.",
        "rubric": "Conservative $df = min(n_1-1, n_2-1) = 14$. The calculator uses the Satterthwaite formula, resulting in a larger $df$. Larger $df$ lead to more precise $P$-values and higher power for the test.\n\nChecklist: Calculated conservative df | Mentions power/precision | Prefers calculator value"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Conservative $df = min(n_1-1, n_2-1) = 14$. The calculator uses the Satterthwaite formula, resulting in a larger $df$. Larger $df$ lead to more precise $P$-values and higher power for the test.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "calculated conservative df",
          "power/precision",
          "prefers calculator value",
          "power"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u7_frq_008",
    "subject": "apstats",
    "units": [
      7
    ],
    "topic": "Condition: Normality (Small n)",
    "topicLabel": "Condition: Normality (Small n)",
    "title": "Condition: Normality (Small n)",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A sample of 8 students' study times has a mean of 5 hours and SD of 1.2. A dotplot of the data shows a strong left skew with an outlier at 1 hour.",
    "parts": [
      {
        "label": "a",
        "question": "Explain why it would be inappropriate to perform a t-test on this data.",
        "rubric": "Since the sample size is small ($n=8 < 30$), the Central Limit Theorem does not apply. We must check the sample data for normality. The strong skewness and outlier in the dotplot violate the Normal condition required for t-procedures.\n\nChecklist: Cites $n < 30$ | Mentions CLT failure | Notes skew/outlier in plot"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Since the sample size is small ($n=8 < 30$), the Central Limit Theorem does not apply. We must check the sample data for normality. The strong skewness and outlier in the dotplot violate the Normal condition required for t-procedures.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "cites $n < 30$",
          "clt failure",
          "skew/outlier in plot",
          "central limit theorem",
          "normal condition",
          "dotplot",
          "outlier",
          "sample"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u7_frq_009",
    "subject": "apstats",
    "units": [
      7
    ],
    "topic": "Power of a t-test",
    "topicLabel": "Power of a t-test",
    "title": "Power of a t-test",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A t-test is performed at alpha = 0.05. If the true mean is actually much further from the null than the researcher expected, how does this affect the power and the probability of a Type II error?",
    "parts": [
      {
        "label": "a",
        "question": "Explain the relationship.",
        "rubric": "As the true mean moves further from the null value (larger 'effect size'), the distributions overlap less. This increases the Power of the test and decreases the probability of a Type II error ($\beta$).\n\nChecklist: Power increases | Beta decreases | Mentions 'effect size' or 'overlap'"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "As the true mean moves further from the null value (larger 'effect size'), the distributions overlap less. This increases the Power of the test and decreases the probability of a Type II error ($\beta$).",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "power increases",
          "beta decreases",
          "'effect size' or 'overlap'",
          "power of the test",
          "type ii error",
          "probability",
          "power",
          "mean"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u7_frq_010",
    "subject": "apstats",
    "units": [
      7
    ],
    "topic": "Interpreting Computer Output",
    "topicLabel": "Interpreting Computer Output",
    "title": "Interpreting Computer Output",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A researcher uses software to compare two means. The output shows: 'Difference = 4.2, SE of difference = 1.4, P-value = 0.003'.",
    "parts": [
      {
        "label": "a",
        "question": "What is the t-statistic? If this was a two-sided test, what is the conclusion at alpha = 0.01?",
        "rubric": "$t = \text{Difference} / \text{SE} = 4.2 / 1.4 = 3.0$. Since $0.003 < 0.01$, reject the null. There is convincing evidence of a difference.\n\nChecklist: Calculated t = 3.0 | Linked P to alpha | Correct Reject decision"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "$t = \text{Difference} / \text{SE} = 4.2 / 1.4 = 3.0$. Since $0.003 < 0.01$, reject the null. There is convincing evidence of a difference.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "calculated t = 3.0",
          "linked p to alpha",
          "reject decision",
          "convincing evidence",
          "evidence",
          "alpha"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u8_frq_003",
    "subject": "apstats",
    "units": [
      8
    ],
    "topic": "Chi-Square Goodness of Fit",
    "topicLabel": "Chi-Square Goodness of Fit",
    "title": "Chi-Square Goodness of Fit",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A company claims that its 'Mixed Nut' bags contain 50% peanuts, 30% cashews, and 20% almonds. A consumer advocate opens a large bag and finds 110 peanuts, 60 cashews, and 30 almonds.",
    "parts": [
      {
        "label": "a",
        "question": "State the null and alternative hypotheses for a Chi-square goodness-of-fit test.",
        "rubric": "H0: The true distribution of nuts matches the company's claim (50% peanuts, 30% cashews, 20% almonds). Ha: The true distribution of nuts is different from the company's claim.\n\nChecklist: Null reflects the claim | Alternative states 'different' | Context of nuts included"
      },
      {
        "label": "b",
        "question": "Calculate the expected counts for each category.",
        "rubric": "Total nuts = 200. Peanuts: 0.50(200) = 100. Cashews: 0.30(200) = 60. Almonds: 0.20(200) = 40.\n\nChecklist: Calculated Peanuts (100) | Calculated Cashews (60) | Calculated Almonds (40)"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "H0: The true distribution of nuts matches the company's claim (50% peanuts, 30% cashews, 20% almonds). Ha: The true distribution of nuts is different from the company's claim.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "null reflects the claim",
          "alternative states 'different'",
          "context of nuts included"
        ]
      },
      {
        "points": 1,
        "description": "Total nuts = 200. Peanuts: 0.50(200) = 100. Cashews: 0.30(200) = 60. Almonds: 0.20(200) = 40.",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": [
          "calculated peanuts (100)",
          "calculated cashews (60)",
          "calculated almonds (40)"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u8_frq_004",
    "subject": "apstats",
    "units": [
      8
    ],
    "topic": "Chi-Square Test for Independence",
    "topicLabel": "Chi-Square Test for Independence",
    "title": "Chi-Square Test for Independence",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A study was conducted to see if there is an association between the type of exercise a person prefers (Yoga, Running, Weightlifting) and their primary goal (Flexibility, Endurance, Strength). A random sample of 300 adults was surveyed.",
    "parts": [
      {
        "label": "a",
        "question": "Calculate the degrees of freedom for this test.",
        "rubric": "Rows = 3, Columns = 3. df = (3-1)(3-1) = 2 * 2 = 4.\n\nChecklist: Identified 3x3 table | Used (r-1)(c-1) formula | Correct df = 4"
      },
      {
        "label": "b",
        "question": "One cell (Yoga and Strength) has an observed count of 10 and an expected count of 25. Calculate the Chi-square contribution for this cell.",
        "rubric": "Contribution = (Observed - Expected)^2 / Expected = (10 - 25)^2 / 25 = 225 / 25 = 9.0.\n\nChecklist: Subtracted O-E | Squared result | Divided by E | Result = 9.0"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Rows = 3, Columns = 3. df = (3-1)(3-1) = 2 * 2 = 4.",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": [
          "identified 3x3 table",
          "used (r-1)(c-1) formula",
          "df = 4"
        ]
      },
      {
        "points": 1,
        "description": "Contribution = (Observed - Expected)^2 / Expected = (10 - 25)^2 / 25 = 225 / 25 = 9.0.",
        "partLabel": "b",
        "skill": "explain",
        "keywords": [
          "subtracted o-e",
          "squared result",
          "divided by e",
          "result = 9.0"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u8_frq_005",
    "subject": "apstats",
    "units": [
      8
    ],
    "topic": "Conditions for Chi-Square",
    "topicLabel": "Conditions for Chi-Square",
    "title": "Conditions for Chi-Square",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A researcher is conducting a Chi-square test for homogeneity. One of the expected counts in a 2x5 table is 3.2.",
    "parts": [
      {
        "label": "a",
        "question": "Explain why the researcher should be cautious about the results of the Chi-square test.",
        "rubric": "The Large Counts condition for Chi-square requires all expected counts to be at least 5. Since one expected count (3.2) is less than 5, the Chi-square distribution may not be a good approximation for the sampling distribution of the test statistic, making the P-value unreliable.\n\nChecklist: Cites 'Large Counts' condition | Identifies 3.2 < 5 | Explains P-value/distribution unreliability"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The Large Counts condition for Chi-square requires all expected counts to be at least 5. Since one expected count (3.2) is less than 5, the Chi-square distribution may not be a good approximation for the sampling distribution of the test statistic, making the P-value unreliable.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "cites 'large counts' condition",
          "3.2 < 5",
          "p-value/distribution unreliability",
          "chi-square distribution",
          "large counts condition",
          "sampling distribution",
          "expected count",
          "test statistic",
          "statistic",
          "p-value"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u8_frq_006",
    "subject": "apstats",
    "units": [
      8
    ],
    "topic": "Chi-Square vs. Two-Proportion Z-Test",
    "topicLabel": "Chi-Square vs. Two-Proportion Z-Test",
    "title": "Chi-Square vs. Two-Proportion Z-Test",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A researcher compares the proportion of men and women who support a specific law using a 2x2 contingency table.",
    "parts": [
      {
        "label": "a",
        "question": "Explain the relationship between the Chi-square test for homogeneity and a two-sided, two-proportion z-test in this scenario.",
        "rubric": "For a 2x2 table, the two tests are mathematically equivalent. The P-values will be identical, and the Chi-square test statistic ($chi^2$) will be equal to the square of the z-statistic ($z^2$).\n\nChecklist: States tests are equivalent | P-values are same | Relationship $chi^2 = z^2$"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "For a 2x2 table, the two tests are mathematically equivalent. The P-values will be identical, and the Chi-square test statistic ($chi^2$) will be equal to the square of the z-statistic ($z^2$).",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "states tests are equivalent",
          "p-values are same",
          "relationship $chi^2 = z^2$",
          "chi-square test",
          "test statistic",
          "statistic"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u8_frq_007",
    "subject": "apstats",
    "units": [
      8
    ],
    "topic": "Interpreting P-values for GOF",
    "topicLabel": "Interpreting P-values for GOF",
    "title": "Interpreting P-values for GOF",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A genetics student tests if a fruit fly cross results in a 9:3:3:1 ratio. The calculated Chi-square statistic is 8.5 with 3 degrees of freedom. The P-value is 0.037.",
    "parts": [
      {
        "label": "a",
        "question": "Based on a 5% significance level, what should the student conclude?",
        "rubric": "Since the P-value (0.037) is less than alpha (0.05), we reject the null hypothesis. There is convincing evidence that the distribution of fruit fly traits is different from the hypothesized 9:3:3:1 ratio.\n\nChecklist: Linked P to alpha | Rejected H0 | Context of fruit flies/ratio"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Since the P-value (0.037) is less than alpha (0.05), we reject the null hypothesis. There is convincing evidence that the distribution of fruit fly traits is different from the hypothesized 9:3:3:1 ratio.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "linked p to alpha",
          "rejected h0",
          "context of fruit flies/ratio",
          "reject the null hypothesis",
          "convincing evidence",
          "null hypothesis",
          "evidence",
          "p-value",
          "alpha"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u8_frq_008",
    "subject": "apstats",
    "units": [
      8
    ],
    "topic": "Chi-Square Homogeneity vs. Independence",
    "topicLabel": "Chi-Square Homogeneity vs. Independence",
    "title": "Chi-Square Homogeneity vs. Independence",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "Scenario A: 100 students from High School X and 100 students from High School Y are asked their favorite subject. Scenario B: 200 students from a university are asked their major and whether they live on campus.",
    "parts": [
      {
        "label": "a",
        "question": "Identify which scenario requires a test for Homogeneity and which requires a test for Independence. Explain.",
        "rubric": "Scenario A is Homogeneity because there are two separate populations (School X and School Y) being compared on one variable. Scenario B is Independence because there is one population (university students) being asked about two categorical variables.\n\nChecklist: A = Homogeneity | B = Independence | Explains difference in population count"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Scenario A is Homogeneity because there are two separate populations (School X and School Y) being compared on one variable. Scenario B is Independence because there is one population (university students) being asked about two categorical variables.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "a = homogeneity",
          "b = independence",
          "difference in population count",
          "independence",
          "population",
          "about"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u8_frq_009",
    "subject": "apstats",
    "units": [
      8
    ],
    "topic": "Chi-Square Distribution Shape",
    "topicLabel": "Chi-Square Distribution Shape",
    "title": "Chi-Square Distribution Shape",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "How does the shape of the Chi-square distribution change as the degrees of freedom increase from 2 to 20?",
    "parts": [
      {
        "label": "a",
        "question": "Describe the change in shape.",
        "rubric": "With low degrees of freedom (df=2), the distribution is highly skewed to the right. As the degrees of freedom increase (df=20), the distribution becomes less skewed and begins to look more symmetric and approximately Normal.\n\nChecklist: Low df = Right skewed | High df = More symmetric/Normal | Clear comparison"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "With low degrees of freedom (df=2), the distribution is highly skewed to the right. As the degrees of freedom increase (df=20), the distribution becomes less skewed and begins to look more symmetric and approximately Normal.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "low df = right skewed",
          "high df = more symmetric/normal",
          "clear comparison",
          "approximately normal",
          "degrees of freedom",
          "approximately",
          "symmetric"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u8_frq_010",
    "subject": "apstats",
    "units": [
      8
    ],
    "topic": "Interpreting Large Chi-Square Statistics",
    "topicLabel": "Interpreting Large Chi-Square Statistics",
    "title": "Interpreting Large Chi-Square Statistics",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "If a Chi-square test results in a very large test statistic, what does that imply about the relationship between the observed and expected counts?",
    "parts": [
      {
        "label": "a",
        "question": "Explain the implication.",
        "rubric": "A large Chi-square statistic implies that there is a large discrepancy between the observed counts and the counts we would expect if the null hypothesis were true. This leads to a small P-value and stronger evidence against the null.\n\nChecklist: Discrepancy between O and E | Link to small P-value | Evidence against null"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "A large Chi-square statistic implies that there is a large discrepancy between the observed counts and the counts we would expect if the null hypothesis were true. This leads to a small P-value and stronger evidence against the null.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "discrepancy between o and e",
          "link to small p-value",
          "evidence against null",
          "chi-square statistic",
          "null hypothesis",
          "statistic",
          "evidence",
          "p-value"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u9_frq_003",
    "subject": "apstats",
    "units": [
      9
    ],
    "topic": "LSRL Hypotheses",
    "topicLabel": "LSRL Hypotheses",
    "title": "LSRL Hypotheses",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A biologist wants to determine if there is a linear relationship between the amount of sunlight (hours) and the growth (cm) of a specific plant.",
    "parts": [
      {
        "label": "a",
        "question": "State the null and alternative hypotheses for the slope of the population regression line.",
        "rubric": "H0: beta = 0 (There is no linear relationship between sunlight and growth). Ha: beta != 0 (There is a linear relationship between sunlight and growth).\n\nChecklist: Used beta ($\beta$) | Null is 0 | Context of sunlight/growth"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "H0: beta = 0 (There is no linear relationship between sunlight and growth). Ha: beta != 0 (There is a linear relationship between sunlight and growth).",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "used beta ($\beta$)",
          "null is 0",
          "context of sunlight/growth",
          "linear"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u9_frq_004",
    "subject": "apstats",
    "units": [
      9
    ],
    "topic": "Standard Error of the Slope",
    "topicLabel": "Standard Error of the Slope",
    "title": "Standard Error of the Slope",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "In a regression study with n=25, the estimated slope is b = 0.45 and the standard error of the slope is SE_b = 0.15.",
    "parts": [
      {
        "label": "a",
        "question": "Calculate the t-statistic for testing H0: beta = 0.",
        "rubric": "t = b / SE_b = 0.45 / 0.15 = 3.0.\n\nChecklist: Used b / SE_b | Correct t = 3.0"
      },
      {
        "label": "b",
        "question": "How many degrees of freedom are associated with this test?",
        "rubric": "df = n - 2 = 25 - 2 = 23.\n\nChecklist: Used n-2 | Correct df = 23"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "t = b / SE_b = 0.45 / 0.15 = 3.0.",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": [
          "used b / se_b",
          "t = 3.0"
        ]
      },
      {
        "points": 1,
        "description": "df = n - 2 = 25 - 2 = 23.",
        "partLabel": "b",
        "skill": "calculate",
        "keywords": [
          "used n-2",
          "df = 23"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u9_frq_005",
    "subject": "apstats",
    "units": [
      9
    ],
    "topic": "Slope Confidence Interval",
    "topicLabel": "Slope Confidence Interval",
    "title": "Slope Confidence Interval",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "Using computer output, a researcher finds a slope of 12.4 with SE_b = 2.1. For n=30, the critical value t* for 95% confidence is 2.048.",
    "parts": [
      {
        "label": "a",
        "question": "Construct a 95% confidence interval for the true slope.",
        "rubric": "Interval = b ± t*(SE_b) = 12.4 ± 2.048(2.1) = 12.4 ± 4.30 = (8.1, 16.7).\n\nChecklist: Used correct formula | Correct margin of error | Correct interval"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "Interval = b ± t*(SE_b) = 12.4 ± 2.048(2.1) = 12.4 ± 4.30 = (8.1, 16.7).",
        "partLabel": "a",
        "skill": "calculate",
        "keywords": [
          "used correct formula",
          "margin of error",
          "interval"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u9_frq_006",
    "subject": "apstats",
    "units": [
      9
    ],
    "topic": "Interpreting Computer Output",
    "topicLabel": "Interpreting Computer Output",
    "title": "Interpreting Computer Output",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A computer output table shows: 'Predictor: GPA, Coef: 0.15, SE Coef: 0.05, T: 3.0, P: 0.005'.",
    "parts": [
      {
        "label": "a",
        "question": "Interpret the value 0.15 in the 'Coef' column for GPA.",
        "rubric": "For every 1 unit increase in GPA, the response variable is predicted to increase by 0.15 units.\n\nChecklist: Context of 'predicted' | Correct value 0.15 | Interpretation of slope"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "For every 1 unit increase in GPA, the response variable is predicted to increase by 0.15 units.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "context of 'predicted'",
          "value 0.15",
          "interpretation of slope",
          "response variable",
          "predicted",
          "response",
          "slope"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u9_frq_007",
    "subject": "apstats",
    "units": [
      9
    ],
    "topic": "Regression Conditions (Residual Plot)",
    "topicLabel": "Regression Conditions (Residual Plot)",
    "title": "Regression Conditions (Residual Plot)",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A residual plot for a linear regression shows a 'fan' shape, where the residuals become more spread out as x increases.",
    "parts": [
      {
        "label": "a",
        "question": "Which condition for regression inference is violated? Explain the consequence.",
        "rubric": "The 'Equal Variance' (or Homoscedasticity) condition is violated. The consequence is that the standard error of the slope may be inaccurate, making confidence intervals and P-values for the slope unreliable.\n\nChecklist: Identified 'Equal Variance' | Mentions fan shape | Consequence for SE/P-values"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The 'Equal Variance' (or Homoscedasticity) condition is violated. The consequence is that the standard error of the slope may be inaccurate, making confidence intervals and P-values for the slope unreliable.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "identified 'equal variance'",
          "fan shape",
          "consequence for se/p-values",
          "standard error",
          "variance",
          "shape",
          "slope"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u9_frq_008",
    "subject": "apstats",
    "units": [
      9
    ],
    "topic": "Inference and Correlation",
    "topicLabel": "Inference and Correlation",
    "title": "Inference and Correlation",
    "difficulty": "hard",
    "source": "Generated",
    "frqType": "short",
    "prompt": "A researcher finds that the P-value for the t-test for the slope is 0.04. What does this tell us about the correlation coefficient r?",
    "parts": [
      {
        "label": "a",
        "question": "Explain the link between the slope test and the correlation.",
        "rubric": "The test for the slope (beta=0) and the test for the population correlation (rho=0) are equivalent. Since the P-value is 0.04 (less than 0.05), we also have convincing evidence that the true correlation is not zero.\n\nChecklist: States tests are equivalent | Links P-value to correlation | Conclusion of non-zero correlation"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The test for the slope (beta=0) and the test for the population correlation (rho=0) are equivalent. Since the P-value is 0.04 (less than 0.05), we also have convincing evidence that the true correlation is not zero.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "states tests are equivalent",
          "links p-value to correlation",
          "conclusion of non-zero correlation",
          "convincing evidence",
          "correlation",
          "population",
          "evidence",
          "p-value",
          "slope"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u9_frq_009",
    "subject": "apstats",
    "units": [
      9
    ],
    "topic": "Normality of Residuals",
    "topicLabel": "Normality of Residuals",
    "title": "Normality of Residuals",
    "difficulty": "medium",
    "source": "Generated",
    "frqType": "short",
    "prompt": "To check the Normality condition for regression, what should a researcher look at?",
    "parts": [
      {
        "label": "a",
        "question": "Identify the correct plot to examine.",
        "rubric": "The researcher should examine a histogram, boxplot, or Normal Probability Plot of the residuals (not the raw data) to ensure they are approximately Normal with no extreme outliers or strong skewness.\n\nChecklist: Mentions residuals (not raw data) | Identifies histogram/boxplot/NPP | Mentions checking for skew/outliers"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "The researcher should examine a histogram, boxplot, or Normal Probability Plot of the residuals (not the raw data) to ensure they are approximately Normal with no extreme outliers or strong skewness.",
        "partLabel": "a",
        "skill": "describe",
        "keywords": [
          "residuals",
          "histogram/boxplot/npp",
          "checking for skew/outliers",
          "approximately normal",
          "approximately",
          "probability",
          "histogram",
          "boxplot"
        ]
      }
    ],
    "autoGraded": true
  },
  {
    "id": "stats_u9_frq_010",
    "subject": "apstats",
    "units": [
      9
    ],
    "topic": "Purpose of the t-test for Slope",
    "topicLabel": "Purpose of the t-test for Slope",
    "title": "Purpose of the t-test for Slope",
    "difficulty": "easy",
    "source": "Generated",
    "frqType": "short",
    "prompt": "Why do we perform a t-test for the slope instead of just looking at the correlation r from our sample?",
    "parts": [
      {
        "label": "a",
        "question": "Explain the need for inference.",
        "rubric": "A sample correlation r might be non-zero just by chance due to sampling variability. We perform a t-test to determine if the observed relationship is strong enough to conclude that a linear relationship exists in the entire population.\n\nChecklist: Mentions sampling variability | Goal is population inference | Cites chance as a factor"
      }
    ],
    "rubric": [
      {
        "points": 1,
        "description": "A sample correlation r might be non-zero just by chance due to sampling variability. We perform a t-test to determine if the observed relationship is strong enough to conclude that a linear relationship exists in the entire population.",
        "partLabel": "a",
        "skill": "explain",
        "keywords": [
          "sampling variability",
          "goal is population inference",
          "cites chance as a factor",
          "correlation",
          "variability",
          "population",
          "conclude",
          "linear",
          "sample"
        ]
      }
    ],
    "autoGraded": true
  }
];
