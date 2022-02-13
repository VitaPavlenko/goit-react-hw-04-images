import s from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ carts, onModalOpen }) => {
  return (
    <>
      {carts.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <li key={id} className={s['gallery-item']}>
            <img
              onClick={() => {
                onModalOpen(largeImageURL);
              }}
              className={s['gallery-img']}
              src={webformatURL}
              alt=""
            />
          </li>
        );
      })}
    </>
  );
};

export default ImageGalleryItem;
