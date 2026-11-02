import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";

/**
 * Fixed-ratio product image with a graceful fallback when the URL is empty or
 * fails to load (offline, blocked, deleted).
 */
export default function ProductImage({ src, title, className = "", ratio = "4 / 3" }) {
  const [failedSrc, setFailedSrc] = useState(null);
  const showImage = src && failedSrc !== src;

  return (
    <div
      className={`relative overflow-hidden bg-paper-3 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {showImage ? (
        <img
          src={src}
          alt={title}
          loading="lazy"
          decoding="async"
          onError={() => setFailedSrc(src)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`No image available for ${title}`}
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-paper-3 to-paper-2"
        >
          <PhotoIcon className="h-1/4 w-1/4 max-h-12 max-w-12 text-ink-faint/50" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
