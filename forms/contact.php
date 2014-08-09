<?php
    
    $email = $_POST["email"];
    $message = $_POST["message"];
    mail("tapresle92@gmail.com", "Motiv8 Contact Form", "From: ".$email."\nMessage: ".$message, "From Motiv8");
?>