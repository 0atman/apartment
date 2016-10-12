export function getFixedDay () {
  var now = new Date()
  var start = new Date(now.getFullYear(), 0, 0)
  var diff = now - start
  var oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

// TODO: special case NY day and leap year
export function getFixedMonth () {
  var day = getFixedDay()
  return Math.floor(day / 28)
}

export function getFixedDate () {
  return getFixedDay() - (getFixedMonth() * 28) - 1
}

export function getX () {
  var x = getFixedDate() - (Math.ceil((getFixedDate() / 7) - 1) * 7)
  return x * 64 - 32
}

export function getY () {
  var y = Math.ceil(getFixedDate() / 7)
  return y * 64 - 32
}
