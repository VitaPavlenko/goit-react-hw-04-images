import s from './ImageGallery.module.css';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ carts, onModalOpen }) => {
  return (
    <>
      <ul className={s['gallery']}>
        <ImageGalleryItem carts={carts} onModalOpen={onModalOpen} />
      </ul>
    </>
  );
};

export default ImageGallery;
