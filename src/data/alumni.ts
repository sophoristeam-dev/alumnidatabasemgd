export type Batch = '2021' | '2023' | '2024' | '2025' | '2026';

export interface Student {
  n: string;
  b: Batch | '2022-reg';
  h: string;
  pct: string;
  c: string;
  g: string;
}

export interface RegStudent {
  n: string;
  adm: string;
  house: string;
  dob: string;
  phone: string;
}

export interface OverseasAdmission {
  student: string;
  batch: string;
  university: string;
  country: string;
  flag: string;
  course: string;
}

export interface LateEntry {
  n: string;
  submitted: string;
  house: string;
  pct: string;
  course: string;
  goal: string;
}

export const students: Student[] = [
  { n: 'Khushi Vadhera', b: '2021', h: 'Sarojini Naidu', pct: '98.6%', c: 'DU / ICG — Eco Hons', g: 'MBA / UPSC' },
  { n: 'Nandita Garg', b: '2021', h: 'Sarojini Naidu', pct: '97.8%', c: 'Ashoka / NMIMS / DU — Maths Hons', g: 'Researcher / Civil Services' },
  { n: 'Mahek Surana', b: '2021', h: 'Sarojini Naidu', pct: '96.8%', c: 'NMIMS Navi Mumbai — BBA', g: 'MBA + Actuarial Sciences' },
  { n: 'Sejal Choudhary', b: '2021', h: 'Sarojini Naidu', pct: '97%', c: 'Indian — BA LLB / Eco Hons', g: 'Civil Services' },
  { n: 'Anoushka Jain', b: '2021', h: 'Sarojini Naidu', pct: '97%', c: 'IIS Jaipur — BCom(H)', g: 'Chartered Accountancy' },
  { n: 'Poonam Khichad', b: '2021', h: 'Madame Curie', pct: '95.6%', c: 'Delhi University — PolSci Hons', g: 'Civil Services (IAS)' },
  { n: 'Khushi Chhajed', b: '2021', h: 'Sarojini Naidu', pct: '95.2%', c: 'Pursuing CA', g: 'Chartered Accountant' },
  { n: 'Navya Paliwal', b: '2021', h: 'Madame Curie', pct: '93%', c: "DU / St. Xavier's — BA Eco", g: 'Civil Services' },
  { n: 'Nandani Kumari Rathore', b: '2021', h: '—', pct: '—', c: 'Queens Univ. Belfast — MBBS', g: 'NHS Doctor → USMLE Residency USA' },
  { n: 'Ashwati Bartaria', b: '2021', h: 'Madame Curie', pct: '—', c: 'Pratt Institute NY — B.Arch', g: 'Architect' },
  { n: 'Sangeeta Motwani', b: '2021', h: 'Florence Nightingale', pct: '—', c: 'Univ. of Birmingham — BBA', g: 'Own luxury brand' },
  { n: 'Mahi Singh', b: '2021', h: 'Florence Nightingale', pct: '—', c: 'OP Jindal — BCom LLB (Hons)', g: 'International Lawyer' },
  { n: 'Madhavi Kanwar', b: '2021', h: 'Helen Keller', pct: '—', c: 'Banasthali Vidyapith — BSc Aviation', g: 'IAF / Commercial Pilot' },
  { n: 'Khushi Baheti', b: '2021', h: 'Sarojini Naidu', pct: '94.2%', c: 'NMIMS Mumbai — BBA', g: 'Entrepreneur' },
  { n: 'Navya Nair', b: '2023', h: 'Sarojini Naidu', pct: '98.8%', c: 'NLSIU Bangalore — BA LLB (Hons)', g: 'Law career' },
  { n: 'Bhavya Khatri', b: '2023', h: 'Madame Curie', pct: '97.4%', c: 'Sri Venkateshwara College DU — BCom', g: 'Marketing / HR Manager' },
  { n: 'Monika Sharma', b: '2023', h: 'Florence Nightingale', pct: '97.2%', c: 'Indraprastha College DU — PolSci Hons', g: 'Civil Services' },
  { n: 'Mahima Daftry', b: '2023', h: 'Sarojini Naidu', pct: '97%', c: 'ICAI — CA', g: 'Chartered Accountant' },
  { n: 'Kashvi Nawalkha', b: '2023', h: 'Madame Curie', pct: '96.4%', c: 'Univ. of Sydney — BA+Law', g: 'Corporate Lawyer' },
  { n: 'Radhika Khetan', b: '2023', h: 'Florence Nightingale', pct: '95.4%', c: 'Delhi University — BCom Hons', g: 'Chartered Accountant' },
  { n: 'Arsheya Mathur', b: '2023', h: 'Florence Nightingale', pct: '88%', c: 'HKUST — Engineering', g: 'Pursuing Masters' },
  { n: 'Harshika Maheshwari', b: '2023', h: 'Sarojini Naidu', pct: '80%', c: 'Chinese Univ. of HK — IBBA', g: 'Finance career at MNC' },
  { n: 'Nysha Kashnia', b: '2023', h: 'Madame Curie', pct: '88.8%', c: 'Univ. of Sydney — BCom', g: 'Masters abroad' },
  { n: 'Nishtha Rewani', b: '2023', h: 'Madame Curie', pct: '90%', c: 'Univ. of Glasgow — BA Business+Psych', g: 'Business Consultant' },
  { n: 'Shreya Sharma', b: '2023', h: 'Sarojini Naidu', pct: '86%', c: 'Univ. of Glasgow — MA Business', g: 'Philanthropist / Better world' },
  { n: 'Omika Kansra', b: '2023', h: 'Sarojini Naidu', pct: '73.4%', c: 'Algoma Univ. Canada — BSc CS', g: 'Software Engineer in Toronto' },
  { n: 'Gauravi Chaudhary', b: '2023', h: 'Madame Curie', pct: '80.2%', c: 'IIT Dhanbad / US universities', g: 'MBA Ivy League + Startup' },
  { n: 'Asmi Jain', b: '2023', h: 'Helen Keller', pct: '93.8%', c: 'Indian — BA (Hons) Psychology', g: 'Child Psychologist / serial killer research' },
  { n: 'Nandini Terapanthi', b: '2024', h: 'Florence Nightingale', pct: '95.4%', c: 'Delhi University — BCom Hons', g: 'Finance / Corporate sector' },
  { n: 'Tanishka Jain', b: '2024', h: 'Helen Keller', pct: '95%', c: 'Asian Academy, Noida — Music Production', g: 'Performer' },
  { n: 'Gunncha Rathore', b: '2024', h: 'Sarojini Naidu', pct: '89.8%', c: 'Maitreyi College DU — BA Eco+Maths', g: 'Company Secretary' },
  { n: 'Tisha Badlani', b: '2024', h: 'Sarojini Naidu', pct: '90.8%', c: 'IIS Jaipur — BA Eco Hons', g: 'IFS Officer' },
  { n: 'Kanishka Singh Rathore', b: '2024', h: 'Madame Curie', pct: '82%', c: 'Maharani College — Psych Hons', g: 'IPS Officer' },
  { n: 'Tejaswini Sharma', b: '2024', h: 'Sarojini Naidu', pct: '83%', c: 'Lady Shri Ram College — Eco Hons', g: 'OTA Chennai (Army)' },
  { n: 'Agrima Bhatt', b: '2025', h: 'Florence Nightingale', pct: '98.2%', c: 'Nirma University — BBA+MBA (IPMAT)', g: 'Public Relations' },
  { n: 'Lavanya Shah', b: '2025', h: 'Sarojini Naidu', pct: '97.8%', c: 'Lady Shri Ram DU — BA Journalism Hons', g: 'The Hindu / Counselling Psychology' },
  { n: 'Ananya Singh', b: '2025', h: 'Madame Curie', pct: '97.4%', c: 'Indian — BA', g: 'IAS Officer (UPSC)' },
  { n: 'Bhoomika Agarwal', b: '2025', h: 'Madame Curie', pct: '96.6%', c: 'Maharani College — CA', g: 'Chartered Accountant' },
  { n: 'Harshita Jain', b: '2025', h: 'Sarojini Naidu', pct: '96.2%', c: 'Mithibai College — BA Mass Media', g: 'Build a media firm' },
  { n: 'Sannati Baid', b: '2025', h: 'Helen Keller', pct: '95.8%', c: 'Shiv Nadar Univ. — BMS', g: 'Business / Travelling the world' },
  { n: 'Divyanshi Gupta', b: '2025', h: 'Sarojini Naidu', pct: '95.6%', c: 'Jesus & Mary College DU — BA HR+Eco', g: 'HR Corporate + Content Creator' },
  { n: 'Palak Agrawal', b: '2025', h: 'Florence Nightingale', pct: '95.8%', c: 'NIFT MIT — B.Des Fashion', g: 'Masters in New York' },
  { n: 'Ridhima Dhaliwal', b: '2025', h: 'Sarojini Naidu', pct: '94%', c: 'RML National Law Univ. — BA LLB', g: 'United Nations / International Law' },
  { n: 'Chavi Sharma', b: '2025', h: 'Sarojini Naidu', pct: '94%', c: 'Nirma University — BA LLB (Hons)', g: 'Ambitious young lawyer' },
  { n: 'Diya Sharma', b: '2025', h: 'Helen Keller', pct: '89.2%', c: 'Manipal Univ. Jaipur — BA LLB', g: 'UN Diplomat' },
  { n: 'Ira Sharma', b: '2026', h: 'Madame Curie', pct: '98.6%', c: "St. Stephen's, DU — BA Economics Hons", g: 'IAS Officer' },
  { n: 'Myra Kapoor', b: '2026', h: 'Sarojini Naidu', pct: '97.9%', c: 'Lady Shri Ram, DU — BA Psychology Hons', g: 'Clinical Psychologist' },
  { n: 'Saumya Jain', b: '2026', h: 'Helen Keller', pct: '97.2%', c: 'Hindu College, DU — BA Pol Sci Hons', g: 'Civil Services' },
  { n: 'Kiyaana Mehta', b: '2026', h: 'Madame Curie', pct: '96.8%', c: 'NLU Delhi — BA LLB (CLAT AIR 42)', g: 'Corporate Lawyer' },
  { n: 'Anvi Bhandari', b: '2026', h: 'Sarojini Naidu', pct: '96.1%', c: 'NID Ahmedabad — B.Des', g: 'Communication Designer' },
  { n: 'Ria Chowdhury', b: '2026', h: 'Helen Keller', pct: '95.7%', c: 'AIIMS Delhi — MBBS (NEET AIR 312)', g: 'Surgeon' },
  { n: 'Zara Siddiqui', b: '2026', h: 'Madame Curie', pct: '94.5%', c: 'LSE — BSc Economics', g: 'Economist at World Bank' },
  { n: 'Tara Malhotra', b: '2026', h: 'Sarojini Naidu', pct: '93.8%', c: 'UC Berkeley — BA Data Science', g: 'Data Scientist' },
  { n: 'Naina Kothari', b: '2026', h: 'Helen Keller', pct: '92.4%', c: 'NUS Singapore — BBA (Business Analytics)', g: 'Management Consultant' },
  { n: 'Pari Doshi', b: '2026', h: 'Sarojini Naidu', pct: '91.0%', c: 'NIFT Mumbai — Fashion Communication', g: 'Fashion Entrepreneur' },
  { n: 'Suhana Bhatia', b: '2026', h: 'Madame Curie', pct: '89.6%', c: 'Pearl Academy — Luxury Brand Management', g: 'Brand Manager' },
  { n: 'Diya Agarwal', b: '2026', h: 'Helen Keller', pct: '88.2%', c: 'Christ University — BBA', g: 'MBA at IIM' },
  { n: 'Aanya Gupta', b: '2026', h: 'Sarojini Naidu', pct: '87.5%', c: 'NLU Jodhpur — BA LLB', g: 'Judge' },
  { n: 'Ishita Verma', b: '2026', h: 'Madame Curie', pct: '86.0%', c: 'Manipal University — MBBS', g: 'Pediatrician' },
  { n: 'Mahira Singh', b: '2026', h: 'Helen Keller', pct: '85.3%', c: 'Shiv Nadar Univ — BMS', g: 'Entrepreneur' },
  { n: 'Kavya Mittal', b: '2026', h: 'Sarojini Naidu', pct: '84.0%', c: 'IICD Jaipur — BA Journalism', g: 'Journalist' },
  { n: 'Saanvi Goel', b: '2026', h: 'Madame Curie', pct: '82.5%', c: "St. Xavier's Jaipur — B.Com Hons", g: 'Chartered Accountant' },
  { n: 'Tiya Bansal', b: '2026', h: 'Helen Keller', pct: '80.0%', c: 'VIT Vellore — BTech CSE', g: 'Software Engineer' },
  { n: 'Nitya Khandelwal', b: '2026', h: 'Sarojini Naidu', pct: '78.5%', c: 'Maharani College — BA Psychology', g: 'Counsellor' },
];

