<?php
	$to      = 'cedric.peintre@gmail.com, maxime.fouilleul@gmail.com';
	$subject = '[MyXplain] New Book';
	$title = htmlspecialchars($_POST["title"]);
	$email = htmlspecialchars($_POST["email"]);
	$message = '<div style="font-size:large;"><b>Book title : </b> '.$title.'<br/><b>User Email : </b>'.$email.'</div>';
	$headers = 'MIME-Version: 1.0' . "\r\n".
    'Content-type: text/html; charset=UTF-8' . "\r\n".
    'From: '.$email . "\r\n" .
	'Reply-To: '.$email . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
	mail($to, $subject, $message, $headers);
?>