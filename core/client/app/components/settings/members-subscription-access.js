import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SettingsMembersSubscriptionAccess extends Component {
    @service settings;

    get options () {
        return [{
            name: '任何人都可以注册',
            description: '所有访问者都可以订阅和登录',
            value: 'all',
            icon: 'globe',
            icon_color: 'green'
        }, {
            name: '只有我邀请的人',
            description: '用户可以从您的站点登录，但无法注册',
            value: 'invite',
            icon: 'email-love-letter',
            icon_color: 'blue'
        }, {
            name: '关闭注册',
            description: '任何人都不能订阅或登录',
            value: 'none',
            icon: 'no-members',
            icon_color: 'midlightgrey-d2'
        }];
    }

    get selectedOption () {
        return this.options.find(o => o.value === this.settings.get('membersSignupAccess'));
    }

    @action
    setSignupAccess (option) {
        this.settings.set('membersSignupAccess', option.value);
        this.args.onChange?.(option.value);

        if (option.value === 'none') {
            this.settings.set('defaultContentVisibility', 'public');
        }
    }
}
