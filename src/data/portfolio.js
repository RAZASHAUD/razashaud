// ---------------------------------------------------------------------------
// Single source of truth for the whole site. Edit here, everything updates.
// Every number below comes from the résumé — keep them in sync when you edit.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Raza Shaud',
  role: 'M.Tech, Systems · Control · Automation — IIT Guwahati',
  location: 'IIT Guwahati, Assam, India',
  // TODO: change this one line if you are looking for something else.
  available: 'M.Tech 2026–28 · open to internships, Full Time Role, research collaborations',
  email: 'rshaudx3@gmail.com',
  emailInstitute: 'raza@iitg.ac.in',
  phone: '+91 74395 05623',
  linkedin: 'https://linkedin.com/in/raza-shaud',
  github: 'https://github.com/RAZASHAUD',
  resume: '/Raza_Shaud_Resume.pdf',
  rollNo: '264102509',
  formspreeId: 'https://formspree.io/f/mbgrrgll',     // optional formspree.io form ID for the contact form
};

// The visitor picks a track; the page reorders itself around what they hire for.
export const tracks = [
  { id: 'all', label: 'Everything', pitch: 'Electrical engineering fundamentals, machine learning on real sensor data, and hardware that survives a field trial. Three build-and-measure projects, three internships, three published papers, and an IEEE Best Paper Award.' },
  { id: 'ml', label: 'ML & Computer Vision', pitch: 'YOLO v8 and classical DSP applied to messy physical signals — a cable-fault classifier at 96.5% accuracy with 78% fewer false positives, and an MFCC voice classifier at 89% that beat its SVM baseline by 12%.' },
  { id: 'embedded', label: 'Embedded & IoT', pitch: 'Arduino firmware in Embedded C, sensor interfacing and GSM telemetry — a solar-powered inspection robot running 8 hours unattended, and a clinical monitor validated over 50 hours with zero missed events.' },
  { id: 'power', label: 'Power, Control & Machines', pitch: 'M.Tech in Systems, Control and Automation at IIT Guwahati, an IEEE Best Paper on a dual-rotor 6-phase PMSM for EVs, and floor time inside a SAIL steel works and a DVC thermal station.' },
];

export const stats = [
  { value: '96.5%', label: 'Fault detection accuracy', note: 'YOLO v8 on 1,300+ cable images' },
  { value: 'AIR 2139', label: 'GATE 2026', note: 'Electrical Engineering' },
  { value: 'IIT-G', label: 'M.Tech 2026–28', note: 'Systems, Control & Automation' },
  { value: '3', label: 'Papers published', note: 'incl. IEEE Best Paper Award' },
];

