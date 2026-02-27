#!/usr/bin/env python3
"""
annotate_apbio.py — Auto-annotate all 62 questions in apbio_frq.js
Adds to each question:
  - autoGraded: true   (question level, after the points: line)
  - partLabel, skill, keywords  (per rubric item)

Keywords are extracted from parts[i].rubric (full text) using:
  - AP Bio vocab dictionary (multi-word terms matched longest-first)
  - Parenthetical terms e.g. "(plasmolysis)"
  - "must reference X" / "must include X" / "award point for noting X" patterns

Usage:
  python3 scripts/annotate_apbio.py
"""

import re, os, sys

# ── File paths ────────────────────────────────────────────────────────────────
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INPUT_FILE = os.path.join(BASE, 'js', 'data', 'apbio_frq.js')

# ── AP Bio vocabulary (multi-word phrases sorted longest-first) ───────────────
RAW_VOCAB = [
    # Biochemistry / Macromolecules
    "activation energy", "active site", "amino acid", "amino group",
    "carboxyl group", "catalytic activity", "chemical energy",
    "competitive inhibitor", "covalent bond", "dehydration synthesis",
    "denaturation", "disulfide bond", "enzyme substrate complex",
    "enzyme-substrate complex", "fatty acid", "functional group",
    "glycosidic bond", "hydrogen bond", "hydrolysis", "hydrophilic",
    "hydrophobic", "induced fit", "ionic bond", "lock and key",
    "macromolecule", "monomer", "nucleic acid", "nucleotide", "peptide bond",
    "phosphodiester bond", "phospholipid bilayer", "phospholipid",
    "polar molecule", "polymer", "polypeptide", "primary structure",
    "quaternary structure", "r group", "saturated fatty acid",
    "secondary structure", "specific heat", "substrate specificity",
    "tertiary structure", "unsaturated fatty acid", "van der waals",
    "activation energy barrier", "allosteric inhibition", "allosteric site",
    "feedback inhibition", "noncompetitive inhibitor", "product inhibition",
    "amino acids", "enzyme", "substrate", "saturated", "unsaturated",
    "ionization", "denatured", "protein structure", "c-h bonds",
    "c=c double bonds", "double bond", "single bond", "hydrocarbon chain",
    "more reduced", "oxidized", "reduced",

    # Cell structure / Organelles
    "cell membrane", "cell theory", "cell wall", "centriole", "chloroplast",
    "chromatin", "cristae", "cytoplasm", "cytoskeleton", "endoplasmic reticulum",
    "endosymbiotic theory", "extracellular matrix", "fluid mosaic model",
    "gap junction", "golgi apparatus", "inner mitochondrial membrane",
    "intermediate filament", "lysosome", "microfilament", "microtubule",
    "mitochondria", "mitochondrial matrix", "nuclear envelope", "nuclear pore",
    "nucleus", "nucleolus", "outer mitochondrial membrane", "peroxisome",
    "phospholipid", "plasma membrane", "ribosome", "rough er",
    "rough endoplasmic reticulum", "secretory vesicle", "selective permeability",
    "semi-permeable membrane", "smooth er", "smooth endoplasmic reticulum",
    "tight junction", "vacuole", "vesicle", "golgi", "er lumen",
    "secretory pathway", "protein processing", "post-translational modification",
    "proteasome", "ubiquitin", "quality control", "protein folding",
    "misfolded protein", "chaperone protein", "signal peptide",

    # Membrane transport
    "active transport", "aquaporin", "carrier protein", "channel protein",
    "concentration gradient", "cotransport", "diffusion", "electrochemical gradient",
    "endocytosis", "exocytosis", "facilitated diffusion", "ion channel",
    "membrane potential", "osmosis", "osmotic pressure", "passive transport",
    "phagocytosis", "pinocytosis", "plasmolysis", "receptor-mediated endocytosis",
    "sodium-potassium pump", "solute concentration", "transport protein",
    "turgor pressure", "water potential", "incipient plasmolysis",
    "turgid", "flaccid", "hypertonic", "hypotonic", "isotonic", "tonicity",
    "osmotic gradient", "water moves", "water movement", "crenation",

    # Cell signaling
    "adenylyl cyclase", "camp", "cyclic amp", "g protein", "g-protein coupled",
    "gene expression", "intracellular receptor", "kinase cascade",
    "ligand", "phosphorylation", "phosphorylation cascade",
    "protein kinase", "receptor protein", "receptor tyrosine kinase",
    "relay molecule", "second messenger", "signal molecule", "signal transduction",
    "signal amplification", "transcription factor", "cell response",

    # Cell cycle / Division
    "anaphase", "binary fission", "cell cycle", "cell plate",
    "centromere", "checkpoint", "chromatid", "chromosome",
    "cleavage furrow", "cyclin", "cyclin-dependent kinase", "cdk",
    "cytokinesis", "g1 phase", "g2 phase", "interphase", "kinetochore",
    "metaphase", "mitosis", "mitotic spindle", "prophase",
    "s phase", "spindle fiber", "telophase", "tumor suppressor",
    "proto-oncogene", "oncogene", "cancer",

    # Metabolism / Energy
    "acetyl coa", "atp", "atp synthase", "atpase",
    "atp hydrolysis", "atp synthesis", "calorie",
    "cellular respiration", "chemiosmosis", "citric acid cycle",
    "coenzyme", "electron carrier", "electron transport chain",
    "fermentation", "free energy", "glycolysis", "krebs cycle",
    "lactic acid fermentation", "metabolic pathway", "nadh", "nadph",
    "nad+", "oxidative phosphorylation", "oxidation", "reduction",
    "phosphorylation", "proton gradient", "proton motive force",
    "pyruvate", "substrate-level phosphorylation", "aerobic respiration",
    "anaerobic respiration", "anabolism", "catabolism", "metabolism",
    "energy coupling", "exergonic", "endergonic", "chemical gradient",
    "acetyl-coa", "carbon skeleton",

    # Photosynthesis
    "absorption spectrum", "action spectrum", "antenna complex",
    "carotenoid", "carbon fixation", "carbon dioxide fixation",
    "chlorophyll", "cyclic photophosphorylation", "light-dependent reactions",
    "light-independent reactions", "light reactions", "noncyclic photophosphorylation",
    "photon", "photophosphorylation", "photorespiration",
    "photosystem i", "photosystem ii", "photosystem",
    "photosynthesis", "primary electron acceptor", "reaction center",
    "rubisco", "rubp", "ribulose bisphosphate", "calvin cycle",
    "g3p", "glyceraldehyde-3-phosphate", "3-pga", "co2", "o2",
    "water splitting", "oxygen evolution", "stroma", "thylakoid",
    "light energy", "electromagnetic spectrum",

    # Genetics / Heredity
    "allele", "allele frequency", "anticodon", "autosomal dominant",
    "autosomal recessive", "autosome", "base pairing", "carrier",
    "chi-square test", "chromosome", "codominance", "codon",
    "complementary base pairing", "crossing over", "daughter cell",
    "dihybrid cross", "diploid", "dominant", "epistasis",
    "fertilization", "frameshift mutation", "gamete", "gene",
    "gene locus", "genetic code", "genetic recombination",
    "genotype", "haploid", "Hardy-Weinberg equilibrium",
    "heterozygous", "homologous chromosomes", "homozygous",
    "incomplete dominance", "independent assortment", "karyotype",
    "law of segregation", "linked genes", "locus", "meiosis",
    "meiosis i", "meiosis ii", "mendel", "mitosis",
    "monohybrid cross", "multiple alleles", "nondisjunction", "phenotype",
    "polygenic inheritance", "polyploidy", "probability",
    "punnett square", "recessive", "recombination frequency",
    "sex chromosome", "sex-linked", "synapsis", "test cross",
    "translocation", "trisomy", "x-linked", "zygote",
    "sister chromatids", "chiasmata", "tetrad", "bivalent",
    "independent assortment", "law of independent assortment",

    # DNA / Gene expression
    "base excision repair", "chromatin remodeling", "codon",
    "complementary strand", "dna helicase", "dna ligase",
    "dna methylation", "dna polymerase", "dna primase",
    "dna repair", "dna replication", "dna template",
    "double helix", "enhancer", "epigenetics", "exon",
    "gene regulation", "histone", "histone modification",
    "intron", "lagging strand", "leading strand",
    "messenger rna", "mrna", "nucleosome", "okazaki fragment",
    "open reading frame", "operon", "origin of replication",
    "post-translational modification", "promoter", "protein synthesis",
    "replication fork", "repressor", "rna polymerase", "rrna",
    "semi-conservative replication", "silencer", "splicing",
    "start codon", "stop codon", "template strand", "transcription",
    "transcription factor", "translation", "trna", "triplet code",
    "base pair", "adenine", "thymine", "guanine", "cytosine", "uracil",
    "lac operon", "lac repressor", "operator", "inducer", "allolactose",
    "inducible operon", "repressible operon",

    # Evolution / Natural selection
    "adaptation", "adaptive radiation", "allopatric speciation",
    "analogous structure", "artificial selection", "biogeography",
    "bottleneck effect", "coevolution", "common ancestor",
    "directional selection", "disruptive selection", "divergent evolution",
    "fitness", "founder effect", "gene flow", "gene pool",
    "genetic drift", "geographic isolation", "homologous structure",
    "macroevolution", "microevolution", "molecular clock",
    "mutation", "natural selection", "phylogenetic tree",
    "phylogeny", "polyploidy", "population genetics", "relative fitness",
    "reproductive isolation", "sexual selection", "speciation",
    "stabilizing selection", "sympatric speciation", "vestigial structure",
    "selective pressure", "allele frequency change",
    "survival of the fittest", "differential reproduction",
    "heritable variation", "variation", "descent with modification",

    # Ecology
    "abiotic factor", "biotic factor", "carbon cycle",
    "carrying capacity", "climax community", "commensalism",
    "community", "competition", "competitive exclusion principle",
    "consumer", "decomposer", "denitrification", "density-dependent",
    "density-independent", "detritivore", "ecological succession",
    "ecosystem", "energy flow", "energy pyramid",
    "exponential growth", "food chain", "food web",
    "habitat", "herbivore", "interspecific competition",
    "intraspecific competition", "keystone species",
    "K-selection", "limiting factor", "logistic growth",
    "mutualism", "net primary productivity", "niche",
    "nitrogen cycle", "nitrogen fixation", "nutrient cycling",
    "omnivore", "parasitism", "population", "population growth",
    "predation", "predator-prey", "primary consumer",
    "primary producer", "primary succession", "producer",
    "r-selection", "r-strategist", "K-strategist",
    "resource partitioning", "secondary consumer", "secondary succession",
    "symbiosis", "trophic cascade", "trophic level",
    "trophic efficiency", "10 percent rule", "biomass",
    "population density",

    # Plant biology
    "abscisic acid", "apical meristem", "auxin", "cambium",
    "cork cambium", "cotyledon", "cytokinin", "ethylene",
    "gibberellin", "guard cells", "lateral meristem",
    "meristem", "mesophyll", "monocot", "dicot",
    "phloem", "phototropism", "plant hormone",
    "primary growth", "secondary growth", "shoot apical meristem",
    "source-sink", "stomata", "stoma", "transpiration",
    "tropism", "vascular bundle", "vascular tissue", "xylem",
    "root pressure", "cohesion tension", "water column",
    "cohesion", "adhesion", "capillary action",

    # Animal systems
    "action potential", "alveolus", "antidiuretic hormone", "adh",
    "antibody", "antigen", "aorta", "arteriole",
    "atrial natriuretic peptide", "atrium", "autoimmune",
    "axon", "b cell", "blood pressure", "bowman's capsule",
    "capillary", "collecting duct", "countercurrent exchange",
    "dendrite", "dialysis", "distal tubule", "diuretic",
    "feedback loop", "glomerulus", "heart rate",
    "hemoglobin", "homeostasis", "humoral immunity",
    "immune response", "insulin", "loop of henle",
    "lymphocyte", "macrophage", "medulla oblongata",
    "membrane potential", "motor neuron", "muscle contraction",
    "myosin", "negative feedback", "nephron", "neuron",
    "neurotransmitter", "osmoregulation", "oxytocin",
    "phagocyte", "positive feedback", "proximal tubule",
    "reabsorption", "resting potential", "sensory neuron",
    "sodium-potassium pump", "synapse", "synaptic cleft",
    "t cell", "thyroid hormone", "ureter", "urethra",
    "ventricular", "ventricle", "venule",

    # Biotechnology
    "agarose gel", "bacterial transformation", "complementary dna",
    "cdna", "cloning", "dna cloning", "dna fingerprinting",
    "dna library", "electrophoresis", "gel electrophoresis",
    "gene cloning", "gene editing", "genetic engineering",
    "knockout", "pcr", "polymerase chain reaction",
    "plasmid", "recombinant dna", "recombinant plasmid",
    "restriction enzyme", "reverse transcriptase",
    "southern blot", "transformation", "transgenic",
    "vector", "western blot",
]

