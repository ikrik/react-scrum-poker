const fibonnaciSique: (maxNum: number) => number[] = (maxNum: number) => {
  const siquel: number[] = []
  const a = 1
  let temp = 0

  while (temp <= maxNum) {
    if (temp !== 0) {
      siquel.push(temp)
    }
    if (siquel.length === 0) {
      temp = a
    } else if (siquel.length === 1) {
      temp = siquel[siquel.length - 1] + a
    } else {
      temp = siquel[siquel.length - 1] + siquel[siquel.length - 2]
    }
  }

  return siquel
}

export default fibonnaciSique
