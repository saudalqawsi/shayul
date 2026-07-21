// Centralized bilingual content for Shayul. Each text field is { ar, en }.
// Numeric values (prices) are stored as numbers; formatted per language via num().

export const navLinks = [
  { label: { ar: "المعدات", en: "Equipment" }, href: "#equipment" },
  { label: { ar: "رحلة الحجز", en: "Booking" }, href: "#how" },
  { label: { ar: "طلباتي", en: "My Rentals" }, href: "/dashboard" },
  { label: { ar: "المزوّدون", en: "Providers" }, href: "/providers" },
  { label: { ar: "للمزوّدين", en: "For Providers" }, href: "/provider" },
  { label: { ar: "الأسعار", en: "Pricing" }, href: "#pricing" },
  { label: { ar: "تواصل معنا", en: "Contact" }, href: "#request" },
];

export const hero = {
  badge: { ar: "متاح الآن في الرياض", en: "Available now in Riyadh" },
  title1: { ar: "استأجر معدتك الثقيلة", en: "Rent your heavy equipment" },
  title2: { ar: "بأمان وضمان", en: "Safe & guaranteed" },
  subtitle: {
    ar: "منصة سعودية تربط بين ملاّك المعدات الثقيلة وطالبيها — حجز فوري، سائق يصل لموقعك، وتأمين شامل على كل معدة (قريباً).",
    en: "A Saudi platform connecting heavy-equipment owners with those who need them — instant booking, a driver to your site, and equipment-wide insurance (coming soon).",
  },
  insurancePill: { ar: "تأمين شامل على المعدات — قريباً", en: "Equipment-wide insurance — coming soon" },
  ctaRent: { ar: "استأجر معدة الآن", en: "Rent a unit" },
  ctaOwner: { ar: "سجّل أسطولك", en: "List your fleet" },
  fields: {
    type: { ar: "نوع المعدة", en: "Equipment Type" },
    typePlaceholder: { ar: "اختر نوع المعدة", en: "Select equipment" },
    location: { ar: "الموقع / الحي", en: "Location / District" },
    locationPlaceholder: { ar: "مثال: حي النرجس، الرياض", en: "e.g. Al Narjis, Riyadh" },
    duration: { ar: "المدة", en: "Duration" },
    durationPlaceholder: { ar: "اختر المدة", en: "Select duration" },
  },
  equipmentTypes: {
    ar: ["شيول / لودر", "حفارة / باك لودر", "بوبكات", "بوكلين", "قريدر", "بلدوزر", "رصاصة / دكاكة", "فوركلفت", "كرين"],
    en: ["Wheel Loader", "Backhoe Loader", "Bobcat", "Forklift Truck", "Motor Grader", "Bulldozer", "Vibratory Roller", "Telehandler", "Crane"],
  },
  durations: [
    { value: "day", ar: "يومي (وردية واحدة)", en: "Daily (single shift)" },
    { value: "week", ar: "أسبوعي", en: "Weekly" },
    { value: "scope", ar: "مقطوعة (نطاق عمل)", en: "Lump-sum (scope of work)" },
  ],
  cta: { ar: "ابحث عن المعدة المناسبة →", en: "Find the right unit →" },
  trust: [
    { ar: "تأمين شامل على المعدات — قريباً", en: "Equipment insurance — coming soon" },
    { ar: "حجز فوري بدون تفاوض", en: "Instant booking, no haggling" },
    { ar: "مؤجرون موثّقون", en: "Verified lessors" },
    { ar: "سائق يصل لموقعك", en: "Driver to your site" },
  ],
};