export const projects = [
  {
    id: 'cable',
    title: 'Solar-Powered Robotic Cable Monitoring System',
    period: 'Aug 2025 – Apr 2026',
    context: 'B.Tech Major Project',
    tracks: ['ml', 'embedded', 'power'],
    metric: '96.5%',
    metricLabel: 'fault detection accuracy',
    summary: 'An autonomous solar-powered robot that inspects 500 m of low-voltage cable and flags insulation damage from camera imagery.',
    problem:
      'Low-voltage distribution cable insulation fails long before anyone notices. Inspection is manual and slow, and it skips the spans that are hardest to reach — exactly the spans most likely to fail.',
    approach: [
      'Built an autonomous inspection robot on an Arduino Uno with a 12 V / 20 W solar PV supply, so it runs without a mains tether.',
      'Mounted a camera for continuous insulation monitoring across 500 m of cable run.',
      'Trained a YOLO v8 fault classifier on 1,300+ cable images, with OpenCV preprocessing to normalise lighting and framing.',
      'Tuned the power budget until the platform sustained 8 hours of continuous field operation.',
    ],
    results: [
      '96.5% classification accuracy on cable fault imagery',
      '78% fewer false positives than the earlier baseline',
      '8 h continuous unattended field operation on solar charge',
      'Published at PEIS-2026, GKCIET Malda',
    ],
    stack: ['Arduino', 'YOLO v8', 'CNN', 'OpenCV', 'Python', 'Solar PV'],
    demo: 'threshold',
    links: [https://github.com/RAZASHAUD], // TODO: add { label: 'Code', url: 'https://github.com/RAZASHAUD/…' }
  },
  {
    id: 'saline',
    title: 'Saline Level Monitoring and Alert System (IoT)',
    period: 'Jan 2025 – Apr 2025',
    context: 'Self project',
    tracks: ['embedded'],
    metric: '2 cm',
    metricLabel: 'level precision, 50 h validated',
    summary: 'Bedside hardware that watches an IV bag and raises an alarm at the nursing station before it runs dry.',
    problem:
      'An IV bag running dry is a routine hazard on a busy ward. It depends entirely on somebody looking at the right bag at the right minute.',
    approach: [
      'Interfaced an ultrasonic sensor with an Arduino microcontroller in Embedded C to track fluid level to 2 cm precision.',
      'Ran a 50-hour validation to confirm the detection logic held under continuous operation.',
      'Implemented a dual alert path — local buzzer plus GSM SMS over UART to 3 contacts — so the alarm reaches staff, not just the bedside.',
    ],
    results: [
      '2 cm level precision, zero missed empty-bottle events over 50 hours',
      '75% faster simulated response time',
      '40% reduction in nursing monitoring workload',
    ],
    stack: ['Arduino Uno', 'Embedded C', 'Ultrasonic Sensor', 'GSM Module', 'UART'],
    links: [https://github.com/RAZASHAUD],
  },
  {
    id: 'voice',
    title: 'Human vs. AI Voice Classification System',
    period: 'Sep 2024 – Nov 2024',
    context: 'Self project',
    tracks: ['ml'],
    metric: '89%',
    metricLabel: 'classification accuracy',
    summary: 'A DSP front end and a Random Forest that separate synthesised speech from a human voice.',
    problem:
      'Synthetic speech is now good enough to pass casually. The tells are not in what is said — they sit in the spectral fine structure and the noise floor.',
    approach: [
      'Extracted MFCC features from 1,500+ audio samples — the same front end you can drive live on this page.',
      'Applied spectral-gating noise reduction, cutting interference by 65% so the model learns voice structure rather than recording conditions.',
      'Trained a Random Forest on a 15-dimensional feature vector and validated with 5-fold cross-validation.',
    ],
    results: [
      '89% accuracy separating human from AI-generated speech',
      'Beat an SVM baseline by 12% under 5-fold cross-validation',
      'Published in Tech Research Chronicles (IAST), Vol. 1 Issue 2, 2025',
    ],
    stack: ['Python', 'Scikit-learn', 'MFCC', 'Random Forest', 'DSP'],
    demo: 'audio',
    links: [https://github.com/RAZASHAUD],
  },
];

export const skills = [
  { group: 'Programming', tracks: ['ml', 'embedded'], items: ['Python', 'C', 'C++', 'Embedded C'] },
  { group: 'Signal Processing & ML', tracks: ['ml'], items: ['DSP', 'MFCC', 'YOLO v8', 'CNN', 'OpenCV', 'Scikit-learn', 'Random Forest', 'SVM', 'NumPy', 'Pandas'] },
  { group: 'Embedded & Hardware', tracks: ['embedded'], items: ['Arduino Uno', 'Sensor Interfacing', 'GSM Module', 'UART', 'Hardware Prototyping', 'Debugging'] },
  { group: 'Control & Power', tracks: ['power'], items: ['MATLAB/Simulink', 'ANSYS', 'ETAP', 'Industrial Automation', 'Switchgear & Protection'] },
  { group: 'Tools', tracks: ['all'], items: ['Git', 'Arduino IDE', 'LaTeX', 'Linux'] },
];

export const experience = [
  {
    // TODO: if this company name is a placeholder, replace it — recruiters spot generic names.
    title: 'Machine Learning Intern',
    company: 'Tech Solutions Inc.',
    place: 'Kolkata, India',
    period: 'May – Jul 2025',
    tracks: ['ml'],
    points: [
      'Optimized 8 machine learning scripts, improving model prediction speed by 30%.',
      'Tested and validated classification models as part of a 4-person team.',
    ],
  },
  {
    title: 'Internship Trainee — Industrial Automation & Plant Electrical Systems',
    company: 'Steel Authority of India Limited (SAIL)',
    place: 'Bokaro, India',
    period: 'Nov – Dec 2024',
    tracks: ['power', 'embedded'],
    points: ['Studied plant electrical systems, protection schemes and automation processes across an integrated steel works.'],
  },
  {
    title: 'Internship Trainee — Thermal Power Generation, Switchgear & Protection',
    company: 'Damodar Valley Corporation (DVC)',
    place: 'Mejia, India',
    period: 'Jun – Jul 2024',
    tracks: ['power'],
    points: ['Documented daily operations, switchgear arrangements and protection settings on an operating thermal generating station.'],
  },
];

export const education = [
  { degree: 'M.Tech, Electronics and Electrical Engineering', school: 'Indian Institute of Technology Guwahati', period: '2026 – 2028', detail: 'Specialization: Systems, Control and Automation' },
  { degree: 'B.Tech, Electrical Engineering', school: 'Ghani Khan Choudhury Institute of Engineering and Technology, Malda', period: '2022 – 2026' },
  { degree: 'Senior Secondary (WBCHSE)', school: 'West Bengal Council of Higher Secondary Education', period: '2022' },
  { degree: 'Secondary (WBBSE)', school: 'West Bengal Board of Secondary Education', period: '2020' },
];

export const publications = [
  {
    title: 'Characteristics Investigation of Dual Rotor Single Stator 6-Phase PMSM for Smart Electric Vehicles',
    venue: 'IEEE GIEST 2024',
    kind: 'Best Paper Award',
    featured: true,
    note: 'Machine topology and performance characteristics for electric vehicle traction.',
    url: 'https://ieeexplore.ieee.org/document/10960113', // TODO: IEEE Xplore link if available
  },
  {
    title: 'Noise Filtration and Voice Discrimination: Case Studies and Results',
    venue: 'Tech Research Chronicles (IAST), Vol. 1 Issue 2, 2025',
    kind: 'Journal',
    note: 'ISSN 3049-205X. Spectral-gating noise reduction and MFCC-based discrimination between human and synthetic voice.',
    url: 'https://drive.google.com/file/d/12TpDa0jKitrarOSNDMWmOJoZD-_TueRp/view?usp=drive_link',
  },
  {
    title: 'Intelligent Remote Monitoring of Low Voltage Cable Insulation Fault',
    venue: 'PEIS-2026, GKCIET Malda',
    kind: 'Conference',
    note: 'International Conference on Power, Environment and Intelligent Systems, April 2026.',
    url: 'https://drive.google.com/file/d/1BaZPNuAtWbu3QiNDepIExd2Qh71l9xR_/view?usp=drive_link',
  },
];

export const achievements = [
  { title: 'GATE 2026 (Electrical Engineering) — All India Rank 2139' },
    { title: '100 Days of Code: Complete Python Pro Bootcamp', note: 'Udemy certification', year: '2024' },
];

export const responsibilities = [
  { title: 'Class Representative', note: 'Dept. of Electrical Engineering, GKCIET Malda', year: '2024 – 2026' },
  { title: 'Organizing Committee Member', note: 'PEIS-2026 International Conference, GKCIET Malda', year: 'Apr 2026' },
];

export const extras = {
  languages: ['English', 'Hindi', 'Bengali'],
  interests: ['Swimming', 'Chess', 'Cricket'],
};

// Answers the ask-widget uses when no API key is configured.
export const faq = [
  { q: ['available', 'availability', 'join', 'notice', 'start', 'when can'], a: `${profile.available}. Currently at IIT Guwahati; M.Tech runs 2026 to 2028.` },
  { q: ['gate', 'rank', 'air', 'score'], a: 'GATE 2026 in Electrical Engineering, All India Rank 2139 — which is how he got into M.Tech at IIT Guwahati.' },
  { q: ['iit', 'guwahati', 'm.tech', 'mtech', 'masters', 'specialization'], a: 'M.Tech in Electronics and Electrical Engineering at IIT Guwahati, 2026–2028, specialising in Systems, Control and Automation. Roll no. 264102509.' },
  { q: ['accuracy', 'best project', 'strongest', 'cable', 'robot'], a: 'The solar-powered cable monitoring robot: a YOLO v8 classifier trained on 1,300+ cable images reaching 96.5% accuracy with 78% fewer false positives, on an Arduino Uno running 8 hours unattended on a 12V/20W solar supply. It covers 500 m of cable and was published at PEIS-2026.' },
  { q: ['paper', 'publication', 'research', 'ieee', 'pmsm', 'motor'], a: 'Three publications. The IEEE GIEST 2024 paper on a dual-rotor single-stator 6-phase PMSM for electric vehicles won a Best Paper Award. There is also a journal paper on noise filtration and voice discrimination (IAST, 2025) and a PEIS-2026 conference paper on cable insulation fault monitoring.' },
  { q: ['intern', 'experience', 'work', 'job', 'sail', 'dvc'], a: 'Three internships: a machine learning internship where he optimised 8 ML scripts for 30% faster prediction, an industrial automation stint at SAIL Bokaro, and thermal power plant operations at DVC Mejia covering switchgear and protection.' },
  { q: ['skill', 'stack', 'tech', 'language', 'python', 'tool'], a: 'Python, C, C++ and Embedded C. For ML and vision: YOLO v8, CNN, OpenCV, Scikit-learn, NumPy, Pandas, plus DSP and MFCC feature extraction. For hardware: Arduino, sensor interfacing, GSM. For electrical work: MATLAB/Simulink, ANSYS and ETAP.' },
  { q: ['education', 'college', 'degree', 'university', 'study', 'cgpa'], a: 'M.Tech at IIT Guwahati (2026–2028) after a B.Tech in Electrical Engineering at GKCIET Malda (2022–2026, CGPA 7.40).' },
  { q: ['contact', 'email', 'reach', 'hire', 'call'], a: `Email ${profile.email} or ${profile.emailInstitute}, or use the form at the bottom of this page. Phone: ${profile.phone}.` },
  { q: ['voice', 'audio', 'mfcc', 'speech'], a: 'The voice project separates human from AI-generated speech at 89% accuracy: MFCC features from 1,500+ samples, spectral-gating noise reduction cutting interference by 65%, and a Random Forest on a 15-D feature vector that beat an SVM baseline by 12%. Run the live feature extractor in the Bench section.' },
  { q: ['saline', 'iot', 'medical', 'arduino'], a: 'The saline monitoring system tracks IV fluid level to 2 cm precision using an ultrasonic sensor and Arduino in Embedded C, validated over 50 hours with zero missed empty-bottle events, with buzzer plus GSM SMS alerts to 3 contacts.' },
  { q: ['resume', 'cv', 'download'], a: 'The résumé is on this page in the Résumé section — a one-page IIT Guwahati format PDF, plus a plain ATS version for job portals.' },
];
