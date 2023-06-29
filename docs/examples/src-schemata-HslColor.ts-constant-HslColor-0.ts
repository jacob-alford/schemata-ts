import * as assert from 'assert'
import { HslColor } from '../../src/schemata/string/HslColor'
  import { getGuard } from '../../src/Guard'

  const hue = 270
  const saturation = 60
  const lightness = 70
  const alpha = 0.7

  const hslString = `hsl(${hue} ${saturation}% ${lightness}% / ${alpha})`
  const Guard = getGuard(HslColor)

  assert.equal(Guard.is(hslString), true)
