import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';


function Home() {

    const [listOfAllBooks, setListOfAllBooks] = useState([]);


    useEffect(() => {
      axios.get("http://localhost:3001/books")
      .then((response) => {
        setListOfAllBooks(response.data);
      })
  
      .catch((error) => {
        console.error("Error fetching Books: ", error);
      })
    }, [setListOfAllBooks]);
  

  return (
    <div className="body">
        <div className='popularbooks'>
          {listOfAllBooks.map((value, key) => {
              return (
              <div className="bookID" key={ value.bookID }>
                <div className="bookTitle"> { value.bookTitle } </div>
                <div className='authorID'> { value.authorName }</div>
                <div className='bookGenre'> { value.bookGenre }</div>
                <div className='bookPrice'> { value.bookPrice }</div>
                <div className='stock'> { value.stock }</div>
                <div className='publisherName'> { value.publisherName }</div>
                <div className='rating'> { value.rating }</div>
              </div>
            )
        })
        }
      </div>
    </div>
    )
}

export default Home