export const trust = {
  eyebrow: { ar: "لماذا شيول", en: "Why Shaywal" },
  title1: { ar: "ثقة في", en: "Trust on" },
  title2: { ar: "كل تأجير.", en: "every rental." },
  pillars: [
    {
      icon: "ShieldCheck",
      color: "#16A34A",
      soon: true,
      num: "01",
      title: { ar: "تأمين شامل على المعدات", en: "Equipment insurance" },
      desc: {
        ar: "كل معدة في المنصة ستُشمول بتغطية تأمينية — حقوقك محفوظة من أول يوم.",
        en: "Every unit on the platform will be covered by insurance — your rights protected from day one.",
      },
    },
    {
      icon: "Zap",
      color: "#16A34A",
      num: "02",
      title: { ar: "حجز فوري بدون تفاوض", en: "Instant booking, no haggling" },
      desc: {
        ar: "اختر، ادفع، وانتظر التأكيد. لا اتصالات ولا مساومات.",
        en: "Pick, pay, and wait for confirmation. No calls, no haggling.",
      },
    },
    {
      icon: "BadgeCheck",
      color: "#16A34A",
      num: "03",
      title: { ar: "مؤجرون موثّقون", en: "Verified lessors" },
      desc: {
        ar: "كل مؤجر مراجَع ومعتمد من فريقنا قبل قبول أي طلب.",
        en: "Every lessor is reviewed and approved by our team before any request.",
      },
    },
    {
      icon: "MapPin",
      color: "#16A34A",
      num: "04",
      title: { ar: "سائق يصل لموقعك", en: "Driver to your site" },
      desc: {
        ar: "السائق معيّن مسبقاً ويصل في الوقت المحدد مباشرة لموقع مشروعك.",
        en: "The driver is pre-assigned and arrives on time, directly at your project.",
      },
    },
  ],
  quote: {
    ar: "شيول تعيد بناء الطبقة الغائبة في السوق:",
    en: "Shaywal rebuilds the missing layer in the market:",
  },
  quoteAccent: { ar: "الثقة.", en: "Trust." },
};

