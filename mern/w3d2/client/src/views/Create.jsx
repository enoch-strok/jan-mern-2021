import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const Create = ({addTodo}) => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const [errorMessages, setErrorMessages] = useState([]);

    const formHandler = (e) => {
        e.preventDefault();

        // const errors = false;
        // const messages = []

        // if(title.length < 3){
        //     errors = true;
        //     messages.push("Your title is too short!");
        // }

        // if(errors){
        //     setErrors(message);
        // }else{
        //     axios ...
        // }

        const newTodo = {
            title: title,
            desc: desc
        }

        axios.post("http://localhost:8888/todos", newTodo)
            .then(res => {
                // success
                console.log(res);
                addTodo(res.data);
                navigate("/");
            })
            .catch(err => {
                // setErrorMessages([]);
                // error handling
                console.log(err.response.data);

                const { errors } = err.response.data;
                const messages = Object.keys(errors).map(error => errors[error].message);
                const objects = Object.keys(errors).map(error => errors[error]);

                console.log(objects);

                setErrorMessages(messages);
            })
    }

    return (
        <div>
            <Link to={"/"}>All todos</Link>
            <p>This is Create!</p>
            {
                errorMessages.map((message, i) =>
                    <p style={{color: 'red'}} key={i}>{message}</p>
                )
            }
            <form onSubmit={formHandler}>
                <p>Title!</p>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <p>Desc!</p>
                <input
                    type="text"
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                />
                <p></p>
                <input type="submit" value="Create todo!"></input>
            </form>
        </div>
    )
}

export default Create