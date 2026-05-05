

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

    const removeArticle=(id)=>{
        setListArticles(listArticles.filter(article => article.id!==id));
    }

    return (
        <div className="m-4">
            <h2>Articoli del Blog</h2> <hr />

            {listArticles.map(article => {
                return (
                    <div className="card p-2 my-2" key={article.id}>
                        <h4 className="pt-2">{`${article.title}`}</h4>
                        <hr />
                        <p>{`${article.textArea}`}</p>
                        <div className="d-flex gap-5">
                            <button className=" border-0 bg-white text-primary"> <i class="bi bi-pencil-fill"></i> Modifica</button>
                            <button className=" border-0 bg-white text-danger" onClick={()=>removeArticle(article.id)}> <i class="bi bi-trash3-fill" ></i> Elimina</button>
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
                    <button className="btn btn-primary col-12">
                        Aggiungi Articolo
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BlogForm;
