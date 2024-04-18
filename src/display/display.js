import React, { useEffect, useState } from 'react';
import { collection, addDoc ,getDocs} from 'firebase/firestore';
import { textdb } from '../imgupload/config';

function ListData() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        event: ''
    });

    const fetchData = async () => {
        const valRef = collection(textdb, 'txt-data');
        const datadb = await getDocs(valRef);
        const alldata = datadb.docs.map(val => ({ ...val.data(), id: val.id }));
        setData(alldata);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(textdb, 'form-data'), formData);
            console.log("Document written with ID: ", docRef.id);
            // Clear form data after submission
            setFormData({
                name: '',
                email: '',
                age: '',
                event: ''
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div style={{ display: 'flex' }}>
            <div>
                <h1>All Data</h1>
                {data.map(value => (
                    <div key={value.id}>
                        <h2  cursor='pointer'>{value.txtVal}</h2>
                        <img src={value.imgurl} alt="img" height={100} width={100} />
                        <textarea value={value.txtVal} placeholder={value.txtVal} />
                        <textfield value='' placeholder="enter your name"></textfield>
                    </div>
                ))}
            </div>
            <div style={{ marginLeft: 'auto', padding: '20px' }}>
                <h1>Form</h1>
                <form onSubmit={submitForm}>
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Age:
                        <input type="number" name="age" value={formData.age} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Events:
                        <select name="event" value={formData.event} onChange={handleChange}>
                            {data.map(value => (
                                <option key={value.id} value={value.txtVal}>{value.txtVal}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ListData;
