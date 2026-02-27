#!/usr/bin/env python3
"""
fix_apbio_keywords.py — Re-extract keywords with word-boundary matching.
Reads the already-annotated apbio_frq.js, re-extracts keywords for each
rubric item using \b word boundaries (fixes false positives like
"t cell" in "plant cells" and "gene" in "generates").

Keeps autoGraded/partLabel/skill intact — only updates keywords:[].
"""

import re, os, sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INPUT_FILE = os.path.join(BASE, 'js', 'data', 'apbio_frq.js')

# ── AP Bio vocabulary (same as annotate_apbio.py) ────────────────────────────
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
    "genotype", "haploid", "hardy-weinberg equilibrium",
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

    # Evolution
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
    "differential reproduction", "heritable variation", "variation",
    "descent with modification",

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
    "k-selection", "limiting factor", "logistic growth",
    "mutualism", "net primary productivity", "niche",
    "nitrogen cycle", "nitrogen fixation", "nutrient cycling",
    "omnivore", "parasitism", "population", "population growth",
    "predation", "predator-prey", "primary consumer",
    "primary producer", "primary succession", "producer",
    "r-selection", "resource partitioning", "secondary consumer",
    "secondary succession", "symbiosis", "trophic cascade", "trophic level",
    "trophic efficiency", "biomass", "population density",

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
    "atrium", "autoimmune", "axon", "b cell", "blood pressure",
    "bowman's capsule", "capillary", "collecting duct",
    "countercurrent exchange", "dendrite", "dialysis",
    "distal tubule", "diuretic", "feedback loop", "glomerulus",
    "heart rate", "hemoglobin", "homeostasis", "humoral immunity",
    "immune response", "insulin", "loop of henle",
    "lymphocyte", "macrophage", "medulla oblongata",
    "membrane potential", "motor neuron", "muscle contraction",
    "myosin", "negative feedback", "nephron", "neuron",
    "neurotransmitter", "osmoregulation", "oxytocin",
    "phagocyte", "positive feedback", "proximal tubule",
    "reabsorption", "resting potential", "sensory neuron",
    "sodium-potassium pump", "synapse", "synaptic cleft",
    "t cell", "thyroid hormone", "ureter", "urethra",
    "ventricle",

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

VOCAB = sorted(list(set(v.lower() for v in RAW_VOCAB)), key=lambda x: -len(x))
# Pre-compile regex patterns for each vocab term (word-boundary aware)
VOCAB_PATTERNS = [(term, re.compile(r'\b' + re.escape(term) + r'\b')) for term in VOCAB]

COMMAND_SKILL = {
    'describe': 'describe', 'identify': 'describe', 'compare': 'describe',
    'support': 'describe', 'define': 'describe', 'label': 'describe',
    'state': 'describe', 'name': 'describe', 'list': 'describe',
    'explain': 'explain', 'justify': 'explain', 'analyze': 'explain',
    'evaluate': 'explain', 'determine': 'explain', 'discuss': 'explain',
    'predict': 'predict', 'construct': 'predict', 'design': 'predict',
    'create': 'predict', 'model': 'predict',
    'calculate': 'calculate', 'compute': 'calculate', 'solve': 'calculate',
    'graph': 'graph', 'draw': 'graph', 'sketch': 'graph', 'plot': 'graph',
}

def command_to_skill(command):
    return COMMAND_SKILL.get(command.lower().strip(), 'describe')

def extract_keywords(rubric_text, max_kw=10):
    """Extract keywords using WORD-BOUNDARY matching to avoid false positives."""
    text_lower = rubric_text.lower()
    found = []
    seen = set()

    # 1. "Must reference/include" patterns — highest signal
    must_patterns = re.findall(
        r'[Mm]ust (?:reference|include|cite|state|mention)\s+([^.;]+?)(?:\s+(?:and|or|to|in|;|\.)|\s*$)',
        rubric_text, re.IGNORECASE
    )
    for m in must_patterns:
        phrase = m.strip().lower()
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

    # 3. AP Bio vocab with WORD BOUNDARIES (prevents "t cell" in "plant cells")
    for term, pattern in VOCAB_PATTERNS:
        if pattern.search(text_lower) and term not in seen:
            found.append(term)
            seen.add(term)
            if len(found) >= max_kw:
                return found[:max_kw]

    # 4. Parenthetical terms — e.g. "(plasmolysis)" → "plasmolysis"
    parens = re.findall(r'\(([a-zA-Z][a-zA-Z0-9 /\-]+)\)', rubric_text)
    for p in parens:
        kw = p.lower().strip()
        # Skip compound parentheticals like "(and cytoplasm)" — "and X" is noise
        if kw.startswith('and ') or kw.startswith('or '):
            continue
        if 3 <= len(kw) <= 50 and kw not in seen and not re.match(r'^[0-9 ]+$', kw):
            found.append(kw)
            seen.add(kw)
        if len(found) >= max_kw:
            return found[:max_kw]

    return found[:max_kw]

