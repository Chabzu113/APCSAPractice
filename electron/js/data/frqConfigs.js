// FRQ Grading Engine Configuration — v1.6.0
// Subject-keyed config object for the APUSHGrader engine.
// Designed to be extensible to other AP subjects (AP Bio, AP Lang, etc.)

var FRQ_CONFIGS = {

  apush: {
    autoGradeAll: true,  // every apush FRQ question is auto-graded

    // ─── Shorthand Resolution ────────────────────────────────────────────────
    // All keys must be UPPERCASE for case-insensitive lookup
    shorthands: {
      'FDR':   'Franklin Roosevelt',
      'LBJ':   'Lyndon Johnson',
      'JFK':   'John Kennedy',
      'TR':    'Theodore Roosevelt',
      'TJ':    'Thomas Jefferson',
      'GW':    'George Washington',
      'AJ':    'Andrew Jackson',
      'ABE':   'Abraham Lincoln',
      'FED GOV': 'federal government',
      'FED':   'federal',
      'K-N':   'Kansas-Nebraska',
      'KS-NE': 'Kansas-Nebraska',
      'KKK':   'Ku Klux Klan',
      '13TH':  'Thirteenth Amendment',
      '14TH':  'Fourteenth Amendment',
      '15TH':  'Fifteenth Amendment',
      '16TH':  'Sixteenth Amendment',
      '17TH':  'Seventeenth Amendment',
      '19TH':  'Nineteenth Amendment',
      'AMDT':  'Amendment',
      'AMEND': 'Amendment',
      'WWI':   'World War I',
      'WWII':  'World War II',
      'WW1':   'World War I',
      'WW2':   'World War II',
      'US':    'United States',
      'SCOTUS': 'Supreme Court',
      'POTUS': 'President',
      'GOP':   'Republican Party',
      'NAACP': 'National Association for the Advancement of Colored People',
      'SNCC':  'Student Nonviolent Coordinating Committee',
      'NOW':   'National Organization for Women',
      'AFL':   'American Federation of Labor',
      'CIO':   'Congress of Industrial Organizations',
      'NAWSA': 'National American Woman Suffrage Association'
    },

    // ─── Causal Connector Words/Phrases ─────────────────────────────────────
    // Used for Proximity Logic (evidence + connector within 25-word window)
    causalConnectors: [
      // Causal connectors
      'because', 'led to', 'caused', 'resulted in', 'consequently',
      'therefore', 'as a result', 'thus', 'due to', 'in order to',
      'which caused', 'so that', 'enabled', 'prompted', 'sparked',
      'contributed to', 'gave rise to', 'brought about', 'forced',
      'allowed', 'created', 'produced', 'generated', 'triggered',
      'made possible', 'drove', 'pushed', 'shaped', 'influenced',
      'stemmed from', 'arose from', 'emerged from', 'rooted in',
      'in response to', 'as a consequence',
      // Contrast/comparison connectors (valid for SAQ compare/contrast parts)
      'while', 'whereas', 'however', 'in contrast', 'unlike',
      'on the other hand', 'although', 'despite', 'compared to',
      'by contrast', 'conversely', 'instead', 'rather than',
      'differed', 'difference', 'different from', 'similarly',
      'in comparison', 'as opposed to', 'yet', 'but'
    ],

    // ─── Thesis: Reasoning Process Words ────────────────────────────────────
    // Must appear in first 15% of essay to signal a reasoning-based thesis
    reasoningProcessWords: [
      'change', 'continuity', 'comparison', 'causation',
      'compare', 'contrast', 'cause', 'effect', 'effects',
      'while', 'although', 'whereas', 'however', 'despite',
      'more than', 'less than', 'increased', 'decreased',
      'shifted', 'transformed', 'remained', 'continued',
      'to a greater extent', 'to a lesser extent',
      'significantly', 'fundamentally', 'primarily', 'largely',
      'both', 'neither', 'not only', 'but also'
    ],

    // ─── Context: Prior-Era Keywords ────────────────────────────────────────
    // Must appear in introduction (first 20% of text) to signal historical context
    priorEraKeywords: [
      'prior to', 'before', 'previously', 'earlier',
      'by the time', 'since', 'going back', 'in the years before',
      'historically', 'throughout', 'dating back', 'as early as',
      'following', 'in the wake of', 'as a result of earlier',
      'building on', 'rooted in', 'originating in', 'tracing back'
    ],

    // ─── DBQ Sourcing Triggers ───────────────────────────────────────────────
    // Must appear within 20 words of a document citation to earn sourcing point
    sourcingTriggers: [
      'purpose', 'audience', 'point of view', 'pov',
      'historical context', 'intended', 'written for',
      'as a', 'to persuade', 'to justify', 'to argue',
      'bias', 'perspective', 'credibility', 'reliability',
      'as a member of', 'speaking to', 'addressing',
      'motivated by', 'written by', 'in order to convince',
      'as president', 'as senator', 'as a slave', 'as an abolitionist',
      'reflects', 'reveals', 'demonstrates the perspective'
    ],

    // ─── Complexity / Transitional Phrases ──────────────────────────────────
    // Signals sophisticated analysis in LEQ/DBQ
    transitionalPhrases: [
      'conversely', 'while', 'despite', 'although',
      'on the other hand', 'however', 'similarly', 'in contrast',
      'unlike', 'both', 'neither', 'not only', 'but also',
      'at the same time', 'even so', 'nevertheless',
      'this is complicated by', 'it is important to note',
      'one must consider', 'qualifying this', 'to a degree'
    ],

    // ─── REFINEMENT 4: Unit Date Ranges (for era-overlap buffer) ────────────
    // [startYear, endYear] — approximate period boundaries
    unitDateRanges: {
      1: [1491, 1607],
      2: [1607, 1754],
      3: [1754, 1800],
      4: [1800, 1848],
      5: [1844, 1877],
      6: [1865, 1898],
      7: [1890, 1945],
      8: [1945, 1980],
      9: [1980, 2025]
    },

    // ─── Per-Unit Evidence Buckets & Config ─────────────────────────────────
    units: {
      1: {
        // FIX5: Added full Columbian Exchange biological-transfer terms so Period 1 LEQ/SAQ
        // essays earn evidence credit for horses, cattle, wheat, measles, etc. — not just
        // 'smallpox' and 'maize' which were already present. 'Smallpox' and 'Maize' remain
        // explicitly here so capitalized student spelling still resolves after toLowerCase().
        standard: [
          'encomienda', 'columbian exchange', 'pueblo revolt', 'powhatan',
          'caste system', 'casta', 'atlantic slave trade',
          'seven cities of cibola', 'conquistadors',
          'spanish missions', 'joint-stock company',
          'protestant reformation', 'indigenous peoples',
          'aztec', 'inca', 'corn', 'maize', 'disease', 'smallpox',
          'horses', 'cattle', 'wheat', 'measles', 'pigs', 'livestock',
          'depopulation', 'epidemic', 'native population',
          'gold silver', 'fur trade'
        ],
        niche: [
          'quinto real', 'mita', 'coercive labor',
          'indentured servitude', 'repartimiento',
          'black legend', 'bartolome de las casas', 'juan de sepulveda',
          'valladolid debate', 'maroons', 'terra nullius',
          'doctrine of discovery', 'casa de contratacion',
          'great plains', 'mississippian culture', 'iroquois confederacy',
          'pueblo peoples', 'cahokia'
        ],
        qualifierChecks: [
          {
            term: 'encomienda',
            badQualifiers: ['paid labor', 'voluntary', 'paid', 'wages', 'willing'],
            reason: 'Encomienda was a system of forced labor and tribute, not voluntary or paid work'
          }
        ]
      },
      2: {
        standard: [
          'headright system', 'bacon\'s rebellion', 'salutary neglect',
          'navigation acts', 'triangular trade', 'halfway covenant',
          'dominion of new england', 'patroon system', 'house of burgesses',
          'mayflower compact', 'puritans', 'pilgrims', 'anne hutchinson',
          'roger williams', 'massachusetts bay colony', 'tobacco',
          'indentured servants', 'royal african company', 'slave trade',
          'mercantilism', 'middle passage', 'great awakening'
        ],
        niche: [
          'covenant theology', 'antinomianism', 'praying towns',
          'king philip\'s war', 'salem witch trials', 'great migration',
          'middle colonies', 'proprietary colonies', 'charter colonies',
          'south carolina rice', 'south carolina slave codes', 'stono rebellion',
          'enlightenment'
        ],
        qualifierChecks: [
          {
            term: 'navigation acts',
            badQualifiers: ['free trade', 'open trade'],
            reason: 'Navigation Acts restricted colonial trade; they did not promote free trade'
          },
          {
            term: 'bacon\'s rebellion',
            badQualifiers: ['abolitionist', 'end slavery', 'against slavery', 'anti-slavery'],
            reason: 'Bacon\'s Rebellion was about land rights, frontier protection, and class tensions — not about ending slavery'
          }
        ]
      },
      3: {
        standard: [
          'stamp act', 'declaration of independence', 'articles of confederation',
          'constitution', 'federalists', 'anti-federalists', 'bill of rights',
          'french and indian war', 'boston massacre', 'boston tea party',
          'continental congress', 'common sense', 'thomas paine',
          'shays rebellion', 'northwest ordinance', 'george washington',
          'john adams', 'thomas jefferson', 'james madison', 'alexander hamilton',
          'federalist papers', 'checks and balances', 'separation of powers',
          'popular sovereignty', 'social contract', 'natural rights',
          'proclamation of 1763',
          // Added v1.7.0 — people, laws, events named in new Unit 3 DBQ docs
          'mercy otis warren', 'patrick henry', 'electoral college',
          'constitutional convention', 'philadelphia convention'
        ],
        niche: [
          'virtual representation', 'actual representation',
          'no taxation without representation', 'committees of correspondence',
          'sons of liberty', 'daughters of liberty', 'intolerable acts',
          'coercive acts', 'writs of assistance',
          'quartering act', 'townsend acts', 'three-fifths compromise',
          'great compromise', 'connecticut compromise',
          'pontiac\'s rebellion', 'alien and sedition acts', 'republican motherhood',
          // Added v1.7.0 — from Unit 3 DBQ docs (Mercy Otis Warren pamphlet,
          // Washington-Knox letter, Patrick Henry speech, Electoral College diagram)
          'observations on the new constitution', 'virginia ratifying convention',
          'henry knox', 'qualified veto', 'presidential veto',
          'land ordinance', 'land ordinance 1785', 'paper money', 'paper currency',
          'state debts', 'benjamin lincoln', 'brutus'
        ],
        // These terms always count as outside evidence for Unit 3 DBQs
        // even if they appear in Federalist Papers excerpts
        outsideEvidenceTerms: [
          'bill of rights', 'articles of confederation', 'shays rebellion',
          'northwest ordinance', 'three-fifths compromise', 'great compromise',
          'connecticut compromise', 'alien and sedition acts',
          // Added v1.7.0 — new Unit 3 DBQ doc figures / concepts
          'mercy otis warren', 'electoral college', 'patrick henry',
          'constitutional convention', 'henry knox', 'land ordinance'
        ],
        qualifierChecks: [
          {
            term: 'stamp act',
            badQualifiers: ['indirect'],
            reason: 'The Stamp Act was a direct tax on paper goods, not an indirect trade tax'
          },
          {
            term: 'articles of confederation',
            badQualifiers: ['strong', 'powerful', 'taxation power', 'power to tax'],
            reason: 'The Articles of Confederation created a deliberately weak central government with no power to levy taxes'
          }
        ]
      },
      4: {
        standard: [
          'market revolution', 'jacksonian democracy', 'indian removal act',
          'manifest destiny', 'trail of tears', 'nullification crisis',
          'second great awakening', 'cult of domesticity', 'seneca falls',
          'abolition', 'william lloyd garrison', 'frederick douglass',
          'lowell mills', 'erie canal', 'railroad', 'cotton gin',
          'eli whitney', 'whig party', 'democratic party',
          'missouri compromise', 'tariff of abominations', 'henry clay',
          'american system', 'john c calhoun', 'bank war',
          'nat turner', 'harriet tubman', 'underground railroad',
          'monroe doctrine',
          // Added v1.7.0 — people, laws, events from new Unit 4 DBQ docs
          'transportation revolution', 'cyrus mccormick', 'sarah bagley'
        ],
        niche: [
          'utopian communities', 'brook farm', 'oneida community',
          'temperance movement', 'american colonization society',
          'immediate emancipation', 'gradualism', 'moral suasion',
          'spoils system', 'rotation in office', 'kitchen cabinet',
          'pet banks', 'specie circular', 'panic of 1837',
          'gag rule', 'annexation of texas',
          // Added for v1.7.0 Market Revolution DBQ
          'charles river bridge', 'lowell offering', 'mccormick reaper',
          'putting-out system', 'factory system', 'wage labor',
          'charles grandison finney', 'revivalism',
          // Added v1.7.0 — specific people/sources from Unit 4 DBQ docs
          'roger taney', 'sarah g bagley', 'lectures on revivals of religion',
          'southern agriculturist', 'lowell strikes', 'prairie farmer',
          'virginia reaper', 'lowell mill worker'
        ],
        qualifierChecks: [
          {
            term: 'nullification crisis',
            badQualifiers: ['northern', 'new england'],
            reason: 'The Nullification Crisis originated in South Carolina, not the North'
          },
          {
            term: 'monroe doctrine',
            badQualifiers: ['alliance', 'european alliance', 'allied with europe', 'partnership with europe'],
            reason: 'The Monroe Doctrine warned European powers to stay out of the Americas; it asserted non-intervention, not alliance'
          }
        ]
      },
      5: {
        standard: [
          'compromise of 1850', 'kansas-nebraska act', 'dred scott',
          'emancipation proclamation', 'reconstruction', 'radical republicans',
          'popular sovereignty', 'bleeding kansas', 'fugitive slave act',
          'john brown', 'civil war', 'gettysburg', 'union', 'confederacy',
          'thirteenth amendment', 'fourteenth amendment', 'fifteenth amendment',
          'freedmen\'s bureau', 'sharecropping', 'black codes',
          'ku klux klan', 'carpetbaggers', 'scalawags',
          'compromise of 1877', 'lincoln', 'ulysses grant',
          'jefferson davis', 'stonewall jackson', 'robert e lee',
          'manifest destiny'
        ],
        niche: [
          'border ruffians', 'lecompton constitution', 'ostend manifesto',
          'fire-eaters', 'wilmot proviso', 'free soil party',
          'know-nothing party', 'stephen douglas', 'bleeding sumner',
          'charles sumner', 'presidential reconstruction',
          'wade-davis bill', 'tenure of office act',
          'credit mobilier', 'waving the bloody shirt',
          'redeemers', 'lost cause mythology'
        ],
        qualifierChecks: [
          {
            term: 'stamp act',
            badQualifiers: ['indirect'],
            reason: 'The Stamp Act was a direct tax, not an indirect one'
          },
          {
            term: 'popular sovereignty',
            badQualifiers: ['federal', 'congressional', 'national'],
            reason: 'Popular sovereignty meant territories (not Congress or the federal government) decided on slavery'
          },
          {
            term: 'dred scott',
            badQualifiers: ['freed', 'granted citizenship', 'won freedom'],
            reason: 'Dred Scott ruling denied freedom and citizenship to enslaved people; the decision went against Dred Scott'
          },
          {
            term: 'thirteenth amendment',
            badQualifiers: ['voting', 'vote', 'citizenship'],
            reason: 'The 13th Amendment abolished slavery; voting rights came from the 15th Amendment'
          },
          {
            term: 'fourteenth amendment',
            badQualifiers: ['voting', 'vote', 'suffrage'],
            reason: 'The 14th Amendment granted citizenship and equal protection; voting rights came from the 15th Amendment'
          }
        ]
      },
      6: {
        standard: [
          'gilded age', 'robber barons', 'populist party', 'homestead act',
          'social darwinism', 'vertical integration', 'horizontal integration',
          'sherman antitrust act', 'pendleton civil service act',
          'grange movement', 'farmers alliance', 'omaha platform',
          'william jennings bryan', 'cross of gold', 'free silver',
          'andrew carnegie', 'john d rockefeller', 'j p morgan',
          'standard oil', 'carnegie steel', 'transcontinental railroad',
          'chinese exclusion act', 'new immigration', 'old immigration',
          'tenements', 'jane addams', 'hull house', 'settlement houses',
          'knights of labor', 'american federation of labor', 'samuel gompers',
          'homestead strike', 'pullman strike', 'haymarket riot',
          'plessy v ferguson', 'jim crow', 'segregation',
          // Added for v1.7.0 Gilded Age DBQ
          'gospel of wealth', 'jacob riis', 'how the other half lives',
          'trust', 'monopoly', 'laissez-faire',
          // Added v1.7.0 — specific people/laws from Unit 6 DBQ docs
          'henry clay frick', 'amalgamated association', 'protective tariff'
        ],
        niche: [
          'munn v illinois', 'wabash v illinois', 'interstate commerce act',
          'patronage politics', 'tammany hall', 'boss tweed',
          'half-breeds', 'stalwarts', 'mugwumps',
          'frederick jackson turner', 'frontier thesis',
          'ghost dance', 'battle of wounded knee', 'dawes act',
          'deflation', 'bimetallism', 'gold standard', 'greenbacks',
          'crop lien system', 'convict leasing',
          'ida b wells', 'long drive', 'comstock lode',
          // Added for v1.7.0 Gilded Age DBQ
          'pinkerton', 'pinkerton agency', 'welfare capitalism',
          'eight hour day', 'collective bargaining',
          // Added v1.7.0 — specific people/sources from Unit 6 DBQ docs
          'frick', 'joseph keppler', 'puck magazine',
          'amalgamated association of iron and steel workers',
          'governor pattison', 'five points', 'lower east side',
          'carnegie wharf', 'protectors of our industries'
        ],
        qualifierChecks: [
          {
            term: 'sherman antitrust act',
            badQualifiers: ['successfully broke up', 'effectively ended'],
            reason: 'The Sherman Antitrust Act was largely ineffective until Theodore Roosevelt enforced it; it did not immediately break up monopolies'
          },
          {
            term: 'social darwinism',
            badQualifiers: ['helped poor', 'benefited workers', 'lifted poor', 'improved workers', 'aided poor'],
            reason: 'Social Darwinism was used to justify inequality and oppose government aid; it argued the poor were naturally unfit, not that they deserved assistance'
          },
          {
            term: 'chinese exclusion act',
            badQualifiers: ['welcomed', 'encouraged', 'invited', 'supported immigration', 'open immigration'],
            reason: 'The Chinese Exclusion Act (1882) banned Chinese laborers from entering the U.S.; it was a restrictive, exclusionary law — not a welcoming policy'
          },
          {
            term: 'plessy v ferguson',
            badQualifiers: ['overturned segregation', 'ended segregation', 'banned segregation', 'struck down segregation'],
            reason: 'Plessy v. Ferguson (1896) upheld segregation under "separate but equal"; it was Brown v. Board of Education (1954) that later overturned it'
          },
          {
            term: 'homestead strike',
            badQualifiers: ['workers won', 'succeeded', 'victory for workers', 'unions won', 'labor victory'],
            reason: 'The Homestead Strike (1892) was crushed; Frick brought in Pinkerton agents and strikebreakers, defeating the union and setting back steel-industry unionism for decades'
          }
        ]
      },
      7: {
        standard: [
          'progressive era', 'new deal', 'world war i', 'world war ii',
          'great depression', 'muckrakers', 'theodore roosevelt',
          'woodrow wilson', 'franklin roosevelt', 'square deal',
          'new freedom', 'trust busting', 'pure food and drug act',
          'federal reserve', 'income tax', 'direct election of senators',
          'initiative referendum recall', 'prohibition',
          'nineteenth amendment', 'women\'s suffrage',
          'lend-lease', 'atlantic charter', 'wagner act',
          'social security act', 'internment', 'manhattan project',
          'harlem renaissance', 'great migration', 'ku klux klan',
          'red scare', 'palmer raids', 'isolationism',
          'fourteen points', 'league of nations', 'treaty of versailles',
          'neutrality acts', 'd-day', 'hiroshima',
          // Added v1.7.0 — people from Unit 7 DBQ docs
          'eleanor roosevelt', 'a philip randolph'
        ],
        niche: [
          'dollar diplomacy', 'moral diplomacy', 'open door policy',
          'roosevelt corollary', 'platt amendment', 'panama canal',
          'zimmermann telegram', 'espionage act', 'sedition act',
          'schenck v united states', 'sacco and vanzetti',
          'quota acts', 'emergency quota act', 'national origins act',
          'bonus army', 'townsend plan', 'huey long',
          'court packing plan', 'second new deal',
          'war industries board', 'irreconcilables', 'cash and carry',
          'bracero program', 'dust bowl', 'zoot suit riots',
          // Added for v1.7.0 Great Depression & WWII DBQ
          'share our wealth', 'a. philip randolph', 'march on washington',
          'gerald nye', 'neutrality act', 'executive order 9066',
          'we can do it', 'rosie the riveter', 'war production',
          'defense spending', 'double v campaign',
          // Added v1.7.0 — specific laws, events, people from Unit 7 DBQ docs
          'nye committee', 'executive order 8802',
          'war production board', 'war production coordinating committee',
          'westinghouse', 'j howard miller',
          'japanese american internment', 'internment camps',
          'japanese american', 'munitions makers',
          'every man a king', 'share our wealth society',
          'dust bowl farmer', 'pearl harbor', 'home front',
          'women in workforce', 'defense industries'
        ],
        qualifierChecks: [
          {
            term: 'new deal',
            badQualifiers: ['ended the depression', 'solved the depression', 'ended unemployment'],
            reason: 'The New Deal relieved suffering but did not end the Great Depression; WWII mobilization ultimately restored full employment'
          },
          {
            term: 'league of nations',
            badQualifiers: ['joined', 'ratified', 'entered'],
            reason: 'The United States never joined the League of Nations; the Senate rejected the Treaty of Versailles'
          },
          {
            term: 'prohibition',
            badQualifiers: ['succeeded', 'worked', 'effective', 'eliminated drinking', 'ended alcoholism', 'reduced crime'],
            reason: 'Prohibition failed to eliminate alcohol consumption; bootlegging, speakeasies, and organized crime flourished throughout the 1920s'
          },
          {
            term: 'fourteen points',
            badQualifiers: ['ratified', 'accepted', 'implemented', 'adopted', 'enacted', 'agreed upon'],
            reason: 'Wilson\'s Fourteen Points were largely rejected at Versailles; Allied powers imposed punitive terms on Germany, and the Senate refused to ratify the resulting treaty'
          },
          {
            term: 'espionage act',
            badQualifiers: ['protected speech', 'protected rights', 'defended rights', 'upheld liberty', 'guarded freedom'],
            reason: 'The Espionage Act of 1917 severely restricted free speech; it was used to prosecute anti-war activists such as Eugene Debs, who was sentenced to prison for criticizing the draft'
          }
        ]
      },
      8: {
        standard: [
          'cold war', 'civil rights act', 'truman doctrine', 'marshall plan',
          'vietnam war', 'containment', 'domino theory', 'nsc-68',
          'korean war', 'mccarthy', 'mccarthyism', 'huac',
          'dwight eisenhower', 'john kennedy', 'lyndon johnson',
          'great society', 'voting rights act', 'medicare', 'medicaid',
          'civil rights movement', 'martin luther king',
          'brown v board', 'montgomery bus boycott',
          'freedom riders', 'sit-ins', 'selma', 'march on washington',
          'black power', 'gulf of tonkin', 'tet offensive',
          'kent state', 'counterculture', 'feminism', 'warren court',
          'detente', 'nixon', 'watergate', 'apollo program'
        ],
        niche: [
          'berlin airlift', 'berlin wall', 'sputnik', 'arms race',
          'massive retaliation', 'military-industrial complex',
          'interstate highway act', 'baby boom', 'sunbelt',
          'loyalty oaths', 'red channels', 'black list',
          'nonviolent direct action', 'sncc', 'core', 'sclc',
          'stokely carmichael', 'malcom x', 'nation of islam',
          'watts riots', 'kerner commission',
          'equal pay act', 'title ix', 'roe v wade',
          'strategic arms limitation talks', 'salt i', 'nixon china',
          'port huron statement', 'silent spring', 'my lai massacre',
          'church committee', 'stagflation', 'saturday night massacre'
        ],
        qualifierChecks: [
          {
            term: 'brown v board',
            badQualifiers: ['immediately integrated', 'quickly desegregated'],
            reason: 'Brown v. Board was implemented "with all deliberate speed" and faced massive resistance; desegregation was slow and contested'
          },
          {
            term: 'gulf of tonkin',
            badQualifiers: ['certain', 'confirmed attack', 'actual attack'],
            reason: 'The second Gulf of Tonkin incident was disputed and likely did not occur; it was used as a pretext for escalation'
          },
          {
            term: 'vietnam war',
            badQualifiers: ['won', 'victory', 'us won', 'american victory', 'us victory', 'united states won'],
            reason: 'The United States did not win the Vietnam War; American combat forces withdrew in 1973 under the Paris Peace Accords, and Saigon fell to North Vietnamese forces in 1975'
          },
          {
            term: 'mccarthyism',
            badQualifiers: ['correct', 'proven right', 'found real communists', 'justified', 'successful', 'effective'],
            reason: 'Most of McCarthy\'s accusations were baseless; he was censured by the Senate in 1954 after the Army-McCarthy hearings exposed his reckless and unsubstantiated charges'
          },
          {
            term: 'roe v wade',
            badQualifiers: ['banned abortion', 'made abortion illegal', 'restricted abortion', 'outlawed abortion', 'prohibited abortion'],
            reason: 'Roe v. Wade (1973) legalized abortion nationwide by establishing a constitutional right to abortion — it did not ban or restrict the practice'
          }
        ]
      },
      9: {
        standard: [
          'reaganomics', 'supply-side economics', 'reagan', 'cold war',
          'soviet union', 'iran contra', 'nafta', 'welfare reform',
          'patriot act', 'september 11', 'war on terror',
          'george h w bush', 'bill clinton', 'george w bush',
          'desert storm', 'iraq war', 'al qaeda', 'taliban',
          'gorbachev', 'glasnost', 'perestroika', 'berlin wall falls',
          'deregulation', 'tax cuts', 'deficit spending',
          'culture wars', 'religious right', 'moral majority',
          'immigration reform', 'globalization', 'technology boom',
          'dot-com bubble', 'financial crisis'
        ],
        niche: [
          'new federalism', 'devolution', 'block grants',
          'strategic defense initiative', 'star wars',
          'iran hostage crisis', 'stagflation', 'malaise',
          'demographic revolution', 'sunbelt growth',
          'identity politics', 'third way', 'dwto',
          'contract with america', 'newt gingrich',
          'don\'t ask don\'t tell', 'defense of marriage act',
          'obamacare', 'affordable care act', 'tea party',
          'citizens united', 'subprime mortgage crisis',
          'hanging chad', 'occupy wall street', 'daca'
        ],
        qualifierChecks: [
          {
            term: 'reaganomics',
            badQualifiers: ['helped the poor', 'reduced poverty', 'helped working class'],
            reason: 'Supply-side economics primarily benefited wealthy Americans; critics argued it widened inequality through trickle-down effects'
          },
          {
            term: 'iran-contra',
            badQualifiers: ['legal', 'approved by congress', 'constitutional', 'authorized', 'congressional approval'],
            reason: 'The Iran-Contra affair was an illegal covert operation; it violated the Boland Amendment, which explicitly prohibited U.S. military aid to the Nicaraguan Contras'
          },
          {
            term: 'nafta',
            badQualifiers: ['created manufacturing jobs', 'helped factory workers', 'brought back manufacturing', 'benefited manufacturing workers', 'saved manufacturing'],
            reason: 'NAFTA was associated with the outsourcing of manufacturing jobs to lower-wage countries; labor unions and critics argued it devastated American factory workers'
          },
          {
            term: 'war on terror',
            badQualifiers: ['won', 'ended terrorism', 'eliminated terrorism', 'defeated terrorism', 'succeeded', 'victory'],
            reason: 'The War on Terror did not decisively end terrorism; it led to prolonged, costly military engagements in Afghanistan and Iraq without clear resolution'
          }
        ]
      }
    },

    // ─── REFINEMENT 4: Forbidden Anachronism Terms (object format) ──────────
    // MODULAR DESIGN: forbiddenByUnit is defined per-subject inside each config block.
    // The engine reads config.forbiddenByUnit[unitNum] — no engine changes needed
    // to add a new subject's forbidden terms.
    //
    // Format: { unitNum: [{ term: string, validFrom: unitNum }] }
    // validFrom: earliest unit where the term is historically valid.
    // Grace buffer of 15 years applied by isForbiddenInEra().
    //
    // Subject-specific examples:
    //   APUSH: blocks 'internet','smartphone','tiktok' for pre-Unit-9 essays
    //   AP Gov (future): could block 'citizens united' for pre-2010 units
    //   AP Bio (future): could block 'CRISPR' for pre-2012 genetics units
    forbiddenByUnit: {
      1: [
        // Digital / internet era
        { term: 'internet',         validFrom: 9 },
        { term: 'email',            validFrom: 9 },
        { term: 'social media',     validFrom: 9 },
        { term: 'cell phone',       validFrom: 9 },
        { term: 'smartphone',       validFrom: 9 },
        { term: 'computer',         validFrom: 8 },
        { term: 'tiktok',           validFrom: 9 },
        { term: 'facebook',         validFrom: 9 },
        { term: 'twitter',          validFrom: 9 },
        { term: 'instagram',        validFrom: 9 },
        { term: 'google',           validFrom: 9 },
        // Industrial / modern tech
        { term: 'railroad',         validFrom: 4 },
        { term: 'steam engine',     validFrom: 4 },
        { term: 'telephone',        validFrom: 6 },
        { term: 'automobile',       validFrom: 7 },
        { term: 'airplane',         validFrom: 7 },
        { term: 'radio',            validFrom: 7 },
        // 20th-century events/tech
        { term: 'nuclear',          validFrom: 8 },
        { term: 'world war',        validFrom: 7 },
        { term: 'civil rights act', validFrom: 8 },
        { term: 'television',       validFrom: 8 }
      ],
      2: [
        { term: 'internet',         validFrom: 9 },
        { term: 'email',            validFrom: 9 },
        { term: 'social media',     validFrom: 9 },
        { term: 'cell phone',       validFrom: 9 },
        { term: 'smartphone',       validFrom: 9 },
        { term: 'computer',         validFrom: 8 },
        { term: 'tiktok',           validFrom: 9 },
        { term: 'facebook',         validFrom: 9 },
        { term: 'twitter',          validFrom: 9 },
        { term: 'instagram',        validFrom: 9 },
        { term: 'google',           validFrom: 9 },
        { term: 'nuclear',          validFrom: 8 },
        { term: 'world war',        validFrom: 7 },
        { term: 'civil war',        validFrom: 5 },
        { term: 'railroad',         validFrom: 4 },
        { term: 'telephone',        validFrom: 6 },
        { term: 'automobile',       validFrom: 7 },
        { term: 'airplane',         validFrom: 7 },
        { term: 'radio',            validFrom: 7 },
        { term: 'television',       validFrom: 8 }
      ],
      3: [
        { term: 'internet',         validFrom: 9 },
        { term: 'email',            validFrom: 9 },
        { term: 'social media',     validFrom: 9 },
        { term: 'cell phone',       validFrom: 9 },
        { term: 'smartphone',       validFrom: 9 },
        { term: 'computer',         validFrom: 8 },
        { term: 'tiktok',           validFrom: 9 },
        { term: 'facebook',         validFrom: 9 },
        { term: 'twitter',          validFrom: 9 },
        { term: 'instagram',        validFrom: 9 },
        { term: 'google',           validFrom: 9 },
        { term: 'civil war',        validFrom: 5 },
        { term: 'world war',        validFrom: 7 },
        { term: 'nuclear',          validFrom: 8 },
        { term: 'railroad',         validFrom: 4 },
        { term: 'telephone',        validFrom: 6 },
        { term: 'automobile',       validFrom: 7 },
        { term: 'airplane',         validFrom: 7 },
        { term: 'radio',            validFrom: 7 },
        { term: 'television',       validFrom: 8 }
      ],
      4: [
        { term: 'internet',         validFrom: 9 },
        { term: 'email',            validFrom: 9 },
        { term: 'social media',     validFrom: 9 },
        { term: 'cell phone',       validFrom: 9 },
        { term: 'smartphone',       validFrom: 9 },
        { term: 'computer',         validFrom: 8 },
        { term: 'tiktok',           validFrom: 9 },
        { term: 'facebook',         validFrom: 9 },
        { term: 'twitter',          validFrom: 9 },
        { term: 'instagram',        validFrom: 9 },
        { term: 'google',           validFrom: 9 },
        { term: 'world war',        validFrom: 7 },
        { term: 'nuclear',          validFrom: 8 },
        { term: 'civil rights act', validFrom: 8 },
        { term: 'telephone',        validFrom: 6 },
        { term: 'automobile',       validFrom: 7 },
        { term: 'airplane',         validFrom: 7 },
        { term: 'radio',            validFrom: 7 },
        { term: 'television',       validFrom: 8 }
      ],
      5: [
        { term: 'internet',         validFrom: 9 },
        { term: 'email',            validFrom: 9 },
        { term: 'social media',     validFrom: 9 },
        { term: 'cell phone',       validFrom: 9 },
        { term: 'smartphone',       validFrom: 9 },
        { term: 'computer',         validFrom: 8 },
        { term: 'tiktok',           validFrom: 9 },
        { term: 'facebook',         validFrom: 9 },
        { term: 'twitter',          validFrom: 9 },
        { term: 'instagram',        validFrom: 9 },
        { term: 'google',           validFrom: 9 },
        { term: 'world war',        validFrom: 7 },
        { term: 'nuclear',          validFrom: 8 },
        { term: 'television',       validFrom: 8 },
        { term: 'telephone',        validFrom: 6 },
        { term: 'automobile',       validFrom: 7 },
        { term: 'airplane',         validFrom: 7 },
        { term: 'radio',            validFrom: 7 }
      ],
      6: [
        { term: 'internet',         validFrom: 9 },
        { term: 'email',            validFrom: 9 },
        { term: 'social media',     validFrom: 9 },
        { term: 'cell phone',       validFrom: 9 },
        { term: 'smartphone',       validFrom: 9 },
        { term: 'computer',         validFrom: 8 },
        { term: 'tiktok',           validFrom: 9 },
        { term: 'facebook',         validFrom: 9 },
        { term: 'twitter',          validFrom: 9 },
        { term: 'instagram',        validFrom: 9 },
        { term: 'google',           validFrom: 9 },
        { term: 'world war ii',     validFrom: 7 },
        { term: 'television',       validFrom: 8 },
        { term: 'nuclear',          validFrom: 8 }
      ],
      7: [
        { term: 'internet',         validFrom: 9 },
        { term: 'email',            validFrom: 9 },
        { term: 'cell phone',       validFrom: 9 },
        { term: 'social media',     validFrom: 9 },
        { term: 'smartphone',       validFrom: 9 },
        { term: 'computer',         validFrom: 8 },
        { term: 'tiktok',           validFrom: 9 },
        { term: 'facebook',         validFrom: 9 },
        { term: 'twitter',          validFrom: 9 },
        { term: 'instagram',        validFrom: 9 },
        { term: 'google',           validFrom: 9 },
        // Television ~1948, unit 7 ends 1945 — grace period applies
        { term: 'television',       validFrom: 8 }
      ],
      8: [
        { term: 'internet',         validFrom: 9 },
        { term: 'email',            validFrom: 9 },
        { term: 'september 11',     validFrom: 9 },
        { term: 'social media',     validFrom: 9 },
        { term: 'smartphone',       validFrom: 9 },
        { term: 'cell phone',       validFrom: 9 },
        { term: 'tiktok',           validFrom: 9 },
        { term: 'facebook',         validFrom: 9 },
        { term: 'twitter',          validFrom: 9 },
        { term: 'instagram',        validFrom: 9 },
        { term: 'google',           validFrom: 9 }
      ],
      9: []
    }

  } // end apush

  ,apphys1: {
    autoGradeAll: true,  // every apphys1 FRQ question is auto-graded
    principles: [
      "newton's second law", "newton's 2nd law",
      "f_net = ma", "f = ma", "fnet = ma",
      "net force equals mass times acceleration",
      "sum of forces", "second law of motion",
      "conservation of energy",
      "work-energy theorem", "work energy theorem",
      "w_net = delta ke", "net work equals change in kinetic",
      "conservation of momentum",
      "impulse-momentum theorem",
      "newton's third law", "action-reaction",
      "kinematic", "kinematics equation",
      "free fall", "y = 1/2 g t", "v = v0 + at"
    ]
  }

  ,apphyscem: {
    principles: [
      "coulomb's law", "coulomb's force law",
      "gauss's law", "electric flux",
      "faraday's law", "faraday's law of induction",
      "ampere's law",
      "kirchhoff's voltage law", "kirchhoff's current law",
      "kirchhoff's loop rule", "kirchhoff's junction rule",
      "conservation of charge", "conservation of energy",
      "electric potential energy",
      "capacitance", "c = q/v",
      "ohm's law", "v = ir",
      "biot-savart law",
      "lenz's law",
      "superposition principle"
    ]
  }

  ,apbio: {
    principles: [
      "cell theory",
      "natural selection",
      "law of conservation of energy",
      "homeostasis",
      "central dogma",
      "mendelian genetics", "mendel's laws",
      "law of segregation", "law of independent assortment",
      "hardy-weinberg equilibrium",
      "enzyme-substrate specificity",
      "fluid mosaic model",
      "chemiosmosis",
      "positive feedback", "negative feedback",
      "evolution by natural selection",
      "endosymbiotic theory",
      "competitive exclusion principle"
    ]
  }

  ,apstats: {
    principles: [
      "law of large numbers",
      "central limit theorem",
      "significance level", "alpha level",
      "null hypothesis", "alternative hypothesis",
      "p-value",
      "normal distribution",
      "standard deviation",
      "confidence interval",
      "sampling distribution",
      "independence", "random sampling",
      "regression to the mean",
      "correlation does not imply causation",
      "expected value",
      "probability"
    ]
  }

  ,apmicro: {
    principles: [
      "law of demand",
      "law of supply",
      "supply and demand",
      "marginal analysis",
      "law of diminishing marginal returns",
      "diminishing marginal utility",
      "opportunity cost",
      "comparative advantage",
      "price mechanism",
      "profit maximization",
      "mr = mc",
      "marginal revenue equals marginal cost",
      "consumer surplus",
      "producer surplus",
      "allocative efficiency",
      "productive efficiency"
    ]
  }

  ,apmacro: {
    principles: [
      "law of demand",
      "law of supply",
      "aggregate demand",
      "aggregate supply",
      "fiscal policy",
      "monetary policy",
      "money multiplier",
      "spending multiplier",
      "phillips curve",
      "loanable funds",
      "quantity theory of money",
      "comparative advantage",
      "opportunity cost",
      "crowding out",
      "liquidity preference"
    ]
  }

  ,apcalcab: {
    principles: [
      "fundamental theorem of calculus",
      "ftc",
      "chain rule",
      "product rule",
      "quotient rule",
      "mean value theorem",
      "mvt",
      "intermediate value theorem",
      "ivt",
      "l'hopital's rule",
      "squeeze theorem",
      "riemann sum",
      "definition of the derivative",
      "limit definition",
      "power rule",
      "derivative",
      "antiderivative",
      "integration by substitution"
    ]
  }

  ,apcsa: {
    principles: [
      "method signature",
      "return statement",
      "loop invariant",
      "array traversal",
      "base case",
      "recursive case",
      "encapsulation",
      "inheritance",
      "polymorphism",
      "interface",
      "boolean expression",
      "scope",
      "null check",
      "off-by-one"
    ]
  }

};
