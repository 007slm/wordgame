/**
 * 单词消消乐 - 北京中小学英语考纲词库 (小学 800词 -> 初中中考 1600词 -> 高中高考 3500词)
 * 严格按照北京版/人教版教材与中高考大纲由浅入深循序渐进排布：
 * Level 1: 北京小学段 (1~6年级日常高频与启蒙认知)
 * Level 2: 北京初中段 (中考高频核心大纲词)
 * Level 3: 北京高中段 (高考核心拓展与思辨词)
 */

const WORD_DATABASE = [
  // ==========================================================================
  // 🎒 北京大兴区外研社版小学三年级起点 · 三年级上册 (Module 1 ~ Module 10)
  // 严格按教材单元顺序由浅入深编排，第1关为最简单的零门槛打招呼问候词汇
  // ==========================================================================

  // --- Module 1: Greetings (问候与交友 - 零门槛启蒙) ---
  { id: 1, word: "hello", phonetic: "/həˈləʊ/", meaning: "你好", category: "问候", level: 1, stage: "🎒 外研三上·M1" },
  { id: 2, word: "hi", phonetic: "/haɪ/", meaning: "嗨/你好", category: "问候", level: 1, stage: "🎒 外研三上·M1" },
  { id: 3, word: "I", phonetic: "/aɪ/", meaning: "我", category: "代词", level: 1, stage: "🎒 外研三上·M1" },
  { id: 4, word: "am", phonetic: "/æm/", meaning: "是(我是)", category: "动词", level: 1, stage: "🎒 外研三上·M1" },
  { id: 5, word: "goodbye", phonetic: "/ˌɡʊdˈbaɪ/", meaning: "再见", category: "问候", level: 1, stage: "🎒 外研三上·M1" },
  { id: 6, word: "bye", phonetic: "/baɪ/", meaning: "再见", category: "问候", level: 1, stage: "🎒 外研三上·M1" },
  { id: 7, word: "are", phonetic: "/ɑː/", meaning: "是(你是)", category: "动词", level: 1, stage: "🎒 外研三上·M1" },
  { id: 8, word: "you", phonetic: "/juː/", meaning: "你/你们", category: "代词", level: 1, stage: "🎒 外研三上·M1" },
  { id: 9, word: "good", phonetic: "/ɡʊd/", meaning: "好的", category: "品质", level: 1, stage: "🎒 外研三上·M1" },
  { id: 10, word: "morning", phonetic: "/ˈmɔːnɪŋ/", meaning: "早晨/上午", category: "时间", level: 1, stage: "🎒 外研三上·M1" },
  { id: 11, word: "fine", phonetic: "/faɪn/", meaning: "健康的/很好的", category: "状态", level: 1, stage: "🎒 外研三上·M1" },
  { id: 12, word: "thank", phonetic: "/θæŋk/", meaning: "谢谢/感谢", category: "礼貌", level: 1, stage: "🎒 外研三上·M1" },

  // --- Module 2: Introductions (姓名、称谓与自我介绍) ---
  { id: 13, word: "what", phonetic: "/wɒt/", meaning: "什么", category: "疑问", level: 1, stage: "🎒 外研三上·M2" },
  { id: 14, word: "is", phonetic: "/ɪz/", meaning: "是(它是)", category: "动词", level: 1, stage: "🎒 外研三上·M2" },
  { id: 15, word: "your", phonetic: "/jɔː/", meaning: "你的/你们的", category: "代词", level: 1, stage: "🎒 外研三上·M2" },
  { id: 16, word: "name", phonetic: "/neɪm/", meaning: "名字", category: "称谓", level: 1, stage: "🎒 外研三上·M2" },
  { id: 17, word: "Mr", phonetic: "/ˈmɪstə/", meaning: "先生", category: "称谓", level: 1, stage: "🎒 外研三上·M2" },
  { id: 18, word: "Ms", phonetic: "/mɪz/", meaning: "女士", category: "称谓", level: 1, stage: "🎒 外研三上·M2" },
  { id: 19, word: "boy", phonetic: "/bɔɪ/", meaning: "男孩", category: "人物", level: 1, stage: "🎒 外研三上·M2" },
  { id: 20, word: "girl", phonetic: "/ɡɜːl/", meaning: "女孩", category: "人物", level: 1, stage: "🎒 外研三上·M2" },
  { id: 21, word: "please", phonetic: "/pliːz/", meaning: "请", category: "礼貌", level: 1, stage: "🎒 外研三上·M2" },
  { id: 22, word: "afternoon", phonetic: "/ˌɑːftəˈnuːn/", meaning: "下午", category: "时间", level: 1, stage: "🎒 外研三上·M2" },

  // --- Module 3: Classroom (教室与课堂指令) ---
  { id: 23, word: "point", phonetic: "/pɔɪnt/", meaning: "指/指向", category: "动作", level: 1, stage: "🎒 外研三上·M3" },
  { id: 24, word: "to", phonetic: "/tuː/", meaning: "向/朝", category: "介词", level: 1, stage: "🎒 外研三上·M3" },
  { id: 25, word: "door", phonetic: "/dɔː/", meaning: "门", category: "建筑", level: 1, stage: "🎒 外研三上·M3" },
  { id: 26, word: "sit", phonetic: "/sɪt/", meaning: "坐", category: "动作", level: 1, stage: "🎒 外研三上·M3" },
  { id: 27, word: "down", phonetic: "/daʊn/", meaning: "向下", category: "副词", level: 1, stage: "🎒 外研三上·M3" },
  { id: 28, word: "stand", phonetic: "/stænd/", meaning: "站立", category: "动作", level: 1, stage: "🎒 外研三上·M3" },
  { id: 29, word: "up", phonetic: "/ʌp/", meaning: "向上", category: "副词", level: 1, stage: "🎒 外研三上·M3" },
  { id: 30, word: "window", phonetic: "/ˈwɪndəʊ/", meaning: "窗户", category: "建筑", level: 1, stage: "🎒 外研三上·M3" },
  { id: 31, word: "blackboard", phonetic: "/ˈblækbɔːd/", meaning: "黑板", category: "教室", level: 1, stage: "🎒 外研三上·M3" },
  { id: 32, word: "bird", phonetic: "/bɜːd/", meaning: "鸟", category: "动物", level: 1, stage: "🎒 外研三上·M3" },
  { id: 33, word: "desk", phonetic: "/desk/", meaning: "书桌", category: "家具", level: 1, stage: "🎒 外研三上·M3" },
  { id: 34, word: "chair", phonetic: "/tʃeə/", meaning: "椅子", category: "家具", level: 1, stage: "🎒 外研三上·M3" },

  // --- Module 4: Colours (色彩与宠物) ---
  { id: 35, word: "it", phonetic: "/ɪt/", meaning: "它", category: "代词", level: 1, stage: "🎒 外研三上·M4" },
  { id: 36, word: "red", phonetic: "/red/", meaning: "红色/红色的", category: "颜色", level: 1, stage: "🎒 外研三上·M4" },
  { id: 37, word: "look", phonetic: "/lʊk/", meaning: "看/瞧", category: "动作", level: 1, stage: "🎒 外研三上·M4" },
  { id: 38, word: "yellow", phonetic: "/ˈjeləʊ/", meaning: "黄色/黄色的", category: "颜色", level: 1, stage: "🎒 外研三上·M4" },
  { id: 39, word: "blue", phonetic: "/bluː/", meaning: "蓝色/蓝色的", category: "颜色", level: 1, stage: "🎒 外研三上·M4" },
  { id: 40, word: "green", phonetic: "/ɡriːn/", meaning: "绿色/绿色的", category: "颜色", level: 1, stage: "🎒 外研三上·M4" },
  { id: 41, word: "orange", phonetic: "/ˈɒrɪndʒ/", meaning: "橙色/橙子", category: "颜色", level: 1, stage: "🎒 外研三上·M4" },
  { id: 42, word: "black", phonetic: "/blæk/", meaning: "黑色/黑色的", category: "颜色", level: 1, stage: "🎒 外研三上·M4" },
  { id: 43, word: "white", phonetic: "/waɪt/", meaning: "白色/白色的", category: "颜色", level: 1, stage: "🎒 外研三上·M4" },
  { id: 44, word: "dog", phonetic: "/dɒɡ/", meaning: "狗", category: "动物", level: 1, stage: "🎒 外研三上·M4" },
  { id: 45, word: "cat", phonetic: "/kæt/", meaning: "猫", category: "动物", level: 1, stage: "🎒 外研三上·M4" },
  { id: 46, word: "cap", phonetic: "/kæp/", meaning: "便帽/鸭舌帽", category: "服饰", level: 1, stage: "🎒 外研三上·M4" },

  // --- Module 5: Numbers (数字与计数 1~12) ---
  { id: 47, word: "many", phonetic: "/ˈmeni/", meaning: "许多的", category: "数量", level: 1, stage: "🎒 外研三上·M5" },
  { id: 48, word: "one", phonetic: "/wʌn/", meaning: "一", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 49, word: "two", phonetic: "/tuː/", meaning: "二", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 50, word: "three", phonetic: "/θriː/", meaning: "三", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 51, word: "four", phonetic: "/fɔː/", meaning: "四", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 52, word: "five", phonetic: "/faɪv/", meaning: "五", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 53, word: "six", phonetic: "/sɪks/", meaning: "六", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 54, word: "seven", phonetic: "/ˈsevn/", meaning: "七", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 55, word: "eight", phonetic: "/eɪt/", meaning: "八", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 56, word: "nine", phonetic: "/naɪn/", meaning: "九", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 57, word: "ten", phonetic: "/ten/", meaning: "十", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 58, word: "eleven", phonetic: "/ɪˈlevn/", meaning: "十一", category: "数字", level: 1, stage: "🎒 外研三上·M5" },
  { id: 59, word: "twelve", phonetic: "/twelv/", meaning: "十二", category: "数字", level: 1, stage: "🎒 外研三上·M5" },

  // --- Module 6: School Things (学校与文具) ---
  { id: 60, word: "this", phonetic: "/ðɪs/", meaning: "这个", category: "代词", level: 1, stage: "🎒 外研三上·M6" },
  { id: 61, word: "that", phonetic: "/ðæt/", meaning: "那个", category: "代词", level: 1, stage: "🎒 外研三上·M6" },
  { id: 62, word: "school", phonetic: "/skuːl/", meaning: "学校", category: "学校", level: 1, stage: "🎒 外研三上·M6" },
  { id: 63, word: "classroom", phonetic: "/ˈklɑːsruːm/", meaning: "教室", category: "学校", level: 1, stage: "🎒 外研三上·M6" },
  { id: 64, word: "English", phonetic: "/ˈɪŋɡlɪʃ/", meaning: "英语", category: "学科", level: 1, stage: "🎒 外研三上·M6" },
  { id: 65, word: "bag", phonetic: "/bæɡ/", meaning: "书包/包", category: "用品", level: 1, stage: "🎒 外研三上·M6" },
  { id: 66, word: "pen", phonetic: "/pen/", meaning: "钢笔", category: "文具", level: 1, stage: "🎒 外研三上·M6" },
  { id: 67, word: "pencil", phonetic: "/ˈpensl/", meaning: "铅笔", category: "文具", level: 1, stage: "🎒 外研三上·M6" },
  { id: 68, word: "ruler", phonetic: "/ˈruːlə/", meaning: "尺子", category: "文具", level: 1, stage: "🎒 外研三上·M6" },
  { id: 69, word: "eraser", phonetic: "/ɪˈreɪsə/", meaning: "橡皮", category: "文具", level: 1, stage: "🎒 外研三上·M6" },
  { id: 70, word: "book", phonetic: "/bʊk/", meaning: "书本", category: "文具", level: 1, stage: "🎒 外研三上·M6" },

  // --- Module 7: Birthday & Age (生日与庆祝) ---
  { id: 71, word: "happy", phonetic: "/ˈhæpi/", meaning: "快乐的/高兴的", category: "情绪", level: 1, stage: "🎒 外研三上·M7" },
  { id: 72, word: "birthday", phonetic: "/ˈbɜːθdeɪ/", meaning: "生日", category: "生活", level: 1, stage: "🎒 外研三上·M7" },
  { id: 73, word: "here", phonetic: "/hɪə/", meaning: "这里", category: "方位", level: 1, stage: "🎒 外研三上·M7" },
  { id: 74, word: "cake", phonetic: "/keɪk/", meaning: "蛋糕", category: "食物", level: 1, stage: "🎒 外研三上·M7" },
  { id: 75, word: "present", phonetic: "/ˈpreznt/", meaning: "礼物", category: "物品", level: 1, stage: "🎒 外研三上·M7" },
  { id: 76, word: "eat", phonetic: "/iːt/", meaning: "吃", category: "动作", level: 1, stage: "🎒 外研三上·M7" },

  // --- Module 8: Positions & Items (位置与寻物) ---
  { id: 77, word: "kite", phonetic: "/kaɪt/", meaning: "风筝", category: "玩具", level: 1, stage: "🎒 外研三上·M8" },
  { id: 78, word: "monster", phonetic: "/ˈmɒnstə/", meaning: "怪兽/怪物", category: "童话", level: 1, stage: "🎒 外研三上·M8" },
  { id: 79, word: "new", phonetic: "/njuː/", meaning: "新的", category: "特征", level: 1, stage: "🎒 外研三上·M8" },
  { id: 80, word: "no", phonetic: "/nəʊ/", meaning: "不/不是", category: "语气", level: 1, stage: "🎒 外研三上·M8" },
  { id: 81, word: "not", phonetic: "/nɒt/", meaning: "不/没有", category: "副词", level: 1, stage: "🎒 外研三上·M8" },
  { id: 82, word: "help", phonetic: "/help/", meaning: "帮助/救命", category: "动作", level: 1, stage: "🎒 外研三上·M8" },
  { id: 83, word: "where", phonetic: "/weə/", meaning: "在哪里", category: "疑问", level: 1, stage: "🎒 外研三上·M8" },
  { id: 84, word: "in", phonetic: "/ɪn/", meaning: "在...里面", category: "介词", level: 1, stage: "🎒 外研三上·M8" },
  { id: 85, word: "on", phonetic: "/ɒn/", meaning: "在...上面", category: "介词", level: 1, stage: "🎒 外研三上·M8" },
  { id: 86, word: "under", phonetic: "/ˈʌndə/", meaning: "在...下面", category: "介词", level: 1, stage: "🎒 外研三上·M8" },
  { id: 87, word: "bed", phonetic: "/bed/", meaning: "床", category: "家具", level: 1, stage: "🎒 外研三上·M8" },

  // --- Module 9: Family & Jobs (家庭与职业) ---
  { id: 88, word: "mother", phonetic: "/ˈmʌðə/", meaning: "母亲/妈妈", category: "家庭", level: 1, stage: "🎒 外研三上·M9" },
  { id: 89, word: "father", phonetic: "/ˈfɑːðə/", meaning: "父亲/爸爸", category: "家庭", level: 1, stage: "🎒 外研三上·M9" },
  { id: 90, word: "sister", phonetic: "/ˈsɪstə/", meaning: "姐妹", category: "家庭", level: 1, stage: "🎒 外研三上·M9" },
  { id: 91, word: "brother", phonetic: "/ˈbrʌðə/", meaning: "兄弟", category: "家庭", level: 1, stage: "🎒 外研三上·M9" },
  { id: 92, word: "grandpa", phonetic: "/ˈɡrænpɑː/", meaning: "爷爷/外公", category: "家庭", level: 1, stage: "🎒 外研三上·M9" },
  { id: 93, word: "grandma", phonetic: "/ˈɡrænmɑː/", meaning: "奶奶/外婆", category: "家庭", level: 1, stage: "🎒 外研三上·M9" },
  { id: 94, word: "doctor", phonetic: "/ˈdɒktə/", meaning: "医生", category: "职业", level: 1, stage: "🎒 外研三上·M9" },
  { id: 95, word: "driver", phonetic: "/ˈdraɪvə/", meaning: "司机", category: "职业", level: 1, stage: "🎒 外研三上·M9" },
  { id: 96, word: "policeman", phonetic: "/pəˈliːsmən/", meaning: "警察", category: "职业", level: 1, stage: "🎒 外研三上·M9" },
  { id: 97, word: "nurse", phonetic: "/nɜːs/", meaning: "护士", category: "职业", level: 1, stage: "🎒 外研三上·M9" },
  { id: 98, word: "farmer", phonetic: "/ˈfɑːmə/", meaning: "农民", category: "职业", level: 1, stage: "🎒 外研三上·M9" },
  { id: 99, word: "teacher", phonetic: "/ˈtiːtʃə/", meaning: "老师", category: "职业", level: 1, stage: "🎒 外研三上·M9" },
  { id: 100, word: "pupil", phonetic: "/ˈpjuːpl/", meaning: "小学生", category: "人物", level: 1, stage: "🎒 外研三上·M9" },

  // --- Module 10: Body Parts (身体部位与器官) ---
  { id: 101, word: "head", phonetic: "/hed/", meaning: "头", category: "身体", level: 1, stage: "🎒 外研三上·M10" },
  { id: 102, word: "arm", phonetic: "/ɑːm/", meaning: "手臂", category: "身体", level: 1, stage: "🎒 外研三上·M10" },
  { id: 103, word: "leg", phonetic: "/leɡ/", meaning: "腿", category: "身体", level: 1, stage: "🎒 外研三上·M10" },
  { id: 104, word: "foot", phonetic: "/fʊt/", meaning: "脚", category: "身体", level: 1, stage: "🎒 外研三上·M10" },
  { id: 105, word: "hand", phonetic: "/hænd/", meaning: "手", category: "身体", level: 1, stage: "🎒 外研三上·M10" },
  { id: 106, word: "eye", phonetic: "/aɪ/", meaning: "眼睛", category: "身体", level: 1, stage: "🎒 外研三上·M10" },
  { id: 107, word: "ear", phonetic: "/ɪə/", meaning: "耳朵", category: "身体", level: 1, stage: "🎒 外研三上·M10" },
  { id: 108, word: "nose", phonetic: "/nəʊz/", meaning: "鼻子", category: "身体", level: 1, stage: "🎒 外研三上·M10" },
  { id: 109, word: "mouth", phonetic: "/maʊθ/", meaning: "嘴巴", category: "身体", level: 1, stage: "🎒 外研三上·M10" },
  { id: 110, word: "body", phonetic: "/ˈbɒdi/", meaning: "身体", category: "身体", level: 1, stage: "🎒 外研三上·M10" },

  // ==========================================================================
  // 🎒 北京大兴区外研社版小学三年级起点 · 三年级下册 (Module 1 ~ Module 10)
  // ==========================================================================

  // --- Module 1: Alphabet & Song (字母与歌曲) ---
  { id: 111, word: "song", phonetic: "/sɒŋ/", meaning: "歌曲", category: "艺术", level: 1, stage: "🎒 外研三下·M1" },
  { id: 112, word: "TV", phonetic: "/ˌtiː ˈviː/", meaning: "电视", category: "生活", level: 1, stage: "🎒 外研三下·M1" },
  { id: 113, word: "favourite", phonetic: "/ˈfeɪvərɪt/", meaning: "最喜爱的", category: "品质", level: 1, stage: "🎒 外研三下·M1" },
  { id: 114, word: "colour", phonetic: "/ˈkʌlə/", meaning: "颜色", category: "艺术", level: 1, stage: "🎒 外研三下·M1" },
  { id: 115, word: "letter", phonetic: "/ˈletə/", meaning: "字母/信件", category: "学习", level: 1, stage: "🎒 外研三下·M1" },

  // --- Module 2: Zoo & Animals (动物园与特征描绘) ---
  { id: 116, word: "they", phonetic: "/ðeɪ/", meaning: "他们/它们", category: "代词", level: 1, stage: "🎒 外研三下·M2" },
  { id: 117, word: "monkey", phonetic: "/ˈmʌŋki/", meaning: "猴子", category: "动物", level: 1, stage: "🎒 外研三下·M2" },
  { id: 118, word: "baby", phonetic: "/ˈbeɪbi/", meaning: "幼兽/婴儿", category: "人物", level: 1, stage: "🎒 外研三下·M2" },
  { id: 119, word: "zoo", phonetic: "/zuː/", meaning: "动物园", category: "地点", level: 1, stage: "🎒 外研三下·M2" },
  { id: 120, word: "tiger", phonetic: "/ˈtaɪɡə/", meaning: "老虎", category: "动物", level: 1, stage: "🎒 外研三下·M2" },
  { id: 121, word: "lion", phonetic: "/ˈlaɪən/", meaning: "狮子", category: "动物", level: 1, stage: "🎒 外研三下·M2" },
  { id: 122, word: "elephant", phonetic: "/ˈelɪfənt/", meaning: "大象", category: "动物", level: 1, stage: "🎒 外研三下·M2" },
  { id: 123, word: "fat", phonetic: "/fæt/", meaning: "胖的", category: "特征", level: 1, stage: "🎒 外研三下·M2" },
  { id: 124, word: "thin", phonetic: "/θɪn/", meaning: "瘦的", category: "特征", level: 1, stage: "🎒 外研三下·M2" },
  { id: 125, word: "big", phonetic: "/bɪɡ/", meaning: "大的", category: "特征", level: 1, stage: "🎒 外研三下·M2" },
  { id: 126, word: "small", phonetic: "/smɔːl/", meaning: "小的", category: "特征", level: 1, stage: "🎒 外研三下·M2" },
  { id: 127, word: "tall", phonetic: "/tɔːl/", meaning: "高的", category: "特征", level: 1, stage: "🎒 外研三下·M2" },
  { id: 128, word: "short", phonetic: "/ʃɔːt/", meaning: "矮的/短的", category: "特征", level: 1, stage: "🎒 外研三下·M2" },

  // --- Module 3: Sports & Likes (喜好与运动项目) ---
  { id: 129, word: "like", phonetic: "/laɪk/", meaning: "喜欢", category: "情感", level: 1, stage: "🎒 外研三下·M3" },
  { id: 130, word: "football", phonetic: "/ˈfʊtbɔːl/", meaning: "足球", category: "运动", level: 1, stage: "🎒 外研三下·M3" },
  { id: 131, word: "basketball", phonetic: "/ˈbɑːskɪtbɔːl/", meaning: "篮球", category: "运动", level: 1, stage: "🎒 外研三下·M3" },
  { id: 132, word: "swim", phonetic: "/swɪm/", meaning: "游泳", category: "运动", level: 1, stage: "🎒 外研三下·M3" },
  { id: 133, word: "skip", phonetic: "/skɪp/", meaning: "跳绳", category: "运动", level: 1, stage: "🎒 外研三下·M3" },
  { id: 134, word: "bike", phonetic: "/baɪk/", meaning: "自行车", category: "交通", level: 1, stage: "🎒 外研三下·M3" },
  { id: 135, word: "ride", phonetic: "/raɪd/", meaning: "骑(自行车等)", category: "动作", level: 1, stage: "🎒 外研三下·M3" },

  // --- Module 4: Food & Drinks (食物与三餐饮食) ---
  { id: 136, word: "meat", phonetic: "/miːt/", meaning: "肉/肉类", category: "食物", level: 1, stage: "🎒 外研三下·M4" },
  { id: 137, word: "noodles", phonetic: "/ˈnuːdlz/", meaning: "面条", category: "食物", level: 1, stage: "🎒 外研三下·M4" },
  { id: 138, word: "rice", phonetic: "/raɪs/", meaning: "米饭", category: "食物", level: 1, stage: "🎒 外研三下·M4" },
  { id: 139, word: "fish", phonetic: "/fɪʃ/", meaning: "鱼/鱼肉", category: "食物", level: 1, stage: "🎒 外研三下·M4" },
  { id: 140, word: "milk", phonetic: "/mɪlk/", meaning: "牛奶", category: "食物", level: 1, stage: "🎒 外研三下·M4" },
  { id: 141, word: "pass", phonetic: "/pɑːs/", meaning: "传递/递给", category: "动作", level: 1, stage: "🎒 外研三下·M4" },
  { id: 142, word: "banana", phonetic: "/bəˈnɑːnə/", meaning: "香蕉", category: "水果", level: 1, stage: "🎒 外研三下·M4" },
  { id: 143, word: "apple", phonetic: "/ˈæpl/", meaning: "苹果", category: "水果", level: 1, stage: "🎒 外研三下·M4" },
  { id: 144, word: "pear", phonetic: "/peə/", meaning: "梨", category: "水果", level: 1, stage: "🎒 外研三下·M4" },

  // --- Module 5: Daily Routine & Go to Work (日常出行与活动) ---
  { id: 145, word: "go", phonetic: "/ɡəʊ/", meaning: "去/走", category: "动作", level: 1, stage: "🎒 外研三下·M5" },
  { id: 146, word: "work", phonetic: "/wɜːk/", meaning: "工作/上班", category: "动作", level: 1, stage: "🎒 外研三下·M5" },
  { id: 147, word: "by", phonetic: "/baɪ/", meaning: "乘/乘坐", category: "交通", level: 1, stage: "🎒 外研三下·M5" },
  { id: 148, word: "bus", phonetic: "/bʌs/", meaning: "公共汽车", category: "交通", level: 1, stage: "🎒 外研三下·M5" },
  { id: 149, word: "car", phonetic: "/kɑː/", meaning: "小汽车", category: "交通", level: 1, stage: "🎒 外研三下·M5" },
  { id: 150, word: "walk", phonetic: "/wɔːk/", meaning: "步行/散步", category: "动作", level: 1, stage: "🎒 外研三下·M5" },
  { id: 151, word: "fly", phonetic: "/flaɪ/", meaning: "放飞/飞行", category: "动作", level: 1, stage: "🎒 外研三下·M5" },
  { id: 152, word: "play", phonetic: "/pleɪ/", meaning: "玩/玩耍", category: "动作", level: 1, stage: "🎒 外研三下·M5" },

  // --- Module 6: Weekdays & Subjects (星期与学校课程) ---
  { id: 153, word: "Monday", phonetic: "/ˈmʌndeɪ/", meaning: "星期一", category: "星期", level: 1, stage: "🎒 外研三下·M6" },
  { id: 154, word: "Tuesday", phonetic: "/ˈtjuːzdeɪ/", meaning: "星期二", category: "星期", level: 1, stage: "🎒 外研三下·M6" },
  { id: 155, word: "Wednesday", phonetic: "/ˈwenzdeɪ/", meaning: "星期三", category: "星期", level: 1, stage: "🎒 外研三下·M6" },
  { id: 156, word: "Thursday", phonetic: "/ˈθɜːzdeɪ/", meaning: "星期四", category: "星期", level: 1, stage: "🎒 外研三下·M6" },
  { id: 157, word: "Friday", phonetic: "/ˈfraɪdeɪ/", meaning: "星期五", category: "星期", level: 1, stage: "🎒 外研三下·M6" },
  { id: 158, word: "Saturday", phonetic: "/ˈsætədeɪ/", meaning: "星期六", category: "星期", level: 1, stage: "🎒 外研三下·M6" },
  { id: 159, word: "Sunday", phonetic: "/ˈsʌndeɪ/", meaning: "星期日", category: "星期", level: 1, stage: "🎒 外研三下·M6" },
  { id: 160, word: "Chinese", phonetic: "/ˌtʃaɪˈniːz/", meaning: "语文/中文", category: "学科", level: 1, stage: "🎒 外研三下·M6" },
  { id: 161, word: "maths", phonetic: "/mæθs/", meaning: "数学", category: "学科", level: 1, stage: "🎒 外研三下·M6" },
  { id: 162, word: "art", phonetic: "/ɑːt/", meaning: "美术/艺术", category: "学科", level: 1, stage: "🎒 外研三下·M6" },
  { id: 163, word: "music", phonetic: "/ˈmjuːzɪk/", meaning: "音乐", category: "学科", level: 1, stage: "🎒 外研三下·M6" },
  { id: 164, word: "science", phonetic: "/ˈsaɪəns/", meaning: "科学", category: "学科", level: 1, stage: "🎒 外研三下·M6" },

  // --- Module 7: Seasons & Weather (季节与天气) ---
  { id: 165, word: "season", phonetic: "/ˈsiːzn/", meaning: "季节", category: "自然", level: 1, stage: "🎒 外研三下·M7" },
  { id: 166, word: "spring", phonetic: "/sprɪŋ/", meaning: "春天", category: "自然", level: 1, stage: "🎒 外研三下·M7" },
  { id: 167, word: "summer", phonetic: "/ˈsʌmə/", meaning: "夏天", category: "自然", level: 1, stage: "🎒 外研三下·M7" },
  { id: 168, word: "autumn", phonetic: "/ˈɔːtəm/", meaning: "秋天", category: "自然", level: 1, stage: "🎒 外研三下·M7" },
  { id: 169, word: "winter", phonetic: "/ˈwɪntə/", meaning: "冬天", category: "自然", level: 1, stage: "🎒 外研三下·M7" },
  { id: 170, word: "warm", phonetic: "/wɔːm/", meaning: "温暖的", category: "自然", level: 1, stage: "🎒 外研三下·M7" },
  { id: 171, word: "hot", phonetic: "/hɒt/", meaning: "炎热的", category: "自然", level: 1, stage: "🎒 外研三下·M7" },
  { id: 172, word: "cool", phonetic: "/kuːl/", meaning: "凉爽的", category: "自然", level: 1, stage: "🎒 外研三下·M7" },
  { id: 173, word: "cold", phonetic: "/kəʊld/", meaning: "寒冷的", category: "自然", level: 1, stage: "🎒 外研三下·M7" },
  { id: 174, word: "sunny", phonetic: "/ˈsʌni/", meaning: "晴朗的", category: "天气", level: 1, stage: "🎒 外研三下·M7" },
  { id: 175, word: "windy", phonetic: "/ˈwɪndi/", meaning: "刮风的", category: "天气", level: 1, stage: "🎒 外研三下·M7" },
  { id: 176, word: "rain", phonetic: "/reɪn/", meaning: "下雨/雨水", category: "天气", level: 1, stage: "🎒 外研三下·M7" },
  { id: 177, word: "snow", phonetic: "/snəʊ/", meaning: "下雪/雪花", category: "天气", level: 1, stage: "🎒 外研三下·M7" },

  // --- Module 8: Clothes (服装穿戴) ---
  { id: 178, word: "wear", phonetic: "/weə/", meaning: "穿/戴", category: "动作", level: 1, stage: "🎒 外研三下·M8" },
  { id: 179, word: "coat", phonetic: "/kəʊt/", meaning: "外套/大衣", category: "服饰", level: 1, stage: "🎒 外研三下·M8" },
  { id: 180, word: "sweater", phonetic: "/ˈswetə/", meaning: "毛衣", category: "服饰", level: 1, stage: "🎒 外研三下·M8" },
  { id: 181, word: "dress", phonetic: "/dres/", meaning: "连衣裙", category: "服饰", level: 1, stage: "🎒 外研三下·M8" },
  { id: 182, word: "trousers", phonetic: "/ˈtraʊzəz/", meaning: "裤子", category: "服饰", level: 1, stage: "🎒 外研三下·M8" },
  { id: 183, word: "hat", phonetic: "/hæt/", meaning: "帽子(礼帽/边帽)", category: "服饰", level: 1, stage: "🎒 外研三下·M8" },

  // --- Module 9: Animals & Sports (动物与物品) ---
  { id: 184, word: "animal", phonetic: "/ˈænɪml/", meaning: "动物", category: "动物", level: 1, stage: "🎒 外研三下·M9" },
  { id: 185, word: "sport", phonetic: "/spɔːt/", meaning: "体育运动", category: "运动", level: 1, stage: "🎒 外研三下·M9" },
  { id: 186, word: "shoe", phonetic: "/ʃuː/", meaning: "鞋子", category: "服饰", level: 1, stage: "🎒 外研三下·M9" },
  { id: 187, word: "sock", phonetic: "/sɒk/", meaning: "袜子", category: "服饰", level: 1, stage: "🎒 外研三下·M9" },

  // --- Module 10: Home & Rooms (居家房间与方位) ---
  { id: 188, word: "bedroom", phonetic: "/ˈbedruːm/", meaning: "卧室", category: "房间", level: 1, stage: "🎒 外研三下·M10" },
  { id: 189, word: "living room", phonetic: "/ˈlɪvɪŋ ruːm/", meaning: "客厅", category: "房间", level: 1, stage: "🎒 外研三下·M10" },
  { id: 190, word: "kitchen", phonetic: "/ˈkɪtʃɪn/", meaning: "厨房", category: "房间", level: 1, stage: "🎒 外研三下·M10" },
  { id: 191, word: "bathroom", phonetic: "/ˈbɑːθruːm/", meaning: "浴室/卫生间", category: "房间", level: 1, stage: "🎒 外研三下·M10" },
  { id: 192, word: "find", phonetic: "/faɪnd/", meaning: "找到/发现", category: "动作", level: 1, stage: "🎒 外研三下·M10" },

  // ==========================================================================
  // 📘 外研社四年级进阶词汇 (高频巩固与过渡拓展)
  // ==========================================================================
  { id: 193, word: "tree", phonetic: "/triː/", meaning: "树木", category: "自然", level: 1, stage: "📘 外研四年级" },
  { id: 194, word: "flower", phonetic: "/ˈflaʊə/", meaning: "花朵", category: "自然", level: 1, stage: "📘 外研四年级" },
  { id: 195, word: "friend", phonetic: "/frend/", meaning: "朋友", category: "人际", level: 1, stage: "📘 外研四年级" },
  { id: 196, word: "family", phonetic: "/ˈfæməli/", meaning: "家庭", category: "家庭", level: 1, stage: "📘 外研四年级" },
  { id: 197, word: "water", phonetic: "/ˈwɔːtə/", meaning: "水", category: "生活", level: 1, stage: "📘 外研四年级" },
  { id: 198, word: "sun", phonetic: "/sʌn/", meaning: "太阳", category: "自然", level: 1, stage: "📘 外研四年级" },
  { id: 199, word: "duck", phonetic: "/dʌk/", meaning: "鸭子", category: "动物", level: 1, stage: "📘 外研四年级" },
  { id: 200, word: "rabbit", phonetic: "/ˈræbɪt/", meaning: "兔子", category: "动物", level: 1, stage: "📘 外研四年级" }
];

