const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, LevelFormat, convertInchesToTwip } = require('docx');
const fs = require('fs');

const FONT = 'Calibri';
const bullets = {
  config: [{
    reference: 'b',
    levels: [{
      level: 0, format: LevelFormat.BULLET, text: '\u2022', alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.15) } } },
    }],
  }],
};

const t = (text, opts = {}) => new TextRun({ text, font: FONT, size: 19, ...opts });
const line = (children, opts = {}) => new Paragraph({ children, spacing: { after: 8, line: 210 }, ...opts });

const heading = (text) => new Paragraph({
  children: [t(text, { bold: true, size: 22 })],
  spacing: { before: 100, after: 36 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 2 } },
});

const bullet = (runs) => new Paragraph({ children: runs, numbering: { reference: 'b', level: 0 }, spacing: { after: 8, line: 210 } });

const entry = (title, meta) => line([t(title, { bold: true }), t('  |  ' + meta)]);

const doc = new Document({
  numbering: bullets,
  styles: { default: { document: { run: { font: FONT, size: 19 } } } },
  sections: [{
    properties: { page: { margin: { top: 560, bottom: 480, left: 680, right: 680 } } },
    children: [
      new Paragraph({ children: [t('Raza Shaud', { bold: true, size: 32 })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
      new Paragraph({ children: [t('M.Tech (Electronics and Electrical Engineering), Indian Institute of Technology Guwahati')], alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
      new Paragraph({ children: [t('Specialization: Systems, Control and Automation')], alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
      new Paragraph({ children: [t('Guwahati, Assam, India  |  +91-7439505623  |  rshaudx3@gmail.com  |  raza@iitg.ac.in')], alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
      new Paragraph({ children: [t('linkedin.com/in/raza-shaud  |  github.com/RAZASHAUD  |  razashaud.vercel.app')], alignment: AlignmentType.CENTER, spacing: { after: 120 } }),

      heading('SUMMARY'),
      line([t('Electrical engineer and M.Tech student at IIT Guwahati (Systems, Control and Automation), building sensor-driven machine learning and embedded systems end to end: a solar-powered inspection robot with a YOLO fault classifier at 96.5% accuracy, an IoT monitoring device validated over 50 hours, and an MFCC voice classifier at 89% accuracy. Three published papers including an IEEE Best Paper Award. GATE 2026 All India Rank 2139.')]),

      heading('EDUCATION'),
      entry('M.Tech, Electronics and Electrical Engineering', 'Indian Institute of Technology Guwahati  |  2026 - 2028  |  Systems, Control and Automation'),
      entry('B.Tech, Electrical Engineering', 'Ghani Khan Choudhury Institute of Engineering and Technology, Malda  |  2022 - 2026  |  CGPA 7.40/10'),
      entry('Senior Secondary (WBCHSE)', '2022  |  71.80%'),
      entry('Secondary (WBBSE)', '2020  |  65.40%'),

      heading('EXPERIENCE'),
      entry('Machine Learning Intern, Tech Solutions Inc.', 'Kolkata, India  |  May 2025 - Jul 2025'),
      bullet([t('Optimized 8 machine learning scripts, improving model prediction speed by 30%.')]),
      bullet([t('Tested and validated classification models as part of a 4-person team.')]),
      entry('Internship Trainee, Steel Authority of India Limited (SAIL)', 'Bokaro, India  |  Nov 2024 - Dec 2024'),
      bullet([t('Studied plant electrical systems, protection schemes and industrial automation processes across an integrated steel works.')]),
      entry('Internship Trainee, Damodar Valley Corporation (DVC)', 'Mejia, India  |  Jun 2024 - Jul 2024'),
      bullet([t('Documented daily operations, switchgear arrangements and protection settings on an operating thermal generating station.')]),

      heading('PROJECTS'),
      entry('Solar-Powered Robotic Cable Monitoring System', 'B.Tech Major Project  |  Aug 2025 - Apr 2026'),
      bullet([t('Built an autonomous inspection robot on an Arduino Uno with a 12V/20W solar PV supply and camera-based insulation monitoring over 500 m of cable.')]),
      bullet([t('Trained a YOLO v8 fault classifier on 1,300+ cable images reaching 96.5% accuracy and 78% fewer false positives.')]),
      bullet([t('Tuned the power budget for 8 hours of continuous unattended field operation.')]),
      line([t('Tools: Arduino, YOLO v8, CNN, OpenCV, Python, Solar PV', { italics: true })]),
      entry('Saline Level Monitoring and Alert System (IoT)', 'Self Project  |  Jan 2025 - Apr 2025'),
      bullet([t('Interfaced an ultrasonic sensor with an Arduino microcontroller in Embedded C to track fluid level to 2 cm precision; validated over 50 hours with zero missed empty-bottle events.')]),
      bullet([t('Implemented a dual alert path (buzzer and GSM SMS over UART to 3 contacts), reducing simulated response time by 75% and nursing workload by 40%.')]),
      line([t('Tools: Arduino Uno, Ultrasonic Sensor, GSM Module, Embedded C', { italics: true })]),
      entry('Human vs. AI Voice Classification System', 'Self Project  |  Sep 2024 - Nov 2024'),
      bullet([t('Extracted MFCC features from 1,500+ audio samples with spectral-gating noise reduction (65% less interference) to build a binary classifier at 89% accuracy.')]),
      bullet([t('Deployed a Random Forest on a 15-dimensional feature vector, beating an SVM baseline by 12% under 5-fold cross-validation.')]),
      line([t('Tools: Python, Scikit-learn, NumPy, Digital Signal Processing', { italics: true })]),

      heading('TECHNICAL SKILLS'),
      line([t('Programming: ', { bold: true }), t('C, C++, Python')]),
      line([t('Embedded and Hardware: ', { bold: true }), t('Arduino Uno, Sensor Interfacing, Embedded C, Hardware Prototyping, Debugging, GSM Communication')]),
      line([t('Signal Processing and Machine Learning: ', { bold: true }), t('Digital Signal Processing, MFCC Feature Extraction, YOLO v8, CNN, OpenCV, Scikit-learn, NumPy, Pandas, Random Forest, SVM')]),
      line([t('EDA and Tools: ', { bold: true }), t('MATLAB, Simulink, ANSYS, ETAP, Git, Arduino IDE, LaTeX, Linux (elementary)')]),

      heading('PUBLICATIONS'),
      bullet([t('Characteristics Investigation of Dual Rotor Single Stator 6-Phase PMSM for Smart Electric Vehicles. IEEE GIEST 2024. '), t('Best Paper Award.', { bold: true })]),
      bullet([t('Noise Filtration and Voice Discrimination: Case Studies and Results. Tech Research Chronicles (IAST), Vol. 1 Issue 2, 2025. ISSN 3049-205X.')]),
      bullet([t('Intelligent Remote Monitoring of Low Voltage Cable Insulation Fault. PEIS-2026, GKCIET Malda, April 2026.')]),

      heading('ACHIEVEMENTS'),
      bullet([t('GATE 2026 (Electrical Engineering): All India Rank 2139; admitted to M.Tech at IIT Guwahati.')]),
      bullet([t('Scored 9.0/10 in VLSI Design, 6th semester core course, B.Tech, GKCIET Malda, 2025.')]),
      bullet([t('100 Days of Code: Complete Python Pro Bootcamp, Udemy Certification, 2024.')]),

      heading('POSITIONS OF RESPONSIBILITY'),
      bullet([t('Class Representative, Department of Electrical Engineering, GKCIET Malda, 2024 - 2026.')]),
      bullet([t('Organizing Committee Member, PEIS-2026 International Conference, GKCIET Malda, April 2026.')]),
    ],
  }],
});

Packer.toBuffer(doc).then((b) => { fs.writeFileSync('Raza_Shaud_Resume_ATS.docx', b); console.log('written'); });
