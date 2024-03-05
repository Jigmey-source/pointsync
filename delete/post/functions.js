import post from "../../models/post.js";

export function deletePost(link) {
    post.deleteOne({
        link: link
    }).then(function () {
        console.log('Post has been deleted');
    }).catch(function (e) {
        console.log('Error deleting post: ' + e);
    });
}
