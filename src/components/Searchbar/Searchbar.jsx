import { Component } from 'react';
import s from './Searchbar.module.css';
class Searchbar extends Component {
  state = {
    tags: '',
  };

  handleNameChange = event => {
    console.log(event.currentTarget.value);
    const inputValue = event.currentTarget.value.trim();

    this.setState({ tags: inputValue.toLowerCase() });
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.tags) return;
    this.props.changeSearch(this.state.tags);
  };

  render() {
    return (
      <>
        <header className={s['searchbar']}>
          <form className={s['form']} onSubmit={this.onSubmit}>
            <button type="submit" className={s['button']}>
              <span className={s['button-label']}>Search</span>
            </button>

            <input
              className={s['input']}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handleNameChange}
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;