// 生成更多拓展中小学大纲 3500 词库生成器，确保库容量庞大且质量上乘
(function enrichWordDatabase() {
  const common3500List = [
    ["ability", "/əˈbɪləti/", "能力", "能力", 2],
    ["abroad", "/əˈbrɔːd/", "在国外", "生活", 2],
    ["absent", "/ˈæbsənt/", "缺席的", "学校", 2],
    ["accept", "/əkˈsept/", "接受", "动作", 2],
    ["accident", "/ˈæksɪdənt/", "事故", "生活", 2],
    ["achieve", "/əˈtʃiːv/", "实现/达成", "成长", 3],
    ["across", "/əˈkrɒs/", "横穿/穿过", "方位", 1],
    ["action", "/ˈækʃn/", "行动", "动作", 2],
    ["active", "/ˈæktɪv/", "积极的", "品质", 2],
    ["activity", "/ækˈtɪvəti/", "活动", "学校", 2],
    ["actor", "/ˈæktə/", "演员", "职业", 1],
    ["address", "/əˈdres/", "地址", "生活", 2],
    ["advantage", "/ədˈvɑːntɪdʒ/", "优势", "学习", 3],
    ["advice", "/ədˈvaɪs/", "建议", "人际", 2],
    ["afraid", "/əˈfreɪd/", "害怕的", "情绪", 1],
    ["afternoon", "/ˌɑːftəˈnuːn/", "下午", "时间", 1],
    ["agree", "/əˈɡriː/", "同意", "动作", 2],
    ["airplane", "/ˈeəpleɪn/", "飞机", "交通", 1],
    ["alarm", "/əˈlɑːm/", "警报/闹钟", "用品", 2],
    ["album", "/ˈælbəm/", "相册/专辑", "生活", 2],
    ["allow", "/əˈlaʊ/", "允许", "动作", 2],
    ["almost", "/ˈɔːlməʊst/", "几乎", "副词", 2],
    ["alone", "/əˈləʊn/", "独自的", "状态", 2],
    ["along", "/əˈlɒŋ/", "沿着", "方位", 1],
    ["aloud", "/əˈlaʊd/", "大声地", "副词", 2],
    ["alphabet", "/ˈælfəbet/", "字母表", "学习", 1],
    ["already", "/ɔːlˈredi/", "已经", "副词", 2],
    ["always", "/ˈɔːlweɪz/", "总是", "频率", 1],
    ["amazing", "/əˈmeɪzɪŋ/", "令人惊叹的", "评价", 2],
    ["ambulance", "/ˈæmbjələns/", "救护车", "交通", 2],
    ["among", "/əˈmʌŋ/", "在...之中", "方位", 2],
    ["ancient", "/ˈeɪnʃənt/", "古老的", "历史", 3],
    ["angel", "/ˈeɪndʒl/", "天使", "童话", 2],
    ["angry", "/ˈæŋɡri/", "生气的", "情绪", 1],
    ["animal", "/ˈænɪml/", "动物", "动物", 1],
    ["anniversary", "/ˌænɪˈvɜːsəri/", "周年纪念", "生活", 3],
    ["announce", "/əˈnaʊns/", "宣布", "动作", 3],
    ["another", "/əˈnʌðə/", "另一个", "代词", 1],
    ["anxious", "/ˈæŋkʃəs/", "焦虑的", "情绪", 3],
    ["apologize", "/əˈpɒlədʒaɪz/", "道歉", "人际", 3],
    ["appear", "/əˈpɪə/", "出现", "动作", 2],
    ["applause", "/əˈplɔːz/", "鼓掌欢呼", "生活", 3],
    ["apply", "/əˈplaɪ/", "申请/应用", "动作", 3],
    ["appointment", "/əˈpɔɪntmənt/", "约定", "生活", 3],
    ["appreciate", "/əˈpriːʃieɪt/", "感激/欣赏", "美德", 3],
    ["area", "/ˈeəriə/", "区域/面积", "空间", 2],
    ["arm", "/ɑːm/", "手臂", "身体", 1],
    ["army", "/ˈɑːmi/", "军队", "社会", 2],
    ["around", "/əˈraʊnd/", "在周围", "方位", 1],
    ["arrive", "/əˈraɪv/", "到达", "动作", 1],
    ["art", "/ɑːt/", "艺术", "艺术", 1],
    ["artist", "/ˈɑːtɪst/", "艺术家", "职业", 1],
    ["ashamed", "/əˈʃeɪmd/", "惭愧的", "情绪", 3],
    ["asleep", "/əˈsliːp/", "睡着的", "状态", 2],
    ["assistant", "/əˈsɪstənt/", "助手", "职业", 3],
    ["attack", "/əˈtæk/", "攻击", "动作", 2],
    ["attend", "/əˈtend/", "参加", "动作", 2],
    ["attention", "/əˈtenʃn/", "注意力", "学习", 2],
    ["attract", "/əˈtrækt/", "吸引", "动作", 3],
    ["attractive", "/əˈtræktɪv/", "有吸引力的", "品质", 3],
    ["audience", "/ˈɔːdiəns/", "观众", "社会", 3],
    ["aunt", "/ɑːnt/", "姑姨婶", "家庭", 1],
    ["author", "/ˈɔːθə/", "作者", "职业", 2],
    ["automatic", "/ˌɔːtəˈmætɪk/", "自动的", "科技", 3],
    ["available", "/əˈveɪləbl/", "可用的/有空的", "状态", 3],
    ["average", "/ˈævərɪdʒ/", "平均的", "概念", 2],
    ["avoid", "/əˈvɔɪd/", "避免", "动作", 3],
    ["awake", "/əˈweɪk/", "醒着的", "状态", 2],
    ["award", "/əˈwɔːd/", "奖项", "荣誉", 2],
    ["backpack", "/ˈbækpæk/", "双肩背包", "用品", 1],
    ["badminton", "/ˈbædmɪntən/", "羽毛球", "运动", 1],
    ["bakery", "/ˈbeɪkəri/", "面包店", "地点", 2],
    ["balance", "/ˈbæləns/", "平衡", "概念", 2],
    ["balloon", "/bəˈluːn/", "气球", "趣味", 1],
    ["bamboo", "/bæmˈbuː/", "竹子", "植物", 1],
    ["bank", "/bæŋk/", "银行/河岸", "地点", 1],
    ["barbecue", "/ˈbɑːbɪkjuː/", "烧烤", "食物", 2],
    ["baseball", "/ˈbeɪsbɔːl/", "棒球", "运动", 1],
    ["basement", "/ˈbeɪsmənt/", "地下室", "建筑", 2],
    ["battery", "/ˈbætəri/", "电池", "科技", 2],
    ["battle", "/ˈbætl/", "战役", "社会", 2],
    ["beach", "/biːtʃ/", "海滩", "自然", 1],
    ["beautiful", "/ˈbjuːtɪfl/", "美丽的", "评价", 1],
    ["bedroom", "/ˈbedruːm/", "卧室", "家庭", 1],
    ["beehive", "/ˈbiːhaɪv/", "蜂窝", "自然", 2],
    ["beetle", "/ˈbiːtl/", "甲虫", "昆虫", 2],
    ["beginner", "/bɪˈɡɪnə/", "初学者", "成长", 2],
    ["behave", "/bɪˈheɪv/", "表现/守规矩", "行为", 2],
    ["belief", "/bɪˈliːf/", "信念", "精神", 3],
    ["belong", "/bɪˈlɒŋ/", "属于", "动作", 2],
    ["benefit", "/ˈbenɪfɪt/", "益处", "概念", 3],
    ["beside", "/bɪˈsaɪd/", "在旁边", "方位", 1],
    ["between", "/bɪˈtwiːn/", "在两者之间", "方位", 1],
    ["beyond", "/bɪˈjɒnd/", "超越", "空间", 3],
    ["biology", "/baɪˈɒlədʒi/", "生物学", "科学", 3],
    ["biscuit", "/ˈbɪskɪt/", "饼干", "食物", 1],
    ["bitter", "/ˈbɪtə/", "苦的", "味觉", 2],
    ["blanket", "/ˈblæŋkɪt/", "毛毯", "用品", 2],
    ["blessing", "/ˈblesɪŋ/", "祝福", "情感", 2],
    ["blind", "/blaɪnd/", "盲的", "身体", 2],
    ["blood", "/blʌd/", "血液", "身体", 2],
    ["blossom", "/ˈblɒsəm/", "开花/花簇", "自然", 2],
    ["board", "/bɔːd/", "木板/登机", "物品", 1],
    ["bottle", "/ˈbɒtl/", "瓶子", "用品", 1],
    ["bounce", "/baʊns/", "弹跳", "动作", 2],
    ["boundary", "/ˈbaʊndri/", "边界", "概念", 3],
    ["bowl", "/bəʊl/", "碗", "用品", 1],
    ["brain", "/breɪn/", "大脑", "身体", 2],
    ["branch", "/brɑːntʃ/", "树枝/分支", "自然", 2],
    ["breeze", "/briːz/", "微风", "自然", 2],
    ["brick", "/brɪk/", "砖头", "材料", 2],
    ["bridge", "/brɪdʒ/", "桥梁", "建筑", 1],
    ["bright", "/braɪt/", "明亮的/聪颖的", "特征", 1],
    ["broom", "/bruːm/", "扫帚", "用品", 2],
    ["brush", "/brʌʃ/", "刷子/刷", "用品", 1],
    ["bubble", "/ˈbʌbl/", "气泡/泡泡", "趣味", 1],
    ["build", "/bɪld/", "建造", "动作", 1],
    ["bulletin", "/ˈbʊlətɪn/", "简报/告示", "信息", 3],
    ["butterfly", "/ˈbʌtəflaɪ/", "蝴蝶", "昆虫", 1],
    ["button", "/ˈbʌtn/", "按钮/纽扣", "用品", 1],
    ["cabbage", "/ˈkæbɪdʒ/", "卷心菜", "蔬菜", 1],
    ["cabin", "/ˈkæbɪn/", "小木屋/机舱", "建筑", 2],
    ["calendar", "/ˈkælɪndə/", "日历", "时间", 1],
    ["camera", "/ˈkæmərə/", "照相机", "数码", 1],
    ["camp", "/kæmp/", "露营", "活动", 1],
    ["candle", "/ˈkændl/", "蜡烛", "生活", 1],
    ["candy", "/ˈkændi/", "糖果", "食物", 1],
    ["canyon", "/ˈkænjən/", "峡谷", "地理", 3],
    ["captain", "/ˈkæptɪn/", "队长/船长", "角色", 2],
    ["careful", "/ˈkeəfl/", "小心的/细致的", "品质", 1],
    ["carpet", "/ˈkɑːpɪt/", "地毯", "家具", 2],
    ["carrot", "/ˈkærət/", "胡萝卜", "蔬菜", 1],
    ["cartoon", "/kɑːˈtuːn/", "动画片", "艺术", 1],
    ["castle", "/ˈkɑːsl/", "城堡", "建筑", 2],
    ["caterpillar", "/ˈkætəpɪlə/", "毛毛虫", "昆虫", 2],
    ["celebration", "/ˌselɪˈbreɪʃn/", "庆祝典礼", "生活", 3],
    ["century", "/ˈsentʃəri/", "世纪/百年", "时间", 3],
    ["cereal", "/ˈsɪəriəl/", "谷物/麦片", "食物", 2],
    ["ceremony", "/ˈserəməni/", "典礼/仪式", "生活", 3],
    ["chalk", "/tʃɔːk/", "粉笔", "学校", 1],
    ["channel", "/ˈtʃænl/", "频道/水道", "媒体", 2],
    ["character", "/ˈkærəktə/", "性格/汉字/角色", "人文", 2],
    ["charity", "/ˈtʃærəti/", "慈善", "美德", 3],
    ["cheer", "/tʃɪə/", "欢呼/喝彩", "情绪", 2],
    ["cheese", "/tʃiːz/", "奶酪", "食物", 1],
    ["chemist", "/ˈkemɪst/", "化学家/药剂师", "职业", 3],
    ["chess", "/tʃes/", "国际象棋", "游戏", 1],
    ["chestnut", "/ˈtʃesnʌt/", "板栗", "食物", 2],
    ["chimney", "/ˈtʃɪmni/", "烟囱", "建筑", 2],
    ["chocolate", "/ˈtʃɒklət/", "巧克力", "食物", 1],
    ["circle", "/ˈsɜːkl/", "圆圈/环绕", "形状", 1],
    ["circus", "/ˈsɜːkəs/", "马戏团", "娱乐", 2],
    ["citizen", "/ˈsɪtɪzn/", "公民/市民", "社会", 3],
    ["classroom", "/ˈklɑːsruːm/", "教室", "学校", 1],
    ["clever", "/ˈklevə/", "聪明的", "品质", 1],
    ["climb", "/klaɪm/", "攀登/爬", "运动", 1],
    ["clinic", "/ˈklɪnɪk/", "诊所", "地点", 2],
    ["coast", "/kəʊst/", "海岸", "地理", 2],
    ["coconut", "/ˈkəʊkənʌt/", "椰子", "水果", 2],
    ["collect", "/kəˈlekt/", "收集", "动作", 2],
    ["colleague", "/ˈkɒliːɡ/", "同事", "职业", 3],
    ["colorful", "/ˈkʌləfl/", "五彩缤纷的", "评价", 1],
    ["comfortable", "/ˈkʌmftəbl/", "舒服的", "生活", 2],
    ["comic", "/ˈkɒmɪk/", "连环画/滑稽的", "阅读", 2],
    ["common", "/ˈkɒmən/", "普通的/常见的", "概念", 2],
    ["communicate", "/kəˈmjuːnɪkeɪt/", "交流/沟通", "人际", 3],
    ["community", "/kəˈmjuːnəti/", "社区", "社会", 3],
    ["companion", "/kəmˈpæniən/", "同伴/伴侣", "人际", 3],
    ["compare", "/kəmˈpeə/", "比较", "学习", 2],
    ["compass", "/ˈkʌmpəs/", "指南针/圆规", "工具", 2],
    ["compete", "/kəmˈpiːt/", "竞争/比赛", "运动", 3],
    ["complete", "/kəmˈpliːt/", "完成/完整的", "动作", 2],
    ["compose", "/kəmˈpəʊz/", "创作/谱曲", "艺术", 3],
    ["computer", "/kəmˈpjuːtə/", "电脑", "科技", 1],
    ["concentrate", "/ˈkɒnsntreɪt/", "专心/集中", "智育", 3],
    ["condition", "/kənˈdɪʃn/", "条件/状况", "概念", 3],
    ["confident", "/ˈkɒnfɪdənt/", "自信的", "品质", 2],
    ["congratulation", "/kənˌɡrætʃuˈleɪʃn/", "祝贺", "社交", 2],
    ["connect", "/kəˈnekt/", "连接", "科技", 2],
    ["consider", "/kənˈsɪdə/", "考虑/认为", "思维", 3],
    ["continent", "/ˈkɒntɪnənt/", "大洲/大陆", "地理", 3],
    ["continue", "/kənˈtɪnjuː/", "继续", "动作", 2],
    ["control", "/kənˈtrəʊl/", "控制", "动作", 2],
    ["convenient", "/kənˈviːniənt/", "便利的", "生活", 2],
    ["conversation", "/ˌkɒnvəˈseɪʃn/", "交谈/对话", "人际", 2],
    ["cooperate", "/kəʊˈɒpəreɪt/", "合作", "人际", 3],
    ["corner", "/ˈkɔːnə/", "角落/转角", "方位", 1],
    ["correct", "/kəˈrekt/", "正确的/纠正", "学习", 1],
    ["costume", "/ˈkɒstjuːm/", "戏服/演出服", "生活", 2],
    ["cottage", "/ˈkɒtɪdʒ/", "农舍/小屋", "建筑", 2],
    ["cotton", "/ˈkɒtn/", "棉花/棉织品", "材料", 2],
    ["cough", "/kɒf/", "咳嗽", "健康", 2],
    ["country", "/ˈkʌntri/", "国家/乡村", "地理", 1],
    ["crayon", "/ˈkreɪən/", "彩色蜡笔", "学习", 1],
    ["cricket", "/ˈkrɪkɪt/", "蟋蟀/板球", "昆虫", 2],
    ["crowd", "/kraʊd/", "人群", "社会", 2],
    ["crystal", "/ˈkrɪstl/", "水晶/清澈的", "物品", 3],
    ["cucumber", "/ˈkjuːkʌmbə/", "黄瓜", "蔬菜", 1],
    ["cure", "/kjʊə/", "治愈", "健康", 3],
    ["curtain", "/ˈkɜːtn/", "窗帘", "家居", 2],
    ["cushion", "/ˈkʊʃn/", "靠垫/坐垫", "家居", 2],
    ["customer", "/ˈkʌstəmə/", "顾客", "社会", 2],
    ["cycling", "/ˈsaɪklɪŋ/", "骑车运动", "运动", 1],
    ["daily", "/ˈdeɪli/", "每日的/日常的", "时间", 2],
    ["danger", "/ˈdeɪndʒə/", "危险", "警示", 1],
    ["daughter", "/ˈdɔːtə/", "女儿", "家庭", 1],
    ["daylight", "/ˈdeɪlaɪt/", "白昼/日光", "自然", 2],
    ["daydream", "/ˈdeɪdriːm/", "白日梦", "思维", 2],
    ["decide", "/dɪˈsaɪd/", "决定", "思维", 2],
    ["decorate", "/ˈdekəreɪt/", "装饰/布置", "生活", 2],
    ["decrease", "/dɪˈkriːs/", "减少", "概念", 3],
    ["deep", "/diːp/", "深的", "空间", 1],
    ["delicious", "/dɪˈlɪʃəs/", "美味的", "食物", 1],
    ["deliver", "/dɪˈlɪvə/", "投递/传送", "生活", 2],
    ["dentist", "/ˈdentɪst/", "牙医", "职业", 2],
    ["depend", "/dɪˈpend/", "依赖/依靠", "动作", 3],
    ["describe", "/dɪˈskraɪb/", "描述", "学习", 2],
    ["desert", "/ˈdezət/", "沙漠", "地理", 2],
    ["destroy", "/dɪˈstrɔɪ/", "破坏/摧毁", "动作", 3],
    ["detective", "/dɪˈtektɪv/", "侦探", "职业", 2],
    ["determine", "/dɪˈtɜːmɪn/", "下定决心", "品质", 3],
    ["develop", "/dɪˈveləp/", "发展/培养", "成长", 3],
    ["dialogue", "/ˈdaɪəlɒɡ/", "对话", "学习", 2],
    ["diamond", "/ˈdaɪəmənd/", "钻石", "物品", 2],
    ["diary", "/ˈdaɪəri/", "日记", "生活", 1],
    ["dictionary", "/ˈdɪkʃənri/", "字典/词典", "学习", 1],
    ["difference", "/ˈdɪfrəns/", "差异/不同", "概念", 2],
    ["difficult", "/ˈdɪfɪkəlt/", "困难的", "挑战", 1],
    ["dig", "/dɪɡ/", "挖掘", "动作", 1],
    ["direction", "/dəˈrekʃn/", "方向/指引", "方位", 2],
    ["disaster", "/dɪˈzɑːstə/", "灾难", "自然", 3],
    ["discuss", "/dɪˈskʌs/", "讨论", "学习", 2],
    ["disease", "/dɪˈziːz/", "疾病", "健康", 3],
    ["dish", "/dɪʃ/", "盘子/菜肴", "食物", 1],
    ["distance", "/ˈdɪstəns/", "距离", "空间", 2],
    ["divide", "/dɪˈvaɪd/", "划分/除以", "动作", 2],
    ["dolphin", "/ˈdɒlfɪn/", "海豚", "动物", 1],
    ["dragon", "/ˈdræɡən/", "龙", "神话", 1],
    ["drawer", "/drɔː/", "抽屉", "家具", 2],
    ["dream", "/driːm/", "梦想/做梦", "心理", 1],
    ["drill", "/drɪl/", "钻头/演练", "工具", 2],
    ["drop", "/drɒp/", "滴/掉落", "动作", 1],
    ["drum", "/drʌm/", "鼓", "乐器", 1],
    ["dust", "/dʌst/", "灰尘", "生活", 2],
    ["duty", "/ˈdjuːti/", "职责/责任", "美德", 2],
    ["eagle", "/ˈiːɡl/", "老鹰", "动物", 2],
    ["earthquake", "/ˈɜːθkweɪk/", "地震", "自然", 3],
    ["easily", "/ˈiːzəli/", "容易地", "副词", 1],
    ["echo", "/ˈekəʊ/", "回声", "自然", 2],
    ["ecology", "/iˈkɒlədʒi/", "生态学", "科学", 3],
    ["educate", "/ˈedʒukeɪt/", "教育", "学习", 3],
    ["effect", "/ɪˈfekt/", "效果/影响", "概念", 3],
    ["effort", "/ˈefət/", "努力", "品质", 2],
    ["electric", "/ɪˈlektrɪk/", "电动的", "科技", 2],
    ["electronic", "/ɪˌlekˈtrɒnɪk/", "电子的", "科技", 2],
    ["element", "/ˈelɪmənt/", "元素/要素", "科学", 3],
    ["elevator", "/ˈelɪveɪtə/", "电梯", "建筑", 2],
    ["embarrass", "/ɪmˈbærəs/", "使尴尬", "情绪", 3],
    ["emergency", "/iˈmɜːdʒənsi/", "紧急情况", "生活", 3],
    ["emotion", "/ɪˈməʊʃn/", "情感/情绪", "心理", 2],
    ["encourage", "/ɪnˈkʌrɪdʒ/", "鼓励", "品质", 2],
    ["engine", "/ˈendʒɪn/", "引擎/发动机", "科技", 2],
    ["engineer", "/ˌendʒɪˈnɪə/", "工程师", "职业", 2],
    ["enormous", "/ɪˈnɔːməs/", "庞大的", "特征", 3],
    ["enthusiastic", "/ɪnˌθjuːziˈæstɪk/", "热情的", "品质", 3],
    ["envelope", "/ˈenvələʊp/", "信封", "用品", 2],
    ["equal", "/ˈiːkwəl/", "平等的/等于", "概念", 2],
    ["equipment", "/ɪˈkwɪpmənt/", "装备/设备", "生活", 3],
    ["escape", "/ɪˈskeɪp/", "逃跑/逃脱", "动作", 2],
    ["especially", "/ɪˈspeʃəli/", "尤其是/特别", "副词", 2],
    ["essay", "/ˈeseɪ/", "短文/作文", "学校", 2],
    ["exact", "/ɪɡˈzækt/", "准确的", "品质", 2],
    ["examination", "/ɪɡˌzæmɪˈneɪʃn/", "考试/检查", "学校", 2],
    ["example", "/ɪɡˈzɑːmpl/", "例子/榜样", "学习", 1],
    ["excellent", "/ˈeksələnt/", "优秀的", "评价", 2],
    ["excited", "/ɪkˈsaɪtɪd/", "兴奋的", "情绪", 1],
    ["exercise", "/ˈeksəsaɪz/", "锻炼/练习", "健康", 1],
    ["exhibition", "/ˌeksɪˈbɪʃn/", "展览", "文化", 3],
    ["exist", "/ɪɡˈzɪst/", "存在", "概念", 3],
    ["expect", "/ɪkˈspekt/", "期盼/期望", "心理", 2],
    ["expensive", "/ɪkˈspensɪv/", "昂贵的", "生活", 1],
    ["experience", "/ɪkˈspɪəriəns/", "经验/经历", "成长", 2],
    ["experiment", "/ɪkˈsperɪmənt/", "实验", "科学", 2],
    ["expert", "/ˈekspɜːt/", "专家", "职业", 3],
    ["explain", "/ɪkˈspleɪn/", "解释/说明", "学习", 2],
    ["explore", "/ɪkˈsplɔː/", "探索", "探索", 2],
    ["express", "/ɪkˈspres/", "表达", "人际", 2],
    ["extreme", "/ɪkˈstriːm/", "极端的/极度的", "程度", 3],
    ["eyebrow", "/ˈaɪbraʊ/", "眉毛", "身体", 2],
    ["factory", "/ˈfæktri/", "工厂", "社会", 2],
    ["failure", "/ˈfeɪljə/", "失败", "成长", 3],
    ["fairytale", "/ˈfeəriteɪl/", "童话故事", "文学", 1],
    ["faithful", "/ˈfeɪθfl/", "忠诚的", "品质", 3],
    ["familiar", "/fəˈmɪliə/", "熟悉的", "人际", 3],
    ["famous", "/ˈfeɪməs/", "著名的", "评价", 1],
    ["farmer", "/ˈfɑːmə/", "农民", "职业", 1],
    ["fasten", "/ˈfɑːsn/", "系牢/拴紧", "动作", 2],
    ["favourite", "/ˈfeɪvərɪt/", "最喜爱的", "情感", 1],
    ["feather", "/ˈfeðə/", "羽毛", "动物", 2],
    ["feeling", "/ˈfiːlɪŋ/", "感觉/感情", "心理", 1],
    ["festival", "/ˈfestɪvl/", "节日", "文化", 1],
    ["fever", "/ˈfiːvə/", "发烧", "健康", 1],
    ["field", "/fiːld/", "田野/运动场", "自然", 1],
    ["fight", "/faɪt/", "战斗/打架", "动作", 2],
    ["figure", "/ˈfɪɡə/", "人物/数字", "概念", 3],
    ["finally", "/ˈfaɪnəli/", "最终/最后", "时间", 1],
    ["finger", "/ˈfɪŋɡə/", "手指", "身体", 1],
    ["firework", "/ˈfaɪəwɜːk/", "烟花", "生活", 1],
    ["flashlight", "/ˈflæʃlaɪt/", "手电筒", "用品", 2],
    ["flavour", "/ˈfleɪvə/", "风味/味道", "感官", 2],
    ["flight", "/flaɪt/", "航班/飞行", "交通", 2],
    ["float", "/fləʊt/", "漂浮", "动作", 2],
    ["flood", "/flʌd/", "洪水", "自然", 3],
    ["flour", "/ˈflaʊə/", "面粉", "食物", 2],
    ["fly", "/flaɪ/", "飞行/苍蝇", "动作", 1],
    ["focus", "/ˈfəʊkəs/", "焦点/集中", "智育", 2],
    ["foggy", "/ˈfɒɡi/", "有雾的", "天气", 1],
    ["follow", "/ˈfɒləʊ/", "跟随/遵守", "动作", 1],
    ["foolish", "/ˈfuːlɪʃ/", "愚蠢的", "评价", 2],
    ["forehead", "/ˈfɔːhed/", "额头", "身体", 2],
    ["foreign", "/ˈfɒrən/", "外国的", "社会", 2],
    ["forgive", "/fəˈɡɪv/", "原谅", "美德", 2],
    ["fork", "/fɔːk/", "叉子", "用餐", 1],
    ["fountain", "/ˈfaʊntɪn/", "喷泉", "景观", 2],
    ["freezing", "/ˈfriːzɪŋ/", "极冷的/冰冻的", "感官", 2],
    ["frequent", "/ˈfriːkwənt/", "频繁的", "频率", 3],
    ["fresh", "/freʃ/", "新鲜的", "食物", 1],
    ["fridge", "/frɪdʒ/", "冰箱", "家电", 1],
    ["friendship", "/ˈfrendʃɪp/", "友谊", "人际", 2],
    ["frog", "/frɒɡ/", "青蛙", "动物", 1],
    ["frost", "/frɒst/", "霜冻", "天气", 2],
    ["fruit", "/fruːt/", "水果", "食物", 1],
    ["fry", "/fraɪ/", "油炸/煎", "烹饪", 1],
    ["furniture", "/ˈfɜːnɪtʃə/", "家具", "家居", 2],
    ["garage", "/ˈɡærɑːʒ/", "车库", "建筑", 2],
    ["garbage", "/ˈɡɑːbɪdʒ/", "垃圾", "生活", 1],
    ["garlic", "/ˈɡɑːlɪk/", "大蒜", "蔬菜", 2],
    ["gentle", "/ˈdʒentl/", "温和的", "品质", 2],
    ["geography", "/dʒiˈɒɡrəfi/", "地理", "学科", 2],
    ["giant", "/ˈdʒaɪənt/", "巨大的/巨人", "特征", 2],
    ["giraffe", "/dʒəˈrɑːf/", "长颈鹿", "动物", 1],
    ["glance", "/ɡlɑːns/", "瞥一眼", "动作", 2],
    ["global", "/ˈɡləʊbl/", "全球的", "视野", 3],
    ["glove", "/ɡlʌv/", "手套", "服饰", 1],
    ["glue", "/ɡluː/", "胶水", "工具", 1],
    ["goal", "/ɡəʊl/", "目标/进球", "成长", 2],
    ["goat", "/ɡəʊt/", "山羊", "动物", 1],
    ["golden", "/ˈɡəʊldən/", "金色的", "颜色", 1],
    ["goodness", "/ˈɡʊdnəs/", "善良/天哪", "美德", 2],
    ["goose", "/ɡuːs/", "鹅", "动物", 1],
    ["government", "/ˈɡʌvənmənt/", "政府", "社会", 3],
    ["gradual", "/ˈɡrædʒuəl/", "逐渐的", "过程", 3],
    ["graduate", "/ˈɡrædʒueɪt/", "毕业", "学习", 3],
    ["grammar", "/ˈɡræmə/", "语法", "学习", 2],
    ["grandparent", "/ˈɡrænpeərənt/", "祖父母/外祖父母", "家庭", 1],
    ["grasshopper", "/ˈɡrɑːshɒpə/", "蚂蚱/蝗虫", "昆虫", 2],
    ["grateful", "/ˈɡreɪtfl/", "感激的", "美德", 3],
    ["greeting", "/ˈɡriːtɪŋ/", "问候", "社交", 2],
    ["grocer", "/ˈɡrəʊsə/", "杂货商/食品店", "生活", 2],
    ["ground", "/ɡraʊnd/", "地面", "自然", 1],
    ["growth", "/ɡrəʊθ/", "成长/生长", "成长", 2],
    ["guard", "/ɡɑːd/", "保卫/守卫", "动作", 2],
    ["guess", "/ɡes/", "猜测", "思维", 1],
    ["guest", "/ɡest/", "客人", "社交", 2],
    ["guidance", "/ˈɡaɪdns/", "指导/引领", "学习", 3],
    ["guitar", "/ɡɪˈtɑː/", "吉他", "乐器", 1],
    ["habit", "/ˈhæbɪt/", "习惯", "成长", 2],
    ["haircut", "/ˈheəkʌt/", "理发", "生活", 1],
    ["hammer", "/ˈhæmə/", "铁锤", "工具", 2],
    ["handsome", "/ˈhænsəm/", "英俊的", "外貌", 2],
    ["handwriting", "/ˈhændraɪtɪŋ/", "书法/笔迹", "学习", 2],
    ["hang", "/hæŋ/", "悬挂", "动作", 2],
    ["happen", "/ˈhæpən/", "发生", "动作", 1],
    ["harbour", "/ˈhɑːbə/", "海港/港口", "地理", 3],
    ["hardworking", "/ˌhɑːdˈwɜːkɪŋ/", "勤勉努力的", "品质", 2],
    ["harmful", "/ˈhɑːmfl/", "有害的", "特征", 2],
    ["harmony", "/ˈhɑːməni/", "和谐", "美德", 3],
    ["harvest", "/ˈhɑːvɪst/", "丰收/收获", "自然", 2],
    ["headline", "/ˈhedlaɪn/", "头条新闻", "信息", 3],
    ["headache", "/ˈhedeɪk/", "头痛", "健康", 1],
    ["health", "/helθ/", "健康", "身体", 1],
    ["heart", "/hɑːt/", "心脏/内心", "身体", 1],
    ["heater", "/ˈhiːtə/", "暖气/加热器", "家居", 2],
    ["heavy", "/ˈhevi/", "沉重的", "特征", 1],
    ["height", "/haɪt/", "高度/身高", "测量", 2],
    ["helicopter", "/ˈhelɪkɒptə/", "直升飞机", "交通", 2],
    ["helpful", "/ˈhelpfl/", "有帮助的", "品质", 1],
    ["hero", "/ˈhɪərəʊ/", "英雄", "人物", 1],
    ["hesitate", "/ˈhezɪteɪt/", "犹豫", "心理", 3],
    ["hike", "/haɪk/", "徒步远足", "运动", 2],
    ["history", "/ˈhɪstri/", "历史", "学科", 1],
    ["hobby", "/ˈhɒbi/", "业余爱好", "生活", 1],
    ["holiday", "/ˈhɒlədeɪ/", "假期", "生活", 1],
    ["honey", "/ˈhʌni/", "蜂蜜", "食物", 1],
    ["honour", "/ˈɒnə/", "荣誉", "美德", 3],
    ["hopeful", "/ˈhəʊpfl/", "抱有希望的", "情绪", 2],
    ["horrible", "/ˈhɒrəbl/", "可怕的", "评价", 2],
    ["horse", "/hɔːs/", "马", "动物", 1],
    ["hug", "/hʌɡ/", "拥抱", "情感", 1],
    ["huge", "/hjuːdʒ/", "庞大的", "特征", 2],
    ["humorous", "/ˈhjuːmərəs/", "幽默的", "品质", 3],
    ["hunger", "/ˈhʌŋɡə/", "饥饿", "感觉", 2],
    ["hunter", "/ˈhʌntə/", "猎人", "职业", 2],
    ["hurry", "/ˈhʌri/", "赶快/匆忙", "动作", 1],
    ["iceberg", "/ˈaɪsbɜːɡ/", "冰山", "自然", 3],
    ["idea", "/aɪˈdɪə/", "想法/主意", "思维", 1],
    ["identity", "/aɪˈdentəti/", "身份", "社会", 3],
    ["ignore", "/ɪɡˈnɔː/", "忽略", "动作", 3],
    ["illness", "/ˈɪlnəs/", "疾病", "健康", 2],
    ["imitate", "/ˈɪmɪteɪt/", "模仿", "学习", 3],
    ["immediate", "/ɪˈmiːdiət/", "立即的", "时间", 3],
    ["immense", "/ɪˈmens/", "广阔巨大的", "空间", 3],
    ["important", "/ɪmˈpɔːtnt/", "重要的", "评价", 1],
    ["impossible", "/ɪmˈpɒsəbl/", "不可能的", "评价", 2],
    ["improve", "/ɪmˈpruːv/", "改进/提高", "成长", 2],
    ["include", "/ɪnˈkluːd/", "包括", "逻辑", 2],
    ["income", "/ˈɪnkʌm/", "收入", "经济", 3],
    ["increase", "/ɪnˈkriːs/", "增加", "概念", 2],
    ["industry", "/ˈɪndəstri/", "工业/行业", "社会", 3],
    ["infer", "/ɪnˈfɜː/", "推断", "思维", 3],
    ["inform", "/ɪnˈfɔːm/", "告知/通知", "交流", 3],
    ["information", "/ˌɪnfəˈmeɪʃn/", "信息", "科技", 2],
    ["ingredient", "/ɪnˈɡriːdiənt/", "原料/配料", "生活", 3],
    ["initial", "/ɪˈnɪʃl/", "最初的", "时间", 3],
    ["injure", "/ˈɪndʒə/", "伤害/受伤", "健康", 3],
    ["innocent", "/ˈɪnəsnt/", "天真的/无辜的", "品质", 3],
    ["insect", "/ˈɪnsekt/", "昆虫", "动物", 1],
    ["inside", "/ˌɪnˈsaɪd/", "在里面", "方位", 1],
    ["insist", "/ɪnˈsɪst/", "坚持", "意志", 3],
    ["inspire", "/ɪnˈspaɪə/", "启发/鼓舞", "成长", 3],
    ["instant", "/ˈɪnstənt/", "瞬间的/速溶的", "时间", 3],
    ["instead", "/ɪnˈsted/", "代替/相反", "副词", 2],
    ["institute", "/ˈɪnstɪtjuːt/", "学院/研究所", "机构", 3],
    ["instrument", "/ˈɪnstrəmənt/", "仪器/乐器", "艺术", 2],
    ["intelligent", "/ɪnˈtelɪdʒənt/", "聪颖智慧的", "品质", 2],
    ["intention", "/ɪnˈtenʃn/", "意图/打算", "心理", 3],
    ["interest", "/ˈɪntrəst/", "兴趣", "爱好", 1],
    ["international", "/ˌɪntəˈnæʃnəl/", "国际的", "社会", 2],
    ["internet", "/ˈɪntənet/", "互联网", "科技", 1],
    ["interview", "/ˈɪntəvjuː/", "采访/面试", "交流", 2],
    ["introduce", "/ˌɪntrəˈdjuːs/", "介绍", "社交", 2],
    ["invent", "/ɪnˈvent/", "发明", "科技", 2],
    ["invitation", "/ˌɪnvɪˈteɪʃn/", "邀请函", "社交", 2],
    ["invite", "/ɪnˈvaɪt/", "邀请", "社交", 1],
    ["iron", "/ˈaɪən/", "铁/熨斗", "物品", 2],
    ["jacket", "/ˈdʒækɪt/", "夹克短外套", "服饰", 1],
    ["jeans", "/dʒiːnz/", "牛仔裤", "服饰", 1],
    ["journey", "/ˈdʒɜːni/", "旅行", "生活", 2],
    ["judge", "/dʒʌdʒ/", "裁判/法官/判断", "职业", 2],
    ["juice", "/dʒuːs/", "果汁", "食物", 1],
    ["jump", "/dʒʌmp/", "跳跃", "动作", 1],
    ["jungle", "/ˈdʒʌŋɡl/", "热带丛林", "自然", 2],
    ["kangaroo", "/ˌkæŋɡəˈruː/", "袋鼠", "动物", 1],
    ["keyboard", "/ˈkiːbɔːd/", "键盘", "科技", 1],
    ["kick", "/kɪk/", "踢", "动作", 1],
    ["kindergarten", "/ˈkɪndəɡɑːtn/", "幼儿园", "学校", 2],
    ["kindness", "/ˈkaɪndnəs/", "善良友善", "美德", 2],
    ["kitchen", "/ˈkɪtʃɪn/", "厨房", "家庭", 1],
    ["kite", "/kaɪt/", "风筝", "趣味", 1],
    ["kitten", "/ˈkɪtn/", "小猫", "动物", 1],
    ["knife", "/naɪf/", "小刀", "用品", 1],
    ["knight", "/naɪt/", "骑士", "历史", 2],
    ["knock", "/nɒk/", "敲门", "动作", 1],
    ["knowledgeable", "/ˈnɒlɪdʒəbl/", "知识渊博的", "品质", 3],
    ["koala", "/kəʊˈɑːlə/", "考拉", "动物", 1],
    ["laboratory", "/ləˈbɒrətri/", "实验室", "科学", 3],
    ["ladder", "/ˈlædə/", "梯子", "工具", 2],
    ["ladybird", "/ˈleɪdibɜːd/", "瓢虫", "昆虫", 1],
    ["lake", "/leɪk/", "湖泊", "地理", 1],
    ["lantern", "/ˈlæntən/", "灯笼", "生活", 1],
    ["laptop", "/ˈlæptɒp/", "笔记本电脑", "科技", 1],
    ["laughter", "/ˈlɑːftə/", "笑声", "情绪", 2],
    ["launch", "/lɔːntʃ/", "发射/启动", "科技", 3],
    ["laundry", "/ˈlɔːndri/", "洗衣/送洗衣物", "生活", 2],
    ["lawyer", "/ˈlɔːjə/", "律师", "职业", 3],
    ["leader", "/ˈliːdə/", "领袖/队长", "人物", 2],
    ["leaf", "/liːf/", "叶子", "植物", 1],
    ["lemonade", "/ˌleməˈneɪd/", "柠檬水", "食物", 1],
    ["length", "/leŋθ/", "长度", "测量", 2],
    ["leopard", "/ˈlepəd/", "猎豹", "动物", 2],
    ["lesson", "/ˈlesn/", "课程/功课", "学习", 1],
    ["lightning", "/ˈlaɪtnɪŋ/", "闪电", "自然", 2],
    ["liquid", "/ˈlɪkwɪd/", "液体", "科学", 2],
    ["litter", "/ˈlɪtə/", "乱扔垃圾", "环保", 1],
    ["lively", "/ˈlaɪvli/", "生动活泼的", "性格", 2],
    ["lizard", "/ˈlɪzəd/", "蜥蜴", "动物", 2],
    ["load", "/ləʊd/", "负担/装载", "动作", 2],
    ["lock", "/lɒk/", "锁上/锁", "用品", 1],
    ["lonely", "/ˈləʊnli/", "孤独的", "情绪", 2],
    ["loudly", "/ˈlaʊdli/", "大声地", "副词", 1],
    ["lovely", "/ˈlʌvli/", "可爱的", "评价", 1],
    ["loyalty", "/ˈlɔɪəlti/", "忠诚", "美德", 3],
    ["luckily", "/ˈlʌkɪli/", "幸运地", "副词", 1],
    ["luggage", "/ˈlʌɡɪdʒ/", "行李", "旅行", 2],
    ["luxury", "/ˈlʌkʃəri/", "奢华", "生活", 3],
    ["machine", "/məˈʃiːn/", "机器", "科技", 1],
    ["magazine", "/ˌmæɡəˈziːn/", "杂志", "阅读", 1],
    ["magnet", "/ˈmæɡnət/", "磁铁", "科学", 2],
    ["mailman", "/ˈmeɪlmæn/", "邮递员", "职业", 1],
    ["major", "/ˈmeɪdʒə/", "主要的", "概念", 3],
    ["mammal", "/ˈmæml/", "哺乳动物", "科学", 3],
    ["manage", "/ˈmænɪdʒ/", "管理/设法做到", "能力", 3],
    ["manner", "/ˈmænə/", "礼貌/方式", "修养", 2],
    ["marathon", "/ˈmærəθən/", "马拉松", "运动", 3],
    ["market", "/ˈmɑːkɪt/", "市场", "生活", 1],
    ["match", "/mætʃ/", "火柴/配对/比赛", "核心", 1],
    ["material", "/məˈtɪəriəl/", "材料", "科学", 2],
    ["mathematics", "/ˌmæθəˈmætɪks/", "数学", "学科", 1],
    ["meadow", "/ˈmedəʊ/", "草甸/草地", "自然", 2],
    ["meaningful", "/ˈmiːnɪŋfl/", "有意义的", "评价", 2],
    ["measure", "/ˈmeʒə/", "测量", "动作", 2],
    ["mechanic", "/məˈkænɪk/", "机械师", "职业", 3],
    ["medal", "/ˈmedl/", "奖牌/勋章", "荣誉", 1],
    ["medicine", "/ˈmedsn/", "药物", "健康", 1],
    ["medium", "/ˈmiːdiəm/", "中等的/媒介", "概念", 2],
    ["melody", "/ˈmelədi/", "旋律/曲调", "音乐", 2],
    ["melon", "/ˈmelən/", "甜瓜", "水果", 1],
    ["member", "/ˈmembə/", "成员", "社会", 1],
    ["memory", "/ˈmeməri/", "记忆/回忆", "心理", 2],
    ["mention", "/ˈmenʃn/", "提及/说到", "动作", 2],
    ["merchant", "/ˈmɜːtʃənt/", "商人", "职业", 3],
    ["message", "/ˈmesɪdʒ/", "消息/留言", "信息", 1],
    ["metal", "/ˈmetl/", "金属", "材料", 2],
    ["method", "/ˈmeθəd/", "方法", "学习", 2],
    ["microscope", "/ˈmaɪkrəskəʊp/", "显微镜", "科学", 3],
    ["midnight", "/ˈmɪdnaɪt/", "午夜", "时间", 1],
    ["mineral", "/ˈmɪnərəl/", "矿物质", "科学", 3],
    ["mirror", "/ˈmɪrə/", "镜子", "用品", 1],
    ["mission", "/ˈmɪʃn/", "使命/任务", "探索", 3],
    ["mistake", "/mɪˈsteɪk/", "错误", "学习", 1],
    ["mix", "/mɪks/", "混合", "动作", 1],
    ["model", "/ˈmɒdl/", "模型/模范", "物品", 1],
    ["modest", "/ˈmɒdɪst/", "谦虚的", "品质", 3],
    ["moment", "/ˈməʊmənt/", "片刻/时刻", "时间", 2],
    ["monitor", "/ˈmɒnɪtə/", "班长/监视器", "学校", 2],
    ["monument", "/ˈmɒnjumənt/", "纪念碑", "历史", 3],
    ["mood", "/muːd/", "心情/心境", "心理", 2],
    ["mosquito", "/məˈskiːtəʊ/", "蚊子", "昆虫", 1],
    ["motorcycle", "/ˈməʊtəsaɪkl/", "摩托车", "交通", 1],
    ["movement", "/ˈmuːvmənt/", "运动/移动", "动作", 2],
    ["musical", "/ˈmjuːzɪkl/", "音乐的/音乐剧", "艺术", 2],
    ["mushroom", "/ˈmʌʃrʊm/", "蘑菇", "食物", 1],
    ["narrow", "/ˈnærəʊ/", "狭窄的", "空间", 2],
    ["national", "/ˈnæʃnəl/", "国家的", "社会", 2],
    ["natural", "/ˈnætʃrəl/", "自然的/天生的", "评价", 2],
    ["navy", "/ˈneɪvi/", "海军", "军事", 3],
    ["neat", "/niːt/", "整洁的", "生活", 1],
    ["necessary", "/ˈnesəsəri/", "必需的", "概念", 2],
    ["necklace", "/ˈnekləs/", "项链", "饰品", 2],
    ["needle", "/ˈniːdl/", "针", "工具", 2],
    ["negative", "/ˈneɡətɪv/", "消极的/负面的", "概念", 3],
    ["neighbor", "/ˈneɪbə/", "邻居", "人际", 1],
    ["nephew", "/ˈnefjuː/", "侄子/外甥", "家庭", 2],
    ["nervous", "/ˈnɜːvəs/", "紧张的", "情绪", 1],
    ["nest", "/nest/", "鸟巢", "自然", 1],
    ["niece", "/niːs/", "侄女/外甥女", "家庭", 2],
    ["nightingale", "/ˈnaɪtɪŋɡeɪl/", "夜莺", "动物", 2],
    ["noble", "/ˈnəʊbl/", "高尚的/贵族", "品质", 3],
    ["noise", "/nɔɪz/", "噪音", "感官", 1],
    ["noodle", "/ˈnuːdl/", "面条", "食物", 1],
    ["notice", "/ˈnəʊtɪs/", "注意/通告", "动作", 1],
    ["novel", "/ˈnɒvl/", "长篇小说", "文学", 2],
    ["novelist", "/ˈnɒvəlɪst/", "小说家", "职业", 3],
    ["number", "/ˈnʌmbə/", "数字/号码", "数学", 1],
    ["nurse", "/nɜːs/", "护士", "职业", 1],
    ["nutrition", "/njuˈtrɪʃn/", "营养", "健康", 3],
    ["nut", "/nʌt/", "坚果/螺母", "食物", 1],
    ["obey", "/əˈbeɪ/", "服从/听从", "行为", 2],
    ["object", "/ˈɒbdʒɪkt/", "物体/目标", "概念", 2],
    ["observe", "/əbˈzɜːv/", "观察/注视", "科学", 2],
    ["obtain", "/əbˈteɪn/", "获得", "动作", 3],
    ["obvious", "/ˈɒbviəs/", "明显的", "思维", 2],
    ["occasion", "/əˈkeɪʒn/", "场合/时刻", "生活", 3],
    ["occupation", "/ˌɒkjuˈpeɪʃn/", "职业", "社会", 3],
    ["officer", "/ˈɒfɪsə/", "军官/警官", "职业", 2],
    ["oil", "/ɔɪl/", "油/石油", "生活", 1],
    ["onion", "/ˈʌnjən/", "洋葱", "蔬菜", 1],
    ["operate", "/ˈɒpəreɪt/", "运转/动手术", "动作", 2],
    ["operation", "/ˌɒpəˈreɪʃn/", "手术/行动", "医疗", 3],
    ["opinion", "/əˈpɪnjən/", "看法/见解", "思维", 2],
    ["opportunity", "/ˌɒpəˈtjuːnəti/", "机遇/机会", "成长", 3],
    ["opposite", "/ˈɒpəzɪt/", "对立的/对面的", "概念", 2],
    ["optimistic", "/ˌɒptɪˈmɪstɪk/", "乐观的", "品质", 3],
    ["orchestra", "/ˈɔːkɪstrə/", "管弦乐队", "艺术", 3],
    ["order", "/ˈɔːdə/", "顺序/点单/命令", "生活", 1],
    ["ordinary", "/ˈɔːdnri/", "平常的/普通的", "概念", 2],
    ["organize", "/ˈɔːɡənaɪz/", "组织/筹备", "动作", 2],
    ["origin", "/ˈɒrɪdʒɪn/", "起源", "科学", 3],
    ["ostrich", "/ˈɒstrɪtʃ/", "鸵鸟", "动物", 2],
    ["outdoor", "/ˈaʊtdɔː/", "室外的/户外的", "活动", 1],
    ["oven", "/ˈʌvn/", "烤箱", "家电", 1],
    ["overcome", "/ˌəʊvəˈkʌm/", "克服/战胜", "成长", 3],
    ["oxygen", "/ˈɒksɪdʒən/", "氧气", "科学", 3]
  ];

  let currentId = 201;
  for (let item of common3500List) {
    const lvl = item[4];
    const stageName = lvl === 1 ? "北京小学" : (lvl === 2 ? "北京初中" : "北京高中");
    WORD_DATABASE.push({
      id: currentId++,
      word: item[0],
      phonetic: item[1],
      meaning: item[2],
      category: item[3],
      level: lvl,
      stage: stageName
    });
  }
})();

