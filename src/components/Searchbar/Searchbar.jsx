import { useState } from 'react';
import s from './Searchbar.module.css';
function Searchbar({ changeSearch }) {
  // state = {
  //   tags: '',
  // };

  const [tags, setTags] = useState('');

  const handleNameChange = event => {
    console.log(event.currentTarget.value);
    const inputValue = event.currentTarget.value.trim();

    setTags(inputValue.toLowerCase());
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!tags) return;
    changeSearch(tags);
  };

  return (
    <>
      <header className={s['searchbar']}>
        <form className={s['form']} onSubmit={onSubmit}>
          <button type="submit" className={s['button']}>
            <span className={s['button-label']}>Search</span>
          </button>

          <input
            className={s['input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleNameChange}
          />
        </form>
      </header>
    </>
  );
}

export default Searchbar;
