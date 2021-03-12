// import image from "@/assets/image/mahjong.png"
import image from "@/assets/image/zzz.jpg"


// 素材相关信息
const mahjong = {
  // 素材图片（大图）
  image: image,
  // 单张素材尺寸
  size: [64, 64],
  speed: 8, //64/8 = 8   必须是整数  
  // size: [60, 75],
  types: {
    // 一
    "image-00": {
      name_chs: "吗啡",
      // 当前素材在大图上面所处位置
      pos: [0, 0],
    },
    "image-10": {
      name_chs: "罂粟",
      // 当前素材在大图上面所处位置
      pos: [1, 0],
    },
    "image-20": {
      name_chs: "海洛因",
      // 当前素材在大图上面所处位置
      pos: [2, 0],
    },
    "image-30": {
      name_chs: "摇头丸",
      // 当前素材在大图上面所处位置
      pos: [3, 0],
    },
    "image-40": {
      name_chs: "安眠药",
      // 当前素材在大图上面所处位置
      pos: [4, 0],
    },
    
    
    // 二
    "image-01": {
      name_chs: "冰毒",
      // 当前素材在大图上面所处位置
      pos: [0, 1],
    },
    "image-11": {
      name_chs: "罂粟",
      // 当前素材在大图上面所处位置
      pos: [1, 1],
    },
    "image-21": {
      name_chs: "海洛因",
      // 当前素材在大图上面所处位置
      pos: [2, 1],
    },
    "image-31": {
      name_chs: "摇头丸",
      // 当前素材在大图上面所处位置
      pos: [3, 1],
    },
    "image-41": {
      name_chs: "安眠药",
      // 当前素材在大图上面所处位置
      pos: [4, 1],
    },

    // 二
    "image-02": {
      name_chs: "冰毒",
      // 当前素材在大图上面所处位置
      pos: [0, 2],
    },
    "image-12": {
      name_chs: "罂粟",
      // 当前素材在大图上面所处位置
      pos: [1, 2],
    },
    "image-22": {
      name_chs: "海洛因",
      // 当前素材在大图上面所处位置
      pos: [2, 2],
    },
    "image-32": {
      name_chs: "摇头丸",
      // 当前素材在大图上面所处位置
      pos: [3, 2],
    },
    "image-42": {
      name_chs: "安眠药",
      // 当前素材在大图上面所处位置
      pos: [4, 2],
    },

    // 二
    "image-03": {
      name_chs: "冰毒",
      // 当前素材在大图上面所处位置
      pos: [0, 3],
    },
    "image-13": {
      name_chs: "罂粟",
      // 当前素材在大图上面所处位置
      pos: [1, 3],
    },
    "image-23": {
      name_chs: "海洛因",
      // 当前素材在大图上面所处位置
      pos: [2, 3],
    },
    "image-33": {
      name_chs: "摇头丸",
      // 当前素材在大图上面所处位置
      pos: [3, 3],
    },
    "image-43": {
      name_chs: "安眠药",
      // 当前素材在大图上面所处位置
      pos: [4, 3],
    },

    // 二
    "image-04": {
      name_chs: "冰毒",
      // 当前素材在大图上面所处位置
      pos: [0, 4],
    },
    "image-14": {
      name_chs: "罂粟",
      // 当前素材在大图上面所处位置
      pos: [1, 4],
    },
    "image-24": {
      name_chs: "海洛因",
      // 当前素材在大图上面所处位置
      pos: [2, 4],
    },
    "image-34": {
      name_chs: "摇头丸",
      // 当前素材在大图上面所处位置
      pos: [3, 4],
    },
    "image-44": {
      name_chs: "安眠药",
      // 当前素材在大图上面所处位置
      pos: [4, 4],
    },

  }
}

export {
  mahjong
}

