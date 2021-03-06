import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SettingsMembersDefaultPostAccess extends Component {
    @service settings;
    @service feature;
    @tracked showSegmentError;

    get options () {
        const defaultOptions = [{
            name: '公开',
            description: '所有网站访问者均可访问您的网站，无需登录',
            value: 'public',
            icon: 'globe',
            icon_color: 'green'
        }, {
            name: '仅注册用户',
            description: '所有已注册的用户',
            value: 'members',
            icon: 'members-all',
            icon_color: 'blue'
        }, {
            name: '仅付费用户',
            description: 'Only logged-in members with an active Stripe subscription',
            value: 'paid',
            icon: 'members-paid',
            icon_color: 'pink'
        }];
        if (this.feature.get('multipleProducts')) {
            defaultOptions.push({
                name: 'Specific tier(s)',
                description: 'Members with any of the selected tiers',
                value: 'filter',
                icon: 'members-segment',
                icon_color: 'yellow'
            });
        }
        return defaultOptions;
    }

    get hasVisibilityFilter () {
        return this.feature.get('multipleProducts') && !['public', 'members', 'paid'].includes(this.settings.get('defaultContentVisibility'));
    }

    get selectedOption () {
        if (this.settings.get('membersSignupAccess') === 'none') {
            return this.options.find(o => o.value === 'public');
        }
        if (!['public', 'members', 'paid'].includes(this.settings.get('defaultContentVisibility'))) {
            return this.options.find(o => o.value === 'filter');
        }
        return this.options.find(o => o.value === this.settings.get('defaultContentVisibility'));
    }

    @action
    setVisibility (segment) {
        if (segment) {
            this.settings.set('defaultContentVisibility', segment);
            this.showSegmentError = false;
        } else {
            this.settings.set('defaultContentVisibility', '');
            this.showSegmentError = true;
        }
    }

    @action
    setDefaultContentVisibility (option) {
        if (this.settings.get('membersSignupAccess') !== 'none') {
            if (option.value === 'filter') {
                this.settings.set('defaultContentVisibility', '');
            } else {
                this.settings.set('defaultContentVisibility', option.value);
            }
        }
    }
}