def format_kw_array(keywords):
    if not keywords:
        return '[]'
    parts = ', '.join(f'"{k}"' for k in keywords)
    return f'[{parts}]'

# ── Part line regex ───────────────────────────────────────────────────────────
PART_RE = re.compile(
    r"""^\s+\{\s*label:\s*'([a-zA-Z])'\s*,\s*command:\s*'([^']+)'\s*,\s*question:\s*"(?:[^"\\]|\\.)*"\s*,\s*rubric:\s*"((?:[^"\\]|\\.)*)"\s*\},?""",
    re.DOTALL
)

# Annotated rubric item: { points: N, description: "...", partLabel: 'X', skill: 'Y', keywords: [...] }
ANNOTATED_ITEM_RE = re.compile(
    r'\{\s*points:\s*(\d+)\s*,\s*description:\s*"([^"]*)"\s*,'
    r'\s*partLabel:\s*\'([a-z])\'\s*,\s*skill:\s*\'([^\']+)\'\s*,'
    r'\s*keywords:\s*\[[^\]]*\]\s*\}'
)

RUBRIC_LINE_RE = re.compile(r'^(\s+rubric:\s*)\[(.+)\],(.*)')

def transform(content):
    lines = content.split('\n')
    output = []
    parts_buffer = []
    in_parts = False

    for line in lines:
        # Track entering parts array
        if re.match(r'^\s+parts:\s*\[', line) and not in_parts:
            in_parts = True
            parts_buffer = []
            output.append(line)
            continue

        if in_parts:
            m = PART_RE.match(line)
            if m:
                label = m.group(1)
                command = m.group(2)
                rubric_text = m.group(3).replace('\\"', '"').replace('\\\\', '\\')
                parts_buffer.append((label, command, rubric_text))
                output.append(line)
                continue
            if re.match(r'^\s+\],\s*$', line) or re.match(r'^\s+\]\s*$', line):
                in_parts = False
                output.append(line)
                continue
            output.append(line)
            continue

        # Annotated rubric line — re-extract keywords
        m_rubric = RUBRIC_LINE_RE.match(line)
        if m_rubric and parts_buffer and not in_parts:
            prefix = m_rubric.group(1)
            inner  = m_rubric.group(2)
            suffix = m_rubric.group(3)

            items = ANNOTATED_ITEM_RE.findall(inner)
            if not items:
                # Fallback: pass through unchanged
                output.append(line)
                parts_buffer = []
                continue

            new_items = []
            for idx, (pts, desc, part_label, skill) in enumerate(items):
                if idx < len(parts_buffer):
                    _, command, rubric_text = parts_buffer[idx]
                    # Re-derive skill from command in case it changed
                    skill = command_to_skill(command)
                else:
                    rubric_text = desc
                keywords = extract_keywords(rubric_text)
                kw_str = format_kw_array(keywords)
                new_items.append(
                    f"{{ points: {pts}, description: \"{desc}\", "
                    f"partLabel: '{part_label}', skill: '{skill}', keywords: {kw_str} }}"
                )

            output.append(f'{prefix}[{", ".join(new_items)}],{suffix}')
            parts_buffer = []
            continue

        output.append(line)

    return '\n'.join(output)

if __name__ == '__main__':
    print(f'Re-extracting keywords with word-boundary matching ...')
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    result = transform(content)

    # Verify: check SB-05 keywords no longer contain "t cell" in osmosis context
    if '"t cell"' in result:
        # Count occurrences
        count = result.count('"t cell"')
        print(f'  WARNING: "t cell" still appears {count} times')
        # Show contexts
        for m in re.finditer(r'.{0,60}"t cell".{0,60}', result):
            print(f'    ... {m.group()} ...')
    else:
        print('  OK: "t cell" false positive removed')

    if re.search(r'keywords:.*"gene"[^a-z]', result):
        print('  WARNING: bare "gene" keyword may still exist in non-genetics context')
    else:
        print('  OK: "gene" false positive check passed')

    kw_count = result.count('keywords:')
    print(f'  keywords: fields = {kw_count} (expect 233)')

    with open(INPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(result)
    print(f'Done. {INPUT_FILE} updated.')