// // 素材相关信息
// const mahjong = {
//   // 素材图片（大图）
//   image: image,
//   // 单张素材尺寸
//   size: [60, 75],
//   types: {
//     // 万
//     "character-one": {
//       name_chs: "一万",
//       // 当前素材在大图上面所处位置
//       pos: [0, 0],
//     },
//     "character-two": {
//       name_chs: "二万",
//       // 当前素材在大图上面所处位置
//       pos: [1, 0],
//     },
//     "character-three": {
//       name_chs: "三万",
//       // 当前素材在大图上面所处位置
//       pos: [2, 0],
//     },
//     "character-four": {
//       name_chs: "四万",
//       // 当前素材在大图上面所处位置
//       pos: [3, 0],
//     },
//     "character-five": {
//       name_chs: "五万",
//       // 当前素材在大图上面所处位置
//       pos: [4, 0],
//     },
//     "character-six": {
//       name_chs: "六万",
//       // 当前素材在大图上面所处位置
//       pos: [5, 0],
//     },
//     "character-seven": {
//       name_chs: "七万",
//       // 当前素材在大图上面所处位置
//       pos: [6, 0],
//     },
//     "character-eight": {
//       name_chs: "八万",
//       // 当前素材在大图上面所处位置
//       pos: [7, 0],
//     },
//     "character-night": {
//       name_chs: "九万",
//       // 当前素材在大图上面所处位置
//       pos: [8, 0],
//     },

//     // 筒
//     "dot-one": {
//       name_chs: "一筒",
//       // 当前素材在大图上面所处位置
//       pos: [0, 1],
//     },
//     "dot-two": {
//       name_chs: "二筒",
//       // 当前素材在大图上面所处位置
//       pos: [1, 1],
//     },
//     "dot-three": {
//       name_chs: "三筒",
//       // 当前素材在大图上面所处位置
//       pos: [2, 1],
//     },
//     "dot-four": {
//       name_chs: "四筒",
//       // 当前素材在大图上面所处位置
//       pos: [3, 1],
//     },
//     "dot-five": {
//       name_chs: "五筒",
//       // 当前素材在大图上面所处位置
//       pos: [4, 1],
//     },
//     "dot-six": {
//       name_chs: "六筒",
//       // 当前素材在大图上面所处位置
//       pos: [5, 1],
//     },
//     "dot-seven": {
//       name_chs: "七筒",
//       // 当前素材在大图上面所处位置
//       pos: [6, 1],
//     },
//     "dot-eight": {
//       name_chs: "八筒",
//       // 当前素材在大图上面所处位置
//       pos: [7, 1],
//     },
//     "dot-night": {
//       name_chs: "九筒",
//       // 当前素材在大图上面所处位置
//       pos: [8, 1],
//     },

//     // 条
//     "bamboo-one": {
//       name_chs: "一条",
//       // 当前素材在大图上面所处位置
//       pos: [0, 2],
//     },
//     "bamboo-two": {
//       name_chs: "二条",
//       // 当前素材在大图上面所处位置
//       pos: [1, 2],
//     },
//     "bamboo-three": {
//       name_chs: "三条",
//       // 当前素材在大图上面所处位置
//       pos: [2, 2],
//     },
//     "bamboo-four": {
//       name_chs: "四条",
//       // 当前素材在大图上面所处位置
//       pos: [3, 2],
//     },
//     "bamboo-five": {
//       name_chs: "五条",
//       // 当前素材在大图上面所处位置
//       pos: [4, 2],
//     },
//     "bamboo-six": {
//       name_chs: "六条",
//       // 当前素材在大图上面所处位置
//       pos: [5, 2],
//     },
//     "bamboo-seven": {
//       name_chs: "七条",
//       // 当前素材在大图上面所处位置
//       pos: [6, 2],
//     },
//     "bamboo-eight": {
//       name_chs: "八条",
//       // 当前素材在大图上面所处位置
//       pos: [7, 2],
//     },
//     "bamboo-night": {
//       name_chs: "九条",
//       // 当前素材在大图上面所处位置
//       pos: [8, 2],
//     },


//     // 字
//     "east-widh": {
//       name_chs: "东风",
//       // 当前素材在大图上面所处位置
//       pos: [0, 3],
//     },
//     "south-wind": {
//       name_chs: "南风",
//       // 当前素材在大图上面所处位置
//       pos: [1, 3],
//     },
//     "west-wind": {
//       name_chs: "西风",
//       // 当前素材在大图上面所处位置
//       pos: [2, 3],
//     },
//     "north-wind": {
//       name_chs: "北风",
//       // 当前素材在大图上面所处位置
//       pos: [3, 3],
//     },
//     "red-dragon": {
//       name_chs: "红中",
//       // 当前素材在大图上面所处位置
//       pos: [4, 3],
//     },
//     "green-dragon": {
//       name_chs: "发财",
//       // 当前素材在大图上面所处位置
//       pos: [5, 3],
//     },
//     "white-dragon": {
//       name_chs: "白板",
//       // 当前素材在大图上面所处位置
//       pos: [6, 3],
//     }
//   }
// }

// export {
//   mahjong
// }