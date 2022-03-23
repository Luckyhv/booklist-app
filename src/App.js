import './App.css';
import React, { useState, useEffect } from 'react';
import List from './components/List';

const getdatafromls = () => {
  const data = localStorage.getItem('books');
  if (data) {
    return JSON.parse(data);
  }
  else {
    return []
  }
}
function App() {
  const [books, setbooks] = useState(getdatafromls());
  const [title, setTitle] = useState('');
  const [desc, setdesc] = useState('');
  const [author, setAuthor] = useState('');

  const onsubmit = (e) => {
    e.preventDefault();
    let book = {
      title,
      desc,
      author
    }
    setbooks([...books, book]);
    setTitle("");
    setdesc("");
    setAuthor("");
  }

  const deletebook = (title) => {
    const filteredbooks = books.filter((element, index) => {
      return element.title !== title
    })
    setbooks(filteredbooks);
  }

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  return (
    <div className='container body1'>
      <h1>BookList App</h1>
      <form onSubmit={onsubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="title" className="form-control" id="title" aria-describedby="emailHelp" value={title} onChange={(e) => setTitle(e.target.value)} minLength={3} required />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input type="desc" className="form-control" id="desc" aria-describedby="emailHelp" value={desc} onChange={(e) => setdesc(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input type="author" className="form-control" id="author" aria-describedby="emailHelp" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">ADD</button>
      </form>
      <div className="viewcon">
        {books.length>0&&<>
        <div className="con1">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.NO</th>
                <th scope="col">TITLE</th>
                {/* <th scope="col">DESCRIPTION</th> */}
                <th scope="col">AUTHOR</th>
              </tr>
            </thead>
            <tbody>
              <List books={books} deletebook={deletebook} />
            </tbody>
          </table>
            </div>
            <button className='btn btn-danger btn-md'
              onClick={() => setbooks([])}>Remove All</button>
       </>}
            {books.length ===0 && <div><h4 style={{marginTop:"20px"}}>No Books to display</h4></div>}
      </div>
    </div>
  );
}

export default App;
