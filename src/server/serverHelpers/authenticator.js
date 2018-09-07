
export function isPasswordCorrect(password) {
  const realPassword = process.env.DB_UPDATE_PASSWORD
  
  if (password !== realPassword) {
    return false
  }
  
  return true
}
