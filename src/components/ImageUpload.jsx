import { useState, useCallback } from 'react';
import { getValidFilesWithErrors } from '../helpers/utils';
import { defaultImageFormats, MAX_FILE_SIZE_IN_MB } from '../helpers/constants';

export default function ImageUpload(props) {
    const {
        allowedMaxSizeInMb = MAX_FILE_SIZE_IN_MB,
        allowedFormats = defaultImageFormats
    } = props;

    const [errors, setErrors] = useState([]);

    const handleOnChange = useCallback(event => {
        const {errors} = getValidFilesWithErrors(event.target.files, allowedMaxSizeInMb, allowedFormats);
        setErrors(errors);
    }, []);

    const uploadFiles = () => {
        if(errors.length)
            window.alert(`Please resolve the errors highlighted to start uploading.`);
        else {
            
        }
    };

    return (
        <>
            <input
                type="file"
                multiple
                onChange={handleOnChange}
                accept={allowedFormats}
            />

            {(errors.length > 0) && errors.map((error, errorIndex) => (
                <p key={errorIndex} className='text-danger'>{error}</p>
            ))}

            <button 
                type='button' 
                className='themed-btn' 
                onClick={uploadFiles}
                disabled={errors.length}
            >
                Upload
            </button>
        </>
    )
};