

import { useState } from "react";
import './BlogForm.css';

function BlogForm() {

    const resetArticle = {
        title: '',
        textArea: ''
    };

    const [article, setArticle] = useState(resetArticle);
    const [listArticles, setListArticles] = useState([]);
    const [editArticle , setEditArticle]= useState(null);

    const changeHandler = (event) => {
        setArticle({
            ...article,
            [event.target.name]: event.target.value
        });
    };

    const addArticle = (event) => {
    event.preventDefault();

    if (editArticle) {
        // UPDATE
        setListArticles(
            listArticles.map(item =>
                item.id === editArticle ? { ...article, id: editArticle } : item
            )
        );
        setEditArticle(null);
    } else {
        // ADD
        const newArticle = {
            ...article,
            id: crypto.randomUUID()
        };
        setListArticles([...listArticles, newArticle]);
    }

    setArticle(resetArticle);
};


    const removeArticle = (id) => {
        setListArticles(listArticles.filter(article => article.id !== id));
    }
    const editArticles = (id) => {
        const selected = listArticles.find(item =>item.id ===id);
        setArticle(selected);
        setEditArticle(id);
    }

    return (
        <div className="m-4">
            <h2>Articoli del Blog</h2> <hr />

            {listArticles.map(article => {
                return (
                    <div className="card p-2 my-2 card-background" key={article.id}>
                        <h4 className="pt-2">{`${article.title}`}</h4>
                        <hr />
                        <p>{`${article.textArea}`}</p>
                        <div className="d-flex gap-5">
                            <button className=" border-0 btn text-primary" onClick={() => editArticles(article.id)}> <i class="bi bi-pencil-fill"></i> Modifica</button>
                            <button className="btn border-0  text-danger" onClick={() => removeArticle(article.id)}> <i class="bi bi-trash3-fill" ></i> Elimina</button>
                        </div>
                    </div>
                )
            })}

            <h2 className="mt-5">Aggiungi Nuovo Articolo</h2> <hr />
            <form className='row g-3 ' onSubmit={addArticle}>
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
                    <button className={`btn col-12 ${editArticle ? "btn-warning" : "btn-primary"}`}>
                        {editArticle ? "Salva Modifiche" : "Aggiungi Articolo"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BlogForm;