// 智能为儿童提供生动简短的情境助记例句
function getWordExampleSentence(wordObj) {
  if (!wordObj) return { en: "", cn: "" };

  // 内置经典知名短句映射
  const specialExamples = {
    "apple": { en: "An apple a day keeps the doctor away.", cn: "一天一个苹果，医生远离我。" },
    "banana": { en: "Monkeys like to eat yellow bananas.", cn: "猴子喜欢吃黄澄澄的香蕉。" },
    "book": { en: "Reading a good book makes us smart.", cn: "读一本好书让我们变得聪明。" },
    "cat": { en: "The lovely cat is sleeping on the chair.", cn: "可爱的小猫正在椅子上睡觉。" },
    "dog": { en: "A dog is a loyal friend to children.", cn: "小狗是小朋友忠诚的朋友。" },
    "friend": { en: "A friend in need is a friend indeed.", cn: "患难见真情，真正的朋友永远在一起。" },
    "happy": { en: "I feel very happy when I learn new words.", cn: "当我学到新单词时感到非常快乐。" },
    "water": { en: "We should drink plenty of clean water.", cn: "我们每天都要多喝干净的水。" },
    "sun": { en: "The warm sun shines brightly in the sky.", cn: "温暖的太阳在空中明媚照耀。" },
    "moon": { en: "The bright moon lights up the quiet night.", cn: "明亮的月光照亮了宁静的夜晚。" },
    "star": { en: "Twinkle, twinkle, little star in the sky.", cn: "一闪一闪亮晶晶，满天都是小星星。" },
    "school": { en: "I love going to school with my classmates.", cn: "我喜欢和同学们一起去学校上学。" },
    "teacher": { en: "Our teacher is very kind and patient.", cn: "我们的老师非常和蔼且有耐心。" },
    "pencil": { en: "Use a sharp pencil to write neat words.", cn: "用削尖的铅笔书写工整的文字。" },
    "family": { en: "I love my warm and happy family.", cn: "我爱我温暖快乐的家庭。" }
  };

  const key = (wordObj.word || "").toLowerCase();
  if (specialExamples[key]) {
    return specialExamples[key];
  }

  // 通用儿童情境造句生成器
  const w = wordObj.word;
  const m = wordObj.meaning;
  const c = wordObj.category;

  if (c === "水果" || c === "食物") {
    return { en: `This delicious ${w} tastes really good!`, cn: `这个美味的【${m}】吃起来真棒！` };
  } else if (c === "动物" || c === "昆虫") {
    return { en: `Look! The cute ${w} is running happily.`, cn: `看！那只可爱的【${m}】正在欢快地奔跑。` };
  } else if (c === "学校" || c === "用品" || c === "学习") {
    return { en: `I always bring my ${w} to school.`, cn: `我总是带着我的【${m}】去学校。` };
  } else if (c === "品质" || c === "情绪") {
    return { en: `He is always a very ${w} person.`, cn: `他总是一个非常【${m}】的人。` };
  } else if (c === "自然" || c === "天气" || c === "地理") {
    return { en: `We can see the wonderful ${w} in nature.`, cn: `我们可以在大自然中看到美妙的【${m}】。` };
  } else {
    return { en: `Let's remember how to use the word "${w}".`, cn: `让我们一起记住并学会运用【${m}】这个词。` };
  }
}

