/** Runs in <head> before first paint: stored choice, else dark. */
export const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem("theme")||"dark"}catch(e){}`;
