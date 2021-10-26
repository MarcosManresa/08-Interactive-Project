fetch('https://api.nytimes.com/svc/books/v3/lists.json?list-name=paperback-nonfiction&api-key=ws8GCe1aphzNxJzCmgXm8Ks1Yigf6hzH', {
    method: 'get',
})
    .then(response => { return response.json(); })
    .then(json => {
        bestUpdate(json);
        console.log(json);
    })

function bestUpdate(yeThisTheSellingBest) {
    $('#ye-ye').empty();
    yeThisTheSellingBest.results.forEach(function (book) {
        var internationalStand = book.isbns[0].isbn10;
        var bokInfo = book.book_details[0];
        var wekList = book.weeks_on_list || 'New this week!';
        var ok =
            '<div id="' + book.rank + '" class="entice bg-yellow-100 p-5 p-12 mt-7 mr-0">' +
            '<p>' +
            '<img src="" class="yure-book block m-0 mr-auto w-48" id="ye-cov' + book.rank + '">' +
            '</p>' +
            '<h2><a class= "mt-10 mr-0 mb-0 ml-0 no-underline text-blue-600 leading-3"=" href="' + book.amazon_product_url + '" target="_blank">' + bokInfo.title + '</a></h2>' +
            '<h4>By ' + bokInfo.author + '</h4>' +
            '<h4 class="publisher text-gray-800">' + bokInfo.publisher + '</h4>' +
            '<p class="text-gray-800 leading-normal">' + bokInfo.description + '</p>' +
            '<div class="stater">' +
            '<hr class="opacity-50">' +
            '<p class="text-gray-700">Weeks on list: ' + wekList + '</p>' +
            '</div>' +
            '</div>';

        $('#ye-ye').append(ok);
        $('#' + book.rank).attr('rnk-nyp', book.rank);

        coverUpdate(book.rank, internationalStand);
    });
}

function coverUpdate(id, internationalStand) {
    fetch('https://www.googleapis.com/books/v1/volumes?q=isbn ' + internationalStand, {
        method: 'get'
    })
        .then(response => { return response.json(); })
        .then(data => {
            var picture = data.items[0].volumeInfo.imageLinks.thumbnail;
            picture = picture.replace(/^http:\/\//i, 'https://');
            $('#ye-cov' + id).attr('src', picture);
        })

}

$(window).scroll(function (event) {
    var scrall = $(window).scrollTop();
    if (scrall > 50) {
        $('#ok-hd').css({ 'height': '50', 'padding': '8' })
        $('#ye-sellng').css({ 'height': '33' })
    } else {
        $('#ok-hd').css({ 'height': '100', 'padding': '10' })
        $('#ye-sellng').css({ 'height': '80' })
    }
})
