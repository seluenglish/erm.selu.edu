import crypto from 'crypto'

export const IMPROPER_HASH_LENGTH = 'Improper hash length!'

export class HashError extends Error {}

export function rawHash(plain) {
  const hash = crypto.createHash('sha512')
  hash.update(plain)
  return hash.digest('hex')
}

export function createHash(plain, date) {
  let dateToUse = date?date:new Date()
  
  plain = dateToUse.toString()+plain
  
  const hash = rawHash(plain)
  
  return {
    hash,
    date: dateToUse,
  }
}

export function verifyHash(plain, hashData) {
  const { hash, date } = hashData
  
  if (hashData.hash.length !== 128) throw new HashError(IMPROPER_HASH_LENGTH)
  
  const realHash = createHash(plain, date)
  
  return realHash.hash === hash
}
