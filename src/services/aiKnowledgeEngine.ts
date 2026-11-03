/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AiAssistantMessage, AiKnowledgeItem, HelpArticle } from '../domain/types.ts';
import { UserRole } from '../types/index.ts';

// -------------------------------------------------------------
// BILINGUAL HELP ARTICLES (Shared Knowledge Base)
// -------------------------------------------------------------
export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: 'art-recipe-costing',
    slug: 'recipe-true-costing',
    module: 'menu',
    category: 'recipes',
    titleAr: 'دليل حساب التكلفة الحقيقية للمنتج (True Product Cost)',
    titleEn: 'Comprehensive True Product Costing Guide',
    summaryAr: 'كيف تحسب منظومة Tygos تكلفة الطبق من أصغر مدخل تشغيلي (المياه والطاقة) حتى صافي الربحية.',
    summaryEn: 'How Tygos calculates plate cost from smallest operational input (water, energy) to net profit.',
    contentAr: `تعتمد Tygos صيغة التكلفة الشاملة التي تتجاوز سعر شراء المكونات فقط:
1. تكلفة المواد الخام الصافية مخصوماً منها نسبة الفاقد والهالك (Yield & Trim Loss).
2. تكلفة مواد التعبئة والتغليف (علب، أكياس، ورق طعام).
3. تكلفة العمالة المباشرة (دقائق التحضير الفعلي مضروبة في أجر الدقيقة).
4. حصة العمالة غير المباشرة ومصاريف الإشراف.
5. استهلاك المنافع والمرافق: المياه، الكهرباء، وغاز الطهي (From One Drop of Water to Profit).
6. المواد الاستهلاكية وأدوات النظافة والتعقيم.`,
    contentEn: `Tygos uses an all-inclusive cost formula that goes beyond raw ingredient purchasing price:
1. Net ingredient cost adjusted for prep scrap and yield loss.
2. Packaging components (boxes, wraps, containers).
3. Direct kitchen/bar labor (actual prep minutes multiplied by minute wage rate).
4. Indirect supervisory labor allocation.
5. Utility absorption: culinary water, refrigeration power, and cooking gas.
6. Station consumables and sanitation supplies.`,
    stepsAr: [
      'افتح شاشة "قائمة الطعام والوصفات" واختر الصنف المطلوب.',
      'راجع جدول المكونات وتأكد من تحديد نسبة الفاقد لكل مكون خام بدقة.',
      'حدد وقت التحضير المباشر بالدقائق ليقوم النظام باحتساب تكلفة العمالة تلقائياً.',
      'اطلع على بطاقة "التكلفة الحقيقية للوجبة" لمقارنة هامش الربح بالسعر المستهدف.',
    ],
    stepsEn: [
      'Navigate to Menu & Recipes and select the target item.',
      'Review ingredient table and confirm scrap/waste trim percentages.',
      'Enter active prep minutes for automated labor cost absorption.',
      'Inspect the True Product Cost card to compare margin against target benchmark.',
    ],
    commonMistakesAr: [
      'إهمال نسبة الفاقد في تنظيف اللحوم والخضار مما يؤدي لتسعير منخفض غير حقيقي.',
      'تجاهل تكلفة التغليف للطلبات الخارجية والسفري.',
      'عدم تحديث أسعار الوصفة عند ارتفاع فواتير الموردين.',
    ],
    commonMistakesEn: [
      'Omitting butchery trim loss which results in understated menu portion cost.',
      'Ignoring packaging costs on takeaway and delivery orders.',
      'Failing to create a new recipe version when supplier prices shift.',
    ],
    lastUpdated: '2026-11-03',
  },
  {
    id: 'art-theoretical-variance',
    slug: 'theoretical-vs-actual-consumption',
    module: 'cost_control',
    category: 'cost_control',
    titleAr: 'مقارنة الاستهلاك النظري بالفعلي وتشخيص الانحرافات',
    titleEn: 'Theoretical vs. Actual Consumption & Variance Diagnosis',
    summaryAr: 'طريقة احتساب استهلاك الوصفات النظري ومقارنته بحركات المخزن الفعلية لتحديد مواطن الهدر.',
    summaryEn: 'How recipe theoretical usage is reconciled with warehouse stock transactions to flag variance.',
    contentAr: `يقوم محرك Tygos بضرب عدد الوجبات المباعة عبر شاشات POS في مكونات الوصفة المعيارية المعتمدة لحساب (الاستهلاك النظري)، ثم يقارنه بسجلات الصرف والجرد الفعلي للمستودعات.
إذا ظهر انحراف موجب (استهلاك فعلي أعلى من النظري)، يقترح النظام أسباباً احتمالية تشمل:
- زيادة حجم الحصص (Over-portioning).
- هالك غير مسجل في خط التحضير (Unrecorded Waste).
- اختلاف في كثافة أو وحدة القياس (Unit Conversion Error).
- فاقد ذبائح وتجهيز (Yield Trim).`,
    contentEn: `The Tygos engine multiplies POS check sales by active recipe BOM to establish Theoretical Consumption, comparing it directly to physical warehouse stock depletion.
When positive variance occurs (actual usage exceeds theoretical), the engine calculates root cause probabilities:
- Over-portioning on service line.
- Unrecorded prep waste.
- Packaging or unit conversion mismatch.
- Butchery and yield extraction differences.`,
    stepsAr: [
      'افتح شاشة "مراقبة التكاليف والانحراف".',
      'اختر مركز التكلفة أو القسم المطلوب (مطبخ، بار، مخبز).',
      'راجع عمود "الانحراف المالي" لمعرفة المكونات الأعلى تأثيراً على الربحية.',
      'انقر على أي مكون لعرض بطاقة تحليل الأسباب المحتملة والإجراء التصحيحي المقترح.',
    ],
    stepsEn: [
      'Open Cost Control & Variance module.',
      'Filter by department cost center (Kitchen, Bar, Bakehouse).',
      'Sort by Variance Cost Value to identify high-impact ingredients.',
      'Click on any item to view root cause diagnosis and recommended action.',
    ],
    commonMistakesAr: [
      'افتراض أن كل انحراف هو سرقة دون فحص موازين التحضير ونسب الهالك.',
      'تأخير تسجيل الجرد الفعلي للمستودع مما يشوه المقارنة الزمنية.',
    ],
    commonMistakesEn: [
      'Assuming variance is shrinkage without checking portion scale calibration.',
      'Delaying stocktake entry which distorts operational alignment.',
    ],
    lastUpdated: '2026-11-03',
  },
  {
    id: 'art-privileged-security',
    slug: 'privileged-access-security',
    module: 'security',
    category: 'security',
    titleAr: 'سياسة الأمان وطلب التصريح المؤقت (بدون مشاركة كلمات المرور)',
    titleEn: 'Security Policy & Temporary Privileged Access (No Password Sharing)',
    summaryAr: 'البروتوكول الأمني المعتمد لطلب تصريح مؤقت ومحدد المدة للوصول للسجلات المحمية.',
    summaryEn: 'Authorized protocol for requesting timed, audited privilege escalation without sharing passwords.',
    contentAr: `تمنع منظومة Tygos مشاركة كلمات المرور أو طلب كلمة مرور مدير آخر نهائياً.
بدلاً من ذلك:
1. يقدم الموظف طلب تصريح أمني عبر النظام مبيناً السبب والمدة المطلوبة بالدقائق.
2. يتلقى المدير المسؤول أو المشرف إشعاراً فورياً للقبول أو الرفض مع سبب معلل.
3. عند الموافقة، يولد النظام جلسة مؤقتة محددة بوقت وجهاز ومسجلة في سجل التدقيق الأمني المشفر.`,
    contentEn: `Tygos strictly forbids credential sharing or requesting manager passwords.
Instead:
1. The user generates a timed privilege request with explicit business justification.
2. The designated administrator receives real-time notification to approve or reject with reason.
3. Upon approval, a temporary cryptographic session token is issued and logged in the immutable audit trail.`,
    stepsAr: [
      'عند محاولة الوصول لشاشة أو بيان محمي، انقر على زر "طلب تصريح وصول مؤقت".',
      'حدد المورد المطلوب واكتب سبب الطلب والمدة بالدقائق (مثلاً 15 دقيقة).',
      'يقوم المدير المعتمد بمراجعة الطلب والموافقة عليه من مركز التحكم.',
    ],
    stepsEn: [
      'Upon accessing a protected resource, click "Request Privileged Access".',
      'Select resource, enter clear justification and duration in minutes.',
      'Authorized administrator approves via real-time security cockpit.',
    ],
    commonMistakesAr: [
      'مشاركة بيانات تسجيل الدخول بين الموظفين يعرض المنشأة لمخاطر أمنية ويلغي الضمان.',
      'طلب صلاحيات دائمة لأعمال مؤقتة.',
    ],
    commonMistakesEn: [
      'Sharing login credentials creates severe compliance breaches and audit failures.',
      'Requesting permanent role changes for short one-time tasks.',
    ],
    lastUpdated: '2026-11-03',
  },
];