# De-duplicate and sort longest-first
VOCAB = sorted(list(set(v.lower() for v in RAW_VOCAB)), key=lambda x: -len(x))

# ── Command → skill mapping ───────────────────────────────────────────────────
COMMAND_SKILL = {
    'describe':   'describe',
    'identify':   'describe',
    'compare':    'describe',
    'support':    'describe',
    'define':     'describe',
    'label':      'describe',
    'state':      'describe',
    'name':       'describe',
    'list':       'describe',
    'explain':    'explain',
    'justify':    'explain',
    'analyze':    'explain',
    'evaluate':   'explain',
    'determine':  'explain',
    'discuss':    'explain',
    'predict':    'predict',
    'construct':  'predict',
    'design':     'predict',
    'create':     'predict',
    'model':      'predict',
    'calculate':  'calculate',
    'compute':    'calculate',
    'solve':      'calculate',
    'graph':      'graph',
    'draw':       'graph',
    'sketch':     'graph',
    'plot':       'graph',
}

def command_to_skill(command):
    return COMMAND_SKILL.get(command.lower().strip(), 'describe')

# ── Keyword extractor ─────────────────────────────────────────────────────────
def extract_keywords(rubric_text, max_kw=10):
    """Extract up to max_kw keywords from a rubric text string."""
    text_lower = rubric_text.lower()
    found = []
    seen = set()

    # 1. Explicit "must reference/include" patterns — highest signal
    must_patterns = re.findall(
        r'[Mm]ust (?:reference|include|cite|state|mention)\s+([^.;]+?)(?:\s+(?:and|or|to|in|;|\.)|\s*$)',
        rubric_text, re.IGNORECASE
    )
    for m in must_patterns:
        phrase = m.strip().lower()
        # Split on " or " / " and " to get individual terms
        for part in re.split(r'\s+or\s+|\s+and\s+', phrase):
            kw = part.strip().rstrip('.,;')
            if 2 <= len(kw) <= 60 and kw not in seen:
                found.append(kw)
                seen.add(kw)
        if len(found) >= max_kw:
            return found[:max_kw]

    # 2. "Award point for noting X" patterns
    award_patterns = re.findall(
        r'[Aa]ward point for (?:noting|mentioning|identifying|stating)\s+([^.;]+?)(?:OR|\.|;|$)',
        rubric_text, re.IGNORECASE
    )
    for m in award_patterns:
        phrase = m.strip().lower()
        for part in re.split(r'\s+or\s+|\s+and\s+', phrase):
            kw = part.strip().rstrip('.,;')
            if 2 <= len(kw) <= 60 and kw not in seen:
                found.append(kw)
                seen.add(kw)
        if len(found) >= max_kw:
            return found[:max_kw]

    # 3. AP Bio vocab dictionary (longest-first to prefer multi-word terms)
    for term in VOCAB:
        if term in text_lower and term not in seen:
            found.append(term)
            seen.add(term)
            if len(found) >= max_kw:
                return found[:max_kw]

    # 4. Parenthetical terms — e.g. "(plasmolysis)" → "plasmolysis"
    parens = re.findall(r'\(([a-zA-Z][a-zA-Z0-9 /\-]+)\)', rubric_text)
    for p in parens:
        kw = p.lower().strip()
        # Skip if it looks like a formula or very short
        if 3 <= len(kw) <= 50 and kw not in seen and not re.match(r'^[0-9 ]+$', kw):
            found.append(kw)
            seen.add(kw)
        if len(found) >= max_kw:
            return found[:max_kw]

    return found[:max_kw]

