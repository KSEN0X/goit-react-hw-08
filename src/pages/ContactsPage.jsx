import css from './ContactsPage.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Error from '../components/Error/Error';
import Loader from '../components/Loader/Loader';
import SearchBox from '../components/SearchBox/SearchBox';
import { fetchContacts } from '../redux/contacts/operations';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.contacts.loading);
  const error = useSelector(state => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {error && <Error errorMessage={`${error}`}> Error message: </Error>}
      {loading && <Loader>Loading contacts</Loader>}
      <ContactList />
    </div>
  );
}
