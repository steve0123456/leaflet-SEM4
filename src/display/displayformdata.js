import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { storage ,textdb} from '../imgupload/config'; // assuming you have a storage reference

function ListAllData() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        event: ''
    });

    const fetchData = async () => {
        try {
            const valRef = collection(textdb, 'form-data'); // Assuming 'form-data' is the collection where form data is stored
            const datadb = await getDocs(valRef);
            const alldata = datadb.docs.map(val => ({ ...val.data(), id: val.id }));
            setData(alldata);
        } catch (error) {
            console.error("Error fetching form data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const getDownloadURL = async (imagePath) => {
        try {
            const imgUrl = await storage.ref().child(imagePath).getDownloadURL();
            return imgUrl;
        } catch (error) {
            console.error("Error fetching image:", error);
            return null;
        }
    };

    const displayImage = async (imagePath) => {
        const imgUrl = await getDownloadURL(imagePath);
        if (imgUrl) {
            return <img src={imgUrl} alt="Uploaded" height={100} width={100} />;
        } else {
            return <p>No image available</p>;
        }
    };

    return (
        <div>
            <h1>All Form Data</h1>
            {data.map((value, index) => (
                <div key={index}>
                    <h2>{value.name}</h2>
                    <p>Email: {value.email}</p>
                    <p>Age: {value.age}</p>
                    <p>Event: {value.event}</p>
                    
                </div>
            ))}
        </div>
    );
}

export default ListAllData;
