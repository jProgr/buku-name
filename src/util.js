export function stringToBool(value) {
  if (typeof value !== 'string') throw new Error('Value must be a string');

  switch (value) {
    case 'true': return true;
    case 'false': return false;
    default: return !!value;
  }
}
