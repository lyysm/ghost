import BaseValidator from './base';
import validator from 'validator';
import { isBlank } from '@ember/utils';

export default BaseValidator.create({
    properties: ['name', 'email', 'note'],

    name (model) {
        if (!validator.isLength(model.name || '', 0, 191)) {
            model.errors.add('name', '名称不能超过191个字符。');
            this.invalidate();
        }
    },

    email (model) {
        let email = model.get('email');

        if (isBlank(email)) {
            model.errors.add('email', '请输入电子邮件地址。');
            this.invalidate();
        } else if (!validator.isEmail(email)) {
            model.errors.add('email', '无效电子邮件。');
            this.invalidate();
        }
        if (!validator.isLength(model.email || '', 0, 191)) {
            model.errors.add('email', '电子邮件长度不能超过191个字符。');
            this.invalidate();
        }

        model.get('hasValidated').addObject('email');
    },

    note (model) {
        let note = model.get('note');

        if (!validator.isLength(note || '', 0, 500)) {
            model.errors.add('note', '备注过长。');
            this.invalidate();
        }

        model.get('hasValidated').addObject('note');
    }
});
