import React from 'react'

const List = ({books,deletebook}) => {
  return books.map((book,index)=>(
        <tr key={book.title}>
        <th scope="row">{index+1}</th>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td><i className="fa-solid fa-trash" onClick={()=>deletebook(book.title)}></i></td>
      </tr>  
      ))
}

export default List
