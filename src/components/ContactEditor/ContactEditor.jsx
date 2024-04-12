import { useDispatch } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import css from './ContactEditor.module.css';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function ContactEditor({ initialValues }) {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { id } = initialValues;

  const handleSubmit = e => {
    e.preventDefault();
    if (name.trim() === '' || number.trim() === '') {
      toast.error('Name and number cannot be empty both. Enter some value!');
      return;
    }

    dispatch(updateContact({ id, name, number }));
    toast.success('New contact info is saved');
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>{' '}
      <input
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        className={css.input}
      />
      <label htmlFor="number">Number</label>{' '}
      <input
        name="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        className={css.input}
      />
      <button type="submit" className={css.button}>
        Save
      </button>
    </form>
  );
}
