const generateDefaultName: () => string = () => {
  const animals = ['Duck', 'Chicken', 'Horse', 'Gorilla', 'Eagle', 'Cat', 'Dog']
  const attribute = ['happy', 'funky', 'sneaky', 'groovy', 'lazy', 'rocky', 'holy']

  return `${attribute[Math.floor(Math.random() * 7)]}${animals[Math.floor(Math.random() * 7)]}${Math.floor(Math.random() * 99)}`
}

export default generateDefaultName
