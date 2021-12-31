import PostsController from './posts';

const TYPES = [{
    name: '所有页面',
    value: null
}, {
    name: '草稿',
    value: 'draft'
}, {
    name: '已发布',
    value: 'published'
}, {
    name: '待发布',
    value: 'scheduled'
}, {
    name: '已推荐',
    value: 'featured'
}];

const ORDERS = [{
    name: '最新版本',
    value: null
}, {
    name: '最古老的',
    value: 'published_at asc'
}, {
    name: '最近更新',
    value: 'updated_at desc'
}];

/* eslint-disable ghost/ember/alias-model-in-controller */
export default PostsController.extend({
    init () {
        this._super(...arguments);
        this.availableTypes = TYPES;
        this.availableOrders = ORDERS;
    },

    actions: {
        openEditor (page) {
            this.transitionToRoute('editor.edit', 'page', page.get('id'));
        }
    }
});
