import {
    Validator
} from 'vee-validate';

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

const validator = new Validator({
    first_name: 'alpha'
});

validator.setLocale('he'); // now this validator will generate messages in arabic.

export default validator;