export const equipment = [
  {
    name: { ar: "شيول مقاس ٣٦", en: "Loader Size 36" },
    nameAlt: { ar: "Loader Size 36", en: "شيول مقاس ٣٦" },
    specs: {
      weight: { ar: "١٠ طن", en: "10 T" },
      size: { ar: "مقاس ٣٦", en: "Size 36" },
    },
    daily: 600,
    monthly: 15000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/75605d259_generated_image.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
  {
    name: { ar: "شيول مقاس ٥٠", en: "Loader Size 50" },
    nameAlt: { ar: "Loader Size 50", en: "شيول مقاس ٥٠" },
    specs: {
      weight: { ar: "١٤ طن", en: "14 T" },
      size: { ar: "مقاس ٥٠", en: "Size 50" },
    },
    daily: 600,
    monthly: 15000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/ac33da61b_generated_image.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
  {
    name: { ar: "شيول مقاس ٦٦", en: "Loader Size 66" },
    nameAlt: { ar: "Loader Size 66", en: "شيول مقاس ٦٦" },
    specs: {
      weight: { ar: "١٨ طن", en: "18 T" },
      size: { ar: "مقاس ٦٦", en: "Size 66" },
    },
    daily: 800,
    monthly: 18000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/c7c61bd8c_generated_image.png",
    tag: { ar: "الأعلى طلباً", en: "Most Requested" },
  },
  {
    name: { ar: "شيول مقاس ٨٠", en: "Loader Size 80" },
    nameAlt: { ar: "Loader Size 80", en: "شيول مقاس ٨٠" },
    specs: {
      weight: { ar: "٢٣ طن", en: "23 T" },
      size: { ar: "مقاس ٨٠", en: "Size 80" },
    },
    daily: 1000,
    monthly: 25000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/84dd6fd86_generated_image.png",
    tag: { ar: "للمشاريع الكبرى", en: "For Major Projects" },
  },
  {
    name: { ar: "شيول ٩٢٠", en: "Loader 920" },
    nameAlt: { ar: "Loader 920", en: "شيول ٩٢٠" },
    specs: {
      weight: { ar: "٨ طن", en: "8 T" },
      size: { ar: "٩٢٠", en: "920" },
    },
    daily: 500,
    monthly: 13000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/7a371855c_generated_image.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
  {
    name: { ar: "بوبكات ترانشر", en: "Bobcat Trencher" },
    nameAlt: { ar: "Bobcat Trencher", en: "بوبكات ترانشر" },
    specs: {
      weight: { ar: "٣ طن", en: "3 T" },
      size: { ar: "ترانشر", en: "Trencher" },
    },
    daily: 1400,
    monthly: null,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/988c050dc_generated_image.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
  {
    name: { ar: "بوبكات مكنسة", en: "Bobcat Sweeper" },
    nameAlt: { ar: "Bobcat Sweeper", en: "بوبكات مكنسة" },
    specs: {
      weight: { ar: "٣ طن", en: "3 T" },
      size: { ar: "مكنسة", en: "Sweeper" },
    },
    daily: 600,
    monthly: 15000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/6fb18fadb_generated_image.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
  {
    name: { ar: "بوبكات قشّاطة", en: "Bobcat Cutter" },
    nameAlt: { ar: "Bobcat Cutter", en: "بوبكات قشّاطة" },
    specs: {
      weight: { ar: "٣ طن", en: "3 T" },
      size: { ar: "قشّاطة", en: "Cutter" },
    },
    daily: 1400,
    monthly: null,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/04ba64e23_generated_image.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
  {
    name: { ar: "JCB — باك لودر", en: "JCB — Backhoe" },
    nameAlt: { ar: "JCB — Backhoe", en: "JCB — باك لودر" },
    specs: {
      weight: { ar: "٨ طن", en: "8 T" },
      size: { ar: "باك لودر", en: "Backhoe" },
    },
    daily: 600,
    monthly: 15000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/7c862516f_generated_image.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
  {
    name: { ar: "JCB — شوكية", en: "JCB — Forklift" },
    nameAlt: { ar: "JCB — Forklift", en: "JCB — شوكية" },
    specs: {
      weight: { ar: "٨ طن", en: "8 T" },
      size: { ar: "شوكية", en: "Forklift" },
    },
    daily: 700,
    monthly: 22000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/220846fb1_generated_image.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
  {
    name: { ar: "بوكلين", en: "Excavator" },
    nameAlt: { ar: "Excavator", en: "بوكلين" },
    specs: {
      weight: { ar: "٨ طن", en: "8 T" },
      size: { ar: "٥ طن", en: "5 T" },
    },
    daily: 800,
    monthly: 20000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/69072243c_generated_image.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
  {
    name: { ar: "بوكلين كسّارة", en: "Crusher Excavator" },
    nameAlt: { ar: "Crusher Excavator", en: "بوكلين كسّارة" },
    specs: {
      weight: { ar: "١٠ طن", en: "10 T" },
      size: { ar: "كسّارة", en: "Crusher" },
    },
    daily: 1800,
    monthly: 45000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/76b26ebe0_generated_image.png",
    tag: { ar: "للمشاريع الكبرى", en: "For Major Projects" },
  },
  {
    name: { ar: "قريدر G14", en: "Motor Grader G14" },
    nameAlt: { ar: "Motor Grader G14", en: "قريدر G14" },
    specs: {
      weight: { ar: "١٤ طن", en: "14 T" },
      size: { ar: "G14", en: "G14" },
    },
    daily: 1500,
    monthly: 28000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/0eedfc1ee_generated_image.png",
    tag: { ar: "للمشاريع الكبرى", en: "For Major Projects" },
  },
  {
    name: { ar: "بلدوزر 800-D9", en: "Bulldozer 800-D9" },
    nameAlt: { ar: "Bulldozer 800-D9", en: "بلدوزر 800-D9" },
    specs: {
      weight: { ar: "٤٩ طن", en: "49 T" },
      size: { ar: "800-D9", en: "800-D9" },
    },
    daily: 3000,
    monthly: null,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/8ef36e414_generated_image.png",
    tag: { ar: "دفع مقدّم", en: "Prepayment Required" },
  },
  {
    name: { ar: "تليهاندلر", en: "Telehandler" },
    nameAlt: { ar: "Telehandler", en: "تليهاندلر" },
    specs: {
      weight: { ar: "١٨ طن", en: "18 T" },
    },
    daily: 1000,
    monthly: null,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/b50272e38_generated_image.png",
    tag: { ar: "للمشاريع الكبرى", en: "For Major Projects" },
  },
  {
    name: { ar: "رصاصة / دكاكة", en: "Vibratory Roller" },
    nameAlt: { ar: "Vibratory Roller", en: "رصاصة / دكاكة" },
    specs: {
      weight: { ar: "١٢ طن", en: "12 T" },
      size: { ar: "دكاكة", en: "Roller" },
    },
    daily: 700,
    monthly: 16000,
    img: "https://media.base44.com/images/public/6a5e151f76837cda81644b8e/6ba23693b_generated_image.png",
    tag: { ar: "متوفر الآن", en: "Available Now" },
  },
];

export const equipmentVault = {
  eyebrow: { ar: "معرض المعدات", en: "Equipment Vault" },
  title1: { ar: "كتالوج المعدات —", en: "Equipment Catalogue —" },
  title2: { ar: "كل معدة جاهزة للتسليم.", en: "every unit ready for delivery." },
  ready: { ar: "جاهز للتسليم", en: "Ready to deliver" },
  specLabels: {
    weight: { ar: "الوزن", en: "Weight" },
    size: { ar: "المقاس", en: "Size" },
  },
  addToRequest: { ar: "أضف للطلب", en: "Add to Request" },
  perDay: { ar: "يومي", en: "Daily" },
  weeklyShort: { ar: "أسبوعي", en: "wk" },
  ctaTitle: { ar: "لا تجد ما تحتاجه؟", en: "Can't find what you need?" },
  ctaDesc: { ar: "أرسل طلبك وسنبحث لك عن المعدة المناسبة من شبكتنا", en: "Send your request and we'll source the right unit from our network." },
  ctaBtn: { ar: "أرسل طلبك", en: "Send your request" },
};

export const how = {
  eyebrow: { ar: "خريطة الحجز", en: "Booking Roadmap" },
  title1: { ar: "خريطة الحجز", en: "Booking Roadmap" },
  title2: { ar: "من الطلب إلى الموقع.", en: "from request to site." },
  startTag: { ar: "بداية الحجز", en: "Booking start" },
  endTag: { ar: "التسليم", en: "On site" },
  steps: [
    {
      num: "01",
      color: "#D97706",
      title: { ar: "اختر المعدة", en: "Choose the unit" },
      desc: { ar: "تصفّح الكتالوج وحدّد النوع والحجم المناسب لمشروعك.", en: "Browse the catalogue and pick the type and size that suit your project." },
      party: { ar: "صاحب المشروع", en: "Project Owner" },
    },
    {
      num: "02",
      color: "#FCD34D",
      title: { ar: "حدّد الموعد والموقع", en: "Set date & location" },
      desc: { ar: "اختر تاريخ البداية والنهاية، وحدّد موقع المشروع بدقة.", en: "Pick the start and end dates, and pin your project location precisely." },
      party: { ar: "صاحب المشروع", en: "Project Owner" },
    },
    {
      num: "03",
      color: "#D97706",
      title: { ar: "ادفع وانتظر التأكيد", en: "Pay & await confirmation" },
      desc: { ar: "حوّل القيمة وارفع الإيصال — فريقنا يُوثّق ويُفعّل الطلب.", en: "Transfer the amount and upload your receipt — our team verifies and activates the request." },
      party: { ar: "عقد موثّق", en: "Notarized contract" },
    },
    {
      num: "04",
      color: "#D97706",
      title: { ar: "المعدة في موقعك", en: "Unit on site" },
      desc: { ar: "السائق يصل في الوقت المحدد. تابع حجزك من لوحة التحكم.", en: "The driver arrives on time. Track your booking from your dashboard." },
      party: { ar: "تسليم", en: "Delivery" },
    },
  ],
  stats: [
    { val: { ar: "٢٤س", en: "24h" }, label: { ar: "أقصى وقت استجابة", en: "max response time" } },
    { val: { ar: "اليوم/التالي", en: "same/next" }, label: { ar: "تسليم المعدة", en: "unit delivery" } },
    { val: { ar: "موثّق", en: "notarized" }, label: { ar: "كل عقد", en: "every contract" } },
  ],
};

export const contract = {
  seal: { ar: "موثّق", en: "NOTARIZED" },
  title: { ar: "عقد تأجير معدة ثقيلة", en: "HEAVY EQUIPMENT RENTAL AGREEMENT" },
  ref: "SHYW-2026-0048",
  serial: "SER · {EN}-4827",
  issueDate: { ar: "٢٠ يوليو ٢٠٢٦", en: "20 July 2026" },
  dateLabel: { ar: "تاريخ الإصدار", en: "Issue Date" },
  logoText: { ar: "شيول", en: "SHAYWAL" },
  client: { ar: "صاحب المشروع (المستأجر)", en: "Project Owner (Lessee)" },
  provider: { ar: "صاحب المعدة (المؤجّر)", en: "Equipment Owner (Lessor)" },
  scopeLabel: { ar: "نطاق العمل", en: "Scope of Work" },
  equipmentLabel: { ar: "المعدة", en: "Equipment" },
  qtyLabel: { ar: "العدد", en: "Qty" },
  durationLabel: { ar: "المدة", en: "Duration" },
  locationLabel: { ar: "الموقع", en: "Location" },
  scopeValues: {
    equipment: { ar: "شيول مقاس ٦٦", en: "Wheel Loader · Size 66" },
    qty: "2",
    duration: { ar: "أسبوعان", en: "2 weeks" },
    location: { ar: "حي النرجس، الرياض", en: "Al Narjis, Riyadh" },
    rate: { ar: "١,٦٠٠ / يوم", en: "1,600 / day" },
    total: { ar: "٢٢,٤٠٠", en: "22,400" },
  },
  rateLabel: { ar: "السعر اليومي", en: "Daily rate" },
  totalLabel: { ar: "الإجمالي", en: "Total" },
  terms: [
    { ar: "يلتزم المؤجّر بتسليم المعدة بحالة تشغيلية في التاريخ المتفق عليه.", en: "Lessor commits to delivering the unit in operating condition on the agreed date." },
    { ar: "هذا العقد موثّق إلكترونياً ويشكّل سنداً قانونياً للأطراف.", en: "This contract is electronically notarized and constitutes a legal instrument for both parties." },
  ],
  clientSign: { ar: "توقيع صاحب المشروع", en: "Project Owner" },
  providerSign: { ar: "توقيع صاحب المعدة", en: "Equipment Owner" },
  watermark: { ar: "موثّق", en: "NOTARIZED" },
};

export const provider = {
  eyebrow: { ar: "لمزوّدي المعدات", en: "For Equipment Providers" },
  title1: { ar: "أدر أسطولك،", en: "List your fleet," },
  title2: { ar: "ووردك أسرع.", en: "faster orders." },
  intro: {
    ar: "انضم إلى شبكة شيول من شركات المعدات الموثّقة. أعدّ عناصر أسطولك وأسعارك، واستلم طلبات مؤهّلة قرب منطقتك — بعقد إلكتروني موثّق يحفظ حقك.",
    en: "Join Shaywal's network of verified equipment firms. Set up your fleet and rates, receive qualified leads near your area — backed by a notarized e-contract that protects your rights.",
  },
  reqTitle: { ar: "متطلبات التسجيل", en: "Onboarding Requirements" },
  requirements: [
    { ar: "سجل تجاري ووثائق رسمية للمنشأة", en: "Commercial registration and official entity documents" },
    { ar: "تفاصيل الأسطول — نوع وعدد ومواصفات كل معدة", en: "Fleet details — type, quantity, and specs per unit" },
    { ar: "أسعار واضحة (يومي / شهري / مقطوعة)", en: "Clear rates (daily / monthly / lump-sum)" },
    { ar: "نطاق تغطية جغرافي محدد", en: "A defined geographic coverage area" },
    { ar: "التزام بجاهزية المعدة قبل التسليم", en: "Commitment to unit readiness before delivery" },
  ],
  benefitsTitle: { ar: "لماذا تنضم؟", en: "Why join?" },
  benefits: [
    { ar: "طلبات مطابقة جغرافياً", en: "Geographically-matched leads" },
    { ar: "عقد موثّق يحمي حقك", en: "Notarized contract protects your rights" },
    { ar: "مواعيد تسليم أوضح", en: "Clearer delivery scheduling" },
    { ar: "سجل سمعة مبني على إنجازك", en: "A reputation log built on your deliveries" },
  ],
  cta: { ar: "سجّل أسطولك الآن", en: "List your fleet" },
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
        { name: { ar: "بوكلين", en: "Excavator" }, daily: 800, monthly: 20000, note: null },
        { name: { ar: "بوكلين كسّارة", en: "Crusher Excavator" }, daily: 1800, monthly: 45000, note: null },
      ],
    },
    {
      name: { ar: "أخرى", en: "Other" },
      items: [
        { name: { ar: "قريدر G14", en: "Motor Grader G14" }, daily: 1500, monthly: 28000, note: null },
        { name: { ar: "بلدوزر 800-D9", en: "Bulldozer 800-D9" }, daily: 3000, monthly: null, note: { ar: "يُشترط الدفع المقدّم", en: "Prepayment required" } },
        { name: { ar: "تليهاندلر", en: "Telehandler" }, daily: 1000, monthly: null, note: null },
        { name: { ar: "رصاصة / دكاكة", en: "Vibratory Roller" }, daily: 700, monthly: 16000, note: null },
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
    { title: { ar: "تسليم سريع", en: "Fast delivery" }, desc: { ar: "اليوم نفسه أو اليوم التالي للطلب", en: "Same or next day from request" } },
    { title: { ar: "أسعار شفافة", en: "Transparent pricing" }, desc: { ar: "بلا وسيط أو رسوم خفية", en: "No middleman, no hidden fees" } },
    { title: { ar: "شركات موثّقة", en: "Verified firms" }, desc: { ar: "شبكة شركات معدات معتمدة", en: "A network of approved equipment firms" } },
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
    ar: ["شيول / لودر", "حفارة / باك لودر", "بوبكات", "بوكلين", "قريدر", "بلدوزر", "رصاصة / دكاكة", "فوركلفت", "كرين", "أخرى"],
    en: ["Wheel Loader", "Backhoe Loader", "Bobcat", "Forklift Truck", "Motor Grader", "Bulldozer", "Vibratory Roller", "Telehandler", "Crane", "Other"],
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

export const faq = {
  eyebrow: { ar: "أسئلة شائعة", en: "FAQ" },
  title1: { ar: "أسئلة قد", en: "Questions you" },
  title2: { ar: "تطرحها قبل الطلب.", en: "ask before ordering." },
  stillQues: { ar: "لم تجد إجابتك؟", en: "Didn't find your answer?" },
  cta: { ar: "تواصل مع فريق شيول →", en: "Contact our team →" },
  items: [
    {
      q: { ar: "كيف أطلب المعدة المناسبة لمشروعي؟", en: "How do I request the right unit for my project?" },
      a: {
        ar: "اختر نوع المعدة والعدد والمدة والموقع من نموذج الطلب، وسنوزّع طلبك فوراً على شركات معدات موثّقة قرب موقعك. تصلك العروض المطابقة لتختار منها.",
        en: "Pick the unit type, quantity, duration, and location from the request form. We instantly route it to verified firms near your site and send you matched offers to choose from.",
      },
    },
    {
      q: { ar: "كم تستغرق المطابقة والتسليم؟", en: "How long do matching and delivery take?" },
      a: {
        ar: "غالبية الطلبات تُلبّى في اليوم نفسه أو اليوم التالي. أقصى وقت استجابة من الشركات المتعاقدة هو ٢٤ ساعة.",
        en: "Most requests are fulfilled same or next day. The max response time from contracted firms is 24 hours.",
      },
    },
    {
      q: { ar: "ما هو العقد الإلكتروني الموثّق؟", en: "What is the notarized e-contract?" },
      a: {
        ar: "عند الاتفاق يصدر عقد إلكتروني يحدد نطاق العمل والتواريخ والسعر ويتحول إلى سند قانوني يحفظ حق الطرفين قبل بدء التشغيل.",
        en: "Once agreed, an e-contract is issued defining scope, dates, and price — it becomes a legal instrument protecting both parties before operation begins.",
      },
    },
    {
      q: { ar: "هل الأسعار المعروضة نهائية؟", en: "Are the displayed prices final?" },
      a: {
        ar: "الأسعار المعروضة استرشادية من السوق، والسعر النهائي يحدده العقد الموثّق بناءً على نوع المعدة والمدة والموقع.",
        en: "Displayed rates are indicative market prices. The final price is set by the notarized contract based on unit type, duration, and location.",
      },
    },
    {
      q: { ar: "ماذا يشمل سعر الإيجار؟", en: "What does the rental price include?" },
      a: {
        ar: "السعر يشمل السائق والديزل والإعاشة لوردية عمل معتادة. ما زاد عن الوردية يُحتسب إضافياً وفق العقد.",
        en: "The price includes the operator, diesel, and provisions for a standard shift. Anything beyond a standard shift is billed extra per the contract.",
      },
    },
    {
      q: { ar: "كيف أصبح مزوّداً على منصة شيول؟", en: "How do I become a provider on Shaywal?" },
      a: {
        ar: "انضم من بوابة المزوّدين — أرفع سجلك التجاري وتفاصيل أسطولك وأسعارك ونطاق تغطيتك، وبعد التحقق تستقبل طلبات مؤهّلة قرب منطقتك.",
        en: "Join via the Provider portal — upload your commercial registration, fleet details, rates, and coverage area. After verification you'll receive qualified leads near your area.",
      },
    },
  ],
};

export const footer = {
  brand: { ar: "شيول", en: "Shaywal" },
  brandEn: { ar: "SHAYWAL", en: "شيول" },
  desc: {
    ar: "سوق المعدات الثقيلة في المملكة — عقد إلكتروني موثّق وتسليم سريع على كل طلب.",
    en: "The Kingdom's heavy-equipment marketplace — a notarized e-contract and fast delivery on every request.",
  },
  badge: { ar: "ثقة في كل تأجير", en: "Trust on every rental" },
  platformTitle: { ar: "المنصة", en: "Platform" },
  platformLinks: {
    ar: ["المعدات", "كيف يعمل", "للمزوّدين", "الأسعار", "اطلب المعدة"],
    en: ["Equipment", "How It Works", "For Providers", "Pricing", "Request a Unit"],
  },
  contactTitle: { ar: "تواصل معنا", en: "Contact" },
  location: { ar: "الرياض، المملكة العربية السعودية", en: "Riyadh, Saudi Arabia" },
  copyright: { ar: "© ٢٠٢٦ شيول · جميع الحقوق محفوظة · v2.0", en: "© 2026 Shaywal · All rights reserved · v2.0" },
  legal: { ar: ["سياسة الخصوصية", "شروط الاستخدام", "اتفاقية الخدمة"], en: ["Privacy Policy", "Terms of Use", "Service Agreement"] },
  tagline: { ar: "ثقة في كل تأجير", en: "Trust on every rental" },
};

export const journey = {
  eyebrow: { ar: "رحلة العميل", en: "Customer Journey" },
  title1: { ar: "خريطة الطريق", en: "The Roadmap" },
  title2: { ar: "من الطلب إلى التسليم.", en: "from request to delivery." },
  intro: {
    ar: "تتبّع طلبك خطوة بخطوة — من لحظة إرساله حتى وصول المعدة إلى موقعك وتأكيد الإنجاز.",
    en: "Track your request step by step — from the moment you submit it to the unit arriving on site and completion confirmed.",
  },
  roles: [
    { key: "client", icon: "User", color: "#D97706", label: { ar: "صاحب المشروع", en: "Project Owner" } },
    { key: "platform", icon: "Database", color: "#FCD34D", label: { ar: "منصة شيول", en: "Shaywal Platform" } },
  ],
  stages: [
    {
      num: "01",
      phase: { ar: "بداية", en: "Start" },
      title: { ar: "الوصول والتسجيل", en: "Access & Onboarding" },
      client: { ar: "ينشئ حساباً ويتحقق من بيانات شركته", en: "Creates an account and verifies company details" },
      provider: { ar: "يسجّل أسطوله ويرفع معداته وأسعاره", en: "Registers fleet, uploads units and rates" },
      platform: { ar: "تنشئ القاعدة ملفي وصول مستقلَّين", en: "Database provisions two independent access profiles" },
    },
    {
      num: "02",
      phase: { ar: "إدخال", en: "Input" },
      title: { ar: "الطلب أو الإتاحة", en: "Request or Availability" },
      client: { ar: "يرسل طلب معدات: النوع، العدد، المدة، الموقع", en: "Posts equipment request: type, quantity, duration, location" },
      provider: { ar: "ينشر المعدات المتاحة وأسعارها في السوق", en: "Publishes available units and rates to the marketplace" },
      platform: { ar: "تجهّز البيانات للمطابقة الجغرافية", en: "Prepares data for geographic matching" },
    },
    {
      num: "03",
      phase: { ar: "مطابقة", en: "Match" },
      title: { ar: "المطابقة والعرض", en: "Matching & Quote" },
      client: { ar: "يستلم عروضاً مطابقة ويقارنها", en: "Receives matched quotes and compares them" },
      provider: { ar: "يستلم طلباً مؤهَّلاً ويرسل عرضه", en: "Receives a qualified lead and sends an offer" },
      platform: { ar: "تطابق الطلب بالمعدات حسب الجغرافيا والمواصفات", en: "Matches the request to units by geography and spec" },
    },
    {
      num: "04",
      phase: { ar: "عقد", en: "Contract" },
      title: { ar: "توقيع العقد", en: "Sign the Contract" },
      client: { ar: "يراجع ويوقّع العقد الإلكتروني الموثّق", en: "Reviews and signs the notarized e-contract" },
      platform: { ar: "تصدر العقد الإلكتروني الموثّق", en: "Issues the notarized e-contract" },
    },
    {
      num: "05",
      phase: { ar: "تنفيذ", en: "Execute" },
      title: { ar: "وصول المعدة", en: "Delivery" },
      client: { ar: "يؤكّد وصول المعدة إلى الموقع", en: "Confirms unit arrival on site" },
      platform: { ar: "تسجّل وقت التسليم وتحفظه في السجل", en: "Logs the delivery time and stores it to the record" },
    },
    {
      num: "06",
      phase: { ar: "إغلاق", en: "Close" },
      title: { ar: "الإنجاز والتقييم", en: "Complete & Rate" },
      client: { ar: "يؤكّد إكمال العمل ويقيّم التجربة", en: "Confirms completion and rates the experience" },
      platform: { ar: "تحفظ السجل لطلبات أسرع مستقبلاً", en: "Saves the record for faster future requests" },
    },
  ],
};

export const logo = {
  ar: "شيول",
  en: "Shaywal",
};

export const navCta = { ar: "اطلب المعدة", en: "Request a Unit" };
export const langToggle = { ar: "EN", en: "ع" };