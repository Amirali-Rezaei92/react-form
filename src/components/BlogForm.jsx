

import { useState } from "react";
import './BlogForm.css';

function BlogForm() {

    const resetArticle = {
        title: '',
        textArea: ''
    };

    const [article, setArticle] = useState(resetArticle);
    const [listArticles, setListArticles] = useState([]);

    const changeHandler = (event) => {
        setArticle({
            ...article,
            [event.target.name]: event.target.value
        });
    };

    const addArticle = (event) => {
        event.preventDefault();

        const newArticle = {
            ...article,
            id: crypto.randomUUID()
        };

        setListArticles([...listArticles, newArticle]);
        setArticle(resetArticle);
        console.log(listArticles);
    };

    return (
        <form className='row g-3 m-2' onSubmit={addArticle}>
            <div className='col-12'>
                <input
                    type="text"
                    placeholder="Titolo dell'articolo"
                    className='form-control'
                    value={article.title}
                    onChange={changeHandler}
                    name="title"
                />

                <textarea
                    placeholder="Contenuto dell'articolo..."
                    className='form-control mt-2'
                    value={article.textArea}
                    onChange={changeHandler}
                    name="textArea"
                ></textarea>
            </div>

            <div>
                <button className="btn btn-primary col-12">
                    Aggiungi Articolo
                </button>
            </div>
        </form>
    );
}

export default BlogForm;
