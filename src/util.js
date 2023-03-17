import {ShortcutKey} from './shortcuts';

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

export function removeExactMatchKey(string) {
  return string.replaceAll(ShortcutKey.EXACT_MATCH, '');
}

export function removeBaseToggleKey(string) {
  return string.replaceAll(ShortcutKey.BASE_TOGGLE, '');
}

export function removeCompoundToggleKey(string) {
  return string.replaceAll(ShortcutKey.COMPOUND_TOGGLE, '');
}

export function removeOtherToggleKey(string) {
  return string.replaceAll(ShortcutKey.OTHER_TOGGLE, '');
}

export function removeShortcutKeys(string) {
  let clearString = removeExactMatchKey(string);
  clearString = removeBaseToggleKey(clearString);
  clearString = removeCompoundToggleKey(clearString);
  clearString = removeOtherToggleKey(clearString);

  return clearString;
}

export function isElementFocused(element) {
  return element.matches(':focus');
}

export function isUpperCase(string) {
  return string === string.toUpperCase();
}
