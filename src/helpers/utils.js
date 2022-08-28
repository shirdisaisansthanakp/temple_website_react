import { 
    HTML_FONT_SIZE_IN_PX, 
    NAV_LINKS, HOME_PAGE, 
    MAX_FILE_SIZE_IN_MB,
    GITHUB_FILE_UPLOAD_URL, 
    githubConfig 
} from './constants';
import Http from './http';

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

export const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        try {
            const imageName = image?.filename;

            if (imageName) {
                const url = `${GITHUB_FILE_UPLOAD_URL}/${imageName}.txt`;
                const reader = new FileReader();
                reader.readAsDataURL(image);

                reader.onloadend = () => {
                    const imageBlob = reader.result?.replace('data:', '').replace(/^.+,/, '');
                    const response = Http.post(url, { message: imageName, content: imageBlob }, githubConfig);
                    resolve(response);
                };
                reader.onerror = () => reject('');
            }
        }
        catch (error) {
            console.error('Something went wrong while uploading the image : ', error.message);
        }
    });
};

export const uploadImages = (images) => {
    return new Promise((resolve, reject) => {
        try {
            if (images?.length) {
                const promises = images.map(image => uploadImage(image));
                Promise.allSettled(promises).then(responses => {
                    console.log('uploadImages_response', responses);
                });
            }
        }
        catch (error) {
            console.error('Something went wrong while uploading the images : ', error.message);
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