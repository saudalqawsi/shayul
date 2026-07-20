// Centralized bilingual content for Shayul. Each text field is { ar, en }.
// Numeric values (prices) are stored as numbers; formatted per language via num().

export const navLinks = [
  { label: { ar: "المعدات", en: "Equipment" }, href: "#equipment" },
  { label: { ar: "كيف يعمل", en: "How It Works" }, href: "#how" },
  { label: { ar: "الأسعار", en: "Pricing" }, href: "#pricing" },
  { label: { ar: "تواصل معنا", en: "Contact" }, href: "#request" },
];

export const hero = {
  badge: { ar: "كل معدة مغطّاة بالكامل", en: "Every Unit Fully Covered" },
  title1: { ar: "استأجر، أنجز،", en: "Rent, Build," },
  title2: { ar: "واطمئن.", en: "Relax." },
  subtitle: {
    ar: "سوق المعدات الثقيلة الأذكى في المملكة — عقد إلكتروني موثّق، تأمين شامل، ودفع مضمون في كل عملية تأجير.",
    en: "The Kingdom's smartest heavy-equipment marketplace — digitally notarized contracts, full insurance, and guaranteed payment on every rental.",
  },
  fields: {
    type: { ar: "نوع المعدة", en: "Equipment Type" },
    typePlaceholder: { ar: "اختر نوع المعدة", en: "Select equipment" },
    location: { ar: "الموقع / الحي", en: "Location / District" },
    locationPlaceholder: { ar: "مثال: حي النرجس، الرياض", en: "e.g. Al Narjis, Riyadh" },
    duration: { ar: "المدة", en: "Duration" },
    durationPlaceholder: { ar: "اختر المدة", en: "Select duration" },
  },
  equipmentTypes: {
    ar: ["شيول / لودر", "حفارة / باك لودر", "بلدوزر", "قريدر", "بوكلين", "رصاصة / دكاكة", "قالب / شاحنة", "فوركلفت", "كرين"],
    en: ["Wheel Loader", "Backhoe Loader", "Bulldozer", "Motor Grader", "Forklift Truck", "Vibratory Roller", "Dump Truck", "Telehandler", "Crane"],
  },
  durations: [
    { value: "day", ar: "يومي (وردية واحدة)", en: "Daily (single shift)" },
    { value: "week", ar: "أسبوعي", en: "Weekly" },
    { value: "month", ar: "شهري", en: "Monthly" },
    { value: "scope", ar: "مقطوعة (نطاق عمل)", en: "Lump-sum (scope of work)" },
  ],
  cta: { ar: "ابحث عن المعدة المناسبة →", en: "Find the right unit →" },
  trust: [
    { ar: "عقد إلكتروني موثّق", en: "Notarized e-contract" },
    { ar: "بوليصة تأمين مع كل عقد", en: "Insurance with every contract" },
    { ar: "تحصيل مضمون وسريع", en: "Guaranteed fast payouts" },
    { ar: "تسليم خلال اليوم أو التالي", en: "Same or next-day delivery" },
  ],
};