export const regStudents: RegStudent[] = [
  { n: 'Harshita Lakhani', adm: '6555', house: 'Madame Curie', dob: '21 Mar 2005', phone: '9461662359' },
  { n: 'Ananyaa Saksena', adm: '7389', house: 'Sarojini Naidu', dob: '5 Dec 2004', phone: '9680979983' },
  { n: 'Ambika Singh Panwar', adm: '6715', house: 'Sarojini Naidu', dob: '2 Aug 2005', phone: '9784241763' },
  { n: 'Gurusha Singhvi', adm: '6657', house: 'Florence Nightingale', dob: '9 Feb 2005', phone: '7023363903' },
  { n: 'Kashvi Nawalkha', adm: '6666', house: 'Madame Curie', dob: '28 Dec 2004', phone: '9352044444' },
  { n: 'Prisha Mathur', adm: '6663', house: 'Helen Keller', dob: '1 Mar 2006', phone: '9079068458' },
  { n: 'Yashika Sewani', adm: '6755', house: 'Sarojini Naidu', dob: '13 Sep 2005', phone: '9352281599' },
  { n: 'Bhavika Thulal', adm: '6561', house: 'Madame Curie', dob: '27 May 2005', phone: '8619226884' },
  { n: 'Annie Singh', adm: '6563', house: 'Madame Curie', dob: '3 Jun 2004', phone: '9314400050' },
  { n: 'Sanchi Chhajed', adm: '6545', house: 'Sarojini Naidu', dob: '21 Feb 2005', phone: '8000446944' },
  { n: 'Shivika Sharma', adm: '6732', house: 'Sarojini Naidu', dob: '5 Mar 2004', phone: '7023074844' },
  { n: 'Manya Khanna', adm: '6638', house: 'Madame Curie', dob: '31 Oct 2005', phone: '8890008570' },
  { n: 'Irfa Khan', adm: '6625', house: 'Helen Keller', dob: '20 Apr 2005', phone: '9352290764' },
  { n: 'Tanishka Jain', adm: '6682', house: 'Helen Keller', dob: '3 Feb 2005', phone: '9079020193' },
  { n: 'Chhavisha Chhabra', adm: '6624', house: 'Helen Keller', dob: '6 Oct 2004', phone: '7014340056' },
  { n: 'Himadri Khandelwal', adm: '6582', house: 'Helen Keller', dob: '10 Jun 2005', phone: '9166178168' },
  { n: 'Tisha Badlani', adm: '6578', house: 'Sarojini Naidu', dob: '29 Oct 2005', phone: '9828052212' },
  { n: 'Kumud Singh', adm: '7057', house: 'Florence Nightingale', dob: '3 Feb 2004', phone: '—' },
  { n: 'Vibhuti Kanwar', adm: '10120', house: 'Sarojini Naidu', dob: '17 Feb 2005', phone: '9664120728' },
  { n: 'Tejasvi Kumari', adm: '10133', house: 'Helen Keller', dob: '19 Sep 2004', phone: '9116373378' },
  { n: 'Pari Harwani', adm: '6566', house: 'Helen Keller', dob: '26 Apr 2005', phone: '8824992594' },
  { n: 'Sakshi Bharti', adm: '10143', house: 'Sarojini Naidu', dob: '1 Oct 2004', phone: '9264442298' },
  { n: 'Sneha Bharti', adm: '10144', house: 'Sarojini Naidu', dob: '20 Nov 2004', phone: '9264442279' },
  { n: 'Shreshtha Mundhra', adm: '10089', house: 'Madame Curie', dob: '19 Nov 2004', phone: '8839206444' },
  { n: 'Vamakshi Khangarot', adm: '6631', house: 'Florence Nightingale', dob: '14 Oct 2004', phone: '7023379924' },
  { n: 'Prashasti Agarwal', adm: '—', house: 'Helen Keller', dob: '29 Dec 2004', phone: '9352109391' },
];

