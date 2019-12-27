import messages from './messages';

export const validateProject = (data) => {
    console.log(data);
    if(!data.name || data.name === '') {
        return {isValid:false, error:messages.name};
    } else if (!data.items || (data.items && !data.items.length)) {
        return {isValid:false, error:messages.items};
    } else {
        return {isValid:true};
    }
}