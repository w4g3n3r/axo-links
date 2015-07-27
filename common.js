var axolinks = {

    tagExpression: /axo([itdf])\s?:\s?(\d+)/ig,

    linkify: function (html, axosoftUrl) {
        html = html.replace(this.tagExpression, function (match, p1, p2, offset, string) {
            //https://avalamarketing.ontimenow.com/viewitem.aspx?id=3678&type=defects&force_use_number=true
            //https://avalamarketing.ontimenow.com/viewitem.aspx?id=9309&type=features&force_use_number=true
            //https://avalamarketing.ontimenow.com/viewitem.aspx?id=SRX01000&type=incidents&force_use_number=true
            //https://avalamarketing.ontimenow.com/viewitem.aspx?id=3&type=tasks&force_use_number=true

            switch (p1.toLowerCase()) {
                case "f": type = "features"; break;
                case "t": type = "tasks"; break;
                case "i": type = "incidents"; break;
                default: type = "defects";
            }

            var link = '<a href="' + axosoftUrl + '/viewitem.aspx?id='
                + p2 + '&type='
                + type + '&force_use_number=true">'
                + match + '</a>';

            return link;
        });

        return html;
    }
}