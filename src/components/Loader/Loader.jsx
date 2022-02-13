import { BallTriangle } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'fixed',
        backgroundColor: 'rgba(0,0,0,0.5)',
      }}
    >
      <BallTriangle color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
