// `*.svg?url` goes through Next's image loader (see next.config.mjs), not SVGR.
declare module "*.svg?url" {
  const content: import("next/dist/shared/lib/image-external").StaticImageData;
  export default content;
}
