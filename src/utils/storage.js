import localforage from "localforage";

function createInstance(name) {
  return localforage.createInstance({
    name: name,
    driver: localforage.LOCALSTORAGE
  });
}
export const handleToken = createInstance('TOKEN')
export const layoutStorage = createInstance('LAYOUT')
export const handleTheme = createInstance('THEME')
