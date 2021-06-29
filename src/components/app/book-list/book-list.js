import React, {Component} from 'react';
import BookListItem from '../book-list-item/book-list-item';
import {connect} from 'react-redux';


import { bindActionCreators } from 'redux';
import './book-list.css'
import {fetchBooks, bookAddedToCart} from '../../../actions';
import withBookstoreService from '../../hoc/with-bookstore-service';
import compose from '../../../utils/compose';
import Spinner from '../../spinner/spinner';
import ErrorIndicator from '../../error-indicator/error-indicator';

const BookList = ({books, onAddedToCart}) => {   //презентационные компоненты отвечают только за рендеринг
    return (
        <ul className="book-list">
            {books.map((book) => {
                return (
                    <li key={book.id}>
                         <BookListItem
                                        book={book}
                                        onAddedToCart={() => onAddedToCart(book.id)}/>
            
                    </li>
                );
            })
        }
        </ul>
    );
};

class BookListContainer extends Component {   //компоненты-контейнеры работают с Redux, реализуют loading, error и др логику

    componentDidMount(){
       this.props.fetchBooks();
        }


    render(){
        const {books, loading, error, onAddedToCart} = this.props;

        if(loading) {
            return <Spinner/>;
        }
        if (error) {
            return <ErrorIndicator/>;
        }        

        return  <BookList books={books} onAddedToCart={onAddedToCart}/>;
    };
};

const mapStateToProps = ({ bookList: {books, loading, error}}) => {
    return {books, loading, error}
};

const mapDispatchToProps = (dispatch, {bookstoreService}) => {
    return bindActionCreators ({
        fetchBooks: fetchBooks(bookstoreService),
        onAddedToCart: bookAddedToCart
    }, dispatch);    
};

export default compose (
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps))
    (BookListContainer);