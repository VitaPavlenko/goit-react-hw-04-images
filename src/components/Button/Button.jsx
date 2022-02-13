import s from './Button.module.css';

const Button = ({ onClickButton }) => {
  return (
    <button className={s['button']} type="button" onClick={onClickButton}>
      Load more
    </button>
  );
};

export default Button;
