import css from './Contact.module.css';
//npm install react-icons --save
import { IoPersonSharp } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch(); 
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };
  return (
    <div className={css.contactCard}>
      <ul className={css.contactList}>
        <li className={css.contactItem}>
          <IoPersonSharp />
          {name}
        </li>
        <li className={css.contactItem}>
          <FaPhone />
          {number}
        </li>
      </ul>
      <button className={css.btn} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
