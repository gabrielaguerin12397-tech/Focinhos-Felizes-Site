"use client";

import { useState } from "react";

type AnimalPhotoViewerProps = {
  animalName: string;
  photos: string[];
};

export function AnimalPhotoViewer({ animalName, photos }: AnimalPhotoViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!photos.length) return null;

  const activePhoto = activeIndex === null ? null : photos[activeIndex];

  function showPrevious() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + photos.length) % photos.length);
  }

  function showNext() {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % photos.length);
  }

  return (
    <>
      <section className="animal-photo-gallery" aria-label={`Fotos de ${animalName}`}>
        {photos.map((foto, index) => (
          <button key={foto} type="button" onClick={() => setActiveIndex(index)}>
            <img src={foto} alt={`${animalName} para adocao em Manaus - foto ${index + 1}`} />
          </button>
        ))}
      </section>

      {activePhoto ? (
        <div className="photo-lightbox" role="dialog" aria-modal="true" aria-label={`Fotos de ${animalName}`}>
          <button className="photo-lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Fechar fotos">×</button>
          <button className="photo-lightbox-nav previous" type="button" onClick={showPrevious} aria-label="Foto anterior">‹</button>
          <img src={activePhoto} alt={`${animalName} ampliado`} />
          <button className="photo-lightbox-nav next" type="button" onClick={showNext} aria-label="Proxima foto">›</button>
          <span>{(activeIndex ?? 0) + 1} / {photos.length}</span>
        </div>
      ) : null}
    </>
  );
}
