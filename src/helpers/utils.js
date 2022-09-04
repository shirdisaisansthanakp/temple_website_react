import { 
    HTML_FONT_SIZE_IN_PX, 
    NAV_LINKS, HOME_PAGE, 
    MAX_FILE_SIZE_IN_MB,
} from './constants';

export const getPxFromRem = (remUnit = 0) => {
    let pixels;

    if (remUnit)
        pixels = remUnit * HTML_FONT_SIZE_IN_PX;
    else
        pixels = window.innerWidth;

    return `${pixels}px`;
};

export const getActivePage = () => {
    const activePage = window.location.hash;

    if (activePage)
        return NAV_LINKS.find(link => link.id === activePage).id;
    return HOME_PAGE;
};

export const uploadFile = (file) => {
    return new Promise((resolve, reject) => {
        try {
            const fileName = 'test' ?? file?.name;

            if (fileName) {
                const url = `${fileName}.txt`;
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {
                    
                };
                reader.onerror = () => reject('');
            }
        }
        catch (error) {
            console.error('Something went wrong while uploading the image : ', error.message);
        }
    });
};

export const uploadFiles = (files) => {
    return new Promise((resolve, reject) => {
        try {
            if (files?.length) {
                const promises = Array.from(files).map(file => uploadFile(file));
                Promise.allSettled(promises).then(responses => {
                    console.log('uploadFiles_response', responses);
                    resolve(responses);
                });
            }
        }
        catch (error) {
            console.error('Something went wrong while uploading the files : ', error.message);
            reject([]);
        }
    });
};

export const getFileSizeInMb = imageSize => Math.round((imageSize / 1024) / 1024);

export const getFileExtension = fileName => {
    const dotIndex = fileName.lastIndexOf('.');
    return fileName.substring(dotIndex, fileName.length);
}

export const getValidFilesWithErrors = (fileList, allowedMaxSizeInMb = MAX_FILE_SIZE_IN_MB, allowedFormats = "") => {
    const errors = [];

    const files = Array.from(fileList).map(file => ({
        fileName: file.name,
        fileSize: getFileSizeInMb(file.size),
        fileExtension: getFileExtension(file.name)
    }));

    // handle large files
    const largerFiles = files.reduce((acc, curr) => {
        if (curr.fileSize > allowedMaxSizeInMb)
            return `${acc}${curr.fileName}, `;
        return acc;
    }, "");

    if (largerFiles)
        errors.push(`Please make sure that these files (${largerFiles}) are less than ${allowedMaxSizeInMb} mb in size to upload`);

    // handle invalid file formats
    const invalidFiles = files.reduce((acc, curr) => {
        if (!allowedFormats.includes(curr.fileExtension))
            return `${acc}${curr.fileName}, `;
        return acc;
    }, "");

    if (invalidFiles)
        errors.push(`Please make sure that these files (${invalidFiles}) are in (${allowedFormats}) format to upload.`);

    if (!largerFiles && !invalidFiles)
        errors.length = 0;

    return {
        largerFiles,
        invalidFiles,
        errors
    };
};