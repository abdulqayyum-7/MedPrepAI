import { useEffect, useState } from "react";
import Icon from "./Icons";

// Wraps an image so clicking it opens a full-screen zoomed preview,
// matching the UWorld hero-screenshot click behavior.
export default function ZoomableImage({ src, alt, className = "" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className={`zoomable ${className}`} onClick={() => setOpen(true)}>
        <img src={src} alt={alt} />
        <span className="zoom-hint"><Icon name="zoom" size={16} /></span>
      </div>

      {open && (
        <div className="lightbox-overlay" onClick={() => setOpen(false)}>
          <button className="lightbox-close" onClick={() => setOpen(false)} aria-label="Close preview">
            <Icon name="close" size={20} />
          </button>
          <div className="lightbox-frame" onClick={(e) => e.stopPropagation()}>
            <img className="lightbox-img" src={src} alt={alt} />
          </div>
        </div>
      )}
    </>
  );
}