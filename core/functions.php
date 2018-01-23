<?php
use duncan3dc\Sessions\SessionInstance;

function simpleEditBlock($id)
{
	$session = new SessionInstance("tiny-editor");
	
	if($session->get("can-edit")) {
		echo "<a href=''>Edit block</a>";
	}
}