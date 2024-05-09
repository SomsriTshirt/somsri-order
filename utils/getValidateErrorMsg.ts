import type { BaseValidation } from '@vuelidate/core';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

const defaultValue = {
    $error: false,
    $errors: [{ $message: '' }],
};
export default <ColumnList>(validator: BaseValidation, path: ColumnList | string) => {
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
    if (error.length > 0) {
      
		return error[0].$message;
		
    } else {
        return '';
    }
};
