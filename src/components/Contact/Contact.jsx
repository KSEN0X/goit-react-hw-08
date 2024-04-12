//npm install react-icons --save
import css from './Contact.module.css';
import { IoPersonSharp } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa6';
import { useState } from 'react';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import { deleteContact, updateContact } from '../../redux/contacts/operations';
import { useDispatch } from 'react-redux';
import ContactEditor from '../ContactEditor/ContactEditor';


export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  
  const handleDelete = () => {
    dispatch(deleteContact(id));
    close();
  };

  const handleEditContact = (id, editedContact) => {
    const updatedContact = {
      name: editedContact.name,
      number: editedContact.number,
    };
    dispatch(updateContact({ id, ...updatedContact }));
    closeEditModal(); 
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
  
      <button className={css.btn} onClick={openEditModal}>
        Edit
      </button>
      <Modal open={isEditModalOpen} onClose={closeEditModal}>
        <div>
          <ContactEditor
            initialValues={{ id, name, number }}
            onSubmit={handleEditContact}
            onClose={closeEditModal}
          />
        </div>
      </Modal>
      <button className={css.btn} onClick={open}>
        Delete
      </button>
      <Modal open={isOpen} onClose={close} aria-labelledby="modal-modal-title">
        <Box className={css.box}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to delete contact {name}?
          </Typography>
          <Stack>
            <Button onClick={handleDelete}>Delete</Button>
            <Button onClick={close}>Cancel</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
