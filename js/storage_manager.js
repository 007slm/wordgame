/**
 * 单词消消乐 - 本地存储与智能记忆管理引擎
 * 1. 利用 LocalStorage 持久化用户画像、积分、金币、关卡与设置
 * 2. 记忆掌握度调度算法：会背的 (Mastery 高) 抽取概率急剧降低，生词/错词高频轮训
 */

class StorageManager {
  constructor() {
    this.KEY_PROFILE = "wordgame_v1_profile";
    this.KEY_MASTERY = "wordgame_v1_mastery";
    this.KEY_SETTINGS = "wordgame_v1_settings";

    this.profile = this.loadProfile();
    this.masteryMap = this.loadMastery();
    this.settings = this.loadSettings();
  }

  // 加载或初始化用户画像
  loadProfile() {
    const defaultProfile = {
      nickname: "星澔",
      totalScore: 0,
      coins: 50, // 初始赠送金币用于体验提示
      level: 1, // 当前最高解锁关卡
      highestCombo: 0,
      totalMatched: 0,
      createdAt: Date.now()
    };

    try {
      const data = localStorage.getItem(this.KEY_PROFILE);
      const loaded = data ? Object.assign(defaultProfile, JSON.parse(data)) : defaultProfile;
      // 若原先是旧默认名，更新为 星澔
      if (!loaded.nickname || loaded.nickname === "小小探索家") {
        loaded.nickname = "星澔";
      }
      return loaded;
    } catch (e) {
      return defaultProfile;
    }
  }

