/**
 * Shared scroll reveal: the block rises, un-blurs and settles on a spring
 * instead of the flat 0.6s ease-out every section used to share.
 */
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 48, scale: 0.97, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
  transition: {
    type: "spring" as const,
    stiffness: 90,
    damping: 16,
    mass: 0.8,
    delay,
  },
  viewport: { once: true, margin: "0px 0px -60px 0px" },
});
