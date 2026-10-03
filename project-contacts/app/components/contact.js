export function Contact({ id, name, phone, onDelete, onEdit }) {
  return (
    <div style={{margin:'10px' , padding:'5px',  backgroundColor:'#ccc'}}>
      <h2>{name}</h2>
      <p>{phone}</p>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onEdit(id)}>Edit</button>
    </div>
  )
}