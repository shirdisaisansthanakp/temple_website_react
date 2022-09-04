import { useState, useCallback, useRef } from 'react';
import { getValidFilesWithErrors, uploadFiles } from '../helpers/utils';
import { defaultImageFormats, MAX_FILE_SIZE_IN_MB } from '../helpers/constants';

export default function ImageUpload(props) {
    const {
        allowedMaxSizeInMb = MAX_FILE_SIZE_IN_MB,
        allowedFormats = defaultImageFormats
    } = props;

    const filesRef = useRef();

    const [errors, setErrors] = useState([]);

    const handleOnChange = useCallback(event => {
        const { errors } = getValidFilesWithErrors(event.target.files, allowedMaxSizeInMb, allowedFormats);
        setErrors(errors);
    }, []);

    const handleUpload = () => {
        if (errors.length)
            window.alert(`Please resolve the errors highlighted to start uploading.`);
        else {
            const uploadStatus = uploadFiles(filesRef.current.files);
            console.log('_uploadStatus', uploadStatus);
        }
    };

    return (
        <>
            <input
                type="file"
                multiple
                onChange={handleOnChange}
                accept={allowedFormats}
                ref={filesRef}
            />

            {(errors.length > 0) && errors.map((error, errorIndex) => (
                <p key={errorIndex} className='text-danger'>{error}</p>
            ))}

            <button
                type='button'
                className='themed-btn'
                onClick={handleUpload}
                disabled={errors.length || !filesRef.current?.files.length}
            >
                Upload
            </button>
        </>
    )
};