<?php
    
    $email = trim($_POST["email"]);
    $email=filter_var($email, FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);
    $message = wordwrap($message, 70);
    mail("tapresle92@gmail.com", "Motiv8 Contact Form", "Message: ".$message, "From: ".$email);
?>