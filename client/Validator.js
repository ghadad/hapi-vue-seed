import Validator from 'vee-validate';
import messagesHe from "./language/he/validator.js";
/* 
const dictionary = {
    en: {
        messages: {
            alpha: () => 'Some English Message'
        }
    },
    he: {
        messages: {
            alpha: () => 'יש להזין מחרוזת בלבד'
        }
    }
};

Validator.updateDictionary(dictionary);

*/
export
default {
    Validator: Validator,
    options: {
        locale: 'he',
        dictionary: {
            he: {
                messages: messagesHe
            }
        }
    }
};