export const trust = {
  eyebrow: { ar: "لماذا شيول", en: "Why Shayul" },
  title1: { ar: "طبقة الثقة", en: "A Trust Layer" },
  title2: { ar: "فوق الصفقة.", en: "above the deal." },
  problemTitle: { ar: "المشكلة في السوق اليوم", en: "The Market Problem Today" },
  problemStats: [
    { num: { ar: "٨–٩", en: "8–9" }, label: { ar: "رسائل واتساب لإسناد طلب واحد", en: "WhatsApp messages to fill one order" } },
    { num: { ar: "٤٥", en: "45" }, label: { ar: "يوماً قد تمتد آجال السداد", en: "days payment can drag on" } },
    { num: { ar: "٠٪", en: "0%" }, label: { ar: "عقود موثّقة في الغالب", en: "notarized contracts in most deals" } },
    { num: { ar: "X", en: "X" }, label: { ar: "معدات غير مؤمّنة تُستبعد من المشاريع الكبرى", en: "uninsured units shut out of major projects" } },
  ],
  pillars: [
    {
      icon: "FileText",
      color: "#009466",
      num: "01",
      title: { ar: "العقد الموثّق قانونياً", en: "Legally-Notarized Contract" },
      desc: {
        ar: "كل اتفاق شفهي يتحوّل إلى عقد إلكتروني موثّق يحدد نطاق العمل، الأسعار، وجدول السداد — سند قانوني يحمي حق المعدة قبل التسليم.",
        en: "Every verbal agreement becomes a digitally notarized contract defining scope, pricing, and payment schedule — a legal safeguard protecting the owner's right before delivery.",
      },
    },
    {
      icon: "Shield",
      color: "#0696B0",
      num: "02",
      title: { ar: "التأمين المدمج", en: "Embedded Insurance" },
      desc: {
        ar: "بوليصة تأمين تصدر من بيانات العقد ذاتها مع كل عقد — تغطّي المعدة والأضرار الناتجة في الموقع، وتتيح الوصول للمشاريع الكبرى والحكومية.",
        en: "An insurance policy is issued from the contract's own data on every deal — covering the unit and on-site damages, and unlocking access to major and government projects.",
      },
    },
    {
      icon: "Banknote",
      color: "#009466",
      num: "03",
      title: { ar: "تحصيل مضمون وسريع", en: "Guaranteed Fast Collection" },
      desc: {
        ar: "المدفوعات تمر عبر طرف محايد مرخّص. صاحب المعدة يستلم مستحقاته خلال يوم إلى يومين من تأكيد التسليم — بدون انتظار صاحب المشروع.",
        en: "Payments flow through a SAMA-licensed neutral party. Owners receive dues within one to two days of delivery confirmation — no waiting on the project owner.",
      },
    },
    {
      icon: "Zap",
      color: "#0696B0",
      num: "04",
      title: { ar: "تسليم اليوم أو التالي", en: "Same or Next-Day Delivery" },
      desc: {
        ar: "الطلب يوزَّع فوراً على شركات المعدات المطابقة جغرافياً. غالبية الطلبات تُلبّى في اليوم نفسه أو اليوم التالي — كما تعوّد السوق.",
        en: "Requests are instantly routed to geographically-matched equipment firms. Most orders are fulfilled same-day or next-day — as the market expects.",
      },
    },
  ],
  quote: {
    ar: "شيول لا تنافس على سرعة إيجاد المعدة — بل تعيد بناء الطبقة الغائبة:",
    en: "Shayul does not compete on the speed of finding a unit — it rebuilds the missing layer:",
  },
  quoteAccent: { ar: "الثقة.", en: "Trust." },
};

