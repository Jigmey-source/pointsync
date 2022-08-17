function concatenate(url) {
    var file = url.substring(
        url.indexOf('/o/') + 1,
        url.lastIndexOf('?alt')
    );
    return file;
}