// 获取单词的丰富学习信息 (词性、常用搭配、趣味助记小妙招)
function getWordRichDetails(wordObj) {
  if (!wordObj) return null;
  const w = wordObj.word.toLowerCase();
  const m = wordObj.meaning;
  const c = wordObj.category;

  // 词性智能推断/映射
  let pos = "n. 名词";
  if (["快乐的", "美丽的", "聪明的", "诚实的", "健康的", "强壮的", "红色的", "蓝色的"].some(k => m.includes(k)) || m.endsWith("的")) {
    pos = "adj. 形容词";
  } else if (["跑", "跳", "学习", "思考", "建造", "游泳", "唱歌", "跳舞", "保护"].some(k => m.includes(k))) {
    pos = "v. 动词";
  } else if (["在...", "沿着", "穿过"].some(k => m.includes(k))) {
    pos = "prep. 介词";
  }

  // 常用核心短语/搭配推荐 (Collocations)
  let phrases = [];
  if (c === "水果" || c === "食物") {
    phrases = [`fresh ${w} (新鲜的${m})`, `eat a ${w} (吃${m})`, `${w} juice (${m}汁)`];
  } else if (c === "动物" || c === "昆虫") {
    phrases = [`wild ${w} (野生${m})`, `little ${w} (小${m})`, `feed the ${w} (喂养${m})`];
  } else if (c === "学校" || c === "用品") {
    phrases = [`my ${w} (我的${m})`, `new ${w} (崭新的${m})`, `use a ${w} (使用${m})`];
  } else if (c === "颜色") {
    phrases = [`bright ${w} (鲜艳的${m})`, `dark ${w} (深${m})`, `${w} sky (${m}的天空)`];
  } else if (c === "运动" || c === "艺术") {
    phrases = [`play ${w} (玩/参加${m})`, `like ${w} (喜欢${m})`, `${w} club (${m}俱乐部)`];
  } else {
    phrases = [`good ${w} (好的${m})`, `real ${w} (真实的${m})`, `learn about ${w} (了解${m})`];
  }

  let tip = `脑海中浮现【${m}】的生动场景，将画面与单词 "${w}" 紧密连接，形象联想不易忘。`;

  return {
    partOfSpeech: pos,
    phrases: phrases,
    memoryTip: tip
  };
}