  saveProfile() {
    try {
      localStorage.setItem(this.KEY_PROFILE, JSON.stringify(this.profile));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }

  // 加载单词掌握度记录
  loadMastery() {
    try {
      const data = localStorage.getItem(this.KEY_MASTERY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveMastery() {
    try {
      localStorage.setItem(this.KEY_MASTERY, JSON.stringify(this.masteryMap));
    } catch (e) {
      console.warn("Mastery save error:", e);
    }
  }

  // 加载设置
  loadSettings() {
    const defaultSettings = {
      sound: true,
      speech: true,
      speechRate: 0.85,
      selectedLevel: 1 // 1: 基础, 2: 进阶, 3: 挑战
    };

    try {
      const data = localStorage.getItem(this.KEY_SETTINGS);
      return data ? Object.assign(defaultSettings, JSON.parse(data)) : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  }

  saveSettings() {
    try {
      localStorage.setItem(this.KEY_SETTINGS, JSON.stringify(this.settings));
    } catch (e) {
      console.warn("Settings save error:", e);
    }
  }

  // 获取单个单词掌握度状态 (包含毕业出池状态)
  getWordRecord(wordId) {
    if (!this.masteryMap[wordId]) {
      this.masteryMap[wordId] = {
        mastery: 0,        // 0: 生词, 1~4: 学习巩固中, 5: 完全掌握毕业(不再出现)
        correct: 0,        // 累计正确消除次数
        wrong: 0,          // 累计错误次数
        consecutive: 0,    // 连续正确次数 (Streak)
        graduated: false,  // 是否已完全掌握毕业 (毕业后默认完全不再出现)
        lastSeen: 0
      };
    }
    return this.masteryMap[wordId];
  }

  // 记录一次消除成功 (提升掌握度：曾做错过的单词必须连续答对>=3次且总正确>=4次才毕业出池)
  recordSuccess(wordId) {
    const rec = this.getWordRecord(wordId);
    rec.correct++;
    rec.consecutive++;
    rec.lastSeen = Date.now();

    const hadMistakes = (rec.wrong > 0);

    // 核心毕业判定逻辑：
    // 1. 若此词曾做错过 (hadMistakes = true)：严格考核，必须在后续游戏中连续答对至少 3 次且累计正确至少 4 次，才算彻底掌握毕业！
    // 2. 若此词从没错过：连续答对 3 次直接毕业！
    const canGraduate = hadMistakes 
      ? (rec.consecutive >= 3 && rec.correct >= 4)
      : (rec.consecutive >= 3);

    if (canGraduate) {
      rec.mastery = 5;
      rec.graduated = true;
    } else {
      rec.graduated = false;
      rec.mastery = Math.min(4, Math.max(1, rec.consecutive));
    }

    this.profile.totalMatched++;
    this.saveMastery();
    this.saveProfile();
    return rec;
  }

  // 记录一次配对错误 (跌落重练：立即取消毕业状态，连续连对清零，重回重点复习池)
  recordFailure(wordId) {
    const rec = this.getWordRecord(wordId);
    rec.wrong++;
    rec.consecutive = 0;   // 连续答对次数彻底清零！
    rec.graduated = false; // 彻底取消毕业状态！
    rec.mastery = 0;       // 跌回初学等级
    rec.lastSeen = Date.now();

    this.saveMastery();
    return rec;
  }

  // 计算当前单元的掌握统计
  getModuleProgress(moduleWords) {
    if (!moduleWords || moduleWords.length === 0) {
      return { total: 0, learned: 0, mastered: 0, unlearned: 0, percentage: 0, isAllCompleted: false };
    }
    const total = moduleWords.length;
    let learnedCount = 0;   // 至少露面且正确消除过 1 次
    let masteredCount = 0;  // 达到连续答对 2 次以上或已毕业

    moduleWords.forEach(w => {
      const rec = this.getWordRecord(w.id);
      if (rec.correct > 0) learnedCount++;
      if (rec.graduated || rec.consecutive >= 2) masteredCount++;
    });

    const percentage = Math.round((learnedCount / total) * 100);
    // 单元通关核心标志：当前单元内 100% 的单词全部已经出题且消除正确！
    const isAllCompleted = (learnedCount >= total);

    return {
      total: total,
      learned: learnedCount,
      mastered: masteredCount,
      unlearned: total - learnedCount,
      percentage: percentage,
      isAllCompleted: isAllCompleted
    };
  }

  /**
   * 零漏词单元推进 + 历史错词概率回流核心出题算法：
   * @param {Array} currentModuleWords 当前单元的全部词汇列表 (如 Module 1 的 12 个词)
   * @param {Array} allHistoryWords    已经学过的历史单元词汇列表 (用于回流抽查)
   * @param {number} count             本局需要抽取的单词对数 (例如 4 或 5)
   */
  pickModuleWordsWithReview(currentModuleWords, allHistoryWords = [], count = 4) {
    if (!currentModuleWords || currentModuleWords.length === 0) return [];
    if (currentModuleWords.length <= count) return [...currentModuleWords];

    const selectedWords = [];
    const usedWordIds = new Set();

    // 1. 【核心保证 2：历史错词 55% 概率回流重现抽查】
    // 找出所有已学历史词汇中曾做错过、且连续答对未满 3 次的薄弱词
    const weakReviewPool = allHistoryWords.filter(item => {
      const rec = this.getWordRecord(item.id);
      return (rec.wrong > 0 && rec.consecutive < 3);
    });

    let reviewWord = null;
    if (weakReviewPool.length > 0 && Math.random() < 0.55) {
      // 优先抽查错误次数最多、连续正确次数最少的薄弱词
      const sortedWeak = [...weakReviewPool].sort((a, b) => {
        const recA = this.getWordRecord(a.id);
        const recB = this.getWordRecord(b.id);
        return (recB.wrong - recB.consecutive * 2) - (recA.wrong - recA.consecutive * 2);
      });
      reviewWord = sortedWeak[0];
    }

    // 2. 【核心保证 1：零漏词机制】优先排满本单元中「全新生词 (从没被正确消除过 correct === 0)」
    const unlearnedWords = currentModuleWords.filter(item => {
      const rec = this.getWordRecord(item.id);
      return rec.correct === 0 && !rec.graduated;
    });

    // 若有错词抽查，生词最多占用 count - 1 个席位；若无错词抽查，生词可占满全部 count 个席位！
    const maxNewWords = reviewWord ? Math.max(1, count - 1) : count;
    if (unlearnedWords.length > 0) {
      const shuffledUnlearned = [...unlearnedWords].sort(() => Math.random() - 0.5);
      const newWordsToTake = Math.min(shuffledUnlearned.length, maxNewWords);
      for (let i = 0; i < newWordsToTake; i++) {
        selectedWords.push(shuffledUnlearned[i]);
        usedWordIds.add(shuffledUnlearned[i].id);
      }
    }

    // 将抽查的回流错词加入当局
    if (reviewWord && !usedWordIds.has(reviewWord.id) && selectedWords.length < count) {
      selectedWords.push(reviewWord);
      usedWordIds.add(reviewWord.id);
    }

    // 3. 【补齐剩余名额】：从当前单元未毕业的词中按艾宾浩斯记忆权重补齐
    if (selectedWords.length < count) {
      const remainingCandidates = currentModuleWords.filter(item => !usedWordIds.has(item.id));
      const remainingNeeded = count - selectedWords.length;
      const fillerWords = this.pickWordsForGame(remainingCandidates, remainingNeeded);
      fillerWords.forEach(w => {
        if (!usedWordIds.has(w.id)) {
          selectedWords.push(w);
          usedWordIds.add(w.id);
        }
      });
    }

    // 4. 若极少数情况下名额仍不够，从当前单元直接补齐
    if (selectedWords.length < count) {
      for (const w of currentModuleWords) {
        if (!usedWordIds.has(w.id) && selectedWords.length < count) {
          selectedWords.push(w);
          usedWordIds.add(w.id);
        }
      }
    }

    // 随机打乱出题顺序
    return selectedWords.sort(() => Math.random() - 0.5);
  }

  // 手动在生词本中将单词标记为“已完全掌握 (直接毕业，完全不再出现)”
  markAsMastered(wordId) {
    const rec = this.getWordRecord(wordId);
    rec.mastery = 5;
    rec.consecutive = 5;
    rec.graduated = true;
    this.saveMastery();
  }

  // 手动在生词本中将单词重置为“生词 (重新入池，优先练习)”
  resetMastery(wordId) {
    const rec = this.getWordRecord(wordId);
    rec.mastery = 0;
    rec.consecutive = 0;
    rec.graduated = false;
    rec.wrong = Math.max(rec.wrong, 2); // 保持较高复习权重
    this.saveMastery();
  }

  /**
   * 核心智能出题算法：
   * 1. 已经完全掌握毕业的 (graduated / mastery >= 5) -> 【完全不出现】(除非全库词汇全部毕业)
   * 2. 会背中的 (mastery 1~4) -> 出现次数急剧减少 (指数级降低)
   * 3. 生词与错题 -> 赋予最高优先级权重，确保攻克薄弱点
   */
  pickWordsForGame(wordList, count = 6) {
    if (!wordList || wordList.length === 0) return [];
    if (wordList.length <= count) return [...wordList];

    // 第一步：过滤已完全掌握毕业的词 (完全不出现机制)
    const ungraduatedWords = wordList.filter(item => {
      const rec = this.getWordRecord(item.id);
      return !rec.graduated && rec.mastery < 5;
    });

    // 如果未毕业的生词/复习词足够，则 100% 仅在未毕业词中加权抽取；
    // 只有当候选词库绝大部分都背会了、生词不够一局时，才从全部词库中补齐
    let candidatePool = ungraduatedWords.length >= count ? ungraduatedWords : wordList;

    // 第二步：计算每个词的动态艾宾浩斯权重
    const weightedItems = candidatePool.map(item => {
      const rec = this.getWordRecord(item.id);
      let weight = 100;

      if (rec.graduated || rec.mastery >= 5) {
        // 已毕业词若被迫入池（生词耗尽），权重降为极低的 1
        weight = 1;
      } else if (rec.mastery === 0) {
        // 全新生词，高权重 100；若是错题，强化加权
        weight = 100 + (rec.wrong * 30);
      } else {
        // 掌握度 1~4 级：指数级衰减，急剧减少打扰
        // mastery=1: 权重 25 (减少75%)
        // mastery=2: 权重 8  (减少92%)
        // mastery=3: 权重 3  (减少97%)
        // mastery=4: 权重 1  (减少99%)
        const decayBase = Math.pow(rec.mastery + 1, 2.5);
        weight = Math.max(2, Math.round(100 / decayBase));

        // 如果该词答错比答对多，说明是顽固错词，紧急提升权重
        if (rec.wrong > rec.correct) {
          weight += (rec.wrong - rec.correct) * 20;
        }
      }

      return { word: item, weight: weight };
    });

    // 第三步：无放回加权随机抽样 (Weighted Random Sampling without replacement)
    const selected = [];
    const poolCopy = [...weightedItems];

    while (selected.length < count && poolCopy.length > 0) {
      const totalWeight = poolCopy.reduce((sum, item) => sum + item.weight, 0);
      let rand = Math.random() * totalWeight;

      let chosenIndex = 0;
      for (let i = 0; i < poolCopy.length; i++) {
        rand -= poolCopy[i].weight;
        if (rand <= 0) {
          chosenIndex = i;
          break;
        }
      }

      selected.push(poolCopy[chosenIndex].word);
      poolCopy.splice(chosenIndex, 1);
    }

    return selected;
  }

  // 增加积分与金币
  addScoreAndCoins(scoreDelta, coinsDelta = 0, combo = 0) {
    this.profile.totalScore += scoreDelta;
    this.profile.coins += coinsDelta;
    if (combo > this.profile.highestCombo) {
      this.profile.highestCombo = combo;
    }
    this.saveProfile();
  }

  // 解锁下一关卡
  advanceLevel() {
    this.profile.level++;
    this.saveProfile();
  }

  // 消费金币
  spendCoins(amount) {
    if (this.profile.coins >= amount) {
      this.profile.coins -= amount;
      this.saveProfile();
      return true;
    }
    return false;
  }

  // 获取掌握度统计指标 (精准统计毕业词数)
  getMasteryStatistics(totalVocabularyCount) {
    let graduatedCount = 0; // 已完全掌握毕业 (彻底不出现)
    let learningCount = 0;  // 学习巩固中 (出现极少)
    let freshCount = 0;     // 未学过新词

    const recordKeys = Object.keys(this.masteryMap);
    recordKeys.forEach(id => {
      const rec = this.masteryMap[id];
      if (rec.graduated || rec.mastery >= 5) {
        graduatedCount++;
      } else if (rec.mastery >= 1) {
        learningCount++;
      }
    });

    freshCount = Math.max(0, totalVocabularyCount - graduatedCount - learningCount);

    return {
      graduatedCount,
      learningCount,
      freshCount,
      totalCount: totalVocabularyCount,
      masteredPercentage: Math.min(100, Math.round((graduatedCount / totalVocabularyCount) * 100))
    };
  }
}

if (typeof window !== 'undefined') {
  window.StorageManager = StorageManager;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StorageManager;
}
