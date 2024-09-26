export function classes(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
