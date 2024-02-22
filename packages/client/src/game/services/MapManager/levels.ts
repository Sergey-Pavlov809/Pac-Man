import { type MapTerrainData } from './typings'

export const levels: MapTerrainData[] = [
  // 1
  {
    data: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 401, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 402, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 403, 0, 0, 0, 0, 0, 0, 226, 227, 227, 227, 227, 227, 227, 227, 227,
      227, 227, 230, 230, 228, 229, 230, 230, 230, 230, 230, 230, 230, 230, 230,
      230, 230, 230, 231, 246, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
      109, 109, 248, 249, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
      109, 251, 246, 109, 289, 287, 287, 288, 109, 289, 287, 287, 287, 288, 109,
      248, 249, 109, 289, 287, 287, 287, 288, 109, 289, 287, 287, 288, 109, 251,
      246, 129, 249, 0, 0, 248, 109, 249, 0, 0, 0, 248, 109, 248, 249, 109, 249,
      0, 0, 0, 248, 109, 249, 0, 0, 248, 129, 251, 246, 109, 269, 267, 267, 268,
      109, 269, 267, 267, 267, 268, 109, 366, 367, 109, 269, 267, 267, 267, 268,
      109, 269, 267, 267, 268, 109, 251, 246, 109, 109, 109, 109, 109, 109, 109,
      109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
      109, 109, 109, 109, 251, 246, 109, 289, 287, 287, 288, 109, 289, 288, 109,
      289, 287, 287, 287, 287, 287, 287, 288, 109, 289, 288, 109, 289, 287, 287,
      288, 109, 251, 246, 109, 269, 267, 267, 268, 109, 249, 248, 109, 269, 267,
      267, 347, 346, 267, 267, 268, 109, 249, 248, 109, 269, 267, 267, 268, 109,
      251, 246, 109, 109, 109, 109, 109, 109, 249, 248, 109, 109, 109, 109, 249,
      248, 109, 109, 109, 109, 249, 248, 109, 109, 109, 109, 109, 109, 251, 326,
      330, 330, 330, 330, 347, 109, 249, 366, 287, 287, 288, 0, 249, 248, 0,
      289, 287, 287, 367, 248, 109, 346, 330, 330, 330, 330, 331, 0, 0, 0, 0, 0,
      246, 109, 249, 346, 267, 267, 268, 0, 269, 268, 0, 269, 267, 267, 347,
      248, 109, 251, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 246, 109, 249, 248, 0, 0, 0,
      0, 14, 0, 0, 0, 0, 0, 249, 248, 109, 251, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      246, 109, 249, 248, 0, 349, 350, 387, 388, 388, 386, 350, 351, 0, 249,
      248, 109, 251, 0, 0, 0, 0, 0, 227, 227, 227, 227, 227, 367, 109, 269, 268,
      0, 369, 0, 0, 0, 0, 0, 0, 371, 0, 269, 268, 109, 366, 227, 227, 227, 227,
      227, 0, 0, 0, 0, 0, 0, 109, 0, 0, 0, 369, 0, 16, 15, 0, 17, 0, 371, 0, 0,
      0, 109, 0, 0, 0, 0, 0, 0, 330, 330, 330, 330, 330, 347, 109, 289, 288, 0,
      369, 0, 0, 0, 0, 0, 0, 371, 0, 289, 288, 109, 346, 330, 330, 330, 330,
      330, 0, 0, 0, 0, 0, 246, 109, 249, 248, 0, 389, 390, 390, 390, 390, 390,
      390, 391, 0, 249, 248, 109, 251, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 246, 109,
      249, 248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 249, 248, 109, 251, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 246, 109, 249, 248, 0, 289, 287, 287, 287, 287, 287, 287,
      288, 0, 249, 248, 109, 251, 0, 0, 0, 0, 0, 226, 227, 227, 227, 227, 367,
      109, 269, 268, 0, 269, 267, 267, 347, 346, 267, 267, 268, 0, 269, 268,
      109, 366, 227, 227, 227, 227, 231, 246, 109, 109, 109, 109, 109, 109, 109,
      109, 109, 109, 109, 109, 249, 248, 109, 109, 109, 109, 109, 109, 109, 109,
      109, 109, 109, 109, 251, 246, 109, 289, 287, 287, 347, 109, 289, 287, 287,
      287, 288, 109, 249, 248, 109, 289, 287, 287, 287, 288, 109, 346, 287, 287,
      288, 109, 251, 246, 109, 269, 267, 347, 248, 109, 269, 267, 267, 267, 268,
      109, 269, 268, 109, 269, 267, 267, 267, 268, 109, 249, 346, 267, 268, 109,
      251, 246, 129, 109, 109, 249, 248, 109, 109, 109, 109, 109, 109, 109, 18,
      19, 109, 109, 109, 109, 109, 109, 109, 249, 248, 109, 109, 129, 251, 266,
      267, 347, 109, 249, 248, 109, 289, 288, 109, 289, 287, 287, 287, 287, 287,
      287, 288, 109, 289, 288, 109, 249, 248, 109, 346, 267, 271, 286, 287, 367,
      109, 269, 268, 109, 249, 248, 109, 269, 267, 267, 347, 346, 267, 267, 268,
      109, 249, 248, 109, 269, 268, 109, 366, 287, 291, 246, 109, 109, 109, 109,
      109, 109, 249, 248, 109, 109, 109, 109, 249, 248, 109, 109, 109, 109, 249,
      248, 109, 109, 109, 109, 109, 109, 251, 246, 109, 289, 287, 287, 287, 287,
      367, 366, 287, 287, 288, 109, 249, 248, 109, 289, 287, 287, 367, 366, 287,
      287, 287, 287, 288, 109, 251, 246, 109, 269, 267, 267, 267, 267, 267, 267,
      267, 267, 268, 109, 269, 268, 109, 269, 267, 267, 267, 267, 267, 267, 267,
      267, 268, 109, 251, 246, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
      109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109, 109,
      109, 251, 326, 327, 327, 327, 327, 327, 327, 327, 327, 327, 327, 327, 327,
      327, 327, 327, 327, 327, 327, 327, 327, 327, 327, 327, 327, 327, 327, 331,
      0, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 158, 0, 0, 0, 0, 38,
      38, 38, 38, 38, 38, 38, 38, 38, 38, 38, 0,
    ],
    height: 34,
    width: 28,
  },
]
