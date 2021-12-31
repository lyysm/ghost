import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const VISIBILITIES = [
    { label: '公开', name: 'public' },
    { label: '仅注册用户', name: 'members' },
    { label: '仅付费用户', name: 'paid' }
];

export default Component.extend({

    settings: service(),
    feature: service(),

    // public attrs
    post: null,

    selectedVisibility: computed('post.visibility', function () {
        return this.get('post.visibility') || this.settings.get('defaultContentVisibility');
    }),

    init () {
        this._super(...arguments);
        this.availableVisibilities = [...VISIBILITIES];
        if (this.feature.get('multipleProducts')) {
            this.availableVisibilities.push(
                { label: 'Specific tier(s)', name: 'filter' }
            );
        }
    },

    actions: {
        updateVisibility (newVisibility) {
            this.post.set('visibility', newVisibility);
            if (newVisibility !== 'filter') {
                this.post.set('visibilityFilter', null);
            }
        }
    }
});