export const lateEntries: LateEntry[] = [
  { n: 'Gunncha Rathore', submitted: 'Oct 2, 2023', house: 'Sarojini Naidu', pct: '89.8%', course: 'Maitreyi College DU — BA (Eco + Maths)', goal: 'Company Secretary' },
  { n: 'Tejaswini Sharma', submitted: 'Oct 13, 2023', house: 'Sarojini Naidu', pct: '83%', course: 'Lady Shri Ram College — Eco Hons', goal: 'OTA Chennai' },
  { n: 'Nandini Terapanthi', submitted: 'Aug 22, 2023', house: 'Florence Nightingale', pct: '95.4%', course: 'Delhi University — BCom (Hons)', goal: 'Finance / Corporate sector' },
  { n: 'Suhana Nathawat', submitted: 'Aug 23, 2023', house: 'Madame Curie', pct: '87%', course: 'UNSW / RMIT (provisional) — Communication Design', goal: 'Designer' },
  { n: 'Ridhima Shekhawat', submitted: 'Aug 24, 2023', house: 'Helen Keller', pct: '76%', course: 'RTU Kota (Govt.) — BTech IT', goal: "Contribute to country's growth" },
  { n: 'Tanishka Jain', submitted: 'Aug 30, 2023', house: 'Helen Keller', pct: '95%', course: 'Asian Academy of Film & TV, Noida — Music Production', goal: 'Performer' },
  { n: 'Sanya Rathi', submitted: 'Aug 31, 2023', house: 'Helen Keller', pct: '85.8%', course: 'Sophia College, Mumbai — BA', goal: '—' },
  { n: 'Ananya Agarwal', submitted: 'Sep 7, 2023', house: 'Helen Keller', pct: '85.8%', course: 'Cleared IELTS — destination TBD', goal: '—' },
  { n: 'Tisha Badlani', submitted: 'Sep 9, 2023', house: 'Sarojini Naidu', pct: '90.8%', course: 'IIS Jaipur — BA(H) Economics', goal: 'IFS Officer' },
  { n: 'Kanishka Singh Rathore', submitted: 'Sep 10, 2023', house: 'Madame Curie', pct: '82%', course: 'Maharani College — Psychology Hons', goal: 'IPS Officer' },
  { n: 'Adishree Agrawal', submitted: 'Oct 5, 2023', house: 'Sarojini Naidu', pct: '78%', course: 'NMIMS — BTech IT', goal: 'Masters abroad' },
];

