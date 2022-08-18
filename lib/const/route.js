export class Route {
    constructor() {
        this.add = '/add';
        this.addwork = '/addwork';
        this.bazaar = '/bazaar';
        this.comments = '/comments';
        this.feeds = '/feeds';
        this.followers = '/followers';
        this.follow = '/follow';
        this.followee = '/followee';
        this.icon = '/icon';
        this.likes = '/likes';
        this.records = '/records';
        this.reviews = '/reviews';

        this.onlineusers = '/online_users';
        this.online = '/online';
        this.reports = '/reports';

        this.stores = '/stores';
        this.posts = '/posts';

        this.addlike = '/addlike';
        this.undolike = '/undolike';
        this.addcomment = '/addcomment';
        this.deletecomment = '/deletecomment';

        this.recommend = '/recommend';
        this.decrement = '/decrement';
        this.response = '/response';

        this.delete = '/delete';

        this.newreview = '/new_review';
        this.deletereview = '/delete_review';

        this.enablelocation = '/enablelocation';
        this.disablelocation = '/disablelocation';

        this.userfromsearch = '/remove_user_from_search_history';
        this.placefromsearch = '/remove_place_from_search_history';
        this.storefromsearch = '/remove_store_from_search_history';

        this.usertosearch = '/add_user_to_search_history';
        this.placetosearch = '/add_place_to_search_history';
        this.storetosearch = '/add_store_to_search_history';
        this.searched_users = '/searched_users';
        this.searchusers = '/search/users';
        this.searched_places = '/searched_places';
        this.searchplaces = '/search/places';

        this.updatename = '/update_name';
        this.updategroup = '/update_group';
        this.updateevent = '/update_event';
        this.updateimage = '/update_image';
        this.updatedescription = '/update_description';
        this.updateprofilepicture = '/update_profile_picture';
        
        this.owner = '/owner';
        this.inventory = '/inventory';

        this.signUp = '/signUp';
        this.search = '/search';
        this.simplepost = '/simplepost';
        this.snapshots = '/snapshots';
        this.unfollow = '/unfollow';
        this.users = '/users';
    }
}

export default Route;