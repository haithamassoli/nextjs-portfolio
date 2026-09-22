/** Runs in <head> before first paint: stored choice, else the OS preference. */
export const themeScript = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t}catch(e){}`;
