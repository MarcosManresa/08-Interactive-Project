fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=paperback-nonfiction&api-key=ws8GCe1aphzNxJzCmgXm8Ks1Yigf6hzH', {
    method: 'get',
})
    .then(response => { return response.json(); })
    .then(json => {
        sellerUpdateBest(json);
        console.log(json);
    })

function sellerUpdateBest(timeBestSellerNY) {
    $('#seller-best-title').empty();
    timeBestSellerNY.results.forEach(function (book) {
        var ispn = book.isbns[0].isbn10;
        var infoBook = book.book_details[0];
        var listOnWeek = book.weeks_on_list || 'New this week!';
        var lister =
            '<div id="' + book.rank + '" class="entering bg-yellow-100 p-5 p-12 mt-7 mr-0">' +
            '<p>' +
            '<img src="" class="book-cover block m-0 mr-auto w-48" id="cover-' + book.rank + '">' +
            '</p>' +
            '<h2><a href class= "mt-10 mr-0 mb-0 ml-0 no-underline text-blue-600 leading-3"="' + book.amazon_product_url + '" target="_blank">' + infoBook.title + '</a></h2>' +
            '<h4>By ' + infoBook.author + '</h4>' +
            '<h4 class="publisher text-gray-800">' + infoBook.publisher + '</h4>' +
            '<p class="text-gray-800 leading-normal">' + infoBook.description + '</p>' +
            '<div class="stats">' +
            '<hr class="opacity-50">' +
            '<p class="text-gray-700">Weeks on list: ' + listOnWeek + '</p>' +
            '</div>' +
            '</div>';

        $('#seller-best-title').append(lister);
        $('#' + book.rank).attr('nyt-rank', book.rank);

        coverUpdate(book.rank, ispn);
    });
}

function coverUpdate(id, ispn) {
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn ' + ispn, {
        method: 'get'
    })
        .then(response => { return response.json(); })
        .then(data => {
            var image = data.items[0].volumeInfo.imageLinks.thumbnail;
            image = image.replace(/^http:\/\//i, 'https://');
            $('#cover-' + id).attr('src', image);
        })

}

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    if (scroll > 50) {
        $('#header').css({ 'height': '50', 'padding': '8' })
        $('#seller').css({ 'height': '33' })
    } else {
        $('#header').css({ 'height': '100', 'padding': '10' })
        $('#seller').css({ 'height': '80' })
    }
})
