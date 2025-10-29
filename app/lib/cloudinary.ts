// Lightweight helper to produce a Cloudinary "fetch" URL when possible.
// If NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set, we use the official fetch path
// with automatic format & quality hints. If NEXT_PUBLIC_CLOUDINARY_FETCH_BASE is
// set, we use that as a prefix and append the encoded source. Otherwise we
// return the original src so existing local /public assets continue to work.

export function getCloudinaryFetchUrl(src?: string | null) {
  if (!src) return undefined;

  // If it's already an absolute Cloudinary URL, return as-is
  if (src.includes('res.cloudinary.com')) return src;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const fetchBase = process.env.NEXT_PUBLIC_CLOUDINARY_FETCH_BASE;

  try {
    // if it's already a fully qualified URL, we can use Cloudinary fetch
    const isRemote = /^https?:\/\//i.test(src);
    if (cloudName && isRemote) {
      // use f_auto and q_auto for better web delivery
      return `https://res.cloudinary.com/${cloudName}/image/fetch/f_auto,q_auto/${encodeURIComponent(src)}`;
    }

    if (fetchBase && isRemote) {
      // custom server proxy base (must already include trailing slash if needed)
      return `${fetchBase}${encodeURIComponent(src)}`;
    }

    // if it's already an absolute URL but we don't have cloud settings, return it
    if (isRemote) return src;

    // relative paths (like /uni/foo.jpg) should be served from public/ as-is
    return src;
  } catch (e) {
    return src;
  }
}