// -------------------------------------------------------------
// KNOWLEDGE ITEMS FOR TYGOS AI ASSISTANT
// -------------------------------------------------------------
export const KNOWLEDGE_ITEMS: AiKnowledgeItem[] = [
  {
    id: 'k-food-cost',
    entityType: 'cost_concept',
    keywordAr: 'تكلفة الطعام',
    keywordEn: 'food cost',
    synonymsAr: ['تكلفة الاغذية', 'فود كوست', 'نسبة التكلفة', 'الفود كوست', 'تكلفة الوصفة'],
    synonymsEn: ['cogs', 'recipe cost', 'plate cost', 'dish cost'],
    misspellings: ['فودكوست', 'فود كست', 'foodcost', 'fod cost'],
    descriptionAr: 'نسبة تكلفة المكونات والمواد الخام والتحضير إلى سعر بيع الطبق للمستهلك.',
    descriptionEn: 'The percentage of raw ingredient, packaging, and prep cost relative to menu selling price.',
    targetView: 'cost_control',
    requiredRoles: ['tenant_admin', 'general_manager', 'cost_accountant', 'kitchen_manager', 'financial_manager', 'super_admin'],
    helpArticleSlug: 'recipe-true-costing',
    contextActionsAr: [
      { label: 'عرض مؤشرات تكلفة الأغذية', action: 'NAV:cost_control' },
      { label: 'فتح حاسبة الوصفات المعيارية', action: 'NAV:menu' },
      { label: 'محاكاة أثر أسعار الموردين (What-If)', action: 'ACTION:simulation' },
    ],
    contextActionsEn: [
      { label: 'View Food Cost KPIs', action: 'NAV:cost_control' },
      { label: 'Open Recipe Engineering BOM', action: 'NAV:menu' },
      { label: 'Simulate What-If Price Impact', action: 'ACTION:simulation' },
    ],
  },
  {
    id: 'k-profit-drivers',
    entityType: 'cost_concept',
    keywordAr: 'أرباح',
    keywordEn: 'profit',
    synonymsAr: ['الارباح', 'صافي الربح', 'مجمل الربح', 'ليه الربح قل', 'ليه الربح زاد', 'انخفاض الارباح'],
    synonymsEn: ['net profit', 'gross profit', 'why profit decreased', 'why profit increased', 'profitability'],
    misspellings: ['ارباح', 'ارباحي', 'بروفيت', 'proft', 'porfit'],
    descriptionAr: 'تحليل محركات ومسببات التغير في صافي الربح مقارنة بالشهر السابق.',
    descriptionEn: 'Decomposition of monthly profit variance into volume, price, labor, and waste drivers.',
    targetView: 'dashboard',
    requiredRoles: ['tenant_admin', 'general_manager', 'financial_manager', 'financial_accountant', 'super_admin'],
    contextActionsAr: [
      { label: 'تحليل أسباب زيادة أو انخفاض الربح', action: 'ACTION:profit_breakdown' },
      { label: 'مراجعة التقرير المالي الشامل', action: 'NAV:finance' },
    ],
    contextActionsEn: [
      { label: 'Analyze Profit Drivers', action: 'ACTION:profit_breakdown' },
      { label: 'Open Financial Statements', action: 'NAV:finance' },
    ],
  },
  {
    id: 'k-inventory-variance',
    entityType: 'feature',
    keywordAr: 'المخزون',
    keywordEn: 'inventory',
    synonymsAr: ['المستودع', 'المخازن', 'مخزن', 'انحراف المخزن', 'الجرد', 'الهالك'],
    synonymsEn: ['warehouse', 'stock', 'variance', 'waste', 'theoretical consumption'],
    misspellings: ['مخازن', 'مستودعات', 'المستودعات', 'inventry', 'warehous', 'stok'],
    descriptionAr: 'متابعة الأرصدة النظرية والفعلية وتحويلات المستودعات وتتبع الانحرافات.',
    descriptionEn: 'Theoretical vs actual stock monitoring, warehouse transfers, and variance tracking.',
    targetView: 'inventory',
    requiredRoles: ['tenant_admin', 'general_manager', 'store_manager', 'cost_accountant', 'kitchen_manager', 'super_admin'],
    helpArticleSlug: 'theoretical-vs-actual-consumption',
    contextActionsAr: [
      { label: 'فحص انحرافات الاستهلاك الفعلي', action: 'NAV:cost_control' },
      { label: 'إدارة المستودعات والجرد', action: 'NAV:inventory' },
    ],
    contextActionsEn: [
      { label: 'Inspect Consumption Variances', action: 'NAV:cost_control' },
      { label: 'Manage Warehouses & Stock', action: 'NAV:inventory' },
    ],
  },
  {
    id: 'k-payroll-hr',
    entityType: 'feature',
    keywordAr: 'الرواتب',
    keywordEn: 'payroll',
    synonymsAr: ['مرتبات', 'المرتبات', 'الموظفين', 'رواتب الموظفين', 'ساعات العمل', 'البصمة'],
    synonymsEn: ['salaries', 'staff wages', 'labor cost', 'attendance'],
    misspellings: ['رواتب', 'راتب', 'payrol', 'salery'],
    descriptionAr: 'مسير الرواتب الشهري والتفرقة المعيارية بين العمالة المباشرة وغير المباشرة.',
    descriptionEn: 'Monthly payroll run and strict distinction between Direct and Indirect production labor.',
    targetView: 'hr',
    requiredRoles: ['tenant_admin', 'general_manager', 'hr_manager', 'super_admin'],
    helpArticleSlug: 'privileged-access-security',
    contextActionsAr: [
      { label: 'فتح دليل الموظفين والرواتب', action: 'NAV:hr' },
      { label: 'طلب تصريح وصول مؤقت للمسير', action: 'ACTION:request_access' },
    ],
    contextActionsEn: [
      { label: 'Open Staff & Payroll Directory', action: 'NAV:hr' },
      { label: 'Request Timed Privileged Access', action: 'ACTION:request_access' },
    ],
  },
  {
    id: 'k-supplier-prices',
    entityType: 'feature',
    keywordAr: 'الموردين',
    keywordEn: 'suppliers',
    synonymsAr: ['المورد', 'اسعار الموردين', 'مشتريات', 'فواتير الشراء', 'اوامر الشراء'],
    synonymsEn: ['purchasing', 'vendor prices', 'purchase orders', 'goods receipt'],
    misspellings: ['موردين', 'مورد', 'مشتريات', 'suplier', 'purshase'],
    descriptionAr: 'إدارة الموردين المعتمدين والمطابقة الثلاثية وتتبع تقلبات أسعار الشراء.',
    descriptionEn: 'Approved supplier directory, 3-way matching, and purchase price intelligence.',
    targetView: 'purchasing',
    requiredRoles: ['tenant_admin', 'general_manager', 'store_manager', 'financial_manager', 'financial_accountant', 'super_admin'],
    contextActionsAr: [
      { label: 'سجل أوامر الشراء والموردين', action: 'NAV:purchasing' },
      { label: 'مقارنة أسعار التوريد البديلة', action: 'NAV:purchasing' },
    ],
    contextActionsEn: [
      { label: 'Open Purchase Orders', action: 'NAV:purchasing' },
      { label: 'Compare Vendor Pricing', action: 'NAV:purchasing' },
    ],
  },
];

