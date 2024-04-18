import React, { useEffect, useState } from 'react';
import { imgdb } from './config';
import { textdb } from './config';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocs } from 'firebase/firestore';

function Storeimg() {
    const [img, setImg] = useState('');
    const [text, setText] = useState('');
    const [data, setData] = useState([]);

    const handleUpload = (e) => {
        console.log(e.target.files[0]);
        const imgsRef = ref(imgdb, `Imgs/${v4()}`);
        uploadBytes(imgsRef, e.target.files[0]).then(
            (data) => {
                console.log(data, 'imgs');
                getDownloadURL(data.ref).then((val) => {
                    setImg(val);
                });
            }
        );
    };

    const getdata = async() =>{
        const valRef = collection(textdb, 'txt-data'); // Updated collection name to 'txt-data'
       const datadb = await getDocs(valRef)
       const alldata = datadb.docs.map(val =>({...val.data(),id:val.id}));
       setData(alldata);
    };

    useEffect(() =>{
        getdata();
    })

    const handleClick = async () => {
        const valRef = collection(textdb, 'txt-data'); // Updated collection name to 'txt-data'
        await addDoc(valRef, { txtVal: text, imgurl: img });
        alert('Data added');
    };

    console.log(data,'datatext');

    return (
        <div>
            <input onChange={(e) => setText(e.target.value)} />
            <input type="file" onChange={(e) => handleUpload(e)} />
            <button onClick={handleClick}>Add</button>
            {
                data.map(value=> 
                    <div className='imgupload-div'>
                        <h1 className='h1-imgclass'>{value.txtVal}</h1>
                        <img src={value.imgurl} alt="img"  className='img-imgclass'/>
                    </div>
                )
            }
        </div>
    );
}

export default Storeimg;
