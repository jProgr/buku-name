export function stringToBool(value) {
  if (typeof value !== 'string') throw new Error('Value must be a string');

  switch (value) {
    case 'true': return true;
    case 'false': return false;
    default: return !!value;
  }
}

export function triggerEvent(element, eventName) {
  const event = document.createEvent("HTMLEvents");
  event.initEvent(eventName, false, true);
  element.dispatchEvent(event);
}

export function removeDots(string) {
  return string.replace(/\.+/, '');
}
