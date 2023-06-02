import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote, editNote} = context;
    const { note } = props;
    return (
        <div className='col md-3'>
            <div className="card mb-3">
                <div className="card-header text-bg-danger"><h3>{note.title}</h3></div>
                <div className="card-body text-bg-warning">
                    {/* <h5 class="card-title">Secondary card title</h5> */}
                    <h5 className="card-text">{note.description}</h5>
                    <i className="fa-regular fa-pen-to-square mx-1" onClick={()=>{editNote(note._id, note.title, note.description, note.tag)}}></i>
                    <i className="fa-regular fa-trash-can mx-1" onClick={()=>{deleteNote(note._id)}}></i>
                </div>
            </div>
        </div >
    )
}

export default NoteItem