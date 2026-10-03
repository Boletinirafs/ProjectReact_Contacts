'use client'

//Imports
import { Contact } from './components/contact'
import { useState } from 'react';

export default function Home() {

  //Objects
  const defaultContacts = [
  { name: 'Gabriel', phone: '11999999999' },
  { name: 'Rafael', phone: '11999999998' },
  { name: 'Caio', phone: '11999999997' }
]



  //States
  const [contacts, setContacts] = useState(defaultContacts)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')



  //Functions
  const createContactList = () =>{
    const newList = contacts.map((contact)=>{
        return <Contact
          key={contact.phone}
          name={contact.name}
          phone={contact.phone}
        />
      })

    return newList
  }

  const createNewContact = () =>{
    const newContact = {
      name: newName,
      phone: newPhone
    }
    setContacts(prev => [...prev,newContact])
    setNewName('')
    setNewPhone('')
  }


  return (
    <>
      <h1>My contact</h1>
      <button onClick={createNewContact}>Add contact</button>
      <input placeholder='Type your Name' value={newName} onChange={(event) => setNewName(event.target.value)} />
      <input placeholder='Type your Phone Number' value={newPhone} onChange={(event) => setNewPhone(event.target.value)}/>
      {createContactList()}


    </>
  );
}
