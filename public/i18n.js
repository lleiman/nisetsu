/* NISETSU — i18n · EN / RU / ZH / JA / ID
 *
 * All text in data-i18n="key" attributes is swapped on language change.
 * Supports innerHTML (for <br>, <span class="italic">, etc.).
 * Language preference stored in localStorage + cookie for SSR later.
 * Works alongside the edit-mode system — edit overrides sit on top.
 */

(function () {
  'use strict';

  const LANGS = ['en', 'ru', 'zh', 'ja', 'id'];
  const DEFAULT = 'en';

  /* ================================================================
     TRANSLATIONS
     ================================================================ */

  const T = {

    /* ---- Utility bar ---- */
    'util.shipping': {
      en: 'Complimentary worldwide shipping on editions above $1,500',
      ru: 'Бесплатная доставка по всему миру для изданий стоимостью от $1 500',
      zh: '售价 $1,500 以上的限定版享受全球免费配送',
      ja: '$1,500以上のエディションは全世界送料無料',
      id: 'Pengiriman gratis ke seluruh dunia untuk edisi di atas $1.500',
    },

    /* ---- Nav ---- */
    'nav.collection': {
      en: 'Collection', ru: 'Коллекция', zh: '系列', ja: 'コレクション', id: 'Koleksi',
    },
    'nav.craft': {
      en: 'Craft', ru: 'Ремесло', zh: '工艺', ja: '工芸', id: 'Kerajinan',
    },
    'nav.dojo': {
      en: 'Dojo', ru: 'Додзё', zh: '道场', ja: '道場', id: 'Dojo',
    },
    'nav.journal': {
      en: 'Journal', ru: 'Журнал', zh: '手记', ja: 'ジャーナル', id: 'Jurnal',
    },
    'nav.search': {
      en: 'Search', ru: 'Поиск', zh: '搜索', ja: '検索', id: 'Cari',
    },
    'nav.account': {
      en: 'Account', ru: 'Аккаунт', zh: '账户', ja: 'アカウント', id: 'Akun',
    },
    'nav.cart': {
      en: 'Cart <span style="color: var(--ink-quiet);">(0)</span>',
      ru: 'Корзина <span style="color: var(--ink-quiet);">(0)</span>',
      zh: '购物袋 <span style="color: var(--ink-quiet);">(0)</span>',
      ja: 'カート <span style="color: var(--ink-quiet);">(0)</span>',
      id: 'Keranjang <span style="color: var(--ink-quiet);">(0)</span>',
    },
    'nav.specs': {
      en: 'Specifications', ru: 'Характеристики', zh: '技术参数', ja: '仕様', id: 'Spesifikasi',
    },

    /* ---- Hero ---- */
    'hero.eyebrow1': {
      en: 'No. 001 — Inaugural release',
      ru: 'No. 001 — Премьерный выпуск',
      zh: 'No. 001 — 创刊发行',
      ja: 'No. 001 — 創刊リリース',
      id: 'No. 001 — Edisi perdana',
    },
    'hero.eyebrow2': {
      en: 'Edition of 120',
      ru: 'Тираж: 120 пар',
      zh: '限量120件',
      ja: '120本限定',
      id: 'Edisi 120 pasang',
    },
    'hero.title': {
      en: 'Two sections.<br><span class="italic">One discipline.</span>',
      ru: 'Два звена.<br><span class="italic">Одна дисциплина.</span>',
      zh: '二节之器。<br><span class="italic">一心之道。</span>',
      ja: '二つの節。<br><span class="italic">一つの鍛錬。</span>',
      id: 'Dua ruas.<br><span class="italic">Satu disiplin.</span>',
    },
    'hero.desc': {
      en: 'Hand-finished training nunchaku, produced in editions of 120. Smoked oak, hand-forged brass, hand-braided silk cord. Each pair signed, numbered, and accompanied by a vegetable-tanned leather case.',
      ru: 'Тренировочные нунчаку ручной отделки, выпущенные тиражом 120 пар. Копчёный дуб, кованая вручную латунь, плетёный шёлковый шнур. Каждая пара подписана, пронумерована и поставляется в чехле из растительного дубления.',
      zh: '手工精制训练双节棍，每版限量120件。烟熏橡木、手锻黄铜、手编丝绳。每件均有大师签名与编号，配植鞣皮革收纳盒。',
      ja: '手仕上げの稽古用ヌンチャク、120本限定制作。燻製オーク、手鍛造の真鍮、手編みの絹紐。すべてに署名・番号を付し、ベジタブルタンニンレザーケースを添えて。',
      id: 'Nunchaku latihan buatan tangan, diproduksi dalam edisi 120 pasang. Kayu ek asap, kuningan tempa tangan, tali sutra anyaman tangan. Setiap pasang ditandatangani, bernomor, disertai kotak kulit samak nabati.',
    },
    'hero.cta': {
      en: 'Discover the collection &nbsp;→',
      ru: 'Открыть коллекцию &nbsp;→',
      zh: '探索系列 &nbsp;→',
      ja: 'コレクションを見る &nbsp;→',
      id: 'Jelajahi koleksi &nbsp;→',
    },
    'hero.craft': {
      en: 'On the craft',
      ru: 'О ремесле',
      zh: '关于工艺',
      ja: '工芸について',
      id: 'Tentang kerajinan',
    },
    'hero.atelier': {
      en: 'Atelier · Kyoto &nbsp;—&nbsp; Studio · Manila',
      ru: 'Ателье · Киото &nbsp;—&nbsp; Студия · Манила',
      zh: '工坊 · 京都 &nbsp;—&nbsp; 工作室 · 马尼拉',
      ja: 'アトリエ · 京都 &nbsp;—&nbsp; スタジオ · マニラ',
      id: 'Atelier · Kyoto &nbsp;—&nbsp; Studio · Manila',
    },
    'hero.scroll': {
      en: 'Scroll &nbsp;↓', ru: 'Листайте &nbsp;↓', zh: '下滑 &nbsp;↓',
      ja: 'スクロール &nbsp;↓', id: 'Gulir &nbsp;↓',
    },
    'hero.panel.name': {
      en: 'The Kuro pair<br><span style="color: var(--dark-muted);">112 / 120</span>',
      ru: 'Пара Куро<br><span style="color: var(--dark-muted);">112 / 120</span>',
      zh: '黒 Kuro 系列<br><span style="color: var(--dark-muted);">112 / 120</span>',
      ja: '黒ペア<br><span style="color: var(--dark-muted);">112 / 120</span>',
      id: 'Pasangan Kuro<br><span style="color: var(--dark-muted);">112 / 120</span>',
    },
    'hero.panel.fig': {
      en: 'Fig. 01 · Smoked oak, brass',
      ru: 'Рис. 01 · Копчёный дуб, латунь',
      zh: '图01 · 烟熏橡木、黄铜',
      ja: '図01 · 燻製オーク、真鍮',
      id: 'Gbr. 01 · Ek asap, kuningan',
    },

    /* ---- Manifesto ---- */
    'manifesto.quote': {
      en: 'An object made not to be wielded often,<br>but to be returned to.',
      ru: 'Предмет, созданный не для частого использования,<br>а для возвращения к нему.',
      zh: '不为频繁挥舞而制，<br>只为一次次重拾。',
      ja: '頻繁に振るうためではなく、<br>何度でも戻るために作られたもの。',
      id: 'Sebuah benda yang dibuat bukan untuk sering diayunkan,<br>melainkan untuk selalu dikembalikan.',
    },
    'manifesto.attr': {
      en: 'From the atelier notebook · Kyoto, March 2026',
      ru: 'Из записной книжки ателье · Киото, март 2026',
      zh: '摘自工坊笔记 · 京都，2026年3月',
      ja: 'アトリエノートより · 京都、2026年3月',
      id: 'Dari buku catatan atelier · Kyoto, Maret 2026',
    },

    /* ---- Collection ---- */
    'collection.title': {
      en: 'The Collection', ru: 'Коллекция', zh: '系列作品',
      ja: 'コレクション', id: 'Koleksi',
    },
    'collection.viewall': {
      en: 'View all editions →', ru: 'Все издания →', zh: '查看所有版本 →',
      ja: '全エディションを見る →', id: 'Lihat semua edisi →',
    },
    'product.kuro.materials': {
      en: 'Smoked oak · hand-forged brass<br>Braided black silk cord',
      ru: 'Копчёный дуб · кованая латунь<br>Плетёный чёрный шёлковый шнур',
      zh: '烟熏橡木 · 手锻黄铜<br>编织黑丝绳',
      ja: '燻製オーク · 手鍛造真鍮<br>編み黒絹紐',
      id: 'Ek asap · kuningan tempa tangan<br>Tali sutra hitam anyaman',
    },
    'product.shiro.materials': {
      en: 'Bleached ash · sterling silver collars<br>Ivory silk cord',
      ru: 'Отбелённый ясень · серебряные муфты<br>Молочный шёлковый шнур',
      zh: '漂白白蜡木 · 纯银领环<br>象牙色丝绳',
      ja: '漂白アッシュ · スターリングシルバー<br>アイボリー絹紐',
      id: 'Ash putih · perak sterling<br>Tali sutra gading',
    },
    'product.shu.materials': {
      en: 'Bloodwood · blackened steel<br>Oxblood kangaroo leather lacing',
      ru: 'Кровавое дерево · вороная сталь<br>Шнуровка из кожи кенгуру цвета бычьей крови',
      zh: '血木 · 黑化钢<br>牛血色袋鼠皮系带',
      ja: 'ブラッドウッド · 黒染め鋼<br>オックスブラッド カンガルーレザーレーシング',
      id: 'Kayu darah · baja hitam<br>Tali kulit kanguru merah darah',
    },
    'product.view': {
      en: 'View →', ru: 'Подробнее →', zh: '查看 →',
      ja: '詳細 →', id: 'Lihat →',
    },

    /* ---- Spotlight ---- */
    'spotlight.label': {
      en: 'Spotlight — 黒 Kuro', ru: 'В центре — 黒 Куро',
      zh: '焦点 — 黒 Kuro', ja: 'スポットライト — 黒',
      id: 'Sorotan — 黒 Kuro',
    },
    'spotlight.fig': {
      en: 'Fig. 02 · Smoked oak, view from above',
      ru: 'Рис. 02 · Копчёный дуб, вид сверху',
      zh: '图02 · 烟熏橡木，俯视图',
      ja: '図02 · 燻製オーク、上面図',
      id: 'Gbr. 02 · Ek asap, tampak atas',
    },
    'spotlight.signature': {
      en: '黒 · KURO · 002 of 120<br>signed Hashimoto',
      ru: '黒 · KURO · 002 из 120<br>подпись: Хашимото',
      zh: '黒 · KURO · 120件中第002件<br>桥本签名',
      ja: '黒 · KURO · 120本中002<br>橋本署名',
      id: '黒 · KURO · 002 dari 120<br>ditandatangani Hashimoto',
    },
    'spotlight.title': {
      en: 'Smoked for eight weeks,<br><span class="italic">returned to oil.</span>',
      ru: 'Восемь недель копчения,<br><span class="italic">и возвращение к маслу.</span>',
      zh: '八周烟熏，<br><span class="italic">再以油润。</span>',
      ja: '八週間の燻製、<br><span class="italic">油へ還る。</span>',
      id: 'Diasap selama delapan minggu,<br><span class="italic">dikembalikan ke minyak.</span>',
    },
    'spotlight.body1': {
      en: 'The Kuro pair begins as quarter-sawn oak from a single tree felled in Tohoku. Eight weeks suspended above white-oak smoke darken the wood from the inside; the grain remains visible but recedes. Two further weeks soaking in tung oil bring the surface back to a soft, almost organic warmth.',
      ru: 'Пара Куро начинается как радиально распиленный дуб из единственного дерева, срубленного в Тохоку. Восемь недель над дымом белого дуба темнят древесину изнутри; текстура остаётся видимой, но отступает вглубь. Ещё две недели в тунговом масле возвращают поверхности мягкое, почти органическое тепло.',
      zh: 'Kuro 系列选用东北地区单棵橡树的径切板材。悬于白橡木烟中八周，木材由内而外变深；纹理仍然可见，却更加内敛。再经两周桐油浸润，表面恢复柔和、近乎天然的温度。',
      ja: '黒ペアは東北で伐採された一本の樫の柾目材から始まる。白樫の煙の上に八週間吊るすことで、木は内部から暗くなる。木目は見えるが後退する。さらに二週間の桐油浸漬が、柔らかく、ほぼ有機的な温かみを表面に戻す。',
      id: 'Pasangan Kuro dimulai dari kayu ek belah kuarter dari satu pohon yang ditebang di Tohoku. Delapan minggu digantung di atas asap kayu ek putih menggelapkan kayu dari dalam; serat tetap terlihat namun surut. Dua minggu lagi direndam minyak tung mengembalikan permukaan ke kehangatan yang lembut, hampir organik.',
    },
    'spotlight.body2': {
      en: 'Each pair takes 184 hours of work, end to end. The brass is forged in a small smithy outside Otsu, then hand-fitted and burnished.',
      ru: 'Каждая пара требует 184 часа работы от начала до конца. Латунь выкована в небольшой кузнице под Оцу, подогнана и отполирована вручную.',
      zh: '每件从头到尾耗时184小时。黄铜在大津郊外的小锻铁铺中锻造，然后手工装配并抛光。',
      ja: '各ペアの制作には184時間を要する。真鍮は大津郊外の小さな鍛冶場で鍛え、手作業で取り付け、磨き上げる。',
      id: 'Setiap pasang membutuhkan 184 jam kerja dari awal hingga akhir. Kuningan ditempa di bengkel kecil di luar Otsu, lalu dipasang dan digosok dengan tangan.',
    },
    'spotlight.length': {
      en: 'Length', ru: 'Длина', zh: '长度', ja: '長さ', id: 'Panjang',
    },
    'spotlight.length.val': {
      en: '30 cm per section', ru: '30 см на секцию', zh: '每节30厘米',
      ja: '各節30 cm', id: '30 cm per ruas',
    },
    'spotlight.weight': {
      en: 'Weight', ru: 'Вес', zh: '重量', ja: '重量', id: 'Berat',
    },
    'spotlight.weight.val': {
      en: '340 g, balanced', ru: '340 г, сбалансировано', zh: '340克，均衡配重',
      ja: '340 g、バランス調整済', id: '340 g, seimbang',
    },
    'spotlight.cord': {
      en: 'Cord', ru: 'Шнур', zh: '绳', ja: '紐', id: 'Tali',
    },
    'spotlight.cord.val': {
      en: 'Hand-braided silk', ru: 'Шёлк ручного плетения', zh: '手编丝绳',
      ja: '手編み絹紐', id: 'Sutra anyaman tangan',
    },
    'spotlight.finish': {
      en: 'Finish', ru: 'Финиш', zh: '表面处理', ja: '仕上げ', id: 'Finishing',
    },
    'spotlight.finish.val': {
      en: 'Smoked, oiled, signed', ru: 'Копчение, масло, подпись',
      zh: '烟熏、涂油、签名', ja: '燻製、油仕上げ、署名', id: 'Diasap, berminyak, bertanda tangan',
    },
    'spotlight.cta': {
      en: 'Acquire — $1,480', ru: 'Приобрести — $1 480',
      zh: '购藏 — $1,480', ja: '入手する — $1,480', id: 'Dapatkan — $1.480',
    },
    'spotlight.specs': {
      en: 'Full specifications →', ru: 'Все характеристики →',
      zh: '完整参数 →', ja: '全仕様 →', id: 'Spesifikasi lengkap →',
    },

    /* ---- Craft ---- */
    'craft.label': {
      en: '02 — The craft', ru: '02 — Ремесло', zh: '02 — 工艺',
      ja: '02 — 工芸', id: '02 — Kerajinan',
    },
    'craft.title': {
      en: 'Six months,<br><span class="italic">by two hands.</span>',
      ru: 'Шесть месяцев,<br><span class="italic">двумя руками.</span>',
      zh: '六个月，<br><span class="italic">两只手。</span>',
      ja: '六ヶ月、<br><span class="italic">二つの手で。</span>',
      id: 'Enam bulan,<br><span class="italic">oleh dua tangan.</span>',
    },
    'craft.intro': {
      en: 'Every pair is finished by a single craftsman in our Kyoto atelier. Wood is smoked for eight weeks before turning. Brass is forged, not cast. Cord is hand-braided from Japanese silk and reinforced with an aramid core — the only modern intrusion, and a necessary one.',
      ru: 'Каждая пара завершается одним мастером в нашем ателье в Киото. Дерево коптится восемь недель перед точением. Латунь куётся, а не отливается. Шнур плетётся вручную из японского шёлка с арамидным сердечником — единственная современная уступка, и необходимая.',
      zh: '每一件均由京都工坊的同一位匠人完成。木材在车削前烟熏八周。黄铜是锻造而非铸造。丝绳由日本蚕丝手工编织，内藏芳纶芯 — 唯一的现代介入，也是必要的。',
      ja: 'すべてのペアは京都のアトリエで一人の職人が仕上げる。木材は旋削前に八週間燻す。真鍮は鋳造ではなく鍛造。紐は日本の絹から手編みし、アラミド芯で補強する — 唯一の現代的介入であり、必要なものだ。',
      id: 'Setiap pasang diselesaikan oleh seorang pengrajin tunggal di atelier Kyoto kami. Kayu diasap selama delapan minggu sebelum dibubut. Kuningan ditempa, bukan dicetak. Tali dianyam tangan dari sutra Jepang dengan inti aramid — satu-satunya intrusi modern, dan yang diperlukan.',
    },
    'craft.master': {
      en: 'Master — Tarō Hashimoto, since 1998',
      ru: 'Мастер — Таро Хашимото, с 1998 года',
      zh: '匠人 — 桥本太郎，1998年至今',
      ja: '棟梁 — 橋本太郎、1998年より',
      id: 'Ahli — Tarō Hashimoto, sejak 1998',
    },
    'craft.wood': { en: 'Wood', ru: 'Дерево', zh: '木', ja: '木', id: 'Kayu' },
    'craft.wood.desc': {
      en: 'Selected from Tohoku oak and Cotswold ash. Air-dried for two seasons, smoked over white-oak chips for eight weeks, then turned by hand on a treadle lathe and finished with tung oil.',
      ru: 'Отборный дуб из Тохоку и ясень из Котсуолда. Воздушная сушка два сезона, копчение на белодубовой щепе восемь недель, ручная обточка на педальном станке и финишное покрытие тунговым маслом.',
      zh: '选用东北橡木和科茨沃尔德白蜡木。自然风干两季，以白橡木屑烟熏八周，然后在脚踏车床上手工车削，以桐油收尾。',
      ja: '東北の樫とコッツウォルドのトネリコから厳選。二季節の天然乾燥、白樫チップで八週間燻し、足踏み旋盤で手回しし、桐油で仕上げる。',
      id: 'Dipilih dari ek Tohoku dan ash Cotswold. Dikeringkan udara selama dua musim, diasap dengan serpihan ek putih selama delapan minggu, lalu dibubut tangan di mesin bubut injak dan diselesaikan dengan minyak tung.',
    },
    'craft.metal': { en: 'Metal', ru: 'Металл', zh: '金属', ja: '金属', id: 'Logam' },
    'craft.metal.desc': {
      en: 'Brass, sterling silver, or blackened steel — sand-cast in Otsu, forged by hand, finished to a soft satin patina that deepens with use. Each collar is hand-fitted to its specific stick.',
      ru: 'Латунь, стерлинговое серебро или вороная сталь — литьё в песок в Оцу, ручная ковка, сатинированная патина, которая углубляется от использования. Каждая муфта подогнана вручную к конкретной рукояти.',
      zh: '黄铜、纯银或黑化钢 — 在大津砂铸，手工锻造，打磨至柔和的缎面氧化层，随使用愈加深沉。每个领环均为对应棍身手工适配。',
      ja: '真鍮、スターリングシルバー、または黒染め鋼 — 大津で砂型鋳造、手鍛造、使い込むほど深まる柔らかなサテンパティーナに仕上げる。各カラーはそれぞれの棒に手作業で合わせる。',
      id: 'Kuningan, perak sterling, atau baja hitam — dicetak pasir di Otsu, ditempa tangan, diselesaikan dengan patina satin lembut yang makin dalam dengan penggunaan. Setiap kerah dipasang tangan ke tongkat spesifiknya.',
    },
    'craft.cord': { en: 'Cord', ru: 'Шнур', zh: '绳', ja: '紐', id: 'Tali' },
    'craft.cord.desc': {
      en: 'Japanese silk in a twelve-strand braid, with a hidden aramid core. The result is supple to the hand, silent in motion, and rated to a working load well beyond what any practitioner will ever apply.',
      ru: 'Японский шёлк в двенадцатипрядном плетении со скрытым арамидным сердечником. Результат — мягкость в руке, тишина в движении, и рабочая нагрузка, далеко превышающая потребности любого практикующего.',
      zh: '日本蚕丝十二股编织，内藏芳纶芯。成品手感柔韧，运动无声，承载力远超任何习练者的实际需求。',
      ja: '日本の絹を十二本の組紐に、隠れたアラミド芯を内蔵。手触りは柔らかく、動きは静かで、どの稽古者も及ばない荷重に耐える。',
      id: 'Sutra Jepang dalam anyaman dua belas helai, dengan inti aramid tersembunyi. Hasilnya lentur di tangan, senyap saat bergerak, dan mampu menahan beban kerja jauh melampaui yang pernah diterapkan praktisi mana pun.',
    },

    /* ---- Master ---- */
    'master.label': {
      en: '03 — The master', ru: '03 — Мастер', zh: '03 — 匠人',
      ja: '03 — 棟梁', id: '03 — Sang Ahli',
    },
    'master.name': {
      en: 'Tarō Hashimoto<br>has finished <span class="it">every pair.</span>',
      ru: 'Таро Хашимото<br>завершил <span class="it">каждую пару.</span>',
      zh: '桥本太郎<br>亲手完成了<span class="it">每一件。</span>',
      ja: '橋本太郎が<br><span class="it">すべてを仕上げた。</span>',
      id: 'Tarō Hashimoto<br>menyelesaikan <span class="it">setiap pasang.</span>',
    },
    'master.bio1': {
      en: 'Born in Nara in 1968, Tarō trained under his grandfather — a maker of traditional Japanese garden tools — before working for fourteen years in a single-room workshop in Otsu producing scabbards for Bizen sword smiths.',
      ru: 'Родился в Наре в 1968 году. Учился у деда — изготовителя традиционных японских садовых инструментов — затем четырнадцать лет проработал в однокомнатной мастерской в Оцу, делая ножны для мечников Бидзэн.',
      zh: '1968年生于奈良，师从祖父——一位传统日本园林工具匠人——之后在大津一间单室工坊中工作十四年，为备前刀匠制作刀鞘。',
      ja: '1968年奈良生まれ。祖父——伝統的な日本の庭具職人——に師事した後、大津の一室の工房で十四年間、備前の刀工のための鞘を作り続けた。',
      id: 'Lahir di Nara tahun 1968, Tarō belajar di bawah kakeknya — pembuat perkakas taman tradisional Jepang — sebelum bekerja selama empat belas tahun di bengkel satu ruangan di Otsu membuat sarung pedang untuk pandai besi Bizen.',
    },
    'master.bio2': {
      en: 'He began making nunchaku at the request of a single practitioner in 1998. Word spread quietly. He has produced fewer than four hundred pairs in his career, and signs every piece with a small cinnabar seal applied to the inner face of the longer stick.',
      ru: 'Начал делать нунчаку по просьбе одного практикующего в 1998 году. Молва разошлась тихо. За карьеру он изготовил менее четырёхсот пар и ставит на каждую маленькую киноварную печать на внутренней стороне длинной рукояти.',
      zh: '1998年应一位习练者之请开始制作双节棍。消息不胫而走。他一生所制不超过四百件，每一件都在长棍内侧加盖一枚小小的朱砂印。',
      ja: '1998年、一人の稽古者の依頼でヌンチャク作りを始めた。評判は静かに広まった。生涯で四百本に満たない制作数であり、すべてに長い棒の内側に小さな朱印を押す。',
      id: 'Ia mulai membuat nunchaku atas permintaan seorang praktisi pada 1998. Kabar menyebar dengan tenang. Ia telah memproduksi kurang dari empat ratus pasang sepanjang kariernya, dan menandatangani setiap buah dengan stempel cinnabar kecil pada sisi dalam tongkat yang lebih panjang.',
    },
    'master.quote': {
      en: '“The pair should ask nothing of you. If you have to think about its weight, I have failed.”',
      ru: '«Пара не должна ничего от вас требовать. Если вам приходится думать о её весе — я потерпел неудачу.»',
      zh: '“这件器物不应向你索取任何东西。如果你还需要去想它的重量，那就是我的失败。”',
      ja: '「その一対は何も求めてはならない。重さを意識させたら、私の負けだ。」',
      id: '“Sepasang nunchaku tidak boleh menuntut apa pun darimu. Jika kau harus memikirkan beratnya, aku telah gagal.”',
    },
    'master.seal': {
      en: 'Signature of the master · applied to every pair',
      ru: 'Печать мастера · ставится на каждую пару',
      zh: '大师印鉴 · 加盖于每一件',
      ja: '棟梁の署名 · 全作品に押印',
      id: 'Tanda tangan sang ahli · dibubuhkan pada setiap pasang',
    },

    /* ---- Journal ---- */
    'journal.title': {
      en: 'From the atelier', ru: 'Из ателье', zh: '工坊手记',
      ja: 'アトリエより', id: 'Dari atelier',
    },
    'journal.all': {
      en: 'All entries →', ru: 'Все записи →', zh: '全部文章 →',
      ja: 'すべての記事 →', id: 'Semua entri →',
    },
    'journal.cat.atelier': {
      en: 'Atelier letter', ru: 'Письмо из ателье', zh: '工坊通信',
      ja: 'アトリエだより', id: 'Surat atelier',
    },
    'journal.cat.materials': {
      en: 'Materials', ru: 'Материалы', zh: '材料', ja: '素材', id: 'Material',
    },
    'journal.cat.form': {
      en: 'On form', ru: 'О форме', zh: '关于形式', ja: '形について', id: 'Tentang bentuk',
    },
    'journal.a1.title': {
      en: 'On weight, and the body that learns it',
      ru: 'О весе и теле, которое его познаёт',
      zh: '关于重量，和学会感知它的身体',
      ja: '重さについて、そしてそれを学ぶ身体',
      id: 'Tentang berat, dan tubuh yang mempelajarinya',
    },
    'journal.a1.excerpt': {
      en: 'Why an extra fifteen grams in the wrong section will be felt for years — and how we test for it in the workshop.',
      ru: 'Почему лишние пятнадцать граммов не в той секции будут ощущаться годами — и как мы проверяем это в мастерской.',
      zh: '为什么多出的十五克如果放错位置会被感知多年——以及我们在工坊中如何测试。',
      ja: '不適切な箇所の15グラムがなぜ何年も感じられるのか — そして工房でどう検査するか。',
      id: 'Mengapa lima belas gram ekstra di ruas yang salah akan terasa bertahun-tahun — dan cara kami mengujinya di bengkel.',
    },
    'journal.a2.title': {
      en: 'Why we forge brass, instead of casting',
      ru: 'Почему мы куём латунь, а не отливаем',
      zh: '为什么我们锻造黄铜而非铸造',
      ja: 'なぜ真鍮を鋳造せず鍛造するのか',
      id: 'Mengapa kami menempa kuningan, bukan mencetak',
    },
    'journal.a2.excerpt': {
      en: 'A short defence of the longer, more difficult way — and what it gives back in the hand of the practitioner.',
      ru: 'Краткая защита более долгого и трудного пути — и что он возвращает руке практикующего.',
      zh: '为更漫长、更艰难的方式做一个简短的辩护——以及它给予习练者手中的回馈。',
      ja: 'より長く、より難しい道の小さな弁明 — そしてそれが稽古者の手に何をもたらすか。',
      id: 'Sebuah pembelaan singkat untuk cara yang lebih panjang dan lebih sulit — dan apa yang dikembalikannya ke tangan praktisi.',
    },
    'journal.a3.title': {
      en: 'The katasumi method · a brief history',
      ru: 'Метод катасуми · краткая история',
      zh: '片隅法 · 简史',
      ja: '片隅の方法 · 小史',
      id: 'Metode katasumi · sejarah singkat',
    },
    'journal.a3.excerpt': {
      en: 'Notes on a quiet lineage of Okinawan training, and the object it eventually produced.',
      ru: 'Заметки о тихой линии окинавской тренировки и предмете, который она в итоге породила.',
      zh: '关于冲绳训练的一脉安静传承，以及它最终诞生的器物的笔记。',
      ja: '沖縄の静かな稽古の系譜と、それがやがて生み出した道具についての覚書。',
      id: 'Catatan tentang silsilah tenang latihan Okinawa, dan benda yang akhirnya dihasilkannya.',
    },

    /* ---- Newsletter ---- */
    'newsletter.label': {
      en: 'The Letter — four times a year',
      ru: 'Письмо — четыре раза в год',
      zh: '来信 — 每年四期',
      ja: 'ザ・レター — 年四回',
      id: 'Surat — empat kali setahun',
    },
    'newsletter.title': {
      en: 'A quiet dispatch on craft, slowness,<br><span class="italic">and the body returning to itself.</span>',
      ru: 'Тихая весть о ремесле, медленности<br><span class="italic">и теле, возвращающемся к себе.</span>',
      zh: '一封关于工艺、缓慢<br><span class="italic">以及身体回归自身的静默讯息。</span>',
      ja: '工芸と遅さ、<br><span class="italic">そして身体が自らに還ることについての静かな便り。</span>',
      id: 'Sebuah kiriman tenang tentang kerajinan, kelambatan,<br><span class="italic">dan tubuh yang kembali pada dirinya sendiri.</span>',
    },
    'newsletter.pitch': {
      en: 'Sent four times a year by the atelier. New editions, atelier notes, occasional essays. No promotions, no marketing language.',
      ru: 'Рассылка четыре раза в год от ателье. Новые выпуски, заметки из мастерской, иногда эссе. Никаких акций, никакого маркетингового языка.',
      zh: '由工坊每年发送四次。新版本、工坊笔记、偶尔的随笔。没有促销，没有营销用语。',
      ja: 'アトリエより年四回送付。新エディション、アトリエノート、折々のエッセイ。プロモーションもマーケティング用語もなし。',
      id: 'Dikirim empat kali setahun oleh atelier. Edisi baru, catatan atelier, esai sesekali. Tanpa promosi, tanpa bahasa pemasaran.',
    },
    'newsletter.email': {
      en: 'Your address', ru: 'Ваш адрес', zh: '您的邮箱', ja: 'メールアドレス', id: 'Alamat Anda',
    },
    'newsletter.submit': {
      en: 'Subscribe &nbsp;→', ru: 'Подписаться &nbsp;→', zh: '订阅 &nbsp;→',
      ja: '登録 &nbsp;→', id: 'Berlangganan &nbsp;→',
    },
    'newsletter.note': {
      en: 'We never share your address. Unsubscribe with a single tap.',
      ru: 'Мы не передаём ваш адрес. Отписаться можно одним нажатием.',
      zh: '我们绝不分享您的地址。一键即可退订。',
      ja: 'アドレスを共有することはありません。ワンタップで解除できます。',
      id: 'Kami tidak pernah membagikan alamat Anda. Berhenti berlangganan dengan satu ketukan.',
    },

    /* ---- Footer ---- */
    'footer.desc': {
      en: 'An atelier for hand-made training nunchaku, in editions of 120. Kyoto · Manila · Berlin.',
      ru: 'Ателье тренировочных нунчаку ручной работы, тираж 120 пар. Киото · Манила · Берлин.',
      zh: '手工训练双节棍工坊，限量120件。京都 · 马尼拉 · 柏林。',
      ja: '手仕上げの稽古用ヌンチャクのアトリエ、120本限定。京都 · マニラ · ベルリン。',
      id: 'Sebuah atelier untuk nunchaku latihan buatan tangan, dalam edisi 120. Kyoto · Manila · Berlin.',
    },
    'footer.shop': { en: 'Shop', ru: 'Магазин', zh: '商店', ja: 'ショップ', id: 'Toko' },
    'footer.shop.collection': {
      en: 'The collection', ru: 'Коллекция', zh: '系列', ja: 'コレクション', id: 'Koleksi',
    },
    'footer.shop.editions': {
      en: 'Editions', ru: 'Тиражи', zh: '版本', ja: 'エディション', id: 'Edisi',
    },
    'footer.shop.cases': {
      en: 'Leather cases', ru: 'Кожаные чехлы', zh: '皮革收纳盒', ja: 'レザーケース', id: 'Kotak kulit',
    },
    'footer.shop.stockists': {
      en: 'Stockists', ru: 'Точки продаж', zh: '经销商', ja: '取扱店', id: 'Penyalur',
    },
    'footer.atelier': {
      en: 'Atelier', ru: 'Ателье', zh: '工坊', ja: 'アトリエ', id: 'Atelier',
    },
    'footer.atelier.craft': {
      en: 'Our craft', ru: 'Наше ремесло', zh: '我们的工艺', ja: '私たちの工芸', id: 'Kerajinan kami',
    },
    'footer.atelier.master': {
      en: 'The master', ru: 'Мастер', zh: '匠人', ja: '棟梁', id: 'Sang Ahli',
    },
    'footer.atelier.journal': {
      en: 'Journal', ru: 'Журнал', zh: '手记', ja: 'ジャーナル', id: 'Jurnal',
    },
    'footer.atelier.letter': {
      en: 'The Letter', ru: 'Письмо', zh: '来信', ja: 'ザ・レター', id: 'Surat',
    },
    'footer.service': {
      en: 'Service', ru: 'Сервис', zh: '服务', ja: 'サービス', id: 'Layanan',
    },
    'footer.service.care': {
      en: 'Care & repair', ru: 'Уход и ремонт', zh: '保养与修复', ja: 'ケア＆リペア', id: 'Perawatan & perbaikan',
    },
    'footer.service.shipping': {
      en: 'Shipping', ru: 'Доставка', zh: '配送', ja: '配送', id: 'Pengiriman',
    },
    'footer.service.returns': {
      en: 'Returns', ru: 'Возвраты', zh: '退换', ja: '返品', id: 'Pengembalian',
    },
    'footer.service.contact': {
      en: 'Contact', ru: 'Контакты', zh: '联系', ja: 'お問い合わせ', id: 'Kontak',
    },
    'footer.follow': {
      en: 'Follow', ru: 'Следите', zh: '关注', ja: 'フォロー', id: 'Ikuti',
    },
    'footer.copy': {
      en: '© NISETSU 2026 · Made by hand in Kyoto',
      ru: '© NISETSU 2026 · Сделано вручную в Киото',
      zh: '© NISETSU 2026 · 京都手工制作',
      ja: '© NISETSU 2026 · 京都にて手仕上げ',
      id: '© NISETSU 2026 · Dibuat dengan tangan di Kyoto',
    },
    'footer.privacy': {
      en: 'Privacy', ru: 'Конфиденциальность', zh: '隐私', ja: 'プライバシー', id: 'Privasi',
    },
    'footer.terms': {
      en: 'Terms', ru: 'Условия', zh: '条款', ja: '利用規約', id: 'Ketentuan',
    },
    'footer.imprint': {
      en: 'Imprint', ru: 'Импрессум', zh: '版权信息', ja: 'インプリント', id: 'Imprint',
    },

    /* ================================================================
       SPECIFICATIONS PAGE
       ================================================================ */

    'specs.label': {
      en: '04 — Technical specifications', ru: '04 — Технические характеристики',
      zh: '04 — 技术参数', ja: '04 — 技術仕様', id: '04 — Spesifikasi teknis',
    },
    'specs.title': {
      en: 'The geometry<br><span class="italic">of balance.</span>',
      ru: 'Геометрия<br><span class="italic">баланса.</span>',
      zh: '平衡的<br><span class="italic">几何学。</span>',
      ja: 'バランスの<br><span class="italic">幾何学。</span>',
      id: 'Geometri<br><span class="italic">keseimbangan.</span>',
    },
    'specs.subtitle': {
      en: 'Every dimension in a NISETSU pair is the result of twenty-six years of iterative refinement. The numbers below are not arbitrary — they are the convergence point where the object disappears from consciousness and only the practice remains.',
      ru: 'Каждый размер в паре NISETSU — результат двадцати шести лет итеративного совершенствования. Числа ниже не произвольны — это точка схождения, где предмет исчезает из сознания и остаётся только практика.',
      zh: 'NISETSU 每一对的每个尺寸，都是二十六年迭代精炼的结果。以下数字并非随意——它们是收敛点，在此器物从意识中消失，只剩下修炼本身。',
      ja: 'NISETSUの一対のすべての寸法は、二十六年間の反復的洗練の結果である。以下の数値は恣意的ではない——道具が意識から消え、稽古だけが残る収束点である。',
      id: 'Setiap dimensi pada sepasang NISETSU adalah hasil dua puluh enam tahun penyempurnaan berulang. Angka-angka di bawah ini bukan sembarang — ini adalah titik konvergensi di mana benda menghilang dari kesadaran dan hanya latihan yang tersisa.',
    },
    'specs.dimensions': {
      en: 'Dimensions', ru: 'Размеры', zh: '尺寸', ja: '寸法', id: 'Dimensi',
    },

    'specs.handle.label': {
      en: 'Handle length', ru: 'Длина рукояти', zh: '柄长', ja: '柄の長さ', id: 'Panjang gagang',
    },
    'specs.handle.note': {
      en: 'Each section (kon). Measured tip-to-tip excluding hardware. The 30 cm standard derives from the Okinawan forearm-plus-fist rule (shinogi): the handle should equal the distance from elbow to closed fist. This covers the 5th-to-95th percentile of adult practitioners.',
      ru: 'Каждая секция (кон). Измерение от конца до конца без фурнитуры. Стандарт 30 см основан на окинавском правиле «предплечье плюс кулак» (синоги): рукоять должна равняться расстоянию от локтя до сжатого кулака. Это покрывает 5-й — 95-й перцентиль взрослых практикующих.',
      zh: '每节（棍）。端到端测量，不含金属件。30厘米标准源自冲绳的「前臂加拳」法则（鎬）：手柄应等于肘部到握拳的距离，覆盖成年习练者第5至第95百分位。',
      ja: '各節（棍）。金具を除く端から端。30 cmの基準は沖縄の「前腕プラス拳」の法則（鎬）に由来する：柄は肘から握り拳までの距離に等しくすべきである。成人稽古者の5〜95パーセンタイルをカバーする。',
      id: 'Setiap ruas (kon). Diukur ujung ke ujung tanpa perangkat keras. Standar 30 cm berasal dari aturan Okinawa "lengan bawah plus tinju" (shinogi): gagang harus sama dengan jarak dari siku ke tinju tertutup. Ini mencakup persentil ke-5 hingga ke-95 praktisi dewasa.',
    },
    'specs.diameter.label': {
      en: 'Handle diameter', ru: 'Диаметр рукояти', zh: '柄径', ja: '柄の直径', id: 'Diameter gagang',
    },
    'specs.diameter.note': {
      en: 'Mid-grip measurement. Gentle 1.8 mm taper from chain-end (3.0 cm) to butt-end (2.82 cm). Octagonal cross-section (happo-gata) for rotational grip reference without the fatigue of a sharp-edged square profile.',
      ru: 'Измерение по центру хвата. Плавное сужение 1,8 мм от конца шнура (3,0 см) к торцу (2,82 см). Восьмигранное сечение (хаппо-гата) для ориентации при вращении без усталости от острых граней квадратного профиля.',
      zh: '握持中部测量。从绳端（3.0厘米）到末端（2.82厘米）轻缓收细1.8毫米。八角形截面（八方形）提供旋转握持参考，避免方形棱角带来的疲劳。',
      ja: 'グリップ中央部の計測。紐端（3.0 cm）から末端（2.82 cm）へ1.8 mmの緩やかなテーパー。八角形断面（八方形）は、角張った四角形の疲労なしに回転グリップの基準面を提供する。',
      id: 'Pengukuran tengah pegangan. Taper halus 1,8 mm dari ujung tali (3,0 cm) ke ujung dasar (2,82 cm). Penampang segi delapan (happo-gata) untuk referensi pegangan rotasi tanpa kelelahan profil persegi bersudut tajam.',
    },
    'specs.cord.label': {
      en: 'Cord length', ru: 'Длина шнура', zh: '绳长', ja: '紐の長さ', id: 'Panjang tali',
    },
    'specs.cord.note': {
      en: 'Free cord between attachment points. The traditional "one-fist" rule (hito-kobushi) sets the cord at the width of the closed hand, typically 10-12 cm. NISETSU extends to 18 cm for the flowing "figure-eight" practice style (kaiten), which demands a longer arc radius for clean passes behind the back and under the arm.',
      ru: 'Свободный шнур между точками крепления. Традиционное правило «один кулак» (хито-кобуси) устанавливает шнур по ширине сжатой ладони, обычно 10-12 см. NISETSU увеличивает до 18 см для плавного стиля практики «восьмёрка» (кайтэн), требующего большего радиуса дуги для чистых проводок за спиной и под рукой.',
      zh: '两个连接点之间的自由绳长。传统的「一拳」法则（一拳）将绳长设为握拳宽度，通常10-12厘米。NISETSU延长至18厘米，以适应流畅的「8字」练习风格（回转），需要更大的弧线半径才能干净地在背后和手臂下方通过。',
      ja: '取り付け点間の遊び紐。伝統的な「一拳」の法則（ひと拳）は紐を握り拳の幅、通常10〜12 cmに設定する。NISETSUは流れるような「八の字」稽古（回転）のために18 cmに延長。背面と腕下の滑らかなパスに必要な長い弧半径を確保する。',
      id: 'Tali bebas antara titik pemasangan. Aturan tradisional "satu tinju" (hito-kobushi) menetapkan tali selebar kepalan tertutup, biasanya 10-12 cm. NISETSU memperpanjang hingga 18 cm untuk gaya latihan "angka delapan" (kaiten) yang mengalir, membutuhkan radius lengkungan lebih panjang untuk lintasan bersih di belakang punggung dan di bawah lengan.',
    },
    'specs.total.label': {
      en: 'Total extended length', ru: 'Полная длина в развёрнутом виде',
      zh: '总伸展长度', ja: '全伸長', id: 'Panjang total terentang',
    },
    'specs.total.note': {
      en: 'Full reach when held at one end and fully extended. 30 cm handle + 18 cm cord + 30 cm handle = 78 cm. Ratio of handle:cord:handle is 5:3:5 — the golden proportion for a pendulum-stable system that returns predictably to center.',
      ru: 'Полный охват при удержании за один конец. 30 см рукоять + 18 см шнур + 30 см рукоять = 78 см. Соотношение рукоять:шнур:рукоять — 5:3:5 — золотая пропорция для маятниково-стабильной системы с предсказуемым возвратом к центру.',
      zh: '握住一端完全展开时的总长度。30厘米柄 + 18厘米绳 + 30厘米柄 = 78厘米。柄:绳:柄比例为5:3:5——钟摆稳定系统可预测回归中心的黄金比例。',
      ja: '一端を持って完全に伸ばした全長。30 cm柄 + 18 cm紐 + 30 cm柄 = 78 cm。柄:紐:柄の比率は5:3:5 — 振り子安定系として予測可能に中心に戻る黄金比率。',
      id: 'Jangkauan penuh saat dipegang di satu ujung dan terentang penuh. Gagang 30 cm + tali 18 cm + gagang 30 cm = 78 cm. Rasio gagang:tali:gagang adalah 5:3:5 — proporsi emas untuk sistem pendulum stabil yang kembali ke pusat secara prediktif.',
    },
    'specs.weight.label': {
      en: 'Total weight', ru: 'Общий вес', zh: '总重量', ja: '総重量', id: 'Berat total',
    },
    'specs.weight.note': {
      en: 'Complete pair including cord and hardware. The optimal training weight sits between 280 g (too light — wrist compensates, encourages sloppy arcs) and 420 g (too heavy — shoulder fatigues, shortens practice sessions). 340 g is the point where centripetal force during a full-speed pass matches comfortable wrist pronation torque.',
      ru: 'Полная пара включая шнур и фурнитуру. Оптимальный тренировочный вес — между 280 г (слишком лёгкие — запястье компенсирует, дуги становятся неряшливыми) и 420 г (слишком тяжёлые — устаёт плечо, укорачиваются сессии). 340 г — точка, где центростремительная сила при полной скорости совпадает с комфортным крутящим моментом пронации запястья.',
      zh: '包含绳和金属件的完整一对。最佳训练重量在280克（过轻——手腕代偿，弧线松散）和420克（过重——肩部疲劳，缩短练习时间）之间。340克是全速通过时离心力与手腕舒适旋前力矩匹配的临界点。',
      ja: '紐と金具を含む完全なペア。最適な稽古重量は280 g（軽すぎる — 手首が補償し、弧が雑になる）と420 g（重すぎる — 肩が疲労し、稽古時間が短くなる）の間にある。340 gは全速パス時の向心力が快適な手首の回内トルクと一致するポイントである。',
      id: 'Sepasang lengkap termasuk tali dan perangkat keras. Berat latihan optimal ada di antara 280 g (terlalu ringan — pergelangan tangan mengkompensasi, mendorong lengkungan ceroboh) dan 420 g (terlalu berat — bahu lelah, mempersingkat sesi latihan). 340 g adalah titik di mana gaya sentripetal saat lintasan kecepatan penuh cocok dengan torsi pronasi pergelangan tangan yang nyaman.',
    },
    'specs.balance.label': {
      en: 'Balance point', ru: 'Точка баланса', zh: '平衡点', ja: '重心位置', id: 'Titik keseimbangan',
    },
    'specs.balance.note': {
      en: 'Center of gravity at 40% from the cord end of each handle (12 cm from top). This shifts mass toward the striking tip, increasing rotational inertia for smoother sustained rotation while keeping the grip zone light enough for rapid directional changes.',
      ru: 'Центр тяжести на 40% от конца шнура каждой рукояти (12 см от верха). Это смещает массу к ударному концу, увеличивая инерцию вращения для плавного устойчивого вращения, сохраняя зону хвата достаточно лёгкой для быстрой смены направления.',
      zh: '重心位于每个手柄绳端起40%处（距顶部12厘米）。这将质量移向击打端，增加转动惯量以实现更平稳的持续旋转，同时保持握持区足够轻便以快速变向。',
      ja: '各柄の紐端から40%の位置（上から12 cm）に重心。これにより質量が打撃端に移り、スムーズな持続回転のための回転慣性が増す一方、グリップゾーンは素早い方向転換に十分軽い。',
      id: 'Pusat gravitasi pada 40% dari ujung tali setiap gagang (12 cm dari atas). Ini menggeser massa ke arah ujung pukul, meningkatkan inersia rotasi untuk rotasi berkelanjutan yang lebih halus sambil menjaga zona pegangan cukup ringan untuk perubahan arah cepat.',
    },

    /* Blueprint captions */
    'specs.bp1.label': {
      en: 'Technical drawing · Exploded view', ru: 'Чертёж · Покомпонентный вид',
      zh: '技术图纸 · 分解视图', ja: '技術図面 · 分解図', id: 'Gambar teknis · Tampilan terurai',
    },
    'specs.bp1.sub': {
      en: 'Exploded diagram showing handle cross-section, collar assembly,<br>cord routing through the swivel, and taper profile.<br>— Placeholder for commissioned technical illustration —',
      ru: 'Покомпонентная схема: сечение рукояти, сборка муфты,<br>прокладка шнура через вертлюг и профиль конусности.<br>— Место для заказной технической иллюстрации —',
      zh: '分解图展示手柄截面、领环组件、<br>绳索穿过转环的路线和锥度轮廓。<br>— 此处为委托技术插图预留位 —',
      ja: '柄断面、カラー組立、スイベルを通る紐の経路、<br>テーパープロファイルを示す分解図。<br>— 委託技術図面のプレースホルダー —',
      id: 'Diagram terurai menunjukkan penampang gagang, rakitan kerah,<br>jalur tali melalui swivel, dan profil taper.<br>— Placeholder untuk ilustrasi teknis yang ditugaskan —',
    },
    'specs.bp1.caption': {
      en: 'Fig. 03 · Exploded assembly view. Each collar is friction-fitted (no adhesive) and secured with a single brass pin. The cord passes through a countersunk channel in the handle tip and terminates in a figure-eight stopper knot below the swivel.',
      ru: 'Рис. 03 · Покомпонентный вид сборки. Каждая муфта установлена на трении (без клея) и закреплена одним латунным штифтом. Шнур проходит через потайной канал в наконечнике рукояти и завершается стопорным узлом «восьмёрка» под вертлюгом.',
      zh: '图03 · 分解装配视图。每个领环以摩擦配合安装（无粘合剂），用一根黄铜销固定。绳索通过手柄顶端的埋头通道，在转环下方以八字结收尾。',
      ja: '図03 · 分解組立図。各カラーは摩擦嵌合（接着剤不使用）で、真鍮ピン1本で固定。紐は柄先端の座ぐり穴を通り、スイベル下のエイトノットで終端する。',
      id: 'Gbr. 03 · Tampilan rakitan terurai. Setiap kerah dipasang gesekan (tanpa lem) dan diamankan dengan satu pin kuningan. Tali melewati saluran countersunk di ujung gagang dan berakhir di simpul penghenti angka delapan di bawah swivel.',
    },
    'specs.bp2.label': {
      en: 'Technical drawing · Handle cross-section', ru: 'Чертёж · Сечение рукояти',
      zh: '技术图纸 · 手柄截面', ja: '技術図面 · 柄断面', id: 'Gambar teknis · Penampang gagang',
    },
    'specs.bp2.sub': {
      en: 'Octagonal (happo-gata) profile with chamfered edges,<br>showing grain direction, collar seat, and cord channel.<br>— Placeholder for commissioned technical illustration —',
      ru: 'Восьмигранный (хаппо-гата) профиль со скошенными рёбрами,<br>направление волокон, посадочное место муфты, канал шнура.<br>— Место для заказной технической иллюстрации —',
      zh: '八角形（八方形）轮廓，带倒角边缘，<br>展示纹理方向、领环座和绳索通道。<br>— 此处为委托技术插图预留位 —',
      ja: '面取り加工された八角形（八方形）プロファイル、<br>木目方向、カラー座面、紐チャンネルを表示。<br>— 委託技術図面のプレースホルダー —',
      id: 'Profil segi delapan (happo-gata) dengan tepi chamfer,<br>menunjukkan arah serat, dudukan kerah, dan saluran tali.<br>— Placeholder untuk ilustrasi teknis yang ditugaskan —',
    },
    'specs.bp2.caption': {
      en: 'Fig. 04 · Handle cross-section at mid-grip (15 cm from cord end). The octagonal profile provides eight tactile reference planes for rotational awareness without the discomfort of sharp edges during sustained spinning.',
      ru: 'Рис. 04 · Сечение рукояти в середине хвата (15 см от конца шнура). Восьмигранный профиль создаёт восемь тактильных плоскостей для ориентации при вращении без дискомфорта от острых граней при длительном вращении.',
      zh: '图04 · 握持中部（距绳端15厘米）手柄截面。八角形轮廓提供八个触觉参考平面，在持续旋转中提供旋转感知而不会因尖锐边缘造成不适。',
      ja: '図04 · グリップ中央部（紐端から15 cm）の柄断面。八角形は、持続的な回転時の不快感なしに回転方向を認識するための8つの触覚基準面を提供する。',
      id: 'Gbr. 04 · Penampang gagang di tengah pegangan (15 cm dari ujung tali). Profil segi delapan menyediakan delapan bidang referensi taktil untuk kesadaran rotasi tanpa ketidaknyamanan tepi tajam selama pemintalan berkelanjutan.',
    },
    'specs.bp3.label': {
      en: 'Technical drawing · Weight distribution map', ru: 'Чертёж · Карта распределения веса',
      zh: '技术图纸 · 重量分布图', ja: '技術図面 · 重量分布図', id: 'Gambar teknis · Peta distribusi berat',
    },
    'specs.bp3.sub': {
      en: 'Side-by-side comparison of weight distribution across all three models.<br>Showing center of gravity, moment of inertia axis, and pendulum swing radius.<br>— Placeholder for commissioned technical illustration —',
      ru: 'Сравнение распределения веса трёх моделей.<br>Центр тяжести, ось момента инерции, радиус маятникового колебания.<br>— Место для заказной технической иллюстрации —',
      zh: '三款模型重量分布的并排比较。<br>展示重心、转动惯量轴和摆动半径。<br>— 此处为委托技术插图预留位 —',
      ja: '全3モデルの重量分布の並列比較。<br>重心、慣性モーメント軸、振り子スイング半径を表示。<br>— 委託技術図面のプレースホルダー —',
      id: 'Perbandingan berdampingan distribusi berat di ketiga model.<br>Menunjukkan pusat gravitasi, sumbu momen inersia, dan radius ayunan pendulum.<br>— Placeholder untuk ilustrasi teknis yang ditugaskan —',
    },
    'specs.bp3.caption': {
      en: 'Fig. 05 · The Shu model, with its denser bloodwood handles and steel hardware, has a 10% higher moment of inertia than the Kuro. This produces a noticeably slower, more deliberate rotational arc — preferred by practitioners who train in Okinawan classical forms (kobudo). The lighter Shiro is tuned for the faster, more fluid Southeast Asian styles.',
      ru: 'Рис. 05 · Модель Сю с более плотными рукоятями из кровавого дерева и стальной фурнитурой имеет на 10% больший момент инерции, чем Куро. Это даёт заметно более медленную, осознанную дугу вращения — предпочтительна для практикующих окинавские классические формы (кобудо). Более лёгкая Широ настроена на быстрые, текучие стили Юго-Восточной Азии.',
      zh: '图05 · 朱模型使用更致密的血木手柄和钢制配件，转动惯量比黑高10%。这产生明显更慢、更从容的旋转弧线——受冲绳古典形式（古武道）练习者青睐。较轻的白则调校为更快速流畅的东南亚风格。',
      ja: '図05 · 朱モデルは密度の高いブラッドウッド柄と鋼金具により、黒より10%高い慣性モーメントを持つ。これはより遅く、より意図的な回転弧を生む — 沖縄古武道の稽古者に好まれる。軽い白は、より速く流れるような東南アジアのスタイル向けに調整されている。',
      id: 'Gbr. 05 · Model Shu, dengan gagang bloodwood yang lebih padat dan perangkat keras baja, memiliki momen inersia 10% lebih tinggi dari Kuro. Ini menghasilkan lengkungan rotasi yang jelas lebih lambat dan lebih sengaja — disukai praktisi yang berlatih bentuk klasik Okinawa (kobudo). Shiro yang lebih ringan disetel untuk gaya Asia Tenggara yang lebih cepat dan mengalir.',
    },
    'specs.bp4.label': {
      en: 'Technical drawing · Cord and collar assembly', ru: 'Чертёж · Сборка шнура и муфты',
      zh: '技术图纸 · 绳索与领环组件', ja: '技術図面 · 紐とカラーの組立', id: 'Gambar teknis · Rakitan tali dan kerah',
    },
    'specs.bp4.sub': {
      en: 'Detail of the cord routing through the collar: bore, bearing surface,<br>stopper knot, pin location, and friction-fit tolerance.<br>— Placeholder for commissioned technical illustration —',
      ru: 'Детали прокладки шнура через муфту: отверстие, опорная поверхность,<br>стопорный узел, расположение штифта, допуск посадки на трение.<br>— Место для заказной технической иллюстрации —',
      zh: '绳索穿过领环的细节：孔径、轴承面、<br>止结、销钉位置和摩擦配合公差。<br>— 此处为委托技术插图预留位 —',
      ja: '紐がカラーを通る詳細：ボア、ベアリング面、<br>ストッパーノット、ピン位置、圧入公差。<br>— 委託技術図面のプレースホルダー —',
      id: 'Detail jalur tali melalui kerah: lubang bor, permukaan bearing,<br>simpul penghenti, lokasi pin, dan toleransi pasangan gesekan.<br>— Placeholder untuk ilustrasi teknis yang ditugaskan —',
    },
    'specs.bp4.caption': {
      en: 'Fig. 06 · Collar-to-cord detail. The 0.02 mm interference fit means each collar must be individually turned and tested against its specific handle. Production collars are not interchangeable between pairs.',
      ru: 'Рис. 06 · Деталь соединения муфты и шнура. Натяг 0,02 мм означает, что каждая муфта индивидуально обтачивается и тестируется с конкретной рукоятью. Производственные муфты не взаимозаменяемы между парами.',
      zh: '图06 · 领环与绳索细节。0.02毫米的过盈配合意味着每个领环必须单独车削并针对其特定手柄测试。生产领环不可在不同对之间互换。',
      ja: '図06 · カラーと紐の詳細。0.02 mmの圧入嵌合は、各カラーが個別に旋削され、特定の柄に対してテストされることを意味する。カラーはペア間で互換性がない。',
      id: 'Gbr. 06 · Detail kerah-ke-tali. Pasangan interferensi 0,02 mm berarti setiap kerah harus dibubut secara individual dan diuji terhadap gagang spesifiknya. Kerah produksi tidak dapat dipertukarkan antar pasang.',
    },

    /* Research narrative */
    'specs.research.handle.title': {
      en: 'The handle:<br><span class="italic">why 30 cm, not 28.</span>',
      ru: 'Рукоять:<br><span class="italic">почему 30 см, а не 28.</span>',
      zh: '手柄：<br><span class="italic">为什么是30厘米而非28。</span>',
      ja: '柄：<br><span class="italic">なぜ28ではなく30 cmか。</span>',
      id: 'Gagang:<br><span class="italic">mengapa 30 cm, bukan 28.</span>',
    },
    'specs.research.handle.p1': {
      en: 'Most mass-produced nunchaku use a 28 cm handle — a dimension inherited from post-war Okinawan competition equipment, optimized for speed in point-scoring kata. But speed without control is noise. The additional 2 cm shifts the moment of inertia by approximately 9%, which translates to a slower, more predictable rotational arc.',
      ru: 'Большинство серийных нунчаку используют рукоять 28 см — размер, унаследованный от послевоенного окинавского соревновательного инвентаря, оптимизированного для скорости в ката на очки. Но скорость без контроля — шум. Дополнительные 2 см смещают момент инерции примерно на 9%, что даёт более медленную, предсказуемую дугу вращения.',
      zh: '大多数量产双节棍使用28厘米手柄——这一尺寸继承自战后冲绳竞赛器材，为计分型的速度而优化。但没有控制的速度只是噪音。额外的2厘米将转动惯量偏移约9%，转化为更慢、更可预测的旋转弧线。',
      ja: '大量生産のヌンチャクの多くは28 cmの柄を使う — 戦後の沖縄の競技用具から受け継いだ寸法で、得点型における速度に最適化されている。しかし制御のない速度はノイズだ。追加の2 cmは慣性モーメントを約9%シフトし、より遅く、より予測可能な回転弧に変わる。',
      id: 'Sebagian besar nunchaku produksi massal menggunakan gagang 28 cm — dimensi yang diwarisi dari peralatan kompetisi Okinawa pasca-perang, dioptimalkan untuk kecepatan dalam kata penilaian poin. Tapi kecepatan tanpa kontrol adalah kebisingan. Tambahan 2 cm menggeser momen inersia sekitar 9%, yang menghasilkan lengkungan rotasi yang lebih lambat dan lebih prediktif.',
    },
    'specs.research.handle.p2': {
      en: 'For the practitioner who trains daily, this difference compounds. The wrist learns a wider arc. Transitions between passes become smoother. The body stops fighting the object and begins to follow it.',
      ru: 'Для практикующего, тренирующегося ежедневно, эта разница накапливается. Запястье осваивает более широкую дугу. Переходы между проводками становятся плавнее. Тело перестаёт бороться с предметом и начинает следовать за ним.',
      zh: '对于每日练习的习练者，这一差异会累积。手腕学会更宽的弧线。各次通过之间的过渡变得更平滑。身体不再与器物对抗，开始跟随它。',
      ja: '毎日稽古する者にとって、この差は複利的に効く。手首はより広い弧を学ぶ。パス間の切り替えが滑らかになる。身体は道具と戦うのをやめ、追従し始める。',
      id: 'Bagi praktisi yang berlatih setiap hari, perbedaan ini menumpuk. Pergelangan tangan mempelajari lengkungan yang lebih luas. Transisi antar lintasan menjadi lebih halus. Tubuh berhenti melawan benda itu dan mulai mengikutinya.',
    },
    'specs.research.handle.quote': {
      en: '"Two centimeters is nothing in the hand. It is everything in the arc." — Tarō Hashimoto',
      ru: '«Два сантиметра — ничто в руке. Но всё — в дуге.» — Таро Хашимото',
      zh: '"两厘米在手中微不足道。在弧线中却意味着一切。"——桥本太郎',
      ja: '「二センチは手の中では何でもない。弧の中ではすべてだ。」——橋本太郎',
      id: '"Dua sentimeter bukan apa-apa di tangan. Itu segalanya dalam lengkungan." — Tarō Hashimoto',
    },
    'specs.research.cord.title': {
      en: 'The cord:<br><span class="italic">silk over chain.</span>',
      ru: 'Шнур:<br><span class="italic">шёлк вместо цепи.</span>',
      zh: '绳索：<br><span class="italic">丝而非链。</span>',
      ja: '紐：<br><span class="italic">鎖より絹。</span>',
      id: 'Tali:<br><span class="italic">sutra di atas rantai.</span>',
    },
    'specs.research.cord.p1': {
      en: 'Chain (kusari) nunchaku are louder, faster, and unforgiving. Cord (himo) nunchaku absorb energy at the moment of impact and create a natural deceleration curve. For training — for the daily return to the object — cord is the correct choice. It protects the practitioner and rewards precision over force.',
      ru: 'Цепные (кусари) нунчаку громче, быстрее и безжалостнее. Шнуровые (химо) нунчаку поглощают энергию в момент удара и создают естественную кривую замедления. Для тренировок — для ежедневного возвращения к предмету — шнур верный выбор. Он защищает практикующего и вознаграждает точность, а не силу.',
      zh: '链式（锁）双节棍更响、更快、也更无情。绳式（紐）双节棍在撞击瞬间吸收能量，创造自然的减速曲线。对于训练——对于每日与器物的重逢——绳是正确的选择。它保护习练者，奖励精准而非蛮力。',
      ja: '鎖（くさり）ヌンチャクはより大きな音を立て、より速く、容赦がない。紐（ひも）ヌンチャクは衝撃の瞬間にエネルギーを吸収し、自然な減速曲線を生む。稽古のために — 毎日道具に戻るために — 紐が正しい選択だ。稽古者を守り、力ではなく精度を報いる。',
      id: 'Nunchaku rantai (kusari) lebih keras, lebih cepat, dan tak kenal ampun. Nunchaku tali (himo) menyerap energi pada saat benturan dan menciptakan kurva deselerasi alami. Untuk latihan — untuk kembali setiap hari pada benda itu — tali adalah pilihan yang tepat. Melindungi praktisi dan menghargai presisi di atas kekuatan.',
    },
    'specs.research.cord.p2': {
      en: 'NISETSU uses a twelve-strand round braid of Japanese bombyx mori silk. The natural protein fiber has an elongation at break of 18-20%, meaning it absorbs shock gradually rather than transmitting it directly to the wrist. A hidden aramid (Kevlar) core adds 2,800 N of tensile strength — roughly 285 kg of pulling force — while contributing only 4 g to the total cord weight.',
      ru: 'NISETSU использует двенадцатипрядный круглый плёт из японского шёлка бомбикс мори. Натуральное протеиновое волокно имеет удлинение при разрыве 18-20%, то есть поглощает удар постепенно, а не передаёт его запястью. Скрытый арамидный (кевларовый) сердечник добавляет 2800 Н прочности на разрыв — примерно 285 кг тягового усилия — при этом добавляя лишь 4 г к общему весу шнура.',
      zh: 'NISETSU使用日本桑蚕丝的十二股圆编。这种天然蛋白质纤维的断裂伸长率为18-20%，意味着它逐步吸收冲击而非直接传导至手腕。隐藏的芳纶（凯夫拉）芯增加2800牛顿的抗拉强度——约285公斤的拉力——而仅增加4克的绳索总重。',
      ja: 'NISETSUは日本の蚕繭絹の十二本丸組紐を使用。天然タンパク質繊維は破断伸び率18〜20%で、衝撃を手首に直接伝えるのではなく段階的に吸収する。隠れたアラミド（ケブラー）芯は2,800 Nの引張強度——約285 kgの引張力——を加えながら、紐全体の重量にはわずか4 gしか寄与しない。',
      id: 'NISETSU menggunakan anyaman bulat dua belas helai dari sutra bombyx mori Jepang. Serat protein alami ini memiliki perpanjangan saat putus 18-20%, artinya menyerap guncangan secara bertahap alih-alih mentransmisikannya langsung ke pergelangan tangan. Inti aramid (Kevlar) tersembunyi menambahkan 2.800 N kekuatan tarik — sekitar 285 kg gaya tarik — sambil hanya menyumbang 4 g pada berat tali total.',
    },
    'specs.research.cord.quote': {
      en: 'Silk elongation: 18-20% at break. Chain elongation: 0%. The difference is felt in the wrist after one hour.',
      ru: 'Удлинение шёлка: 18-20% при разрыве. Удлинение цепи: 0%. Разница ощущается в запястье через час.',
      zh: '丝的伸长率：断裂时18-20%。链的伸长率：0%。一小时后，手腕便能感受到差异。',
      ja: '絹の伸び率：破断時18〜20%。鎖の伸び率：0%。一時間後、手首がその違いを感じる。',
      id: 'Perpanjangan sutra: 18-20% saat putus. Perpanjangan rantai: 0%. Perbedaannya terasa di pergelangan tangan setelah satu jam.',
    },

    /* Cord engineering */
    'specs.cord.eng.title': {
      en: 'Cord engineering:<br><span class="italic">the invisible core.</span>',
      ru: 'Инженерия шнура:<br><span class="italic">невидимый сердечник.</span>',
      zh: '绳索工程：<br><span class="italic">看不见的芯。</span>',
      ja: '紐の工学：<br><span class="italic">見えない芯。</span>',
      id: 'Rekayasa tali:<br><span class="italic">inti yang tak terlihat.</span>',
    },
    'specs.cord.eng.p1': {
      en: 'The visible outer braid is 100% bombyx mori silk, sourced from a single cooperative in Gunma prefecture. Twelve strands are braided in a round kumihimo pattern on a traditional marudai stand — the same technique used for samurai sword wrapping (tsuka-ito) since the Kamakura period.',
      ru: 'Внешняя видимая оплётка — 100% шёлк бомбикс мори из единственного кооператива в префектуре Гумма. Двенадцать прядей сплетены в круглый узор кумихимо на традиционном станке марудай — та же техника, что для обмотки самурайских мечей (цука-ито) со времён Камакура.',
      zh: '可见的外层编织为100%桑蚕丝，来自群马县的单一合作社。十二股以圆形组�的方式在传统丸台上编织——与�的时代用于武士刀柄缠绕（柄糸）的技法相同。',
      ja: '外側の組紐は100%蚕繭絹で、群馬県の単一の協同組合から調達。十二本の糸を伝統的な丸台で丸組みする — 鎌倉時代以来、太刀の柄糸に使われてきたのと同じ技法。',
      id: 'Anyaman luar yang terlihat adalah 100% sutra bombyx mori, bersumber dari satu koperasi di prefektur Gunma. Dua belas helai dianyam dalam pola kumihimo bulat di atas dudukan marudai tradisional — teknik yang sama digunakan untuk pembungkusan pedang samurai (tsuka-ito) sejak periode Kamakura.',
    },
    'specs.cord.eng.p2': {
      en: 'Inside the silk braid sits a single 1.5 mm aramid (Kevlar 49) core. This is the only concession to modernity in the entire object. It adds a tensile strength of 2,800 N (285 kg pulling force) while contributing only 4 grams. The aramid is invisible and unfelt — it exists solely as a safety margin.',
      ru: 'Внутри шёлковой оплётки — одиночный арамидный (Кевлар 49) сердечник диаметром 1,5 мм. Это единственная уступка современности во всём изделии. Он добавляет 2800 Н прочности на разрыв (285 кг тягового усилия), увеличивая вес лишь на 4 грамма. Арамид невидим и неощутим — он существует исключительно как запас прочности.',
      zh: '丝编内置一根1.5毫米芳纶（凯夫拉49）芯。这是整件器物中对现代性的唯一妥协。它增加2800牛顿的抗拉强度（285公斤拉力），却仅增重4克。芳纶不可见也不可触——它仅作为安全余量存在。',
      ja: '絹の組紐の内側に、1.5 mmのアラミド（ケブラー49）芯が一本。これは全体の中で唯一の現代への譲歩である。2,800 N（285 kgの引張力）の引張強度を加えながら、わずか4グラムしか寄与しない。アラミドは目に見えず、感じられない — 純粋に安全マージンとしてのみ存在する。',
      id: 'Di dalam anyaman sutra terdapat satu inti aramid (Kevlar 49) 1,5 mm. Ini adalah satu-satunya konsesi terhadap modernitas di seluruh benda. Menambahkan kekuatan tarik 2.800 N (285 kg gaya tarik) sambil hanya menyumbang 4 gram. Aramid tidak terlihat dan tidak terasa — ia ada semata-mata sebagai margin keamanan.',
    },
    'specs.cord.attach.title': {
      en: 'Attachment system:<br><span class="italic">friction, not adhesive.</span>',
      ru: 'Система крепления:<br><span class="italic">трение, а не клей.</span>',
      zh: '连接系统：<br><span class="italic">摩擦而非粘合。</span>',
      ja: '取付システム：<br><span class="italic">圧入、接着剤ではなく。</span>',
      id: 'Sistem pemasangan:<br><span class="italic">gesekan, bukan lem.</span>',
    },
    'specs.cord.attach.p1': {
      en: 'The cord enters the handle through a countersunk 6 mm bore in the tip, passes over a polished brass (or silver, or steel) bearing surface, and terminates in a figure-eight stopper knot below the collar. The collar itself is friction-fitted with a 0.02 mm interference fit and secured with a single 1.8 mm brass pin.',
      ru: 'Шнур входит в рукоять через потайное отверстие диаметром 6 мм на наконечнике, проходит по полированной латунной (или серебряной, или стальной) опорной поверхности и завершается стопорным узлом «восьмёрка» под муфтой. Сама муфта установлена на трении с натягом 0,02 мм и закреплена одним латунным штифтом диаметром 1,8 мм.',
      zh: '绳索通过顶端6毫米的埋头孔进入手柄，经过抛光的黄铜（或银、钢）轴承面，在领环下方以八字结终止。领环本身以0.02毫米过盈量摩擦配合，用一根1.8毫米黄铜销固定。',
      ja: '紐は先端の6 mmの座ぐり穴から柄に入り、研磨された真鍮（またはシルバー、スチール）のベアリング面を通り、カラー下のエイトノットで終端する。カラー自体は0.02 mmの圧入嵌合で、1.8 mmの真鍮ピン一本で固定。',
      id: 'Tali memasuki gagang melalui lubang bor countersunk 6 mm di ujung, melewati permukaan bearing kuningan (atau perak, atau baja) yang dipoles, dan berakhir di simpul penghenti angka delapan di bawah kerah. Kerah itu sendiri dipasang gesekan dengan pasangan interferensi 0,02 mm dan diamankan dengan satu pin kuningan 1,8 mm.',
    },
    'specs.cord.attach.p2': {
      en: 'No adhesive is used anywhere in the assembly. Every component can be disassembled, inspected, and replaced by the master. This is the foundation of NISETSU\'s lifetime restoration promise: the cord will be re-braided and the finish renewed as many times as the owner returns the pair to the atelier.',
      ru: 'Клей не используется нигде в сборке. Каждый компонент может быть разобран, осмотрен и заменён мастером. Это основа пожизненного обещания NISETSU о реставрации: шнур будет переплетён, а покрытие обновлено столько раз, сколько владелец вернёт пару в ателье.',
      zh: '装配中任何地方都未使用粘合剂。每个部件都可由匠人拆卸、检查和更换。这是NISETSU终身修复承诺的基础：只要所有者将器物送回工坊，绳索就会重新编织，表面处理也会更新。',
      ja: '組立のどこにも接着剤は使用しない。すべての部品は棟梁が分解、検査、交換できる。これがNISETSUの生涯修復の約束の基盤である：所有者がペアをアトリエに戻す限り、紐は再び組まれ、仕上げは何度でも新しくなる。',
      id: 'Tidak ada lem yang digunakan di mana pun dalam rakitan. Setiap komponen dapat dibongkar, diperiksa, dan diganti oleh sang ahli. Ini adalah dasar dari janji restorasi seumur hidup NISETSU: tali akan dianyam ulang dan finishing diperbarui sebanyak pemiliknya mengembalikan pasangan itu ke atelier.',
    },
    'specs.cord.attach.quote': {
      en: 'Zero adhesive. Zero permanent joins. Every part is replaceable — the object is designed to outlive its maker.',
      ru: 'Ноль клея. Ноль неразъёмных соединений. Каждая деталь заменяема — предмет спроектирован, чтобы пережить своего создателя.',
      zh: '零粘合剂。零永久连接。每个零件均可更换——这件器物的设计旨在比制作它的人活得更久。',
      ja: '接着剤ゼロ。永久接合ゼロ。すべての部品は交換可能 — この道具は作り手より長く生きるよう設計されている。',
      id: 'Nol lem. Nol sambungan permanen. Setiap bagian dapat diganti — benda ini dirancang untuk hidup lebih lama dari pembuatnya.',
    },

    /* Comparison table */
    'specs.compare.label': {
      en: 'Comparison across models', ru: 'Сравнение моделей',
      zh: '跨型号对比', ja: 'モデル間の比較', id: 'Perbandingan antar model',
    },
    'specs.compare.parameter': {
      en: 'Parameter', ru: 'Параметр', zh: '参数', ja: 'パラメータ', id: 'Parameter',
    },
    'specs.compare.wood': { en: 'Wood species', ru: 'Порода дерева', zh: '木材树种', ja: '木材種', id: 'Spesies kayu' },
    'specs.compare.kuro.wood': { en: 'Tohoku oak (Quercus crispula)', ru: 'Дуб Тохоку (Quercus crispula)', zh: '东北橡木 (Quercus crispula)', ja: '東北カシ (Quercus crispula)', id: 'Ek Tohoku (Quercus crispula)' },
    'specs.compare.shiro.wood': { en: 'Cotswold ash (Fraxinus excelsior)', ru: 'Ясень Котсуолд (Fraxinus excelsior)', zh: '科茨沃尔德白蜡木 (Fraxinus excelsior)', ja: 'コッツウォルドトネリコ (Fraxinus excelsior)', id: 'Ash Cotswold (Fraxinus excelsior)' },
    'specs.compare.shu.wood': { en: 'Bloodwood (Brosimum rubescens)', ru: 'Кровавое дерево (Brosimum rubescens)', zh: '血木 (Brosimum rubescens)', ja: 'ブラッドウッド (Brosimum rubescens)', id: 'Bloodwood (Brosimum rubescens)' },
    'specs.compare.density': { en: 'Wood density', ru: 'Плотность дерева', zh: '木材密度', ja: '木材密度', id: 'Densitas kayu' },
    'specs.compare.handlew': { en: 'Handle weight (each)', ru: 'Вес рукояти (каждой)', zh: '单柄重量', ja: '柄重量（各）', id: 'Berat gagang (masing-masing)' },
    'specs.compare.totalw': { en: 'Total weight', ru: 'Общий вес', zh: '总重量', ja: '総重量', id: 'Berat total' },
    'specs.compare.hardware': { en: 'Hardware', ru: 'Фурнитура', zh: '金属件', ja: '金具', id: 'Perangkat keras' },
    'specs.compare.kuro.hw': { en: 'Hand-forged brass', ru: 'Кованая латунь', zh: '手锻黄铜', ja: '手鍛造真鍮', id: 'Kuningan tempa tangan' },
    'specs.compare.shiro.hw': { en: 'Sterling silver (.925)', ru: 'Стерлинговое серебро (.925)', zh: '纯银 (.925)', ja: 'スターリングシルバー (.925)', id: 'Perak sterling (.925)' },
    'specs.compare.shu.hw': { en: 'Blackened carbon steel', ru: 'Вороная углеродистая сталь', zh: '黑化碳钢', ja: '黒染め炭素鋼', id: 'Baja karbon hitam' },
    'specs.compare.hwweight': { en: 'Hardware weight', ru: 'Вес фурнитуры', zh: '金属件重量', ja: '金具重量', id: 'Berat perangkat keras' },
    'specs.compare.cordtype': { en: 'Cord', ru: 'Шнур', zh: '绳', ja: '紐', id: 'Tali' },
    'specs.compare.kuro.cord': { en: 'Black silk, aramid core', ru: 'Чёрный шёлк, арамидный сердечник', zh: '黑丝绳，芳纶芯', ja: '黒絹、アラミド芯', id: 'Sutra hitam, inti aramid' },
    'specs.compare.shiro.cord': { en: 'Ivory silk, aramid core', ru: 'Молочный шёлк, арамидный сердечник', zh: '象牙丝绳，芳纶芯', ja: 'アイボリー絹、アラミド芯', id: 'Sutra gading, inti aramid' },
    'specs.compare.shu.cord': { en: 'Oxblood kangaroo leather', ru: 'Кожа кенгуру цвета бычьей крови', zh: '牛血色袋鼠皮', ja: 'オックスブラッド カンガルーレザー', id: 'Kulit kanguru merah darah' },
    'specs.compare.cordw': { en: 'Cord weight', ru: 'Вес шнура', zh: '绳重', ja: '紐重量', id: 'Berat tali' },
    'specs.compare.finish': { en: 'Surface finish', ru: 'Отделка поверхности', zh: '表面处理', ja: '表面仕上げ', id: 'Finishing permukaan' },
    'specs.compare.kuro.finish': { en: 'Smoked 8 weeks + tung oil', ru: 'Копчение 8 недель + тунговое масло', zh: '烟熏8周 + 桐油', ja: '8週間燻製 + 桐油', id: 'Diasap 8 minggu + minyak tung' },
    'specs.compare.shiro.finish': { en: 'Bleached + beeswax polish', ru: 'Отбеливание + полировка воском', zh: '漂白 + 蜂蜡抛光', ja: '漂白 + 蜜蝋ポリッシュ', id: 'Dipucatkan + poles lilin lebah' },
    'specs.compare.shu.finish': { en: 'Natural oil + hand-buffed', ru: 'Натуральное масло + ручная полировка', zh: '天然油 + 手工打磨', ja: '天然オイル + 手磨き', id: 'Minyak alami + digosok tangan' },
    'specs.compare.balpt': { en: 'Balance point', ru: 'Точка баланса', zh: '平衡点', ja: '重心位置', id: 'Titik keseimbangan' },
    'specs.compare.moi': { en: 'Moment of inertia', ru: 'Момент инерции', zh: '转动惯量', ja: '慣性モーメント', id: 'Momen inersia' },
    'specs.compare.tensile': { en: 'Cord tensile strength', ru: 'Прочность шнура на разрыв', zh: '绳索抗拉强度', ja: '紐の引張強度', id: 'Kekuatan tarik tali' },

    /* Materials */
    'specs.mat.oak': { en: 'Tohoku oak · 黒 Kuro', ru: 'Дуб Тохоку · 黒 Куро', zh: '东北橡木 · 黒 Kuro', ja: '東北カシ · 黒', id: 'Ek Tohoku · 黒 Kuro' },
    'specs.mat.ash': { en: 'Cotswold ash · 白 Shiro', ru: 'Ясень Котсуолд · 白 Широ', zh: '科茨沃尔德白蜡木 · 白 Shiro', ja: 'コッツウォルドトネリコ · 白', id: 'Ash Cotswold · 白 Shiro' },
    'specs.mat.blood': { en: 'Bloodwood · 朱 Shu', ru: 'Кровавое дерево · 朱 Сю', zh: '血木 · 朱 Shu', ja: 'ブラッドウッド · 朱', id: 'Bloodwood · 朱 Shu' },
    'specs.mat.species': { en: 'Species', ru: 'Порода', zh: '树种', ja: '樹種', id: 'Spesies' },
    'specs.mat.origin': { en: 'Origin', ru: 'Происхождение', zh: '产地', ja: '産地', id: 'Asal' },
    'specs.mat.density': { en: 'Density', ru: 'Плотность', zh: '密度', ja: '密度', id: 'Densitas' },
    'specs.mat.janka': { en: 'Janka hardness', ru: 'Твёрдость по Янка', zh: '杨卡硬度', ja: 'ジャンカ硬度', id: 'Kekerasan Janka' },
    'specs.mat.drying': { en: 'Drying', ru: 'Сушка', zh: '干燥', ja: '乾燥', id: 'Pengeringan' },
    'specs.mat.smoking': { en: 'Smoking', ru: 'Копчение', zh: '烟熏', ja: '燻製', id: 'Pengasapan' },
    'specs.mat.treatment': { en: 'Treatment', ru: 'Обработка', zh: '处理', ja: '処理', id: 'Perlakuan' },
    'specs.mat.finishing': { en: 'Finish', ru: 'Финиш', zh: '表面处理', ja: '仕上げ', id: 'Finishing' },
    'specs.mat.oak.drying': { en: 'Air-dried 2 seasons', ru: 'Воздушная сушка 2 сезона', zh: '自然风干两季', ja: '天然乾燥2シーズン', id: 'Dikeringkan udara 2 musim' },
    'specs.mat.oak.smoking': { en: '8 weeks, white oak', ru: '8 недель, белый дуб', zh: '8周，白橡木', ja: '8週間、白樫', id: '8 minggu, ek putih' },
    'specs.mat.oak.finish': { en: 'Tung oil, 4 coats', ru: 'Тунговое масло, 4 слоя', zh: '桐油，4层', ja: '桐油、4回塗り', id: 'Minyak tung, 4 lapis' },
    'specs.mat.ash.drying': { en: 'Air-dried 2 seasons', ru: 'Воздушная сушка 2 сезона', zh: '自然风干两季', ja: '天然乾燥2シーズン', id: 'Dikeringkan udara 2 musim' },
    'specs.mat.ash.treatment': { en: 'Hydrogen peroxide bleach', ru: 'Отбеливание перекисью', zh: '过氧化氢漂白', ja: '過酸化水素漂白', id: 'Pemutihan hidrogen peroksida' },
    'specs.mat.ash.finish': { en: 'Beeswax, hand-buffed', ru: 'Воск, ручная полировка', zh: '蜂蜡，手工打磨', ja: '蜜蝋、手磨き', id: 'Lilin lebah, digosok tangan' },
    'specs.mat.blood.drying': { en: 'Kiln-dried, slow cycle', ru: 'Печная сушка, медленный цикл', zh: '窑干，慢循环', ja: '窯乾燥、スローサイクル', id: 'Dikeringkan kiln, siklus lambat' },
    'specs.mat.blood.treatment': { en: 'None (natural resin)', ru: 'Нет (натуральная смола)', zh: '无（天然树脂）', ja: 'なし（天然樹脂）', id: 'Tidak ada (resin alami)' },
    'specs.mat.blood.finish': { en: 'Danish oil, 6 coats', ru: 'Датское масло, 6 слоёв', zh: '丹麦油，6层', ja: 'デニッシュオイル、6回塗り', id: 'Minyak Denmark, 6 lapis' },

    /* CTA */
    'specs.cta.title': {
      en: 'Numbers describe.<br><span class="italic">The hand decides.</span>',
      ru: 'Цифры описывают.<br><span class="italic">Решает рука.</span>',
      zh: '数字描述。<br><span class="italic">手来决定。</span>',
      ja: '数字は描写する。<br><span class="italic">手が決める。</span>',
      id: 'Angka mendeskripsikan.<br><span class="italic">Tangan yang memutuskan.</span>',
    },
    'specs.cta.btn': {
      en: 'View the collection →', ru: 'Смотреть коллекцию →',
      zh: '查看系列 →', ja: 'コレクションを見る →', id: 'Lihat koleksi →',
    },

    /* ================================================================
       KUSARI · COMBAT SERIES
       ================================================================ */

    'specs.kusari.label': {
      en: '05 — Combat series · 鎖 Kusari', ru: '05 — Боевая серия · 鎖 Кусари',
      zh: '05 — 实战系列 · 鎖 锁', ja: '05 — 実戦シリーズ · 鎖', id: '05 — Seri tempur · 鎖 Kusari',
    },
    'specs.kusari.title': {
      en: 'The chain<br><span class="italic">changes everything.</span>',
      ru: 'Цепь<br><span class="italic">меняет всё.</span>',
      zh: '链条<br><span class="italic">改变一切。</span>',
      ja: '鎖が<br><span class="italic">すべてを変える。</span>',
      id: 'Rantai<br><span class="italic">mengubah segalanya.</span>',
    },
    'specs.kusari.subtitle': {
      en: 'Cord absorbs. Chain transmits. The kusari series is built for practitioners who train in Okinawan kobudo and classical combat forms — where the weapon is expected to strike, not merely to flow. Every parameter shifts to accommodate the physics of a rigid metal connector.',
      ru: 'Шнур поглощает. Цепь передаёт. Серия кусари создана для практикующих окинавское кобудо и классические боевые формы — где оружие должно наносить удар, а не просто течь. Каждый параметр смещён под физику жёсткого металлического соединения.',
      zh: '绳吸收，链传导。锁系列为修习冲绳古武道和古典实战形式的习练者而造——在这些形式中，兵器应当击打，而非仅仅流动。每一个参数都因刚性金属连接件的物理特性而改变。',
      ja: '紐は吸収する。鎖は伝達する。鎖シリーズは沖縄古武道と古典的な実戦型を稽古する者のために作られた——武器が流れるだけでなく、打つことを求められる場所のために。すべてのパラメータが剛体金属コネクタの物理に合わせてシフトする。',
      id: 'Tali menyerap. Rantai mentransmisikan. Seri kusari dibangun untuk praktisi yang berlatih kobudo Okinawa dan bentuk tempur klasik — di mana senjata diharapkan memukul, bukan sekadar mengalir. Setiap parameter bergeser untuk mengakomodasi fisika konektor logam rigid.',
    },
    'specs.kusari.dims': {
      en: 'Kusari dimensions', ru: 'Размеры кусари', zh: '锁系列尺寸', ja: '鎖の寸法', id: 'Dimensi kusari',
    },
    'specs.kusari.handle.label': { en: 'Handle length', ru: 'Длина рукояти', zh: '柄长', ja: '柄の長さ', id: 'Panjang gagang' },
    'specs.kusari.handle.note': {
      en: '2 cm shorter than the himo series. Chain nunchaku rotate faster due to reduced friction at the connector — the shorter handle compensates by lowering the moment of inertia, preventing the arc from becoming uncontrollable. The 28 cm dimension is the traditional Okinawan competition standard (shinai-length rule).',
      ru: 'На 2 см короче серии химо. Цепные нунчаку вращаются быстрее из-за меньшего трения в соединении — короткая рукоять компенсирует это, снижая момент инерции и предотвращая неконтролируемую дугу. 28 см — традиционный окинавский соревновательный стандарт (правило длины синай).',
      zh: '比绳系列短2厘米。链式双节棍因连接处摩擦减少而旋转更快——较短的手柄通过降低转动惯量来补偿，防止弧线失控。28厘米是传统冲绳竞赛标准（竹刀长度法则）。',
      ja: '紐シリーズより2 cm短い。鎖ヌンチャクはコネクタの摩擦低減により回転が速い——短い柄は慣性モーメントを下げて弧が制御不能になるのを防ぐ。28 cmは沖縄の伝統的な競技基準（竹刀の長さの法則）。',
      id: '2 cm lebih pendek dari seri himo. Nunchaku rantai berputar lebih cepat karena gesekan berkurang di konektor — gagang lebih pendek mengkompensasi dengan menurunkan momen inersia, mencegah lengkungan menjadi tak terkendali. Dimensi 28 cm adalah standar kompetisi tradisional Okinawa (aturan panjang shinai).',
    },
    'specs.kusari.chain.label': { en: 'Chain length', ru: 'Длина цепи', zh: '链长', ja: '鎖の長さ', id: 'Panjang rantai' },
    'specs.kusari.chain.note': {
      en: 'Seven links of welded alloy steel, each 20 mm long. Shorter than the cord version: chain transmits 100% of kinetic energy at the endpoint, so a longer chain creates dangerously unpredictable whip dynamics. 14 cm is the minimum for clean behind-the-back passes while maintaining a tight, controlled arc. Traditional Okinawan kusari used 5-7 links — NISETSU uses 7 for the wider arc.',
      ru: 'Семь звеньев сваренной легированной стали, каждое 20 мм. Короче шнуровой версии: цепь передаёт 100% кинетической энергии на конечную точку, поэтому более длинная цепь создаёт опасно непредсказуемую хлыстовую динамику. 14 см — минимум для чистых проводок за спиной при сохранении тугой контролируемой дуги. Традиционные окинавские кусари использовали 5-7 звеньев — NISETSU использует 7 для более широкой дуги.',
      zh: '七个焊接合金钢链环，每个长20毫米。比绳版更短：链条在端点传输100%动能，因此更长的链条会产生危险的不可预测鞭击动力。14厘米是保持紧凑可控弧线的同时完成干净背后通过的最低限度。传统冲绳锁使用5-7个链环——NISETSU使用7个以获得更宽的弧线。',
      ja: '溶接合金鋼のリンク7個、各20 mm。紐版より短い：鎖はエンドポイントで運動エネルギーの100%を伝達するため、長い鎖は危険で予測不能な鞭のダイナミクスを生む。14 cmは、タイトで制御された弧を維持しながら背面パスをクリーンに行える最小値。伝統的な沖縄の鎖は5〜7リンク — NISETSUはより広い弧のために7リンクを使用。',
      id: 'Tujuh mata rantai baja paduan las, masing-masing 20 mm. Lebih pendek dari versi tali: rantai mentransmisikan 100% energi kinetik di titik akhir, jadi rantai yang lebih panjang menciptakan dinamika cambuk yang berbahaya dan tak terduga. 14 cm adalah minimum untuk lintasan belakang punggung yang bersih sambil mempertahankan lengkungan ketat dan terkontrol. Kusari Okinawa tradisional menggunakan 5-7 mata rantai — NISETSU menggunakan 7 untuk lengkungan lebih luas.',
    },
    'specs.kusari.total.label': { en: 'Total extended length', ru: 'Полная длина', zh: '总伸展长度', ja: '全伸長', id: 'Panjang total' },
    'specs.kusari.total.note': {
      en: '28 cm + 14 cm + 28 cm = 70 cm. Handle-to-chain ratio is 4:2:4 (simplified 2:1:2). 8 cm shorter total reach than the himo series — the tighter radius is intentional. Combat forms prioritize rapid recovery and close-quarters control over the wide flowing arcs of training practice.',
      ru: '28 см + 14 см + 28 см = 70 см. Соотношение рукоять:цепь — 4:2:4 (упрощённо 2:1:2). На 8 см короче серии химо — меньший радиус сделан намеренно. Боевые формы приоритизируют быстрое восстановление и контроль в ближнем бою над широкими текучими дугами тренировочной практики.',
      zh: '28厘米 + 14厘米 + 28厘米 = 70厘米。柄与链比为4:2:4（简化2:1:2）。总长比绳系列短8厘米——更紧凑的半径是有意为之。实战形式优先考虑快速恢复和近距离控制，而非训练中的大幅流畅弧线。',
      ja: '28 cm + 14 cm + 28 cm = 70 cm。柄と鎖の比率は4:2:4（簡略化2:1:2）。紐シリーズより全長8 cm短い——より狭い半径は意図的。実戦型は、稽古の広い流れる弧よりも、素早いリカバリーと近接制御を優先する。',
      id: '28 cm + 14 cm + 28 cm = 70 cm. Rasio gagang-ke-rantai adalah 4:2:4 (disederhanakan 2:1:2). 8 cm lebih pendek dari seri himo — radius lebih ketat disengaja. Bentuk tempur memprioritaskan pemulihan cepat dan kontrol jarak dekat di atas lengkungan luas mengalir dari latihan.',
    },
    'specs.kusari.weight.label': { en: 'Total weight', ru: 'Общий вес', zh: '总重量', ja: '総重量', id: 'Berat total' },
    'specs.kusari.weight.note': {
      en: '41% heavier than the Kuro himo. The chain itself weighs 68 g (vs 12 g for silk cord), and the handles use steel-reinforced end caps (swivel mounts) adding 22 g per side. The additional mass is concentrated at the center — the swinging mass is felt immediately on the first rotation. This is not a flaw; it is the point. Kobudo forms are built around this resistance.',
      ru: 'На 41% тяжелее Куро-химо. Сама цепь весит 68 г (против 12 г шёлкового шнура), а рукояти используют стальные наконечники (крепления вертлюга), добавляющие 22 г на сторону. Дополнительная масса сконцентрирована в центре — маховая масса ощущается сразу при первом обороте. Это не дефект; в этом суть. Формы кобудо построены вокруг этого сопротивления.',
      zh: '比黒绳版重41%。链条本身重68克（丝绳仅12克），手柄使用钢制端盖（旋转支座），每侧增加22克。额外质量集中在中心——第一次旋转就能立即感受到摆动质量。这不是缺陷，这就是要点。古武道形式正是围绕这种阻力而构建的。',
      ja: '黒紐より41%重い。鎖自体が68 g（絹紐12 gに対して）、柄はスチール補強エンドキャップ（スイベルマウント）を使用し、各側22 gを追加。追加質量は中央に集中——振り質量は最初の回転で即座に感じられる。これは欠陥ではない。それが要点だ。古武道の型はこの抵抗を中心に構築されている。',
      id: 'Lebih berat 41% dari Kuro himo. Rantai sendiri berbobot 68 g (vs 12 g untuk tali sutra), dan gagang menggunakan tutup ujung bertulang baja (dudukan swivel) menambah 22 g per sisi. Massa tambahan terkonsentrasi di pusat — massa ayunan terasa langsung pada rotasi pertama. Ini bukan cacat; ini intinya. Bentuk kobudo dibangun di sekitar resistensi ini.',
    },
    'specs.kusari.swivel.label': { en: 'Swivel type', ru: 'Тип вертлюга', zh: '转环类型', ja: 'スイベル', id: 'Jenis swivel' },
    'specs.kusari.swivel.val': { en: 'Ball bearing', ru: 'Шарикоподшипник', zh: '滚珠轴承', ja: 'ボールベアリング', id: 'Bantalan bola' },
    'specs.kusari.swivel.note': {
      en: 'Sealed dual ball-bearing swivel at each handle-to-chain junction. 316L marine-grade stainless steel housing, rated to 4,500 N (459 kg). Free rotation eliminates cord-twist binding — the chain never tangles, even during continuous high-speed figure-eight passes. The bearing adds 8 g per side but removes the single most common failure mode in chain nunchaku.',
      ru: 'Герметичный двойной шарикоподшипниковый вертлюг в каждом соединении рукояти и цепи. Корпус из морской нержавеющей стали 316L, рассчитан на 4500 Н (459 кг). Свободное вращение устраняет скручивание — цепь никогда не запутывается, даже при непрерывных высокоскоростных восьмёрках. Подшипник добавляет 8 г на сторону, но устраняет самый распространённый вид отказа в цепных нунчаку.',
      zh: '每个手柄与链条接合处配备密封双滚珠轴承旋转环。316L船用不锈钢外壳，额定4500牛顿（459公斤）。自由旋转消除绳索扭结——即使在连续高速8字通过中链条也不会缠绕。轴承每侧增加8克，但消除了链式双节棍中最常见的故障模式。',
      ja: '各柄と鎖の接合部に密封式デュアルボールベアリングスイベル。316L船舶用ステンレス鋼ハウジング、4,500 N（459 kg）耐荷重。自由回転により紐のねじれ結合を排除——連続高速八の字パス中でも鎖が絡まることはない。ベアリングは各側8 gを追加するが、鎖ヌンチャクの最も一般的な故障モードを排除する。',
      id: 'Swivel bantalan bola ganda tersegel di setiap persimpangan gagang-ke-rantai. Housing baja tahan karat 316L kelas laut, dinilai 4.500 N (459 kg). Rotasi bebas menghilangkan ikatan puntiran tali — rantai tidak pernah kusut, bahkan selama lintasan angka delapan berkecepatan tinggi terus-menerus. Bantalan menambah 8 g per sisi tetapi menghilangkan mode kegagalan paling umum pada nunchaku rantai.',
    },
    'specs.kusari.balance.label': { en: 'Balance point', ru: 'Точка баланса', zh: '平衡点', ja: '重心位置', id: 'Titik keseimbangan' },
    'specs.kusari.balance.note': {
      en: 'Center of gravity at 35% from the chain end (9.8 cm from top) — shifted 5% closer to the chain compared to himo. The heavier chain connector pulls the balance point upward, increasing tip speed during strikes. This is the fundamental biomechanical difference: himo balance favors flow; kusari balance favors impact.',
      ru: 'Центр тяжести на 35% от конца цепи (9,8 см от верха) — на 5% ближе к цепи по сравнению с химо. Более тяжёлое цепное соединение тянет точку баланса вверх, увеличивая скорость наконечника при ударах. Это фундаментальное биомеханическое различие: баланс химо благоприятствует потоку; баланс кусари — удару.',
      zh: '重心位于链端起35%处（距顶部9.8厘米）——与绳版相比向链端移动了5%。较重的链条连接件将平衡点上拉，增加击打时的尖端速度。这是根本的生物力学差异：绳的平衡利于流动；链的平衡利于冲击。',
      ja: '鎖端から35%の位置（上から9.8 cm）に重心——紐と比べ5%鎖に近い。重い鎖コネクタが重心を引き上げ、打撃時の先端速度を増す。これが基本的な生体力学的差異：紐のバランスは流れに適し、鎖のバランスは衝撃に適す。',
      id: 'Pusat gravitasi pada 35% dari ujung rantai (9,8 cm dari atas) — bergeser 5% lebih dekat ke rantai dibanding himo. Konektor rantai yang lebih berat menarik titik keseimbangan ke atas, meningkatkan kecepatan ujung saat pukulan. Ini adalah perbedaan biomekanis mendasar: keseimbangan himo mendukung aliran; keseimbangan kusari mendukung dampak.',
    },

    /* Chain engineering */
    'specs.kusari.chain.eng.title': {
      en: 'The chain:<br><span class="italic">seven links, zero forgiveness.</span>',
      ru: 'Цепь:<br><span class="italic">семь звеньев, ноль прощения.</span>',
      zh: '链条：<br><span class="italic">七个链环，零容错。</span>',
      ja: '鎖：<br><span class="italic">七つの環、容赦なし。</span>',
      id: 'Rantai:<br><span class="italic">tujuh mata, nol ampun.</span>',
    },
    'specs.kusari.chain.eng.p1': {
      en: 'Each link is drop-forged from 4140 chromoly steel, heat-treated to Rockwell C 42-45. The links are welded shut with TIG, then individually load-tested to 3,200 N before assembly. Unlike mass-produced nunchaku chains that use open-loop links (which can snag on clothing and deform under impact), NISETSU\'s closed-loop links have no gap. The chain is functionally a single continuous component.',
      ru: 'Каждое звено штамповано из хромомолибденовой стали 4140, термообработано до Rockwell C 42-45. Звенья заварены TIG-сваркой, затем каждое проходит нагрузочные испытания до 3200 Н перед сборкой. В отличие от серийных цепей с открытыми звеньями (которые цепляются за одежду и деформируются при ударе), замкнутые звенья NISETSU не имеют зазора. Цепь функционально является единым непрерывным компонентом.',
      zh: '每个链环由4140铬钼钢模锻，热处理至洛氏硬度C 42-45。链环以TIG焊接封闭，然后在组装前逐个承受3200牛顿的载荷测试。不同于量产双节棍使用的开环链环（会钩住衣物并在冲击下变形），NISETSU的闭环链环没有间隙。链条在功能上是一个连续整体。',
      ja: '各リンクは4140クロモリ鋼からドロップフォージ、ロックウェルC 42-45に熱処理。TIG溶接で封鎖後、組立前に個別に3,200 Nの荷重試験。大量生産のヌンチャクチェーンが使うオープンループリンク（衣服に引っかかり衝撃で変形する）とは異なり、NISETSUのクローズドループリンクには隙間がない。鎖は機能的に単一の連続部品である。',
      id: 'Setiap mata rantai ditempa jatuh dari baja chromoly 4140, diberi perlakuan panas ke Rockwell C 42-45. Mata rantai dilas tertutup dengan TIG, kemudian diuji beban secara individual hingga 3.200 N sebelum perakitan. Berbeda dengan rantai nunchaku produksi massal yang menggunakan mata rantai loop terbuka (yang bisa menyangkut pakaian dan berubah bentuk saat benturan), mata rantai loop tertutup NISETSU tidak memiliki celah. Rantai secara fungsional merupakan satu komponen kontinu.',
    },
    'specs.kusari.chain.eng.p2': {
      en: 'Link profile is oval, not round — 20 mm long axis, 12 mm short axis. The oval shape nests cleanly when the chain is gathered in the hand, producing a flat stack rather than a ball. This matters during the "closed carry" position (shimae-kata) where both handles are held parallel with the chain draped between them.',
      ru: 'Профиль звена овальный, не круглый — 20 мм по длинной оси, 12 мм по короткой. Овальная форма чисто складывается при сборе цепи в руке, образуя плоскую стопку, а не клубок. Это важно в позиции «закрытого ношения» (симаэ-ката), где обе рукояти держатся параллельно с цепью между ними.',
      zh: '链环截面为椭圆形而非圆形——长轴20毫米，短轴12毫米。椭圆形状在链条被握入手中时干净叠放，形成扁平堆叠而非球形。这在「收合携行」姿势（仕舞形）中很重要，此时两根手柄平行握持，链条垂挂其间。',
      ja: 'リンクのプロファイルは丸ではなく楕円——長軸20 mm、短軸12 mm。楕円形は鎖を手に集めた時にきれいに重なり、球ではなく平らなスタックになる。これは「収め方」（仕舞い方）で重要。両柄を平行に持ち、鎖を間に垂らす姿勢だ。',
      id: 'Profil mata rantai oval, bukan bulat — sumbu panjang 20 mm, sumbu pendek 12 mm. Bentuk oval tersarang rapi saat rantai dikumpulkan di tangan, menghasilkan tumpukan datar alih-alih bola. Ini penting selama posisi "bawa tertutup" (shimae-kata) di mana kedua gagang dipegang sejajar dengan rantai tergantung di antaranya.',
    },
    'specs.kusari.chain.eng.quote': {
      en: 'Cord whispers. Chain announces. The practitioner who chooses kusari is choosing to be heard.',
      ru: 'Шнур шепчет. Цепь объявляет. Практикующий, выбирающий кусари, выбирает быть услышанным.',
      zh: '绳低语。链宣告。选择锁的习练者，选择的是被听见。',
      ja: '紐は囁く。鎖は告げる。鎖を選ぶ稽古者は、聞かれることを選んでいる。',
      id: 'Tali berbisik. Rantai mengumumkan. Praktisi yang memilih kusari memilih untuk didengar.',
    },
    'specs.kusari.dynamics.title': {
      en: 'Combat dynamics:<br><span class="italic">energy transfer at 100%.</span>',
      ru: 'Динамика боя:<br><span class="italic">передача энергии на 100%.</span>',
      zh: '实战动力学：<br><span class="italic">100%能量传递。</span>',
      ja: '戦闘力学：<br><span class="italic">エネルギー伝達100%。</span>',
      id: 'Dinamika tempur:<br><span class="italic">transfer energi 100%.</span>',
    },
    'specs.kusari.dynamics.p1': {
      en: 'Silk cord has 18-20% elongation at break — it stretches, absorbs, and returns energy gradually. Steel chain has 0% elongation. Every joule of kinetic energy generated by the swing arrives at the endpoint without loss. In biomechanical terms: a cord nunchaku at full swing delivers approximately 47 J of impact energy. The same swing with a chain nunchaku delivers 62 J — a 32% increase — purely from elimination of elastic loss.',
      ru: 'Шёлковый шнур имеет удлинение при разрыве 18-20% — он растягивается, поглощает и постепенно возвращает энергию. Стальная цепь: 0% удлинения. Каждый джоуль кинетической энергии от размаха доходит до конечной точки без потерь. В биомеханических терминах: шнуровые нунчаку на полном размахе дают примерно 47 Дж энергии удара. Тот же размах с цепными — 62 Дж — рост на 32% — чисто за счёт устранения упругих потерь.',
      zh: '丝绳断裂伸长率18-20%——它拉伸、吸收、逐步返回能量。钢链伸长率0%。挥击产生的每一焦耳动能毫无损失地到达端点。以生物力学术语：绳式双节棍全力挥击产生约47焦耳冲击能。同样挥击的链式产生62焦耳——增加32%——纯粹源于弹性损失的消除。',
      ja: '絹紐の破断伸び率は18〜20%——伸び、吸収し、エネルギーを徐々に返す。鋼鎖の伸び率は0%。スイングで生成されるすべての運動エネルギーが、損失なくエンドポイントに到達する。生体力学的に言えば：紐ヌンチャクのフルスイングは約47 Jの衝撃エネルギー。同じスイングの鎖ヌンチャクは62 J——32%の増加——純粋に弾性損失の排除による。',
      id: 'Tali sutra memiliki perpanjangan saat putus 18-20% — meregang, menyerap, dan mengembalikan energi secara bertahap. Rantai baja memiliki perpanjangan 0%. Setiap joule energi kinetik yang dihasilkan ayunan tiba di titik akhir tanpa kehilangan. Secara biomekanis: nunchaku tali pada ayunan penuh menghasilkan sekitar 47 J energi dampak. Ayunan yang sama dengan nunchaku rantai menghasilkan 62 J — peningkatan 32% — murni dari eliminasi kehilangan elastis.',
    },
    'specs.kusari.dynamics.p2': {
      en: 'This changes how the weapon must be trained. Recovery after a missed strike is faster (the chain doesn\'t stretch and bounce back), but the rebound is harder and less predictable. Kusari practitioners develop a different wrist articulation — a sharp "snap" at the end of each arc rather than the continuous roll of himo practice. The two styles are complementary, not interchangeable.',
      ru: 'Это меняет подход к тренировке. Восстановление после промаха быстрее (цепь не растягивается и не пружинит), но отскок жёстче и менее предсказуем. Практикующие кусари развивают иную артикуляцию запястья — резкий «щелчок» в конце каждой дуги вместо непрерывного перекатывания химо-практики. Два стиля дополняют, а не заменяют друг друга.',
      zh: '这改变了必须训练该武器的方式。落空后的恢复更快（链条不拉伸也不回弹），但反弹更硬且更不可预测。锁的习练者发展出不同的手腕关节技巧——在每个弧线末端的锐利「弹击」，而非绳式练习的连续滚动。两种风格互补而非可互换。',
      ja: 'これは武器の稽古方法を変える。空振り後のリカバリーは速い（鎖は伸びて跳ね返らない）が、リバウンドはより硬く予測しにくい。鎖の稽古者は異なる手首の使い方を身につける——紐稽古の連続的なロールではなく、各弧の終わりでの鋭い「スナップ」。二つのスタイルは補完的であり、互換ではない。',
      id: 'Ini mengubah cara senjata harus dilatih. Pemulihan setelah pukulan meleset lebih cepat (rantai tidak meregang dan memantul), tetapi pantulan lebih keras dan kurang prediktif. Praktisi kusari mengembangkan artikulasi pergelangan tangan berbeda — "jentikan" tajam di akhir setiap lengkungan alih-alih gulungan kontinu latihan himo. Kedua gaya saling melengkapi, bukan saling menggantikan.',
    },
    'specs.kusari.dynamics.quote': {
      en: 'Impact energy: cord 47 J vs chain 62 J at identical swing speed. The 32% difference is the chain\'s zero elongation.',
      ru: 'Энергия удара: шнур 47 Дж vs цепь 62 Дж при одинаковой скорости замаха. 32% разницы — нулевое удлинение цепи.',
      zh: '冲击能量：绳47焦耳 vs 链62焦耳，在相同挥击速度下。32%的差异来自链条的零伸长率。',
      ja: '衝撃エネルギー：紐47 J vs 鎖62 J、同一スイング速度で。32%の差は鎖のゼロ伸び率による。',
      id: 'Energi dampak: tali 47 J vs rantai 62 J pada kecepatan ayunan identik. Perbedaan 32% adalah perpanjangan nol rantai.',
    },

    /* Kusari blueprint */
    'specs.kusari.bp.label': {
      en: 'Technical drawing · Kusari assembly', ru: 'Чертёж · Сборка кусари',
      zh: '技术图纸 · 锁组件', ja: '技術図面 · 鎖の組立', id: 'Gambar teknis · Rakitan kusari',
    },
    'specs.kusari.bp.sub': {
      en: 'Chain link geometry, ball-bearing swivel cross-section,<br>handle end-cap assembly, and closed-loop weld detail.<br>— Placeholder for commissioned technical illustration —',
      ru: 'Геометрия звеньев, сечение шарикоподшипникового вертлюга,<br>сборка торцевых крышек, деталь замкнутой сварки.<br>— Место для заказной технической иллюстрации —',
      zh: '链环几何形状、滚珠轴承旋转环截面、<br>手柄端盖组件和闭环焊接细节。<br>— 此处为委托技术插图预留位 —',
      ja: 'チェーンリンクの形状、ボールベアリングスイベルの断面、<br>柄エンドキャップの組立、クローズドループ溶接の詳細。<br>— 委託技術図面のプレースホルダー —',
      id: 'Geometri mata rantai, penampang swivel bantalan bola,<br>rakitan tutup ujung gagang, dan detail las loop tertutup.<br>— Placeholder untuk ilustrasi teknis yang ditugaskan —',
    },
    'specs.kusari.bp.caption': {
      en: 'Fig. 07 · Kusari assembly detail. The ball-bearing swivel housing is press-fitted into a countersunk steel end cap, which itself friction-fits into the handle bore. The chain attaches to the swivel via a closed shackle — no split rings or open connectors anywhere in the load path.',
      ru: 'Рис. 07 · Деталь сборки кусари. Корпус шарикоподшипникового вертлюга запрессован в потайную стальную крышку, которая установлена на трении в отверстие рукояти. Цепь крепится к вертлюгу через замкнутую скобу — никаких разрезных колец и открытых соединителей на пути нагрузки.',
      zh: '图07 · 锁组件细节。滚珠轴承旋转环外壳压入埋头钢制端盖，端盖本身以摩擦配合插入手柄孔。链条通过闭合卸扣连接到旋转环——载荷路径上无开口环或开放式连接件。',
      ja: '図07 · 鎖組立の詳細。ボールベアリングスイベルのハウジングは座ぐり鋼製エンドキャップに圧入され、エンドキャップ自体が柄のボアに圧入嵌合する。鎖はクローズドシャックルでスイベルに接続——荷重経路にスプリットリングやオープンコネクタは一切ない。',
      id: 'Gbr. 07 · Detail rakitan kusari. Housing swivel bantalan bola dipasang tekan ke tutup ujung baja countersunk, yang sendiri dipasang gesekan ke lubang gagang. Rantai terhubung ke swivel melalui segel tertutup — tidak ada cincin belah atau konektor terbuka di mana pun di jalur beban.',
    },

    /* Himo vs Kusari table */
    'specs.vs.label': {
      en: 'Himo (cord) vs Kusari (chain)', ru: 'Химо (шнур) vs Кусари (цепь)',
      zh: '绳 vs 链', ja: '紐 vs 鎖', id: 'Himo (tali) vs Kusari (rantai)',
    },
    'specs.vs.himo': { en: '紐 Himo · Training', ru: '紐 Химо · Тренировочные', zh: '紐 绳 · 训练', ja: '紐 · 稽古', id: '紐 Himo · Latihan' },
    'specs.vs.kusari': { en: '鎖 Kusari · Combat', ru: '鎖 Кусари · Боевые', zh: '鎖 锁 · 实战', ja: '鎖 · 実戦', id: '鎖 Kusari · Tempur' },
    'specs.vs.connector': { en: 'Connector', ru: 'Соединение', zh: '连接件', ja: '接続', id: 'Konektor' },
    'specs.vs.himo.connector': { en: '12-strand silk braid + aramid core', ru: '12-прядный шёлковый плёт + арамидный сердечник', zh: '12股丝编 + 芳纶芯', ja: '12本絹組紐 + アラミド芯', id: 'Anyaman sutra 12 helai + inti aramid' },
    'specs.vs.kusari.connector': { en: '7-link 4140 chromoly chain', ru: '7-звенная хромомолибденовая цепь 4140', zh: '7环4140铬钼钢链', ja: '7リンク4140クロモリチェーン', id: 'Rantai chromoly 4140 7 mata' },
    'specs.vs.connlen': { en: 'Connector length', ru: 'Длина соединения', zh: '连接件长度', ja: '接続長', id: 'Panjang konektor' },
    'specs.vs.connwt': { en: 'Connector weight', ru: 'Вес соединения', zh: '连接件重量', ja: '接続重量', id: 'Berat konektor' },
    'specs.vs.handlelen': { en: 'Handle length', ru: 'Длина рукояти', zh: '柄长', ja: '柄の長さ', id: 'Panjang gagang' },
    'specs.vs.totalwt': { en: 'Total weight', ru: 'Общий вес', zh: '总重量', ja: '総重量', id: 'Berat total' },
    'specs.vs.reach': { en: 'Total reach', ru: 'Общий охват', zh: '总长度', ja: '全長', id: 'Jangkauan total' },
    'specs.vs.elongation': { en: 'Elongation at break', ru: 'Удлинение при разрыве', zh: '断裂伸长率', ja: '破断伸び率', id: 'Perpanjangan saat putus' },
    'specs.vs.impact': { en: 'Impact energy (full swing)', ru: 'Энергия удара (полный замах)', zh: '冲击能量（全力挥击）', ja: '衝撃エネルギー（フルスイング）', id: 'Energi dampak (ayunan penuh)' },
    'specs.vs.tensile': { en: 'Tensile strength', ru: 'Прочность на разрыв', zh: '抗拉强度', ja: '引張強度', id: 'Kekuatan tarik' },
    'specs.vs.noise': { en: 'Noise level', ru: 'Уровень шума', zh: '噪音级别', ja: '音量', id: 'Tingkat kebisingan' },
    'specs.vs.himo.noise': { en: 'Silent', ru: 'Бесшумный', zh: '无声', ja: '無音', id: 'Sunyi' },
    'specs.vs.kusari.noise': { en: 'Audible (link articulation)', ru: 'Слышимый (звук звеньев)', zh: '有声（链环关节声）', ja: '有音（リンクの関節音）', id: 'Terdengar (artikulasi mata rantai)' },
    'specs.vs.rotation': { en: 'Joint rotation', ru: 'Вращение сустава', zh: '关节旋转', ja: '関節回転', id: 'Rotasi sendi' },
    'specs.vs.himo.rotation': { en: 'Limited by twist accumulation', ru: 'Ограничено накоплением скручивания', zh: '受扭转累积限制', ja: 'ねじれ蓄積により制限', id: 'Dibatasi akumulasi puntiran' },
    'specs.vs.kusari.rotation': { en: 'Free (ball-bearing swivel)', ru: 'Свободное (подшипниковый вертлюг)', zh: '自由（滚珠轴承转环）', ja: '自由（ボールベアリングスイベル）', id: 'Bebas (swivel bantalan bola)' },
    'specs.vs.style': { en: 'Recommended style', ru: 'Рекомендуемый стиль', zh: '推荐风格', ja: '推奨スタイル', id: 'Gaya yang disarankan' },
    'specs.vs.himo.style': { en: 'Kaiten (flow), daily training', ru: 'Кайтэн (поток), ежедневная тренировка', zh: '回转（流动），日常训练', ja: '回転（フロー）、日常稽古', id: 'Kaiten (aliran), latihan harian' },
    'specs.vs.kusari.style': { en: 'Kobudo, classical combat forms', ru: 'Кобудо, классические боевые формы', zh: '古武道，古典实战形式', ja: '古武道、古典実戦型', id: 'Kobudo, bentuk tempur klasik' },
  };


  /* ================================================================
     ENGINE — zero-artifact language switching
     ================================================================ */

  // Pre-index: build a map of elements once, not on every switch
  let elMap = null;   // { key: [el, ...] }
  let inputMap = null; // { key: [el, ...] }

  function buildIndex() {
    elMap = {};
    inputMap = {};
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        (inputMap[key] || (inputMap[key] = [])).push(el);
      } else {
        (elMap[key] || (elMap[key] = [])).push(el);
      }
    });
  }

  function getLang() {
    return localStorage.getItem('nisetsu_lang')
      || document.cookie.match(/nisetsu_lang=(\w+)/)?.[1]
      || DEFAULT;
  }

  // Inject the transition style once
  const FADE_MS = 120;
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    body.nisetsu-i18n-fade {
      opacity: 0 !important;
      transition: opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 1, 1) !important;
    }
    body.nisetsu-i18n-show {
      transition: opacity ${FADE_MS}ms cubic-bezier(0, 0, 0.2, 1) !important;
    }
  `;
  document.head.appendChild(styleEl);

  let switching = false;

  function setLang(lang) {
    if (!LANGS.includes(lang) || switching) return;
    const current = getLang();
    if (lang === current) return;

    localStorage.setItem('nisetsu_lang', lang);
    document.cookie = `nisetsu_lang=${lang};path=/;max-age=${365 * 86400};SameSite=Lax`;
    updateSwitcher(lang);

    // If same as HTML default and it's the first load, just apply instantly
    switching = true;

    // Phase 1: fade out
    document.body.classList.add('nisetsu-i18n-fade');

    // Phase 2: after fade-out completes, swap all text in one rAF, then fade in
    setTimeout(() => {
      requestAnimationFrame(() => {
        applyBatch(lang);
        document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;

        // Phase 3: fade in
        document.body.classList.remove('nisetsu-i18n-fade');
        document.body.classList.add('nisetsu-i18n-show');

        setTimeout(() => {
          document.body.classList.remove('nisetsu-i18n-show');
          switching = false;
        }, FADE_MS);
      });
    }, FADE_MS);
  }

  function applyBatch(lang) {
    if (!elMap) buildIndex();

    // Batch all DOM writes — no interleaved reads
    for (const key in elMap) {
      const entry = T[key];
      if (!entry) continue;
      const text = entry[lang] || entry[DEFAULT];
      if (text == null) continue;
      const els = elMap[key];
      for (let i = 0; i < els.length; i++) {
        els[i].innerHTML = text;
      }
    }
    for (const key in inputMap) {
      const entry = T[key];
      if (!entry) continue;
      const text = entry[lang] || entry[DEFAULT];
      if (text == null) continue;
      const els = inputMap[key];
      for (let i = 0; i < els.length; i++) {
        els[i].placeholder = text;
      }
    }
  }

  // Silent apply — no transition, used on initial page load
  function applySilent(lang) {
    if (!elMap) buildIndex();
    applyBatch(lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;
  }

  function updateSwitcher(lang) {
    document.querySelectorAll('.lang [data-lang]').forEach((a) => {
      a.classList.toggle('active', a.dataset.lang === lang);
    });
  }

  function init() {
    buildIndex();

    // Bind switcher clicks
    document.querySelectorAll('.lang [data-lang]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        setLang(a.dataset.lang);
      });
    });

    const lang = getLang();
    if (lang !== DEFAULT) {
      applySilent(lang);
    }
    updateSwitcher(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for external use
  window.nisetsuI18n = { setLang, getLang, LANGS };
})();
