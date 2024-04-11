import css from './ContactsPage.module.css';
import { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import PageTitle from '../components/PageTitle/PageTitle';
import Contacts from '../../components/App/Contacts/Contacts';
import { fetchContacts } from '../../redux/contacts/operations';

export default function ContactsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className={css.container}>
      <PageTitle>
        <b>Phonebook</b>
      </PageTitle>
      <Contacts />
    </div>
  );
}
