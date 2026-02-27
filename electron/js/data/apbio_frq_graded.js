'use strict';
// AP Biology — Auto-Graded FRQ Subset
// 5 questions annotated with full rubric metadata for GenericFRQGrader.
// Uses autoGraded: true + partLabel on rubric items (explicit part-to-answer mapping).
// Original question content sourced from apbio_frq.js (CB 2024).

window.APBIO_FRQ_GRADED = [

  // ── Unit 1: Chemistry of Life — Enzyme Kinetics ──────────────────────────────
  {
    id: 'SB-01-graded',
    subject: 'apbio',
    type: 'FRQ',
    frqType: 'short',
    autoGraded: true,
    title: 'Enzyme Kinetics',
    units: [1],
    topic: '1.1 Structure of Water and Hydrogen Bonding',
    difficulty: 'easy',
    source: 'CB 2024',
    points: 3,
    prompt: 'Amylase is an enzyme found in human saliva that catalyzes the hydrolysis of starch into maltose. A student tests amylase activity by mixing it with starch solution at pH 7, pH 5, and pH 9 and measuring the rate of starch breakdown over 10 minutes. The highest activity is observed at pH 7, with significantly reduced activity at pH 5 and pH 9.',
    parts: [
      { label: 'a', instruction: 'Describe the relationship between enzyme structure and substrate specificity.', skill: 'describe', points: 1 },
      { label: 'b', instruction: 'Explain why amylase activity is reduced at pH 5 compared to pH 7.', skill: 'explain', points: 1 },
      { label: 'c', instruction: 'Predict what would happen to amylase activity if the experiment were repeated at 70°C instead of body temperature (37°C). Justify your prediction.', skill: 'predict', points: 1 }
    ],
    rubric: [
      {
        index: 1, points: 1,
        description: 'Active site has a specific 3D shape complementary to the substrate; only substrates with a matching shape can bind and be catalyzed.',
        keywords: ['active site', '3d shape', 'three-dimensional', 'complementary', 'specific shape', 'amino acid', 'specificity', 'lock and key', 'induced fit', 'substrate specificity'],
        skill: 'describe', partLabel: 'a'
      },
      {
        index: 2, points: 1,
        description: 'At pH 5, altered ionization of amino acid R groups changes charges in the active site, distorting its shape so substrate cannot bind/catalysis is impaired.',
        keywords: ['ionization', 'r group', 'active site', 'ph', 'charge', 'shape', 'conformation', 'amino acid', 'altered', 'disrupts', 'distorts'],
        proximity: {
          cause:     ['ph 5', 'acidic', 'low ph', 'ph change'],
          connector: ['changes', 'alters', 'disrupts', 'affects'],
          effect:    ['active site', 'r group', 'ionization', 'shape', 'binding']
        },
        skill: 'explain', partLabel: 'b'
      },
      {
        index: 3, points: 1,
        description: 'Activity decreases significantly/enzyme denatures at 70°C; high heat disrupts hydrogen bonds and non-covalent interactions maintaining 3D shape, permanently altering the active site.',
        keywords: ['denaturation', 'denature', 'denatured', 'hydrogen bond', 'high temperature', 'active site altered', 'shape destroyed', '70', 'decreases', 'inactivated', 'unfolds'],
        fundamentalPrinciple: true,
        proximity: {
          cause:     ['70', 'high temperature', 'heat'],
          connector: ['disrupts', 'breaks', 'denatures', 'destroys'],
          effect:    ['hydrogen bond', 'active site', 'shape', '3d structure', 'activity']
        },
        skill: 'predict', partLabel: 'c'
      }
    ],
    idealResponse: {
      latex: '',
      prose: "(a) The active site is a specific 3D region shaped by amino acid arrangement; only a substrate with a complementary shape binds (lock-and-key/induced fit). (b) At pH 5, R-group ionization states change, altering active site charges → distorted shape → reduced substrate binding. (c) Activity would near zero — 70°C denatures amylase by breaking hydrogen bonds maintaining its 3D shape, permanently destroying the active site."
    }
  },

  // ── Unit 2: Cell Biology — Membrane Transport ────────────────────────────────
  {
    id: 'SB-03-graded',
    subject: 'apbio',
    type: 'FRQ',
    frqType: 'short',
    autoGraded: true,
    title: 'Membrane Transport',
    units: [2],
    topic: '2.1 Cell Structure',
    difficulty: 'medium',
    source: 'CB 2024',
    points: 4,
    prompt: 'Cystic fibrosis (CF) is caused by a mutation in the CFTR gene, which encodes a chloride ion channel in the plasma membrane of epithelial cells. In healthy cells, CFTR opens in response to elevated cAMP and allows Cl⁻ to move out of the cell. In CF patients, the most common mutation (delta-F508) causes the CFTR protein to misfold and be degraded before it reaches the plasma membrane.',
    parts: [
      { label: 'a', instruction: 'Describe a difference between facilitated diffusion and active transport.', skill: 'describe', points: 1 },
      { label: 'b', instruction: 'Identify the type of membrane transport CFTR performs and justify your identification.', skill: 'identify', points: 1 },
      { label: 'c', instruction: 'Explain why the delta-F508 mutation, which causes protein misfolding, results in loss of CFTR function at the plasma membrane even though the gene is still transcribed and translated.', skill: 'explain', points: 1 },
      { label: 'd', instruction: 'Predict how the loss of Cl⁻ transport from airway epithelial cells contributes to the thick mucus observed in CF patients. Justify your prediction.', skill: 'predict', points: 1 }
    ],
    rubric: [
      {
        index: 1, points: 1,
        description: 'Facilitated diffusion moves substances DOWN the concentration gradient (no ATP); active transport moves substances AGAINST the gradient (requires ATP).',
        keywords: ['concentration gradient', 'down the gradient', 'with the gradient', 'no energy', 'no atp', 'against the gradient', 'requires atp', 'energy required', 'active', 'passive'],
        skill: 'describe', partLabel: 'a'
      },
      {
        index: 2, points: 1,
        description: 'CFTR performs facilitated diffusion; Cl⁻ moves OUT of the cell down its electrochemical gradient through the channel; no ATP consumed.',
        keywords: ['facilitated diffusion', 'channel', 'down', 'gradient', 'electrochemical', 'no atp', 'passive', 'concentration gradient', 'diffusion'],
        skill: 'identify', partLabel: 'b'
      },
      {
        index: 3, points: 1,
        description: 'Misfolded CFTR is recognized by ER quality control and targeted for degradation (proteasome/ubiquitin pathway) before it reaches the plasma membrane — channel never reaches its functional location.',
        keywords: ['misfolded', 'quality control', 'degraded', 'proteasome', 'ubiquitin', 'endoplasmic reticulum', 'er', 'degradation', 'never reaches', 'plasma membrane', 'destroyed'],
        fundamentalPrinciple: true,
        proximity: {
          cause:     ['misfolded', 'misfold', 'delta f508', 'mutation'],
          connector: ['recognized', 'targeted', 'degraded', 'destroyed'],
          effect:    ['proteasome', 'plasma membrane', 'never reaches', 'functional location']
        },
        skill: 'explain', partLabel: 'c'
      },
      {
        index: 4, points: 1,
        description: 'Without Cl⁻ export, osmotic gradient driving water into airway lumen is lost; less water moves out by osmosis → mucus is dehydrated and thick.',
        keywords: ['osmosis', 'water', 'osmotic gradient', 'water potential', 'less water', 'dehydrated', 'thick mucus', 'lumen', 'follows chloride'],
        proximity: {
          cause:     ['chloride', 'cl-', 'cl⁻', 'no chloride export'],
          connector: ['reduces', 'without', 'loss of'],
          effect:    ['osmosis', 'water movement', 'water follows', 'dehydrated', 'thick']
        },
        skill: 'predict', partLabel: 'd'
      }
    ],
    idealResponse: {
      latex: '',
      prose: "(a) Facilitated diffusion moves solutes down their gradient, no ATP; active transport moves solutes against their gradient, requires ATP. (b) Facilitated diffusion — Cl⁻ moves out of cells down its electrochemical gradient through CFTR; no energy needed. (c) Misfolded CFTR is detected by ER quality control and destroyed by the proteasome before it can traffic to the plasma membrane. (d) Normally Cl⁻ export creates an osmotic gradient drawing water into the airway lumen; without CFTR, less water follows → mucus dehydrates and thickens."
    }
  },

  // ── Unit 3: Energy — Photosynthesis ──────────────────────────────────────────
  {
    id: 'SB-06-graded',
    subject: 'apbio',
    type: 'FRQ',
    frqType: 'short',
    autoGraded: true,
    title: 'Photosynthesis',
    units: [3],
    topic: '3.1 Photosynthesis',
    difficulty: 'medium',
    source: 'CB 2024',
    points: 4,
    prompt: 'A researcher investigates photosynthesis in spinach leaves using a floating leaf disk assay. She removes air from leaf disks using a vacuum and infiltrates them with sodium bicarbonate solution (providing CO₂). The disks initially sink. She exposes one group to white light and another to darkness. Over 30 minutes, the light-exposed disks gradually float while the dark disks remain sunken.',
    parts: [
      { label: 'a', instruction: 'Explain why the leaf disks sink initially and why they float to the surface when exposed to light.', skill: 'explain', points: 1 },
      { label: 'b', instruction: 'Describe the role of NADPH in the Calvin cycle.', skill: 'describe', points: 1 },
      { label: 'c', instruction: 'Predict what would happen to the rate of the Calvin cycle if the light reactions were suddenly blocked. Justify your prediction.', skill: 'predict', points: 1 },
      { label: 'd', instruction: 'Support the claim that photosynthesis and cellular respiration are complementary processes, using the reactants and products of each.', skill: 'support', points: 1 }
    ],
    rubric: [
      {
        index: 1, points: 1,
        description: 'Disks sink because air removed (no buoyancy). Float because light reactions produce O₂ (from water-splitting) which accumulates in intercellular spaces, restoring buoyancy.',
        keywords: ['oxygen', 'o2', 'light reactions', 'water splitting', 'photosynthesis', 'buoyancy', 'intercellular', 'produced', 'accumulates'],
        proximity: {
          cause:     ['light', 'light reactions', 'photosynthesis'],
          connector: ['produces', 'generates', 'releases'],
          effect:    ['oxygen', 'o2', 'gas', 'buoyancy', 'float']
        },
        skill: 'explain', partLabel: 'a'
      },
      {
        index: 2, points: 1,
        description: 'NADPH is an electron donor/reducing agent in the Calvin cycle; it provides electrons to reduce 3-PGA to G3P during the reduction phase.',
        keywords: ['nadph', 'electron donor', 'reducing agent', 'reduce', 'reduction', '3-pga', 'g3p', 'calvin cycle', 'electrons', 'glyceraldehyde'],
        skill: 'describe', partLabel: 'b'
      },
      {
        index: 3, points: 1,
        description: 'Calvin cycle rate would decrease and stop; it depends on ATP and NADPH from the light reactions; without them, 3-PGA cannot be reduced and RuBP cannot be regenerated.',
        keywords: ['atp', 'nadph', 'light reactions', 'decrease', 'stop', 'rubp', '3-pga', 'dependent', 'no atp', 'depleted'],
        fundamentalPrinciple: true,
        proximity: {
          cause:     ['light reactions blocked', 'no light', 'light stopped'],
          connector: ['no longer', 'depletes', 'stops supplying'],
          effect:    ['atp', 'nadph', 'calvin cycle stops', 'rubp']
        },
        skill: 'predict', partLabel: 'c'
      },
      {
        index: 4, points: 1,
        description: 'Photosynthesis uses CO₂ + H₂O + light → glucose + O₂; respiration uses glucose + O₂ → CO₂ + H₂O + ATP. Products of each are reactants of the other — must reference both.',
        keywords: ['co2', 'oxygen', 'glucose', 'water', 'reactants', 'products', 'cycle', 'complementary', 'cellular respiration', 'photosynthesis', 'atp'],
        proximity: {
          cause:     ['photosynthesis'],
          connector: ['produces', 'outputs'],
          effect:    ['glucose', 'oxygen', 'reactants', 'respiration']
        },
        skill: 'support', partLabel: 'd'
      }
    ],
    idealResponse: {
      latex: '6CO_2 + 6H_2O \\xrightarrow{\\text{light}} C_6H_{12}O_6 + 6O_2',
      prose: "(a) Disks sink (no air); light drives light reactions → O₂ produced via water-splitting → accumulates in intercellular spaces → buoyancy restored. (b) NADPH reduces 3-PGA to G3P in the Calvin cycle (electron/H donor). (c) Calvin cycle stops — it requires ATP + NADPH from light reactions; without them, 3-PGA isn't reduced and RuBP not regenerated. (d) Photosynthesis products (glucose, O₂) are respiration reactants; respiration products (CO₂, H₂O) are photosynthesis reactants — cyclically complementary."
    }
  },

  // ── Unit 7: Evolution — Natural Selection ────────────────────────────────────
  {
    id: 'SB-20-graded',
    subject: 'apbio',
    type: 'FRQ',
    frqType: 'short',
    autoGraded: true,
    title: 'Natural Selection',
    units: [7],
    topic: '7.2 Natural Selection',
    difficulty: 'easy',
    source: 'CB 2024',
    points: 3,
    prompt: 'The peppered moth (Biston betularia) exists in two forms: light-colored (typical) and dark-colored (melanic). Before the Industrial Revolution, light moths were common and dark moths were rare in England. During industrialization, soot darkened tree bark, and dark moths became dominant in industrial areas. After clean air legislation reduced pollution, light moths again increased in frequency.',
    parts: [
      { label: 'a', instruction: 'Explain, using the principles of natural selection, why dark moths increased in frequency during industrialization.', skill: 'explain', points: 1 },
      { label: 'b', instruction: 'Describe one piece of evidence that would support the hypothesis that predation was the selective pressure driving these changes.', skill: 'describe', points: 1 },
      { label: 'c', instruction: 'Justify why the return of light moths after clean air legislation is consistent with evolution by natural selection rather than individual moths changing their color.', skill: 'justify', points: 1 }
    ],
    rubric: [
      {
        index: 1, points: 1,
        description: 'Dark moths were better camouflaged on soot-darkened bark → less predation → higher survival and reproduction → dark allele frequency increased (directional selection).',
        keywords: ['camouflage', 'predation', 'survival', 'reproduced', 'allele frequency', 'natural selection', 'directional selection', 'dark bark', 'soot', 'heritable'],
        fundamentalPrinciple: true,
        proximity: {
          cause:     ['soot', 'dark bark', 'industrialization', 'camouflage'],
          connector: ['survived', 'less likely eaten', 'reduced predation', 'better hidden'],
          effect:    ['reproduced more', 'frequency increased', 'allele', 'passed on', 'selection']
        },
        skill: 'explain', partLabel: 'a'
      },
      {
        index: 2, points: 1,
        description: 'Direct observation of birds preferentially eating contrasting moths; OR mark-recapture data showing lower survival of visible moths on matching bark; OR reciprocal transplant experiments.',
        keywords: ['birds', 'predator', 'predation rate', 'eaten', 'mark recapture', 'survival rate', 'transplant', 'observation', 'evidence', 'kettlewell', 'camouflage experiment'],
        skill: 'describe', partLabel: 'b'
      },
      {
        index: 3, points: 1,
        description: 'Individual moths cannot change their genetically determined color; population change occurs through differential survival/reproduction — lighter moths survived better on clean bark and passed light alleles on at higher frequency. Evolution = allele frequency change in a population, not individual change.',
        keywords: ['individual', 'cannot change', 'population', 'allele frequency', 'differential survival', 'heritable', 'reproduction', 'light moths survive', 'genetically determined', 'evolution'],
        proximity: {
          cause:     ['clean bark', 'clean air', 'lighter bark', 'pollution reduced'],
          connector: ['survived more', 'better camouflaged', 'less predation'],
          effect:    ['allele frequency', 'light moths increased', 'passed on', 'frequency increased']
        },
        skill: 'justify', partLabel: 'c'
      }
    ],
    idealResponse: {
      latex: '',
      prose: "(a) Soot-darkened bark made dark moths better camouflaged; birds preferentially ate more-visible light moths. Dark moths survived and reproduced more, increasing dark allele frequency each generation — directional natural selection. (b) Mark-recapture studies showing dark moths recaptured more often on dark bark (lower predation rate); light moths recaptured less (higher predation). (c) Individual moths cannot change genetically determined color. After clean-air legislation, light moths were better camouflaged → survived and reproduced more → light allele frequency increased over generations. Evolution is a population-level change in allele frequency, not individual change."
    }
  },

  // ── Unit 8: Ecology — Community Ecology ─────────────────────────────────────
  {
    id: 'SB-23-graded',
    subject: 'apbio',
    type: 'FRQ',
    frqType: 'short',
    autoGraded: true,
    title: 'Community Ecology',
    units: [8],
    topic: '8.2 Energy Flow Through Ecosystems',
    difficulty: 'medium',
    source: 'CB 2024',
    points: 4,
    prompt: 'A temperate forest ecosystem contains oak trees (producers), caterpillars (primary consumers), songbirds (secondary consumers), and hawks (tertiary consumers). Ecologists measure the biomass at each trophic level and find that biomass decreases significantly with each step up the food chain. When a pesticide eliminates 95% of the caterpillar population, songbird populations decline sharply within one season.',
    parts: [
      { label: 'a', instruction: 'Explain why biomass decreases at each successive trophic level in this ecosystem.', skill: 'explain', points: 1 },
      { label: 'b', instruction: 'Describe the concept of a keystone species and evaluate whether caterpillars could be considered a keystone species in this ecosystem based on the data.', skill: 'describe', points: 1 },
      { label: 'c', instruction: 'Predict how hawk population size would change in the year following the pesticide application. Justify using energy flow principles.', skill: 'predict', points: 1 },
      { label: 'd', instruction: 'Explain how the elimination of caterpillars could affect the oak tree population over the long term.', skill: 'explain', points: 1 }
    ],
    rubric: [
      {
        index: 1, points: 1,
        description: 'Energy is lost at each trophic level (as heat via cellular respiration); only ~10% of energy transfers to the next level — the 10% rule/ecological efficiency.',
        keywords: ['energy lost', 'heat', 'cellular respiration', '10%', 'ten percent', 'ecological efficiency', 'trophic level', 'transferred', 'metabolic', '90 percent lost'],
        fundamentalPrinciple: true,
        proximity: {
          cause:     ['energy', 'biomass'],
          connector: ['lost', 'released', 'used for'],
          effect:    ['heat', 'respiration', 'metabolic processes', 'decreases']
        },
        skill: 'explain', partLabel: 'a'
      },
      {
        index: 2, points: 1,
        description: 'Keystone species: disproportionate impact on ecosystem relative to its biomass/abundance. Caterpillars may qualify — removing 95% caused sharp songbird decline, showing disproportionate effect on community structure.',
        keywords: ['keystone species', 'disproportionate', 'impact', 'community', 'structure', 'songbird', 'sharp decline', 'abundance', 'relative to biomass'],
        skill: 'describe', partLabel: 'b'
      },
      {
        index: 3, points: 1,
        description: 'Hawk population would decrease: fewer caterpillars → fewer songbirds (less energy/food for birds) → less prey for hawks → hawk numbers decline. Energy flow is disrupted at multiple levels.',
        keywords: ['hawk', 'decrease', 'decline', 'fewer songbirds', 'less prey', 'energy flow', 'food chain', 'indirect effect', 'trophic cascade'],
        proximity: {
          cause:     ['fewer caterpillars', 'caterpillar decline', 'pesticide'],
          connector: ['reduces', 'decreases', 'limits'],
          effect:    ['songbirds', 'prey', 'hawks decline', 'trophic cascade']
        },
        skill: 'predict', partLabel: 'c'
      },
      {
        index: 4, points: 1,
        description: 'Without caterpillars eating oak leaves, oak trees may initially benefit (less herbivory). BUT over time, fewer songbirds → reduced predator pressure on other herbivores → other herbivores may increase and damage oaks. OR: less seed dispersal if birds decline, affecting oak reproduction.',
        keywords: ['herbivory', 'fewer herbivores', 'oak', 'benefit', 'indirect', 'herbivore', 'consumer', 'less leaf damage', 'trophic cascade', 'long term'],
        skill: 'explain', partLabel: 'd'
      }
    ],
    idealResponse: {
      latex: '',
      prose: "(a) ~90% of energy is lost as heat (cellular respiration) at each trophic level; only ~10% transfers upward — explaining the biomass pyramid. (b) A keystone species has disproportionate community impact relative to abundance. Caterpillars may qualify: removing 95% caused sharp songbird decline, suggesting they are a critical energy link. (c) Hawk numbers would decrease: fewer caterpillars → less energy for songbirds → fewer songbirds → less prey for hawks (trophic cascade). (d) Short-term: less herbivory benefits oaks. Long-term: fewer songbirds → less control of other herbivores → increased herbivory may harm oaks; also affects seed dispersal."
    }
  }

];