# ── JS keyword array formatter ────────────────────────────────────────────────
def format_kw_array(keywords):
    if not keywords:
        return '[]'
    parts = ', '.join(f'"{k}"' for k in keywords)
    return f'[{parts}]'

# ── Part line regex ───────────────────────────────────────────────────────────
# Matches:  { label: 'X', command: 'Y', question: "...", rubric: "..." },?
PART_RE = re.compile(
    r"""^\s+\{\s*label:\s*'([a-zA-Z])'\s*,\s*command:\s*'([^']+)'\s*,\s*question:\s*"(?:[^"\\]|\\.)*"\s*,\s*rubric:\s*"((?:[^"\\]|\\.)*)"\s*\},?""",
    re.DOTALL
)

# Rubric array line regex (top-level rubric: [...])
RUBRIC_LINE_RE = re.compile(r'^(\s+rubric:\s*)\[(.+)\],(.*)')

# Individual rubric item regex
RUBRIC_ITEM_RE = re.compile(r'\{\s*points:\s*(\d+)\s*,\s*description:\s*"([^"]*)"\s*\}')

# Question-level points line (4-space indent, whole line)
POINTS_LINE_RE = re.compile(r'^(    points:\s*\d+,\s*)$')

# ── Main transformation ───────────────────────────────────────────────────────
def transform(content):
    lines = content.split('\n')
    output = []

    parts_buffer = []   # list of (label, command, rubric_text)
    in_parts = False
    added_auto_graded = False  # per-question flag
    in_question = False

    i = 0
    while i < len(lines):
        line = lines[i]

        # ── Detect start of a new question block ──────────────────────────────
        if re.match(r"^\s+\{\s*$", line) or re.match(r"^var APBIO_FRQ", line):
            # Reset per-question state
            parts_buffer = []
            in_parts = False
            added_auto_graded = False
            output.append(line)
            i += 1
            continue

        # ── Question-level points: add autoGraded: true after it ──────────────
        if POINTS_LINE_RE.match(line) and not in_parts and not added_auto_graded:
            output.append(line)
            output.append('    autoGraded: true,')
            added_auto_graded = True
            i += 1
            continue

        # ── Start of parts array ──────────────────────────────────────────────
        if re.match(r'^\s+parts:\s*\[', line) and not in_parts:
            in_parts = True
            parts_buffer = []
            output.append(line)
            i += 1
            continue

        # ── Inside parts array: collect part items ────────────────────────────
        if in_parts:
            m = PART_RE.match(line)
            if m:
                label, command, rubric_text = m.group(1), m.group(2), m.group(3)
                # Unescape backslash sequences in rubric_text
                rubric_text = rubric_text.replace('\\"', '"').replace('\\\\', '\\')
                parts_buffer.append((label, command, rubric_text))
                output.append(line)
                i += 1
                continue

            # Closing bracket ends the parts array
            if re.match(r'^\s+\],\s*$', line) or re.match(r'^\s+\]\s*$', line):
                in_parts = False
                output.append(line)
                i += 1
                continue

            # Anything else inside parts (shouldn't happen but pass through)
            output.append(line)
            i += 1
            continue

        # ── Top-level rubric array line ───────────────────────────────────────
        m_rubric = RUBRIC_LINE_RE.match(line)
        if m_rubric and parts_buffer and not in_parts:
            prefix     = m_rubric.group(1)   # "    rubric: "
            inner      = m_rubric.group(2)   # everything between [ and ]
            suffix     = m_rubric.group(3)   # anything after ] (usually empty)

            # Parse existing rubric items
            items = RUBRIC_ITEM_RE.findall(inner)  # [(points_str, desc_str), ...]

            new_items = []
            for idx, (pts, desc) in enumerate(items):
                if idx < len(parts_buffer):
                    label, command, rubric_text = parts_buffer[idx]
                else:
                    # Fallback if mismatched counts
                    label   = chr(ord('a') + idx)
                    command = 'Describe'
                    rubric_text = desc  # use truncated desc as fallback

                skill = command_to_skill(command)
                keywords = extract_keywords(rubric_text)
                kw_str = format_kw_array(keywords)

                # Escape any single quotes in desc
                desc_safe = desc.replace("'", "\\'")
                new_items.append(
                    f'{{ points: {pts}, description: "{desc}", '
                    f"partLabel: '{label}', skill: '{skill}', keywords: {kw_str} }}"
                )

            new_line = f'{prefix}[{", ".join(new_items)}],{suffix}'
            output.append(new_line)
            parts_buffer = []  # reset after consuming
            i += 1
            continue

        # ── Pass through everything else ──────────────────────────────────────
        output.append(line)
        i += 1

    return '\n'.join(output)

# ── Run ───────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    print(f'Reading {INPUT_FILE} ...')
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        original = f.read()

    result = transform(original)

    # Quick sanity checks
    auto_graded_count = result.count('autoGraded: true')
    partlabel_count   = result.count('partLabel:')
    print(f'  autoGraded: true   → {auto_graded_count} occurrences (expect 62)')
    print(f'  partLabel:         → {partlabel_count} occurrences')

    if auto_graded_count < 50:
        print('WARNING: fewer than 50 autoGraded insertions — check the script!')
        sys.exit(1)

    with open(INPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(result)

    print(f'Done. {INPUT_FILE} updated in-place.')
