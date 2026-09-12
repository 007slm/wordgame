/**
 * 单词消消乐 - 核心游戏控制器 (GameCore)
 * 专为10岁儿童设计：中英配对、果冻消除、连击激励、生词强化与移动端自适应
 */

class GameCore {
  constructor() {
    this.storage = new StorageManager();
    this.audio = new AudioManager();

    this.currentCards = [];
    this.firstSelectedCard = null;
    this.isProcessing = false;
    this.matchedPairsCount = 0;
    this.totalPairsCount = 6;

    // 连击与计分
    this.combo = 0;
    this.comboTimer = null;
    this.comboDuration = 6000; // 6秒连击窗口
    this.levelScore = 0;
    this.levelStartTime = 0;
    this.levelMatchedWords = [];
    this.currentTab = "game";

    this.cacheDomElements();
    this.bindEvents();
    this.initGameUI();
    this.startNewGameLevel();
  }

  cacheDomElements() {
    this.dom = {
      userNameText: document.getElementById("user-name-text"),
      userProfilePill: document.getElementById("user-profile-pill"),
      levelBadge: document.getElementById("level-badge-text"),
      scoreText: document.getElementById("score-val"),
      coinText: document.getElementById("coin-val"),
      comboFill: document.getElementById("combo-fill"),
      comboText: document.getElementById("combo-label"),
      comboPopup: document.getElementById("combo-popup"),
      cardsGrid: document.getElementById("cards-grid"),
      particlesLayer: document.getElementById("particles-layer"),

      // 单元零漏词进度条
      moduleNameLabel: document.getElementById("module-name-label"),
      moduleProgressFill: document.getElementById("module-progress-fill"),
      moduleProgressText: document.getElementById("module-progress-text"),
      
      // 主 Tab 视图
      viewGame: document.getElementById("view-game"),
      viewDetail: document.getElementById("view-detail"),
      viewSettings: document.getElementById("view-settings"),
      tabBtnGame: document.getElementById("tab-btn-game"),
      tabBtnDetail: document.getElementById("tab-btn-detail"),

      // 道具与功能按钮
      btnHint: document.getElementById("btn-hint"),
      tabBtnSettings: document.getElementById("tab-btn-settings"),
      btnWordbook: document.getElementById("btn-wordbook"),

      // 设置面板自主选关与年级单元专区
      levelSelectDropdown: document.getElementById("level-select-dropdown"),
      btnJumpLevel: document.getElementById("btn-jump-level"),
      explainGradeTag: document.getElementById("explain-grade-tag"),
      explainUnitTag: document.getElementById("explain-unit-tag"),
      explainName: document.getElementById("explain-name"),
      explainSub: document.getElementById("explain-sub"),
      explainCount: document.getElementById("explain-count"),

      // 弹窗
      victoryModal: document.getElementById("victory-modal"),
      victoryStars: document.getElementById("victory-stars"),
      summaryScore: document.getElementById("summary-score"),
      summaryCoins: document.getElementById("summary-coins"),
      summaryCombo: document.getElementById("summary-combo"),
      btnNextLevel: document.getElementById("btn-next-level"),

      wordbookModal: document.getElementById("wordbook-modal"),
      wbList: document.getElementById("wb-list"),
      wbStatsSummary: document.getElementById("wb-stats-summary"),
      btnCloseWb: document.getElementById("btn-close-wb"),

      settingsModal: document.getElementById("settings-modal"),
      chkSound: document.getElementById("chk-sound"),
      chkSpeech: document.getElementById("chk-speech"),
      btnResetLevel: document.getElementById("btn-reset-level"),
      btnCloseSettings: document.getElementById("btn-close-settings"),

      // 单词沉浸式学习 Tab 元素 (全新高颜值研读卡)
      btnPrevWord: document.getElementById("btn-prev-word"),
      btnNextWord: document.getElementById("btn-next-word"),
      detailStageCounter: document.getElementById("detail-stage-counter"),
      detailStageWords: document.getElementById("detail-stage-words"),
      detailCategoryTag: document.getElementById("detail-category-tag"),
      detailLevelTag: document.getElementById("detail-level-tag"),
      detailPosTag: document.getElementById("detail-pos-tag"),
      detailWordTitle: document.getElementById("detail-word-title"),
      detailSyllableVal: document.getElementById("detail-syllable-val"),
      detailPhonetic: document.getElementById("detail-phonetic"),
      detailMeaning: document.getElementById("detail-meaning"),
      detailForms: document.getElementById("detail-forms"),
      detailExamTip: document.getElementById("detail-exam-tip"),
      detailSentenceEn: document.getElementById("detail-sentence-en"),
      detailSentenceCn: document.getElementById("detail-sentence-cn"),
      btnSentenceSpeak: document.getElementById("btn-sentence-speak"),
      detailPhrasesList: document.getElementById("detail-phrases-list"),
      detailMemoryTip: document.getElementById("detail-memory-tip"),
      detailMasteryStars: document.getElementById("detail-mastery-stars"),
      detailMasteryDesc: document.getElementById("detail-mastery-desc"),
      btnDetailSpeak: document.getElementById("btn-detail-speak")
    };
  }

  bindEvents() {
    // 底部 Tab 切换事件
    this.dom.tabBtnGame.addEventListener("click", () => this.switchTab("game"));
    this.dom.tabBtnDetail.addEventListener("click", () => this.switchTab("detail"));

    // 详解界面前后翻词切换
    if (this.dom.btnPrevWord) {
      this.dom.btnPrevWord.addEventListener("click", () => this.navigateDetailWord(-1));
    }
    if (this.dom.btnNextWord) {
      this.dom.btnNextWord.addEventListener("click", () => this.navigateDetailWord(1));
    }

    // 道具与设置弹窗事件
    this.dom.btnHint.addEventListener("click", () => {
      this.switchTab("game");
      this.useHint();
    });

    // 底部 Tab 设置按钮 (Tab 页面平滑无感切换)
    if (this.dom.tabBtnSettings) {
      this.dom.tabBtnSettings.addEventListener("click", () => this.switchTab("settings"));
    }
    if (this.dom.btnWordbook) {
      this.dom.btnWordbook.addEventListener("click", () => this.openWordbook());
    }

    // 自主选关下拉框联动与跳转
    if (this.dom.levelSelectDropdown) {
      this.dom.levelSelectDropdown.addEventListener("change", (e) => {
        this.updateLevelExplainDisplay(parseInt(e.target.value));
      });
    }
    if (this.dom.btnJumpLevel) {
      this.dom.btnJumpLevel.addEventListener("click", () => this.handleJumpLevelClick());
    }

    // 详解界面内朗读发音 (单词与例句)
    this.dom.btnDetailSpeak.addEventListener("click", () => this.speakCurrentDetail());
    if (this.dom.btnSentenceSpeak) {
      this.dom.btnSentenceSpeak.addEventListener("click", () => this.speakCurrentSentence());
    }

    // 模态窗按钮
    this.dom.btnNextLevel.addEventListener("click", () => {
      this.closeModal(this.dom.victoryModal);
      this.startNewGameLevel();
    });

    this.dom.btnCloseWb.addEventListener("click", () => {
      this.closeModal(this.dom.wordbookModal);
    });

    if (this.dom.btnCloseSettings) {
      this.dom.btnCloseSettings.addEventListener("click", () => {
        this.switchTab("game");
      });
    }

    // 设置项变动
    this.dom.chkSound.addEventListener("change", (e) => {
      this.audio.soundEnabled = e.target.checked;
      this.storage.settings.sound = e.target.checked;
      this.storage.saveSettings();
    });

    this.dom.chkSpeech.addEventListener("change", (e) => {
      this.audio.speechEnabled = e.target.checked;
      this.storage.settings.speech = e.target.checked;
      this.storage.saveSettings();
    });

    // 一键重置到第1关 (外研三上·M1 最基础起点)
    if (this.dom.btnResetLevel) {
      this.dom.btnResetLevel.addEventListener("click", () => {
        this.audio.playTap();
        if (confirm("确定要将关卡进度重置为【第 1 关 (🎒 外研三上·M1 基础问候)】吗？")) {
          this.storage.profile.level = 1;
          this.storage.saveProfile();
          this.switchTab("game");
          this.startNewGameLevel();
        }
      });
    }

    // 用户名点击快捷修改
    if (this.dom.userProfilePill) {
      this.dom.userProfilePill.addEventListener("click", () => {
        this.audio.playTap();
        const currentName = this.storage.profile.nickname || "星澔";
        const newName = prompt("请输入你的名字或昵称：", currentName);
        if (newName && newName.trim()) {
          this.storage.profile.nickname = newName.trim();
          this.storage.saveProfile();
          this.updateStatsDisplay();
        }
      });
    }
  }

