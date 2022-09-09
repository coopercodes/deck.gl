import {_Tileset2D as Tileset2D} from '@deck.gl/geo-layers';
import {
  bigIntToHex,
  cellToParent,
  cellToTile,
  getResolution,
  hexToBigInt,
  tileToCell
} from 'quadbin';

type QuadbinTileIndex = {i: string};

export default class QuadbinTileset2D extends Tileset2D {
  // @ts-expect-error for spatial indices, TileSet2d should be parametrized by TileIndexT
  getTileIndices(opts): QuadbinTileIndex[] {
    return super
      .getTileIndices(opts)
      .map(tileToCell)
      .map(bigIntToHex)
      .map(i => ({i}));
  }

  // @ts-expect-error TileIndex must be generic
  getTileId({i}: QuadbinTileIndex): string {
    return i;
  }

  // @ts-expect-error TileIndex must be generic
  getTileMetadata({i}: QuadbinTileIndex) {
    return super.getTileMetadata(cellToTile(hexToBigInt(i)));
  }

  // @ts-expect-error TileIndex must be generic
  getTileZoom({i}: QuadbinTileIndex): number {
    return Number(getResolution(hexToBigInt(i)));
  }

  // @ts-expect-error TileIndex must be generic
  getParentIndex({i}: QuadbinTileIndex): QuadbinTileIndex {
    return {i: bigIntToHex(cellToParent(hexToBigInt(i)))};
  }
}