/**
 * Normalizes text for Arabic and English typo tolerance
 */
export function normalizeQuery(query: string): string {
  let q = query.toLowerCase().trim();
  // Strip common Arabic prefixes like الـ, بـ, لـ, كـ, و
  q = q.replace(/^(ال|ب|ل|ك|و)/, '');
  // Normalize Arabic letters
  q = q.replace(/[إأآا]/g, 'ا');
  q = q.replace(/ة/g, 'ه');
  q = q.replace(/ى/g, 'ي');
  return q;
}

/**
 * Typo-tolerant keyword matching
 */
export function matchesKnowledgeItem(query: string, item: AiKnowledgeItem): boolean {
  const normQ = normalizeQuery(query);
  const words = normQ.split(/\s+/).filter(Boolean);

  const targets = [
    item.keywordAr,
    item.keywordEn,
    ...item.synonymsAr,
    ...item.synonymsEn,
    ...item.misspellings,
  ].map((t) => normalizeQuery(t));

  for (const word of words) {
    if (word.length < 2) continue;
    for (const target of targets) {
      if (target.includes(word) || word.includes(target)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Tygos AI Assistant Decision Engine
 * Respects RBAC: Checks permissions, refuses unauthorized financial/HR queries,
 * provides contextual action buttons and deterministic explanations.
 */
export function processAssistantQuery(
  rawQuery: string,
  userRole: UserRole,
  userLanguage: 'ar' | 'en' | 'fr' | 'nl' | 'tr'
): AiAssistantMessage {
  const isAr = userLanguage === 'ar';
  const queryLower = rawQuery.toLowerCase();

  // Find matching knowledge items
  const matchedItem = KNOWLEDGE_ITEMS.find((item) => matchesKnowledgeItem(rawQuery, item));

  // If matching knowledge item found, evaluate RBAC permissions
  if (matchedItem) {
    const isAuthorized = matchedItem.requiredRoles.includes(userRole);

    if (!isAuthorized) {
      return {
        id: `msg-denied-${Date.now()}`,
        sender: 'tygos_ai',
        contentAr: `عذراً، هذا الاستعلام يتعلق ببيانات (${matchedItem.keywordAr}) المحمية التي تتطلب صلاحيات إدارية خاصة تتجاوز دورك الحالي (${userRole}). يمكنك تقديم طلب تصريح أمني مؤقت ومحدد المدة للمشرف المسؤول.`,
        contentEn: `Access restricted. Query involves protected (${matchedItem.keywordEn}) data exceeding your current role permissions (${userRole}). You may submit a temporary timed privileged access request to your authorized supervisor.`,
        content: isAr
          ? `عذراً، هذا الاستعلام يتعلق ببيانات (${matchedItem.keywordAr}) المحمية التي تتطلب صلاحيات إدارية خاصة تتجاوز دورك الحالي (${userRole}). يمكنك تقديم طلب تصريح أمني مؤقت ومحدد المدة للمشرف المسؤول.`
          : `Access restricted. Query involves protected (${matchedItem.keywordEn}) data exceeding your current role permissions (${userRole}). You may submit a temporary timed privileged access request to your authorized supervisor.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isPermissionDenied: true,
        permissionDeniedResource: matchedItem.id,
        suggestedActions: [
          {
            label: isAr ? 'تقديم طلب تصريح مؤقت' : 'Request Timed Privileged Access',
            query: isAr ? 'طلب تصريح أمني' : 'Request Security Escalation',
            action: 'ACTION:request_access',
          },
          {
            label: isAr ? 'قراءة سياسة الأمان' : 'Read Security Policy',
            query: isAr ? 'سياسة الأمان' : 'Security Policy',
            action: 'ARTICLE:privileged-access-security',
          },
        ],
      };
    }

    // Authorized response with deterministic recommendations
    const actions = isAr
      ? matchedItem.contextActionsAr?.map((a) => ({ label: a.label, query: a.label, action: a.action }))
      : matchedItem.contextActionsEn?.map((a) => ({ label: a.label, query: a.label, action: a.action }));

    let contentAr = `${matchedItem.descriptionAr}\n\nتوصية المحرك الذكي: يمكنك فتح الشاشة ذات الصلة أو محاكاة أثر المتغيرات مباشرة باستخدام الأدوات أدناه.`;
    let contentEn = `${matchedItem.descriptionEn}\n\nEngine Guidance: You can inspect the designated module or test parameter impact using the contextual actions below.`;

    if (matchedItem.id === 'k-food-cost') {
      contentAr = `معدل تكلفة الطعام الحالي للمنشأة هو 31.4% (الهدف المعياري: 30.0%).\n\nأعلى الأصناف تكلفة هذا الأسبوع:\n• شريحة ترافل ريب آي (Food Cost: 38.5%)\n• برجر واغيو مدخن (Food Cost: 34.2%)\n\nالأثر المالي: تقلبات أسعار شراء اللحوم (+14.2%) وهالك التحضير الصباحي هما العاملان الرئيسيان.`;
      contentEn = `Current establishment Food Cost average is 31.4% (Target: 30.0%).\n\nHighest cost contributors this week:\n• Angus Truffle Ribeye (Food Cost: 38.5%)\n• Smoked Wagyu Burger (Food Cost: 34.2%)\n\nFinancial Impact: Supplier meat price drift (+14.2%) and morning butchery trim loss are the primary drivers.`;
    } else if (matchedItem.id === 'k-profit-drivers') {
      contentAr = `تحليل مسببات الأرباح لشهر نوفمبر 2026:\n\n• صافي الربح الفعلي: $21,480 (انخفاض طفيف بنسبة -3.8% مقارنة بالشهر السابق)\n• السبب الرئيسي: ارتفاع أسعار شراء المواد الخام بنسبة 6.2% وزيادة هالك التحضير في قسم اللحوم بنسبة 11.5%، بالرغم من نمو المبيعات الكلية بنسبة 3.7%.`;
      contentEn = `Profit Variance Analysis for November 2026:\n\n• Actual Net Profit: $21,480 (-3.8% vs October)\n• Primary Causes: Supplier ingredient price inflation (+6.2%) and prep waste in butchery (+11.5%), which outweighed sales volume expansion of +3.7%.`;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'tygos_ai',
      contentAr,
      contentEn,
      content: isAr ? contentAr : contentEn,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: actions || [],
      referencedEntities: matchedItem.targetView ? [{ name: matchedItem.keywordEn, type: 'module', id: matchedItem.targetView }] : [],
    };
  }

  // Fallback for general hospitality guidance
  const defaultAr = `مرحباً بك في مساعد Tygos الذكي للإدارة والتشغيل.\n\nيمكنني مساعدتك في:\n1. تحليل أسباب تغير الأرباح وتكلفة الأغذية (Food Cost).\n2. تدقيق انحرافات الاستهلاك النظري مقابل الفعلي في المستودعات.\n3. محاكاة أثر أسعار الموردين وسعر البيع عبر أداة (What-If).\n4. توجيهك لشاشات المنظومة والإرشادات التشغيلية المعتمدة.`;
  const defaultEn = `Welcome to the Tygos Operational & Management Intelligence Assistant.\n\nI can assist you with:\n1. Analyzing monthly profit drivers and Food Cost variance.\n2. Reconciling theoretical vs actual ingredient warehouse consumption.\n3. Simulating supplier price drift and menu pricing with the What-If tool.\n4. Guiding you through system modules and standardized SOP documentation.`;

  return {
    id: `msg-${Date.now()}`,
    sender: 'tygos_ai',
    contentAr: defaultAr,
    contentEn: defaultEn,
    content: isAr ? defaultAr : defaultEn,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedActions: [
      {
        label: isAr ? 'ليه الـ Food Cost زاد؟' : 'Why did Food Cost increase?',
        query: isAr ? 'ليه الـ Food Cost زاد؟' : 'Why did Food Cost increase?',
      },
      {
        label: isAr ? 'أسباب تغير الأرباح' : 'Analyze Profit Drivers',
        query: isAr ? 'أسباب تغير الأرباح' : 'Analyze Profit Drivers',
      },
      {
        label: isAr ? 'انحرافات المستودعات' : 'Warehouse Variances',
        query: isAr ? 'انحرافات المستودعات' : 'Warehouse Variances',
      },
      {
        label: isAr ? 'فتح أداة المحاكاة (What-If)' : 'Open What-If Simulation',
        query: isAr ? 'فتح أداة المحاكاة' : 'Open Simulation Workspace',
        action: 'ACTION:simulation',
      },
    ],
  };
}