  initGameUI() {
    this.updateStatsDisplay();
    this.dom.chkSound.checked = this.storage.settings.sound;
    this.audio.soundEnabled = this.storage.settings.sound;
    this.dom.chkSpeech.checked = this.storage.settings.speech;
    this.audio.speechEnabled = this.storage.settings.speech;
  }

  // 紧跟北京大兴区外研社版小学英语教材 (三年级起点) 与北京中高考大纲的循序渐进难度阶梯
  getAdaptiveDifficultyStage() {
    const curLevel = this.storage.profile.level || 1;

    // === 第一阶段：外研社三年级上册 (Module 1 ~ Module 10 逐单元零漏词攻坚) ===
    if (curLevel === 1) {
      return {
        stage: 1,
        title: "🎒 外研三上·M1 基础问候",
        subTitle: "最简单的高频问候与交友 (hello, morning, you, I...)",
        pairsCount: 4,
        comboDuration: 10000,
        wordRange: [1, 12],   // 严格限定在 Module 1 专属的12个问候词之内
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel === 2) {
      return {
        stage: 1,
        title: "🎒 外研三上·M2 自我介绍",
        subTitle: "姓名称谓与礼貌交际 (what, name, boy, girl...)",
        pairsCount: 4,
        comboDuration: 9500,
        wordRange: [13, 22],  // Module 2 专属10词
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel === 3) {
      return {
        stage: 1,
        title: "🎒 外研三上·M3 教室指令",
        subTitle: "教室环境与动作指令 (door, window, desk, chair...)",
        pairsCount: 4,
        comboDuration: 9000,
        wordRange: [23, 34],  // Module 3 专属12词
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel === 4) {
      return {
        stage: 1,
        title: "🎒 外研三上·M4 缤纷色彩",
        subTitle: "绚丽色彩与可爱宠物 (red, blue, yellow, dog, cat...)",
        pairsCount: 4,
        comboDuration: 9000,
        wordRange: [35, 46],  // Module 4 专属12词
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel === 5) {
      return {
        stage: 1,
        title: "🎒 外研三上·M5 趣味数字",
        subTitle: "英文数字1~12 (one, two, three, ten, twelve...)",
        pairsCount: 5,
        comboDuration: 8500,
        wordRange: [47, 59],  // Module 5 专属13词
        gridClass: "cards-grid"
      };
    } else if (curLevel === 6) {
      return {
        stage: 1,
        title: "🎒 外研三上·M6 校园文具",
        subTitle: "上学文具与书包 (school, bag, pen, pencil, book...)",
        pairsCount: 5,
        comboDuration: 8500,
        wordRange: [60, 70],  // Module 6 专属11词
        gridClass: "cards-grid"
      };
    } else if (curLevel === 7) {
      return {
        stage: 1,
        title: "🎒 外研三上·M7 生日庆祝",
        subTitle: "生日派对与分享美食 (happy, birthday, cake, present...)",
        pairsCount: 4,
        comboDuration: 8500,
        wordRange: [71, 76],  // Module 7 专属6词
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel === 8) {
      return {
        stage: 1,
        title: "🎒 外研三上·M8 空间方位",
        subTitle: "空间介词与方位寻物 (in, on, under, kite, bed...)",
        pairsCount: 5,
        comboDuration: 8000,
        wordRange: [77, 87],  // Module 8 专属11词
        gridClass: "cards-grid"
      };
    } else if (curLevel === 9) {
      return {
        stage: 1,
        title: "🎒 外研三上·M9 家庭与职业",
        subTitle: "亲情称呼与社会职业 (father, mother, doctor, teacher...)",
        pairsCount: 5,
        comboDuration: 8000,
        wordRange: [88, 100], // Module 9 专属13词
        gridClass: "cards-grid"
      };
    } else if (curLevel === 10) {
      return {
        stage: 1,
        title: "🎒 外研三上·M10 五官与身体",
        subTitle: "认识身体与五官部位 (head, arm, leg, eye, ear...)",
        pairsCount: 5,
        comboDuration: 8000,
        wordRange: [101, 110], // Module 10 专属10词
        gridClass: "cards-grid"
      };
    } else if (curLevel === 11) {
      return {
        stage: 1,
        title: "🎒 外研三上·全册综合巩固",
        subTitle: "三年级上册全册核心词汇大通关",
        pairsCount: 6,
        comboDuration: 8000,
        wordRange: [1, 110],
        gridClass: "cards-grid"
      };
    }

    // === 第二阶段：外研社三年级下册 (Module 1 ~ Module 10) ===
    else if (curLevel === 12) {
      return {
        stage: 2,
        title: "🎒 外研三下·M1 动物爱好",
        subTitle: "喜爱的动物 (favourite, animal, dog...)",
        pairsCount: 4,
        comboDuration: 8000,
        wordRange: [111, 115],
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel === 13) {
      return {
        stage: 2,
        title: "🎒 外研三下·M2 动物园探秘",
        subTitle: "动物园伙伴 (monkey, tiger, lion, big...)",
        pairsCount: 5,
        comboDuration: 8000,
        wordRange: [116, 128],
        gridClass: "cards-grid"
      };
    } else if (curLevel === 14) {
      return {
        stage: 2,
        title: "🎒 外研三下·M3 运动与爱好",
        subTitle: "体育运动 (football, basketball, like...)",
        pairsCount: 4,
        comboDuration: 8000,
        wordRange: [129, 135],
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel === 15) {
      return {
        stage: 2,
        title: "🎒 外研三下·M4 饮食日常",
        subTitle: "一日三餐与肉菜主食 (meat, rice, noodles, fish...)",
        pairsCount: 5,
        comboDuration: 8000,
        wordRange: [136, 144],
        gridClass: "cards-grid"
      };
    } else if (curLevel === 16) {
      return {
        stage: 2,
        title: "🎒 外研三下·M5 购物与食物",
        subTitle: "超市采买与果蔬 (buy, tea, banana, apple...)",
        pairsCount: 4,
        comboDuration: 8000,
        wordRange: [145, 152],
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel === 17) {
      return {
        stage: 2,
        title: "🎒 外研三下·M6 星期与课程",
        subTitle: "一周七天与各学科 (Monday, Chinese, Maths...)",
        pairsCount: 5,
        comboDuration: 8000,
        wordRange: [153, 164],
        gridClass: "cards-grid"
      };
    } else if (curLevel === 18) {
      return {
        stage: 2,
        title: "🎒 外研三下·M7 四季与节气",
        subTitle: "春夏秋冬四季景致 (spring, summer, warm, hot...)",
        pairsCount: 5,
        comboDuration: 8000,
        wordRange: [165, 177],
        gridClass: "cards-grid"
      };
    } else if (curLevel === 19) {
      return {
        stage: 2,
        title: "🎒 外研三下·M8 服装穿搭",
        subTitle: "四季衣物与鞋帽 (sweater, coat, dress, cap...)",
        pairsCount: 4,
        comboDuration: 7500,
        wordRange: [178, 183],
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel === 20) {
      return {
        stage: 2,
        title: "🎒 外研三下·M9 居家与房间",
        subTitle: "家庭居室 (bedroom, living room...)",
        pairsCount: 4,
        comboDuration: 7500,
        wordRange: [184, 187],
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel === 21) {
      return {
        stage: 2,
        title: "🎒 外研三下·M10 交通工具",
        subTitle: "出行工具 (bus, car, bike, taxi...)",
        pairsCount: 4,
        comboDuration: 7500,
        wordRange: [188, 192],
        gridClass: "cards-grid grid-2x4"
      };
    } else if (curLevel <= 25) {
      return {
        stage: 2,
        title: "🎒 外研三下·全册冲刺",
        subTitle: "三年级下册核心考点全面巩固",
        pairsCount: 6,
        comboDuration: 7500,
        wordRange: [111, 192],
        gridClass: "cards-grid"
      };
    }

    // === 第三阶段：外研四年级进阶篇 ===
    else if (curLevel <= 40) {
      return {
        stage: 3,
        title: "📘 外研四年级·进阶篇",
        subTitle: "四年级课本重点考查词",
        pairsCount: 6,
        comboDuration: 7500,
        wordRange: [1, 200],
        gridClass: "cards-grid"
      };
    }

    // === 第四阶段：外研五六年级·小升初 ===
    else if (curLevel <= 55) {
      return {
        stage: 4,
        title: "📗 外研五六年级·小升初",
        subTitle: "小学毕业与小升初核心词",
        pairsCount: 6,
        comboDuration: 7000,
        allowedLevels: [1, 2],
        gridClass: "cards-grid"
      };
    }

    // === 第五阶段：北京中考核心词 ===
    else if (curLevel <= 75) {
      return {
        stage: 5,
        title: "🎯 北京初中·中考核心",
        subTitle: "中考高频必背1600词",
        pairsCount: 8,
        comboDuration: 6500,
        allowedLevels: [2, 3],
        gridClass: "cards-grid grid-4x4"
      };
    }

    // === 第六阶段：北京高考巅峰大冲刺 ===
    else {
      return {
        stage: 6,
        title: "🏛️ 北京高中·终极大纲",
        subTitle: "3500词终极大通关",
        pairsCount: 8,
        comboDuration: 6000,
        allowedLevels: [1, 2, 3],
        gridClass: "cards-grid grid-4x4"
      };
    }
  }

  updateStatsDisplay() {
    const diff = this.getAdaptiveDifficultyStage();
    if (this.dom.userNameText) {
      this.dom.userNameText.innerText = this.storage.profile.nickname || "星澔";
    }
    this.dom.levelBadge.innerText = `第 ${this.storage.profile.level} 关 (${diff.title})`;
    this.dom.scoreText.innerText = this.storage.profile.totalScore;
    this.dom.coinText.innerText = this.storage.profile.coins;
    if (this.dom.difficultyGrowthTag) {
      this.dom.difficultyGrowthTag.innerText = `${diff.title} · ${diff.subTitle}`;
    }

    // 零漏词进度条更新 (外研教材单元覆盖率)
    if (this.currentModuleWords && this.currentModuleWords.length > 0) {
      const prog = this.storage.getModuleProgress(this.currentModuleWords);
      if (this.dom.moduleNameLabel) {
        this.dom.moduleNameLabel.innerText = diff.title;
      }
      if (this.dom.moduleProgressFill) {
        this.dom.moduleProgressFill.style.width = `${prog.percentage}%`;
      }
      if (this.dom.moduleProgressText) {
        this.dom.moduleProgressText.innerText = `${prog.learned}/${prog.total} 词 (${prog.percentage}%)`;
      }
    }
  }

  // 开始新的一关
  startNewGameLevel() {
    this.firstSelectedCard = null;
    this.isProcessing = false;
    this.matchedPairsCount = 0;
    this.levelScore = 0;
    this.levelStartTime = Date.now();
    this.levelMatchedWords = [];
    this.resetCombo();

    // 智能难度平缓梯级
    const diff = this.getAdaptiveDifficultyStage();
    this.totalPairsCount = diff.pairsCount;
    this.comboDuration = diff.comboDuration;
    this.currentGridClass = diff.gridClass;

    // 过滤当前单元核心候选词汇库
    let currentModuleWords;
    if (diff.wordRange) {
      const [minId, maxId] = diff.wordRange;
      currentModuleWords = WORD_DATABASE.filter(w => w.id >= minId && w.id <= maxId);
    } else if (diff.allowedLevels) {
      currentModuleWords = WORD_DATABASE.filter(w => diff.allowedLevels.includes(w.level));
    } else {
      currentModuleWords = WORD_DATABASE.slice(0, 50);
    }

    if (currentModuleWords.length === 0) {
      currentModuleWords = WORD_DATABASE.slice(0, 20);
    }
    this.currentModuleWords = currentModuleWords;

    // 获取所有历史已解锁词汇 (用于 55% 概率错词回流重现抽查)
    const maxCurrentId = diff.wordRange ? diff.wordRange[1] : 200;
    const allHistoryWords = WORD_DATABASE.filter(w => w.id <= maxCurrentId);

    // 零漏词单元推进 + 错词 55% 概率回流出题核心算法
    const chosenWords = this.storage.pickModuleWordsWithReview(
      currentModuleWords,
      allHistoryWords,
      this.totalPairsCount
    );

    // 立即刷新顶部进度条显示
    this.updateStatsDisplay();

    // 生成中英文配对卡片
    const cards = [];
    chosenWords.forEach(wordObj => {
      // 英文卡
      cards.push({
        id: `en_${wordObj.id}`,
        wordId: wordObj.id,
        type: 'en',
        text: wordObj.word,
        subText: wordObj.phonetic || '',
        category: wordObj.category,
        wordData: wordObj
      });
      // 中文卡
      cards.push({
        id: `cn_${wordObj.id}`,
        wordId: wordObj.id,
        type: 'cn',
        text: wordObj.meaning,
        subText: wordObj.category || '',
        category: wordObj.category,
        wordData: wordObj
      });
    });

    // 洗牌 (Fisher-Yates)
    this.shuffleArray(cards);
    this.currentCards = cards;

    // 默认将本关抽出的第 1 个词设置为当前详情激活词并预渲染
    if (chosenWords && chosenWords.length > 0) {
      this.currentActiveWord = chosenWords[0];
      this.currentDetailWord = chosenWords[0];
      if (this.dom.tabBtnDetail) {
        const nameSpan = this.dom.tabBtnDetail.querySelector(".tool-name");
        if (nameSpan) {
          nameSpan.innerText = `详解(${chosenWords[0].word})`;
        }
      }
      // 预先渲染详情视图，进入详情Tab立即呈现当前关卡首词
      this.renderDetailView(chosenWords[0]);
    }

    // 渲染网格
    this.renderGrid();
  }

  renderGrid() {
    this.dom.cardsGrid.innerHTML = "";
    this.dom.cardsGrid.className = this.currentGridClass || "cards-grid";

    this.currentCards.forEach(cardItem => {
      const cardEl = document.createElement("div");
      cardEl.className = `word-card ${cardItem.type === 'en' ? 'card-en' : 'card-cn'}`;
      cardEl.dataset.cardId = cardItem.id;
      cardEl.dataset.wordId = cardItem.wordId;
      cardEl.dataset.type = cardItem.type;

      cardEl.innerHTML = `
        <button class="card-detail-btn" title="查看【${cardItem.wordData.word}】详解">📘</button>
        <span class="card-badge">${cardItem.type === 'en' ? 'EN 🔊' : '中'}</span>
        <div class="main-text">${cardItem.text}</div>
        <div class="sub-text">${cardItem.subText}</div>
      `;

      cardEl.addEventListener("click", () => this.handleCardClick(cardItem, cardEl));

      // 双击卡片直接切到该词的详细学习
      cardEl.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        this.switchTab("detail", cardItem.wordData);
      });

      // 卡片左上角小图书直接查看详解
      const detailBtn = cardEl.querySelector(".card-detail-btn");
      if (detailBtn) {
        detailBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.switchTab("detail", cardItem.wordData);
        });
      }

      this.dom.cardsGrid.appendChild(cardEl);
      cardItem.element = cardEl;
    });
  }

  // 卡片点击逻辑
  handleCardClick(cardItem, cardEl) {
    if (this.isProcessing) return;
    if (cardEl.classList.contains("matched")) return;

    // 清除提示呼吸效果
    cardEl.classList.remove("hinted");

    // 音频反馈：若是英文卡，触发纯正语音朗读；同时播放泡泡音
    this.audio.playTap();
    this.currentActiveWord = cardItem.wordData;
    this.currentDetailWord = cardItem.wordData;
    
    // 动态同步底部详情Tab的显示提示并同步预渲染详情页面
    if (this.dom.tabBtnDetail) {
      const nameSpan = this.dom.tabBtnDetail.querySelector(".tool-name");
      if (nameSpan) {
        nameSpan.innerText = `详解(${cardItem.wordData.word})`;
      }
    }
    this.renderDetailView(cardItem.wordData);

    if (cardItem.type === 'en') {
      this.audio.speakWord(cardItem.wordData.word);
    }

    // 1. 如果尚未选中任何卡片
    if (!this.firstSelectedCard) {
      this.firstSelectedCard = { item: cardItem, el: cardEl };
      cardEl.classList.add("selected");
      return;
    }

    // 2. 如果点击了同一张卡片，则取消选中
    if (this.firstSelectedCard.item.id === cardItem.id) {
      this.firstSelectedCard.el.classList.remove("selected");
      this.firstSelectedCard = null;
      return;
    }

    // 3. 如果点击了同类型的卡片 (例如先点了一个英文，又点了另一个英文)
    if (this.firstSelectedCard.item.type === cardItem.type) {
      this.firstSelectedCard.el.classList.remove("selected");
      this.firstSelectedCard = { item: cardItem, el: cardEl };
      cardEl.classList.add("selected");
      return;
    }

    // 4. 一中一英，进行消消乐配对判定！
    const first = this.firstSelectedCard;
    const second = { item: cardItem, el: cardEl };
    second.el.classList.add("selected");

    this.isProcessing = true;

    if (first.item.wordId === second.item.wordId) {
      // ===== 配对成功！ =====
      this.handleMatchSuccess(first, second);
    } else {
      // ===== 配对错误 =====
      this.handleMatchFailure(first, second);
    }
  }

  // 匹配成功处理
  handleMatchSuccess(first, second) {
    this.combo++;
    this.startComboCountdown();

    // 播放和弦与连击音效
    if (this.combo > 1) {
      this.audio.playCombo(this.combo);
      this.showComboPopup(this.combo);
    } else {
      this.audio.playMatch();
    }

    // 果冻消除动画
    first.el.classList.remove("selected");
    second.el.classList.remove("selected");
    first.el.classList.add("matched");
    second.el.classList.add("matched");

    // 计算分数 (基础分 100 + 连击加成)
    const bonus = (this.combo - 1) * 35;
    const gainScore = 100 + bonus;
    const gainCoin = this.combo >= 3 ? 3 : 1;
    this.levelScore += gainScore;
    this.storage.addScoreAndCoins(gainScore, gainCoin, this.combo);
    this.updateStatsDisplay();

    // 关键记忆算法：更新掌握度，熟练度提升后减少出现
    const wordData = first.item.wordData;
    this.storage.recordSuccess(wordData.id);
    this.levelMatchedWords.push(wordData);

    // 粒子烟花特效
    this.spawnMatchParticles(first.el);
    this.spawnMatchParticles(second.el);

    this.matchedPairsCount++;
    this.firstSelectedCard = null;
    this.isProcessing = false;

    // 检查是否全部消除过关
    if (this.matchedPairsCount >= this.totalPairsCount) {
      setTimeout(() => this.handleLevelComplete(), 600);
    }
  }

  // 匹配错误处理
  handleMatchFailure(first, second) {
    this.resetCombo();
    this.audio.playWrong();

    first.el.classList.add("shake");
    second.el.classList.add("shake");

    // 记忆算法：答错降低掌握度，下局优先复习
    this.storage.recordFailure(first.item.wordId);
    this.storage.recordFailure(second.item.wordId);

    setTimeout(() => {
      first.el.classList.remove("selected", "shake");
      second.el.classList.remove("selected", "shake");
      this.firstSelectedCard = null;
      this.isProcessing = false;
    }, 450);
  }

  // 连击计时条
  startComboCountdown() {
    if (this.comboTimer) clearInterval(this.comboTimer);

    const startTime = Date.now();
    const duration = this.comboDuration;
    this.dom.comboText.innerText = `COMBO x${this.combo} !`;

    this.comboTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.max(0, 1 - (elapsed / duration));
      this.dom.comboFill.style.width = `${progress * 100}%`;

      if (progress <= 0) {
        this.resetCombo();
      }
    }, 50);
  }

  resetCombo() {
    if (this.comboTimer) clearInterval(this.comboTimer);
    this.combo = 0;
    this.dom.comboFill.style.width = "0%";
    this.dom.comboText.innerText = "连击快速消除奖励加倍";
  }

  // 连击飘字提示
  showComboPopup(combo) {
    const el = this.dom.comboPopup;
    el.innerText = `🔥 连击 x${combo}!`;
    el.classList.remove("show");
    void el.offsetWidth; // 触发重绘
    el.classList.add("show");
  }

  // 关卡胜利结算 (零漏词单元判定 + 错词回流考核)
  handleLevelComplete() {
    this.resetCombo();
    this.audio.playVictory();

    // 计算耗时与星级
    const durationSeconds = Math.max(1, Math.round((Date.now() - this.levelStartTime) / 1000));
    let stars = 3;
    if (durationSeconds > 40) stars = 2;
    if (durationSeconds > 70) stars = 1;

    // 零漏词核心判定：检查当前单元是否所有单词都已经全部学过并消除了
    const prog = this.storage.getModuleProgress(this.currentModuleWords);
    const isModuleFinished = prog.isAllCompleted;

    const nickname = this.storage.profile.nickname || "星澔";
    const modalTitle = this.dom.victoryModal.querySelector(".modal-title");

    let clearCoins = 0;
    let addScore = 0;

    if (isModuleFinished) {
      // 单元全部攻破！晋级下一单元关卡
      this.storage.advanceLevel();
      clearCoins = stars * 6 + 10;
      addScore = 300;
      this.storage.addScoreAndCoins(addScore, clearCoins);
      if (modalTitle) {
        modalTitle.innerText = `🏆 勋章盛典！${nickname} 已攻克整单元！`;
      }
      if (this.dom.btnNextLevel) {
        this.dom.btnNextLevel.innerText = "晋级下一单元 🚀";
      }
    } else {
      // 本局消除完成，但当前单元还有未学词汇，继续留在本单元学习剩余词汇
      clearCoins = stars * 3;
      addScore = 150;
      this.storage.addScoreAndCoins(addScore, clearCoins);
      if (modalTitle) {
        modalTitle.innerText = `🎉 太棒了，${nickname}！本单元还剩 ${prog.unlearned} 个新词！`;
      }
      if (this.dom.btnNextLevel) {
        this.dom.btnNextLevel.innerText = "下一局 (继续扫除新词) ⏩";
      }
    }

    this.updateStatsDisplay();
    this.dom.victoryStars.innerHTML = "⭐".repeat(stars) + "☆".repeat(3 - stars);
    this.dom.summaryScore.innerText = `+${this.levelScore + addScore} 分`;
    this.dom.summaryCoins.innerText = `+${clearCoins} 金币`;
    this.dom.summaryCombo.innerText = `${this.storage.profile.highestCombo} 次`;

    this.openModal(this.dom.victoryModal);
  }

  // 道具：💡 提示 (花费 15 金币)
  useHint() {
    if (this.isProcessing) return;

    // 查找一对未消除的中英文卡片
    const unMatchedCards = this.currentCards.filter(c => !c.element.classList.contains("matched"));
    if (unMatchedCards.length === 0) return;

    if (!this.storage.spendCoins(15)) {
      alert("金币不足！多完成消除连击可以赚取金币哦～");
      return;
    }
    this.updateStatsDisplay();
    this.audio.playPowerup();

    const targetWordId = unMatchedCards[0].wordId;
    const pair = unMatchedCards.filter(c => c.wordId === targetWordId);

    pair.forEach(c => {
      c.element.classList.add("hinted");
    });

    // 读出发音引导
    const enCard = pair.find(c => c.type === 'en');
    if (enCard) {
      this.audio.speakWord(enCard.wordData.word);
    }
  }

  // 道具：🔊 重读当前选中或任意单词
  useSpeakCurrent() {
    this.audio.playTap();
    if (this.firstSelectedCard && this.firstSelectedCard.item.type === 'en') {
      this.audio.speakWord(this.firstSelectedCard.item.wordData.word);
    } else {
      // 随机朗读盘面上未消除的一个英文
      const unMatchedEn = this.currentCards.find(c => c.type === 'en' && !c.element.classList.contains("matched"));
      if (unMatchedEn) {
        this.audio.speakWord(unMatchedEn.wordData.word);
      }
    }
  }

  // 主 Tab 视图切换控制器 (在游戏消除、单词详尽学习页与设置选关页之间无缝全屏切换)
  switchTab(tabName, targetWordData = null) {
    this.audio.playTap();
    this.currentTab = tabName;

    // 清除所有 Tab 与 View 的激活态
    if (this.dom.viewGame) this.dom.viewGame.classList.remove("active");
    if (this.dom.viewDetail) this.dom.viewDetail.classList.remove("active");
    if (this.dom.viewSettings) this.dom.viewSettings.classList.remove("active");

    if (this.dom.tabBtnGame) this.dom.tabBtnGame.classList.remove("active");
    if (this.dom.tabBtnDetail) this.dom.tabBtnDetail.classList.remove("active");
    if (this.dom.tabBtnSettings) this.dom.tabBtnSettings.classList.remove("active");

    if (tabName === "game") {
      if (this.dom.viewGame) this.dom.viewGame.classList.add("active");
      if (this.dom.tabBtnGame) this.dom.tabBtnGame.classList.add("active");
    } else if (tabName === "detail") {
      if (this.dom.viewDetail) this.dom.viewDetail.classList.add("active");
      if (this.dom.tabBtnDetail) this.dom.tabBtnDetail.classList.add("active");

      // 确定需要展示的单词：绝对优先使用用户当前选中的卡片！
      let wordObj = targetWordData;
      if (!wordObj) {
        // 1. 若消除盘面上当前正有选中的卡片，100% 第一优先级展示！
        if (this.firstSelectedCard && this.firstSelectedCard.item && this.firstSelectedCard.item.wordData) {
          wordObj = this.firstSelectedCard.item.wordData;
        } 
        // 2. 检查用户最近点击过的词
        else if (this.currentActiveWord) {
          wordObj = this.currentActiveWord;
        } 
        // 3. 盘面上未消除的英文卡
        else {
          const firstUnmatched = this.currentCards.find(c => c.type === 'en' && !c.element.classList.contains("matched"));
          wordObj = firstUnmatched ? firstUnmatched.wordData : (this.currentCards[0] ? this.currentCards[0].wordData : WORD_DATABASE[0]);
        }
      }

      this.renderDetailView(wordObj);
    } else if (tabName === "settings") {
      if (this.dom.viewSettings) this.dom.viewSettings.classList.add("active");
      if (this.dom.tabBtnSettings) this.dom.tabBtnSettings.classList.add("active");
      this.renderSettingsView();
    }
  }

  // 详尽页面前后翻词切换 (支持循环平滑轮播，永不卡死)
  navigateDetailWord(direction) {
    const stageWords = [...new Map(this.currentCards.map(c => [c.wordId, c.wordData])).values()];
    if (!stageWords.length) {
      if (this.currentDetailWord) {
        this.renderDetailView(this.currentDetailWord);
      }
      return;
    }

    let currentIndex = -1;
    if (this.currentDetailWord) {
      currentIndex = stageWords.findIndex(w => w.id === this.currentDetailWord.id);
    }

    let targetIndex = 0;
    if (currentIndex === -1) {
      targetIndex = direction > 0 ? 0 : stageWords.length - 1;
    } else {
      targetIndex = currentIndex + direction;
      // 循环轮播：最后一项切到第一项，第一项切到最后一项
      if (targetIndex >= stageWords.length) {
        targetIndex = 0;
      } else if (targetIndex < 0) {
        targetIndex = stageWords.length - 1;
      }
    }

    this.audio.playTap();
    this.renderDetailView(stageWords[targetIndex]);
  }

  // 渲染详尽单词学习界面 (精讲大卡、音节拆分、北京考点、高亮例句、短语胶囊、星级进度)
  renderDetailView(wordObj) {
    if (!wordObj) return;
    try {
      this.currentDetailWord = wordObj;
      this.currentActiveWord = wordObj;

      // 动态更新底部 Tab 上的指示文字，让用户一眼明了
      if (this.dom.tabBtnDetail) {
        const nameSpan = this.dom.tabBtnDetail.querySelector(".tool-name");
        if (nameSpan) {
          nameSpan.innerText = `详解(${wordObj.word})`;
        }
      }

      // 1. 获取本关卡全部单词
      const stageWords = [...new Map(this.currentCards.map(c => [c.wordId, c.wordData])).values()];
      let currentIndex = stageWords.findIndex(w => w.id === wordObj.id);
      if (currentIndex === -1) {
        // 若当前词不在本关卡内（如从生词本直接跳转），将其加入列表前端以便轮流研读
        stageWords.unshift(wordObj);
        currentIndex = 0;
      }

      // 2. 更新计数器与切换翻页按钮 (循环轮播，按钮始终可用)
      if (this.dom.detailStageCounter) {
        this.dom.detailStageCounter.innerText = `${currentIndex + 1}/${stageWords.length}`;
      }
      if (this.dom.btnPrevWord) {
        this.dom.btnPrevWord.disabled = false;
      }
      if (this.dom.btnNextWord) {
        this.dom.btnNextWord.disabled = false;
      }

      // 3. 渲染本关单词小药丸 (并自动平滑居中滚动)
      if (this.dom.detailStageWords) {
        this.dom.detailStageWords.innerHTML = "";
        stageWords.forEach(sw => {
          const chip = document.createElement("div");
          chip.className = `stage-word-chip ${sw.id === wordObj.id ? 'active' : ''}`;
          chip.innerText = sw.word;
          chip.title = `点击研读: ${sw.word} (${sw.meaning})`;
          chip.addEventListener("click", () => {
            this.audio.playTap();
            this.renderDetailView(sw);
          });
          this.dom.detailStageWords.appendChild(chip);
          if (sw.id === wordObj.id) {
            setTimeout(() => {
              chip.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }, 50);
          }
        });
      }

      // 4. 获取深度词典知识数据
      const comp = (typeof window !== "undefined" && window.getComprehensiveWordDetail) ? window.getComprehensiveWordDetail(wordObj) : (typeof getComprehensiveWordDetail === "function" ? getComprehensiveWordDetail(wordObj) : null);
      const rich = (typeof window !== "undefined" && window.getWordRichDetails) ? window.getWordRichDetails(wordObj) : (typeof getWordRichDetails === "function" ? getWordRichDetails(wordObj) : null);

      // 5. 顶部主视觉卡片数据注入
      if (this.dom.detailLevelTag) {
        this.dom.detailLevelTag.innerText = wordObj.stage ? `🏛️ ${wordObj.stage}·考纲核心` : `Level ${wordObj.level || 1} 考纲词`;
      }
      if (this.dom.detailCategoryTag) {
        this.dom.detailCategoryTag.innerText = `🏷️ ${wordObj.category || '核心日常'}`;
      }
      if (this.dom.detailPosTag) {
        this.dom.detailPosTag.innerText = comp ? `📘 ${comp.partOfSpeech}` : (rich ? `📘 ${rich.partOfSpeech}` : "📘 n. 名词");
      }

      if (this.dom.detailWordTitle) {
        this.dom.detailWordTitle.innerText = wordObj.word;
      }
      if (this.dom.detailSyllableVal) {
        this.dom.detailSyllableVal.innerText = comp ? comp.syllables : wordObj.word;
      }
      if (this.dom.detailPhonetic) {
        this.dom.detailPhonetic.innerText = wordObj.phonetic || '';
      }

      // 6. 模块 A: 中文释义与词态变化
      if (this.dom.detailMeaning) {
        this.dom.detailMeaning.innerText = wordObj.meaning;
      }
      if (this.dom.detailForms) {
        this.dom.detailForms.innerText = comp ? comp.forms : "常见词形标准变化";
      }

      // 7. 模块 B: 北京考纲提分/避坑要点
      if (this.dom.detailExamTip) {
        this.dom.detailExamTip.innerText = comp ? comp.examTip : "北京考纲高频考点，请牢固掌握见词能读、拼写无误与造句。";
      }

      // 8. 模块 C: 生活情境双语例句与关键词高亮
      let sentenceEn = `Let's practice the word "${wordObj.word}".`;
      let sentenceCn = `让我们一起学习和运用【${wordObj.meaning}】。`;
      if (comp && comp.sentenceEn) {
        sentenceEn = comp.sentenceEn;
        sentenceCn = comp.sentenceCn;
      } else if (typeof getWordExampleSentence === "function") {
        const s = getWordExampleSentence(wordObj);
        sentenceEn = s.en;
        sentenceCn = s.cn;
      }
      this.currentDetailSentence = sentenceEn;

      // 用正则给英文句子里的当前单词加上高亮背景
      if (this.dom.detailSentenceEn) {
        try {
          const reg = new RegExp(`\\b(${wordObj.word})\\b`, 'gi');
          const highlightedEn = sentenceEn.replace(reg, '<mark class="word-highlight">$1</mark>');
          this.dom.detailSentenceEn.innerHTML = highlightedEn || sentenceEn;
        } catch (e) {
          this.dom.detailSentenceEn.innerText = sentenceEn;
        }
      }
      if (this.dom.detailSentenceCn) {
        this.dom.detailSentenceCn.innerText = sentenceCn;
      }

      // 9. 模块 D: 常用搭配短语 (生成可点击跟读发音的胶囊标签)
      if (this.dom.detailPhrasesList) {
        this.dom.detailPhrasesList.innerHTML = "";
        const phrases = (comp && comp.phrases && comp.phrases.length) ? comp.phrases : (rich && rich.phrases ? rich.phrases : []);
        phrases.forEach(p => {
          const pill = document.createElement("div");
          pill.className = "collocation-pill";
          pill.innerHTML = `<span>🔗</span><span>${p}</span>`;
          pill.title = "点击跟读发音";
          pill.addEventListener("click", () => {
            this.audio.playTap();
            const enPhrase = p.split('(')[0].trim();
            this.audio.speakWord(enPhrase);
          });
          this.dom.detailPhrasesList.appendChild(pill);
        });
      }

      // 10. 模块 E: 自然拼读与助记技巧
      if (this.dom.detailMemoryTip) {
        this.dom.detailMemoryTip.innerText = comp ? comp.memoryTip : (rich ? rich.memoryTip : "通过自然拼读与日常接触快速联想记忆。");
      }

      // 11. 模块 F: 星澔学习档案
      const rec = this.storage.getWordRecord(wordObj.id);
      const times = rec.consecutive || 0;
      const starsCount = Math.min(5, Math.max(1, rec.mastery || (times >= 4 ? 5 : times + 1)));
      if (this.dom.detailMasteryStars) {
        this.dom.detailMasteryStars.innerText = "★".repeat(starsCount) + "☆".repeat(5 - starsCount);
      }
      if (this.dom.detailMasteryDesc) {
        if (rec.graduated || rec.mastery >= 5) {
          this.dom.detailMasteryDesc.innerText = "🎓 已完全掌握 (通关毕业，后续关卡不再出现)";
          this.dom.detailMasteryDesc.style.color = "#15803D";
        } else {
          this.dom.detailMasteryDesc.innerText = `📖 攻克中 (连续答对 ${times} 次，再对 ${Math.max(1, 4 - times)} 次即毕业)`;
          this.dom.detailMasteryDesc.style.color = "#92400E";
        }
      }

      // 自动朗读纯正真人美音
      this.audio.speakWord(wordObj.word);
    } catch (err) {
      console.error("renderDetailView error:", err);
    }
  }

  // 朗读当前详解卡片单词
  speakCurrentDetail() {
    if (this.currentDetailWord) {
      this.audio.speakWord(this.currentDetailWord.word);
    }
  }

  // 朗读当前例句
  speakCurrentSentence() {
    if (this.currentDetailSentence) {
      this.audio.speakWord(this.currentDetailSentence);
    }
  }

  // 打开生词本/掌握度统计面板
  openWordbook() {
    this.audio.playTap();
    const nickname = this.storage.profile.nickname || "星澔";
    const wbTitle = this.dom.wordbookModal.querySelector(".modal-title");
    if (wbTitle) {
      wbTitle.innerText = `📖 ${nickname}的词汇宝库`;
    }
    const stats = this.storage.getMasteryStatistics(WORD_DATABASE.length);
    this.dom.wbStatsSummary.innerHTML = `
      <div style="font-size: 13px; color: #475569; display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>🎓 已毕业(完全不出现): <b style="color:#10B981">${stats.graduatedCount}</b></span>
        <span>📖 正在复习: <b style="color:#F59E0B">${stats.learningCount}</b></span>
        <span>✨ 待探索: <b>${stats.freshCount}</b></span>
      </div>
      <div style="background:#E2E8F0; border-radius:10px; height:8px; overflow:hidden; display:flex;">
        <div style="background:#10B981; width:${stats.masteredPercentage}%;"></div>
      </div>
    `;

    // 渲染词汇列表
    this.dom.wbList.innerHTML = "";
    // 展示前 100 个核心词汇
    const showList = WORD_DATABASE.slice(0, 100);
    showList.forEach(w => {
      const rec = this.storage.getWordRecord(w.id);
      const isGraduated = rec.graduated || rec.mastery >= 5;
      const isLearning = !isGraduated && rec.mastery >= 1;

      const itemDiv = document.createElement("div");
      itemDiv.className = `wordbook-item ${isGraduated ? 'mastered' : (isLearning ? 'learning' : '')}`;
      itemDiv.innerHTML = `
        <div class="wb-left">
          <div class="wb-en">
            ${w.word}
            <span style="font-size:11px; color:#64748B;">${w.phonetic}</span>
            ${isGraduated ? '<span style="background:#DCFCE7; color:#15803D; font-size:10px; padding:1px 5px; border-radius:6px; font-weight:700;">🎓不再出现</span>' : ''}
          </div>
          <div class="wb-cn">${w.meaning} · [${w.stage || '北京小学'} · ${w.category}]</div>
        </div>
        <div class="wb-right">
          <button class="mini-speak-btn" title="试听发音">🔊</button>
          <button class="wb-action-btn study" style="font-size:11px; padding:3px 8px; border-radius:8px; border:1px solid #C7D2FE; background:#EEF2FF; color:#4F46E5; font-weight:700; cursor:pointer;" title="查看单词详细解释与例句">📘 详解</button>
          ${isGraduated 
            ? `<button class="wb-action-btn reset" style="font-size:11px; padding:3px 8px; border-radius:8px; border:1px solid #CBD5E1; background:white; cursor:pointer;" title="移回练习池">重练</button>`
            : `<button class="wb-action-btn mark" style="font-size:11px; padding:3px 8px; border-radius:8px; border:none; background:#E0F2FE; color:#0369A1; font-weight:700; cursor:pointer;" title="标记为已会，以后不再出现">已会</button>`
          }
        </div>
      `;

      // 试听真人发音
      itemDiv.querySelector(".mini-speak-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        this.audio.speakWord(w.word);
      });

      // 显式点击【📘 详解】按钮
      const studyBtn = itemDiv.querySelector(".wb-action-btn.study");
      if (studyBtn) {
        studyBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.closeModal(this.dom.wordbookModal);
          this.switchTab("detail", w);
        });
      }

      // 点击词条左侧也可以快速查看详细例句解释 (切换至详情Tab)
      itemDiv.querySelector(".wb-left").style.cursor = "pointer";
      itemDiv.querySelector(".wb-left").addEventListener("click", () => {
        this.closeModal(this.dom.wordbookModal);
        this.switchTab("detail", w);
      });

      // 手动控制毕业/重练
      const actionBtn = itemDiv.querySelector(".wb-action-btn");
      if (actionBtn) {
        actionBtn.addEventListener("click", () => {
          this.audio.playTap();
          if (isGraduated) {
            this.storage.resetMastery(w.id);
          } else {
            this.storage.markAsMastered(w.id);
          }
          this.openWordbook(); // 重新刷新列表状态
        });
      }

      this.dom.wbList.appendChild(itemDiv);
    });

    this.openModal(this.dom.wordbookModal);
  }

  // 获取关卡对应的年级、学期与单元详细元数据
  getLevelMetaInfo(level) {
    const curLevel = parseInt(level) || 1;
    if (curLevel === 1) {
      return {
        level: 1,
        grade: "外研社·三年级上册",
        module: "Module 1",
        title: "🎒 外研三上·M1 基础问候",
        subTitle: "最简单的高频问候与交友 (hello, morning, you, I...)",
        countDesc: "包含 12 个重点词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 2) {
      return {
        level: 2,
        grade: "外研社·三年级上册",
        module: "Module 2",
        title: "🎒 外研三上·M2 自我介绍",
        subTitle: "姓名称谓与礼貌交际 (what, name, boy, girl...)",
        countDesc: "包含 10 个重点词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 3) {
      return {
        level: 3,
        grade: "外研社·三年级上册",
        module: "Module 3",
        title: "🎒 外研三上·M3 教室指令",
        subTitle: "教室环境与动作指令 (door, window, desk, chair...)",
        countDesc: "包含 12 个重点词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 4) {
      return {
        level: 4,
        grade: "外研社·三年级上册",
        module: "Module 4",
        title: "🎒 外研三上·M4 缤纷色彩",
        subTitle: "绚丽色彩与可爱宠物 (red, blue, yellow, dog, cat...)",
        countDesc: "包含 12 个重点词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 5) {
      return {
        level: 5,
        grade: "外研社·三年级上册",
        module: "Module 5",
        title: "🎒 外研三上·M5 趣味数字",
        subTitle: "英文数字1~12 (one, two, three, ten, twelve...)",
        countDesc: "包含 13 个重点词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 6) {
      return {
        level: 6,
        grade: "外研社·三年级上册",
        module: "Module 6",
        title: "🎒 外研三上·M6 校园文具",
        subTitle: "上学文具与书包 (school, bag, pen, pencil, book...)",
        countDesc: "包含 11 个重点词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 7) {
      return {
        level: 7,
        grade: "外研社·三年级上册",
        module: "Module 7",
        title: "🎒 外研三上·M7 生日庆祝",
        subTitle: "生日派对与分享美食 (happy, birthday, cake, present...)",
        countDesc: "包含 6 个重点词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 8) {
      return {
        level: 8,
        grade: "外研社·三年级上册",
        module: "Module 8",
        title: "🎒 外研三上·M8 空间方位",
        subTitle: "空间介词与方位寻物 (in, on, under, kite, bed...)",
        countDesc: "包含 11 个重点词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 9) {
      return {
        level: 9,
        grade: "外研社·三年级上册",
        module: "Module 9",
        title: "🎒 外研三上·M9 家庭与职业",
        subTitle: "亲情称呼与社会职业 (father, mother, doctor, teacher...)",
        countDesc: "包含 13 个重点词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 10) {
      return {
        level: 10,
        grade: "外研社·三年级上册",
        module: "Module 10",
        title: "🎒 外研三上·M10 五官与身体",
        subTitle: "认识身体与五官部位 (head, arm, leg, eye, ear...)",
        countDesc: "包含 10 个重点词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 11) {
      return {
        level: 11,
        grade: "外研社·三年级上册",
        module: "期末总通关",
        title: "🎒 外研三上·全册综合巩固",
        subTitle: "三年级上册全册核心词汇大通关",
        countDesc: "包含全册 110 个核心词 · 期末总通关"
      };
    } else if (curLevel === 12) {
      return {
        level: 12,
        grade: "外研社·三年级下册",
        module: "Module 1",
        title: "🎒 外研三下·M1 动物爱好",
        subTitle: "喜爱的动物 (favourite, animal, dog...)",
        countDesc: "包含 5 个核心词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 13) {
      return {
        level: 13,
        grade: "外研社·三年级下册",
        module: "Module 2",
        title: "🎒 外研三下·M2 动物园探秘",
        subTitle: "动物园伙伴 (monkey, tiger, lion, big...)",
        countDesc: "包含 13 个核心词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 14) {
      return {
        level: 14,
        grade: "外研社·三年级下册",
        module: "Module 3",
        title: "🎒 外研三下·M3 运动与爱好",
        subTitle: "体育运动 (football, basketball, like...)",
        countDesc: "包含 7 个核心词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 15) {
      return {
        level: 15,
        grade: "外研社·三年级下册",
        module: "Module 4",
        title: "🎒 外研三下·M4 饮食日常",
        subTitle: "一日三餐与肉菜主食 (meat, rice, noodles, fish...)",
        countDesc: "包含 9 个核心词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 16) {
      return {
        level: 16,
        grade: "外研社·三年级下册",
        module: "Module 5",
        title: "🎒 外研三下·M5 购物与食物",
        subTitle: "超市采买与果蔬 (buy, tea, banana, apple...)",
        countDesc: "包含 8 个核心词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 17) {
      return {
        level: 17,
        grade: "外研社·三年级下册",
        module: "Module 6",
        title: "🎒 外研三下·M6 星期与课程",
        subTitle: "一周七天与各学科 (Monday, Chinese, Maths...)",
        countDesc: "包含 12 个核心词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 18) {
      return {
        level: 18,
        grade: "外研社·三年级下册",
        module: "Module 7",
        title: "🎒 外研三下·M7 四季与节气",
        subTitle: "春夏秋冬四季景致 (spring, summer, warm, hot...)",
        countDesc: "包含 13 个核心词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 19) {
      return {
        level: 19,
        grade: "外研社·三年级下册",
        module: "Module 8",
        title: "🎒 外研三下·M8 服装穿搭",
        subTitle: "四季衣物与鞋帽 (sweater, coat, dress, cap...)",
        countDesc: "包含 6 个核心词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 20) {
      return {
        level: 20,
        grade: "外研社·三年级下册",
        module: "Module 9",
        title: "🎒 外研三下·M9 居家与房间",
        subTitle: "家庭居室 (bedroom, living room...)",
        countDesc: "包含 4 个核心词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel === 21) {
      return {
        level: 21,
        grade: "外研社·三年级下册",
        module: "Module 10",
        title: "🎒 外研三下·M10 交通工具",
        subTitle: "出行工具 (bus, car, bike, taxi...)",
        countDesc: "包含 5 个核心词 · 零漏词全掌握后晋级"
      };
    } else if (curLevel <= 25) {
      return {
        level: curLevel,
        grade: "外研社·三年级下册",
        module: "期末综合冲刺",
        title: `🎒 外研三下·全册冲刺 (第${curLevel}关)`,
        subTitle: "三年级下册核心考点全面巩固",
        countDesc: "包含三下全册 82 个核心考纲词"
      };
    } else if (curLevel <= 40) {
      return {
        level: curLevel,
        grade: "外研社·四年级全册",
        module: `进阶第${curLevel - 25}单元`,
        title: `📘 外研四年级·进阶篇 (第${curLevel}关)`,
        subTitle: "四年级课本重点语法与大纲词汇",
        countDesc: "外研四年级上册与下册重点核心词"
      };
    } else if (curLevel <= 55) {
      return {
        level: curLevel,
        grade: "外研社·五六年级",
        module: "小学毕业·小升初",
        title: `📗 外研五六年级·小升初 (第${curLevel}关)`,
        subTitle: "小学毕业考与小升初核心必考词",
        countDesc: "覆盖北京小学段完整 800 核心词"
      };
    } else if (curLevel <= 75) {
      return {
        level: curLevel,
        grade: "北京初中全学段",
        module: "中考核心大纲",
        title: `🎯 北京初中·中考核心 (第${curLevel}关)`,
        subTitle: "中考高频必背1600词",
        countDesc: "中考必考考点与核心拓展词汇"
      };
    } else {
      return {
        level: curLevel,
        grade: "北京高中全学段",
        module: "高考终极巅峰",
        title: `🏛️ 北京高中·高考巅峰 (第${curLevel}关)`,
        subTitle: "3500词终极大通关无限生成",
        countDesc: "高中高考全部 3500 词大通关"
      };
    }
  }

  // 选关下拉框选项构建 (覆盖全 75 关 + 高考大关)
  populateLevelSelect() {
    if (!this.dom.levelSelectDropdown) return;
    const select = this.dom.levelSelectDropdown;
    select.innerHTML = "";

    const groups = [
      {
        label: "🎒 外研社·三年级上册 (Module 1 ~ 10)",
        levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      },
      {
        label: "🎒 外研社·三年级下册 (Module 1 ~ 10)",
        levels: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
      },
      {
        label: "📘 外研社·四年级全册进阶",
        levels: [26, 28, 30, 32, 35, 38, 40]
      },
      {
        label: "📗 外研五六年级·小升初核心",
        levels: [41, 45, 50, 55]
      },
      {
        label: "🎯 北京初中·中考必考核心1600词",
        levels: [56, 60, 65, 70, 75]
      },
      {
        label: "🏛️ 北京高中·高考巅峰3500词大通关",
        levels: [76]
      }
    ];

    groups.forEach(g => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = g.label;
      g.levels.forEach(lvl => {
        const meta = this.getLevelMetaInfo(lvl);
        const opt = document.createElement("option");
        opt.value = lvl;
        opt.innerText = `第 ${lvl} 关 · ${meta.module} ${meta.title.replace(/^[^a-zA-Z0-9\u4e00-\u9fa5]+/, '')}`;
        optgroup.appendChild(opt);
      });
      select.appendChild(optgroup);
    });
  }

  // 动态更新选中的关卡对应的年级单元信息
  updateLevelExplainDisplay(level) {
    const meta = this.getLevelMetaInfo(level);
    if (this.dom.explainGradeTag) this.dom.explainGradeTag.innerText = meta.grade;
    if (this.dom.explainUnitTag) this.dom.explainUnitTag.innerText = meta.module;
    if (this.dom.explainName) this.dom.explainName.innerText = meta.title;
    if (this.dom.explainSub) this.dom.explainSub.innerText = meta.subTitle;
    if (this.dom.explainCount) this.dom.explainCount.innerText = meta.countDesc;
  }

  // 执行自主跳转换关
  handleJumpLevelClick() {
    if (!this.dom.levelSelectDropdown) return;
    const targetLevel = parseInt(this.dom.levelSelectDropdown.value) || 1;
    
    this.audio.playPowerup();
    this.storage.profile.level = targetLevel;
    this.storage.saveProfile();

    // 立即平滑切回游戏消除主 Tab 页面，并以所选关卡开局
    this.switchTab("game");
    this.startNewGameLevel();
  }

  // 渲染全屏设置 Tab 页面视图
  renderSettingsView() {
    this.populateLevelSelect();
    const curLevel = this.storage.profile.level || 1;
    if (this.dom.levelSelectDropdown) {
      this.dom.levelSelectDropdown.value = curLevel;
    }
    this.updateLevelExplainDisplay(curLevel);

    if (this.dom.chkSound) this.dom.chkSound.checked = this.storage.settings.sound;
    if (this.dom.chkSpeech) this.dom.chkSpeech.checked = this.storage.settings.speech;
  }

  // 打开设置 (兼容接口，统一由 switchTab 控制)
  openSettings() {
    this.switchTab("settings");
  }

  openModal(modalEl) {
    modalEl.classList.add("active");
  }

  closeModal(modalEl) {
    modalEl.classList.remove("active");
  }

  // 消除粒子特效
  spawnMatchParticles(cardEl) {
    const rect = cardEl.getBoundingClientRect();
    const containerRect = this.dom.particlesLayer.getBoundingClientRect();
    const centerX = rect.left - containerRect.left + rect.width / 2;
    const centerY = rect.top - containerRect.top + rect.height / 2;

    const colors = ["#F59E0B", "#10B981", "#60A5FA", "#EC4899", "#8B5CF6"];
    for (let i = 0; i < 8; i++) {
      const p = document.createElement("div");
      const angle = (Math.PI * 2 * i) / 8;
      const dist = 35 + Math.random() * 25;
      const targetX = Math.cos(angle) * dist;
      const targetY = Math.sin(angle) * dist;

      p.style.cssText = `
        position: absolute;
        left: ${centerX}px;
        top: ${centerY}px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        transition: transform 0.5s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.5s ease;
        z-index: 80;
      `;
      this.dom.particlesLayer.appendChild(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.2)`;
        p.style.opacity = "0";
      });

      setTimeout(() => p.remove(), 550);
    }
  }

  // Fisher-Yates 随机打乱数组
  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

// 页面加载完成后启动
window.addEventListener("DOMContentLoaded", () => {
  window.game = new GameCore();
});