export const overseasAdmissions: OverseasAdmission[] = [
  { student: 'Nandani Kumari Rathore', batch: '2021', university: 'Queens University Belfast', country: 'UK', flag: '🇬🇧', course: 'MBBS (5 yrs) → NHS → USMLE' },
  { student: 'Ashwati Bartaria', batch: '2021', university: 'Pratt Institute, New York', country: 'USA', flag: '🇺🇸', course: 'Bachelor in Architecture' },
  { student: 'Sangeeta Motwani', batch: '2021', university: 'University of Birmingham', country: 'UK', flag: '🇬🇧', course: 'BBA (3 yrs)' },
  { student: 'Tanishka Patel', batch: '2021', university: 'Art Univ. of Bournemouth', country: 'UK', flag: '🇬🇧', course: 'Fashion Branding (3 yrs)' },
  { student: 'Yashvi Thakran', batch: '2021', university: 'University of Leeds', country: 'UK', flag: '🇬🇧', course: 'BSc Accounting & Finance' },
  { student: 'Nishtha Rewani', batch: '2023', university: 'University of Glasgow', country: 'UK', flag: '🇬🇧', course: 'BA Business+Psychology (Hons)' },
  { student: 'Shreya Sharma', batch: '2023', university: 'University of Glasgow', country: 'UK', flag: '🇬🇧', course: 'MA Hons Business & Management' },
  { student: 'Nysha Kashnia', batch: '2023', university: 'University of Sydney', country: 'AUS', flag: '🇦🇺', course: 'BCom (3 yrs)' },
  { student: 'Kashvi Nawalkha', batch: '2023', university: 'University of Sydney', country: 'AUS', flag: '🇦🇺', course: 'BA + Law (5 yrs)' },
  { student: 'Arsheya Mathur', batch: '2023', university: 'HKUST', country: 'HK', flag: '🇭🇰', course: 'Engineering (4 yrs)' },
  { student: 'Harshika Maheshwari', batch: '2023', university: 'Chinese Univ. of Hong Kong', country: 'HK', flag: '🇭🇰', course: 'Integrated BBA (4 yrs)' },
  { student: 'Omika Kansra', batch: '2023', university: 'Algoma University', country: 'Canada', flag: '🇨🇦', course: 'BSc CS (3 yrs)' },
  { student: 'Anushka Khadolia', batch: '2023', university: 'Istituto Marangoni, Milan', country: 'Italy', flag: '🇮🇹', course: 'Interior Design (3 yrs)' },
  { student: 'Vedushi Sareen', batch: '2023', university: 'Heriot-Watt, Malaysia', country: 'Malaysia', flag: '🇲🇾', course: 'BSc Psychology (3 yrs)' },
  { student: 'Suhana Nathawat', batch: '2024', university: 'UNSW / RMIT (provisional)', country: 'AUS', flag: '🇦🇺', course: 'Communication Design' },
  { student: 'Ananya Podder', batch: '2025', university: 'Univ. of Western Australia', country: 'AUS', flag: '🇦🇺', course: 'BSc CS (3 yrs)' },
  { student: 'Aditi Podder', batch: '2025', university: 'Univ. of Western Australia', country: 'AUS', flag: '🇦🇺', course: 'BCom Accounting & Finance' },
  { student: 'Divishi Agarwal', batch: '2025', university: 'Istituto Marangoni', country: 'Italy', flag: '🇮🇹', course: 'Interior Design (3 yrs)' },
  { student: 'Zara Siddiqui', batch: '2026', university: 'London School of Economics', country: 'UK', flag: '🇬🇧', course: 'BSc Economics' },
  { student: 'Tara Malhotra', batch: '2026', university: 'UC Berkeley', country: 'USA', flag: '🇺🇸', course: 'BA Data Science' },
  { student: 'Naina Kothari', batch: '2026', university: 'NUS Singapore', country: 'Singapore', flag: '🇸🇬', course: 'BBA (Business Analytics)' },
  { student: 'Ira Sharma', batch: '2026', university: "King's College London", country: 'UK', flag: '🇬🇧', course: 'BA Economics (offer received)' },
];

