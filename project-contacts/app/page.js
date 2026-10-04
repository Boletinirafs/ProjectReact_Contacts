'use client'

//Imports
import { Contact } from './components/contact'
import { useState } from 'react';

export default function Home() {

  //Objects
  const defaultContacts = [
  { id: (Date.now()+1), name: 'Gabriel', phone: '11999999999' },
  { id: (Date.now()+2), name: 'Rafael', phone: '11999999998' },
  { id: (Date.now()+3), name: 'Caio', phone: '11999999997' }
]

  //States
  const [contacts, setContacts] = useState(defaultContacts)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)

  //Functions
  const createNewContact = (event) =>{

    event.preventDefault()

    //Field validation
    if (!newName || !newPhone){
      console.log('Empty name and/or phone field')
      setError('Name and phone are required')
      return
    } 

    //Editing verification
    if (editingId !== null){

      const phoneAlreadyExists = contacts.some(
        contact => contact.phone === newPhone && contact.id !== editingId
      )

      if (phoneAlreadyExists) {
        setError('Phone already exists')
        return
      }

      const newList = contacts.map(contact =>{

        if(contact.id === editingId){

          return {...contact,name:newName,phone:newPhone}

        }else return contact
      }) 
      setContacts(newList)
      setNewName('')
      setNewPhone('')
      setEditingId(null)
      setError('')
      return
    }

    //Existing phone message
    if (contacts.some(contact => contact.phone === newPhone)){
      setError('This phone number already exists')
      return
    }setError('')

    //New contact creation
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
    setEditingId(id)
    const contactToEdit = contacts.find(contact => contact.id === id)
    console.log(contactToEdit)

    setNewName(contactToEdit.name)
    setNewPhone(contactToEdit.phone)
  }
  const createContactList = () =>{
    const newList = contacts.map((contact)=>{
        return <Contact
          id = {contact.id}
          key={contact.id}
          name={contact.name}
          phone={contact.phone}
          onDelete={deleteContact}
          onEdit={editContact}
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