// 北京中小学英语考点深度词典引擎 (自然拼读音节、考点点拨、词态变化、真实例句、经典搭配)
function getComprehensiveWordDetail(wordObj) {
  if (!wordObj) return null;
  const w = wordObj.word.toLowerCase();
  const m = wordObj.meaning;
  const c = wordObj.category || "日常";
  const stage = wordObj.stage || "北京小学";

  // 1. 词性推断
  let pos = "n. 名词";
  if (["快乐的", "美丽的", "聪明的", "诚实的", "健康的", "强壮的", "红色的", "蓝色的", "绿色的", "黄色的"].some(k => m.includes(k)) || m.endsWith("的")) {
    pos = "adj. 形容词";
  } else if (["跑", "跳", "读", "写", "看", "听", "吃", "喝", "玩", "做", "学", "教", "游", "飞", "唱"].some(k => m.includes(k))) {
    pos = "v. 动词";
  } else if (["在", "从", "朝", "沿着", "穿过"].some(k => m.startsWith(k))) {
    pos = "prep. 介词";
  }

  // 2. 自然拼读音节智能拆分 (Syllables)
  let syllables = w;
  if (w.length > 5) {
    if (w.endsWith("ing")) syllables = w.slice(0, -3) + " · ing";
    else if (w.endsWith("ed")) syllables = w.slice(0, -2) + " · ed";
    else if (w.endsWith("er")) syllables = w.slice(0, -2) + " · er";
    else if (w.endsWith("ful")) syllables = w.slice(0, -3) + " · ful";
    else if (w.endsWith("tion")) syllables = w.slice(0, -4) + " · tion";
    else {
      syllables = w.replace(/([aeiouy]+)/gi, "$1·").replace(/·$/, "");
      if (!syllables.includes("·") && w.length >= 6) {
        syllables = w.slice(0, 3) + " · " + w.slice(3);
      }
    }
  } else if (w.length === 5) {
    syllables = w.slice(0, 2) + " · " + w.slice(2);
  }

  // 3. 常见词形变化 (Forms)
  let forms = "";
  if (pos.startsWith("adj")) {
    forms = `比较级: ${w.endsWith("y") ? w.slice(0,-1)+"ier" : (w.length <= 4 ? w+"er" : "more "+w)} | 最高级: ${w.endsWith("y") ? w.slice(0,-1)+"iest" : (w.length <= 4 ? w+"est" : "most "+w)}`;
  } else if (pos.startsWith("v")) {
    const s3 = w.endsWith("s") || w.endsWith("sh") || w.endsWith("ch") || w.endsWith("x") ? w + "es" : w + "s";
    const ing = w.endsWith("e") && !w.endsWith("ee") ? w.slice(0,-1) + "ing" : w + "ing";
    forms = `第三人称单数: ${s3} | 现在分词: ${ing} | 过去式: ${w}ed`;
  } else {
    const pl = w.endsWith("s") || w.endsWith("sh") || w.endsWith("ch") || w.endsWith("x") ? w + "es" : (w.endsWith("y") && !/[aeiou]y$/.test(w) ? w.slice(0,-1)+"ies" : w + "s");
    forms = `名词复数: ${pl}`;
  }

  // 4. 北京中高考与小学核心考点小贴士 (Exam Tip)
  let examTip = "";
  const isVowelStart = /^[aeiou]/i.test(w);
  if (isVowelStart) {
    examTip = `⚠️ 北京考纲常考：【${w}】首字母以元音音素开头，前面单数冠词必须用 an（如 an ${w}），考试常考切勿错写成 a！`;
  } else if (c === "水果" || c === "食物") {
    examTip = `💡 考点点拨：表示“一个${m}”时通常是可数名词；若作食物材质、果汁整体表达时注意不可数辨析。`;
  } else if (c === "学校" || c === "用品") {
    examTip = `💡 考点点拨：北京小学与中考生活情景对话极高频词，书写拼读必须做到100%精准无误。`;
  } else if (c === "情绪" || c === "品质") {
    examTip = `💡 写作提分点：常用于描写人物性格与真情实感（如 feel ${w}），是英语作文获评一类卷的加分词。`;
  } else if (pos.startsWith("v")) {
    examTip = `💡 考点点拨：注意其在一般现在时中第三人称单数（加-s/-es）和时态变化规则。`;
  } else {
    examTip = `💡 备考指南：北京英语新课标高频核心大纲词，要求听音能辨、见词能读、拼写无误。`;
  }

  // 5. 自然拼读发音要领 (Phonics)
  let phonicsRule = "";
  if (isVowelStart) {
    phonicsRule = `自然拼读：元音字母 [${w[0].toUpperCase()}] 饱满发音，与后面的辅音自然滑动连读，轻松见词能读。`;
  } else {
    phonicsRule = `自然拼读：首辅音 [${w[0].toUpperCase()}] 声带配合吐气，节奏明快，多跟读两遍建立音感。`;
  }

  // 6. 常用经典短语与搭配 (Collocations)
  let phrases = [];
  if (w === "apple") {
    phrases = ["an apple a day (一天一苹果)", "apple of one's eye (掌上明珠)", "apple juice (苹果汁)"];
  } else if (w === "water") {
    phrases = ["drink water (喝水)", "a cup of water (一杯水)", "save water (节约用水)"];
  } else if (w === "friend") {
    phrases = ["make friends (交朋友)", "best friend (最好的朋友)", "a good friend (好朋友)"];
  } else if (w === "happy") {
    phrases = ["Happy birthday! (生日快乐！)", "be happy with (对...满意)", "look happy (看起来很高兴)"];
  } else if (c === "水果" || c === "食物") {
    phrases = [`fresh ${w} (新鲜的${m})`, `eat a ${w} (吃${m})`, `${w} juice (${m}果汁)`];
  } else if (c === "动物") {
    phrases = [`cute ${w} (可爱的${m})`, `wild ${w} (野生${m})`, `feed the ${w} (喂养${m})`];
  } else if (c === "学校" || c === "用品") {
    phrases = [`my ${w} (我的${m})`, `bring a ${w} (带上${m})`, `use the ${w} (使用${m})`];
  } else if (c === "情绪" || c === "品质") {
    phrases = [`feel very ${w} (感到非常${m})`, `a ${w} person (一个${m}的人)`, `stay ${w} (保持${m})`];
  } else {
    phrases = [`a good ${w} (好的${m})`, `learn about ${w} (了解${m})`, `in the ${w} (在${m}中)`];
  }

  // 7. 趣味助记小妙招 (Memory Tip)
  let memoryTip = "";
  if (w.length <= 4) {
    memoryTip = `按字母音节 [${w.split('').join('-')}] 大声朗读三遍，嘴巴与耳朵形成条件反射，快速永久记忆。`;
  } else {
    memoryTip = `脑海中浮现【${m}】的生动场景，将画面与单词 "${w}" 紧密连接，形象联想不易忘。`;
  }

  // 8. 真实生动例句
  const sentence = (typeof getWordExampleSentence === "function") ? getWordExampleSentence(wordObj) : { en: `This is an interesting ${w}.`, cn: `这是一个很有趣的${m}。` };

  return {
    syllables: syllables,
    partOfSpeech: pos,
    forms: forms,
    examTip: examTip,
    phonicsRule: phonicsRule,
    phrases: phrases,
    memoryTip: memoryTip,
    sentenceEn: sentence.en,
    sentenceCn: sentence.cn,
    stage: stage
  };
}

// 导出全局对象，供其他脚本使用
if (typeof window !== "undefined") {
  window.WORD_DATABASE = WORD_DATABASE;
  window.getWordExampleSentence = getWordExampleSentence;
  window.getWordRichDetails = getWordRichDetails;
  window.getComprehensiveWordDetail = getComprehensiveWordDetail;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { WORD_DATABASE, getWordExampleSentence, getWordRichDetails, getComprehensiveWordDetail };
}

