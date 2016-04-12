const _spinIcon = (e, spin) => {
  if (spin) {
    e.className += ' fa-spin'
  } else {
    e.className = e.className.replace(' fa-spin', '')
  }
}

export const faSpin = _spinIcon
