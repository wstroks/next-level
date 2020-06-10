import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'
import './styles.css';

interface Props{
    onFileUpload: (file:File) =>void;
}
const Dropzone: React.FC<Props> = ({onFileUpload}) => {
    const [selectPreView, setSelectPreView] = useState('');

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        const file = acceptedFiles[0];
        const fileURL = URL.createObjectURL(file);

        setSelectPreView(fileURL);

        onFileUpload(file);
    }, [onFileUpload])
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {selectPreView ? <img src={selectPreView} alt="Point" /> : (<p>
                <FiUpload />
          Imagem do Estabelecimento</p>
            )}

        </div>
    )
}

export default Dropzone;