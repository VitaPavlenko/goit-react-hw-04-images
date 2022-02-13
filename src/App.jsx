import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Searchbar from './components/Searchbar/Searchbar';
import getFetch from './server/getFeach';
import Modal from 'components/Modal/Modal';
import s from './App.module.css';
const Status = {
  IDLE: 'idle', // запроса еще нет
  PENDING: 'pending', // пошел запрос
  RESOLVED: 'resolved', // успешный запрос
  REJECTED: 'rejected', // запрос с ошибкой
};
export default function App() {
  // state = {
  //   hits: [],
  //   newImput: 'cat',
  //   error: null,
  //   status: Status.IDLE,
  //   page: 1,
  //   showModal: false,
  //   imageURL: '',
  // };

  const [hits, setHits] = useState([]);
  const [newImput, setNewImput] = useState('cat');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState('');

  // componentDidMount() {
  //   getFetch(this.state.newImput, this.state.page).then(data =>
  //     this.setState({ hits: [...data.hits] })
  //   );
  // };

  useEffect(() => {
    if (!newImput) {
      getFetch(newImput, page).then(data => setHits([...data.hits]));
      setStatus(Status.PENDING);
      return;
    }

    getFetch(newImput, page)
      .then(data => {
        if (!data.hits.length) {
          setStatus(Status.REJECTED);
          return;
        }

        setHits(prev => (page > 1 ? [...prev, ...data.hits] : data.hits));
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [newImput, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.newImput !== this.state.newImput ||
  //     prevState.page !== this.state.page
  //   ) {
  //     this.setState({ status: Status.PENDING });
  //     getFetch(this.state.newImput, this.state.page)
  //       .then(data => {
  //         if (!data.hits.length) {
  //           this.setState({ status: Status.REJECTED });
  //           return;
  //         }
  //         this.setState(prev => ({
  //           hits:
  //             this.state.page > 1 ? [...prev.hits, ...data.hits] : data.hits,
  //           status: Status.RESOLVED,
  //         }));
  //       })

  //       .catch(error => this.setState({ error, status: Status.REJECTED }));
  //   }
  // }

  const onClickButton = () => {
    setPage(prev => prev + 1);
    setStatus(Status.RESOLVED);
  };

  const changeSearch = newImput => {
    setNewImput(newImput);
    setHits([]);
    setPage(1);

    // this.setState({ newImput, hits: [], page: 1 });
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const onModalOpen = largeImageURL => {
    setImageURL(largeImageURL);
    toggleModal();
  };

  // const { hits, status, showModal, imageURL } = this.state;

  return (
    <>
      <Searchbar changeSearch={changeSearch} />
      {status === 'idle' ? (
        <div className={s['title']}> Введите запрос ... </div>
      ) : null}
      {status === 'rejected' ? <div> Нет ответа по запросу</div> : null}

      {status === 'pending' && <Loader />}

      <>
        <ImageGallery carts={hits} onModalOpen={onModalOpen} />
        <Button onClickButton={onClickButton} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <img
              onClick={toggleModal}
              src={imageURL}
              alt=""
              style={{
                width: '800px',
                // height: '100p',
              }}
            />
          </Modal>
        )}
      </>
    </>
  );
}
