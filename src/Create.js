import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle]= useState('');
    const [body, setBody]= useState('');
    const [author, setAuthor]= useState('Mario');
    const [isPending, setIsPending]= useState(false);
    const history = useHistory();


    const handelSubmit = (e)=> {
        e.preventDefault();
        const blog = { title, body, author };

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(()=>{
            console.log('new blog added');
            setIsPending(false);
            // history.go(-1); -- to go back page 
            history.push('/'); /* to go home page "/"  */
        });


    }

    return ( 
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={ handelSubmit }>
                <label>Blog title</label>
                <input type="text" required value={title}
                onChange={(e)=> setTitle(e.target.value)}
                />

                <label>Blog Body</label>
                <textarea 
                required
                value={ body }
                onChange={(e)=> setBody(e.target.value) }
                ></textarea>
                <label>Blog author</label>      
                <select 
                value={ author }
                onChange={(e)=> setAuthor(e.target.value)}
                >
                    <option value="Marion">Mario</option>
                    <option value="Dedine">Dedine</option>
                </select>
                { !isPending && <button>Add blog</button> }
                { isPending && <button disabled>Addinng blog...</button> }
            </form>
        </div>
    );
}
 
export default Create;