export interface CourseSummaryRow {
  course: string;
  appeared?: number;
  selected?: number;
  total?: number;
  highlight?: boolean;
}

export const courseSummary: CourseSummaryRow[] = [
  { course: 'Abroad', appeared: 16, selected: 11 },
  { course: 'Air Hostess', appeared: 1 },
  { course: 'Architecture', appeared: 10, selected: 3 },
  { course: 'Aviation', appeared: 2 },
  { course: 'B.A.', total: 95, highlight: true },
  { course: 'B.Com', total: 74, highlight: true },
  { course: 'B.Pharma', total: 2 },
  { course: 'B.Sc', total: 4 },
  { course: 'B.Tech', appeared: 24, selected: 15 },
  { course: 'BCA', total: 1 },
  { course: 'Design', total: 18 },
  { course: 'Drop — CA', total: 5 },
  { course: 'Drop — CLAT', total: 10 },
  { course: 'Drop — JEE', total: 7 },
  { course: 'Drop — NEET', total: 11 },
  { course: 'Economics (Hons)', total: 9 },
  { course: 'Global Affairs', total: 1 },
  { course: 'Home Science', total: 1 },
  { course: 'Honours (various)', total: 38, highlight: true },
  { course: 'Hotel Management', total: 1 },
  { course: 'International Relations', total: 1 },
  { course: 'ISDI', total: 1 },
  { course: 'Law', appeared: 32, selected: 22 },
  { course: 'Liberal Studies', total: 1 },
  { course: 'Mass Media', total: 9 },
  { course: 'Maths (Hons)', total: 2 },
  { course: 'MBBS', appeared: 19, selected: 8 },
  { course: 'Microbiology', total: 1 },
  { course: 'Music', total: 1 },
  { course: 'NIFT', appeared: 14, selected: 7 },
  { course: 'Not Reported', total: 3 },
  { course: 'Photography', total: 1 },
  { course: 'Srishti Bangalore', appeared: 6, selected: 1 },
  { course: 'Statistics', total: 1 },
  { course: 'United Institute of Design', appeared: 7, selected: 3 },
];
