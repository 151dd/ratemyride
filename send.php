<?php
require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$app_id = '#'; //Removing this as going in public repo
	$app_key = '#'; //Removing this as going in public repo
	$app_secret = '#'; //Removing this as going in public repo

	$pusher = new Pusher( $app_key, $app_secret, $app_id );

	$pusher->trigger( 'rateride', 'new_feedback', 'hello world' ); //Just fires an event. Will send actual data if get time.
}
?>