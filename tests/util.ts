export function assertEquals(a: any, b: any) {
  if (a !== b) {
    throw new Error(`Expected ${a} to equal ${b}`)
  }
}

export function assert(condition: any, message?: any) {
  if (!condition) {
    throw new Error(message || 'assertion failed')
  }
}

export function assertNotEquals(a: any, b: any) {
  if (a === b) {
    throw new Error(`Expected ${a} to not equal ${b}`)
  }
}
