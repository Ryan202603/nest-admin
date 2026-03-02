import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FoodsService } from './foods/foods.service'
import { CreateFoodDto } from './foods/dto/create-food.dto'

// 1. 这里是来自 data.uts 的真实数据
const mockFoods = [
  {
    name: '番茄',
    cover: '', // 图片待补充
    desc: '鲜红多汁，酸甜适口',
    season: '夏季',
    category: '蔬菜',
    nutrition: '富含番茄红素、维生素C和钾，有助于抗氧化、保护皮肤、调节血压。',
    tips: '选择果皮光亮、色泽鲜红、手感结实的番茄。',
    pairings: '番茄炒蛋、意式番茄沙司、番茄牛腩'
  },
  {
    name: '草莓',
    cover: '',
    desc: '春日甜美果实，酸甜可口',
    season: '春季',
    category: '水果',
    nutrition: '富含维生素C、花青素和膳食纤维，有助于增强免疫力、抗氧化、促进肠道健康。',
    tips: '挑选果蒂绿色、果粒饱满、色泽鲜红的草莓。',
    pairings: '草莓奶昔、草莓蛋糕、草莓酸奶碗'
  },
  {
    name: '黄瓜',
    cover: '',
    desc: '清爽脆嫩，夏日解暑',
    season: '夏季',
    category: '蔬菜',
    nutrition: '含水量高，富含维生素K、钾和抗氧化物，有助于补水、利尿、清热降火。',
    tips: '挑选表皮绿色、挺直、无皱缩的黄瓜。',
    pairings: '拍黄瓜、黄瓜鸡蛋汤、黄瓜三明治'
  },
  {
    name: '西兰花',
    cover: '',
    desc: '翠绿营养，口感爽脆',
    season: '冬季',
    category: '蔬菜',
    nutrition: '富含维生素C、叶酸和膳食纤维，有助于增强免疫力、促进细胞修复、改善肠道功能。',
    tips: '选择花球紧实、颜色深绿、无黄斑的西兰花。',
    pairings: '清炒西兰花、西兰花牛肉、蒜蓉西兰花'
  },
  {
    name: '香蕉',
    cover: '',
    desc: '香甜软糯，能量补给',
    season: '四季',
    category: '水果',
    nutrition: '富含钾、镁和维生素B6，有助于缓解疲劳、调节神经系统、预防肌肉痉挛。',
    tips: '选择果皮金黄、有少量斑点、手感柔软的香蕉。',
    pairings: '香蕉奶昔、香蕉煎饼、燕麦香蕉碗'
  },
  {
    name: '橙子',
    cover: '',
    desc: '酸甜多汁，冬季常见',
    season: '冬季',
    category: '水果',
    nutrition: '富含维生素C、类黄酮和膳食纤维，有助于增强免疫力、抗炎、促进消化。',
    tips: '挑选果皮紧致、色泽鲜亮、重量较重的橙子。',
    pairings: '鲜榨橙汁、橙子沙拉、橙香烤鸡'
  },
  {
    name: '甘蓝',
    cover: '',
    desc: '叶片饱满，清脆爽口',
    season: '冬季',
    category: '蔬菜',
    nutrition: '富含维生素K、维生素C和硫化物，有助于抗炎、促进骨骼健康、保护肝脏。',
    tips: '选择叶球紧实、外叶翠绿、无虫斑的甘蓝。',
    pairings: '甘蓝炒肉、凉拌甘蓝丝、甘蓝卷'
  },
  {
    name: '竹笋',
    cover: '',
    desc: '春天的馈赠，鲜嫩脆爽',
    season: '春季',
    category: '蔬菜',
    nutrition: '富含植物蛋白、粗纤维和钾，有助于促进肠道蠕动、利尿、降脂。',
    tips: '挑选外壳黄亮、肉质洁白、体态丰满的春笋。',
    pairings: '腌笃鲜、油焖春笋、春笋炒肉'
  },
  {
    name: '羽衣甘蓝',
    cover: '',
    desc: '超级蔬菜，营养密度高',
    season: '冬季',
    category: '蔬菜',
    nutrition: '富含维生素A、C、K和钙，有助于抗氧化、护眼、强健骨骼。',
    tips: '选择叶片卷曲、颜色深绿、无黄边的羽衣甘蓝。',
    pairings: '羽衣甘蓝沙拉、蒜炒羽衣甘蓝、羽衣甘蓝果昔'
  },
  {
    name: '草虾',
    cover: '',
    desc: '鲜嫩弹牙，海味代表',
    season: '夏季',
    category: '水产',
    nutrition: '富含优质蛋白质、硒和虾青素，有助于增强免疫力、抗氧化、促进肌肉修复。',
    tips: '挑选腹部干净、活力足、外壳红亮的草虾。',
    pairings: '白灼虾、蒜蓉虾、虾仁炒饭'
  },
  {
    name: '菠萝',
    cover: '',
    desc: '酸甜清爽，热带风情',
    season: '夏季',
    category: '水果',
    nutrition: '富含维生素C、锰和菠萝酶，有助于抗氧化、促进蛋白质消化、增强免疫力。',
    tips: '选择果皮金黄、果香浓郁、底部略软的菠萝。',
    pairings: '菠萝炒饭、菠萝派、菠萝鸡丁'
  },
  {
    name: '香菇',
    cover: '',
    desc: '菌香浓郁，口感滑嫩',
    season: '冬季',
    category: '蔬菜',
    nutrition: '富含膳食纤维、维生素D和多糖体，有助于调节免疫系统、降胆固醇、促进肠道健康。',
    tips: '挑选菌盖完整、色泽深褐、无裂口的香菇。',
    pairings: '香菇炖鸡、蚝油香菇、香菇豆腐煲'
  },
  {
    name: '苹果',
    cover: '',
    desc: '脆甜多汁，四季常见',
    season: '秋季',
    category: '水果',
    nutrition: '富含果胶、维生素C和钾，有助于调节血糖、促进肠道蠕动、维持心脏健康。',
    tips: '选择果皮光滑、色泽均匀、手感沉实的苹果。',
    pairings: '苹果沙拉、烤苹果、苹果燕麦粥'
  },
  {
    name: '鲈鱼',
    cover: '',
    desc: '肉质细嫩，清香少刺',
    season: '秋季',
    category: '水产',
    nutrition: '富含优质蛋白质、DHA和硒，有助于促进脑部发育、抗氧化、增强免疫力。',
    tips: '挑选眼睛清亮、鱼鳞完整、腹部干净的鲈鱼。',
    pairings: '清蒸鲈鱼、鲈鱼豆腐汤、香煎鲈鱼'
  },
  {
    name: '柿子',
    cover: '',
    desc: '秋日金黄，香甜软糯',
    season: '秋季',
    category: '水果',
    nutrition: '富含胡萝卜素、维生素C和单宁，有助于润肺止咳、抗氧化、促进消化。',
    tips: '选择果皮光滑、色泽橙红、无裂痕的柿子。',
    pairings: '柿饼、柿子糕、柿子炖雪梨'
  },
  {
    name: '芒果',
    cover: '',
    desc: '热带风味，香甜浓郁',
    season: '夏季',
    category: '水果',
    nutrition: '富含维生素A、C和膳食纤维，有助于护眼、增强免疫力、促进肠道蠕动。',
    tips: '选择果皮金黄、果香浓郁、手感柔软的芒果。',
    pairings: '芒果冰沙、芒果布丁、芒果糯米饭'
  },
  {
    name: '菠菜',
    cover: '',
    desc: '绿叶鲜嫩，营养丰富',
    season: '春季',
    category: '蔬菜',
    nutrition: '富含铁、叶酸和维生素K，有助于造血、骨骼健康、预防贫血。',
    tips: '挑选叶片翠绿、茎部细嫩、无黄斑的菠菜。',
    pairings: '菠菜炒鸡蛋、菠菜豆腐汤、蒜蓉菠菜'
  },
  {
    name: '虾仁',
    cover: '',
    desc: '鲜嫩弹牙，烹饪便捷',
    season: '四季',
    category: '水产',
    nutrition: '富含蛋白质、钙和虾青素，有助于增强肌肉、抗氧化、促进骨骼发育。',
    tips: '选择色泽透明、无异味、弹性好的虾仁。',
    pairings: '虾仁炒饭、虾仁蒸蛋、虾仁豆腐煲'
  },
  {
    name: '葡萄',
    cover: '',
    desc: '晶莹剔透，酸甜可口',
    season: '夏季',
    category: '水果',
    nutrition: '富含葡萄糖、花青素和钾，有助于补充能量、抗氧化、调节水分平衡。',
    tips: '挑选果粒饱满、果皮紧致、无破损的葡萄。',
    pairings: '葡萄干、葡萄果酱、葡萄奶酪盘'
  },
  {
    name: '金针菇',
    cover: '',
    desc: '细长爽滑，菌香清淡',
    season: '冬季',
    category: '蔬菜',
    nutrition: '富含膳食纤维、蛋白质和赖氨酸，有助于促进新陈代谢、增强免疫力、调节血脂。',
    tips: '选择菌柄洁白、菌盖完整、无黏液的金针菇。',
    pairings: '金针菇肥牛卷、金针菇汤、凉拌金针菇'
  },
  {
    name: '柠檬',
    cover: '',
    desc: '酸爽清新，常用调味',
    season: '夏季',
    category: '水果',
    nutrition: '富含维生素C、柠檬酸和黄酮类化合物，有助于抗氧化、促进消化、增强免疫力。',
    tips: '选择果皮光滑、色泽鲜亮、重量较重的柠檬。',
    pairings: '柠檬蜂蜜水、柠檬烤鸡、柠檬沙拉酱'
  },
  {
    name: '大蒜',
    cover: '',
    desc: '辛香浓烈，调味佳品',
    season: '四季',
    category: '蔬菜',
    nutrition: '富含大蒜素、硒和维生素B6，有助于抗菌抗炎、增强免疫力、促进心血管健康。',
    tips: '挑选蒜瓣饱满、外皮干燥、无霉斑的大蒜。',
    pairings: '蒜蓉西兰花、蒜香排骨、蒜泥白肉'
  },
  {
    name: '鲍鱼',
    cover: '',
    desc: '海味珍品，肉质鲜美',
    season: '秋季',
    category: '水产',
    nutrition: '富含蛋白质、碘和硒，有助于增强免疫力、促进甲状腺功能、抗氧化。',
    tips: '选择壳体完整、肉质紧实、气味清新的鲍鱼。',
    pairings: '清蒸鲍鱼、鲍鱼粥、红烧鲍鱼'
  },
  {
    name: '胡萝卜',
    cover: '',
    desc: '橙色脆甜，营养丰富',
    season: '秋季',
    category: '蔬菜',
    nutrition: '富含胡萝卜素、维生素A和膳食纤维，有助于护眼、增强免疫力、促进肠道健康。',
    tips: '选择色泽鲜亮、表皮光滑、根部细长的胡萝卜。',
    pairings: '胡萝卜汁、胡萝卜炖牛肉、胡萝卜蛋糕'
  },
  {
    name: '石榴',
    cover: '',
    desc: '籽粒晶莹，酸甜可口',
    season: '秋季',
    category: '水果',
    nutrition: '富含抗氧化物、维生素C和钾，有助于心血管健康、抗炎、补充能量。',
    tips: '选择果皮红润、籽粒饱满、无裂痕的石榴。',
    pairings: '石榴汁、石榴沙拉、石榴鸡肉'
  },
  {
    name: '生菜',
    cover: '',
    desc: '清脆爽口，常见凉拌',
    season: '春季',
    category: '蔬菜',
    nutrition: '富含膳食纤维、维生素K和叶酸，有助于促进消化、保护心血管、造血功能。',
    tips: '选择叶片翠绿、无黄斑、茎部细嫩的生菜。',
    pairings: '生菜沙拉、生菜包肉、生菜炒蛋'
  },
  {
    name: '鲑鱼',
    cover: '',
    desc: '肉质细腻，富含油脂',
    season: '四季',
    category: '水产',
    nutrition: '富含Omega-3脂肪酸、蛋白质和维生素D，有助于心血管健康、抗炎、促进脑部发育。',
    tips: '选择鱼肉色泽鲜亮、纹理清晰、无异味的鲑鱼。',
    pairings: '烤鲑鱼、鲑鱼刺身、鲑鱼沙拉'
  },
  {
    name: '蓝莓',
    cover: '',
    desc: '小巧酸甜，抗氧化明星',
    season: '夏季',
    category: '水果',
    nutrition: '富含花青素、维生素C和锰，有助于抗氧化、保护视力、增强免疫力。',
    tips: '选择果粒饱满、色泽深蓝、无破损的蓝莓。',
    pairings: '蓝莓酸奶、蓝莓派、蓝莓果酱'
  },
  {
    name: '土豆',
    cover: '',
    desc: '粉糯绵软，百搭食材',
    season: '秋季',
    category: '蔬菜',
    nutrition: '富含碳水化合物、钾和维生素C，有助于补充能量、调节血压、增强免疫力。',
    tips: '选择表皮光滑、无芽眼、手感沉实的土豆。',
    pairings: '土豆泥、红烧土豆、土豆炖牛肉'
  },
  {
    name: '柚子',
    cover: '',
    desc: '果肉饱满，酸甜清香',
    season: '秋季',
    category: '水果',
    nutrition: '富含维生素C、膳食纤维和钾，有助于增强免疫力、促进消化、调节血压。',
    tips: '选择果皮光滑、重量较重、果香浓郁的柚子。',
    pairings: '柚子茶、柚子沙拉、柚子蜜汁鸡'
  },
  {
    name: '牛油果',
    cover: '',
    desc: '绵密细腻，营养丰富',
    season: '夏季',
    category: '水果',
    nutrition: '富含不饱和脂肪酸、维生素E和钾，有助于心血管健康、抗氧化、维持电解质平衡。',
    tips: '选择果皮呈深绿色、轻压略软的牛油果。',
    pairings: '牛油果沙拉、牛油果吐司、牛油果奶昔'
  },
  {
    name: '洋葱',
    cover: '',
    desc: '辛辣清香，常见调味',
    season: '四季',
    category: '蔬菜',
    nutrition: '富含槲皮素、维生素C和硫化物，有助于抗炎、抗氧化、促进心血管健康。',
    tips: '选择外皮干燥、球体饱满、无霉斑的洋葱。',
    pairings: '洋葱炒牛肉、洋葱汤、洋葱圈'
  },
  {
    name: '鲤鱼',
    cover: '',
    desc: '肉质细嫩，常见淡水鱼',
    season: '秋季',
    category: '水产',
    nutrition: '富含蛋白质、维生素B12和磷，有助于增强免疫力、促进骨骼健康、改善血液循环。',
    tips: '选择鱼鳞完整、眼睛清亮、腹部紧实的鲤鱼。',
    pairings: '红烧鲤鱼、鲤鱼汤、清蒸鲤鱼'
  },
  {
    name: '梨',
    cover: '',
    desc: '清甜多汁，润肺佳品',
    season: '秋季',
    category: '水果',
    nutrition: '富含水分、维生素C和膳食纤维，有助于润肺止咳、促进消化、增强免疫力。',
    tips: '选择果皮光滑、果形端正、重量较重的梨。',
    pairings: '冰糖雪梨、梨汁、梨子沙拉'
  },
  {
    name: '西瓜',
    cover: '',
    desc: '夏日解渴佳品，清凉爽口',
    season: '夏季',
    category: '水果',
    nutrition: '富含水分、钾和番茄红素，有助于补水、调节血压、抗氧化。',
    tips: '挑选瓜皮纹路清晰、敲击声清脆的西瓜。',
    pairings: '西瓜汁、西瓜沙拉、西瓜冰棒'
  },
  {
    name: '花椰菜',
    cover: '',
    desc: '白嫩紧实，营养丰富',
    season: '冬季',
    category: '蔬菜',
    nutrition: '富含维生素C、膳食纤维和硫化物，有助于抗氧化、增强免疫力、促进消化。',
    tips: '选择花球紧密、色泽洁白、无黄斑的花椰菜。',
    pairings: '清炒花椰菜、花椰菜汤、花椰菜焗饭'
  },
  {
    name: '龙虾',
    cover: '',
    desc: '肉质鲜美，海味珍品',
    season: '夏季',
    category: '水产',
    nutrition: '富含蛋白质、锌和维生素B12，有助于增强免疫力、促进神经健康、改善血液循环。',
    tips: '选择壳体坚硬、活力足、颜色鲜亮的龙虾。',
    pairings: '蒜蓉龙虾、龙虾汤、烤龙虾'
  },
  {
    name: '桃子',
    cover: '',
    desc: '香甜多汁，夏季佳果',
    season: '夏季',
    category: '水果',
    nutrition: '富含维生素C、钾和膳食纤维，有助于抗氧化、促进消化、维持心脏健康。',
    tips: '选择果皮光滑、果香浓郁、手感柔软的桃子。',
    pairings: '桃子派、桃子果酱、桃子冰茶'
  },
  {
    name: '芹菜',
    cover: '',
    desc: '清香爽脆，常见家常菜',
    season: '春季',
    category: '蔬菜',
    nutrition: '富含膳食纤维、钾和维生素K，有助于降压利尿、促进骨骼健康、改善消化。',
    tips: '选择茎干挺直、叶片翠绿、无黄斑的芹菜。',
    pairings: '芹菜炒肉、芹菜豆腐、凉拌芹菜'
  },
  {
    name: '鲳鱼',
    cover: '',
    desc: '肉质细嫩，鲜香少刺',
    season: '秋季',
    category: '水产',
    nutrition: '富含蛋白质、硒和不饱和脂肪酸，有助于抗氧化、增强免疫力、促进心血管健康。',
    tips: '选择鱼体完整、眼睛清亮、腹部紧实的鲳鱼。',
    pairings: '清蒸鲳鱼、红烧鲳鱼、鲳鱼汤'
  },
  {
    name: '柑橘',
    cover: '',
    desc: '酸甜适口，冬季常见',
    season: '冬季',
    category: '水果',
    nutrition: '富含维生素C、柠檬酸和膳食纤维，有助于增强免疫力、促进消化、抗氧化。',
    tips: '选择果皮紧致、色泽鲜亮、重量较重的柑橘。',
    pairings: '柑橘果汁、柑橘沙拉、柑橘蜜饯'
  },
  {
    name: '香椿',
    cover: '',
    desc: '独特香气，春季时令',
    season: '春季',
    category: '蔬菜',
    nutrition: '富含维生素C、钙和磷，有助于增强免疫力、补钙、促进骨骼健康。',
    tips: '选择叶片鲜嫩、紫红色、气味浓郁的香椿芽。',
    pairings: '香椿炒蛋、香椿拌豆腐、香椿饼'
  },
  {
    name: '鲍鱼',
    cover: '',
    desc: '海味珍品，肉质鲜美',
    season: '秋季',
    category: '水产',
    nutrition: '富含蛋白质、碘和硒，有助于增强免疫力、促进甲状腺功能、抗氧化。',
    tips: '选择壳体完整、肉质紧实、气味清新的鲍鱼。',
    pairings: '清蒸鲍鱼、鲍鱼粥、红烧鲍鱼'
  },
  {
    name: '猕猴桃',
    cover: '',
    desc: '酸甜可口，维C之王',
    season: '秋季',
    category: '水果',
    nutrition: '富含维生素C、维生素E和膳食纤维，有助于抗氧化、增强免疫力、促进消化。',
    tips: '选择果皮略软、果香浓郁、无破损的猕猴桃。',
    pairings: '猕猴桃汁、猕猴桃沙拉、猕猴桃酸奶'
  },
  {
    name: '蘑菇',
    cover: '',
    desc: '菌香清淡，常见食材',
    season: '四季',
    category: '蔬菜',
    nutrition: '富含膳食纤维、维生素D和蛋白质，有助于增强免疫力、促进骨骼健康、调节肠道。',
    tips: '选择菌盖完整、色泽均匀、无黏液的蘑菇。',
    pairings: '蘑菇炒肉、蘑菇汤、蘑菇意面'
  },
  {
    name: '龙眼',
    cover: '',
    desc: '果肉晶莹，香甜滋补',
    season: '夏季',
    category: '水果',
    nutrition: '富含葡萄糖、维生素C和铁，有助于补血、增强免疫力、缓解疲劳。',
    tips: '选择果皮完整、果肉饱满、色泽均匀的龙眼。',
    pairings: '龙眼冰饮、龙眼糕点、龙眼炖鸡'
  },
  {
    name: '扇贝',
    cover: '',
    desc: '鲜嫩多汁，海鲜佳品',
    season: '秋季',
    category: '水产',
    nutrition: '富含蛋白质、锌和维生素B12，有助于增强免疫力、促进神经健康、改善血液循环。',
    tips: '选择壳体完整、肉质饱满、气味清新的扇贝。',
    pairings: '蒜蓉粉丝扇贝、清蒸扇贝、扇贝粥'
  },
  {
    name: '樱桃',
    cover: '',
    desc: '初夏红宝石，汁多味甜',
    season: '夏季',
    category: '水果',
    nutrition: '富含铁、维生素C和花青素，有助于补血、抗氧化、增强免疫力。',
    tips: '选择果皮光亮、色泽鲜艳、果柄青绿的樱桃。',
    pairings: '樱桃派、樱桃果酱、樱桃冰沙'
  },
  {
    name: '芋头',
    cover: '',
    desc: '粉糯香甜，秋季佳品',
    season: '秋季',
    category: '蔬菜',
    nutrition: '富含碳水化合物、钾和膳食纤维，有助于补充能量、促进消化、调节血压。',
    tips: '选择表皮完整、重量较重、无裂痕的芋头。',
    pairings: '芋头炖排骨、芋头糕、芋头粥'
  },
  {
    name: '鲑鱼籽',
    cover: '',
    desc: '晶莹剔透，鲜美浓郁',
    season: '冬季',
    category: '水产',
    nutrition: '富含蛋白质、Omega-3脂肪酸和维生素D，有助于心血管健康、抗炎、促进脑部发育。',
    tips: '选择色泽鲜亮、颗粒饱满、无异味的鲑鱼籽。',
    pairings: '寿司鲑鱼籽、鲑鱼籽沙拉、鲑鱼籽意面'
  }
]

async function bootstrap() {
  // 创建应用上下文（连接真实的数据库）
  const app = await NestFactory.createApplicationContext(AppModule)
  const foodsService = app.get(FoodsService)

  console.log('开始向数据库写入数据...')

  for (const foodData of mockFoods) {
    // 检查是否存在（防重复）
    // 注意：这里我们假设 findAll 支持按 name 查询
    // 如果您的 findAll 没有处理 name 过滤，您可能需要直接用 repository 查，或者依赖 service 逻辑
    // 这里简单演示直接调用 create

    // 为了防止 cover 为空导致校验失败，如果原数据为空，给个默认值
    const finalData = {
      ...foodData,
      cover: foodData.cover || 'https://copilot.microsoft.com/th/id/BCO.f9500eec-ccd6-4efd-87da-98f7deb9df1a.png'
    }

    try {
      // 真实写入数据库
      await foodsService.create(finalData as unknown as CreateFoodDto)
      console.log(`✅ 已添加: ${foodData.name}`)
    } catch (error) {
      console.error(`❌ 添加失败 ${foodData.name}:`, error.message)
    }
  }

  console.log('数据填充完成！')
  await app.close()
}

bootstrap()
