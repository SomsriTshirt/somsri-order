import { type BaseValidation } from '@vuelidate/core';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

const defaultValue = {
    $error: false,
    $errors: [{ $message: '' }],
};

export default <columnList>(validator: BaseValidation, path: columnList | string) => {
    // MAKE NEW PATH
    const extractedKey = (path as string).split('[');
    if (extractedKey.length > 1) {
        for (const index in extractedKey) {
            const lastIndex = extractedKey.length - 1;
            const parsedIndex = Number(index);
            if (parsedIndex !== lastIndex) {
                if (isEmpty(extractedKey[index])) {
                    extractedKey[index] = extractedKey[index] + '$each.$response.$errors[';
                } else {
                    extractedKey[index] = extractedKey[index] + '.$each.$response.$errors[';
                }
            }
        }
    } else {
        extractedKey[0] = extractedKey[0] + '.$errors';
    }
    const newPath = extractedKey.join('');

    const error = get(validator, newPath, defaultValue);

	
    return error.length > 0;
};
