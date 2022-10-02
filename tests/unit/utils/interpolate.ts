import { interpolate } from '../../../src/utils/utils'


describe('interpolation', () => {
	it('should return correct values', () => {
		expect(interpolate(0.5, [0, 1], [0, 1])).toBe(0.5)
		expect(interpolate(1.5, [0, 1], [1, 2])).toBe(0.5)
		expect(interpolate(1.5, [0, 1], [3, 1])).toBe(0.75)
		expect(interpolate(1, [1, 3], [1, 3])).toBe(1)
		expect(interpolate(1, [1, 3], [3, 1])).toBe(3)
	})

	it('should return incorrect values', () => {
		expect(interpolate(2, [1, 3], [3, 1])).not.toBe(0.5)
		expect(interpolate(0.5, [0, 1], [0, 1])).not.toBe(1)
		expect(interpolate(0.5, [0, 1], [1, 2])).not.toBe(2)
		expect(interpolate(2, [1, 3], [1, 3])).not.toBe(3)
		expect(interpolate(0.5, [0, 1], [3, 1])).not.toBe(1)
	})
})
