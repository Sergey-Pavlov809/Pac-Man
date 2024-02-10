import { GameThemeName } from './data'
import { type Coordinates } from './typings'

const getWeight = (id: number): number => ((id % 20) - 1) * 50
const getHeight = (id: number): number => Math.floor(id / 20) * 50

/** Координаты сущностей на sprite-изображении с классическим дизайном */
const coordinates: Coordinates = {
  [GameThemeName.Classic]: {
    'player.primary': {
      UP: [
        [850, 450, 50, 50],
        [850, 500, 50, 50],
        [850, 550, 50, 50],
      ],
      DOWN: [
        [850, 150, 50, 50],
        [850, 200, 50, 50],
        [850, 250, 50, 50],
      ],
      LEFT: [
        [850, 300, 50, 50],
        [850, 350, 50, 50],
        [850, 400, 50, 50],
      ],
      RIGHT: [
        [850, 0, 50, 50],
        [850, 50, 50, 50],
        [850, 100, 50, 50],
      ],
    },
    'player.secondary': {
      UP: [
        [getWeight(199), getHeight(199), 50, 50],
        [getWeight(219), getHeight(219), 50, 50],
        [getWeight(239), getHeight(239), 50, 50],
      ],
      DOWN: [
        [getWeight(79), getHeight(79), 50, 50],
        [getWeight(99), getHeight(99), 50, 50],
        [getWeight(119), getHeight(119), 50, 50],
      ],
      LEFT: [
        [getWeight(139), getHeight(139), 50, 50],
        [getWeight(159), getHeight(159), 50, 50],
        [getWeight(179), getHeight(179), 50, 50],
      ],
      RIGHT: [
        [getWeight(19), getHeight(19), 50, 50],
        [getWeight(39), getHeight(39), 50, 50],
        [getWeight(59), getHeight(59), 50, 50],
      ],
    },
    'player.destroy': [
      [getWeight(8), getHeight(8), 50, 50],
      [getWeight(28), getHeight(28), 50, 50],
      [getWeight(48), getHeight(48), 50, 50],
      [getWeight(68), getHeight(68), 50, 50],
      [getWeight(88), getHeight(88), 50, 50],
      [getWeight(108), getHeight(108), 50, 50],
      [getWeight(128), getHeight(128), 50, 50],
      [getWeight(148), getHeight(148), 50, 50],
      [getWeight(168), getHeight(168), 50, 50],
      [getWeight(188), getHeight(188), 50, 50],
      [getWeight(208), getHeight(208), 50, 50],
    ],

    'food.pellet': [[getWeight(109), getHeight(109), 50, 50]],
    'food.power': [[getWeight(129), getHeight(129), 50, 50]],

    'life.player1': [[getWeight(158), getHeight(158), 50, 50]],
    'life.player2': [[getWeight(38), getHeight(38), 50, 50]],

    'terrain.226': [[getWeight(226), getHeight(226), 50, 50]],
    'terrain.227': [[getWeight(227), getHeight(227), 50, 50]],
    'terrain.228': [[getWeight(228), getHeight(228), 50, 50]],
    'terrain.229': [[getWeight(229), getHeight(229), 50, 50]],
    'terrain.230': [[getWeight(230), getHeight(230), 50, 50]],
    'terrain.231': [[getWeight(231), getHeight(231), 50, 50]],
    'terrain.246': [[getWeight(246), getHeight(246), 50, 50]],
    'terrain.248': [[getWeight(248), getHeight(248), 50, 50]],
    'terrain.249': [[getWeight(249), getHeight(249), 50, 50]],
    'terrain.251': [[getWeight(251), getHeight(251), 50, 50]],
    'terrain.266': [[getWeight(266), getHeight(266), 50, 50]],
    'terrain.267': [[getWeight(267), getHeight(267), 50, 50]],
    'terrain.268': [[getWeight(268), getHeight(268), 50, 50]],
    'terrain.269': [[getWeight(269), getHeight(269), 50, 50]],
    'terrain.270': [[getWeight(270), getHeight(270), 50, 50]],
    'terrain.271': [[getWeight(271), getHeight(271), 50, 50]],
    'terrain.286': [[getWeight(286), getHeight(286), 50, 50]],
    'terrain.287': [[getWeight(287), getHeight(287), 50, 50]],
    'terrain.288': [[getWeight(288), getHeight(288), 50, 50]],
    'terrain.289': [[getWeight(289), getHeight(289), 50, 50]],
    'terrain.290': [[getWeight(290), getHeight(290), 50, 50]],
    'terrain.291': [[getWeight(291), getHeight(291), 50, 50]],
    'terrain.308': [[getWeight(308), getHeight(308), 50, 50]],
    'terrain.309': [[getWeight(309), getHeight(309), 50, 50]],
    'terrain.311': [[getWeight(311), getHeight(311), 50, 50]],
    'terrain.326': [[getWeight(326), getHeight(326), 50, 50]],
    'terrain.327': [[getWeight(327), getHeight(327), 50, 50]],
    'terrain.328': [[getWeight(328), getHeight(328), 50, 50]],
    'terrain.329': [[getWeight(329), getHeight(329), 50, 50]],
    'terrain.330': [[getWeight(330), getHeight(330), 50, 50]],
    'terrain.331': [[getWeight(331), getHeight(331), 50, 50]],
    'terrain.346': [[getWeight(346), getHeight(346), 50, 50]],
    'terrain.347': [[getWeight(347), getHeight(347), 50, 50]],
    'terrain.349': [[getWeight(349), getHeight(349), 50, 50]],
    'terrain.350': [[getWeight(350), getHeight(350), 50, 50]],
    'terrain.351': [[getWeight(351), getHeight(351), 50, 50]],
    'terrain.366': [[getWeight(366), getHeight(366), 50, 50]],
    'terrain.367': [[getWeight(367), getHeight(367), 50, 50]],
    'terrain.369': [[getWeight(369), getHeight(369), 50, 50]],
    'terrain.371': [[getWeight(371), getHeight(371), 50, 50]],
    'terrain.386': [[getWeight(386), getHeight(386), 50, 50]],
    'terrain.387': [[getWeight(387), getHeight(387), 50, 50]],
    'terrain.388': [[getWeight(388), getHeight(388), 50, 50]],
    'terrain.389': [[getWeight(389), getHeight(389), 50, 50]],
    'terrain.390': [[getWeight(390), getHeight(390), 50, 50]],
    'terrain.391': [[getWeight(391), getHeight(391), 50, 50]],
    'ghost.BLINKY': {
      UP: [
        [getWeight(134), getHeight(134), 50, 50],
        [getWeight(154), getHeight(154), 50, 50],
      ],
      DOWN: [
        [getWeight(54), getHeight(54), 50, 50],
        [getWeight(74), getHeight(74), 50, 50],
      ],
      LEFT: [
        [getWeight(94), getHeight(94), 50, 50],
        [getWeight(114), getHeight(114), 50, 50],
      ],
      RIGHT: [
        [getWeight(14), getHeight(14), 50, 50],
        [getWeight(34), getHeight(34), 50, 50],
      ],
    },
    'ghost.PINKI': {
      UP: [
        [getWeight(135), getHeight(135), 50, 50],
        [getWeight(155), getHeight(155), 50, 50],
      ],
      DOWN: [
        [getWeight(55), getHeight(55), 50, 50],
        [getWeight(75), getHeight(75), 50, 50],
      ],
      LEFT: [
        [getWeight(95), getHeight(95), 50, 50],
        [getWeight(115), getHeight(115), 50, 50],
      ],
      RIGHT: [
        [getWeight(15), getHeight(15), 50, 50],
        [getWeight(35), getHeight(35), 50, 50],
      ],
    },
    'ghost.INKY': {
      UP: [
        [getWeight(136), getHeight(136), 50, 50],
        [getWeight(156), getHeight(156), 50, 50],
      ],
      DOWN: [
        [getWeight(56), getHeight(56), 50, 50],
        [getWeight(76), getHeight(76), 50, 50],
      ],
      LEFT: [
        [getWeight(96), getHeight(96), 50, 50],
        [getWeight(116), getHeight(116), 50, 50],
      ],
      RIGHT: [
        [getWeight(16), getHeight(16), 50, 50],
        [getWeight(36), getHeight(36), 50, 50],
      ],
    },
    'ghost.CLYDE': {
      UP: [
        [getWeight(137), getHeight(137), 50, 50],
        [getWeight(157), getHeight(157), 50, 50],
      ],
      DOWN: [
        [getWeight(57), getHeight(57), 50, 50],
        [getWeight(77), getHeight(77), 50, 50],
      ],
      LEFT: [
        [getWeight(97), getHeight(97), 50, 50],
        [getWeight(117), getHeight(117), 50, 50],
      ],
      RIGHT: [
        [getWeight(17), getHeight(17), 50, 50],
        [getWeight(37), getHeight(37), 50, 50],
      ],
    },
  },

  [GameThemeName.Modern]: {
    'player.primary': {
      UP: [
        [4, 8, 52, 52],
        [68, 8, 52, 52],
      ],
      DOWN: [
        [264, 4, 52, 52],
        [328, 4, 52, 52],
      ],
      LEFT: [
        [136, 4, 52, 52],
        [204, 4, 52, 52],
      ],
      RIGHT: [
        [392, 4, 52, 52],
        [460, 4, 52, 52],
      ],
    },
    'player.secondary': {
      UP: [
        [4, 532, 52, 52],
        [68, 532, 52, 52],
      ],
      DOWN: [
        [264, 528, 52, 52],
        [328, 528, 52, 52],
      ],
      LEFT: [
        [136, 528, 52, 52],
        [204, 528, 52, 52],
      ],
      RIGHT: [
        [392, 528, 52, 52],
        [460, 528, 52, 52],
      ],
    },
  },
}

/** Координаты сущностей на sprite-изображении */
/** TODO: Для смены тем заменить на let и добавить алгоритм смены переменной **/
export const spriteCoordinates = coordinates[GameThemeName.Classic]
