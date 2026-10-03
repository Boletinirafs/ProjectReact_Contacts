'use client'

//Imports
import { Contact } from './components/contact'
import { useState } from 'react';

export default function Home() {

  //Objects
  const defaultContacts = [
  { id: 'lkdjasd', name: 'Gabriel', phone: '11999999999' },
  { id: 'lkgrasd', name: 'Rafael', phone: '11999999998' },
  { id: 'lkfadsf', name: 'Caio', phone: '11999999997' }
]

  //States
  const [contacts, setContacts] = useState(defaultContacts)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [error, setError] = useState('')

  //Functions
  const createNewContact = (event) =>{

    event.preventDefault()

    if (!newName || !newPhone){
      console.log('Empty name and/or phone field')
      setError('Name and phone are required')
      return
    } 

    if (contacts.some(contact => contact.phone === newPhone)){
      setError('This phone number already exists')
      return
    }

    setError('')

    const newContact = {
      id: Date.now(),
      name: newName,
      phone: newPhone
    }

    setContacts(prev => [...prev,newContact])
    setNewName('')
    setNewPhone('')
  }
  const deleteContact = (id) =>{
    const newList = contacts.filter((contact) => contact.id !== id)
    setContacts(newList)
  }  
  const editContact = (id) =>{
    const newList = contacts.map(contact =>{
      if (contact.id === id){
        return {...contact, name:'edited'}
      }
      else return contact
    })
    setContacts(newList) 
  }
  const createContactList = () =>{
    const newList = contacts.map((contact)=>{
        return <Contact
          id = {contact.id}
          key={contact.id}
          name={contact.name}
          phone={contact.phone}
          onDelete={deleteContact}
        />
      })

    return newList
  }  





  return (
    <>
      <h1>My contact</h1>
      <form onSubmit={createNewContact}>
        <button type='submit'>Add contact</button>
        <input placeholder='Type your Name' value={newName} onChange={(event) => setNewName(event.target.value)} />
        <input placeholder='Type your Phone Number' value={newPhone} onChange={(event) => setNewPhone(event.target.value)}/>
        {error && <p>{error}</p>} 
      </form>

      {createContactList()}


    </>
  );
}
