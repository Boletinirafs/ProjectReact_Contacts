'use client'

//Imports
import { Contact } from './components/contact'
import { useState } from 'react';

export default function Home() {

  const [name, setName] = useState('Gabriel')
  const [phone, setPhone] = useState('11999999999')


  return (
    <>
      <h1>My contact</h1>
      <Contact name={name} phone={phone}/>

      <button onClick={() => {setName('rafael'), setPhone('11999999998')}}>Click to change the contact</button>

    </>
  );
}