export const equipment = [
  {
    name: { ar: "شيول / لودر", en: "Wheel Loader" },
    nameAlt: { ar: "Wheel Loader", en: "شيول / لودر" },
    specs: {
      weight: { ar: "١٨ طن", en: "18 T" },
      hp: { ar: "٢٥٠ حصان", en: "250 HP" },
      size: { ar: "مقاس ٦٦", en: "Size 66" },
    },
    daily: 800,
    monthly: 18000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/420130dcc_generated_a0a87dcb.png",
    tag: { ar: "الأعلى طلباً", en: "Most Requested" },
  },
  {
    name: { ar: "حفارة JCB", en: "JCB Backhoe Loader" },
    nameAlt: { ar: "JCB Backhoe Loader", en: "حفارة JCB" },
    specs: {
      weight: { ar: "٨ طن", en: "8 T" },
      hp: { ar: "٩٢ حصان", en: "92 HP" },
      size: { ar: "باك لودر", en: "Backhoe" },
    },
    daily: 600,
    monthly: 15000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/c06c2d727_generated_3f652c52.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
  {
    name: { ar: "قريدر", en: "Motor Grader G14" },
    nameAlt: { ar: "Motor Grader G14", en: "قريدر" },
    specs: {
      weight: { ar: "١٤ طن", en: "14 T" },
      hp: { ar: "٢٠٠ حصان", en: "200 HP" },
      size: { ar: "G14", en: "G14" },
    },
    daily: 1500,
    monthly: 28000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/0cf6d667d_generated_a0b183a3.png",
    tag: { ar: "للمشاريع الكبرى", en: "For Major Projects" },
  },
  {
    name: { ar: "بلدوزر", en: "Bulldozer D9" },
    nameAlt: { ar: "Bulldozer D9", en: "بلدوزر" },
    specs: {
      weight: { ar: "٤٩ طن", en: "49 T" },
      hp: { ar: "٤١٠ حصان", en: "410 HP" },
      size: { ar: "800-D9", en: "800-D9" },
    },
    daily: 3000,
    monthly: null,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/db4997345_generated_1d460221.png",
    tag: { ar: "دفع مقدّم", en: "Prepayment Required" },
  },
];

export const equipmentVault = {
  eyebrow: { ar: "معرض المعدات", en: "Equipment Vault" },
  title1: { ar: "الخزينة الحديدية —", en: "The Iron Vault —" },
  title2: { ar: "كل معدة جاهزة للتسليم.", en: "every unit ready for delivery." },
  coverage: { ar: "مغطّى بالكامل", en: "Fully Covered" },
  specLabels: {
    weight: { ar: "الوزن", en: "Weight" },
    hp: { ar: "القدرة", en: "Power" },
    size: { ar: "المقاس", en: "Size" },
  },
  addToRequest: { ar: "أضف للطلب", en: "Add to Request" },
  perDay: { ar: "ر.س / يوم", en: "SAR / day" },
  monthlyShort: { ar: "شهري", en: "mo" },
  ctaTitle: { ar: "لا تجد ما تحتاجه؟", en: "Can't find what you need?" },
  ctaDesc: { ar: "أرسل طلبك وسنبحث لك عن المعدة المناسبة من شبكتنا", en: "Send your request and we'll source the right unit from our network." },
  ctaBtn: { ar: "أرسل طلبك", en: "Send your request" },
};

export const how = {
  eyebrow: { ar: "كيف يعمل", en: "How It Works" },
  title1: { ar: "أربعة أطراف،", en: "Four parties," },
  title2: { ar: "معاملة واحدة.", en: "one transaction." },
  steps: [
    {
      num: "01",
      color: "#009466",
      title: { ar: "صاحب المشروع يرسل الطلب", en: "Project owner submits the request" },
      desc: { ar: "طلب حزمة معدات: النوع، العدد، المدة أو نطاق مقطوعة — عبر المنصة مباشرة.", en: "A bundled equipment request — type, quantity, duration or lump-sum scope — submitted directly on the platform." },
      party: { ar: "صاحب المشروع", en: "Project Owner" },
    },
    {
      num: "02",
      color: "#0696B0",
      title: { ar: "شيول توزّع ويوثّق", en: "Shayul routes and notarizes" },
      desc: { ar: "توزيع الطلب على الشركات المطابقة جغرافياً، وتوثيق الاتفاق بعقد إلكتروني يحدد النطاق والأسعار وجدول السداد. البوليصة تصدر تلقائياً من بيانات العقد.", en: "The request is routed to geographically-matched firms, and the agreement becomes an e-contract defining scope, pricing, and payment schedule. The policy is auto-issued from the contract's data." },
      party: { ar: "منصة شيول", en: "Shayul Platform" },
    },
    {
      num: "03",
      color: "#009466",
      title: { ar: "شريك الدفع يصدر البوليصة", en: "Payment partner issues the policy" },
      desc: { ar: "إصدار بوليصة التأمين من بيانات العقد ذاتها. تأكيد العقد والبوليصة لصاحب المشروع — الغطاء يبدأ فور التوقيع.", en: "The insurance policy is issued from the same contract data. The contract and policy are confirmed to the project owner — coverage begins the moment it's signed." },
      party: { ar: "شريك الدفع", en: "Payment Partner" },
    },
    {
      num: "04",
      color: "#009466",
      title: { ar: "صاحب المعدات ينفّذ ويستلم", en: "Equipment owner executes and gets paid" },
      desc: { ar: "تنفيذ العمل في الموقع. تحويل المستحقات خلال يوم إلى يومين من تأكيد التسليم — بدون انتظار السداد من صاحب المشروع.", en: "Work is executed on site. Dues are transferred within one to two days of delivery confirmation — no waiting on the project owner for payment." },
      party: { ar: "صاحب المعدات", en: "Equipment Owner" },
    },
  ],
  stats: [
    { val: { ar: "٢–٣٪", en: "2–3%" }, label: { ar: "عمولة شيول فقط", en: "Shayul fee only" } },
    { val: { ar: "٢٤ س", en: "24h" }, label: { ar: "أقصى وقت استجابة", en: "max response time" } },
    { val: { ar: "١٠٠٪", en: "100%" }, label: { ar: "تغطية تأمينية", en: "insurance coverage" } },
  ],
};

export const pricing = {
  eyebrow: { ar: "دليل الأسعار", en: "Pricing Guide" },
  title1: { ar: "أسعار استرشادية", en: "Indicative Rates" },
  title2: { ar: "للسوق — الرياض.", en: "for the market — Riyadh." },
  note: {
    ar: "السعر يشمل السائق والديزل والإعاشة. ما زاد عن وردية عمل معتادة يُحتسب إضافياً.",
    en: "Price includes operator, diesel, and provisions. Anything beyond a standard shift is billed extra.",
  },
  headers: {
    equipment: { ar: "المعدة", en: "Equipment" },
    daily: { ar: "يومي (ر.س)", en: "Daily (SAR)" },
    monthly: { ar: "شهري (ر.س)", en: "Monthly (SAR)" },
  },
  foot: {
    ar: "أسعار استرشادية من السوق · التسعير الفعلي يحدده العقد عبر شيول",
    en: "Indicative market prices · actual pricing is set by the contract via Shayul",
  },
  categories: [
    {
      name: { ar: "شيول", en: "Loaders" },
      items: [
        { name: { ar: "شيول مقاس ٣٦", en: "Loader Size 36" }, daily: 600, monthly: 15000, note: null },
        { name: { ar: "شيول مقاس ٥٠", en: "Loader Size 50" }, daily: 600, monthly: 15000, note: { ar: "بنفس أسعار مقاس ٣٦", en: "Same rates as size 36" } },
        { name: { ar: "شيول مقاس ٦٦", en: "Loader Size 66" }, daily: 800, monthly: 18000, note: null },
        { name: { ar: "شيول مقاس ٨٠", en: "Loader Size 80" }, daily: 1000, monthly: 25000, note: null },
        { name: { ar: "شيول ٩٢٠", en: "Loader 920" }, daily: 500, monthly: 13000, note: null },
      ],
    },
    {
      name: { ar: "بوبكات", en: "Bobcat" },
      items: [
        { name: { ar: "بوبكات ترانشر", en: "Bobcat Trencher" }, daily: 1400, monthly: null, note: null },
        { name: { ar: "بوبكات مكنسة", en: "Bobcat Sweeper" }, daily: 600, monthly: 15000, note: null },
        { name: { ar: "بوبكات قشّاطة", en: "Bobcat Cutter" }, daily: 1400, monthly: null, note: null },
      ],
    },
    {
      name: { ar: "حفارات JCB", en: "JCB Excavators" },
      items: [
        { name: { ar: "JCB — باك لودر", en: "JCB — Backhoe" }, daily: 600, monthly: 15000, note: null },
        { name: { ar: "JCB — شوكية", en: "JCB — Forklift" }, daily: 700, monthly: 22000, note: null },
      ],
    },
    {
      name: { ar: "بوكلين", en: "Forklift Trucks" },
      items: [
        { name: { ar: "بوكلين", en: "Forklift" }, daily: 800, monthly: 20000, note: null },
        { name: { ar: "بوكلين كسّارة", en: "Crusher Forklift" }, daily: 1800, monthly: 45000, note: null },
      ],
    },
    {
      name: { ar: "قالبات ونقل", en: "Dump Trucks & Transport" },
      items: [
        { name: { ar: "قالب سكس", en: "Dump Truck (6-axle)" }, daily: 650, monthly: 15000, note: null },
        { name: { ar: "قالب تريلة", en: "Dump Trailer" }, daily: 800, monthly: 18000, note: null },
        { name: { ar: "وايت موية سكس", en: "Water Truck (6-axle)" }, daily: 600, monthly: 15000, note: { ar: "غير شامل تعبئة المياه", en: "Excludes water filling" } },
      ],
    },
    {
      name: { ar: "أخرى", en: "Other" },
      items: [
        { name: { ar: "قريدر G14", en: "Motor Grader G14" }, daily: 1500, monthly: 28000, note: null },
        { name: { ar: "بلدوزر 800-D9", en: "Bulldozer 800-D9" }, daily: 3000, monthly: null, note: { ar: "يُشترط الدفع المقدّم", en: "Prepayment required" } },
        { name: { ar: "فوركلفت ٥/٧/١٠ طن", en: "Telehandler 5/7/10 T" }, daily: 1000, monthly: null, note: null },
      ],
    },
  ],
};

export const requestForm = {
  eyebrow: { ar: "أرسل طلبك", en: "Send Your Request" },
  title1: { ar: "احجز المعدة", en: "Book the Unit" },
  title2: { ar: "في دقائق.", en: "in minutes." },
  intro: {
    ar: "أرسل تفاصيل طلبك وسيتواصل معك فريق شيول لتأكيد التوفر وإعداد العقد الإلكتروني والبوليصة التأمينية.",
    en: "Submit your request details and our team will reach out to confirm availability and prepare your e-contract and insurance policy.",
  },
  guarantees: [
    { title: { ar: "عقد إلكتروني موثّق", en: "Notarized e-contract" }, desc: { ar: "يصدر فور الاتفاق على الشروط", en: "Issued the moment terms are agreed" } },
    { title: { ar: "بوليصة تأمين شاملة", en: "Full insurance policy" }, desc: { ar: "تغطي المعدة والأضرار في الموقع", en: "Covers the unit and on-site damages" } },
    { title: { ar: "تسليم سريع", en: "Fast delivery" }, desc: { ar: "اليوم نفسه أو اليوم التالي للطلب", en: "Same or next day from request" } },
    { title: { ar: "تحصيل مضمون", en: "Guaranteed collection" }, desc: { ar: "عبر طرف محايد مرخّص من ساما", en: "via a SAMA-licensed neutral party" } },
  ],
  fields: {
    name: { ar: "الاسم الكامل *", en: "Full Name *" },
    namePh: { ar: "محمد العتيبي", en: "Mohammed Al-Otaibi" },
    phone: { ar: "رقم الجوال *", en: "Phone Number *" },
    phonePh: "05XXXXXXXX",
    company: { ar: "الشركة / المنشأة", en: "Company / Entity" },
    companyPh: { ar: "اسم شركتك أو مشروعك", en: "Your company or project name" },
    type: { ar: "نوع المعدة *", en: "Equipment Type *" },
    typePh: { ar: "اختر نوع المعدة", en: "Select equipment" },
    qty: { ar: "العدد المطلوب", en: "Quantity" },
    location: { ar: "موقع المشروع *", en: "Project Location *" },
    locationPh: { ar: "الحي، المدينة — مثال: حي النرجس، الرياض", en: "District, City — e.g. Al Narjis, Riyadh" },
    duration: { ar: "المدة المطلوبة *", en: "Duration Required *" },
    durationPh: { ar: "اختر المدة", en: "Select duration" },
    notes: { ar: "تفاصيل إضافية", en: "Additional details" },
    notesPh: { ar: "نوع العمل، ساعات التشغيل، أي متطلبات خاصة...", en: "Work type, operating hours, any special requirements..." },
  },
  equipTypes: {
    ar: ["شيول / لودر", "حفارة / باك لودر", "بوبكات", "بوكلين", "قريدر", "بلدوزر", "رصاصة / دكاكة", "قالب / شاحنة", "فوركلفت", "كرين", "أخرى"],
    en: ["Wheel Loader", "Backhoe Loader", "Bobcat", "Forklift Truck", "Motor Grader", "Bulldozer", "Vibratory Roller", "Dump Truck", "Telehandler", "Crane", "Other"],
  },
  submit: { ar: "أرسل الطلب — مجاناً وبدون التزام", en: "Submit Request — free, no commitment" },
  consent: { ar: "بإرسال الطلب توافق على التواصل معك لتأكيد التفاصيل", en: "By submitting you agree to be contacted to confirm details" },
  successTitle: { ar: "تم استلام طلبك!", en: "Request Received!" },
  successDesc: {
    ar: "سيتواصل معك فريق شيول خلال ساعتين لتأكيد التفاصيل وإعداد عقدك الإلكتروني.",
    en: "Our team will contact you within two hours to confirm details and prepare your e-contract.",
  },
  newRequest: { ar: "إرسال طلب جديد", en: "Submit a new request" },
};

export const footer = {
  brand: { ar: "شيول", en: "Shayul" },
  brandEn: { ar: "SHAYUL", en: "شيول" },
  desc: {
    ar: "سوق المعدات الثقيلة الأذكى في المملكة — مع تغطية تأمينية شاملة وعقد إلكتروني موثّق على كل عملية تأجير.",
    en: "The Kingdom's smartest heavy-equipment marketplace — with full insurance coverage and a notarized e-contract on every rental.",
  },
  badge: { ar: "كل معدة... مغطّاة.", en: "Every unit... covered." },
  platformTitle: { ar: "المنصة", en: "Platform" },
  platformLinks: {
    ar: ["المعدات", "كيف يعمل", "الأسعار", "احجز المعدة"],
    en: ["Equipment", "How It Works", "Pricing", "Book a Unit"],
  },
  contactTitle: { ar: "تواصل معنا", en: "Contact" },
  location: { ar: "الرياض، المملكة العربية السعودية", en: "Riyadh, Saudi Arabia" },
  copyright: { ar: "© ٢٠٢٦ شيول · جميع الحقوق محفوظة · v1.1", en: "© 2026 Shayul · All rights reserved · v1.1" },
  legal: { ar: ["سياسة الخصوصية", "شروط الاستخدام", "اتفاقية الخدمة"], en: ["Privacy Policy", "Terms of Use", "Service Agreement"] },
  tagline: { ar: "استأجر، أنجز، واطمئن", en: "Rent, Build, Relax" },
};

export const logo = {
  ar: "شيول",
  en: "Shayul",
};

export const navCta = { ar: "احجز المعدة", en: "Book a Unit" };
export const langToggle = { ar: "EN", en: "ع" };