<?php
    $user_id = $_POST["user_id"];
    $client_id = "1643391279210026";
    $client_secret = "5516ce513d02afe814c7214659259a94";
    $url = "https://graph.facebook.com/v2.4/$user_id/notifications";
    $data = [
        "access_token" => "$client_id|$client_secret",
        "href" => "fb",
        "template" => "this is test notif"
    ];
    $options = [
        "http" => [
            "header" => "Content-type: application/x-www-form-urlencoded\r\n",
            "method" => "POST",
            "content" => http_build_query($data)
        ]
    ];
    $req = new http\Client\Request("POST", $url, [
        "Content-Type" => "application/x-www-form-urlencoded"
    ]);
    $req->getBody()->append(new http\QueryString($data));
    $client = (new http\Client())->enqueue($req)->send();
    $result = $client->getResponse($req)->getBody()->toString();
?>
