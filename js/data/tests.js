// AP CS A Practice Tests
// Each test: 42 MCQ IDs + 4 FRQ IDs

const PRACTICE_TESTS = [
  {
    id: "test_1",
    title: "Practice Test 1",
    description: "Original practice test covering all 4 units proportionally.",
    difficulty: "mixed",
    source: "original",
    mcqIds: [
      "mcq_001","mcq_003","mcq_005","mcq_008","mcq_010","mcq_012","mcq_015","mcq_017","mcq_019","mcq_021",
      "mcq_052","mcq_055","mcq_058","mcq_061","mcq_064","mcq_067","mcq_070","mcq_073","mcq_076","mcq_079","mcq_082","mcq_085","mcq_088",
      "mcq_116","mcq_119","mcq_122","mcq_125","mcq_128","mcq_131","mcq_134","mcq_137",
      "mcq_156","mcq_159","mcq_162","mcq_165","mcq_168","mcq_171","mcq_174","mcq_177","mcq_180","mcq_183","mcq_186","mcq_189"
    ],
    frqIds: ["frq_013","frq_015","frq_017","frq_019"]
  },
  {
    id: "test_2",
    title: "Practice Test 2",
    description: "A second original practice test with different question selection.",
    difficulty: "mixed",
    source: "original",
    mcqIds: [
      "mcq_002","mcq_004","mcq_006","mcq_009","mcq_011","mcq_013","mcq_016","mcq_018","mcq_020","mcq_022",
      "mcq_053","mcq_056","mcq_059","mcq_062","mcq_065","mcq_068","mcq_071","mcq_074","mcq_077","mcq_080","mcq_083","mcq_086","mcq_089",
      "mcq_117","mcq_120","mcq_123","mcq_126","mcq_129","mcq_132","mcq_135","mcq_138",
      "mcq_157","mcq_160","mcq_163","mcq_166","mcq_169","mcq_172","mcq_175","mcq_178","mcq_181","mcq_184","mcq_187","mcq_190"
    ],
    frqIds: ["frq_014","frq_016","frq_018","frq_020"]
  },
  {
    id: "test_cb2022",
    title: "2022 Official Exam Recreation",
    description: "Recreated from the 2022 College Board AP CS A exam with CB-sourced questions.",
    difficulty: "mixed",
    source: "CB 2022",
    mcqIds: [
      "mcq_007","mcq_014","mcq_023","mcq_024","mcq_025","mcq_026","mcq_027","mcq_028","mcq_029","mcq_030",
      "mcq_054","mcq_057","mcq_060","mcq_063","mcq_066","mcq_069","mcq_072","mcq_075","mcq_078","mcq_081","mcq_084","mcq_087","mcq_090",
      "mcq_118","mcq_121","mcq_124","mcq_127","mcq_130","mcq_133","mcq_136","mcq_139",
      "mcq_158","mcq_161","mcq_164","mcq_167","mcq_170","mcq_173","mcq_176","mcq_179","mcq_182","mcq_185","mcq_188"
    ],
    frqIds: ["frq_001","frq_002","frq_003","frq_004"]
  },
  {
    id: "test_cb2023",
    title: "2023 Official Exam Recreation",
    description: "Recreated from the 2023 College Board AP CS A exam.",
    difficulty: "mixed",
    source: "CB 2023",
    mcqIds: [
      "mcq_031","mcq_032","mcq_033","mcq_034","mcq_035","mcq_036","mcq_037","mcq_038","mcq_039","mcq_040",
      "mcq_091","mcq_092","mcq_093","mcq_094","mcq_095","mcq_096","mcq_097","mcq_098","mcq_099","mcq_100","mcq_101","mcq_102","mcq_103",
      "mcq_140","mcq_141","mcq_142","mcq_143","mcq_144","mcq_145","mcq_146","mcq_147",
      "mcq_192","mcq_193","mcq_194","mcq_195","mcq_196","mcq_197","mcq_198","mcq_199","mcq_200","mcq_201","mcq_202","mcq_203"
    ],
    frqIds: ["frq_005","frq_006","frq_007","frq_008"]
  },
  {
    id: "test_cb2024",
    title: "2024 Official Exam Recreation",
    description: "Recreated from the 2024 College Board AP CS A exam.",
    difficulty: "mixed",
    source: "CB 2024",
    mcqIds: [
      "mcq_041","mcq_042","mcq_043","mcq_044","mcq_045","mcq_046","mcq_047","mcq_048","mcq_049","mcq_050",
      "mcq_104","mcq_105","mcq_106","mcq_107","mcq_108","mcq_109","mcq_110","mcq_111","mcq_112","mcq_113","mcq_114","mcq_115",
      "mcq_148","mcq_149","mcq_150","mcq_151","mcq_152","mcq_153","mcq_154","mcq_155",
      "mcq_204","mcq_205","mcq_206","mcq_207","mcq_208","mcq_209","mcq_210","mcq_211","mcq_212","mcq_213","mcq_214","mcq_215"
    ],
    frqIds: ["frq_009","frq_010","frq_011","frq_012"]
  }
];
