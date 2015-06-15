<?php
	$to      = 'cedric.peintre@gmail.com, maxime.fouilleul@gmail.com';
	$subject = '[MyXplain] New Slide';
	$title = htmlspecialchars($_POST["title"]);
	$href = htmlspecialchars($_POST["href"]);
	$email = htmlspecialchars($_POST["email"]);
	$message = '<div style="font-size:large;"><b>Slide title : </b> '.$title.'<br/> <b>Slide href : </b>'.$href.'<br/> <b>User Email : </b>'.$email.'</div>';
	$headers = 'MIME-Version: 1.0' . "\r\n".
    'Content-type: text/html; charset=UTF-8' . "\r\n".
    'From: '.$email . "\r\n" .
	'Reply-To: '.$email . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
	mail($to, $subject, $message, $headers);
?>